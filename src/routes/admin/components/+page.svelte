<script>
  import ComponentList from './ComponentList.svelte';
  import ComponentEditor from './ComponentEditor.svelte';
  import SectionSettings from './SectionSettings.svelte';
  import BlocksEditor from './BlocksEditor.svelte';
  import Preview from './Preview.svelte';

  const { data } = $props();

  // Runes-based state
  let components = $state(data.components ?? []);
  let availableImages = $state([]);
  let showImageSelectorFor = $state(null); // component id
  let showImageSelectorForBlock = $state(null); // block index

  async function loadAvailableImages() {
    try {
      const res = await fetch('/api/images');
      if (res.ok) {
        availableImages = await res.json();
      }
    } catch (error) {
      console.error('Failed to load images:', error);
    }
  }

  // Ensure each component has a section wrapper with its own blocks
  components.forEach((c, idx) => {
    if (!c.section) {
      const existingBlocks = c.blocks ?? [];
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

  let selectedId = $state(components[0]?.id ?? '');
  const selected = $derived(components.find((c) => c.id === selectedId) ?? components[0]);
  const sectionSettings = $derived(getSectionSettings(selected?.section));

  const blockTypes = [
    { type: 'heading', label: 'Heading' },
    { type: 'text', label: 'Text' },
    { type: 'image', label: 'Image' },
    { type: 'button', label: 'Button' }
  ];

  function addComponent() {
    const id = `component-${Date.now()}`;
    const name = 'New Component';
    const section = {
      classes: 'py-16 bg-white',
      containerClasses: 'container mx-auto px-4',
      blocks: [{ type: 'text', text: 'New component' }]
    };
    const html = sectionToHtml(section);
    components.push({
      id,
      name,
      html,
      section
    });
    selectedId = id;
  }

  function updateSelected(field, value) {
    if (!selected) return;
    const idx = components.findIndex((c) => c.id === selected.id);
    if (idx !== -1) {
      components[idx] = { ...components[idx], [field]: value };
    }
  }

  function updateSection(partial) {
    if (!selected) return;
    const base = selected.section ?? {
      classes: 'py-16 bg-white',
      containerClasses: 'container mx-auto px-4',
      blocks: selected.blocks ?? []
    };
    // Always preserve existing blocks unless explicitly overridden
    const existingBlocks = base.blocks ?? [];
    const next = { ...base, ...partial, blocks: partial.blocks !== undefined ? partial.blocks : existingBlocks };
    updateSelected('section', next);
  }

  function getSectionSettings(section) {
    const sec = section ?? {
      classes: 'py-16 bg-white',
      containerClasses: 'container mx-auto px-4',
      blocks: []
    };
    const classes = sec.classes ?? 'py-16 bg-white';
    const containerClasses = sec.containerClasses ?? 'container mx-auto px-4';

    let background = 'white';
    if (sec.backgroundImage !== undefined) background = 'image';
    else if (classes.includes('bg-gray-50')) background = 'gray';
    else if (classes.includes('bg-teal-600')) background = 'teal';

    let padding = 'large';
    if (classes.includes('py-8')) padding = 'normal';
    else if (classes.includes('py-16')) padding = 'large';

    let width = 'boxed';
    if (!containerClasses.includes('container')) width = 'full';

    return { background, padding, width, backgroundImage: sec.backgroundImage ?? '' };
  }

  function updateSectionStyle(partial) {
    if (!selected) return;
    const current = getSectionSettings(selected.section);
    const next = { ...current, ...partial };

    const paddingClass = next.padding === 'normal' ? 'py-8' : 'py-16';
    let bgClass = '';
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

    const classes = `${paddingClass} ${bgClass}`.trim();
    const containerClasses =
      next.width === 'full' ? 'px-4' : 'container mx-auto px-4';

    // Preserve existing blocks when updating section styles
    const existingBlocks = selected.section?.blocks ?? [];
    const backgroundImage =
      next.background === 'image'
        ? next.backgroundImage ?? ''
        : undefined;
    updateSection({ classes, containerClasses, blocks: existingBlocks, backgroundImage });
  }

  function addBlock() {
    if (!selected) return;
    const section = selected.section ?? {
      classes: 'py-16 bg-white',
      containerClasses: 'container mx-auto px-4',
      blocks: []
    };
    const current = section.blocks ?? [];
    const newBlocks = [
      ...current,
      { type: 'text', text: 'New block' }
    ];
    updateSection({ blocks: newBlocks });
  }

  function updateBlock(index, partial) {
    if (!selected) return;
    const section = selected.section ?? {
      classes: 'py-16 bg-white',
      containerClasses: 'container mx-auto px-4',
      blocks: []
    };
    const current = section.blocks ?? [];
    const newBlocks = current.map((block, i) =>
      i === index ? { ...block, ...partial } : block
    );
    updateSection({ blocks: newBlocks });
  }

  function deleteBlockAt(index) {
    if (!selected) return;
    const section = selected.section ?? {
      classes: 'py-16 bg-white',
      containerClasses: 'container mx-auto px-4',
      blocks: []
    };
    const current = section.blocks ?? [];
    const newBlocks = current.filter((_, i) => i !== index);
    updateSection({ blocks: newBlocks });
  }

  function moveBlock(index, direction) {
    if (!selected) return;
    const section = selected.section ?? {
      classes: 'py-16 bg-white',
      containerClasses: 'container mx-auto px-4',
      blocks: []
    };
    const current = section.blocks ?? [];
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= current.length) return;
    const newBlocks = current.slice();
    const [moved] = newBlocks.splice(index, 1);
    newBlocks.splice(newIndex, 0, moved);
    updateSection({ blocks: newBlocks });
  }

  function blocksToHtml(blocks) {
    return blocks
      .map((block) => {
        const align = block.align ?? 'left';
        const alignClass =
          align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left';

        if (block.type === 'heading') {
          const level = block.level ?? 2;
          const tag = `h${level}`;
          const text = block.text ?? '';
          const color = block.color ?? 'black';
          const colorClass = color === 'black' ? 'text-black' : color === 'gray' ? 'text-gray-600' : color === 'white' ? 'text-white' : color === 'red' ? 'text-red-600' : color === 'blue' ? 'text-blue-600' : color === 'green' ? 'text-green-600' : color === 'teal' ? 'text-teal-600' : 'text-black';
          return `<${tag} class="text-3xl font-bold mb-4 ${colorClass} ${alignClass}">${text}</${tag}>`;
        }
        if (block.type === 'text') {
          const text = block.text ?? '';
          const color = block.color ?? 'gray';
          const colorClass = color === 'gray' ? 'text-gray-600' : color === 'black' ? 'text-black' : color === 'white' ? 'text-white' : color === 'red' ? 'text-red-600' : color === 'blue' ? 'text-blue-600' : color === 'green' ? 'text-green-600' : color === 'teal' ? 'text-teal-600' : 'text-gray-600';
          return `<p class="${colorClass} mb-4 ${alignClass}">${text}</p>`;
        }
        if (block.type === 'image') {
          const src = block.src ?? '';
          const alt = block.alt ?? '';
          const widthPercent = block.widthPercent ?? 100;
          const width = Math.min(Math.max(widthPercent, 10), 100); // clamp 10–100
          return `<div class="${alignClass} mb-4"><img src="${src}" alt="${alt}" style="width: ${width}%; max-width: 100%;" class="h-auto inline-block" /></div>`;
        }
        if (block.type === 'button') {
          const label = block.label ?? 'Button';
          const href = block.href ?? '#';
          return `<div class="${alignClass} mb-4"><a href="${href}" class="btn inline-block">${label}</a></div>`;
        }
        return '';
      })
      .join('\n');
  }

  function sectionToHtml(section) {
    const sec = section ?? {
      classes: 'py-16 bg-white',
      containerClasses: 'container mx-auto px-4',
      blocks: []
    };
    const inner = blocksToHtml(sec.blocks ?? []);
    const style = sec.backgroundImage ? ` style="background-image: url('${sec.backgroundImage}'); background-size: cover; background-position: center;"` : '';
    return `<section class="${sec.classes}"${style}><div class="${sec.containerClasses}">\n${inner}\n</div></section>`;
  }

  function applyBlocksToHtml() {
    if (!selected) return;
    const html = sectionToHtml(selected.section);
    updateSelected('html', html);
  }

  async function save() {
    const res = await fetch('/api/components', {
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

  function deleteSelected() {
    if (!selected) return;
    if (!confirm(`Delete component "${selected.name}" (${selected.id})?`)) return;

    const idx = components.findIndex((c) => c.id === selected.id);
    if (idx !== -1) {
      components.splice(idx, 1);
      // Choose a new selection if any components remain
      selectedId = components[0]?.id ?? '';
    }
  }

  function setShowImageSelectorFor(id) {
    showImageSelectorFor = id;
  }

  function setShowImageSelectorForBlock(index) {
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
