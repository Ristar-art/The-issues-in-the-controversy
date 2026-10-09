import { error } from '@sveltejs/kit';
import { TRUMPET_STUDIES, getTrumpet, getTrumpetNeighbours } from '$lib/data/seventh-seal.js';
import { getTrumpetDetail, hasDetail } from '$lib/data/trumpet-details.js';

export function load({ params }) {
	const trumpet = getTrumpet(params.slug);
	if (!trumpet || trumpet.id !== params.slug) {
		throw error(404, 'That trumpet is not part of the seven.');
	}

	const { index, previous, next } = getTrumpetNeighbours(trumpet.id);
	const detail = getTrumpetDetail(trumpet.id);

	return {
		trumpet,
		detail,
		// The study is written after the page exists, so the page has to know
		// whether there is anything to show yet.
		written: hasDetail(detail),
		position: { index, number: index + 1, total: TRUMPET_STUDIES.length },
		previous,
		next
	};
}
