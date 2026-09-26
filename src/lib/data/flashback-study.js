// The written case behind the two flashback charts: why some passages in
// Revelation are read out of the order the book prints them in, and what that
// costs or saves. The charts themselves stay in flashback-seals.js and
// flashback-trumpets.js - this file is the reading around them.
//
// The principle in one line: the vision sequence is not always the event
// sequence. God sometimes shows an earlier event later, to answer a question
// or to explain a climax.

/** The objection the whole page is answering. */
export const PRINCIPLE = {
	eyebrow: 'The question underneath',
	question: 'How can anyone say a chapter belongs earlier than where God placed it?',
	answer: 'Because the vision sequence is not always the event sequence. God sometimes inserts an earlier event at a later point in the story, in order to answer a question or explain a climax.',
	noah: {
		title: 'The pattern is older than Revelation.',
		body: 'It appears in the days of Noah: the remnant is sealed in, and then the judgment falls. God often tells the story, then steps back to show what led up to it.'
	}
};

/**
 * What each seal is doing, in the order Revelation 6–8:1 prints them. The
 * chart shows the sequence; this says what the sequence means.
 */
export const SEAL_READING = [
	{
		label: 'Seals 1–4',
		refs: 'Revelation 6:1–8',
		body: 'The four horses - white, red, black, pale. These stand in sequence.'
	},
	{
		label: 'Seal 5',
		refs: 'Revelation 6:9–11',
		body: 'Judgment begins. The souls under the altar cry for vengeance and are given white robes. White robes for the dead mean their cases have been justified - and that can only happen in the judgment.'
	},
	{
		label: 'Seal 6',
		refs: 'Revelation 6:12–17',
		body: 'The great day of wrath: earthquake, sun darkened, moon like blood, stars falling, heaven departing as a scroll, mountains and islands moved. That wrath is the seven last plagues (Revelation 15:1).'
	},
	{
		label: 'Seal 7',
		refs: 'Revelation 8:1–5',
		body: 'Silence in heaven, seven angels given trumpets, the censer cast down. Casting down the censer is the end of intercession: no more ministry of mercy, and probation closed.'
	}
];

/** Why the sealing cannot stand where the text prints it. */
export const SEALING_CASE = {
	eyebrow: 'Why the sealing moves',
	title: 'Sealing cannot happen after the wrath has begun.',
	body: 'Immediately after seal 6, chapter 7 shows the sealing of the 144,000: do not hurt the earth, sea or trees until God’s servants are sealed. But once the wrath has arrived, every destiny is fixed. The sealing belongs under seal 5, during the judgment, before seal 6.',
	why: 'God still shows it after seal 6, and for a reason. “Who shall be able to stand?” is part of the vision, not a transcript of real-time speech. God raises the question so He can answer it, and then shows the sealed company who will stand through the time of wrath. The chapter is encouragement. The sealing itself took place earlier; the revelation of it is placed here to answer the question.'
};

/** The trumpets read as the seven last plagues, and the two proofs of it. */
export const TRUMPETS_CASE = {
	eyebrow: 'What the trumpets are',
	title: 'The seven last plagues, after probation closes.',
	lede: 'Not a recap of church history from the early centuries - the trumpets sound on the far side of the censer being thrown down.',
	proofs: [
		{
			num: '01',
			title: 'The censer is cast down first',
			refs: 'Revelation 8:3–5',
			body: 'The seventh seal opens, there is silence, the angels receive their trumpets, another angel offers much incense in Day of Atonement language - and then the censer is filled with fire and thrown to the earth. The censer is the vessel of mercy and intercession. Throwing it down means Christ’s mediatorial work has ended. Only after that do the trumpets sound.'
		},
		{
			num: '02',
			title: 'The winds are held until the sealing is done',
			refs: 'Revelation 7:1–3',
			body: 'The four winds are held so they do not hurt the earth, the sea or the trees until the sealing is finished. The trumpets then describe earth, sea and rivers being hurt. That hurt comes after the sealing, not before it.'
		}
	],
	traditional: 'Lifted out of that context, the trumpets get placed in AD 200–1500 - barbarians, Islam, the Ottomans. The context they are printed in will not carry that.'
};

/** The three events chapters 10–11 insert before the seventh trumpet. */
export const INTERLUDE_PARTS = [
	{
		num: '01',
		name: 'A little open book',
		refs: 'Revelation 10:2, 8–10',
		body: 'The book of Daniel, open at last - the beginning of the last great movement whose end is the finishing of the mystery.'
	},
	{
		num: '02',
		name: 'The temple measured',
		refs: 'Revelation 11:1–2',
		body: 'The judgment itself: the temple, the altar and the worshippers measured.'
	},
	{
		num: '03',
		name: 'Two witnesses, 1,260 days',
		refs: 'Revelation 11:3–6',
		body: 'The final witnessing work, carried on while the 144,000 are being made up.'
	}
];

