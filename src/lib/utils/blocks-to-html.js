/**
 * Sanitize Quill-specific HTML into standard HTML.
 */
export function sanitizeQuillHtml(html) {
  if (!html) return '';
  html = html.replace(/<span\s+class="ql-ui"[^>]*><\/span>/g, '');
  html = html.replace(/\s+contenteditable="false"/g, '');

  html = html.replace(/<ol>([\s\S]*?)<\/ol>/g, (_, inner) => {
    const liRegex = /<li([^>]*)>([\s\S]*?)<\/li>/g;
    const items = [];
    let m;
    while ((m = liRegex.exec(inner)) !== null) {
      const attrs = m[1];
      const content = m[2];
      const typeMatch = attrs.match(/data-list="([^"]*)"/);
      const type = typeMatch ? typeMatch[1] : 'ordered';
      const cleanAttrs = attrs.replace(/\s*data-list="[^"]*"/, '');
      items.push({ type, html: `<li${cleanAttrs}>${content}</li>` });
    }

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

/**
 * Convert a blocks array into HTML, resolving component references.
 */
export function blocksToHtml(blocks, components) {
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
