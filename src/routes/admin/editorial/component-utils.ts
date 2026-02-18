import type { Block, Section, Component, SectionSettingsData, BlockType } from './types';

/**
 * Utility functions for component management
 */

// Block types available for adding to sections
export const BLOCK_TYPES: BlockType[] = [
  { type: 'heading', label: 'Heading' },
  { type: 'text', label: 'Text' },
  { type: 'image', label: 'Image' },
  { type: 'button', label: 'Button' },
  { type: 'layout', label: 'Layout Container' }
];

// Default section configuration
export const DEFAULT_SECTION: Section = {
  classes: 'py-16 bg-white',
  containerClasses: 'container mx-auto px-4',
  blocks: [],
  layout: 'linear' as const,
  columns: 2,
  minHeight: 'none'
};

// Default component configuration
export const DEFAULT_COMPONENT: Omit<Component, 'id' | 'name'> = {
  category: 'custom',
  html: ''
};

/**
 * Creates a new component with default settings
 */
export function createComponent(id: string, name: string, category: Component['category'] = 'custom'): Component {
  return {
    id,
    name,
    html: '',
    category
  };
}

/**
 * Migrates components from old format (blocks directly on component) to new format (blocks in section)
 */
export function migrateComponent(component: Component): Component {
  if (component.section) {
    return component;
  }

  // Components no longer have sections - just return as-is with category
  return {
    ...component,
    category: component.category || 'custom'
  };
}

/**
 * Updates a specific field of a component
 */
export function updateComponentField(
  components: Component[],
  componentId: string,
  field: string,
  value: any
): Component[] {
  return components.map(component => {
    if (component.id !== componentId) return component;

    // Check for duplicate ID when updating the id field
    if (field === 'id' && components.some((c, i) => c.id === value && components.findIndex(c => c.id === componentId) !== i)) {
      alert('Component ID already exists. Please choose a unique ID.');
      return component;
    }

    return { ...component, [field]: value };
  });
}

/**
 * Updates the section configuration of a component
 */
export function updateComponentSection(
  components: Component[],
  componentId: string,
  sectionUpdate: Partial<Section>
): Component[] {
  return components.map(component => {
    if (component.id !== componentId) return component;

    const base: Section = component.section ?? DEFAULT_SECTION;
    // Always preserve existing blocks unless explicitly overridden
    const existingBlocks: Block[] = base.blocks ?? [];
    const next: Section = { ...base, ...sectionUpdate, blocks: sectionUpdate.blocks !== undefined ? sectionUpdate.blocks : existingBlocks };

    return { ...component, section: next };
  });
}

/**
 * Extracts user-friendly section settings from the raw section object
 */
export function getSectionSettings(section: Section | undefined): SectionSettingsData {
  const sec: Section = section ?? DEFAULT_SECTION;
  const classes: string = sec.classes ?? 'py-16 bg-white';
  const containerClasses: string = sec.containerClasses ?? 'container mx-auto px-4';

  // Determine background type from CSS classes or background image
  let background: string = 'white';
  if (sec.backgroundImage !== undefined) background = 'image';
  else if (classes.includes('bg-gray-50')) background = 'gray';
  else if (classes.includes('bg-teal-600')) background = 'teal';

  // Determine padding size from CSS classes
  let padding: string = 'large';
  if (classes.includes('py-8')) padding = 'normal';
  else if (classes.includes('py-16')) padding = 'large';

  // Determine width constraint from container classes
  let width: string = 'boxed';
  if (!containerClasses.includes('container')) width = 'full';

  return {
    background,
    padding,
    width,
    backgroundImage: sec.backgroundImage ?? '',
    layout: sec.layout ?? 'linear',
    columns: sec.columns ?? 2,
    minHeight: sec.minHeight ?? 'none'
  };
}

/**
 * Updates the section styling based on simplified UI settings
 */
