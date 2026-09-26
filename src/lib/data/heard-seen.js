// Heard versus seen — a working principle in Revelation.
//
// Twice over, and in the same shape each time, John is told one thing and then
// turns and sees another. The two are never rival reports: what he hears names
// the thing, and what he sees tells him what it actually is. The seen governs
// the heard, and where the book is read the other way round it goes wrong.
//
// Each case is rendered the same way — the announcement, the turn, the sight,
// then the line that proves one subject and not two. Adding a case is a matter
// of adding an entry here.
//
// Read on /the-144000, where the principle is not a note on the side but the
// argument: the Lion and the Lamb is the precedent, and the number and the
// multitude is the case it decides.

/** The principle in three lines, printed under the opening. */
export const PRINCIPLE = [
	{
		id: 'the-ear',
		step: 'The ear receives the title',
		note: 'What is announced is what was already promised and already expected - the name the reader arrives holding.'
	},
	{
		id: 'the-eye',
		step: 'The eye receives the nature',
		note: 'What is shown is how that promise is actually kept. It is never the opposite of the announcement; it is its content.'
	},
	{
		id: 'the-rule',
		step: 'The seen interprets the heard',
		note: 'Read in that order the two agree exactly. Read the other way - the sight bent to fit the expectation - and the passage is lost.'
	}
];

/**
 * @typedef {object} Side
 * @property {string} verb      'Heard' or 'Saw'.
 * @property {string} cue       The clause in the text that marks the turn.
 * @property {string} title     What is named or shown.
 * @property {string} quote
 * @property {string} refs
 * @property {string} gloss     What this side alone would leave the reader with.
 * @property {string} img
 * @property {string} alt
 * @property {'cover' | 'contain'} [fit]  How the image sits in its frame.
 *   Defaults to cover. `contain` is for artwork drawn on a white ground, which
 *   is matted rather than cropped to a bleed.
 * @property {string} [focus] object-position for a cover image. Defaults to centre.
 */

/**
 * @typedef {object} Case
 * @property {string} id
 * @property {number} n
 * @property {string} label
 * @property {string} reference
 * @property {string} intro     The setting, printed above the two panels.
 * @property {Side} heard
 * @property {Side} saw
 * @property {string} same      The line that proves one subject, not two.
 * @property {string[]} reading
 * @property {{term: string, meaning: string, refs: string}[]} keys
 */

