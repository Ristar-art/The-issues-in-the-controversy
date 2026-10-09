// Turns a scripture citation as the studies write it ("John 12:31–32",
// "Daniel 12:4, 8–10", "Genesis 3") into its page on biblehub.com. A verse
// range or list links to its first verse; a bare chapter links to the KJV
// chapter, the translation the studies quote.

/**
 * @param {string} reference
 * @returns {string | null} the URL, or null when the citation can't be read
 */
export function biblehubUrl(reference) {
	const match = reference.trim().match(/^((?:[1-3]\s)?[A-Za-z ]+?)\s+(\d+)(?::(\d+))?/);
	if (!match) return null;
	const [, book, chapter, verse] = match;
	const slug = book.toLowerCase().replace(/\s+/g, '_');
	return verse
		? `https://biblehub.com/${slug}/${chapter}-${verse}.htm`
		: `https://biblehub.com/kjv/${slug}/${chapter}.htm`;
}

/**
 * Splits a compound citation ("Revelation 1:11, 19 · 1:10") into its parts,
 * each with its own link. A part with no book of its own ("1:10") takes the
 * book of the one before it.
 * @param {string} refs
 * @returns {{ text: string, href: string | null }[]}
 */
export function biblehubParts(refs) {
	let book = '';
	return refs.split(/\s*[·;]\s*/).filter(Boolean).map((text) => {
		const bare = /^\d+(?::\d+)?\s*([,–-]|$)/.test(text);
		const full = bare && book ? `${book} ${text}` : text;
		const m = full.match(/^((?:[1-3]\s)?[A-Za-z ]+?)\s+\d/);
		if (m) book = m[1];
		return { text, href: biblehubUrl(full) };
	});
}