export function updateSectionStyle(
  components: Component[],
  componentId: string,
  settingsUpdate: Partial<SectionSettingsData>
): Component[] {
  const component = components.find(c => c.id === componentId);
  if (!component) return components;

  const current: SectionSettingsData = getSectionSettings(component.section);
  const next: SectionSettingsData = { ...current, ...settingsUpdate };

  // Convert padding setting to CSS class
  const paddingClass: string = next.padding === 'normal' ? 'py-8' : 'py-16';

  // Convert background setting to CSS classes
  let bgClass: string = '';
  if (next.background === 'image') {
    bgClass = '';
  } else {
    bgClass =
      next.background === 'gray'
        ? 'bg-gray-50'
        : next.background === 'teal'
        ? 'bg-teal-600 text-white'
        : 'bg-white';
  }

  const classes: string = `${paddingClass} ${bgClass}`.trim();
  const containerClasses: string =
    next.width === 'full' ? 'px-4' : 'container mx-auto px-4';

  // Preserve existing blocks when updating section styles
  const existingBlocks: Block[] = component.section?.blocks ?? [];
  const backgroundImage: string | undefined =
    next.background === 'image'
      ? next.backgroundImage ?? ''
      : undefined;

  return updateComponentSection(components, componentId, {
    classes,
    containerClasses,
    blocks: existingBlocks,
    backgroundImage,
    layout: next.layout as Section['layout'],
    columns: next.columns,
    minHeight: next.minHeight
  });
}

/**
 * Parses simple markdown to HTML
 */
export function parseMarkdown(text: string): string {
  // Escape HTML first
  let html = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // Highlight: ==text==(color) - Process before other formatting
  html = html.replace(/==([^=]+)==\(([^)]+)\)/g, '<mark style="background-color: $2">$1</mark>');
  html = html.replace(/==([^=]+)==/g, '<mark style="background-color: #FFFF00">$1</mark>');

  // Links: [text](url)
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Bold: **text**
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

  // Italic: *text*
  html = html.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em>$1</em>');

  // Handle lists
  const lines = html.split('\n');
  let inUl = false;
  let inOl = false;
  let result: string[] = [];
  let hasLists = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('- ')) {
      hasLists = true;
      if (!inUl) {
        result.push('<ul>');
        inUl = true;
      }
      if (inOl) {
        result.push('</ol>');
        inOl = false;
      }
      result.push(`<li>${trimmed.substring(2)}</li>`);
    } else if (/^\d+\.\s/.test(trimmed)) {
      hasLists = true;
      if (!inOl) {
        result.push('<ol>');
        inOl = true;
      }
      if (inUl) {
        result.push('</ul>');
        inUl = false;
      }
      const content = trimmed.replace(/^\d+\.\s/, '');
      result.push(`<li>${content}</li>`);
    } else {
      if (inUl) {
        result.push('</ul>');
        inUl = false;
      }
      if (inOl) {
        result.push('</ol>');
        inOl = false;
      }
      if (trimmed) {
        result.push(trimmed);
      }
    }
  }
  if (inUl) result.push('</ul>');
  if (inOl) result.push('</ol>');

  // If no lists, just return the processed text; otherwise join with line breaks
  if (!hasLists && lines.length === 1) {
    return result.join('');
  } else {
    return result.join('<br>');
  }
}

/**
 * Converts an array of blocks to HTML string
 */
export function blocksToHtml(blocks: Block[]): string {
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
        let styleAttr = '';
        let colorClass: string;

        if (color.startsWith('#')) {
          // Handle hex colors with inline style
          styleAttr = `style="color: ${color}"`;
          colorClass = '';
        } else {
          // Handle named colors with Tailwind classes
          colorClass = color === 'black' ? 'text-black' : color === 'gray' ? 'text-gray-600' : color === 'white' ? 'text-white' : color === 'red' ? 'text-red-600' : color === 'blue' ? 'text-blue-600' : color === 'green' ? 'text-green-600' : color === 'teal' ? 'text-teal-600' : 'text-black';
        }

        return `<${tag} class="text-3xl font-bold mb-4 ${colorClass} ${alignClass}" ${styleAttr}>${text}</${tag}>`;
      }
      if (block.type === 'text') {
        const text: string = block.text ?? '';
        const color: string = block.color ?? 'gray';
        let styleAttr = '';
        let colorClass: string;

        if (color.startsWith('#')) {
          // Handle hex colors with inline style
          styleAttr = `style="color: ${color}"`;
          colorClass = '';
        } else {
          // Handle named colors with Tailwind classes
          colorClass = color === 'gray' ? 'text-gray-600' : color === 'black' ? 'text-black' : color === 'white' ? 'text-white' : color === 'red' ? 'text-red-600' : color === 'blue' ? 'text-blue-600' : color === 'green' ? 'text-green-600' : color === 'teal' ? 'text-teal-600' : 'text-gray-600';
        }

        const parsedText = parseMarkdown(text);
        return `<div class="${colorClass} mb-4 ${alignClass}" ${styleAttr}>${parsedText}</div>`;
      }
      if (block.type === 'image') {
        const src: string = block.src ?? '';
        const alt: string = block.alt ?? '';
        const widthPercent: number = block.widthPercent ?? 100;
        const width: number = Math.min(Math.max(widthPercent, 10), 100); // clamp 10–100
        return `<div class="${alignClass} mb-4"><img src="${src}" alt="${alt}" style="width: ${width}%; max-width: 100%;" class="h-auto inline-block" /></div>`;
      }
      if (block.type === 'button') {
        const label: string = block.label ?? 'Button';
        const href: string = block.href ?? '#';
        return `<div class="${alignClass} mb-4"><a href="${href}" class="btn inline-block">${label}</a></div>`;
      }
      if (block.type === 'layout') {
        const layout: string = block.layout ?? 'linear';
        const columns: number = block.columns ?? 2;
        const nestedBlocks: Block[] = block.blocks ?? [];
        let layoutClass: string = '';
        if (layout === 'grid') {
          // Responsive grid classes based on number of columns
          if (columns === 1) {
            layoutClass = 'grid grid-cols-1 gap-4';
          } else if (columns === 2) {
            layoutClass = 'grid grid-cols-1 md:grid-cols-2 gap-4';
          } else if (columns === 3) {
            layoutClass = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4';
          } else if (columns === 4) {
            layoutClass = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4';
          }
        }
        const inner: string = blocksToHtml(nestedBlocks);
        return `<div class="${layoutClass} mb-4">\n${inner}\n</div>`;
      }
      return '';
    })
    .join('\n');
}

