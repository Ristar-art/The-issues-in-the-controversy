import { getPlaylistVideos } from '$lib/server/youtube.js';

export async function load({ fetch, setHeaders }) {
    const { videos, source } = await getPlaylistVideos(fetch);

    if (source === 'youtube' || source === 'cache') {
        setHeaders({ 'cache-control': 'public, max-age=0, s-maxage=1800' });
    }

    return { videos };
}
