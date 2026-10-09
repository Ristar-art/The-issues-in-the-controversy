// Long-form teaching for each of the seven churches, drawn from the study
// transcripts. Kept apart from churches.js so the overview chart stays light:
// only the per-church page imports this.

import ephesus from './church-details/ephesus.js';
import smyrna from './church-details/smyrna.js';
import pergamos from './church-details/pergamos.js';
import thyatira from './church-details/thyatira.js';
import sardis from './church-details/sardis.js';
import philadelphia from './church-details/philadelphia.js';
import laodicea from './church-details/laodicea.js';

/**
 * @typedef {object} ChurchDetail
 * @property {string} intro
 * @property {string} pullQuote
 * @property {{heading: string, paragraphs: string[], verses?: {ref: string, text?: string}[]}[]} sections
 * @property {{ref: string, text?: string}[]} keyVerses
 * @property {string[]} takeaways
 */

/** @type {Record<string, ChurchDetail>} */
const DETAILS = { ephesus, smyrna, pergamos, thyatira, sardis, philadelphia, laodicea };

/** @param {string} id */
export const getChurchDetail = (id) => DETAILS[id] ?? null;
