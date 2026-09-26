// The parallel chart: four prophecies laid over one timeline, so that events
// standing in the same column are read as the same event seen from a different
// prophecy. The four colour bands are the phases of that timeline.
//
// Every row is drawn on the same nine-column grid — the column widths below are
// the proportions the chart is built from, and every cell places itself with a
// start column and a span. Change a width here and all four rows stay aligned.
export const CHART_COLUMNS = [238, 160, 60, 175, 172, 83, 75, 150, 135];

// `time` is what the colour means on the original chart - orange past, green
// present, blue future, yellow the concluding events - and `label` is what
// stands in that band.
export const PHASES = [
	{
		id: 'persecution',
		time: 'Past',
		label: 'War against the saints',
		blurb: 'The long era of dominion and persecution, before the court is seated.'
	},
	{
		id: 'judgment',
		time: 'Present',
		label: 'The judgment',
		blurb: 'Where we are now. The books are opened and the sealing goes forward while probation lasts.'
	},
	{
		id: 'cosmic',
		time: 'Future',
		label: 'Cosmic events & plagues',
		blurb: 'Probation closed. The signs in the heavens, and the plagues that follow.'
	},
	{
		id: 'kingdom',
		time: 'Concluding events',
		label: 'The kingdom given',
		blurb: 'The verdict executed, and the kingdom handed to Christ and His saints.'
	}
];

/**
 * @typedef {object} ChartCell
 * @property {string} [id]        Unique key; omitted for spacers.
 * @property {string} [label]     Text in the cell.
 * @property {string} [refs]      The passage this cell is drawn from.
 * @property {string} [note]      One line, shown in the reading panel.
 * @property {string} phase       Which colour band it belongs to.
 * @property {number} col         Starting column, 1-indexed.
 * @property {number} [span]      Columns spanned, default 1.
 * @property {number} [row]       Sub-row within the band, default 1.
 * @property {number} [rowSpan]   Sub-rows spanned, default 1.
 * @property {boolean} [vertical] Set for the two narrow columns, as in the chart.
 * @property {boolean} [blank]    A filled block carrying no text.
 */

