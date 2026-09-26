// The written study the parallel chart belongs to: why the chart is built the
// way it is, and what each band of it is claiming. The chart itself, its four
// colour phases and its cells, stay in overview-chart.js — this file is the
// reading around it.
//
// The argument in one line: Revelation 4–20 is a judgment between two kingdoms,
// Daniel 7 is the template, and the rest of Revelation fills in the detail.

/** Why the chart begins where it does — the gospel of the kingdom. */
export const KINGDOM_GOSPEL = {
	eyebrow: 'Where the chart begins',
	title: 'Not merely the gospel. The gospel of the kingdom.',
	lede: 'The message God’s people are to preach is not merely “the gospel.” It is the gospel of the kingdom - and the whole chart hangs on that.',
	witnesses: [
		{
			reference: 'Matthew 3:1–2',
			body: 'John the Baptist opened with it: repent, for the kingdom of heaven is at hand.'
		},
		{
			reference: 'Matthew 24:14',
			body: 'Jesus made it the condition of the end - this gospel of the kingdom shall be preached, and then the end comes.'
		},
		{
			reference: 'Luke 17:20–21',
			body: 'When the Pharisees asked when it would appear, He said it does not come with observation: “The kingdom of God is within you.”'
		},
		{
			reference: 'Colossians 1:27',
			body: 'Paul names what is within: “Christ in you, the hope of glory.”'
		}
	],
	close: 'The first angel of Revelation 14 flies with “the everlasting gospel” - and Jesus has already defined that gospel as the gospel of the kingdom.'
};

/** The one instruction the chart needs before it can be read. */
export const HOW_TO_READ = {
	eyebrow: 'How to read the chart',
	title: 'Two kingdoms, one judgment.',
	lede: 'Revelation 4–20 is a judgment between two kingdoms. Daniel 7 is the template. Revelation fills in the detail. The colours are time: where a block sits, not what it is called, is the claim.'
};

/** I — the template. Daniel 7, and the blank it leaves. */
export const TEMPLATE = {
	numeral: 'I',
	id: 'template',
	eyebrow: 'The template',
	title: 'Daniel 7',
	beasts: [
		{ beast: 'Lion', empire: 'Babylon', state: 'Failed' },
		{ beast: 'Bear', empire: 'Medo-Persia', state: 'Failed' },
		{ beast: 'Leopard', empire: 'Greece', state: 'Failed' },
		{ beast: 'Terrible beast', empire: 'Rome', state: 'Stands until Christ comes' }
	],
	body: 'The fourth is the last earthly kingdom. It is not replaced by another empire. It survives until Christ comes, when it is “given to the burning flame.”',
	bodyRef: 'Daniel 7:11',
	court: 'While the little horn is speaking great words and persecuting the saints, heaven opens: thrones set, the Ancient of Days seated, books opened.',
	courtRef: 'Daniel 7:9–10',
	verdicts: [
		{
			reference: 'Daniel 7:13–14',
			body: 'The Son of Man is given an everlasting kingdom that all peoples shall serve.'
		},
		{
			reference: 'Daniel 7:11',
			body: 'The beast is destroyed.'
		}
	],
	blank: {
		title: 'Daniel then jumps.',
		body: 'Between the opening of the books and those two verdicts there is a blank. Revelation occupies that blank.'
	},
	five: 'There are five kingdoms in Daniel 7, not four. Babylon, Medo-Persia and Greece have already failed. Two remain: the beast, and Christ’s kingdom, which began at Pentecost. The judgment decides which is fit to rule.'
};

/** II — Christ's kingdom reviewed, Revelation 5 to 11. */
export const CHRISTS_KINGDOM = {
	numeral: 'II',
	id: 'christs-kingdom',
	eyebrow: 'Christ’s kingdom reviewed',
	title: 'Revelation 5 to 11',
	lede: 'The seven-sealed book is the chronicle of Christ’s kingdom: from Pentecost - Christ living in His people - to the seventh trumpet, where the kingdoms of this world become His in fullness. Each seal is a chapter.',
	horses: [
		{ seal: 'Seal 1', horse: 'White horse', body: 'The kingdom begins well. The early church goes out conquering.' },
		{ seal: 'Seal 2', horse: 'Red horse', body: 'It begins to fall away. Peace is taken from the earth.' },
		{ seal: 'Seal 3', horse: 'Black horse', body: 'Apostasy. Truth is sold cheap; the kingdom courts the world.' },
		{ seal: 'Seal 4', horse: 'Pale horse', body: 'Worst of the four. The rider is Death, and the visible church becomes Satan’s instrument.' }
	],
	horsesNote: 'Seals 1–4 run through the same centuries as Daniel’s little horn.',
	seal5: {
		label: 'Seal 5 · Present',
		title: 'The judgment itself.',
		body: 'The book was opened when the judgment sat. Inside that book there is also a chapter about the judgment. Seal 5 is that chapter.',
		robes: 'The souls under the altar receive white robes. They were already innocent before God; the robe is a public clearing of their name. In the world they died as criminals - in the judgment it is seen that they were righteous. This is Daniel 7’s “judgment was given to the saints”: a verdict on their behalf, not the saints sitting as judges.',
		rest: 'They rest a little longer. More of their brethren will be killed. Until probation closes, Christian blood is still seed. After it closes, that purpose ends.',
		marker: 'This is where we are.'
	},
	sealed: {
		title: 'The 144,000 belong here - not after seal 6.',
		why: 'Seal 6 already announces the day of wrath, the seven last plagues. By then God’s people must already be sealed.',
		points: [
			{
				title: 'The decisive exhibit',
				body: 'Seals 1–4 look like decline. If that were the whole record, Christ’s government would not have been proven. The 144,000 display the kingdom in the greatest purity yet seen - first fruits, without fault, the Lamb’s followers, God’s battle-axe in the contest. When they have been shown, the argument is over.'
			},
			{
				title: 'A number, not a headcount',
				body: 'Twelve is the kingdom number, and 144 is twelve twelves. The figure is almost certainly symbolic. They are also the company that survives; many other Christians die as martyrs in this same period.'
			},
			{
				title: 'Heard, then seen',
				body: 'The great multitude of Revelation 7:9 is the same company: heard as a number, then seen as a multitude. All of it occupies the same pocket of time as the mark of the beast.'
			}
		]
	},
	future: {
		label: 'Seals 6–7 · Future',
		title: 'What Daniel left blank.',
		items: [
			{ name: 'Seal 6', body: 'Cosmic signs. Men hide and say the day of wrath has come.' },
			{ name: 'Seal 7', body: 'The trumpets.' }
		],
		trumpet: {
			quote: 'The kingdoms of this world are become the kingdoms of our Lord, and of His Christ.',
			reference: 'Revelation 11:15',
			body: 'This is not Pentecost. Pentecost was the beginning of the kingdom; this is its establishment. The nations are not His yet. Daniel 7:13–14 is this same moment - not the ascension. “All people, nations, and languages should serve Him” has never been true since Pentecost.'
		}
	}
};

