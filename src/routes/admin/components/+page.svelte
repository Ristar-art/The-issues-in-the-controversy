<script lang="ts">
  import ComponentList from './ComponentList.svelte';
  import ComponentEditor from './ComponentEditor.svelte';
  import SectionSettings from './SectionSettings.svelte';
  import BlocksEditor from './BlocksEditor.svelte';
  import Preview from './Preview.svelte';

  // Define TypeScript interfaces for type safety
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
  }

  interface Component {
    id: string;
    name: string;
    html: string;
    section: Section;
    // Legacy support for old format
    blocks?: Block[];
  }

  interface BlockType {
    type: string;
    label: string;
  }

  interface SectionSettingsData {
    background: string;
    padding: string;
    width: string;
    backgroundImage: string;
  }

  interface PageData {
    components: Component[];
  }

  // Props passed from the page load function
  const { data }: { data: PageData } = $props();

  // Runes-based reactive state management
  // Array of all components being edited
  let components: Component[] = $state(data.components ?? []);
  // List of available images for selection
  let availableImages: string[] = $state([]);
  // ID of component currently showing image selector (null if none)
  let showImageSelectorFor: string | null = $state(null);
  // Index of block currently showing image selector (null if none)
  let showImageSelectorForBlock: number | null = $state(null);

  /**
   * Loads the list of available images from the API.
   * This populates the availableImages state that can be used
   * when selecting background images or block images.
   */
  async function loadAvailableImages(): Promise<void> {
    try {
      const res: Response = await fetch('/api/images');
      if (res.ok) {
        availableImages = await res.json();
      }
    } catch (error: any) {
      console.error('Failed to load images:', error);
    }
  }

  // Ensure each component has a section wrapper with its own blocks
  // This handles migration from old format where blocks were directly on component
  // to new format where blocks are nested under section
  components.forEach((c: Component, idx: number) => {
    if (!c.section) {
      const existingBlocks: Block[] = c.blocks ?? [];
      components[idx] = {
        ...c,
        section: {
          classes: 'py-16 bg-white',
          containerClasses: 'container mx-auto px-4',
          blocks: existingBlocks
        }
      };
    }
  });

  // ID of currently selected component for editing
  let selectedId: string = $state(components[0]?.id ?? '');
  // Currently selected component (derived from selectedId)
  const selected: Component | undefined = $derived(components.find((c: Component) => c.id === selectedId) ?? components[0]);
  // Computed section settings for the selected component
  const sectionSettings: SectionSettingsData = $derived(getSectionSettings(selected?.section));

  // Available block types that can be added to sections
  const blockTypes: BlockType[] = [
    { type: 'heading', label: 'Heading' },
    { type: 'text', label: 'Text' },
    { type: 'image', label: 'Image' },
    { type: 'button', label: 'Button' }
  ];

  /**
   * Creates a new component with default settings and selects it for editing.
   * The new component includes a default section with one text block.
   */
  function addComponent(): void {
    const id: string = `component-${Date.now()}`;
    const name: string = 'New Component';
    const section: Section = {
      classes: 'py-16 bg-white',
      containerClasses: 'container mx-auto px-4',
      blocks: [{ type: 'text', text: 'New block' }]
    };
    const html: string = sectionToHtml(section);
    components.push({
      id,
      name,
      html,
      section
    });
    selectedId = id;
  }

   /**
    * Updates a specific field of the currently selected component.
    * @param field - The field name to update (e.g., 'name', 'html')
    * @param value - The new value for the field
    */
   function updateSelected(field: string, value: any): void {
     if (!selected) return;
     const idx: number = components.findIndex((c: Component) => c.id === selected.id);
     if (idx !== -1) {
       components[idx] = { ...components[idx], [field]: value };
       // If updating the ID, also update selectedId to maintain selection
       if (field === 'id') {
         selectedId = value;
       }
     }
   }

  /**
   * Updates the section configuration of the selected component.
   * Merges the provided partial updates with existing section data,
   * preserving blocks unless explicitly overridden.
   * @param partial - Partial section object with updates to apply
   */
  function updateSection(partial: Partial<Section>): void {
    if (!selected) return;
    const base: Section = selected.section ?? {
      classes: 'py-16 bg-white',
      containerClasses: 'container mx-auto px-4',
      blocks: selected.blocks ?? []
    };
    // Always preserve existing blocks unless explicitly overridden
    const existingBlocks: Block[] = base.blocks ?? [];
    const next: Section = { ...base, ...partial, blocks: partial.blocks !== undefined ? partial.blocks : existingBlocks };
    updateSelected('section', next);
  }

  /**
   * Extracts user-friendly section settings from the raw section object.
   * Converts CSS classes and properties into simplified setting values
   * that can be used by the SectionSettings component.
   * @param section - The section object to analyze
   * @returns Simplified section settings for UI controls
   */
  function getSectionSettings(section: Section | undefined): SectionSettingsData {
    const sec: Section = section ?? {
      classes: 'py-16 bg-white',
      containerClasses: 'container mx-auto px-4',
      blocks: []
    };
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

    return { background, padding, width, backgroundImage: sec.backgroundImage ?? '' };
  }

  /**
   * Updates the section styling based on simplified UI settings.
   * Converts user-friendly settings back into CSS classes and properties.
   * @param partial - Partial section settings to apply
   */
  function updateSectionStyle(partial: Partial<SectionSettingsData>): void {
    if (!selected) return;
    const current: SectionSettingsData = getSectionSettings(selected.section);
    const next: SectionSettingsData = { ...current, ...partial };

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
    const existingBlocks: Block[] = selected.section?.blocks ?? [];
    const backgroundImage: string | undefined =
      next.background === 'image'
        ? next.backgroundImage ?? ''
        : undefined;
    updateSection({ classes, containerClasses, blocks: existingBlocks, backgroundImage });
  }

  /**
   * Adds a new text block to the selected component's section.
   * The new block is appended to the end of the existing blocks.
   */
  function addBlock(): void {
    if (!selected) return;
    const section: Section = selected.section ?? {
      classes: 'py-16 bg-white',
      containerClasses: 'container mx-auto px-4',
      blocks: []
    };
    const current: Block[] = section.blocks ?? [];
    const newBlocks: Block[] = [
      ...current,
      { type: 'text', text: 'New block' }
    ];
    updateSection({ blocks: newBlocks });
  }

  /**
   * Updates a specific block in the selected component's section.
   * @param index - Index of the block to update
   * @param partial - Partial block properties to apply
   */
  function updateBlock(index: number, partial: Partial<Block>): void {
    if (!selected) return;
    const section: Section = selected.section ?? {
      classes: 'py-16 bg-white',
      containerClasses: 'container mx-auto px-4',
      blocks: []
    };
    const current: Block[] = section.blocks ?? [];
    const newBlocks: Block[] = current.map((block: Block, i: number) =>
      i === index ? { ...block, ...partial } : block
    );
    updateSection({ blocks: newBlocks });
  }

  /**
   * Removes a block from the selected component's section at the specified index.
   * @param index - Index of the block to delete
   */
  function deleteBlockAt(index: number): void {
    if (!selected) return;
    const section: Section = selected.section ?? {
      classes: 'py-16 bg-white',
      containerClasses: 'container mx-auto px-4',
      blocks: []
    };
    const current: Block[] = section.blocks ?? [];
    const newBlocks: Block[] = current.filter((_: Block, i: number) => i !== index);
    updateSection({ blocks: newBlocks });
  }

  /**
   * Moves a block up or down within the selected component's section.
   * @param index - Current index of the block to move
   * @param direction - Direction to move (-1 for up, 1 for down)
   */
  function moveBlock(index: number, direction: number): void {
    if (!selected) return;
    const section: Section = selected.section ?? {
      classes: 'py-16 bg-white',
      containerClasses: 'container mx-auto px-4',
      blocks: []
    };
    const current: Block[] = section.blocks ?? [];
    const newIndex: number = index + direction;
    if (newIndex < 0 || newIndex >= current.length) return;
    const newBlocks: Block[] = current.slice();
    const [moved] = newBlocks.splice(index, 1);
    newBlocks.splice(newIndex, 0, moved);
    updateSection({ blocks: newBlocks });
  }

  /**
   * Converts an array of blocks into HTML string representation.
   * Each block type is rendered with appropriate HTML tags and Tailwind CSS classes.
   * @param blocks - Array of block objects to convert to HTML
   * @returns HTML string representation of all blocks
   */
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
          const width: number = Math.min(Math.max(widthPercent, 10), 100); // clamp 10–100
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

  /**
   * Converts a section object into complete HTML string representation.
   * Includes the section wrapper with background styling and container div.
   * @param section - Section object to convert to HTML
   * @returns Complete HTML string for the section
   */
  function sectionToHtml(section: Section | undefined): string {
    const sec: Section = section ?? {
      classes: 'py-16 bg-white',
      containerClasses: 'container mx-auto px-4',
      blocks: []
    };
    const inner: string = blocksToHtml(sec.blocks ?? []);
    const style: string = sec.backgroundImage ? ` style="background-image: url('${sec.backgroundImage}'); background-size: cover; background-position: center;"` : '';
    return `<section class="${sec.classes}"${style}><div class="${sec.containerClasses}">\n${inner}\n</div></section>`;
  }

  /**
   * Regenerates the HTML representation of the selected component's section
   * and updates the component's html field. This should be called whenever
   * blocks or section settings change.
   */
  function applyBlocksToHtml(): void {
    if (!selected) return;
    const html: string = sectionToHtml(selected.section);
    updateSelected('html', html);
  }

  /**
   * Saves all components to the server via API call.
   * Shows success/error alerts based on the response.
   */
  async function save(): Promise<void> {
    const res: Response = await fetch('/api/components', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(components)
    });

    if (!res.ok) {
      alert('Failed to save components');
      return;
    }

    alert('Components saved');
  }

  /**
   * Deletes the currently selected component after user confirmation.
   * Updates the selection to the first remaining component if any exist.
   */
  function deleteSelected(): void {
    if (!selected) return;
    if (!confirm(`Delete component "${selected.name}" (${selected.id})?`)) return;

    const idx: number = components.findIndex((c: Component) => c.id === selected.id);
    if (idx !== -1) {
      components.splice(idx, 1);
      // Choose a new selection if any components remain
      selectedId = components[0]?.id ?? '';
    }
  }

  /**
   * Sets which component should show the image selector modal.
   * @param id - Component ID to show image selector for, or null to hide
   */
  function setShowImageSelectorFor(id: string | null): void {
    showImageSelectorFor = id;
  }

  /**
   * Sets which block index should show the image selector modal.
   * @param index - Block index to show image selector for, or null to hide
   */
  function setShowImageSelectorForBlock(index: number | null): void {
    showImageSelectorForBlock = index;
  }
