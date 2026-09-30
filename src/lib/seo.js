// Single source of truth for everything a crawler or a link preview reads.
// Canonicals, Open Graph URLs, the sitemap and robots.txt all derive from
// SITE_URL, so moving to a proper domain means setting VITE_SITE_URL and
// nothing else. The literal is the fallback for when it is unset.

export const SITE_URL = (
	import.meta.env.VITE_SITE_URL || 'https://the-issues-in-the-controversy.vercel.app'
).replace(/\/+$/, '');

export const SITE_NAME = 'The Endgame of Heaven';

// The name the site published under until now. Kept in the structured data
// so a search for the old name still resolves here.
export const SITE_ALTERNATE_NAME = 'The Issues in the Controversy';

export const SITE_DESCRIPTION =
	'A study of the great controversy through the prophecies of Daniel and Revelation — the seven seals, the seven churches, the beast, the 144,000, and the character of God.';

// The default share card. 1280x720 is the file's real size; declaring the
// wrong dimensions makes some scrapers drop the image entirely.
export const DEFAULT_IMAGE = '/thetrhoneroom.jpg';
export const DEFAULT_IMAGE_WIDTH = '1280';
export const DEFAULT_IMAGE_HEIGHT = '720';

export const TWITTER_HANDLE = '';

/**
 * Turn a site-relative path into the absolute URL crawlers require.
 * Several images in /static have spaces in their names, so the path is
 * encoded rather than concatenated raw.
 * @param {string} [path]
 */
export function absolute(path = '/') {
	if (!path) return SITE_URL;
	if (/^https?:\/\//i.test(path)) return path;
	const withSlash = path.startsWith('/') ? path : `/${path}`;
	// Keep '/' as the bare origin plus slash; strip trailing slashes elsewhere
	// so one page never has two canonical spellings.
	const trimmed = withSlash === '/' ? '/' : withSlash.replace(/\/+$/, '');
	return `${SITE_URL}${encodeURI(trimmed)}`;
}
