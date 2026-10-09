// The seven churches of Revelation 2–3, read the way the study reads them: not
// as seven congregations that happen to be listed, and not as seven eras that
// each closed when the next began, but as seven conditions of one church. Every
// one of them has a starting point. Not one of them is given an ending point.
// So all seven stand together in the world now, and they will all be standing
// when the book is fulfilled.
//
// `under` is the phrase the whole page turns on — Christianity under a given
// power, system or movement. `condition` is what the letter finds the church to
// *be* under it, quoted from its own letter wherever the text gives a phrase for
// it. Each church's colour is keyed off its `id` — the --ch-* tokens in app.css
// — so the chart and the letters cannot drift apart.

export const CHURCHES_TITLE = 'The Seven Churches';
export const CHURCHES_SUBTITLE =
	'Seven letters, one church - and seven conditions that each begin somewhere and none of which ends.';

/**
 * The four reasons for reading them as conditions rather than as addresses or
 * as closed eras. Each rests on something the book itself does.
 */
export const WHY_CONDITIONS = [
	{
		id: 'sent-to-all-seven',
		claim: 'The book is sent to all seven - and the book is an end-time book.',
		refs: 'Revelation 1:11, 19 · 1:10',
		note: 'John is told to write what he saw and send it to the seven churches. If Ephesus closed in AD 100, the book of Revelation means nothing to Ephesus: it would be addressed to a church that no longer exists when the thing it describes takes place. The letters go to churches that are still standing on the day of the Lord.'
	},
	{
		id: 'beginning-but-no-end',
		claim: 'Each condition is given a beginning. None is given an end.',
		refs: 'Revelation 2:1 – 3:22',
		note: 'Ephesus began with the apostles and never ended. Smyrna began and never ended. So did the rest. The usual chart supplies closing dates the letters never supply, and every closing date shuts down a condition that is plainly still in the world.'
	},
	{
		id: 'not-the-beasts-heads',
		claim: 'Unlike the beast’s heads, these seven do coexist.',
		refs: 'Revelation 13:1 · 17:9–10',
		note: 'The comparison is a fair one - one body, seven successive expressions of it - but it breaks at the end. The beast’s seven heads do not all exist at once. The church’s seven states do: that is the point of sending the book to all seven.'
	},
	{
		id: 'local-name-greater-thing',
		claim: 'Revelation names a local thing and means a greater one.',
		refs: 'Revelation 14:8 · 17:5 · Romans 2:28–29',
		note: 'There was a literal Babylon when John wrote, and God was not talking about it. Israel is not a bloodline or a country but whoever has the Spirit of Christ - an identifying mark that is invisible. Ephesus and Smyrna are read the same way: spiritual conditions, not a postal route through Asia Minor.'
	}
];

/**
 * The seven literal congregations were real, and they stood in this order along
 * the road - which is the order Jesus sends the messages in. Printed once, to
 * settle the historical question before the page leaves it behind.
 */
export const LITERAL_CITIES = {
	region: 'Asia - what is now western Turkey',
	note: 'Seven local congregations, standing in a semicircle, one behind the other. Follow the road and you meet them in exactly the order the letters are dictated in. They received the messages. They were never what the messages were mainly about.',
	order: ['Ephesus', 'Smyrna', 'Pergamos', 'Thyatira', 'Sardis', 'Philadelphia', 'Laodicea']
};

/**
 * The usual chart, printed so the difference can be seen rather than argued.
 * Same seven names, each one closed off where the next begins.
 */
export const USUAL_ERAS = [
	{ name: 'Ephesus', span: 'AD 31 – 100' },
	{ name: 'Smyrna', span: 'AD 100 – 313' },
	{ name: 'Pergamos', span: 'c. 300 – 538' },
	{ name: 'Thyatira', span: '538 – 1798' },
	{ name: 'Sardis', span: '1798 – 1844' },
	{ name: 'Philadelphia', span: '1844 – c. 1860' },
	{ name: 'Laodicea', span: 'c. 1860 – today' }
];

/**
 * @typedef {object} Church
 * @property {string} id
 * @property {number} n
 * @property {string} name
 * @property {string} img       The letter's plate, in /static.
 * @property {string} alt
 * @property {string} meaning     What the name itself carries.
 * @property {string} under       The condition-phrase the chart is built on.
 * @property {string} began       When the condition started.
 * @property {string} beganNote   What started it.
 * @property {string} size        How large it is, or that it has no denomination.
 * @property {boolean} nameable   Whether it can be pointed to as a body.
 * @property {string} reference
 * @property {string} condition   What the letter finds the church to be.
 * @property {string} verdict     Commendation, rebuke, or both.
 * @property {string} counsel     What the letter tells it to do.
 * @property {string} promise     To him that overcometh.
 * @property {string} body        One paragraph for the walk-through.
 * @property {string} [second]    The other party the letter addresses.
 * @property {string} [today]     Where the condition is found now.
 */

