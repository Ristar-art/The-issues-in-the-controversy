import { error } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pagesFilePath = path.join(__dirname, '../../../../lib/data/pages.json');
const componentsFilePath = path.join(__dirname, '../../../../lib/data/components.json');

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

function blocksToHtml(blocks) {
  if (!blocks || !Array.isArray(blocks)) return '';
  return blocks.map(block => {
    switch (block.type) {
      case 'heading': {
        const level = block.level || 2;
        const tag = `h${level}`;
        return `<${tag}>${block.text || ''}</${tag}>`;
      }
      case 'text':
        return block.text || '';
      case 'image':
        if (block.src) {
          const width = block.widthPercent ? `width: ${block.widthPercent}%` : '';
          return `<figure style="${width}"><img src="${block.src}" alt="${block.alt || ''}" style="max-width:100%" /></figure>`;
        }
        return '';
      case 'button':
        if (block.href) {
          return `<a href="${block.href}" class="button">${block.label || 'Button'}</a>`;
        }
        return '';
      case 'layout':
        if (block.blocks) {
          const cols = block.columns || 2;
          const inner = blocksToHtml(block.blocks);
          return `<div style="display:grid;grid-template-columns:repeat(${cols},1fr);gap:1rem">${inner}</div>`;
        }
        return '';
      default:
        return block.text || '';
    }
  }).join('\n');
}

export async function load({ params }) {
  const pages = readPages();
  const page = pages.find(p => p.attributes.slug === params.slug);

  if (!page) {
    throw error(404, 'Article not found');
  }

  let content = page.attributes.content;

  // If content is empty, build it from blocks
  if (!content && page.attributes.blocks && page.attributes.blocks.length > 0) {
    content = blocksToHtml(page.attributes.blocks);
  }

  // If componentIds exist, assemble content from components instead
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
