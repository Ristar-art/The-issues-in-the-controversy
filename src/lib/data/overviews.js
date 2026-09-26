// The overviews, in the order they are meant to be read. The switcher that
// sits under the site nav on every overview page is built from this list, so
// adding a third overview is a matter of adding an entry here.
export const OVERVIEWS = [
	{
		id: 'parallel',
		href: '/overview',
		kicker: 'Overview 01',
		title: 'Daniel & Revelation in parallel',
		blurb: 'Four prophecies laid over one timeline.'
	},
	{
		id: 'revelation',
		href: '/overview/revelation',
		kicker: 'Overview 02',
		title: 'The book of Revelation',
		blurb: 'The day of the Lord - the whole book in four divisions.'
	},
	{
		id: 'daniel',
		href: '/overview/daniel',
		kicker: 'Overview 03',
		title: 'The visions of Daniel',
		blurb: 'Four visions over one march of empires.'
	}
];

/** @param {string} id */
export function otherOverviews(id) {
	return OVERVIEWS.filter((overview) => overview.id !== id);
}
