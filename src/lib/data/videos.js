/**
 * Fallback episode list, used only when the YouTube playlist can't be read
 * (no API key configured, or the API is failing). The live list comes from
 * $lib/server/youtube.js — normally you publish to the playlist rather than
 * editing this file.
 *
 * getVideoId/getThumbnailUrl are shared by both pages and run in the browser,
 * so they stay here rather than in the server-only module.
 */
export const videos = [
    { title: 'Introduction to The Series', embedUrl: 'https://www.youtube.com/embed/Xu8IJtZBdqc', episode: null },
    { title: 'Foundations', embedUrl: 'https://www.youtube.com/embed/8KA32Gaam7Y', episode: 1 },
    { title: "A Bird's Eye View", embedUrl: 'https://www.youtube.com/embed/WMXqrUp98RY', episode: 2 },
    { title: 'The Kingdom of God', embedUrl: 'https://www.youtube.com/embed/Sj43-YLaFQc', episode: 3 }
];

/**
 * Playlist titles carry channel boilerplate, e.g.
 * "Foundations (Episode 1) | ENDGAME OF HEAVEN | Revelation made clear".
 * The pages render their own episode badge, so keep only the leading segment
 * and drop the episode suffix.
 */
export function cleanTitle(raw) {
    const [lead] = String(raw ?? '').split('|');
    return lead.replace(/\s*\(\s*episode\s*\d+\s*\)\s*$/i, '').trim() || String(raw ?? '').trim();
}

/** Pulls the episode number out of a title; null for the trailer and extras. */
export function parseEpisode(raw) {
    const match = String(raw ?? '').match(/\(\s*episode\s*(\d+)\s*\)/i);
    return match ? Number(match[1]) : null;
}

/**
 * The badge shown on a card. Numbering comes from the title rather than the
 * playlist position, so the trailer can't take EP 01 and push every episode
 * out by one.
 */
export function episodeLabel(video) {
    if (typeof video?.episode === 'number') return `EP ${String(video.episode).padStart(2, '0')}`;
    return /trailer/i.test(video?.title ?? '') ? 'Trailer' : 'Feature';
}

export function getVideoId(url) {
    if (!url) return null;
    if (url.includes('/embed/')) return url.split('/embed/')[1]?.split('?')[0];
    if (url.includes('youtu.be/')) return url.split('youtu.be/')[1]?.split('?')[0];
    try {
        const parsed = new URL(url);
        return parsed.searchParams.get('v');
    } catch { return null; }
}

export function getThumbnailUrl(id) { return `https://img.youtube.com/vi/${id}/hqdefault.jpg`; }
