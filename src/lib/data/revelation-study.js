// The study the four-division chart belongs to: Revelation read as the day of
// the Lord, and the seven premises that hold the book together. The chart, its
// divisions and its paired steps stay in revelation-outline.js.
//
// The claim the page is built on: chapters 4–11 and 12–19 are one history told
// from opposite sides - Christ's kingdom judged, then the beast's.

export const INTRO = {
	eyebrow: 'Reference · The Book of Revelation',
	lede: 'Revelation is hard because most readings treat its pieces as isolated units: a mark, a beast, a plague, a number. Once the whole is seen, each piece has a place.',
	caveat: 'Nobody understands the entire book. The aim is not an infallible reading. It is a set of principles that hold the book together.'
};

/** Premise 1, which the other six stand on. */
export const DAY_OF_THE_LORD = {
	eyebrow: 'Premise 01',
	title: 'Revelation is the day of the Lord.',
	verses: [
		{
			reference: 'Joel 2:1',
			quote: 'Blow the trumpet in Zion… for the day of the LORD cometh, for it is nigh at hand.'
		},
		{
			reference: 'Malachi 4:5',
			quote: 'Behold, I will send you Elijah the prophet before the coming of the great and dreadful day of the LORD.'
		}
	],
	body: 'That day is not simply the second coming, and it is not twenty-four hours. It is the span in which God steps back into human history.',
	span: [
		'The pre-advent judgment',
		'The examination of the living church',
		'The time of trouble',
		'The coming of Christ'
	],
	spanNote: 'And it may run beyond that. Peter’s word still stands: a day with the Lord is as a thousand years.',
	spanNoteRef: '2 Peter 3:8',
	turn: 'Humanity has had its time to parade and to harm. God’s time is coming.',
	johnQuote: 'I was in the Spirit on the Lord’s day.',
	johnRef: 'Revelation 1:10',
	johnNote: 'Not Saturday. Not Sunday. In the Spirit he was taken into that period.'
};

/** Premises 2–7 — the template the chart draws. */
export const PREMISES = [
	{ num: 2, body: 'The focus is the judgment of two kingdoms.' },
	{ num: 3, body: 'Part A - chapters 4 to 11 - is the judgment of Christ’s kingdom.' },
	{ num: 4, body: 'Part B - chapters 12 to 19 - is the judgment of the beast’s kingdom.' },
	{ num: 5, body: 'The seven seals are the record of Christ’s kingdom, opened and examined in the judgment.' },
	{ num: 6, body: 'Chapters 12 to 19 are the matching record of the beast’s kingdom.' },
	{ num: 7, body: 'Both sections tell the same history, from opposite sides.' }
];

export const PREMISES_CLOSE =
	'Once that template is in place, a detail is no longer a stray fact. You know where it belongs.';

/** The story as it runs, once the template is in hand. */
export const STORY = [
	{
		id: 'christs-kingdom',
		division: 'christ',
		label: 'Christ’s kingdom · 4–11',
		title: 'The seals are the history of the church.',
		body: 'Just before the seventh, the kingdom appears in its final form: the 144,000. After they are sealed come the seven trumpets - the seven last plagues. In chapter 11, Christ receives the kingdom.'
	},
	{
		id: 'beasts-kingdom',
		division: 'beast',
		label: 'The beast’s kingdom · 12–19',
		title: 'Chapter 12 opens the other side.',
		body: 'The dragon against the woman and the man-child; war on God’s people. There is background - the woman, the beast, the wilderness - but the book does not linger. It is about the day of the Lord. It moves quickly to the two beasts: the first, then the two-horned lamb-like beast. Together they bring the mark of the beast.'
	}
];

/** What the mark does to the church — the midnight cry. */
export const AWAKENING = {
	eyebrow: 'What the mark does to the church',
	title: 'The crisis does not only threaten. It wakes.',
	body: 'Chapter 13 is followed at once by chapter 14: an angel in mid-heaven, with the everlasting gospel, announcing that the hour of God’s judgment has come. The earth is split into two camps - sheep and goats, lamps with oil and lamps without.',
	virgins: 'This is the ten virgins. At midnight a cry is made. They arise and trim their lamps. The midnight cry is that awakening. The three angels fly, and the gospel goes to all nations in a short space of time.',
	warning: {
		title: 'No one manufactures that moment.',
		body: 'You cannot create Pentecost, or the cross, or the Day of Atonement. A man may announce that the mark has come and try, by himself, to raise the great awakening. In a few weeks he is weary, and the world is as it was. The issue was not the issue, because God had not made it.'
	},
	cry: {
		quote: 'Behold, the bridegroom cometh.',
		reference: 'Matthew 25:6',
		note: 'The midnight cry does not come from a teacher on earth. It comes from heaven. It will be unmistakable. Then the preaching begins.'
	}
};

/** Harvest, plagues, and the pause that Revelation 17 fills. */
export const HARVEST = {
	eyebrow: 'Harvest, then plagues, then a pause',
	steps: [
		{ reference: 'Revelation 14', body: 'A sickle; the earth is harvested.' },
		{ reference: 'Revelation 16', body: 'The plagues, in sequence.' }
	],
	pause: 'In the middle of that sequence the narrative stops. God says, in effect: hold. I will show you the judgment of the woman - the great harlot. She receives special treatment. Here is the background.',
	here: {
		reference: 'Revelation 17',
		body: 'That is where this study now stands.',
		href: '/beast',
		linkLabel: 'The beast and the woman'
	}
};

/** The pattern, in four lines: one kingdom against the other. */
export const PATTERN = [
	{
		stage: 'Record examined',
		christ: 'Seven seals',
		beast: 'Chapters 12–19'
	},
	{
		stage: 'Final form',
		christ: '144,000 sealed',
		beast: 'Mark of the beast'
	},
	{
		stage: 'Last work',
		christ: 'Three angels; midnight cry; harvest',
		beast: 'Final assault'
	},
	{
		stage: 'End of this age',
		christ: 'Trumpets and plagues; Christ receives the kingdom (11)',
		beast: 'Beast judged; the woman judged (17–19)'
	}
];

export const CLOSING =
	'The day of the Lord is that whole stretch - not a date on a calendar, and not a pile of disconnected symbols. It is God’s day, in which the two kingdoms are brought into the open, judged, and finished.';
