import { json } from '@sveltejs/kit';
import { dev } from '$app/environment';
import componentsData from '$lib/data/components.json';

let components = [...componentsData];

function readComponents() {
  return components;
}

async function writeComponents(updatedComponents) {
  components = updatedComponents;
  if (dev) {
    const { writeFile } = await import('fs/promises');
    const { resolve } = await import('path');
    const DB_PATH = resolve('src/lib/data/components.json');
    await writeFile(DB_PATH, JSON.stringify(updatedComponents, null, 2), 'utf8');
  }
}

export async function GET() {
  try {
    const result = readComponents();
    return json(result);
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
      const currentComponents = readComponents();
      const index = currentComponents.findIndex((c) => c.id === body.id);

      if (index === -1) {
        currentComponents.push(body);
      } else {
        currentComponents[index] = body;
      }

      await writeComponents(currentComponents);
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

export async function DELETE({ request }) {
  try {
    const body = await request.json();

    if (!body || !body.id) {
      return json({ error: 'Component ID is required' }, { status: 400 });
    }

    const currentComponents = readComponents();
    const filtered = currentComponents.filter((c) => c.id !== body.id);

    if (filtered.length === currentComponents.length) {
      return json({ error: 'Component not found' }, { status: 404 });
    }

    await writeComponents(filtered);
    return json({ ok: true });
  } catch (err) {
    console.error('Failed to delete component', err);
    return json({ error: 'Failed to delete component' }, { status: 500 });
  }
}