/** @type {Church[]} */
export const CHURCHES = [
	{
		id: 'ephesus',
		img: '/Ephesus.jpg',
		alt: 'The Message to Ephesus, Revelation 2: Christ holds the letter before a ruined temple, beside the lines Remember, Repent, Return and You left your first love.',
		n: 1,
		name: 'Ephesus',
		meaning: 'Desirable',
		under: 'oppressive rival religions',
		began: 'c. AD 31',
		beganNote: 'With the first apostles and the early church.',
		size: 'No denomination - a condition',
		nameable: false,
		reference: 'Revelation 2:1–7',
		condition: 'Thou hast left thy first love',
		verdict: 'Mostly commendation. Known for hard work, patience, and for trying them which say they are apostles and are not - rebuked for the love it began with. The name means desirable, and the letter reads like it.',
		counsel: 'Remember therefore from whence thou art fallen, and repent, and do the first works.',
		promise: 'To eat of the tree of life, which is in the midst of the paradise of God.',
		body: 'The apostolic church lived under religious persecution, not political. The Jews stoned Stephen, imprisoned Peter, were behind the beheading of James, scattered the church out of Jerusalem and were the standing thorn in Paul’s side - and where Rome got involved, it was usually because the Jews had stirred it up. Rival worship, not the state, was the pressure the first church grew under.',
		today: 'Wherever a dominant religion makes it dangerous to be a Christian - extreme Islam, extreme Hinduism, parts of the Middle East, parts of India, Nigeria. The word that matters is oppressive: a neighbouring faith that leaves you alone is not this condition. Christians under it are usually more committed and more in love with the Lord than those who are left in peace.'
	},
	{
		id: 'smyrna',
		img: '/Smyrna.jpg',
		alt: 'The Message to Smyrna, Revelation 2:8–11: a chained woman prays while a Roman soldier with a torch stands over a burning city, beside the lines Be faithful in persecution and Do not fear what is to come.',
		n: 2,
		name: 'Smyrna',
		meaning: 'Myrrh - a bitter herb with a sweet smell',
		under: 'a godless persecuting state',
		began: 'c. AD 100',
		beganNote: 'When the Roman government, not the synagogue, became the persecutor.',
		size: 'No denomination - a condition',
		nameable: false,
		reference: 'Revelation 2:8–11',
		condition: 'I know thy poverty - but thou art rich',
		verdict: 'The only letter with no rebuke in it. Tribulation, poverty, prison, ten days, and death named plainly - and not one word of correction.',
		counsel: 'Fear none of those things which thou shalt suffer. Be thou faithful unto death.',
		promise: 'A crown of life, and no hurt from the second death.',
		body: 'Up to about AD 100 the great persecuting power was religious. From about AD 100 it was the state, with an intensity that ran for the better part of three hundred years - the years when Nero dipped Christians in tar to light his garden at night and the public had been taught to hate them. Death is the note the letter keeps returning to, and this is the church it is written to.',
		today: 'China. North Korea. The Soviet years. The Terror in France. Iran, where religious and state persecution are the same hand. Once it started it never stopped: somewhere in the world, every generation since, there have been Christians persecuted by their own government.'
	},
	{
		id: 'pergamos',
		img: '/Pergamos.jpg',
		alt: 'The Message to Pergamos, Revelation 2:12–17: a sword stands in an open Bible before an idol on a throne among ruins, beside the lines Repent of compromise and Beware of false doctrine.',
		n: 3,
		name: 'Pergamos',
		meaning: 'Married - or a citadel',
		under: 'the Orthodox Church',
		began: 'c. AD 300',
		beganNote: 'The great schism - though the disagreement behind it dates from after Nicaea.',
		size: '≈ 300 million',
		nameable: true,
		reference: 'Revelation 2:12–17',
		condition: 'Thou dwellest where Satan’s seat is',
		verdict: 'Commended for holding fast the name and not denying the faith - and the first of the seven to draw heavy criticism. Commentators have long read it as the church that married the world.',
		counsel: 'Repent, or else I will come unto thee quickly, and will fight against them with the sword of my mouth.',
		promise: 'The hidden manna, and a white stone with a new name written.',
		body: 'Most of us grew up thinking Christianity had two faces, Catholic and Protestant. It has three. The Orthodox Church broke from Rome a thousand years ago - partly over whether the Holy Ghost proceeds from the Father, as Nicaea had it, or from the Father and the Son, as Rome later said - and the break finished with the pope excommunicating the patriarch and the patriarch excommunicating the pope. What is left is a body that keeps the faith and the sacraments and refuses the headship of the pope, with a patriarch in his place. Read the letter with that in view and Antipas, my faithful martyr, is worth a second look: the root of the name carries anti-pope.',
		today: 'Russia, Romania, Serbia, Ukraine, Greece and most of Eastern Europe, where asking after the chief religion gets you neither Catholicism nor Protestantism. Some 300 million people - as many as live in the United States - and in the western church we know almost nothing about them.'
	},
	{
		id: 'thyatira',
		img: '/Thyatira.jpg',
		alt: 'The Message to Thyatira, Revelation 2:18–29: Jezebel reclines with a golden cup before a burning city and an idol, beside the lines Reject immorality and idolatry and Hold fast until I come.',
		n: 4,
		name: 'Thyatira',
		meaning: 'Continual sacrifice - or a smell of affliction',
		under: 'Roman Catholicism',
		began: 'c. AD 538',
		beganNote: 'The same schism, from the other side of it.',
		size: '≈ 1.3 billion',
		nameable: true,
		reference: 'Revelation 2:18–29',
		condition: 'Thou sufferest that woman Jezebel to teach',
		verdict: 'Commended for works, charity, service, faith and patience - and the last works more than the first. Rebuked for tolerating what teaches in its house.',
		counsel: 'That which ye have already, hold fast till I come.',
		promise: 'Power over the nations, and the morning star.',
		body: 'The longest letter, to the largest body. Thyatira is not Jezebel: Thyatira is the church living in Jezebel’s day and under Jezebel’s influence. So a man may be inside that environment, or only under its strong influence, and still be a true Christian - and still be suffering her to prosper. A name meaning continual sacrifice, over a church whose central act is a sacrifice offered again and again, is not an accident.',
		second: 'That woman Jezebel - the system teaching inside the house, addressed apart from the church that puts up with her.'
	},
	{
		id: 'sardis',
		img: '/Sardis.jpg',
		alt: 'Sardis, Revelation 3:1–6: Christ holds seven stars over a crowd of sleeping figures before a temple, with the words You have a name that you live, but are dead.',
		n: 5,
		name: 'Sardis',
		meaning: 'A remnant - the ones who escape',
		under: 'Protestantism',
		began: '1517',
		beganNote: 'A process, really - Hus and Jerome burned, then Luther’s theses, the turning point.',
		size: '≈ 1 billion',
		nameable: true,
		reference: 'Revelation 3:1–6',
		condition: 'Thou hast a name that thou livest, and art dead',
		verdict: 'Almost nothing commended - a few names which have not defiled their garments. The works are not found perfect before God. A church with a reputation for life, and no life in it.',
		counsel: 'Be watchful, and strengthen the things which remain, that are ready to die.',
		promise: 'To be clothed in white raiment, and the name not blotted out of the book of life.',
		body: 'Everything that protested against Rome and came out: Presbyterians, Methodists, Baptists, Moravians, Adventists, the Anabaptists, the Mennonites, the Amish, the Waldenses - and, if we are going to count them Christian at all, the Jehovah’s Witnesses and the Mormons too. A name meaning the ones who escape, over the third of the three branches, and the escape did not finish. The protest was real; the life went out of it where its reformers stopped.',
		today: 'About a billion people, in something over thirty thousand denominations - which is exactly why the seven churches cannot be denominations. There are too many of those to count and only seven of these.'
	},
	{
		id: 'philadelphia',
		img: '/Philadelphia.jpg',
		alt: 'To the Church in Philadelphia: a great door stands open between two pillars onto a sunlit city, with a crown on the threshold.',
		n: 6,
		name: 'Philadelphia',
		meaning: 'Brotherly love',
		under: 'the movement of the little book',
		began: 'c. 1840',
		beganNote: 'The intense study of Daniel and Revelation that raised the advent movement.',
		size: 'A movement, not a denomination',
		nameable: true,
		reference: 'Revelation 3:7–13',
		condition: 'Thou hast a little strength, and hast kept my word',
		verdict: 'The second letter with no rebuke. Little strength is stated as a fact, not charged as a fault: they are faithful, they endure, and they have zeal for the work.',
		counsel: 'Hold that fast which thou hast, that no man take thy crown.',
		promise: 'A pillar in the temple of God, and the name of God, and the New Jerusalem, written on him.',
		body: 'A people brought into God’s will for the time by eating the little book - and what the little book gives them is the experience the name describes. Set the seal of God beside it, which has to do with the love of God, and the name Philadelphia stops being decoration and starts being evidence. There were wrong ideas in that movement and it was still a movement of God: sincere, committed, loving, and fixed on the coming of Jesus.',
		today: 'It began around 1840 and it has not stopped. This is not the offshoot that came out of it - that is the seventh letter - and those who keep the little book’s truths are still in it.'
	},
	{
		id: 'laodicea',
		img: '/Laodicea.jpg',
		alt: 'Laodicea, Revelation 3:14–22: Christ knocks at a closed door while those inside drink at their ease, with the words You are lukewarm, and neither cold nor hot.',
		n: 7,
		name: 'Laodicea',
		meaning: 'The judging of the people',
		under: 'the little book movement in apostasy',
		began: 'After Philadelphia',
		beganNote: 'When the movement organised itself away from what it had been given.',
		size: 'A movement in apostasy',
		nameable: true,
		reference: 'Revelation 3:14–22',
		condition: 'Thou art lukewarm, and knowest not that thou art wretched',
		verdict: 'The only letter with no commendation at all - the one church Jesus gives no encouragement and holds out no hope to. It is not charged with being cold. It is charged with not knowing what it is.',
		counsel: 'Buy of me gold tried in the fire, white raiment, and eyesalve, that thou mayest see.',
		promise: 'To sit with Christ in his throne, as he also overcame and is set down with his Father in his throne.',
		body: 'People who were in the little book movement and went into apostasy: they left that first brotherly love, stopped building on what Philadelphia was given, and organised into something else. So two movements run side by side at the end of time out of the same beginning - one still eating the book, one self-righteous, certain it has the truth, rich and increased with goods and in need of nothing. That self-description is the exact reverse of the verdict, and this is the letter where Christ is outside the door, knocking. Who they are, each reader can work out.',
		today: 'Alongside Philadelphia, to the end. Of the seven, this is the one the study will name last and the one it presses least - the conclusion is left with the reader.'
	}
];

