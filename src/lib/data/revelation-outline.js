// The book of Revelation in four divisions, chapters 1–22.
//
// The shape of the argument: divisions 2 and 3 are deliberate counterparts.
// Both are a kingdom put on trial, and their five steps answer one another
// point for point — the same moment told once from Christ's side and once from
// the beast's. `pair` carries that correspondence, and is what the chart lights
// when a step is hovered.

/**
 * @typedef {object} OutlineItem
 * @property {string} id
 * @property {string} label
 * @property {string} refs
 * @property {string} note
 * @property {number} [pair] Index of the answering step in the other kingdom's trial.
 */

/**
 * @type {{
 *   id: string, num: number, title: string | null, chapters: number[],
 *   range: string, vertical: boolean, blurb: string, items: OutlineItem[]
 * }[]}
 */
export const DIVISIONS = [
	{
		id: 'introduction',
		num: 1,
		title: null,
		chapters: [1, 2, 3],
		range: 'Revelation 1–3',
		// Narrow columns in the reference chart, set vertically as they are there.
		vertical: true,
		blurb: 'The book introduces itself, and Christ walks among the seven churches.',
		items: [
			{
				id: 'i-intro',
				label: 'Introduction',
				refs: 'Revelation 1',
				note: 'The revelation of Jesus Christ, given to show His servants things which must shortly come to pass.'
			},
			{
				id: 'i-letters',
				label: 'Letters to the seven churches',
				refs: 'Revelation 2–3',
				note: 'Seven letters to seven churches - commendation, rebuke and promise to him that overcometh.'
			}
		]
	},
	{
		id: 'christ',
		num: 2,
		title: "Christ's kingdom judged",
		chapters: [4, 5, 6, 7, 8, 9, 10, 11],
		range: 'Revelation 4–11',
		vertical: false,
		blurb: "The court is seated and Christ's own kingdom - His church - is the first examined.",
		items: [
			{
				id: 'c-history',
				label: 'The history of the Church examined.',
				refs: 'Revelation 4–6',
				note: 'The throne, the sealed book, and the horsemen carrying the church from its purity to its corruption.',
				pair: 1
			},
			{
				id: 'c-gospel',
				label: 'The final preaching of the gospel.',
				refs: 'Revelation 10:8–11',
				note: 'The little book is eaten, and the command comes to prophesy again before many peoples and nations.',
				pair: 2
			},
			{
				id: 'c-sealed',
				label: 'Followers of Christ examined and sealed.',
				refs: 'Revelation 7:1–8; 11:1–2',
				note: 'The servants of God are sealed in their foreheads, and the temple and its worshippers are measured.',
				pair: 3
			},
			{
				id: 'c-grace',
				label: 'The end of grace.',
				refs: 'Revelation 8:5',
				note: '"Then the angel took the censer, filled it with fire from the altar, and hurled it on the earth; and there came peals of thunder, rumblings, flashes of lightning and an earthquake." - the offer of mercy closes.',
				pair: 4
			},
			{
				id: 'c-kingdom',
				label: 'Christ receives His kingdom.',
				refs: 'Revelation 11:15–18',
				note: 'The kingdoms of this world become the kingdoms of our Lord and of His Christ.',
				pair: 5
			}
		]
	},
	{
		id: 'beast',
		num: 3,
		title: "The beast's kingdom judged",
		chapters: [12, 13, 14, 15, 16, 17, 18, 19],
		range: 'Revelation 12–19',
		vertical: false,
		blurb: 'The same trial, run again over the rival kingdom - its history, its followers, and its end.',
		items: [
			{
				id: 'b-history',
				label: 'The history of the beast revealed.',
				refs: 'Revelation 12–13',
				note: 'The dragon, the beast from the sea and the beast from the earth, and where each of them came from.',
				pair: 1
			},
			{
				id: 'b-assault',
				label: 'The final assault against Christians.',
				refs: 'Revelation 13:5–7, 15',
				note: 'War made with the saints, and death decreed for those who will not worship the image.',
				pair: 2
			},
			{
				id: 'b-marked',
				label: 'Followers of the beast are marked.',
				refs: 'Revelation 13:16–17',
				note: 'A mark in the right hand or forehead, without which no man may buy or sell - the counterfeit of the seal.',
				pair: 3
			},
			{
				id: 'b-probation',
				label: 'The close of probation.',
				refs: 'Revelation 15:5–8; 16:1',
				note: 'No man is able to enter the temple till the plagues are fulfilled, and the vials are poured out.',
				pair: 4
			},
			{
				id: 'b-end',
				label: "The end of the beast's kingdom.",
				refs: 'Revelation 17:14; 19:19–21',
				note: 'The Lamb overcomes them, and the beast and the false prophet are taken.',
				pair: 5
			}
		]
	},
	{
		id: 'consummation',
		num: 4,
		title: null,
		chapters: [20, 21, 22],
		range: 'Revelation 20–22',
		vertical: true,
		blurb: 'After both kingdoms are judged: the thousand years, the last assize, and the earth made new.',
		items: [
			{
				id: 'e-millennium',
				label: 'The Millennium.',
				refs: 'Revelation 20:1–6',
				note: 'Satan bound a thousand years, and the saints reigning with Christ in judgement.'
			},
			{
				id: 'e-judgment',
				label: 'The final judgment.',
				refs: 'Revelation 20:11–15',
				note: 'The great white throne, the books opened, and every man judged out of the things written.'
			},
			{
				id: 'e-newearth',
				label: 'The new earth.',
				refs: 'Revelation 21:1–22:5',
				note: 'A new heaven and a new earth, and God Himself dwelling with His people.'
			},
			{
				id: 'e-closing',
				label: 'Closing exhortations.',
				refs: 'Revelation 22:6–21',
				note: 'Behold, I come quickly - the book closes with invitation and warning.'
			}
		]
	}
];

/** Column proportions, taken from the widths in the reference chart. */
export const DIVISION_WIDTHS = [80, 188, 194, 80];

/** Every item, flattened with the division it belongs to. */
export const OUTLINE_ITEMS = DIVISIONS.flatMap((division) =>
	division.items.map((item) => ({
		...item,
		divisionId: division.id,
		divisionNum: division.num,
		divisionTitle: division.title,
		range: division.range
	}))
);
