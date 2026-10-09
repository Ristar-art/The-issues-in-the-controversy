import { error } from '@sveltejs/kit';
import { getChurchDetail } from '$lib/data/church-details.js';
import { CHURCHES, getChurch, getChurchNeighbours } from '$lib/data/churches.js';

export function load({ params }) {
	const church = getChurch(params.slug);
	if (!church) throw error(404, 'That church is not one of the seven.');

	const { index, previous, next } = getChurchNeighbours(church.id);

	return {
		church,
		detail: getChurchDetail(church.id),
		position: { index, number: index + 1, total: CHURCHES.length },
		previous,
		next
	};
}
