// @ts-nocheck
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
	sanitizeQuillHtml,
	blocksToHtml
} from './blocks-to-html';

describe('blocks-to-html', () => {
	describe('sanitizeQuillHtml', () => {
		it('should return empty string for null input', () => {
			expect(sanitizeQuillHtml(null)).toBe('');
		});

		it('should return empty string for undefined input', () => {
			expect(sanitizeQuillHtml(undefined)).toBe('');
		});

		it('should return empty string for empty string input', () => {
			expect(sanitizeQuillHtml('')).toBe('');
		});

		it('should remove ql-ui spans', () => {
			const input = '<p>Hello</p><span class="ql-ui"></span><p>World</p>';
			expect(sanitizeQuillHtml(input)).toBe('<p>Hello</p><p>World</p>');
		});

		it('should remove ql-ui spans with attributes', () => {
			const input = '<span class="ql-ui" data-type="button"></span>';
			expect(sanitizeQuillHtml(input)).toBe('');
		});

		it('should remove contenteditable attributes', () => {
			const input = '<div contenteditable="false">Content</div>';
			expect(sanitizeQuillHtml(input)).toBe('<div>Content</div>');
		});

		it('should convert ordered lists without data-list', () => {
			const input = '<ol><li>Item 1</li><li>Item 2</li></ol>';
			const result = sanitizeQuillHtml(input);
			expect(result).toContain('<ol>');
			expect(result).toContain('<li>Item 1</li>');
			expect(result).toContain('<li>Item 2</li>');
		});

		it('should convert bullet lists', () => {
			const input = '<ol><li data-list="bullet">Item 1</li><li data-list="bullet">Item 2</li></ol>';
			const result = sanitizeQuillHtml(input);
			expect(result).toContain('<ul>');
			expect(result).toContain('<li>Item 1</li>');
		});

		it('should convert ordered lists', () => {
			const input = '<ol><li data-list="ordered">Item 1</li><li data-list="ordered">Item 2</li></ol>';
			const result = sanitizeQuillHtml(input);
			expect(result).toContain('<ol>');
		});

		it('should convert code blocks', () => {
			const input = '<div class="ql-code-block-container"><div class="ql-code-block">const x = 1;</div><div class="ql-code-block">const y = 2;</div></div>';
			const result = sanitizeQuillHtml(input);
			expect(result).toContain('<pre><code>');
			expect(result).toContain('const x = 1;');
			expect(result).toContain('const y = 2;');
			expect(result).toContain('</code></pre>');
		});

		it('should handle mixed content', () => {
			const input = '<p>Text</p><ol><li>Item</li></ol><div class="ql-code-block-container"><div class="ql-code-block">code</div></div>';
			const result = sanitizeQuillHtml(input);
			expect(result).toContain('<p>Text</p>');
			expect(result).toContain('<ol>');
			expect(result).toContain('<pre><code>');
		});

		it('should preserve list attributes', () => {
			const input = '<ol><li class="custom-class">Item</li></ol>';
			const result = sanitizeQuillHtml(input);
			expect(result).toContain('class="custom-class"');
		});
	});

	describe('blocksToHtml', () => {
		it('should return empty string for null blocks', () => {
			expect(blocksToHtml(null)).toBe('');
		});

		it('should return empty string for undefined blocks', () => {
			expect(blocksToHtml(undefined)).toBe('');
		});

		it('should return empty string for non-array blocks', () => {
			expect(blocksToHtml('string' as any)).toBe('');
		});

		it('should return empty string for empty array', () => {
			expect(blocksToHtml([], [])).toBe('');
		});

		it('should render heading block', () => {
			const blocks = [{ type: 'heading', text: 'Title', level: 1 }];
			const result = blocksToHtml(blocks, []);
			expect(result).toContain('<h1>Title</h1>');
		});

		it('should default heading to level 2', () => {
			const blocks = [{ type: 'heading', text: 'Title' }];
			const result = blocksToHtml(blocks, []);
			expect(result).toContain('<h2>Title</h2>');
		});

		it('should render text block', () => {
			const blocks = [{ type: 'text', text: '<p>Hello</p>' }];
			const result = blocksToHtml(blocks, []);
			expect(result).toContain('<p>Hello</p>');
		});

		it('should handle empty text block', () => {
			const blocks = [{ type: 'text', text: '' }];
			const result = blocksToHtml(blocks, []);
			expect(result).toBe('');
		});

		it('should render image block with src', () => {
			const blocks = [{ type: 'image', src: '/image.jpg', alt: 'Alt text' }];
			const result = blocksToHtml(blocks, []);
			expect(result).toContain('<img src="/image.jpg"');
			expect(result).toContain('alt="Alt text"');
		});

		it('should render image block with width percent', () => {
			const blocks = [{ type: 'image', src: '/image.jpg', alt: '', widthPercent: 50 }];
			const result = blocksToHtml(blocks, []);
			expect(result).toContain('width: 50%');
			expect(result).toContain('<img src="/image.jpg"');
		});

		it('should not render image block without src', () => {
			const blocks = [{ type: 'image' }];
			const result = blocksToHtml(blocks, []);
			expect(result).toBe('');
		});

		it('should render button block with href', () => {
			const blocks = [{ type: 'button', href: '/page', label: 'Click Me' }];
			const result = blocksToHtml(blocks, []);
			expect(result).toContain('<a href="/page"');
			expect(result).toContain('class="button"');
			expect(result).toContain('Click Me</a>');
		});

		it('should use default button label', () => {
			const blocks = [{ type: 'button', href: '/page' }];
			const result = blocksToHtml(blocks, []);
			expect(result).toContain('>Button</a>');
		});

		it('should not render button block without href', () => {
			const blocks = [{ type: 'button' }];
			const result = blocksToHtml(blocks, []);
			expect(result).toBe('');
		});

		it('should render component block', () => {
			const components = [{ id: 'comp-1', html: '<div>Component</div>' }];
			const blocks = [{ type: 'component', componentId: 'comp-1' }];
			const result = blocksToHtml(blocks, components);
			expect(result).toContain('<div>Component</div>');
		});

		it('should not render component if not found', () => {
			const components = [{ id: 'comp-1', html: '<div>Component</div>' }];
			const blocks = [{ type: 'component', componentId: 'comp-2' }];
			const result = blocksToHtml(blocks, components);
			expect(result).toBe('');
		});

		it('should not render component without componentId', () => {
			const components = [{ id: 'comp-1', html: '<div>Component</div>' }];
			const blocks = [{ type: 'component' }];
			const result = blocksToHtml(blocks, components);
			expect(result).toBe('');
		});

		it('should not render component without components array', () => {
			const blocks = [{ type: 'component', componentId: 'comp-1' }];
			const result = blocksToHtml(blocks, undefined);
			expect(result).toBe('');
		});

		it('should render layout block with nested blocks', () => {
			const innerBlocks = [{ type: 'heading', text: 'Inner', level: 3 }];
			const blocks = [{ type: 'layout', blocks: innerBlocks, columns: 3 }];
			const result = blocksToHtml(blocks, []);
			expect(result).toContain('grid-template-columns:repeat(3,1fr)');
			expect(result).toContain('<h3>Inner</h3>');
		});

		it('should default layout columns to 2', () => {
			const blocks = [{ type: 'layout', blocks: [] }];
			const result = blocksToHtml(blocks, []);
			expect(result).toContain('grid-template-columns:repeat(2,1fr)');
		});

		it('should not render layout block without blocks', () => {
			const blocks = [{ type: 'layout' }];
			const result = blocksToHtml(blocks, []);
			expect(result).toBe('');
		});

		it('should render unknown block type as text', () => {
			const blocks = [{ type: 'unknown', text: '<p>Content</p>' }];
			const result = blocksToHtml(blocks, []);
			expect(result).toContain('<p>Content</p>');
		});

		it('should join multiple blocks with newlines', () => {
			const blocks = [
				{ type: 'heading', text: 'Title', level: 1 },
				{ type: 'text', text: 'Content' }
			];
			const result = blocksToHtml(blocks, []);
			expect(result).toContain('\n');
		});

		it('should handle nested layout blocks', () => {
			const nestedBlocks = [
				{ type: 'layout', blocks: [{ type: 'text', text: 'Nested' }], columns: 2 }
			];
			const blocks = [{ type: 'layout', blocks: nestedBlocks, columns: 2 }];
			const result = blocksToHtml(blocks, []);
			expect(result).toMatch(/<div style="display:grid.*">[\s\S]*<div style="display:grid.*">/);
		});
	});
});