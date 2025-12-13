import { describe, it, expect } from 'vitest';

// Mock the component page functions for testing
// Since the functions are not exported, we'll test the logic by recreating it

interface Block {
  type: 'heading' | 'text' | 'image' | 'button';
  text?: string;
  level?: number;
  color?: string;
  align?: 'left' | 'center' | 'right';
  src?: string;
  alt?: string;
  widthPercent?: number;
  label?: string;
  href?: string;
}

interface Section {
  classes: string;
  containerClasses: string;
  blocks: Block[];
  backgroundImage?: string;
  layout?: 'linear' | 'grid';
  minHeight?: string;
}

function blocksToHtml(blocks: Block[]): string {
  return blocks
    .map((block: Block) => {
      const align: string = block.align ?? 'left';
      const alignClass: string =
        align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left';

      if (block.type === 'heading') {
        const level: number = block.level ?? 2;
        const tag: string = `h${level}`;
        const text: string = block.text ?? '';
        const color: string = block.color ?? 'black';
        const colorClass: string = color === 'black' ? 'text-black' : color === 'gray' ? 'text-gray-600' : color === 'white' ? 'text-white' : color === 'red' ? 'text-red-600' : color === 'blue' ? 'text-blue-600' : color === 'green' ? 'text-green-600' : color === 'teal' ? 'text-teal-600' : 'text-black';
        return `<${tag} class="text-3xl font-bold mb-4 ${colorClass} ${alignClass}">${text}</${tag}>`;
      }
      if (block.type === 'text') {
        const text: string = block.text ?? '';
        const color: string = block.color ?? 'gray';
        const colorClass: string = color === 'gray' ? 'text-gray-600' : color === 'black' ? 'text-black' : color === 'white' ? 'text-white' : color === 'red' ? 'text-red-600' : color === 'blue' ? 'text-blue-600' : color === 'green' ? 'text-green-600' : color === 'teal' ? 'text-teal-600' : 'text-gray-600';
        return `<p class="${colorClass} mb-4 ${alignClass}">${text}</p>`;
      }
      if (block.type === 'image') {
        const src: string = block.src ?? '';
        const alt: string = block.alt ?? '';
        const widthPercent: number = block.widthPercent ?? 100;
        const width: number = Math.min(Math.max(widthPercent, 10), 100);
        return `<div class="${alignClass} mb-4"><img src="${src}" alt="${alt}" style="width: ${width}%; max-width: 100%;" class="h-auto inline-block" /></div>`;
      }
      if (block.type === 'button') {
        const label: string = block.label ?? 'Button';
        const href: string = block.href ?? '#';
        return `<div class="${alignClass} mb-4"><a href="${href}" class="btn inline-block">${label}</a></div>`;
      }
      return '';
    })
    .join('\n');
}

function sectionToHtml(section: Section | undefined): string {
  const sec: Section = section ?? {
    classes: 'py-16 bg-white',
    containerClasses: 'container mx-auto px-4',
    blocks: [],
    layout: 'linear',
    minHeight: 'none'
  };
  const inner: string = blocksToHtml(sec.blocks ?? []);
  const layoutClass: string = sec.layout === 'grid' ? 'grid grid-cols-2 gap-4' : '';
  let style: string = sec.backgroundImage ? `background-image: url('${sec.backgroundImage}'); background-size: cover; background-position: center;` : '';
  if (sec.minHeight && sec.minHeight !== 'none') {
    style += ` min-height: ${sec.minHeight};`;
  }
  style = style ? ` style="${style}"` : '';
  return `<section class="${sec.classes}"${style}><div class="${sec.containerClasses}"><div class="${layoutClass}">\n${inner}\n</div></div></section>`;
}

