// Foundations — what a reader of Revelation needs in hand before the book will
// open. Taken from the Foundations study (the first episode of the series): the
// book is not a puzzle of symbols but the record of a war that is still being
// fought, over three charges laid against God, settled by judgment, and mapped
// in advance by Daniel 7.
//
// The six questions frame the page. Each section below answers one of them,
// and `QUESTIONS[].href` points at the section that does.

export const FOUNDATIONS_TITLE = 'Foundations';
export const FOUNDATIONS_SUBTITLE =
	'The Book of Revelation is among the strangest books in the Bible, and one of the hardest to understand. That difficulty explains both the flood of competing interpretations and the fear many people feel toward it. Yet even a little genuine understanding shows why it matters.';

/** Why the usual readings fail — the fragment taken for the whole. */
export const FRAGMENTS = {
	body: 'The usual approaches fail for a simple reason. People seize one symbol, one number, one scene - atomic war, demonic invasion, a timeline - and build a whole system from a fragment. Like the blind men and the elephant, each is partly right and all are in the wrong. They never see the whole.',
	examples: ['Atomic war', 'Demonic invasion', 'A timeline'],
	thesis: 'The whole is a cosmic conflict.',
	thesisNote: 'Revelation cannot be read until that conflict is understood.'
};

/** The war is still on — the evidence is ordinary life. */
export const UNFINISHED = {
	body: 'There is a war underway that extends beyond Earth. Many Christians assume that Calvary ended the contest between God and Satan. The facts on the ground contradict that.',
	evidence: ['Satan is still alive.', 'Children still die.', 'Wars, disease and disaster continue.'],
	close: 'If the issue were already settled, none of this would remain. Revelation is about what is still unfinished.'
};

/** The six questions that frame the background, each linked to its answer. */
export const QUESTIONS = [
	{ q: 'On what basis does God rule the universe?', href: '#basis' },
	{ q: 'What is Satan’s method of warfare?', href: '#method' },
	{ q: 'On which three points has Satan attacked God?', href: '#charges' },
	{ q: 'How does God respond?', href: '#response' },
	{ q: 'How is the issue finally settled?', href: '#judgment' },
	{ q: 'How far has the war already progressed?', href: '#progress' }
];

/** 01 — God does not rule by force. */
export const BASIS = {
	assumption: {
		label: 'The common assumption',
		title: 'God rules because He is strongest.',
		body: 'Almighty, Creator, unmatched in power. That assumption is false, and it is why people blame God for typhoons, earthquakes and wildfire. If might were the basis of His government, Satan would already be gone.'
	},
	foundation: {
		label: 'The foundation',
		title: 'God rules by the free consent of His creatures.',
		body: 'He wanted a universe that runs on love and free choice, not dictatorship. Even as Creator, He will not compel worship. If the inhabitants of the universe were ever to reject Him, He would step aside.'
	},
	close: 'That is the only arrangement in which a created being could even attempt a war against God. Satan could never match the Creator in force. He could hope to turn public opinion.'
};

/** 02 — Satan's weapon is propaganda. */
export const METHOD = {
	body: 'If God governs by the trust of His creatures, the way to unseat Him is to destroy that trust. Satan’s method is misinformation: lies aimed at God’s reputation, so that intelligent beings will no longer want Him.',
	eden: [
		{
			line: 'Did God really say…?',
			effect: 'Plants distrust.'
		},
		{
			line: 'You shall not surely die… God knows that in the day you eat, you shall be as gods.',
			reference: 'Genesis 3:4–5',
			effect: 'Does two things at once: it calls God a liar, and it assigns Him a selfish motive - keeping humanity down.'
		}
	],
	close: 'This is an information war. Revelation is dealing with that war.'
};

/**
 * 03 — the three charges. `answered` is the state of each charge as the
 * study leaves it: Calvary has answered the first; the other two are open.
 */
export const CHARGES = [
	{
		id: 'character',
		name: 'Character',
		refs: 'Genesis 3',
		body: 'He smeared God as a liar who does not mean His creatures well. Genesis 3 is the template: God is not merely mistaken; He is deliberately withholding good.',
		answered: true,
		status: 'Answered at Calvary'
	},
	{
		id: 'government',
		name: 'Government',
		refs: 'Isaiah 14:12–14',
		quote: 'I will exalt my throne above the stars of God… I will be like the Most High.',
		body: 'He was not seeking God’s power. He was seeking God’s place - authority and worship. One government overthrows another the way political parties do: by convincing the public that its system is better.',
		answered: false,
		status: 'Still open'
	},
	{
		id: 'justice',
		name: 'Justice',
		refs: 'Job 1:9–10',
		body: 'Satan’s charge is that God is unfair. Job serves God, Satan says, only because God has hedged him in with special favor. Take the hedge away and Job will curse God to His face. Loyalty, on this account, has been bought.',
		answered: false,
		status: 'Still open'
	}
];

/** 04 — God answers with truth, and with His Son. */
export const RESPONSE = {
	body: 'If Satan fights with lies, God can only fight with truth. Force would settle nothing, because force was never the question.',
	weapon: {
		quote: 'Thou art my battle axe and weapons of war.',
		reference: 'Jeremiah 51:20',
		note: 'In its first setting that is Israel; in its fullest sense it is Christ, the true Israel. Revelation 2:27 applies the same picture to Him.'
	},
	verses: [
		{
			quote: 'No man hath seen God at any time; the only begotten Son… he hath declared him.',
			reference: 'John 1:18'
		},
		{
			quote: 'The light of the knowledge of the glory of God in the face of Jesus Christ.',
			reference: '2 Corinthians 4:6'
		}
	],
	calvary: 'In His ministry - healing, forgiving, blessing children - and finally at Calvary, where the Son was willing even to face eternal death for those who hated Him, God’s character was put on public display. The first accusation has been answered.',
	open: 'The other two have not. Many still grant that God is good and still ask whether He is wise: whether His government is actually better than the alternative Satan offers.',
	church: {
		quote: 'To the intent that now unto the principalities and powers in heavenly places might be known by the church the manifold wisdom of God.',
		reference: 'Ephesians 3:10',
		note: 'That remaining work is not Christ’s alone. A government cannot be demonstrated without a people. Heaven is waiting for that demonstration.'
	}
};

