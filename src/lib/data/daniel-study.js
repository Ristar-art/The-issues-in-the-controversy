// The study the four-vision chart belongs to: Daniel read as the restoration of
// a kingdom that lost everything, and chapter 7 read as the key to Revelation.
// The chart itself - the empires, the great image and the four visions - stays
// in daniel-visions.js.
//
// The claim the page is built on: the four visions are not one prophecy told
// four times but four aspects of one kingdom, each carried to its restoration.

export const INTRO = {
	eyebrow: 'Reference · The Visions of Daniel',
	lede: 'Daniel and Revelation are not history leaked in advance. They are the last chapter of a war that began in heaven.'
};

/** The two things God had to do, and the one still outstanding. */
export const TWO_TASKS = {
	eyebrow: 'What the war is about',
	title: 'Character was answered. Government is the open question.',
	tasks: [
		{
			num: '01',
			name: 'Character',
			body: 'Reveal and vindicate what kind of person God is. The incarnation, death and resurrection of Christ answered that.',
			state: 'Answered'
		},
		{
			num: '02',
			name: 'Government',
			body: 'God is good. The remaining question is whether His system works - the question that convinced a third of the angels.',
			state: 'Still open'
		}
	],
	close: 'These two books are about that second question.'
};

/** Government as a principle rather than a place. */
export const GOVERNMENT = {
	eyebrow: 'Government is a principle, not a place',
	title: 'A constitution, not a capital.',
	body: 'A government is a way of administering people - not a land mass, and not a flag.',
	satan: 'Satan’s principle is self-government, sold as freedom. God says the only real freedom is the yoke of Christ.',
	statement: 'People who belong to neither America nor China nor the Vatican can still be under Satan’s government. The places are many. The principle is one.',
	public: 'We who read the Bible read with biased eyes. Skeptics read the same pages and come out elsewhere. That is why the judgment must be public: the universe has to see what is obvious to us - and we have a part in that vindication.'
};

/** Why the book matters, and how it divides. */
export const WHY_DANIEL = {
	eyebrow: 'Why Daniel matters',
	quote: 'None of the wicked shall understand; but the wise shall understand.',
	reference: 'Daniel 12:8–10',
	halves: [
		{ label: 'History', chapters: '1 · 3 · 4 · 5 · 6' },
		{ label: 'Prophecy', chapters: '2 · 7 · 8 · 9–12' }
	],
	hint: 'The history already hints at the end. Daniel 3 - the image, the command to bow - is Revelation 13 in parable: not a statue in a park, but a system of government demanding allegiance.',
	close: 'Daniel is not a closed account of Jewish history, fulfilled in the first century. It is preparation for the last conflict.'
};

/** Judah in Babylon as the type of the church at the end. */
export const JUDAH = {
	eyebrow: 'Judah as a type',
	title: 'What happened to the Jews illustrates what happens to the church.',
	body: 'The Old Testament is a parable of something greater. By Daniel’s day the ten tribes were gone. The book is about Judah, destroyed by Babylon: a people captive in a strange place. That is also the church at the end.',
	fall: {
		reference: '2 Chronicles 36',
		body: 'They mocked the messengers until there was no remedy. Then the sanctuary was burned, the vessels taken, the king’s eyes put out. The people remained alive only as captives.'
	},
	spiritual: 'The same history, spiritually: apostasy, men as rulers, tradition as worship, darkness.',
	mercy: 'The majority of God’s people today are still His - as the Jews in Babylon were still His - but they are in captivity. We have no right to condemn them. God did not condemn us in the same dark. He came to get us out.',
	exodus: 'The exodus happens in pockets, as with Ezra and Nehemiah. A person can be in Babylon’s environment and not in Babylon’s spirit.',
	daniel: 'Daniel was.'
};

/** The four things that make a kingdom - and how each one was lost. */
export const MARKS = [
	{
		num: '01',
		name: 'Geographic',
		what: 'A land mass.',
		now: 'No country you can point to.'
	},
	{
		num: '02',
		name: 'Political',
		what: 'A constitution and an administration.',
		now: 'Most of His people under denominational politics.'
	},
	{
		num: '03',
		name: 'Religious',
		what: 'From Nimrod onward every kingdom had a cult; Judah’s was Jehovah at the sanctuary.',
		now: 'Worship confused.'
	},
	{
		num: '04',
		name: 'Demographic',
		what: 'People. No people, no kingdom.',
		now: 'The people scattered and unrecognizable.'
	}
];

export const MARKS_CLOSE =
	'Judah lost all four. Christ’s kingdom in this age is in the same captivity - and God intends to restore all four.';

/**
 * The four visions, one per aspect of the kingdom. Each `ends` line is where
 * that vision actually stops, which in every case is past the Jews' return to
 * Palestine and at the true end.
 */
