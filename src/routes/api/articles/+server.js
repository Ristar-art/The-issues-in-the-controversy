import { json, error } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pagesFilePath = path.join(__dirname, '../../../lib/data/pages.json');

function readPages() {
  try {
    const data = fs.readFileSync(pagesFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function writePages(pages) {
  fs.writeFileSync(pagesFilePath, JSON.stringify(pages, null, 2));
}

export async function GET() {
  try {
    const pages = readPages();
    return json(pages);
  } catch (err) {
    throw error(500, 'Internal server error');
  }
}

export async function POST({ request }) {
  try {
    const body = await request.json();
    const pages = readPages();

    const newId = pages.length > 0 ? Math.max(...pages.map(p => p.id)) + 1 : 1;
    const newPage = {
      id: newId,
      attributes: {
        title: body.title,
        slug: body.slug,
        content: body.content,
        componentIds: body.componentIds || []
      }
    };

    pages.push(newPage);
    writePages(pages);

    return json(newPage);
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

    const pages = readPages();
    const filteredPages = pages.filter(p => p.id !== id);

    if (filteredPages.length === pages.length) {
      throw error(404, 'Article not found');
    }

    writePages(filteredPages);
    return json({ success: true });
  } catch (err) {
    throw error(500, 'Internal server error');
  }
}