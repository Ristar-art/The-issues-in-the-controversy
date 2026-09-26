import { redirect } from '@sveltejs/kit';

// The Heard versus Seen study was folded into the 144,000 page, where the
// principle is the argument rather than a standalone note. Old links and
// anything already indexed are sent on permanently.
export function load() {
    throw redirect(308, '/the-144000');
}