/**
 * 05 — the three judgments. `phase` places each against the reader: one is
 * behind us, one is the subject of the book, one is still to come.
 */
export const JUDGMENTS = [
	{
		id: 'calvary',
		numeral: 'I',
		name: 'Calvary',
		phase: 'past',
		phaseLabel: 'Accomplished',
		quote: 'Now is the judgment of this world: now shall the prince of this world be cast out.',
		reference: 'John 12:31–32',
		body: 'At the cross, God’s character and Satan’s character were both unveiled before the universe. Satan was cast out.'
	},
	{
		id: 'hour',
		numeral: 'II',
		name: 'The hour of His judgment',
		phase: 'present',
		phaseLabel: 'The heart of the book',
		quote: 'The hour of his judgment is come.',
		reference: 'Revelation 14:7',
		body: 'The judgment of the kingdom - of God’s government - during the time Revelation describes. The first angel announces it.'
	},
	{
		id: 'final',
		numeral: 'III',
		name: 'The final judgment',
		phase: 'future',
		phaseLabel: 'After the thousand years',
		quote: 'They were judged every man according to their works.',
		reference: 'Revelation 20:13',
		body: 'Then God creates a new heaven and a new earth.'
	}
];

export const TIMELINE = {
	reference: '1 Corinthians 15:24–25',
	body: 'Christ must reign until every enemy is under His feet; then He delivers the kingdom to the Father. Until then, the work is incomplete. Revelation is the second movement of that work: the government of God, still pending, carried out through the church.'
};

/** Who is on trial — the turn the whole study hangs on. */
export const ON_TRIAL = {
	assumption: 'Most people hear “judgment” and think:',
	question: 'Will I be saved?',
	correction: 'That is not the center of this judgment.',
	quote: 'Let God be true, but every man a liar… that thou mightest be justified in thy sayings, and mightest overcome when thou art judged.',
	reference: 'Romans 3:4',
	body: 'The King of the universe has submitted Himself to judgment. If God is not justified, He is not fit to rule. If He is not judged, Satan’s accusations cannot be shown to be false.',
	close: 'The bottom line is not first whether we survive the examination. It is whether God is proven just and true in everything He does.'
};

/** 06 — Daniel is the key. */
export const DANIEL = {
	sealed: 'The book is sealed until “the time of the end.” The wicked will not understand; the wise will. That time is the era of Revelation. The two books are written in the same coded style because God placed the key to Revelation inside Daniel.',
	sealedRef: 'Daniel 12:4, 8–10',
	kingdoms: [
		{ beast: 'Lion', empire: 'Babylon' },
		{ beast: 'Bear', empire: 'Medo-Persia' },
		{ beast: 'Leopard', empire: 'Greece' },
		{ beast: 'Terrible beast', empire: 'Rome' },
		{ beast: 'One like the Son of Man', empire: 'The kingdom of Christ', fifth: true }
	],
	court: 'During the fourth kingdom, the scene shifts to heaven. The Ancient of Days takes His seat. The judgment is set; the books are opened. Two verdicts follow:',
	verdicts: [
		{
			reference: 'Daniel 7:11',
			body: 'The fourth beast is slain and given to the burning flame.'
		},
		{
			reference: 'Daniel 7:13–14',
			body: 'One like the Son of Man is given dominion, glory, and an everlasting kingdom that all peoples shall serve.'
		}
	],
	conclusion: 'There are not four kingdoms in Daniel 7. There are five. In the time of the fourth, two kingdoms are judged: the kingdom of the beast, and the kingdom of Christ.'
};

/** Daniel 7 against Revelation 4–5, row by row. */
export const PARALLEL = [
	{ daniel: 'Thrones set in place', revelation: 'Thrones set in heaven' },
	{ daniel: 'God takes His seat', revelation: 'One sits on the throne' },
	{ daniel: 'A fiery stream from the throne', revelation: 'Lightnings, thunderings and voices from the throne' },
	{ daniel: 'The books are opened', revelation: 'A book sealed with seven seals is opened' },
	{ daniel: 'Ten thousand times ten thousand stand before God', revelation: 'The same host of angels around the throne' }
];

/** What to carry forward into the rest of the book. */
export const CARRY_FORWARD = [
	'God rules by free consent, not by force.',
	'Satan’s war is a war of lies against God’s character, government and justice.',
	'God answers with truth. Christ has already answered the charge against God’s character.',
	'The church must yet display the wisdom of God’s government before the watching universe.',
	'Judgment is the means by which the war advances - and God Himself is the one being justified.',
	'Daniel 7 is the map. Revelation 4–5 is the same courtroom, seen from inside.'
];

/** Where to go once the foundation is laid. */
export const NEXT = [
	{
		href: '/scene/revelation-4',
		label: 'The Throne Room',
		note: 'Revelation 4 - the courtroom of Daniel 7, seen from inside.'
	},
	{
		href: '/overview/daniel',
		label: 'The visions of Daniel',
		note: 'The map the rest of the book is read from.'
	},
	{
		href: '/overview',
		label: 'The overview',
		note: 'Daniel and Revelation in parallel, on one chart.'
	},
	{
		href: '/videos',
		label: 'Watch the series',
		note: 'Episode 1 - Foundations - walks this same ground on film.'
	}
];