/** @type {{ id: string, label: string, subRows: number, cells: ChartCell[] }[]} */
export const CHART_ROWS = [
	{
		id: 'daniel-7',
		label: 'Daniel 7',
		subRows: 1,
		cells: [
			{
				id: 'd7-war',
				label: 'War against Saints',
				refs: 'Daniel 7:21, 25',
				note: 'The horn makes war with the saints and prevails, and thinks to change times and laws.',
				phase: 'persecution',
				col: 1
			},
			{
				id: 'd7-judgment',
				label: 'Judgment sits',
				refs: 'Daniel 7:9–10, 26',
				note: 'The thrones are set, the Ancient of days is seated, and the books are opened.',
				phase: 'judgment',
				col: 2,
				span: 4
			},
			{ phase: 'cosmic', col: 6, span: 3, blank: true },
			{
				id: 'd7-kingdom',
				label: "Christ's Kingdom",
				refs: 'Daniel 7:14, 27',
				note: 'Dominion, glory and a kingdom given to the Son of man, and to the saints with Him.',
				phase: 'kingdom',
				col: 9
			},
			{
				id: 'd7-burned',
				label: 'Beast burned',
				refs: 'Daniel 7:11',
				note: 'The beast is slain and its body given to the burning flame - the sentence carried out.',
				phase: 'kingdom',
				col: 9,
				row: 2
			}
		]
	},
	{
		id: 'rev-5-11',
		label: 'Rev 5–11',
		subRows: 1,
		cells: [
			{
				id: 'r5-seals',
				label: 'Seals 1 – 4',
				refs: 'Revelation 6:1–8',
				note: 'The four horsemen - the church from its purity through its compromise to its corruption.',
				phase: 'persecution',
				col: 1
			},
			{
				id: 'r5-seal5',
				label: 'Seal 5 Judgment begins',
				refs: 'Revelation 6:9–11',
				note: 'The souls under the altar cry How long, and are told to rest a little season.',
				phase: 'judgment',
				col: 2,
				span: 2
			},
			{
				id: 'r5-144',
				label: '144,000 sealed',
				refs: 'Revelation 7:1–8',
				note: 'The winds are held until the servants of God are sealed in their foreheads.',
				phase: 'judgment',
				col: 4,
				span: 2
			},
			{
				id: 'r5-seal6',
				label: 'Seal 6 Cosmic events',
				refs: 'Revelation 6:12–17',
				note: 'Earthquake, sun black, moon as blood, and the stars falling.',
				phase: 'cosmic',
				col: 6,
				span: 2
			},
			{
				id: 'r5-seal7',
				label: 'Seal 7 Seven Trumps',
				refs: 'Revelation 8:1–2',
				note: 'Silence in heaven, and the seven angels given seven trumpets.',
				phase: 'cosmic',
				col: 8
			},
			{
				id: 'r5-receives',
				label: 'Christ receives Kingdom',
				refs: 'Revelation 11:15',
				note: 'The kingdoms of this world become the kingdoms of our Lord and of His Christ.',
				phase: 'kingdom',
				col: 9
			}
		]
	},
	{
		id: 'rev-10-11',
		label: 'Rev 10–11',
		subRows: 2,
		cells: [
			{
				id: 'r10-book',
				label: 'Little Book opened',
				refs: 'Revelation 10:1–2, 8–10',
				note: 'The book that was sealed in Daniel stands open, sweet in the mouth and bitter after.',
				phase: 'judgment',
				col: 2
			},
			{
				id: 'r10-witnesses',
				label: '2 Witnesses Prophesy',
				refs: 'Revelation 11:3–6',
				note: 'The two witnesses prophesy in sackcloth through the 1260 days.',
				phase: 'judgment',
				col: 3,
				span: 2
			},
			{
				id: 'r10-killed',
				label: 'Witnesses killed',
				refs: 'Revelation 11:7–10',
				note: 'The beast from the pit makes war on them, and their bodies lie in the street.',
				phase: 'judgment',
				col: 5
			},
			{
				id: 'r10-temple',
				label: 'Temple measured',
				refs: 'Revelation 11:1–2',
				note: 'The temple, the altar and the worshippers are measured - the same work as the judgment.',
				phase: 'judgment',
				col: 2,
				span: 4,
				row: 2
			},
			{
				id: 'r10-ascend',
				label: 'Witnesses ascend',
				refs: 'Revelation 11:11–12',
				note: 'The Spirit of life enters them and they are called up in a cloud.',
				phase: 'cosmic',
				col: 6,
				rowSpan: 2,
				vertical: true
			},
			{
				id: 'r10-quake',
				label: 'Great earthquake',
				refs: 'Revelation 11:13',
				note: 'The tenth of the city falls, and the rest give glory to the God of heaven.',
				phase: 'cosmic',
				col: 7,
				rowSpan: 2,
				vertical: true
			},
			{
				id: 'r10-mystery',
				label: 'The mystery finished',
				refs: 'Revelation 10:7',
				note: 'In the days of the seventh angel the mystery of God is finished - probation ends.',
				phase: 'kingdom',
				col: 9,
				rowSpan: 2
			}
		]
	},
	{
		id: 'rev-12-19',
		label: 'Rev 12–19',
		subRows: 1,
		cells: [
			{
				id: 'r12-dragon',
				label: 'Dragon & beast vs saints',
				refs: 'Revelation 12:13–17; 13:5–7',
				note: 'The dragon makes war with the remnant, and the beast with the saints, for forty-two months.',
				phase: 'persecution',
				col: 1
			},
			{
				id: 'r12-earthbeast',
				label: 'Beast From earth',
				refs: 'Revelation 13:11',
				note: 'A second beast rises from the earth with two horns like a lamb.',
				phase: 'judgment',
				col: 2
			},
			{
				id: 'r12-mark',
				label: 'Mark of the Beast crisis',
				refs: 'Revelation 13:15–17',
				note: 'Worship enforced by law - none may buy or sell without the mark.',
				phase: 'judgment',
				col: 3,
				span: 3
			},
			{
				id: 'r12-harvest',
				label: 'Earth harvested',
				refs: 'Revelation 14:14–20',
				note: 'The harvest of the earth is reaped, and the vintage cast into the winepress.',
				phase: 'cosmic',
				col: 6,
				span: 2
			},
			{
				id: 'r12-plagues',
				label: 'Seven plagues',
				refs: 'Revelation 16:1–21',
				note: 'The vials of the wrath of God, poured out after probation has closed.',
				phase: 'cosmic',
				col: 8
			},
			{
				id: 'r12-lake',
				label: 'Beast cast into Lake of fire',
				refs: 'Revelation 19:20',
				note: 'The beast and the false prophet are taken and cast alive into the lake of fire.',
				phase: 'kingdom',
				col: 9
			}
		]
	}
];

/** Every cell that carries text, flattened with its row for lookups. */
export const CHART_CELLS = CHART_ROWS.flatMap((row) =>
	row.cells
		.filter((cell) => cell.id)
		.map((cell) => ({ ...cell, rowId: row.id, rowLabel: row.label }))
);