/** Why those three cannot sit between the sixth trumpet and the seventh. */
export const QUICKLY = {
	eyebrow: 'The word that settles it',
	// The verse itself is printed on the page as the seam, from
	// flashback-trumpets.js - only the reference is needed here.
	reference: 'Revelation 11:14',
	body: '“Quickly” rules out a long gap. The little book, the measuring of the temple and the 1,260 days of the witnesses all take time; if they sat between trumpets six and seven, God could not have said quickly. They belong under seal 5, during the judgment, before probation closes.',
	why: 'They are written just before the seventh trumpet because the seventh trumpet is the finishing of the mystery. When the story reaches the point at which the mystery is about to be finished, God pauses and takes the reader back: here is how we get there. Without the opened book, the measured temple and the testifying witnesses, that climax would be unexplained.',
	concurrent: 'The sixth seal’s wrath, the casting down of the censer and the silence of the seventh seal are essentially concurrent: the end of grace, and the arrival of wrath.'
};

/** What is actually being finished at the seventh trumpet. */
export const MYSTERY = {
	eyebrow: 'What the mystery is',
	title: 'More than “Christ in you.”',
	quote: 'That in the dispensation of the fulness of times he might gather together in one all things in Christ, both which are in heaven, and which are on earth.',
	reference: 'Ephesians 1:9–10',
	steps: [
		{
			label: 'First step',
			body: 'The sealing of the 144,000 - Christ fully formed in a people.'
		},
		{
			label: 'The climax',
			body: 'The kingdoms of this world overthrown and the universe reconciled, when the seventh trumpet sounds.'
		}
	],
	close: 'People are judged; God’s government is also on trial. The final conflict shows what that government can produce.'
};

/** How the traditional placement came about, and where it breaks. */
export const TRADITION = {
	eyebrow: 'Why the traditional reading arose',
	title: 'A straight timeline, read backwards from 1844.',
	body: 'Read as a straight timeline, the little book and the measuring of the temple sit after trumpet 6. Identifying those with 1844 forces trumpets 1–6 into the past, so interpreters searched history for hail, burning mountains, locusts and the Euphrates.',
	inconsistency: {
		title: 'The reading is not consistent with itself.',
		body: 'The little book and the measured temple were placed at 1844 - and then the two witnesses, the very next verses, were jumped back to 538–1798 and the French Revolution. Revelation 10–11 is one connected movement: eat the book, prophesy again, measure the temple, give power to the two witnesses. Yanking verse 3 a thousand years backward is done to avoid a future 1,260 days.'
	}
};

/** Time periods: the context decides, not the number. */
export const CONTEXT = {
	eyebrow: 'Context is king',
	title: 'The time period serves the context, not the reverse.',
	cases: [
		{
			label: 'Past, day for year',
			refs: 'Revelation 12:6, 14',
			body: 'The woman in the wilderness - a 1,260 that belongs to history.'
		},
		{
			label: 'Future, literal',
			refs: 'Revelation 11:3',
			body: 'The two witnesses, in this setting, after the little book and the measuring of the temple.'
		}
	],
	hint: 'The hints in chapter 11 point the same way: Sodom and Egypt, “where also our Lord was crucified” - forward, not to the Dark Ages.'
};

/** The standard the case asks to be held to. */
export const APPROACH = {
	eyebrow: 'How this is studied',
	title: 'Test it by the Bible. If it fails, reject it.',
	points: [
		'The case rests on the text, its sequence and its logic - not on church authority.',
		'Ellen White is not treated as infallible, and the Adventist prophetic charts of Daniel and Revelation came largely from the pioneers, Uriah Smith and others, rather than from her.',
		'The Spirit of prophecy in Revelation is not one nineteenth-century writer. It is the testimony of Jesus among God’s people at the end of time.'
	],
	close: 'The same standard applies to every interpreter, pioneer or contemporary student.'
};

/** The whole case, in one paragraph. */
export const IN_SHORT =
	'God sometimes places an earlier event later in the vision so that a question can be answered or a climax explained. The 144,000 are shown after seal 6 to answer “Who shall be able to stand?” Revelation 10–11 is shown before trumpet 7 to show how the mystery is finished. In both cases the events belong during the judgment, under seal 5, before the wrath and before the plagues. Once that narrative principle is seen, the apparent disorder is gone.';
