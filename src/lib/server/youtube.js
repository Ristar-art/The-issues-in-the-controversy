import { env } from '$env/dynamic/private';
import { videos as fallbackVideos, cleanTitle, parseEpisode } from '$lib/data/videos.js';

/**
 * Reads the series playlist from the YouTube Data API so publishing a new
 * episode on YouTube is enough to make it appear on the site — no redeploy.
 *
 * Every failure path degrades instead of throwing: a stale cache if we have
 * one, otherwise the bundled list in $lib/data/videos.js. A missing API key
 * is treated as one of those failure paths, so the site keeps working before
 * the key is configured.
 */

const DEFAULT_PLAYLIST_ID = 'PLlIZlP9SdkUjz89y4GI1xRxyK77pA5ubQ';
const ENDPOINT = 'https://www.googleapis.com/youtube/v3/playlistItems';
const CACHE_TTL_MS = 30 * 60 * 1000;
// 50 items per page — enough for 500 episodes, and it stops a bad
// nextPageToken from looping forever.
const MAX_PAGES = 10;

let cache = { at: 0, videos: null };

/** Private and deleted entries stay in the playlist but can't be embedded. */
function isPlayable(item) {
    const title = item?.snippet?.title;
    const videoId = item?.contentDetails?.videoId;
    if (!videoId || !title) return false;
    if (title === 'Private video' || title === 'Deleted video') return false;
    return Boolean(item.snippet.thumbnails && Object.keys(item.snippet.thumbnails).length);
}

function toVideo(item) {
    const raw = item.snippet.title;
    return {
        title: cleanTitle(raw),
        embedUrl: `https://www.youtube.com/embed/${item.contentDetails.videoId}`,
        episode: parseEpisode(raw)
    };
}

/**
 * @param {typeof globalThis.fetch} [fetchImpl] SvelteKit's load fetch, when available.
 * @returns {Promise<{ videos: Array<{title: string, embedUrl: string}>, source: string }>}
 */
export async function getPlaylistVideos(fetchImpl = globalThis.fetch) {
    const key = env.YOUTUBE_API_KEY;
    const playlistId = env.YOUTUBE_PLAYLIST_ID || DEFAULT_PLAYLIST_ID;

    if (!key) return { videos: fallbackVideos, source: 'fallback' };

    if (cache.videos && Date.now() - cache.at < CACHE_TTL_MS) {
        return { videos: cache.videos, source: 'cache' };
    }

    try {
        const items = [];
        let pageToken = '';

        for (let page = 0; page < MAX_PAGES; page++) {
            const url = new URL(ENDPOINT);
            url.searchParams.set('part', 'snippet,contentDetails');
            url.searchParams.set('playlistId', playlistId);
            url.searchParams.set('maxResults', '50');
            url.searchParams.set('key', key);
            if (pageToken) url.searchParams.set('pageToken', pageToken);

            const response = await fetchImpl(url);
            if (!response.ok) {
                throw new Error(`YouTube API responded ${response.status}: ${await response.text()}`);
            }

            const body = await response.json();
            items.push(...(body.items ?? []));

            pageToken = body.nextPageToken ?? '';
            if (!pageToken) break;
        }

        // The playlist is arranged newest-first, so the last item added leads.
        // The site reads as a series, so flip it: trailer, then Episode 01 up.
        const videos = items.filter(isPlayable).map(toVideo).reverse();
        if (!videos.length) throw new Error('Playlist returned no playable videos');

        cache = { at: Date.now(), videos };
        return { videos, source: 'youtube' };
    } catch (error) {
        console.error('[youtube] playlist fetch failed:', error);
        return cache.videos
            ? { videos: cache.videos, source: 'stale' }
            : { videos: fallbackVideos, source: 'fallback' };
    }
}
