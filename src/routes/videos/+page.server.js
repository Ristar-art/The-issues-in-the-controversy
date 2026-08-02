import { getPlaylistVideos } from '$lib/server/youtube.js';

export async function load({ fetch, setHeaders }) {
    const { videos, source } = await getPlaylistVideos(fetch);

    // Let the CDN hold the response so every visitor doesn't cost an API call.
    // Skipped when we're serving the bundled fallback, so the real list gets
    // picked up as soon as the API is reachable.
    if (source === 'youtube' || source === 'cache') {
        setHeaders({ 'cache-control': 'public, max-age=0, s-maxage=1800' });
    }

    return { videos };
}
