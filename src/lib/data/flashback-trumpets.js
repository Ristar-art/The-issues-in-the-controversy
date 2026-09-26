// The seven trumpets, drawn as one unbroken line, with Revelation 10:1 – 11:14
// held apart as the flashback that sits between the sixth and the seventh.
//
// The chart is built from two lists. TRUMPETS are the seven blasts themselves,
// in order, each one a narrow bar. INTERLUDE is everything the vision inserts
// between the sixth bar and the seventh — the block the page can retract, so
// that the six and the seven stand side by side and the sequence reads through.

export const FLASHBACK_TITLE = 'The Flashback';
export const FLASHBACK_SUBTITLE =
	'Between the sixth trumpet and the seventh, the vision stops going forward and turns back.';

/**
 * @typedef {object} Trumpet
 * @property {string} id
 * @property {number} n         Which trumpet, 1–7.
 * @property {string} label     Text on the bar.
 * @property {string} refs
 * @property {string} note      One paragraph, shown in the reading panel.
 * @property {string} tone      Which colour the bar carries.
 * @property {boolean} [hollow] Outlined rather than filled, as in the chart.
 * @property {string} [woe]     Marked on the badge: the three woe trumpets.
 */

/** @type {Trumpet[]} */
export const TRUMPETS = [
	{
		id: 't1',
		n: 1,
		label: 'Hail Fire Blood',
		refs: 'Revelation 8:7',
		note: 'Hail and fire mingled with blood are cast on the earth, and the third part of the trees and all green grass burn. The first blast lands on the ground itself — the settled world the church had leaned on.',
		tone: 'ice'
	},
	{
		id: 't2',
		n: 2,
		label: 'Burning Mountain',
		refs: 'Revelation 8:8–9',
		note: 'A great mountain burning with fire is cast into the sea, and a third of the sea becomes blood. A mountain is a kingdom; the sea is the peoples it falls among.',
		tone: 'fire'
	},
	{
		id: 't3',
		n: 3,
		label: 'Great Star',
		refs: 'Revelation 8:10–11',
		note: 'A great star burning as a lamp falls on the rivers and fountains of waters, and its name is Wormwood. What should have given light poisons the springs instead.',
		tone: 'ash'
	},
	{
		id: 't4',
		n: 4,
		label: 'Stars Smitten',
		refs: 'Revelation 8:12',
		note: 'A third of the sun, the moon and the stars is smitten, and the day loses a third of its light. The lights that governed the sky are struck — the fourth blast darkens the ruling powers themselves.',
		tone: 'amber',
		hollow: true
	},
	{
		id: 't5',
		n: 5,
		label: 'Pit opened',
		refs: 'Revelation 9:1–12',
		note: 'A star with the key of the bottomless pit opens it, and the smoke darkens the sun and the air. This is the first woe — and where the woes begin, the badges turn red.',
		tone: 'deep',
		woe: 'First woe'
	},
	{
		id: 't6',
		n: 6,
		label: '4 angels loosed',
		refs: 'Revelation 9:13–21',
		note: 'The four angels bound in the great river Euphrates are loosed, prepared for an hour, a day, a month and a year. The second woe. The narrative stands here, and does not move again until 11:14.',
		tone: 'ember',
		woe: 'Second woe'
	},
	{
		id: 't7',
		n: 7,
		label: 'Mystery finished',
		refs: 'Revelation 11:15–19',
		note: 'The seventh angel sounds and the kingdoms of this world become the kingdoms of our Lord. This is the blast the angel of chapter 10 had already named: in the days of his voice the mystery of God should be finished.',
		tone: 'gold',
		woe: 'Third woe'
	}
];

/**
 * @typedef {object} InterludeCell
 * @property {string} id
 * @property {string} label
 * @property {string} refs
 * @property {string} note
 * @property {string} tone
 * @property {number} col
 * @property {number} [span]
 * @property {number} [row]
 * @property {number} [rowSpan]
 * @property {boolean} [vertical]
 */

// Laid on a five-column grid: three blocks across the top, the temple measured
// running under all three, and the last two standing full height.
export const INTERLUDE_COLUMNS = [230, 285, 245, 82, 82];