/** @type {Case[]} */
export const CASES = [
	{
		id: 'lion-and-lamb',
		n: 1,
		label: 'The Lion and the Lamb',
		reference: 'Revelation 5:5–7',
		intro:
			'John is weeping because no one is found worthy to open the book. An elder tells him to stop, and names the one who has prevailed. Then John looks - and what is standing there is not what he was told to expect.',
		heard: {
			verb: 'Heard',
			cue: 'And one of the elders saith unto me',
			title: 'The Lion of the tribe of Juda',
			quote: 'Weep not: behold, the Lion of the tribe of Juda, the Root of David, hath prevailed to open the book, and to loose the seven seals thereof.',
			refs: 'Revelation 5:5',
			gloss: 'A lion, a tribe, a root, and a victory already won. Every word of it is the language of conquest - and every word of it was promised long before John heard it said.',
			img: '/Tribe of Judah.jpg',
			alt: 'A crowned lion standing on a rock beneath a banner bearing the lion of Judah',
			focus: 'center 30%'
		},
		saw: {
			verb: 'Saw',
			cue: 'And I beheld, and, lo',
			title: 'A Lamb as it had been slain',
			quote: 'And I beheld, and, lo, in the midst of the throne and of the four beasts, and in the midst of the elders, stood a Lamb as it had been slain, having seven horns and seven eyes, which are the seven Spirits of God sent forth into all the earth.',
			refs: 'Revelation 5:6',
			gloss: 'Not a lion at all. A lamb, and a killed one - standing, with the marks still on it. The whole weight of the announcement lands on something that has already been slaughtered.',
			img: '/Lamb Of God.jpeg',
			alt: 'A slain lamb with seven horns and seven eyes, lying beside the scroll sealed with seven seals',
			fit: 'contain'
		},
		same: 'One subject, not two: the next verse has him take the book. He came and took the book out of the right hand of him that sat upon the throne - the Lion that had prevailed, and the Lamb that is standing there, are the same person doing the same act.',
		reading: [
			'The elder does not misspeak, and John does not mishear. What is announced is the promise of Genesis 49 - Judah is a lion’s whelp, and the sceptre shall not depart from him. That is the title, and it is the title the reader is holding when they arrive at chapter 5.',
			'What John then sees is how the title was earned. The Lion prevailed, and the prevailing looks like a lamb with its throat cut. The conquest is real, the enemy is beaten, and the whole of it was done by dying - so the strength that opens the seals is not a strength the announcement would have led anyone to picture.',
			'This is why the seals can be opened at all. No man in heaven or earth was found worthy, and worthiness here is not power in the abstract: the book is opened by the one who was slain, and by no one else. Read the sight first and the rest of the book follows. Read the announcement first, and expect a lion to behave like one, and every seal after it is read wrong.'
		],
		keys: [
			{
				term: 'Seven horns',
				meaning: 'A horn is power. Seven of them is all of it - the slain Lamb holds complete power, not a portion.',
				refs: 'Daniel 7:24 · Revelation 17:12'
			},
			{
				term: 'Seven eyes',
				meaning: 'The verse defines them itself: the seven Spirits of God, sent forth into all the earth. Complete sight, everywhere at once.',
				refs: 'Revelation 5:6 · Zechariah 4:10'
			},
			{
				term: 'As it had been slain',
				meaning: 'Standing, and still bearing the wound. The death is not left behind - it is the credential the book is opened on.',
				refs: 'Revelation 5:9'
			}
		]
	},
	{
		id: 'number-and-multitude',
		n: 2,
		label: 'The number and the multitude',
		reference: 'Revelation 7:1–17',
		intro:
			'Four angels are holding the four winds so that they hurt not the earth, until the servants of God are sealed in their foreheads. The sealing is done, and John is given the tally of it. Then, exactly as in chapter 5, he looks.',
		heard: {
			verb: 'Heard',
			cue: 'And I heard the number of them',
			title: 'A hundred and forty and four thousand',
			quote: 'And I heard the number of them which were sealed: and there were sealed an hundred and forty and four thousand of all the tribes of the children of Israel.',
			refs: 'Revelation 7:4',
			gloss: 'A counted figure and a closed list - twelve tribes, twelve thousand apiece, named one after another. Nothing in the book sounds more bounded, or more exclusively Israelite, than this.',
			img: '/The 144 000.jpg',
			alt: 'An angel with the seal of the living God sealing a man in the forehead, before ranks under the banners of the twelve tribes, twelve thousand to each'
		},
		saw: {
			verb: 'Saw',
			cue: 'After this I beheld, and, lo',
			title: 'A great multitude, which no man could number',
			quote: 'After this I beheld, and, lo, a great multitude, which no man could number, of all nations, and kindreds, and people, and tongues, stood before the throne, and before the Lamb, clothed with white robes, and palms in their hands.',
			refs: 'Revelation 7:9',
			gloss: 'The counted becomes the countless, and the twelve tribes become every nation on earth - with no word anywhere to say the subject has changed.',
			img: '/The Multitude.jpg',
			alt: 'An innumerable crowd from every nation in white robes with palm branches in their hands'
		},
		same: 'One subject, not two: both companies are the sealed, and both are before the throne. The angel’s order in verse 3 is to seal the servants of our God in their foreheads, and what John hears is the tally of that sealing; what he sees is the sealed company standing where the sealing was for. After this I beheld marks the same turn as and I beheld, and, lo two chapters earlier - a change of sense, not of subject.',
		reading: [
			'The number arrives with every mark of a census. Twelve tribes are named one by one, twelve thousand are counted out of each, and the total is given as a figure. Read on its own it draws a hard border: this many, and of Israel.',
			'Then he looks, and the border is not there. Not twelve tribes but all nations, kindreds, people and tongues; not a number but a crowd that no man could number. The ear was given the reckoning; the eye is given the reality - and the reality is not smaller than the reckoning, it is immeasurably larger.',
			'The elder does the same office he did in chapter 5. He asks who they are, and answers his own question: these are they which came out of great tribulation, and have washed their robes, and made them white in the blood of the Lamb. The Lamb again - the sight of chapter 5 is what makes sense of the sight of chapter 7. A company counted like Israel, drawn out of every nation, and made white by a death.'
		],
		keys: [
			{
				term: 'Twelve thousand of every tribe',
				meaning: 'Twelve is the number of God’s people ordered and complete - twelve tribes, twelve apostles, twelve gates and twelve foundations in the city. Twelve squared and thousandfold is completeness stated as arithmetic, not a headcount.',
				refs: 'Revelation 21:12–14 · Revelation 7:5–8'
			},
			{
				term: 'Sealed in their foreheads',
				meaning: 'The seal goes on before the winds are loosed, and it is what the number counts. What marks this company is the sealing, not a bloodline.',
				refs: 'Revelation 7:2–3 · Ezekiel 9:4'
			},
			{
				term: 'White robes and palms',
				meaning: 'Palms are the sign of a victory already given, and the robes are made white in the blood of the Lamb - washed, not born clean.',
				refs: 'Revelation 7:9, 14'
			}
		]
	}
];

/** @param {string} id */
export function getCase(id) {
	return CASES.find((item) => item.id === id) ?? null;
}
