// The seven seals as one unbroken line, with Revelation 7 held out as the
// flashback that the text places between the sixth seal and the seventh.
//
// The chart makes two claims at once, which is why it has two tiers. The top
// tier is the sequence: seven seals, first to seventh, with nothing missing
// between the sixth and the seventh. The lower tier is Revelation 7, dropped
// beneath the fifth seal — where its events belong — and tethered back to the
// seam, where the text actually prints it.

export const SEALS_FLASHBACK_TITLE = 'Flashback One · The Seven Seals';

/**
 * @typedef {object} Seal
 * @property {string} id
 * @property {number} n
 * @property {string} label   Text on the bar.
 * @property {string} refs
 * @property {string} note    One paragraph, shown in the reading panel.
 * @property {string} tone
 * @property {boolean} [holds] Marks the seal the flashback belongs to.
 */

/** @type {Seal[]} */
export const SEAL_STEPS = [
	{
		id: 's1',
		n: 1,
		label: 'White horse',
		refs: 'Revelation 6:1–2',
		note: 'A white horse, a crown given, and a rider going forth conquering and to conquer. The church in its first purity, carrying the gospel out over the world.',
		tone: 'pure'
	},
	{
		id: 's2',
		n: 2,
		label: 'Red horse',
		refs: 'Revelation 6:3–4',
		note: 'Power is given to take peace from the earth, and a great sword. Purity gives way to corruption, and the church that being widly adopted it begins to compromise.',
		tone: 'fire'
	},
	{
		id: 's3',
		n: 3,
		label: 'Black horse',
		refs: 'Revelation 6:5–6',
		note: 'A pair of balances, a measure of wheat for a penny, and the oil and the wine not to be hurt. The word is sold, but the Holy Spirit is not touched.',
		tone: 'ink'
	},
	{
		id: 's4',
		n: 4,
		label: 'Pale horse',
		refs: 'Revelation 6:7–8',
		note: 'A pale horse, and his name that sat on him was Death, and Hell followed with him. Power over the fourth part of the earth, to kill with sword, hunger, death and the beasts. - The churce becomes the instument of death',
		tone: 'pale'
	},
	{
		id: 's5',
		n: 5,
		label: 'Souls under the altar',
		refs: 'Revelation 6:9–11',
		note: 'They cry How long, O Lord. White robes are given to every one of them, and they are told to rest yet for a little season, until their fellowservants should be fulfilled. That little season is the ground Revelation 7 goes back over.',
		tone: 'amber',
		holds: true
	},
	{
		id: 's6',
		n: 6,
		label: 'Sun black · moon as blood',
		refs: 'Revelation 6:12–17',
		note: 'A great earthquake, the sun black as sackcloth, the moon as blood, the stars falling - and the kings of the earth hiding, saying the great day of his wrath is come, and who shall be able to stand?',
		tone: 'deep'
	},
	{
		id: 's7',
		n: 7,
		label: 'Silence in heaven',
		refs: 'Revelation 8:1',
		note: 'When he had opened the seventh seal, there was silence in heaven about the space of half an hour. The seventh follows the sixth exactly as the sixth followed the fifth - nothing has been taken out between them.',
		tone: 'gold'
	}
];

/** How wide the three Revelation 7 blocks sit, proportionally. */
export const REV7_COLUMNS = [1, 1.15, 1.35];

/**
 * @typedef {object} Rev7Cell
 * @property {string} id
 * @property {string} label
 * @property {string} refs
 * @property {string} note
 * @property {string} tone
 */

/** @type {Rev7Cell[]} */
export const REV7 = [
	{
		id: 'r7-winds',
		label: 'Four winds held',
		refs: 'Revelation 7:1–3',
		note: 'Four angels hold the four winds, that the wind should not blow on the earth. Hurt not the earth, neither the sea, nor the trees, till we have sealed the servants of our God in their foreheads. The winds are held back - which means this is before the day of wrath, not after it.',
		tone: 'life'
	},
	{
		id: 'r7-144',
		label: '144,000 sealed',
		refs: 'Revelation 7:4–8',
		note: 'An hundred and forty and four thousand, sealed out of every tribe of the children of Israel. The sealing is the work of the little season - the fellowservants of the fifth seal being fulfilled, while probation still stands.',
		tone: 'life'
	},
	{
		id: 'r7-multitude',
		label: 'Great multitude standing',
		refs: 'Revelation 7:9–17',
		note: 'A great multitude which no man could number, standing before the throne in white robes. These are they which came out of great tribulation. This is the answer, printed word for word after the question: these are the ones who are able to stand.',
		tone: 'life'
	}
];

/** The question the sixth seal ends on. */
export const QUESTION = {
	ref: 'Revelation 6:17',
	text: 'For the great day of his wrath is come; and who shall be able to stand?'
};

/** And the reply, which is the whole reason the flashback sits where it does. */
export const ANSWER = {
	ref: 'Revelation 7:9, 14',
	text: 'After this I beheld, and, lo, a great multitude, which no man could number… These are they which came out of great tribulation, and have washed their robes, and made them white in the blood of the Lamb.'
};

/** Every block that carries a reading, flattened for lookups. */
export const SEALS_FLASHBACK_CELLS = [
	...SEAL_STEPS.map((seal) => ({
		id: seal.id,
		label: seal.label,
		refs: seal.refs,
		note: seal.note,
		tone: seal.tone,
		band: /** @type {const} */ ('seal'),
		bandLabel: `Seal ${seal.n}`
	})),
	...REV7.map((cell) => ({
		id: cell.id,
		label: cell.label,
		refs: cell.refs,
		note: cell.note,
		tone: cell.tone,
		band: /** @type {const} */ ('rev7'),
		bandLabel: 'Revelation 7'
	}))
];

// The argument, in three moves — read after the toggle has been worked.
export const SEALS_ARGUMENT = [
	{
		id: 'unbroken',
		kicker: 'One',
		title: 'The seals never stop.',
		body: 'Retract the drop and the seals stand first to seventh with nothing between them. There is no eighth seal hiding in chapter 7, and no seal is left unopened while it runs. The sixth is opened in 6:12 and the seventh in 8:1, and every event the chapter between them describes belongs somewhere already inside that line.'
	},
	{
		id: 'belongs',
		kicker: 'Two',
		title: 'The sealing belongs to the fifth seal.',
		body: 'The four winds are still being held - nothing has yet been hurt - so this cannot be standing after the sixth seal has already blackened the sun. It is the little season of 6:11: white robes given, and the fellowservants still to be fulfilled. Revelation 7 goes back and shows that sealing being done, then walks forward to the multitude it produces.'
	},
	{
		id: 'answer',
		kicker: 'Three',
		title: 'The gap is an answer to a question.',
		body: 'The sixth seal ends with the kings of the earth asking who shall be able to stand. God does not leave the question hanging into the seventh seal. He stops the sequence, turns back, and shows exactly who: the servants sealed in their foreheads, and a multitude no man could number standing before the throne. The flashback is placed there because that is where the question was asked.'
	}
];
