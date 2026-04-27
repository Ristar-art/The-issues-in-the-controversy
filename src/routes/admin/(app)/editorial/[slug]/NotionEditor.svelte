<script lang="ts">
  import type { Block, Component } from '../types';
  import QuillBlock from './QuillBlock.svelte';

  interface Props {
    blocks: Block[];
    availableComponents: Component[];
    onUpdate: (blocks: Block[]) => void;
    onSave: () => void;
  }

  let { blocks, availableComponents, onUpdate, onSave }: Props = $props();

  // Generate stable unique IDs for blocks to use as keyed each keys
  let blockIdCounter = 0;
  let blockKeys: Map<Block, number> = new Map();

  function getBlockKey(block: Block): number {
    if (!blockKeys.has(block)) {
      blockKeys.set(block, blockIdCounter++);
    }
    return blockKeys.get(block)!;
  }

  // Track which block is being edited
  let editingBlockIndex: number | null = $state(null);
  let showSlashMenu = $state(false);
  let slashMenuPosition = $state({ x: 0, y: 0 });
  let slashMenuDropUp = $state(false);
  let slashCommand = $state('');
  let slashMenuBlockIndex: number | null = $state(null);
  let showComponentPicker = $state(false);
  let componentPickerIndex: number | null = $state(null);

  // Drag and drop state
  let draggedIndex: number | null = $state(null);
  let dropTargetIndex: number | null = $state(null);

  function handleDragStart(event: DragEvent, index: number) {
    draggedIndex = index;
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', String(index));
    }
    // Add a slight delay so the drag image renders before we style it
    setTimeout(() => {
      const el = document.querySelector(`[data-block-index="${index}"]`);
      if (el) el.classList.add('dragging');
    }, 0);
  }

  function handleDragOver(event: DragEvent, index: number) {
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move';
    }
    if (draggedIndex !== null && index !== draggedIndex) {
      dropTargetIndex = index;
    }
  }

  function handleDragLeave() {
    dropTargetIndex = null;
  }

  function handleDrop(event: DragEvent, index: number) {
    event.preventDefault();
    if (draggedIndex === null || draggedIndex === index) {
      resetDragState();
      return;
    }

    const newBlocks = [...blocks];
    const [movedBlock] = newBlocks.splice(draggedIndex, 1);
    newBlocks.splice(index, 0, movedBlock);
    onUpdate(newBlocks);

    resetDragState();
  }

  function handleDragEnd() {
    const el = document.querySelector('.dragging');
    if (el) el.classList.remove('dragging');
    resetDragState();
  }

  function resetDragState() {
    draggedIndex = null;
    dropTargetIndex = null;
  }

  // Minimal toolbar for button blocks
  const buttonToolbar = [
    ['bold', 'italic', 'link']
  ];

  // Available block types for slash commands
  const blockTypes = [
    { type: 'component', label: 'Component', icon: '📦', shortcut: 'component' }
  ];

  // Get filtered block types based on slash command
  const filteredBlockTypes = $derived(
    blockTypes.filter(bt =>
      bt.label.toLowerCase().includes(slashCommand.toLowerCase()) ||
      bt.shortcut.toLowerCase().includes(slashCommand.toLowerCase())
    )
  );

  function getBlockContent(block: Block): string {
    if (block.type === 'heading') return block.text || '';
    if (block.type === 'text') return block.text || '';
    if (block.type === 'image') return `[Image: ${block.alt || 'unnamed'}]`;
    if (block.type === 'button') return block.label || 'Button';
    if (block.type === 'component') {
      const component = availableComponents.find(c => c.id === block.componentId);
      return component ? `[${component.name}]` : '[Component]';
    }
    return '';
  }

  function updateBlockContent(index: number, content: string) {
    const newBlocks = [...blocks];
    const block = newBlocks[index];
    if (!block) return;

    if (block.type === 'heading' || block.type === 'text') {
      block.text = content;
    } else if (block.type === 'button') {
      block.label = content;
    }

    onUpdate(newBlocks);
  }

  function addBlockAfter(index: number, type: Block['type'] = 'text') {
    const newBlocks = [...blocks];
    const newBlock: Block = { type, text: '<p><br></p>' };
    if (type === 'heading') newBlock.level = 2;
    newBlocks.splice(index + 1, 0, newBlock);

    onUpdate(newBlocks);

    // Focus the new block after a short delay
    setTimeout(() => {
      const newIndex = index + 1;
      editingBlockIndex = newIndex;

      // If it's a component block, show the picker
      if (type === 'component') {
        componentPickerIndex = newIndex;
        showComponentPicker = true;
      } else {
        const element = document.querySelector(`[data-block-index="${newIndex}"] .ql-editor`);
        if (element) {
          (element as HTMLElement).focus();
        }
      }
    }, 50);
  }

  function deleteBlock(index: number) {
    if (blocks.length <= 1) return; // Don't delete the last block

    const newBlocks = [...blocks];
    newBlocks.splice(index, 1);

    onUpdate(newBlocks);

    // Focus the previous block
    if (index > 0) {
      setTimeout(() => {
        const newIndex = index - 1;
        editingBlockIndex = newIndex;
        const element = document.querySelector(`[data-block-index="${newIndex}"] .ql-editor`);
        if (element) {
          (element as HTMLElement).focus();
        }
      }, 50);
    }
  }

  function convertBlockType(index: number, newType: Block['type']) {
    const newBlocks = [...blocks];
    const block = newBlocks[index];
    if (!block) return;

    const content = getBlockContent(block);
    const convertedBlock: Block = { type: newType };

    if (newType === 'heading') {
      convertedBlock.text = content;
      convertedBlock.level = 2;
    } else if (newType === 'text') {
      convertedBlock.text = content;
    } else if (newType === 'image') {
      convertedBlock.src = '';
      convertedBlock.alt = content;
    } else if (newType === 'button') {
      convertedBlock.label = content || 'Button';
      convertedBlock.href = '#';
    } else if (newType === 'component') {
      convertedBlock.componentId = '';
      // Show component picker immediately
      setTimeout(() => {
        componentPickerIndex = index;
        showComponentPicker = true;
      }, 10);
    }

    newBlocks[index] = convertedBlock;
    onUpdate(newBlocks);
  }

  function selectComponent(componentId: string) {
    if (componentPickerIndex !== null) {
      const newBlocks = [...blocks];
      newBlocks[componentPickerIndex] = {
        ...newBlocks[componentPickerIndex],
        componentId
      };
      onUpdate(newBlocks);
      showComponentPicker = false;
      componentPickerIndex = null;
    }
  }

  function closeComponentPicker() {
    if (componentPickerIndex !== null) {
      const block = blocks[componentPickerIndex];
      if (block?.type === 'component' && !block.componentId) {
        const restoredIndex = componentPickerIndex;
        const newBlocks = [...blocks];
        newBlocks[restoredIndex] = { type: 'text', text: '<p><br></p>' };
        onUpdate(newBlocks);
        setTimeout(() => {
          editingBlockIndex = restoredIndex;
          const element = document.querySelector(`[data-block-index="${restoredIndex}"] .ql-editor`);
          if (element) (element as HTMLElement).focus();
        }, 50);
      }
    }
    showComponentPicker = false;
    componentPickerIndex = null;
  }

  function removeComponentFromBlock(index: number) {
    const newBlocks = [...blocks];
    newBlocks[index] = { type: 'text', text: '' };
    onUpdate(newBlocks);
  }

  function handleQuillKeyDown(event: KeyboardEvent, index: number) {
    // Hide slash menu on escape
    if (event.key === 'Escape' && showSlashMenu) {
      showSlashMenu = false;
      return;
    }

    // Handle Enter to create new block
    if (event.key === 'Enter' && !event.shiftKey) {
      addBlockAfter(index);
      return;
    }

    // Handle Backspace on empty block to delete
    if (event.key === 'Backspace') {
      deleteBlock(index);
      return;
    }

    // Handle keyboard shortcuts
    if (event.key === 's' && (event.metaKey || event.ctrlKey)) {
      onSave();
      return;
    }
  }

  function handleSlashTyped(rect: DOMRect, index: number) {
    const menuHeight = 260; // approximate height of the slash menu
    const viewportHeight = window.innerHeight;
    const spaceBelow = viewportHeight - rect.y;

    if (spaceBelow < menuHeight) {
      // Not enough room below — show above the cursor (dropup)
      const bottomValue = viewportHeight - rect.y + 30;
      slashMenuPosition = { x: rect.x, y: bottomValue };
      slashMenuDropUp = true;
    } else {
      slashMenuPosition = { x: rect.x, y: rect.y };
      slashMenuDropUp = false;
    }

    showSlashMenu = true;
    slashCommand = '';
    slashMenuBlockIndex = index;
  }

  function handleQuillTextChange(index: number, html: string) {
    // Check for slash command text in the content
    if (showSlashMenu && slashMenuBlockIndex === index) {
      // Extract text after the last slash to filter commands
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      const text = tempDiv.textContent || '';
      const match = text.match(/\/(\w*)$/);
      if (match) {
        slashCommand = match[1];
      }
    }

    updateBlockContent(index, html);
  }

  function executeSlashCommand(blockType: typeof blockTypes[0]) {
    if (slashMenuBlockIndex !== null) {
      convertBlockType(slashMenuBlockIndex, blockType.type as Block['type']);
      showSlashMenu = false;
    }
  }

  function getHeadingClasses(block: Block): string {
    const level = block.level || 2;
    const sizeClasses: Record<number, string> = {
      1: 'heading-level-1',
      2: 'heading-level-2',
      3: 'heading-level-3',
      4: 'heading-level-4'
    };
    return sizeClasses[level] || sizeClasses[2];
  }

  function getPlaceholder(block: Block): string {
    if (block.type === 'text') return 'Type something...';
    if (block.type === 'heading') return 'Heading';
    if (block.type === 'image') return 'Click to add image...';
    if (block.type === 'button') return 'Button text';
    if (block.type === 'component') return 'Select a component...';
    return '';
  }
