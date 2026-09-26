// The visions of Daniel, set side by side. Each vision covers the same march of
// empires; each one begins later than the last and goes further into detail.
// Read across a row and it is one empire seen four times over.
//
// PLATES: every picture cell carries `img: null`. Drop a path in (e.g.
// '/lion-daniel-7.jpg') and that cell renders the picture in place of its
// lettered plate — nothing else needs changing.

export const VISION_COLUMNS = [
	{ id: 'empire', label: 'The empire', sub: 'History', refs: null },
	{ id: 'daniel-2', label: 'Daniel 2', sub: 'The great image', refs: 'Daniel 2:31–45' },
	{ id: 'daniel-7', label: 'Daniel 7', sub: 'The four beasts', refs: 'Daniel 7:1–8, 17–25' },
	{ id: 'daniel-8', label: 'Daniel 8', sub: 'Ram, goat & horn', refs: 'Daniel 8:1–14, 20–25' },
	{ id: 'daniel-11', label: 'Daniel 11', sub: 'Kings of north & south', refs: 'Daniel 11:1–22; 12:1' }
];

/** Column proportions, taken from the reference chart. */
export const VISION_WIDTHS = [118, 110, 98, 92, 92];

/**
 * @typedef {object} VisionCell
 * @property {string} caption  What the plate shows.
 * @property {string} refs
 * @property {string} note
 * @property {string | null} [img] Path to a picture, once there is one.
 */

/**
 * The rows. `statue` is the band of the great image belonging to that empire —
 * the one figure runs the height of the chart, divided as the image itself is
 * divided. The closing row is marked `apart`: the stone is no part of the
 * image but the thing that strikes it, so it stands clear of the figure.
 * @type {{
 *   id: string, empire: string, era: string, apart?: boolean,
 *   statue: { part: string, material: string, tone: string, refs: string, note: string },
 *   daniel7: VisionCell, daniel8: VisionCell | null, daniel11: VisionCell | null
 * }[]}
 */