/**
 * Converts a section object into complete HTML string representation
 */
export function sectionToHtml(section: Section | undefined): string {
  const sec: Section = section ?? DEFAULT_SECTION;
  const inner: string = blocksToHtml(sec.blocks ?? []);
  let layoutClass: string = '';
  if (sec.layout === 'grid') {
    if (sec.columns === 1) {
      layoutClass = 'grid grid-cols-1 gap-4';
    } else if (sec.columns === 2) {
      layoutClass = 'grid grid-cols-1 md:grid-cols-2 gap-4';
    } else if (sec.columns === 3) {
      layoutClass = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4';
    } else if (sec.columns === 4) {
      layoutClass = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4';
    } else {
      layoutClass = 'grid grid-cols-1 md:grid-cols-2 gap-4';
    }
  }
  let style: string = sec.backgroundImage ? `background-image: url('${sec.backgroundImage}'); background-size: cover; background-position: center;` : '';
  if (sec.minHeight && sec.minHeight !== 'none') {
    style += ` min-height: ${sec.minHeight};`;
  }
  style = style ? ` style="${style}"` : '';
  return `<section class="${sec.classes}"${style}><div class="${sec.containerClasses}"><div class="${layoutClass}">\n${inner}\n</div></div></section>`;
}

/**
 * Regenerates the HTML representation of a component's section
 */
export function applyBlocksToHtml(component: Component): Component {
  const html: string = sectionToHtml(component.section);
  return { ...component, html };
}

/**
 * Block manipulation functions
 */
export function addBlockToSection(components: Component[], componentId: string): Component[] {
  const component = components.find(c => c.id === componentId);
  if (!component) return components;

  const section: Section = component.section ?? DEFAULT_SECTION;
  const current: Block[] = section.blocks ?? [];
  const newBlock: Block = { type: 'text', text: 'New block' };
  if (newBlock.type === 'layout') {
    newBlock.layout = 'linear';
    newBlock.blocks = [];
  }
  const newBlocks: Block[] = [...current, newBlock];

  return updateComponentSection(components, componentId, { blocks: newBlocks });
}

export function updateBlockInSection(
  components: Component[],
  componentId: string,
  index: number,
  partial: Partial<Block>
): Component[] {
  const component = components.find(c => c.id === componentId);
  if (!component) return components;

  const section: Section = component.section ?? DEFAULT_SECTION;
  const current: Block[] = section.blocks ?? [];
  if (index < 0 || index >= current.length) return components;

  const newBlocks: Block[] = current.map((block: Block, i: number) =>
    i === index ? { ...block, ...partial } : block
  );

  return updateComponentSection(components, componentId, { blocks: newBlocks });
}