</script>

<div class="notion-editor">
  {#each blocks as block, index (getBlockKey(block))}
    <div
      class="block-wrapper group relative {dropTargetIndex === index ? 'drop-target' : ''} {draggedIndex === index ? 'dragging' : ''}"
      data-block-index={index}
      ondragover={(e) => handleDragOver(e, index)}
      ondragleave={handleDragLeave}
      ondrop={(e) => handleDrop(e, index)}
    >
      <!-- Block handle (visible on hover) -->
      <div class="absolute -left-8 top-1 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1">
        <button
          class="drag-handle p-1 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing"
          title="Drag to move"
          draggable="true"
          ondragstart={(e) => handleDragStart(e, index)}
          ondragend={handleDragEnd}
        >
          ⋮⋮
        </button>
        <button
          class="p-1 text-gray-400 hover:text-red-600"
          onclick={() => deleteBlock(index)}
          title="Delete block"
        >
          ×
        </button>
      </div>

      <!-- Block type indicator on hover -->
      <div class="absolute -left-24 top-1 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-gray-400 uppercase tracking-wider">
        {block.type}
      </div>

      <!-- Editable block -->
      {#if block.type === 'image'}
        <div class="image-block">
          {#if block.src}
            <img
              src={block.src}
              alt={block.alt || ''}
              class="max-w-full h-auto rounded"
              style="width: {block.widthPercent || 100}%"
            />
          {:else}
            <div
              class="border-2 border-dashed border-gray-300 rounded p-8 text-center text-gray-400 hover:border-gray-400 hover:text-gray-500 cursor-pointer transition-colors"
              onclick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                input.onchange = (e) => {
                  const file = (e.target as HTMLInputElement).files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                      const newBlocks = [...blocks];
                      newBlocks[index] = { ...block, src: ev.target?.result as string };
                      onUpdate(newBlocks);
                    };
                    reader.readAsDataURL(file);
                  }
                };
                input.click();
              }}
            >
              <div class="text-3xl mb-2">📷</div>
              <div>Click to add image</div>
            </div>
          {/if}
        </div>
      {:else if block.type === 'button'}
        <div class="button-block-wrapper">
          <QuillBlock
            content={block.label ?? ''}
            placeholder={getPlaceholder(block)}
            toolbarOptions={buttonToolbar}
            onTextChange={(html) => handleQuillTextChange(index, html)}
            onKeyDown={(e) => handleQuillKeyDown(e, index)}
            onSlashTyped={(rect) => handleSlashTyped(rect, index)}
            blockIndex={index}
          />
        </div>
      {:else if block.type === 'component'}
        <div class="component-block mb-4 p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
          {#if block.componentId}
            {@const component = availableComponents.find(c => c.id === block.componentId)}
            {#if component}
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <span class="text-2xl">📦</span>
                  <span class="font-medium">{component.name}</span>
                </div>
                <button
                  class="text-sm text-red-600 hover:text-red-700"
                  onclick={() => removeComponentFromBlock(index)}
                >
                  Remove
                </button>
              </div>
              <div class="text-sm text-gray-500 mb-2">{component.description || 'No description'}</div>
              <div class="component-preview border rounded bg-white p-4 overflow-hidden">
                {@html component.html}
              </div>
            {:else}
              <div class="text-red-500">Component not found: {block.componentId}</div>
              <button
                class="mt-2 text-sm text-blue-600"
                onclick={() => { componentPickerIndex = index; showComponentPicker = true; }}
              >
                Select a different component
              </button>
            {/if}
          {:else}
            <div class="text-center py-4">
              <div class="text-3xl mb-2">📦</div>
              <div class="text-gray-500 mb-2">No component selected</div>
              <button
                class="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
                onclick={() => { componentPickerIndex = index; showComponentPicker = true; }}
              >
                Choose Component
              </button>
            </div>
          {/if}
        </div>
      {:else}
        <!-- Text and Heading blocks use QuillBlock -->
        <div class={block.type === 'heading' ? getHeadingClasses(block) : 'text-block'}>
          <QuillBlock
            content={block.text ?? ''}
            placeholder={getPlaceholder(block)}
            onTextChange={(html) => handleQuillTextChange(index, html)}
            onKeyDown={(e) => handleQuillKeyDown(e, index)}
            onSlashTyped={(rect) => handleSlashTyped(rect, index)}
            blockIndex={index}
          />
        </div>
      {/if}
    </div>
  {/each}

  <!-- Add new block button -->
  <button
    class="mt-8 flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors opacity-0 hover:opacity-100 group-hover:opacity-100"
    onclick={() => addBlockAfter(blocks.length - 1)}
  >
    <span class="text-xl">+</span>
    <span>Add a block</span>
  </button>
</div>

<!-- Slash command menu -->
{#if showSlashMenu}
  <div
    class="slash-menu"
    style="left: {slashMenuPosition.x}px; {slashMenuDropUp ? `bottom: ${slashMenuPosition.y}px;` : `top: ${slashMenuPosition.y}px;`}"
  >
    <div class="slash-menu-header">
      <span class="eyebrow slash-menu-eyebrow">Insert Block</span>
    </div>
    <div class="slash-menu-list">
      {#each filteredBlockTypes as blockType}
        <button
          type="button"
          class="slash-menu-item"
          onclick={() => executeSlashCommand(blockType)}
        >
          <span class="slash-menu-icon">{blockType.icon}</span>
          <div class="slash-menu-text">
            <div class="slash-menu-label">{blockType.label}</div>
            <div class="slash-menu-shortcut">/{blockType.shortcut}</div>
          </div>
        </button>
      {/each}
      {#if filteredBlockTypes.length === 0}
        <div class="slash-menu-empty">No commands found</div>
      {/if}
    </div>
  </div>
{/if}

<!-- Component Picker Modal -->
{#if showComponentPicker}
  <div class="component-picker-overlay" onclick={closeComponentPicker}>
    <div class="component-picker card-editorial" onclick={(e) => e.stopPropagation()}>
      <div class="component-picker-header">
        <div>
          <span class="eyebrow">Library</span>
          <h3 class="font-headline component-picker-title">Select Component</h3>
        </div>
        <button
          type="button"
          class="component-picker-close"
          onclick={closeComponentPicker}
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" x2="6" y1="6" y2="18"/>
            <line x1="6" x2="18" y1="6" y2="18"/>
          </svg>
        </button>
      </div>
      <div class="component-picker-body">
        {#if availableComponents.length === 0}
          <div class="component-picker-empty">
            <div class="component-picker-empty-mark">◇</div>
            <p class="font-body">No custom components available</p>
            <a href="/admin/components" class="link-editorial">Create components in the library</a>
          </div>
        {:else}
          <div class="component-picker-grid">
            {#each availableComponents as component}
              <button
                type="button"
                class="component-card"
                onclick={() => selectComponent(component.id)}
              >
                <span class="eyebrow component-card-category">{component.category}</span>
                <div class="component-card-name font-headline">{component.name}</div>
                {#if component.description}
                  <p class="component-card-description font-body">{component.description}</p>
                {/if}
              </button>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  .notion-editor {
    padding: 2rem 2rem 2rem 4rem;
    max-width: 900px;
    margin: 0 auto;
  }

  .block-wrapper {
    position: relative;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }

  .block-wrapper.dragging {
    opacity: 0.4;
  }

  .block-wrapper.drop-target {
    border-top: 2px solid #0d9488;
  }

  .drag-handle {
    user-select: none;
    -webkit-user-select: none;
    touch-action: none;
  }

  .image-block {
    margin: 1rem 0;
  }

  .component-preview :global(*) {
    max-width: 100%;
  }

  /* Heading level styles applied to the Quill wrapper */
  .heading-level-1 :global(.ql-editor) {
    font-size: 2.25rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    margin-top: 2rem;
  }

  .heading-level-2 :global(.ql-editor) {
    font-size: 1.875rem;
    font-weight: 700;
    margin-bottom: 1rem;
    margin-top: 1.5rem;
  }

  .heading-level-3 :global(.ql-editor) {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
    margin-top: 1rem;
  }

  .heading-level-4 :global(.ql-editor) {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    margin-top: 1rem;
  }

  .text-block :global(.ql-editor) {
    color: #374151;
    margin-bottom: 1rem;
    line-height: 1.625;
  }

  .button-block-wrapper {
    display: inline-block;
    padding: 0.5rem 1.5rem;
    background: #0d9488;
    color: white;
    border-radius: 0.375rem;
    margin-bottom: 1rem;
  }

  .button-block-wrapper :global(.ql-editor) {
    color: white;
    padding: 0 !important;
    min-height: auto;
  }

  .button-block-wrapper :global(.ql-toolbar) {
    background: white;
    border-radius: 0.375rem;
    margin-bottom: 4px;
  }

  .button-block-wrapper :global(.ql-container) {
    font-size: inherit;
  }

  /* ---------- Slash command menu (editorial) ---------- */
  .slash-menu {
    position: fixed;
    z-index: 60;
    min-width: 280px;
    max-height: 360px;
    display: flex;
    flex-direction: column;
    background-color: var(--color-paper);
    border: 1px solid var(--color-pearl);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1), 0 2px 6px rgba(0, 0, 0, 0.04);
    overflow: hidden;
  }

  .slash-menu-header {
    padding: 0.85rem 1.1rem 0.6rem;
    border-bottom: 1px solid var(--color-pearl);
    background-color: var(--color-cream);
  }

  .slash-menu-eyebrow {
    margin-bottom: 0 !important;
    font-size: 0.625rem;
  }

  .slash-menu-list {
    padding: 0.35rem 0;
    overflow-y: auto;
    flex: 1;
  }

  .slash-menu-item {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.85rem;
    padding: 0.7rem 1.1rem;
    background: none;
    border: none;
    border-left: 2px solid transparent;
    text-align: left;
    cursor: pointer;
    font-family: 'Source Sans Pro', sans-serif;
    color: var(--color-ink);
    transition: background-color 0.15s ease, border-left-color 0.15s ease;
  }

  .slash-menu-item:hover,
  .slash-menu-item:focus-visible {
    background-color: var(--color-cream);
    border-left-color: var(--color-accent);
    outline: none;
  }

  .slash-menu-icon {
    width: 2rem;
    height: 2rem;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--color-pearl);
    background-color: var(--color-cream);
    font-size: 0.95rem;
    color: var(--color-graphite);
  }

  .slash-menu-item:hover .slash-menu-icon,
  .slash-menu-item:focus-visible .slash-menu-icon {
    border-color: var(--color-accent);
    color: var(--color-accent);
  }

  .slash-menu-text {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    min-width: 0;
  }

  .slash-menu-label {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--color-ink);
    line-height: 1.2;
  }

  .slash-menu-shortcut {
    font-family: 'SF Mono', 'Fira Code', monospace;
    font-size: 0.7rem;
    color: var(--color-stone);
    letter-spacing: 0.02em;
  }

  .slash-menu-empty {
    padding: 1.25rem 1.1rem;
    text-align: center;
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 0.8rem;
    color: var(--color-stone);
    font-style: italic;
  }

  /* ---------- Component Picker Modal (editorial) ---------- */
  .component-picker-overlay {
    position: fixed;
    inset: 0;
    z-index: 60;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    background-color: rgba(26, 26, 26, 0.55);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
  }

  .component-picker {
    width: 100%;
    max-width: 720px;
    max-height: 82vh;
    display: flex;
    flex-direction: column;
    background-color: var(--color-paper);
    border: 1px solid var(--color-pearl);
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.25);
    overflow: hidden;
  }

  /* Override card-editorial hover lift inside modal */
  .component-picker:hover {
    transform: none;
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.25);
  }

  .component-picker-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    padding: 2rem 2.25rem 1.5rem;
    border-bottom: 1px solid var(--color-pearl);
  }

  .component-picker-title {
    font-size: 1.75rem;
    margin: 0.25rem 0 0;
    color: var(--color-ink);
    line-height: 1.2;
  }

  .component-picker-close {
    background: none;
    border: 1px solid var(--color-pearl);
    color: var(--color-stone);
    width: 2.25rem;
    height: 2.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    flex-shrink: 0;
  }

  .component-picker-close:hover {
    background-color: var(--color-ink);
    color: var(--color-paper);
    border-color: var(--color-ink);
  }

  .component-picker-body {
    padding: 2rem 2.25rem;
    overflow-y: auto;
    flex: 1;
  }

  .component-picker-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.85rem;
    padding: 3rem 1rem;
    text-align: center;
    color: var(--color-stone);
  }

  .component-picker-empty-mark {
    font-family: 'Playfair Display', serif;
    font-size: 3rem;
    color: var(--color-accent);
    line-height: 1;
  }

  .component-picker-empty p {
    margin: 0;
    color: var(--color-graphite);
    font-size: 0.95rem;
  }

  .component-picker-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  @media (min-width: 640px) {
    .component-picker-grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  .component-card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    padding: 1.25rem 1.35rem;
    background-color: var(--color-paper);
    border: 1px solid var(--color-pearl);
    text-align: left;
    cursor: pointer;
    transition: border-color 0.2s ease, background-color 0.2s ease, transform 0.2s ease;
    font-family: 'Source Sans Pro', sans-serif;
  }

  .component-card:hover,
  .component-card:focus-visible {
    border-color: var(--color-accent);
    background-color: var(--color-cream);
    outline: none;
  }

  .component-card-category {
    margin-bottom: 0 !important;
    font-size: 0.625rem;
  }

  .component-card-name {
    font-size: 1.15rem;
    color: var(--color-ink);
    line-height: 1.25;
  }

  .component-card-description {
    margin: 0;
    font-size: 0.85rem;
    color: var(--color-stone);
    line-height: 1.5;
  }

  @media (max-width: 640px) {
    .component-picker-header {
      padding: 1.5rem 1.5rem 1rem;
    }

    .component-picker-body {
      padding: 1.5rem;
    }

    .component-picker-title {
      font-size: 1.4rem;
    }
  }
</style>
