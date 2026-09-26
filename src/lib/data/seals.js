// The seven seals of Revelation 6–8, read as successive states of the church.
// Shared by the landing-page filmstrip and the /seals page so the two can
// never tell different stories; `id` is the anchor each seal is linked by.
export const SEALS_TITLE = 'The Seven Seals';
export const SEALS_SUBTITLE = 'The state of the Church, the kingdom of Christ.';

export const SEALS = [
	{
		id: 'first-seal',
		era: '1st Seal',
		title: 'The White Horse',
		reference: 'Revelation 6:1–2',
		body: 'The church in its infancy, while it was still pure, in the age of the apostles.',
		img: '/white horse.jpg',
		alt: 'An image of the rider on a white horse'
	},
	{
		id: 'second-seal',
		era: '2nd Seal',
		title: 'The Red Horse',
		reference: 'Revelation 6:3–4',
		body: 'The church in the age of compromise, while it was being widely adopted and also being corrupted.',
		img: '/red horse.jpg',
		alt: 'An image of the rider on a red horse'
	},
	{
		id: 'third-seal',
		era: '3rd Seal',
		title: 'The Black Horse',
		reference: 'Revelation 6:5–6',
		body: 'The age where the word of God was being sold by the church.',
		img: '/black horse.jpg',
		alt: 'An image of the rider on a black horse'
	},
	{
		id: 'fourth-seal',
		era: '4th Seal',
		title: 'The Pale Horse',
		reference: 'Revelation 6:7–8',
		body: 'An era where the church became the source of death.',
		img: '/pale horse.jpg',
		alt: 'An image of the rider on a pale horse'
	},
	{
		id: 'fifth-seal',
		era: '5th Seal',
		title: 'The Souls Under The Altar',
		reference: 'Revelation 6:9–11',
		body: 'The period of the pre-advent judgement. The saints of God are vindicated.',
		img: '/the fith seal.jpg',
		alt: 'An image of the souls under the altar'
	},
	{
		id: 'sixth-seal',
		era: '6th Seal',
		title: 'The Apocalyptic Events',
		reference: 'Revelation 6:12–17',
		body: 'The Spirit of God and His protection are withdrawn from earth.',
		img: '/Appocalips.jpg',
		alt: 'An image of apocalyptic events'
	},
	{
		id: 'seventh-seal',
		era: '7th Seal',
		title: 'Silence in Heaven',
		reference: 'Revelation 8:1–6',
		body: 'The close of probation. There is no more grace given.',
		img: '/seven trampets.jpg',
		alt: 'An image of seven angels with seven trumpets'
	}
];

/** @param {string} id */
export function getSeal(id) {
	return SEALS.find((seal) => seal.id === id) ?? null;
}

/**
 * The seals either side of one, for the walk-through navigation at the foot of
 * each study. The sequence does not wrap — the first and the last are ends.
 * @param {string} id
 */
export function getSealNeighbours(id) {
	const index = SEALS.findIndex((seal) => seal.id === id);
	if (index === -1) return { index: -1, previous: null, next: null };
	return {
		index,
		previous: SEALS[index - 1] ?? null,
		next: SEALS[index + 1] ?? null
	};
}

/* ------------------------------------------------------------------------
   The chain the /seals chart is drawn from.

   One line runs through the whole book: the judgement of Christ's kingdom
   opens the sealed scroll, the seventh seal opens the seven trumpets, and the
   seventh trumpet ends with Christ as the sole ruler of the universe. Each
   tier of the chart is six blocks and a seventh drawn apart, because the
   seventh is never one more event — it is the door into the next seven.
   ------------------------------------------------------------------------ */

/** The court that the whole sequence proceeds from. */
export const JUDGEMENT = {
	label: 'The Judgement of Christ’s Kingdom',
	short: 'The judgement',
	reference: 'Daniel 7:9–10 · Revelation 5:1–7'
};

/** What the seventh trumpet leaves standing — and what it does not. */
export const REIGN = {
	label: 'Christ, sole ruler',
	short: 'Christ reigns',
	reference: 'Revelation 11:15–18',
	cells: [
		{
			id: 'kingdoms-handed-over',
			label: 'The kingdoms of this world become the kingdoms of our Lord',
			refs: 'Revelation 11:15',
			tone: 'reign'
		},
		{
			id: 'no-rival-kingdom',
			label: 'No rival kingdom is left standing',
			refs: 'Daniel 2:44 · Daniel 7:27',
			tone: 'reign-soft'
		},
		{
			id: 'reigns-for-ever',
			label: 'And he shall reign for ever and ever',
			refs: 'Revelation 11:15 · 22:5',
			tone: 'reign'
		}
	]
};

/** The three hand-offs, in prose, for the ladder at the foot of the page. */
export const CHAIN = [
	{
		id: 'from-the-judgement',
		from: 'Out of the judgement',
		to: 'come the seven seals',
		reference: 'Daniel 7:9–10 · Revelation 5:1–7',
		body: 'The court is seated and the books are opened, and in the hand of him that sits on the throne is a book sealed with seven seals. Nothing is opened until the judgement sits. The seals are not the start of the story - they are what the judgement releases.'
	},
	{
		id: 'from-the-seventh-seal',
		from: 'Out of the seventh seal',
		to: 'come the seven trumpets',
		reference: 'Revelation 8:1–6',
		body: 'The seventh seal is not one more scene beside the other six. When it is opened there is silence in heaven about the space of half an hour, and then seven angels are given seven trumpets. The seventh seal is the container the trumpets are drawn out of.'
	},
	{
		id: 'from-the-seventh-trumpet',
		from: 'Out of the seventh trumpet',
		to: 'Christ is left the sole ruler',
		reference: 'Revelation 11:15–18 · Daniel 2:44',
		body: 'The seventh angel sounds, and great voices in heaven say that the kingdoms of this world have become the kingdoms of our Lord and of his Christ. The stone cut without hands breaks every other kingdom in pieces. After that blast there is no second throne, no rival crown, no other kingdom anywhere in the universe - he reigns for ever and ever.'
	}
];
