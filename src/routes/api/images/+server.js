import { readdir } from 'fs/promises';
import { join } from 'path';
import { json } from '@sveltejs/kit';

const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif'];

export async function GET() {
  try {
    const files = await readdir('static');
    const images = files
      .filter(file => imageExtensions.some(ext => file.toLowerCase().endsWith(ext)))
      .map(file => ({ name: file, url: `/${file}` }));

    return json(images);
  } catch (error) {
    console.error('Error listing images:', error);
    return json({ error: 'Failed to list images' }, { status: 500 });
  }
}