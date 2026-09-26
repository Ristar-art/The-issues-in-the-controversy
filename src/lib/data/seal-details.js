// Long-form content for /seals/[slug] — one entry per seal, keyed by the `id`
// in $lib/data/seals.js. Kept apart from that file so the landing filmstrip and
// the /seals index stay lightweight; only the detail page imports this.
//
// Every field is optional. A seal with nothing filled in still renders: the
// page falls back to its summary from seals.js and says the fuller study is in
// preparation, rather than showing an empty shell.
//
// The shape, in full:
//
//   'first-seal': {
//       // One line under the title. Sets the frame for the whole page.
//       subtitle: 'The church while it was still pure.',
//
//       // The seal's own text. Paste the translation you want quoted —
//       // reference is taken from seals.js, so only `text` is needed here.
//       passage: 'And I saw when the Lamb opened one of the seals…',
//
//       // Two or three sentences of orientation before the study proper.
//       summary: '…',
//
//       // The body of the study. Each section becomes a headed block; a
//       // section may carry a pull-quote that sits beside its prose.
//       sections: [
//           {
//               heading: 'The rider and the bow',
//               paragraphs: ['…', '…'],
//               quote: { text: '…', cite: 'Revelation 6:2' }
//           }
//       ],
//
//       // Short pull-out list — the claims the study rests on.
//       keyPoints: ['…', '…'],
//
//       // Questions to carry into personal study.
//       questions: ['…'],
//
//       // Further reading. `href` may point anywhere on the site.
//       related: [{ label: 'The Overview of Daniel and Revelation', href: '/the-overview-of-daniel-and-revelations' }]
//   }

/** @type {Record<string, any>} */
export const SEAL_DETAILS = {
	'first-seal': {},
	'second-seal': {},
	'third-seal': {},
	'fourth-seal': {},
	'fifth-seal': {},
	'sixth-seal': {},
	'seventh-seal': {}
};

/**
 * Detail for one seal, always an object so callers can read fields without
 * guarding first.
 * @param {string} id
 */
export function getSealDetail(id) {
	return SEAL_DETAILS[id] ?? {};
}

/**
 * Whether a seal has any long-form content yet — decides between the full
 * study and the "in preparation" state.
 * @param {Record<string, any>} detail
 */
export function hasDetail(detail) {
	return Boolean(
		detail?.passage ||
			detail?.summary ||
			detail?.sections?.length ||
			detail?.keyPoints?.length ||
			detail?.questions?.length
	);
}
