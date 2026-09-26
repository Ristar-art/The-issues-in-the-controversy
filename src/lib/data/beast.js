// Revelation 17 — the scarlet beast, its seven heads, its ten horns, and the
// woman who rides it. The page this feeds is built on one distinction the
// picture makes and most drawings of it lose: the horns are on the BEAST, not
// on the heads. Nothing in the chapter puts a horn on a head, and the count
// itself forbids it — ten does not divide into seven.
//
// The beast is therefore one entity that outlasts every head it wears. Its
// heads are the political powers it has ruled through, each in its turn at war
// with the people of God. The woman is a second, older entity: a religious body
// that should have served God and instead borrowed the beast's power to hunt
// His people down.
//
// `status` keys each head's colour to the --bh-* tokens in app.css, taken from
// the vantage point Revelation 17:10 is written from: five are fallen, one is,
// and the other is not yet come.

export const BEAST_TITLE = 'The Beast and the Woman';
export const BEAST_SUBTITLE =
	'One beast, seven heads, ten horns - and a woman who rides what she does not own.';

/** The verse the whole picture is drawn from. */
export const KEY_TEXT = {
	reference: 'Revelation 17:3',
	quote:
		'So he carried me away in the spirit into the wilderness: and I saw a woman sit upon a scarlet coloured beast, full of names of blasphemy, having seven heads and ten horns.'
};

/** The vantage point the seven are counted from. */
export const VANTAGE = {
	reference: 'Revelation 17:10',
	quote:
		'And there are seven kings: five are fallen, and one is, and the other is not yet come; and when he cometh, he must continue a short space.'
};

/**
 * How the picture is to be read — four things the text itself does, kept to
 * what is on the page rather than what is read onto it.
 */
export const READING = [
	{
		id: 'horns-on-the-beast',
		claim: 'The horns are on the beast, not on the heads.',
		refs: 'Revelation 13:1 · 17:3, 7',
		note: 'Every time the two are named they are named as one inventory belonging to one body - having seven heads and ten horns. Not one verse assigns a horn to a head, gives a head a horn, or counts horns head by head.'
	},
	{
		id: 'ten-into-seven',
		claim: 'Ten will not divide into seven.',
		refs: 'Revelation 17:7, 12',
		note: 'There is no arrangement of ten horns over seven heads that leaves the heads even. The number is the plainest argument in the chapter: the horns were never meant to sit on the heads at all.'
	},
	{
		id: 'crowns-move',
		claim: 'The crowns move from the heads to the horns.',
		refs: 'Revelation 12:3 · 13:1',
		note: 'The dragon wears seven crowns upon his heads - the age when a head reigned. The sea beast wears ten crowns upon his horns. The heads are still there and are no longer where the power sits.'
	},
	{
		id: 'beast-outlives',
		claim: 'The beast outlives every head it wears.',
		refs: 'Revelation 17:8, 11',
		note: 'It was, and is not, and yet is; and the eighth is of the seven. A head can fall and the thing that wore it goes on - which is what makes it one entity rather than seven.'
	}
];

/**
 * @typedef {object} Head
 * @property {string} id
 * @property {string} n        Ordinal, printed.
 * @property {string} code     The letter the chart carries in the circle.
 * @property {'fallen' | 'present' | 'future'} status
 * @property {string} statusLabel
 * @property {string} name
 * @property {string} era
 * @property {string} refs
 * @property {string} charge   What it did to the people of God, in one line.
 * @property {string} body
 * @property {string} verse
 */

