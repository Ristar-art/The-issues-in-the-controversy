import { json, error } from '@sveltejs/kit';
import { dev } from '$app/environment';
import pagesData from '$lib/data/pages.json';

let pages = [...pagesData];

function readPages() {
  return pages;
}

async function writePages(updatedPages) {
  pages = updatedPages;
  if (dev) {
    // In dev, write back to disk so changes persist across restarts
    const fs = await import('fs');
    const path = await import('path');
    const pagesFilePath = path.resolve('src/lib/data/pages.json');
    fs.writeFileSync(pagesFilePath, JSON.stringify(updatedPages, null, 2));
  }
}

export async function GET() {
  try {
    const result = readPages();
    return json(result);
  } catch (err) {
    throw error(500, 'Internal server error');
  }
}

export async function POST({ request }) {
  try {
    const body = await request.json();
    const currentPages = readPages();

    const newId = currentPages.length > 0 ? Math.max(...currentPages.map(p => p.id)) + 1 : 1;
    const newPage = {
      id: newId,
      attributes: {
        title: body.title,
        slug: body.slug,
        content: body.content,
        componentIds: body.componentIds || [],
        blocks: body.blocks || [{ type: 'text', text: '' }],
        published: false,
        featuredImage: body.featuredImage || null
      }
    };

    currentPages.push(newPage);
    await writePages(currentPages);

    return json(newPage);
  } catch (err) {
    throw error(500, 'Internal server error');
  }
}

export async function PUT({ request }) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (typeof id !== 'number') {
      throw error(400, 'Invalid request body');
    }

    const currentPages = readPages();
    const pageIndex = currentPages.findIndex(p => p.id === id);

    if (pageIndex === -1) {
      throw error(404, 'Article not found');
    }

    const allowedFields = ['title', 'slug', 'content', 'componentIds', 'published', 'blocks', 'featuredImage'];
    for (const field of allowedFields) {
      if (updates.hasOwnProperty(field)) {
        currentPages[pageIndex].attributes[field] = updates[field];
      }
    }

    await writePages(currentPages);

    return json(currentPages[pageIndex]);
  } catch (err) {
    throw error(500, 'Internal server error');
  }
}

export async function DELETE({ url }) {
  try {
    const idParam = url.searchParams.get('id');
    if (!idParam) {
      throw error(400, 'Article ID required');
    }
    const id = parseInt(idParam);
    if (!id) {
      throw error(400, 'Invalid Article ID');
    }

    const currentPages = readPages();
    const filteredPages = currentPages.filter(p => p.id !== id);

    if (filteredPages.length === currentPages.length) {
      throw error(404, 'Article not found');
    }

    await writePages(filteredPages);
    return json({ success: true });
  } catch (err) {
    throw error(500, 'Internal server error');
  }
}
