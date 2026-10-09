// Long-form content for /seventh-seal/[slug] — one entry per trumpet, keyed by
// the `id` in $lib/data/seventh-seal.js. Same shape as seal-details.js:
//
//   subtitle, passage, summary,
//   sections: [{ heading, paragraphs: [], quote?: { text, cite } }],
//   keyPoints: [], questions: [], related: [{ label, href }]
//
// An empty entry shows the "in preparation" state until the study is written.
export { hasDetail } from './seal-details.js';

import first from './trumpet-details/first-trumpet.js';
import fifth from './trumpet-details/fifth-trumpet.js';
import sixth from './trumpet-details/sixth-trumpet.js';
import seventh from './trumpet-details/seventh-trumpet.js';

/** @type {Record<string, Record<string, any>>} */
const TRUMPET_DETAILS = {
	'first-trumpet': first,
	'second-trumpet': {},
	'third-trumpet': {},
	'fourth-trumpet': {},
	'fifth-trumpet': fifth,
	'sixth-trumpet': sixth,
	'seventh-trumpet': seventh
};

/**
 * Detail for one trumpet, always an object so callers can read fields without
 * guarding first.
 * @param {string} id
 */
export function getTrumpetDetail(id) {
	return TRUMPET_DETAILS[id] ?? {};
}
