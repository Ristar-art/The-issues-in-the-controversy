import { error } from '@sveltejs/kit';
import { SEALS, getSeal, getSealNeighbours } from '$lib/data/seals.js';
import { getSealDetail, hasDetail } from '$lib/data/seal-details.js';

export function load({ params }) {
	const seal = getSeal(params.slug);
	if (!seal) throw error(404, 'That seal is not part of the seven.');

	const { index, previous, next } = getSealNeighbours(seal.id);
	const detail = getSealDetail(seal.id);

	return {
		seal,
		detail,
		// The study is written after the page exists, so the page has to know
		// whether there is anything to show yet.
		written: hasDetail(detail),
		position: { index, number: index + 1, total: SEALS.length },
		previous,
		next
	};
}