/** @type {Head[]} */
export const HEADS = [
	{
		id: 'egypt',
		n: 'First',
		code: 'E',
		status: 'fallen',
		statusLabel: 'Fallen',
		name: 'Egypt',
		era: 'to c. 1445 BC',
		refs: 'Exodus 1:8–14, 22 · Exodus 5:2',
		charge: 'Enslaved them before they were a nation, and drowned their sons.',
		body: 'The first power to make war on the people of God made war on them before there was a nation to fight. It set taskmasters over them, embittered their lives with hard bondage, and ordered every son cast into the river. Its king gave the reason himself when he was asked to let them go: who is the LORD, that I should obey his voice?',
		verse: '“I know not the LORD, neither will I let Israel go.”'
	},
	{
		id: 'assyria',
		n: 'Second',
		code: 'A',
		status: 'fallen',
		statusLabel: 'Fallen',
		name: 'Assyria',
		era: 'c. 745 – 612 BC',
		refs: '2 Kings 17:5–6, 23 · 2 Kings 18:28–35',
		charge: 'Carried the ten tribes away and never brought them back.',
		body: 'Assyria took Samaria, carried Israel out of their own land, and scattered them among the cities of the Medes - a captivity that was never reversed. At the wall of Jerusalem its officer named the quarrel exactly: he set the God of Israel among the gods of the nations Assyria had already beaten, and asked which of them had ever delivered anybody.',
		verse: '“Who are they among all the gods of these lands, that have delivered their land out of mine hand?”'
	},
	{
		id: 'babylon',
		n: 'Third',
		code: 'B',
		status: 'fallen',
		statusLabel: 'Fallen',
		name: 'Babylon',
		era: '605 – 539 BC',
		refs: '2 Kings 25:8–10 · Daniel 1:1–2 · Daniel 3:14–18',
		charge: 'Burned the temple, and made worship a matter of state decree.',
		body: 'Babylon burned the house of the LORD, broke down the walls of Jerusalem, and carried the vessels of the temple into the house of its own god. Then it did the thing the later heads would all copy: it set up an image, put the music and the furnace behind it, and made the worship of God a capital offence.',
		verse: '“Who is that God that shall deliver you out of my hands?”'
	},
	{
		id: 'medo-persia',
		n: 'Fourth',
		code: 'MP',
		status: 'fallen',
		statusLabel: 'Fallen',
		name: 'Medo-Persia',
		era: '539 – 331 BC',
		refs: 'Ezra 4:4–24 · Esther 3:8–13 · Daniel 6:6–9',
		charge: 'Signed a decree for the whole nation, and outlawed prayer.',
		body: 'Medo-Persia sent them home and still made war on them. It stopped the building of the house by force of arms, wrote a law that no man might ask a petition of any God for thirty days, and sealed letters into every province to destroy, to kill, and to cause to perish all Jews, both young and old, in one day. The law that could not be altered was its instrument.',
		verse: '“Their laws are diverse from all people… it is not for the king’s profit to suffer them.”'
	},
	{
		id: 'greece',
		n: 'Fifth',
		code: 'G',
		status: 'fallen',
		statusLabel: 'Fallen',
		name: 'Greece',
		era: '331 – 168 BC',
		refs: 'Daniel 8:5–8, 21 · Daniel 11:3–4',
		charge: 'Defiled the sanctuary and forbade the law outright.',
		body: 'Gabriel names this one before it exists: the rough goat is the king of Grecia, its great horn the first king, and the four that come up after him the kingdom broken toward the four winds. Out of one of those four came the persecution the histories of the Maccabees record - the sanctuary profaned, the sacrifice stopped, the books of the law torn and burned, and death decreed for keeping it.',
		verse: '“The rough goat is the king of Grecia.”'
	},
	{
		id: 'rome',
		n: 'Sixth',
		code: 'R',
		status: 'present',
		statusLabel: 'Standing when John wrote',
		name: 'Rome',
		era: '168 BC – AD 476',
		refs: 'Luke 2:1 · John 19:15 · Acts 4:26–27 · Revelation 12:4',
		charge: 'Crucified the Son, and hunted the church that came out of Him.',
		body: 'Rome is the head that was standing when this was written - one is. It is the power the dragon works through in Revelation 12, standing before the woman to devour her child as soon as it was born; the power Herod and Pontius Pilate were gathered together with against the holy child Jesus; the power the priests appealed to when they had no other argument left. It did not stop at the cross: it spent the next three centuries on the people who preached it.',
		verse: '“We have no king but Caesar.”'
	},
	{
		id: 'seventh',
		n: 'Seventh',
		code: '?',
		status: 'future',
		statusLabel: 'Not yet come',
		name: 'The seventh head',
		era: 'a short space',
		refs: 'Revelation 17:10–12',
		charge: 'Not named. Told only how long it lasts, and who reigns with it.',
		body: 'The chapter refuses to name it. It is the other that is not yet come, and when he cometh, he must continue a short space - the only head measured by its brevity rather than by its reach. It is also the head the ten horns belong to in time: they receive power as kings one hour with the beast, and give their strength to it. The picture leaves a question mark there on purpose, and a reader who fills it in has gone past what is written.',
		verse: '“And when he cometh, he must continue a short space.”'
	}
];

/**
 * The eighth — not an eighth head. The beast itself, surfacing under its own
 * name once the heads have run out.
 */