</script>

<main class="max-w-5xl mx-auto py-8 px-4">
  <h1 class="text-2xl font-bold mb-6">Components Editor</h1>

  <div class="flex gap-6">
    <aside class="w-1/3 border-r pr-4">
      <ComponentList {components} {selectedId} {addComponent} onSelect={(id) => selectedId = id} />
    </aside>

    {#if selected}
      <section class="flex-1 space-y-4">
        <ComponentEditor {selected} {updateSelected} {applyBlocksToHtml} />

        <SectionSettings
          {sectionSettings}
          {updateSectionStyle}
          {selected}
          {loadAvailableImages}
          {availableImages}
          {showImageSelectorFor}
          setShowImageSelectorFor={setShowImageSelectorFor}
        />

        <BlocksEditor
          {selected}
          {blockTypes}
          {addBlock}
          {updateBlock}
          {deleteBlockAt}
          {moveBlock}
          {loadAvailableImages}
          {availableImages}
          {showImageSelectorForBlock}
          {setShowImageSelectorForBlock}
        />

        <div class="pt-4 flex gap-3">
          <button class="px-4 py-2 bg-teal-600 text-white rounded" onclick={(e) => { e.preventDefault(); save(); }}>
            Save all components
          </button>
          <button class="px-4 py-2 bg-red-600 text-white rounded" onclick={(e) => { e.preventDefault(); deleteSelected(); }}>
            Delete selected
          </button>
        </div>

        <Preview {selected} />
      </section>
    {/if}
  </div>
</main>
