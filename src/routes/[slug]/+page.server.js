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

/**
 * Sanitize Quill-specific HTML into standard HTML.
 * Quill produces list items with `data-list` attributes and invisible
 * `<span class="ql-ui">` marker elements that only render with Quill's CSS.
 */
function sanitizeQuillHtml(html) {
  if (!html) return '';
  // Remove Quill UI marker spans
  html = html.replace(/<span\s+class="ql-ui"[^>]*><\/span>/g, '');
  html = html.replace(/\s+contenteditable="false"/g, '');

  // Convert Quill lists: Quill wraps all list items in <ol> and uses
  // data-list="bullet" or data-list="ordered" on each <li> to indicate
  // the list type. We need to re-wrap bullet items in <ul> instead.
  html = html.replace(/<ol>([\s\S]*?)<\/ol>/g, (_, inner) => {
    const liRegex = /<li([^>]*)>([\s\S]*?)<\/li>/g;
    const items = [];
    let m;
    while ((m = liRegex.exec(inner)) !== null) {
      const attrs = m[1];
      const content = m[2];
      const typeMatch = attrs.match(/data-list="([^"]*)"/);
      const type = typeMatch ? typeMatch[1] : 'ordered';
      // Strip the data-list attribute from the <li>
      const cleanAttrs = attrs.replace(/\s*data-list="[^"]*"/, '');
      items.push({ type, html: `<li${cleanAttrs}>${content}</li>` });
    }

    // Group consecutive items of the same type into <ul> or <ol>
    let result = '';
    let i = 0;
    while (i < items.length) {
      const currentType = items[i].type;
      const tag = currentType === 'bullet' ? 'ul' : 'ol';
      result += `<${tag}>`;
      while (i < items.length && items[i].type === currentType) {
        result += items[i].html;
        i++;
      }
      result += `</${tag}>`;
    }
    return result;
  });

  // Handle code blocks: extract all ql-code-block lines from the container
  html = html.replace(
    /<div\s+class="ql-code-block-container"[^>]*>([\s\S]*?)<\/div>(?=\s*(?:<|$))/g,
    (fullMatch) => {
      const lines = [];
      const lineRegex = /<div\s+class="ql-code-block"[^>]*>([\s\S]*?)<\/div>/g;
      let match;
      while ((match = lineRegex.exec(fullMatch)) !== null) {
        lines.push(match[1]);
      }
      return `<pre><code>${lines.join('\n')}</code></pre>`;
    }
  );
  return html;
}

function blocksToHtml(blocks, components) {
  if (!blocks || !Array.isArray(blocks)) return '';
  return blocks.map(block => {
    switch (block.type) {
      case 'heading': {
        const level = block.level || 2;
        const tag = `h${level}`;
        return `<${tag}>${block.text || ''}</${tag}>`;
      }
      case 'text':
        return sanitizeQuillHtml(block.text || '');
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
      case 'component': {
        if (block.componentId && components) {
          const component = components.find(c => c.id === block.componentId);
          if (component) {
            return component.html;
          }
        }
        return '';
      }
      case 'layout':
        if (block.blocks) {
          const cols = block.columns || 2;
          const inner = blocksToHtml(block.blocks, components);
          return `<div style="display:grid;grid-template-columns:repeat(${cols},1fr);gap:1rem">${inner}</div>`;
        }
        return '';
      default:
        return sanitizeQuillHtml(block.text || '');
    }
  }).join('\n');
}

export async function load({ params }) {
  const pages = readPages();
  const page = pages.find(p => p.attributes.slug === params.slug);

  if (!page || !page.attributes.published) {
    throw error(404, 'Article not found');
  }

  let content = page.attributes.content;
  const components = readComponents();

  // If content is empty, build it from blocks
  if (!content && page.attributes.blocks && page.attributes.blocks.length > 0) {
    content = blocksToHtml(page.attributes.blocks, components);
  }

  // If componentIds exist, assemble content from components instead
  if (page.attributes.componentIds && page.attributes.componentIds.length > 0) {
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