export const VISION_ROWS = [
	{
		id: 'babylon',
		empire: 'Babylon',
		era: '605 – 539 BC',
		statue: {
			part: 'Head',
			material: 'Gold',
			tone: '#d4a53c',
			refs: 'Daniel 2:32, 37–38',
			note: 'Thou art this head of gold - the kingdom named to its own king by the prophet.'
		},
		daniel7: {
			caption: "Lion with eagle's wings",
			refs: 'Daniel 7:4',
			note: 'The wings are plucked and a man’s heart given to it - the beast that was humbled.',
			img: null
		},
		daniel8: null,
		daniel11: null
	},
	{
		id: 'medo-persia',
		empire: 'Medo-Persia',
		era: '539 – 331 BC',
		statue: {
			part: 'Breast & arms',
			material: 'Silver',
			tone: '#b9bec4',
			refs: 'Daniel 2:32, 39',
			note: 'An inferior kingdom rises after Babylon - two arms for the two peoples in it.'
		},
		daniel7: {
			caption: 'Bear raised on one side',
			refs: 'Daniel 7:5',
			note: 'Three ribs in its mouth, and the word: arise, devour much flesh.',
			img: null
		},
		daniel8: {
			caption: 'Ram with two horns',
			refs: 'Daniel 8:3–4, 20',
			note: 'The higher horn came up last - Persia rising above Media, and named outright by Gabriel.',
			img: null
		},
		daniel11: {
			caption: 'The kings of Persia',
			refs: 'Daniel 11:2',
			note: 'Three kings yet in Persia, and a fourth far richer, who stirs all up against Greece.',
			img: null
		}
	},
	{
		id: 'greece',
		empire: 'Greece',
		era: '331 – 168 BC',
		statue: {
			part: 'Belly & thighs',
			material: 'Brass',
			tone: '#a8762f',
			refs: 'Daniel 2:32, 39',
			note: 'A third kingdom of brass, which shall bear rule over all the earth.'
		},
		daniel7: {
			caption: 'Leopard, four wings, four heads',
			refs: 'Daniel 7:6',
			note: 'Speed doubled and dominion given - and after its head, four.',
			img: null
		},
		daniel8: {
			caption: 'He-goat with a notable horn',
			refs: 'Daniel 8:5–8, 21',
			note: 'It crossed the earth without touching the ground; the great horn broke, and four came up.',
			img: null
		},
		daniel11: {
			caption: 'The mighty king',
			refs: 'Daniel 11:3–4',
			note: 'A mighty king rules with great dominion, and his kingdom is broken toward the four winds.',
			img: null
		}
	},
	{
		id: 'rome',
		empire: 'Rome',
		era: '168 BC – AD 476',
		statue: {
			part: 'Legs',
			material: 'Iron',
			tone: '#7c8188',
			refs: 'Daniel 2:33, 40',
			note: 'The fourth kingdom, strong as iron, breaking in pieces and bruising all before it.'
		},
		daniel7: {
			caption: 'Dreadful beast, iron teeth',
			refs: 'Daniel 7:7',
			note: 'Diverse from all before it, devouring and stamping the residue with its feet.',
			img: null
		},
		daniel8: {
			caption: 'The little horn',
			refs: 'Daniel 8:9–12, 23–25',
			note: 'Waxing great toward the south, the east and the pleasant land, and against the host of heaven.',
			img: null
		},
		daniel11: {
			caption: 'The power that stands up',
			refs: 'Daniel 11:14–22',
			note: 'The arms are overflown and broken before it - the prince of the covenant included.',
			img: null
		}
	},
	{
		id: 'divided-rome',
		empire: 'Divided Rome',
		era: 'AD 476 onward',
		statue: {
			part: 'Feet & toes',
			material: 'Iron & clay',
			tone: '#8a6a5a',
			refs: 'Daniel 2:33, 41–43',
			note: 'Partly strong, partly broken; they mingle themselves but do not cleave one to another.'
		},
		daniel7: {
			caption: 'Ten horns',
			refs: 'Daniel 7:7, 24',
			note: 'Ten kings out of this kingdom, and after them another, diverse from the first.',
			img: null
		},
		daniel8: null,
		daniel11: null
	},
	{
		id: 'kingdom-of-heaven',
		empire: 'The kingdom of Heaven',
		era: 'Everlasting',
		apart: true,
		statue: {
			part: 'The stone',
			material: 'Cut without hands',
			tone: '#dfe3e8',
			refs: 'Daniel 2:34–35, 44–45',
			note: 'It smites the image on its feet, and becomes a great mountain filling the whole earth - a kingdom that shall never be destroyed.'
		},
		daniel7: {
			caption: 'The Son of Man',
			refs: 'Daniel 7:13–14, 27',
			note: 'He comes with the clouds of heaven to the Ancient of days, and there is given him dominion that shall not pass away.',
			img: null
		},
		daniel8: {
			caption: 'The sanctuary is cleansed',
			refs: 'Daniel 8:14',
			note: 'Unto two thousand and three hundred days; then shall the sanctuary be cleansed - the answer to the horn that cast down the place of it.',
			img: null
		},
		daniel11: {
			caption: 'Michael stands up',
			refs: 'Daniel 12:1',
			note: 'The great prince that standeth for the children of thy people - the line of kings runs out, and he stands up.',
			img: null
		}
	}
];

/** Every picture cell, flattened — used for plate numbering and lookups. */
export const VISION_CELLS = VISION_ROWS.flatMap((row) =>
	/** @type {const} */ (['daniel7', 'daniel8', 'daniel11'])
		.map((key) => ({ key, cell: row[key] }))
		.filter(({ cell }) => cell)
		.map(({ key, cell }) => ({
			id: `${row.id}-${key}`,
			columnId: key === 'daniel7' ? 'daniel-7' : key === 'daniel8' ? 'daniel-8' : 'daniel-11',
			rowId: row.id,
			empire: row.empire,
			...(/** @type {VisionCell} */ (cell))
		}))
);
