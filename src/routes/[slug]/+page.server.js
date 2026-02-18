import { error } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pagesFilePath = path.join(__dirname, '../../lib/data/pages.json');
const componentsFilePath = path.join(__dirname, '../../lib/data/components.json');

function readPages() {
  try {
    const data = fs.readFileSync(pagesFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function readComponents() {
  try {
    const data = fs.readFileSync(componentsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

export async function load({ params }) {
  const pages = readPages();
  const page = pages.find(p => p.attributes.slug === params.slug);

  if (!page || !page.attributes.published) {
    throw error(404, 'Article not found');
  }

  // If the page has componentIds, assemble content from components
  let content = page.attributes.content;
  if (page.attributes.componentIds && page.attributes.componentIds.length > 0) {
    const components = readComponents();
    const pageComponents = page.attributes.componentIds.map(id => components.find(c => c.id === id)).filter(Boolean);
    content = pageComponents.map(c => c.html).join('');
  }

  return {
    article: {
      id: page.id,
      ...page.attributes,
      content
    }
  };
}