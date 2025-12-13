import { json } from '@sveltejs/kit';
import landing from '$lib/data/landing.json';

export function GET() {
  return json(landing);
}