export const EIGHTH = {
	reference: 'Revelation 17:11',
	quote:
		'And the beast that was, and is not, even he is the eighth, and is of the seven, and goeth into perdition.',
	note: 'An eighth is counted, and no eighth head is ever drawn. It is of the seven - the same body that wore all of them, appearing at last as itself. This is the plainest statement in the chapter that the beast is not the sum of its heads but the thing underneath them.'
};

/** The ten horns — the emphasis the whole page is built around. */
export const HORNS = {
	title: 'The Ten Horns',
	reference: 'Revelation 17:12–14, 16–17',
	quote:
		'And the ten horns which thou sawest are ten kings, which have received no kingdom as yet; but receive power as kings one hour with the beast.',
	points: [
		{
			id: 'with-the-beast',
			claim: 'They receive power with the beast - not with a head.',
			refs: 'Revelation 17:12',
			note: 'One hour with the beast. The partner named is the body itself. No head is mentioned, because the horns were never a head’s to lend.'
		},
		{
			id: 'one-mind',
			claim: 'They hand their power over, all ten together.',
			refs: 'Revelation 17:13, 17',
			note: 'These have one mind, and shall give their power and strength unto the beast. Ten kings acting as one instrument of one body - which is what a horn on a body is, and not what a horn on seven separate heads could be.'
		},
		{
			id: 'crowned-as-horns',
			claim: 'They are crowned as horns.',
			refs: 'Revelation 13:1',
			note: 'Upon his horns ten crowns. The diadems that sat on heads in Revelation 12:3 are on the horns here. The power has moved down out of the heads into the body’s own weapons.'
		},
		{
			id: 'they-turn',
			claim: 'They are what finally turns on the woman.',
			refs: 'Revelation 17:16',
			note: 'The ten horns which thou sawest upon the beast, these shall hate the whore, and shall make her desolate and naked. The verse says upon the beast in as many words - and the power she rode is the power that ends her.'
		}
	]
};

/** The woman: an entity in her own right, and older than any head she has ridden. */
export const WOMAN = {
	title: 'The Woman',
	reference: 'Revelation 17:1–6, 18',
	quote:
		'And upon her forehead was a name written, MYSTERY, BABYLON THE GREAT, THE MOTHER OF HARLOTS AND ABOMINATIONS OF THE EARTH.',
	lede: 'A woman in prophecy is a church. A faithful one is a bride; an unfaithful one is a harlot. This one is not a rider who happens to be religious - she is a religious body, set apart to serve God, that went to the beast instead.',
	traits: [
		{
			id: 'a-woman-is-a-church',
			label: 'What a woman is',
			refs: 'Jeremiah 6:2 · Isaiah 1:21 · 2 Corinthians 11:2 · Ephesians 5:23–27',
			note: 'I have likened the daughter of Zion to a comely and delicate woman. I have espoused you to one husband, that I may present you as a chaste virgin to Christ. The figure is fixed before Revelation uses it - and so is its opposite: how is the faithful city become an harlot.'
		},
		{
			id: 'she-rides',
			label: 'She rides what she does not own',
			refs: 'Revelation 17:3, 7',
			note: 'She sits on the beast; the beast carrieth her. She has no legs of her own in this picture and no horns of her own either. Everything that moves under her belongs to the body she is sitting on.'
		},
		{
			id: 'she-uses-the-power',
			label: 'She uses its power on the saints',
			refs: 'Revelation 17:2, 4, 6',
			note: 'Drunken with the blood of the saints, and with the blood of the martyrs of Jesus. A church cannot execute anybody. It can borrow a state that will - and the kings of the earth have committed fornication with her: the exact word for a covenanted body going to another power.'
		},
		{
			id: 'she-reigns',
			label: 'She reigns over the kings she rides',
			refs: 'Revelation 17:18',
			note: 'That great city, which reigneth over the kings of the earth. The rider steers. That is the whole point of drawing her seated rather than standing alongside.'
		}
	],
	end: {
		reference: 'Revelation 17:16–17',
		quote:
			'And the ten horns which thou sawest upon the beast, these shall hate the whore, and shall make her desolate and naked, and shall eat her flesh, and burn her with fire.',
		note: 'The arrangement does not hold. The horns she used are on the beast, never on her, and they were never hers to keep - so the power she borrowed is the power that turns and destroys her.'
	}
};

/** Where the study goes next. */
export const NEXT = [
	{ href: '/symbols', label: 'The prophetic lexicon', quiet: false },
	{ href: '/overview/daniel', label: 'The same empires in Daniel', quiet: true },
	{ href: '/churches', label: 'The seven churches', quiet: true },
	{ href: '/seals', label: 'The seven seals', quiet: true }
];