export function deleteBlockFromSection(components: Component[], componentId: string, index: number): Component[] {
  const component = components.find(c => c.id === componentId);
  if (!component) return components;

  const section: Section = component.section ?? DEFAULT_SECTION;
  const current: Block[] = section.blocks ?? [];
  if (index < 0 || index >= current.length) return components;

  const newBlocks: Block[] = current.filter((_: Block, i: number) => i !== index);

  return updateComponentSection(components, componentId, { blocks: newBlocks });
}

export function moveBlockInSection(
  components: Component[],
  componentId: string,
  fromIndex: number,
  toIndex: number
): Component[] {
  const component = components.find(c => c.id === componentId);
  if (!component) return components;

  const section: Section = component.section ?? DEFAULT_SECTION;
  const current: Block[] = section.blocks ?? [];
  if (fromIndex < 0 || fromIndex >= current.length || toIndex < 0 || toIndex >= current.length) return components;

  const newBlocks: Block[] = [...current];
  const [movedBlock] = newBlocks.splice(fromIndex, 1);
  newBlocks.splice(toIndex, 0, movedBlock);

  return updateComponentSection(components, componentId, { blocks: newBlocks });
}

/**
 * Nested block manipulation functions
 */
export function addNestedBlockToLayout(
  components: Component[],
  componentId: string,
  parentIndex: number,
  blockType: Block['type'] = 'text'
): Component[] {
  const component = components.find(c => c.id === componentId);
  if (!component) return components;

  const section: Section = component.section ?? DEFAULT_SECTION;
  const current: Block[] = section.blocks ?? [];
  if (parentIndex < 0 || parentIndex >= current.length || current[parentIndex].type !== 'layout') return components;

  const parentBlock: Block = current[parentIndex];
  const nestedBlocks: Block[] = parentBlock.blocks ?? [];
  const newNestedBlock: Block = { type: blockType, text: 'New nested block' };
  if (newNestedBlock.type === 'layout') {
    newNestedBlock.layout = 'linear';
    newNestedBlock.blocks = [];
  }

  const updatedParent: Block = { ...parentBlock, blocks: [...nestedBlocks, newNestedBlock] };
  const newBlocks: Block[] = current.map((block: Block, i: number) =>
    i === parentIndex ? updatedParent : block
  );

  return updateComponentSection(components, componentId, { blocks: newBlocks });
}

export function updateNestedBlockInLayout(
  components: Component[],
  componentId: string,
  parentIndex: number,
  nestedIndex: number,
  partial: Partial<Block>
): Component[] {
  const component = components.find(c => c.id === componentId);
  if (!component) return components;

  const section: Section = component.section ?? DEFAULT_SECTION;
  const current: Block[] = section.blocks ?? [];
  if (parentIndex < 0 || parentIndex >= current.length || current[parentIndex].type !== 'layout') return components;

  const parentBlock: Block = current[parentIndex];
  const nestedBlocks: Block[] = parentBlock.blocks ?? [];
  if (nestedIndex < 0 || nestedIndex >= nestedBlocks.length) return components;

  const updatedNestedBlocks: Block[] = nestedBlocks.map((block: Block, i: number) =>
    i === nestedIndex ? { ...block, ...partial } : block
  );
  const updatedParent: Block = { ...parentBlock, blocks: updatedNestedBlocks };
  const newBlocks: Block[] = current.map((block: Block, i: number) =>
    i === parentIndex ? updatedParent : block
  );

  return updateComponentSection(components, componentId, { blocks: newBlocks });
}

export function deleteNestedBlockFromLayout(
  components: Component[],
  componentId: string,
  parentIndex: number,
  nestedIndex: number
): Component[] {
  const component = components.find(c => c.id === componentId);
  if (!component) return components;

  const section: Section = component.section ?? DEFAULT_SECTION;
  const current: Block[] = section.blocks ?? [];
  if (parentIndex < 0 || parentIndex >= current.length || current[parentIndex].type !== 'layout') return components;

  const parentBlock: Block = current[parentIndex];
  const nestedBlocks: Block[] = parentBlock.blocks ?? [];
  if (nestedIndex < 0 || nestedIndex >= nestedBlocks.length) return components;

  const updatedNestedBlocks: Block[] = nestedBlocks.filter((_: Block, i: number) => i !== nestedIndex);
  const updatedParent: Block = { ...parentBlock, blocks: updatedNestedBlocks };
  const newBlocks: Block[] = current.map((block: Block, i: number) =>
    i === parentIndex ? updatedParent : block
  );

  return updateComponentSection(components, componentId, { blocks: newBlocks });
}