// Revelation 4 — the throne room, as the chapter itself lists it. Each element
// carries the verse it is built from and an anchor: the point in the scene the
// hotspot label is pinned to.
//
// The One seated on the throne is rendered as a figure of light — form and
// robe, and no face. The chapter gives an appearance, jasper and sardine
// stone, rather than features, so the scene stops where the text stops.

export const THRONE_ELEMENTS = [
	{
		id: 'throne',
		num: '01',
		label: 'The throne',
		refs: 'Revelation 4:2–3',
		note: 'A throne was set in heaven, and one sat on it - to look upon like a jasper and a sardine stone.',
		// Set beside the figure rather than over it, so the label never covers it.
		anchor: [3.6, 6, 1.9]
	},
	{
		id: 'rainbow',
		num: '02',
		label: 'The rainbow',
		refs: 'Revelation 4:3',
		note: 'And there was a rainbow round about the throne, in sight like unto an emerald.',
		anchor: [0, 12.6, 0]
	},
	{
		id: 'elders',
		num: '03',
		label: 'The four and twenty elders',
		refs: 'Revelation 4:4',
		note: 'Four and twenty seats, and upon the seats four and twenty elders sitting, clothed in white raiment, with crowns of gold on their heads.',
		anchor: [15.5, 2.6, -13]
	},
	{
		id: 'voices',
		num: '04',
		label: 'Lightnings and voices',
		refs: 'Revelation 4:5',
		note: 'And out of the throne proceeded lightnings and thunderings and voices.',
		anchor: [-7.5, 11.5, -6]
	},
	{
		id: 'lamps',
		num: '05',
		label: 'The seven lamps',
		refs: 'Revelation 4:5',
		note: 'Seven lamps of fire burning before the throne, which are the seven Spirits of God.',
		anchor: [0, 2.6, 8.5]
	},
	{
		id: 'sea',
		num: '06',
		label: 'The sea of glass',
		refs: 'Revelation 4:6',
		note: 'And before the throne there was a sea of glass, like unto crystal.',
		anchor: [13, 0.4, 11]
	},
	{
		id: 'creatures',
		num: '07',
		label: 'The four living creatures',
		refs: 'Revelation 4:6–8',
		note: 'Four beasts full of eyes before and behind - the first like a lion, the second like a calf, the third with the face of a man, the fourth like a flying eagle.',
		anchor: [-11, 5.4, 0]
	},
	{
		// The one element here that comes from the next chapter: the room is
		// set in Revelation 4, and the company round about it is numbered
		// in Revelation 5.
		id: 'company',
		num: '08',
		label: 'The innumerable company',
		refs: 'Revelation 5:11',
		note: 'The voice of many angels round about the throne and the beasts and the elders - the number of them ten thousand times ten thousand, and thousands of thousands.',
		anchor: [-30, 5, -26]
	}
];

/** The four faces, set at the quarters of the throne. */
export const LIVING_CREATURES = [
	{ id: 'lion', label: 'Like a lion', angle: 0 },
	{ id: 'calf', label: 'Like a calf', angle: Math.PI / 2 },
	{ id: 'man', label: 'The face of a man', angle: Math.PI },
	{ id: 'eagle', label: 'Like a flying eagle', angle: (3 * Math.PI) / 2 }
];