export const VISIONS = [
	{
		id: 'daniel-2',
		vision: 'Daniel 2',
		aspect: 'Geographic',
		body: 'Gold, silver, bronze, iron, iron and clay: Babylon through divided Rome. Metal of the earth. It does not end at the feet - a stone strikes the image, becomes a mountain, and fills the whole earth.',
		ends: 'The stone becomes a mountain filling the earth. God’s people get their country back.'
	},
	{
		id: 'daniel-7',
		vision: 'Daniel 7',
		aspect: 'Political',
		body: 'Four wild beasts - heaven’s view of earthly politics: dominance, war, succession. Lion: Babylon. Bear: Medo-Persia. Leopard: Greece. The fourth, matching no known animal: Rome, still here, wounded, re-emerging, to come up from the bottomless pit as Satan’s last kingdom on earth. The little horn is the papacy.',
		ends: 'The Son of Man given an everlasting dominion. The true King on the throne.'
	},
	{
		id: 'daniel-8',
		vision: 'Daniel 8',
		aspect: 'Religious',
		body: 'Ram and he-goat: sanctuary animals. The climax is the 2,300 days, and then the sanctuary restored - a better word than “cleansed.” Not Herod’s temple.',
		ends: 'True worship given back to the body of Christ - the sanctuary in which He dwells.'
	},
	{
		id: 'daniel-11',
		vision: 'Daniel 11–12',
		aspect: 'Demographic',
		body: 'No symbols. Literal kings, north and south. At the end Michael stands up, and there is a time of trouble such as never was.',
		ends: '“Thy people shall be delivered, every one that shall be found written in the book.” Not a return to Palestine - deliverance from this planet.'
	}
];

export const VISIONS_LEDE =
	'Not one prophecy told four times. Four aspects of the kingdom, each vision ending at the true end.';

/** Daniel 7, in the order the chapter gives it. */
export const KEY_ORDER = [
	'Four kingdoms rise. The fourth overruns the world.',
	'Thrones set. The Ancient of Days sits. The books are opened.',
	'The fourth beast is slain and given to the burning flame.',
	'One like the Son of Man comes with clouds to the Ancient of Days - not to earth - and is given the kingdom.'
];

/** Why that order settles what the chapter is describing. */
export const KEY_POINTS = [
	{
		title: 'Not the white throne after the millennium',
		body: 'Revelation 19 throws the beast into the lake of fire when Christ comes, before the thousand years. So the court in Daniel 7 sits before that.'
	},
	{
		title: 'The fourth beast is the last one',
		body: 'The other beasts lost dominion but lived on - Babylon, Persia and Greece are still on the map. The fourth, when it goes, is gone. None after it.'
	},
	{
		title: 'The clouds in 7:13 are not the second coming',
		body: 'The destination is the Father. In Luke 19 a nobleman goes far away to receive a kingdom, and to return. Pentecost put the kingdom in hearts; it did not hand Him the nations.'
	},
	{
		title: 'The nations come at the seventh trumpet',
		body: '“The kingdoms of this world are become the kingdoms of our Lord, and of His Christ” (Revelation 11:15). Five kingdoms, then, not four - and two verdicts, both from the judgment: the beast burned, and Christ given the earth forever.'
	}
];

export const KEY_CLOSE = {
	authority: 'He already has all authority (Matthew 28:18) as general of the war. Demons obey because they are compelled. He does not yet rule the planet.',
	weighing: 'Kingdoms four and five have grown side by side for two thousand years. Then the verdict: this fifth is the first not found wanting. That is not God arbitrarily planting a throne. The whole book is successive weighing.',
	line: 'The fifth lasts.'
};

/** Two trials already worked out inside the book. */
export const EXAMPLES = [
	{
		name: 'Belshazzar',
		reference: 'Daniel 5',
		quote: 'Mene, tekel, peres.',
		body: 'Numbered - to have someone’s number is an accurate reading of character - weighed in the balances, divided. Babylon measured and passed to the Medes and Persians. That phase of Satan’s kingdom had failed.'
	},
	{
		name: 'Nebuchadnezzar',
		reference: 'Daniel 4:17',
		quote: 'By the decree of the watchers, and the demand by the word of the holy ones.',
		body: 'Seven years with a beast’s heart - and God does not pass this sentence alone. His own kingdom is in the dock; heaven is a jury. The twenty-four elders in Revelation hint at the same court.'
	}
];

/** Why there is a trial at all, when God already knows. */
export const WHY_JUDGED = {
	eyebrow: 'Why Christ is judged at all',
	notThis: ['Not His integrity.', 'Not whether His people can be lost.'],
	charge: 'Does His way of dealing with people work?',
	body: 'There are other persons in the room. The world still runs on educate, imprison, coerce. The 144,000 are to show that Christ in you produces the best people who have ever lived.',
	timing: 'That has to happen before He comes. When He comes, the righteous are caught up.',
	transparency: 'God does not need a judgment in order to know. Heaven is not run on what God knows in private; it is run on transparency. If He were the only person involved, Satan would have been gone at the first lie. He was not. That is why there is a judgment, and why we are not in heaven yet.'
};

export const CLOSING =
	'Revelation is Daniel 7 opened: two kingdoms grown side by side, a court, books opened, one kingdom burned, the other given the earth forever.';
