import { json } from '@sveltejs/kit';
import { readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';

const DB_PATH = resolve(process.cwd(), 'src/lib/data/components.json');

async function readComponents() {
  const raw = await readFile(DB_PATH, 'utf8');
  return JSON.parse(raw);
}

async function writeComponents(components) {
  const data = JSON.stringify(components, null, 2);
  await writeFile(DB_PATH, data, 'utf8');
}

export async function GET() {
  try {
    const components = await readComponents();
    return json(components);
  } catch (err) {
    console.error('Failed to read components DB', err);
    return json({ error: 'Failed to read components DB' }, { status: 500 });
  }
}

export async function POST({ request }) {
  try {
    const body = await request.json();

    // Handle single component update
    if (body && typeof body === 'object' && !Array.isArray(body) && body.id) {
      const components = await readComponents();
      const index = components.findIndex((c) => c.id === body.id);

      if (index === -1) {
        // Component doesn't exist, add it as new
        components.push(body);
      } else {
        // Update existing component
        components[index] = body;
      }

      await writeComponents(components);
      return json({ ok: true });
    }

    // Handle full array update (legacy support)
    if (Array.isArray(body)) {
      await writeComponents(body);
      return json({ ok: true });
    }

    return json({ error: 'Invalid request body' }, { status: 400 });
  } catch (err) {
    console.error('Failed to write components DB', err);
    return json({ error: 'Failed to write components DB' }, { status: 500 });
  }
}