/** @type {InterludeCell[]} */
export const INTERLUDE = [
	{
		id: 'f-book',
		label: 'Little Book opened',
		refs: 'Revelation 10:1–2, 8–11',
		note: 'The angel stands with a little book open in his hand — the book Daniel was told to shut up and seal. It is sweet in the mouth and bitter in the belly, and it ends in a commission: thou must prophesy again before many peoples.',
		tone: 'life',
		col: 1
	},
	{
		id: 'f-prophesy',
		label: '2 Witnesses Prophesy',
		refs: 'Revelation 11:3–6',
		note: 'The two witnesses prophesy a thousand two hundred and threescore days, clothed in sackcloth. Their work runs the whole length of the same period the beast is given — which is why this block cannot be squeezed into the space between two trumpet blasts.',
		tone: 'life',
		col: 2
	},
	{
		id: 'f-killed',
		label: 'Witnesses killed',
		refs: 'Revelation 11:7–10',
		note: 'When they have finished their testimony the beast out of the bottomless pit makes war against them and kills them, and their bodies lie in the street of the great city three days and a half.',
		tone: 'life',
		col: 3
	},
	{
		id: 'f-temple',
		label: 'Temple measured',
		refs: 'Revelation 11:1–2',
		note: 'Measure the temple, the altar, and them that worship therein. The measuring runs underneath the whole flashback because it is the work going on the entire time the witnesses prophesy — the same judgment Daniel saw sit.',
		tone: 'life',
		col: 1,
		span: 3,
		row: 2
	},
	{
		id: 'f-ascend',
		label: 'Witnesses ascend',
		refs: 'Revelation 11:11–12',
		note: 'After three days and a half the Spirit of life from God enters into them, and a voice from heaven says Come up hither. They ascend in a cloud, and their enemies watch them go.',
		tone: 'sky',
		col: 4,
		rowSpan: 2,
		vertical: true
	},
	{
		id: 'f-quake',
		label: 'Great earthquake',
		refs: 'Revelation 11:13',
		note: 'The same hour there is a great earthquake, a tenth of the city falls, and the remnant give glory to the God of heaven. The next verse closes the flashback and hands the narrative straight back: the second woe is past.',
		tone: 'sky',
		col: 5,
		rowSpan: 2,
		vertical: true
	}
];

/** The seam itself — the verse that hands the narrative back to the sequence. */
export const SEAM = {
	ref: 'Revelation 11:14',
	text: 'The second woe is past; and, behold, the third woe cometh quickly.'
};

/** The angel's oath, which is why the gap is there at all. */
export const OATH = {
	ref: 'Revelation 10:6–7',
	text: 'That there should be time no longer: but in the days of the voice of the seventh angel, when he shall begin to sound, the mystery of God should be finished.'
};

/** Every block that carries a reading, flattened for lookups. */
export const FLASHBACK_CELLS = [
	...TRUMPETS.map((trumpet) => ({
		id: trumpet.id,
		label: trumpet.label,
		refs: trumpet.refs,
		note: trumpet.note,
		tone: trumpet.tone,
		band: /** @type {const} */ ('trumpet'),
		bandLabel: `Trumpet ${trumpet.n}`
	})),
	...INTERLUDE.map((cell) => ({
		id: cell.id,
		label: cell.label,
		refs: cell.refs,
		note: cell.note,
		tone: cell.tone,
		band: /** @type {const} */ ('interlude'),
		bandLabel: 'The flashback'
	}))
];

// The argument the page is making, in three moves. Rendered under the chart so
// the reader meets it having already worked the toggle.
export const ARGUMENT = [
	{
		id: 'continuous',
		kicker: 'One',
		title: 'The seven are one line.',
		body: 'Retract the middle and the trumpets read straight through: first to seventh, no seam, no missing blast. Nothing in the sequence is waiting on the flashback - the sixth angel sounds in 9:13 and the seventh sounds in 11:15, and the count between them is unbroken. The gap is in the telling, not in the events.'
	},
	{
		id: 'flashback',
		kicker: 'Two',
		title: 'The middle looks back, not forward.',
		body: 'A thousand two hundred and threescore days of prophesying cannot be fitted into the pause between two blasts. Revelation 10:1 – 11:14 covers ground the trumpets have already run past - the open book, the measuring, the witnesses. It is a flashback: the same stretch of time told again, this time from the side of the people of God.'
	},
	{
		id: 'purpose',
		kicker: 'Three',
		title: 'The gap is put there on purpose.',
		body: 'The angel swears that in the days of the seventh angel the mystery of God should be finished. Then, before that seventh angel is allowed to sound, the vision stops and shows what has to be done first: the book opened, the temple measured, the witnesses finishing their testimony. The flashback is God holding the seventh trumpet back long enough to show the reader what the mystery being finished actually costs.'
	}
];
