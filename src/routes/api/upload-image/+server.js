import { writeFile } from 'fs/promises';
import { join } from 'path';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
  try {
    const data = await request.formData();
    const file = data.get('image');

    if (!file || !(file instanceof File)) {
      return json({ error: 'No image file provided' }, { status: 400 });
    }

    // Generate a unique filename
    const ext = file.name.split('.').pop();
    const filename = `bg-${Date.now()}.${ext}`;
    const filepath = join('static', filename);

    // Convert file to buffer and write
    const buffer = await file.arrayBuffer();
    await writeFile(filepath, Buffer.from(buffer));

    return json({ url: `/${filename}` });
  } catch (error) {
    console.error('Upload error:', error);
    return json({ error: 'Failed to upload image' }, { status: 500 });
  }
}