/**
 * Five of the seven can be pointed at. Two cannot, and that is the point of
 * them: under that kind of pressure, denomination stops mattering.
 */
export const CONDITION_CLASSES = [
	{
		id: 'unnamed',
		label: 'Two you cannot give a name to',
		members: 'Ephesus · Smyrna',
		note: 'These are not denominations. They are real conditions, and where Christians live in them the labels fall away - Baptist, Adventist, Methodist, Presbyterian, even Catholic stops being the significant thing. Read the accounts: Christians under that kind of pressure link arms, help one another and have no time to fight among themselves, because what is pressing on them is so much heavier than what divides them.'
	},
	{
		id: 'nameable',
		label: 'Five you can almost name like denominations',
		members: 'Pergamos · Thyatira · Sardis · Philadelphia · Laodicea',
		note: 'Three is the Orthodox Church. Four is unmistakably Roman Catholicism. Five you cannot miss. Six is unmistakable. Seven is convincing, if arguable. Together, three, four and five account for nearly the whole visible spectrum of Christianity - 300 million, 1.3 billion, 1 billion - and six and seven are the two movements that come out of one beginning.'
	}
];

/** The illustration the study rests that distinction on. */
export const WURMBRAND = {
	quote: 'In prison in Romania there were no Catholics, no Adventists, no Jehovah’s Witnesses, no Baptists. Everybody was Christian.',
	source: 'Richard Wurmbrand, Tortured for Christ - as the study recounts it',
	note: 'A Romanian Christian imprisoned and tortured under communism. What he found in the cells is what the first two conditions do to a denomination: the suffering they went through together broke down the walls and left them brothers in Christ.'
};

/** Where the seven conditions stop being seven. */
export const WHERE_IT_ENDS = {
	title: 'Seven, until there are two.',
	note: 'The conditions overlap - a man can be in Thyatira and in Smyrna at once, in the Orthodox Church and persecuted by the state - and all seven run down to the last moments of time. Then the mark of the beast turns everything. The 144,000 is being made up through all of this; when it is complete, every true Christian has come to that place and is in Philadelphia, and whoever is left is Babylon. At that point the distinctions between the churches fall apart, and there are two companies: Babylon, and the remnant.',
	turning: 'The mark of the beast is the great turning point.'
};

/** @param {string} id */
export function getChurch(id) {
	return CHURCHES.find((church) => church.id === id) ?? null;
}

/** @param {string} id */
export function getChurchNeighbours(id) {
	const index = CHURCHES.findIndex((church) => church.id === id);
	if (index === -1) return { index: -1, previous: null, next: null };
	return {
		index,
		previous: CHURCHES[index - 1] ?? null,
		next: CHURCHES[index + 1] ?? null
	};
}