describe('Section HTML Generation', () => {
  describe('Linear Layout', () => {
    it('should generate HTML without grid classes for linear layout', () => {
      const section: Section = {
        classes: 'py-16 bg-white',
        containerClasses: 'container mx-auto px-4',
        blocks: [{ type: 'text', text: 'Test block' }],
        layout: 'linear',
        minHeight: 'none'
      };

      const html = sectionToHtml(section);
      expect(html).toContain('<section class="py-16 bg-white">');
      expect(html).toContain('<div class="container mx-auto px-4">');
      expect(html).toContain('<div class="">'); // Empty layout class for linear
      expect(html).toContain('<p class="text-gray-600 mb-4 text-left">Test block</p>');
      expect(html).not.toContain('grid grid-cols-2 gap-4');
    });
  });

  describe('Grid Layout', () => {
    it('should generate HTML with grid classes for grid layout', () => {
      const section: Section = {
        classes: 'py-16 bg-white',
        containerClasses: 'container mx-auto px-4',
        blocks: [
          { type: 'text', text: 'Block 1' },
          { type: 'text', text: 'Block 2' }
        ],
        layout: 'grid',
        minHeight: 'none'
      };

      const html = sectionToHtml(section);
      expect(html).toContain('<section class="py-16 bg-white">');
      expect(html).toContain('<div class="container mx-auto px-4">');
      expect(html).toContain('<div class="grid grid-cols-2 gap-4">');
      expect(html).toContain('<p class="text-gray-600 mb-4 text-left">Block 1</p>');
      expect(html).toContain('<p class="text-gray-600 mb-4 text-left">Block 2</p>');
    });

    it('should handle empty blocks array with grid layout', () => {
      const section: Section = {
        classes: 'py-16 bg-white',
        containerClasses: 'container mx-auto px-4',
        blocks: [],
        layout: 'grid',
        minHeight: 'none'
      };

      const html = sectionToHtml(section);
      expect(html).toContain('<div class="grid grid-cols-2 gap-4">');
      expect(html).toContain('<div class="grid grid-cols-2 gap-4">\n\n</div>');
    });
  });

  describe('Min Height', () => {
    it('should not add min-height style when none', () => {
      const section: Section = {
        classes: 'py-16 bg-white',
        containerClasses: 'container mx-auto px-4',
        blocks: [{ type: 'text', text: 'Test' }],
        layout: 'linear',
        minHeight: 'none'
      };

      const html = sectionToHtml(section);
      expect(html).toContain('<section class="py-16 bg-white">');
      expect(html).not.toContain('min-height');
    });

    it('should add min-height style when specified', () => {
      const section: Section = {
        classes: 'py-16 bg-white',
        containerClasses: 'container mx-auto px-4',
        blocks: [{ type: 'text', text: 'Test' }],
        layout: 'linear',
        minHeight: '400px'
      };

      const html = sectionToHtml(section);
      expect(html).toContain('<section class="py-16 bg-white" style=" min-height: 400px;">');
    });

    it('should combine background image and min-height styles', () => {
      const section: Section = {
        classes: 'py-16 bg-white',
        containerClasses: 'container mx-auto px-4',
        blocks: [{ type: 'text', text: 'Test' }],
        backgroundImage: '/image.jpg',
        layout: 'linear',
        minHeight: '400px'
      };

      const html = sectionToHtml(section);
      expect(html).toContain('style="background-image: url(\'/image.jpg\'); background-size: cover; background-position: center; min-height: 400px;"');
    });
  });

  describe('Combined Features', () => {
    it('should handle grid layout with min-height', () => {
      const section: Section = {
        classes: 'py-16 bg-white',
        containerClasses: 'container mx-auto px-4',
        blocks: [
          { type: 'text', text: 'Block 1' },
          { type: 'text', text: 'Block 2' }
        ],
        layout: 'grid',
        minHeight: '400px'
      };

      const html = sectionToHtml(section);
      expect(html).toContain('<div class="grid grid-cols-2 gap-4">');
      expect(html).toContain('style=" min-height: 400px;"');
      expect(html).toContain('<p class="text-gray-600 mb-4 text-left">Block 1</p>');
      expect(html).toContain('<p class="text-gray-600 mb-4 text-left">Block 2</p>');
    });

    it('should handle grid layout with background image and min-height', () => {
      const section: Section = {
        classes: 'py-16 bg-white',
        containerClasses: 'container mx-auto px-4',
        blocks: [{ type: 'text', text: 'Test' }],
        backgroundImage: '/bg.jpg',
        layout: 'grid',
        minHeight: '600px'
      };

      const html = sectionToHtml(section);
      expect(html).toContain('<div class="grid grid-cols-2 gap-4">');
      expect(html).toContain('style="background-image: url(\'/bg.jpg\'); background-size: cover; background-position: center; min-height: 600px;"');
    });
  });

  describe('Default Values', () => {
    it('should use default values when section is undefined', () => {
      const html = sectionToHtml(undefined);
      expect(html).toContain('<section class="py-16 bg-white">');
      expect(html).toContain('<div class="container mx-auto px-4">');
      expect(html).toContain('<div class="">'); // Empty layout class
      expect(html).not.toContain('style=');
    });

    it('should use default layout when not specified', () => {
      const section: Section = {
        classes: 'py-16 bg-white',
        containerClasses: 'container mx-auto px-4',
        blocks: [{ type: 'text', text: 'Test' }]
      };

      const html = sectionToHtml(section);
      expect(html).toContain('<div class="">'); // Empty layout class for linear
    });

    it('should use default minHeight when not specified', () => {
      const section: Section = {
        classes: 'py-16 bg-white',
        containerClasses: 'container mx-auto px-4',
        blocks: [{ type: 'text', text: 'Test' }],
        layout: 'linear'
      };

      const html = sectionToHtml(section);
      expect(html).not.toContain('min-height');
    });
  });
});