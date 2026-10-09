// The seventh seal and the seven trumpets that come out of it (Revelation 8–11).
// The seventh seal is not one more scene beside the other six — it is the
// container the trumpets are drawn out of — so it is introduced on a page of
// its own at /seventh-seal, and each trumpet has its study at
// /seventh-seal/[id], the same way each seal has one at /seals/[id].
import { getSeal, SEVENTH_SEAL_HREF } from './seals.js';
import { TRUMPETS } from './flashback-trumpets.js';

export { SEVENTH_SEAL_HREF };

/** The seal itself, as the landing filmstrip and the /seals chart know it. */
export const SEVENTH_SEAL = /** @type {NonNullable<ReturnType<typeof getSeal>>} */ (
	getSeal('seventh-seal')
);

/** The seal the reader walks back to from the seventh. */
export const SIXTH_SEAL = /** @type {NonNullable<ReturnType<typeof getSeal>>} */ (
	getSeal('sixth-seal')
);

export const SEVENTH_SEAL_TITLE = 'The Seventh Seal';
export const SEVENTH_SEAL_SUBTITLE =
	'Silence in heaven, the censer cast down, and seven angels given seven trumpets.';

/** Scripture the page is built around, quoted from the King James. */
export const SILENCE = {
	ref: 'Revelation 8:1',
	text: 'And when he had opened the seventh seal, there was silence in heaven about the space of half an hour.'
};

export const CENSER = {
	ref: 'Revelation 8:5',
	text: 'And the angel took the censer, and filled it with fire of the altar, and cast it into the earth: and there were voices, and thunderings, and lightnings, and an earthquake.'
};

export const TRUMPETS_GIVEN = {
	ref: 'Revelation 8:2',
	text: 'And I saw the seven angels which stood before God; and to them were given seven trumpets.'
};

export const REIGN_VERSE = {
	ref: 'Revelation 11:15',
	text: 'The kingdoms of this world are become the kingdoms of our Lord, and of his Christ; and he shall reign for ever and ever.'
};

/** The three things to settle before the trumpets make sense. */
export const SEVENTH_SEAL_KEYS = [
	{
		id: 'silence',
		title: 'Silence in heaven',
		reference: 'Revelation 8:1',
		body: 'Through six seals the court has been calling “come and see” as each piece of evidence is laid out. At the seventh, heaven goes quiet for about half an hour. It is not an empty heaven: John is standing in it and reports nobody leaving. It is the silence of astonishment, because the seven angels are about to sound. The seventh seal is the close of probation — there is no more grace given.'
	},
	{
		id: 'censer',
		title: 'The censer cast down',
		reference: 'Revelation 8:3–5',
		body: 'Another angel stands at the golden altar and offers much incense with the prayers of all saints — the righteousness of Christ applied as never before, the last cleansing of his people on the day of atonement. Then he fills the same censer with fire from the altar and casts it into the earth. Fire that makes God’s people pray only hardens the godless. The instrument of mercy is thrown down, and the door of mercy closes because the world has turned from God.'
	},
	{
		id: 'container',
		title: 'A container, not a scene',
		reference: 'Revelation 8:2, 6',
		body: 'The seven angels are given their trumpets inside the seventh seal, and they prepare to sound inside it. The trumpets are not a second series laid after the seals, and the history does not start over; they are what the seventh seal opens into. They fall after the sealing and the close of probation, and the first four strike the same places as the first four plagues of Revelation 16: the earth, the sea, the rivers and the sun.'
	}
];

const ORDINALS = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh'];
const SUFFIXES = ['st', 'nd', 'rd', 'th', 'th', 'th', 'th'];

// Fuller titles for the study pages; the chart keeps the short bar labels.
/** @type {Record<string, string>} */
const TITLES = {
	t1: 'Hail and Fire Mingled with Blood',
	t2: 'The Burning Mountain',
	t3: 'The Star Called Wormwood',
	t4: 'Sun, Moon and Stars Smitten',
	t5: 'The Bottomless Pit Opened',
	t6: 'The Four Angels Loosed',
	t7: 'The Mystery of God Finished'
};

/**
 * @typedef {object} TrumpetStudy
 * @property {string} id          URL slug, e.g. `first-trumpet`.
 * @property {string} key         The id in flashback-trumpets.js (`t1`…`t7`).
 * @property {number} n
 * @property {string} era         e.g. `1st Trumpet`.
 * @property {string} ordinal     e.g. `First`.
 * @property {string} label       Short bar label, as on the charts.
 * @property {string} title
 * @property {string} reference
 * @property {string} body
 * @property {string} tone
 * @property {string} [woe]
 * @property {string} href
 * @property {string} img
 * @property {string} alt
 */

/** @type {TrumpetStudy[]} */
export const TRUMPET_STUDIES = TRUMPETS.map((trumpet) => {
	const ordinal = ORDINALS[trumpet.n - 1];
	const id = `${ordinal.toLowerCase()}-trumpet`;
	return {
		id,
		key: trumpet.id,
		n: trumpet.n,
		era: `${trumpet.n}${SUFFIXES[trumpet.n - 1]} Trumpet`,
		ordinal,
		label: trumpet.label,
		title: TITLES[trumpet.id] ?? trumpet.label,
		reference: trumpet.refs,
		body: trumpet.note,
		tone: trumpet.tone,
		woe: trumpet.woe,
		href: `${SEVENTH_SEAL_HREF}/${id}`,
		img: '/seven trampets.jpg',
		alt: 'An image of seven angels with seven trumpets'
	};
});

/**
 * Look a trumpet up by its slug or by its chart id (`t1`…`t7`).
 * @param {string} id
 */
export function getTrumpet(id) {
	return TRUMPET_STUDIES.find((t) => t.id === id || t.key === id) ?? null;
}

/**
 * The trumpets either side of one. Like the seals, the sequence does not wrap.
 * @param {string} id
 */
export function getTrumpetNeighbours(id) {
	const index = TRUMPET_STUDIES.findIndex((t) => t.id === id);
	if (index === -1) return { index: -1, previous: null, next: null };
	return {
		index,
		previous: TRUMPET_STUDIES[index - 1] ?? null,
		next: TRUMPET_STUDIES[index + 1] ?? null
	};
}