/** III — the beast's kingdom reviewed, Revelation 12 to 19. */
export const BEASTS_KINGDOM = {
	numeral: 'III',
	id: 'beasts-kingdom',
	eyebrow: 'The beast’s kingdom reviewed',
	title: 'Revelation 12 to 19',
	lede: 'The same four movements, from the other side.',
	movements: [
		{
			phase: 'persecution',
			label: 'Past',
			body: 'While the four horses run, Satan persecutes the woman through the beast: Nero, the Dark Ages, the dragon cast down.',
			refs: 'Revelation 12–13'
		},
		{
			phase: 'judgment',
			label: 'Present',
			body: 'A beast rises from the earth - America as a world power, during the judgment. Then the mark of the beast: the perfecting of Satan’s kingdom, running in parallel with the 144,000. We are in this zone now, moving into that crisis.',
			refs: 'Revelation 13:11–17'
		},
		{
			phase: 'cosmic',
			label: 'Future',
			body: 'The earth is harvested; the grapes go into the winepress. Then the seven last plagues, matching the trumpets.',
			refs: 'Revelation 14:14–20; 16'
		},
		{
			phase: 'kingdom',
			label: 'End',
			body: 'The beast is cast into the lake of fire. That is Daniel’s second verdict, matching the moment Christ receives the kingdom.',
			refs: 'Revelation 19:20'
		}
	]
};

/** The chart in four lines — the same grid, read across rather than down. */
export const ACROSS = [
	{
		phase: 'persecution',
		label: 'Past',
		daniel: 'Little horn persecutes',
		christ: 'Seals 1–4: four horses',
		beast: 'Dragon persecutes the woman'
	},
	{
		phase: 'judgment',
		label: 'Present',
		daniel: 'Judgment sits; books opened',
		christ: 'Seal 5; 144,000 perfected',
		beast: 'America rises; mark of the beast'
	},
	{
		phase: 'cosmic',
		label: 'Future',
		daniel: 'Blank in Daniel',
		danielBlank: true,
		christ: 'Seal 6 cosmic signs; trumpets',
		beast: 'Harvest; seven last plagues'
	},
	{
		phase: 'kingdom',
		label: 'End',
		daniel: 'Christ given dominion; beast burned',
		christ: 'Seventh trumpet',
		beast: 'Beast into the lake of fire'
	}
];

export const ACROSS_NOTES = [
	'Details still to place on this grid - the two witnesses, the little book, the woman on the beast - fit inside it. They do not replace it.',
	'Chapters 1–3 are introduction. Chapters 21–22 are epilogue. The main body is the contest of the two kingdoms.'
];

/** Four cautions, kept beside the chart because each one is easy to lose. */
export const NOTES = [
	{
		title: 'Not a salvation test',
		body: 'Millions died in Christ without understanding Revelation. The book is for the last generation, who finish the work of the kingdom. It is a privilege, not a ticket into heaven.'
	},
	{
		title: 'Martyrs during the sealing still win people',
		body: 'Because probation is not closed, their death is still seed. After it closes, that purpose ends.'
	},
	{
		title: 'Default reading: symbolic',
		body: 'The unusual case is the literal one. Locusts with lions’ teeth are not zoology. The drying Euphrates is not the physical river - the sixth plague comes after the mark of the beast. Those who read it as a land-bridge for an army against literal Israel have already mistaken who God’s people are.'
	},
	{
		title: 'Why it is hard',
		body: 'It was not designed for the careless, or for Satan. Truth is revealed, not discovered, and it is revealed to the submissive. Dullness of mind is not a disqualification. Dullness of spirit is.'
	}
];
