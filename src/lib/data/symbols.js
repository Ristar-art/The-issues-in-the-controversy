// The prophetic lexicon — symbols defined the way the study defines them:
// from the text itself, with the passage that does the defining kept beside
// each entry so a reader can check the definition rather than take it.
//
// Shared by the landing-page glossary (which shows FEATURED_SYMBOLS only) and
// the /symbols page, so the two can never disagree.

export const SYMBOLS_TITLE = 'Decoding the Symbols';
export const SYMBOLS_SUBTITLE = 'Unlocking the prophetic vocabulary through textual evidence.';

// The three carried on the landing page, each with an image already in static/.
export const FEATURED_SYMBOLS = [
	{
		title: 'A Beast',
		description: 'Kingdom / Political Power',
		img: '/The beast with seven heads.png',
		alt: 'A beast from the prophecies of Daniel'
	},
	{
		title: 'A Woman',
		description: 'A Religious Body',
		img: '/lovely and delicate woman.jpg',
		alt: 'A woman, the prophetic figure of a church'
	},
	{
		title: 'Earth and Water',
		description: 'Geography',
		img: '/Land and water.jpg',
		alt: 'Earth and water seen from above'
	}
];

/**
 * The lexicon proper, grouped so it can be read by theme rather than only
 * scanned alphabetically. `refs` are the passages that define the symbol.
 */
export const SYMBOL_GROUPS = [
	{
		id: 'powers',
		title: 'Powers & Kingdoms',
		note: 'What the prophecies mean when they show an animal, a horn, or a mountain.',
		items: [
			{
				term: 'A Beast',
				meaning: 'A kingdom or political power/institution.',
				refs: ['Daniel 7:17', 'Daniel 7:23']
			},
			{
				term: 'A Horn',
				meaning: 'A king, or the kingdom that king stands for.',
				refs: ['Daniel 7:24', 'Daniel 8:21–22']
			},
			{
				term: 'A Mountain',
				meaning: 'A political or religio-political power.',
				refs: ['Daniel 2:35', 'Daniel 2:44–45', 'Revelation 17:9']
			},
			{
				term: 'A Dragon',
				meaning: 'Satan, and the earthly power he works through.',
				refs: ['Revelation 12:9', 'Revelation 12:3–4']
			},
			{
				term: 'A Lamb',
				meaning: 'Christ, and His sacrifice.',
				refs: ['John 1:29', 'Revelation 5:6']
			}
		]
	},
	{
		id: 'peoples',
		title: 'Peoples & Places',
		note: 'The prophecies map territory and population before they map events.',
		items: [
			{
				term: 'Waters / Sea',
				meaning: 'Peoples, multitudes, nations and tongues - a populated region.',
				refs: ['Revelation 17:15']
			},
			{
				term: 'Earth',
				meaning: 'A sparsely populated region, in contrast to the sea.',
				refs: ['Revelation 12:16']
			},
			{
				term: 'Wind',
				meaning: 'Strife, war, commotion.',
				refs: ['Jeremiah 25:31–33', 'Daniel 7:2']
			},
			// {
			// 	term: 'Babylon',
			// 	meaning: 'Confusion - apostasy, and the system built on it.',
			// 	refs: ['Genesis 11:6–9', 'Revelation 17:5', 'Revelation 18:2–3']
			// },
			{
				term: 'Jerusalem',
				meaning: "God's people.",
				refs: ['Galatians 4:26', 'Revelation 21:2']
			}
		]
	},
	{
		id: 'church',
		title: 'The Church',
		note: 'One figure, read two ways, depending on who she keeps company with.',
		items: [
			{
				term: 'A Woman (pure)',
				meaning: "God's faithful church.",
				refs: ['Jeremiah 6:2', '2 Corinthians 11:2', 'Revelation 12:1']
			},
			{
				term: 'A Woman (Babylon)',
				meaning: 'An apostate religious body.',
				refs: ['Ezekiel 16:15–32', 'Revelation 17:1–5']
			},
			{
				term: 'Stars',
				meaning: 'Angels, or the messengers of the churches.',
				refs: ['Revelation 1:16', 'Revelation 1:20']
			},
			{
				term: 'White Garments',
				meaning: "Christ's righteousness, given rather than earned.",
				refs: ['Isaiah 64:6', 'Revelation 19:8']
			},
			{
				term:"Eagle's wings",
				meaning: "Streng or Divine assistance from God",
				refs: ['Exodus 19:4,Isaiah 40:31']
			},
			{
				term: 'A Seal',
				meaning: 'A mark of ownership and approval.',
				refs: ['Romans 4:11', 'Revelation 7:2-3']
			}
		]
	},
	{
		id: 'time',
		title: 'Time',
		note: 'Prophetic time is measured on its own scale, and the text gives the scale.',
		items: [
			{
				term: 'A Day',
				meaning: 'A literal year in prophetic reckoning.',
				refs: ['Numbers 14:34', 'Ezekiel 4:6']
			},
			{
				term: 'A Time',
				meaning: 'One prophetic year - 360 days, and so 360 literal years.',
				refs: ['Daniel 4:16', 'Daniel 4:23']
			},
			{
				term: 'Time, Times and Half a Time',
				meaning: 'Three and a half prophetic years - 1260 days, and so 1260 years.',
				refs: ['Daniel 7:25', 'Revelation 12:6', 'Revelation 12:14']
			},
			{
				term: 'Morning and Evening',
				meaning: 'One day representing a year in the context of the sanctuary service, the Tamid',
				refs: ['Exodus 27:20-21','Daniel 8:14']
			},
			{
				term: 'The Harvest',
				meaning: 'The end of the world.',
				refs: ['Matthew 13:39']
			}
		]
	},
	{
		id: 'spirit',
		title: 'Spirit & Word',
		note: 'The instruments God works by, which the prophecies rarely name plainly.',
		items: [
			{
				term: 'Oil',
				meaning: 'The Holy Spirit.',
				refs: ['Zechariah 4:2–6', 'Revelation 4:5']
			},
			{
				term: 'Fire',
				meaning: 'The Holy Spirit, and elsewhere judgement.',
				refs: ['Luke 3:16', 'Acts 2:3']
			},
			{
				term: 'Pure Water',
				meaning: 'The Spirit, and the life that comes with Him.',
				refs: ['John 7:38–39', 'Ephesians 5:26']
			},
			{
				term: 'Bread',
				meaning: 'The word of God.',
				refs: ['John 6:35', 'John 6:63']
			},
			{
				term: 'A Sickle',
				meaning: 'The word of God, doing the work of separation.',
				refs: ['Revelation 14:14–19']
			},
			{
				term: 'A Trumpet',
				meaning: 'A warning of war or of judgement.',
				refs: ['Jeremiah 4:19–21', 'Zephaniah 1:14–16']
			}
		]
	}
];

/** Every entry, flattened — for counting and searching. */
export const ALL_SYMBOLS = SYMBOL_GROUPS.flatMap((group) =>
	group.items.map((item) => ({ ...item, group: group.title }))
);
