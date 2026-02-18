<script lang="ts">
  import type { Block, Component } from '../types';
  
  interface Props {
    blocks: Block[];
    availableComponents: Component[];
    onUpdate: (blocks: Block[]) => void;
    onSave: () => void;
  }
  
  let { blocks, availableComponents, onUpdate, onSave }: Props = $props();
  
  // Track which block is being edited
  let editingBlockIndex: number | null = $state(null);
  let showSlashMenu = $state(false);
  let slashMenuPosition = $state({ x: 0, y: 0 });
  let slashCommand = $state('');
  let slashMenuBlockIndex: number | null = $state(null);
  let showComponentPicker = $state(false);
  let componentPickerIndex: number | null = $state(null);
  
  // Available block types for slash commands
  const blockTypes = [
    { type: 'heading', label: 'Heading', icon: 'H', shortcut: 'h1' },
    { type: 'text', label: 'Text', icon: 'T', shortcut: 'text' },
    { type: 'image', label: 'Image', icon: '📷', shortcut: 'image' },
    { type: 'button', label: 'Button', icon: '🔘', shortcut: 'button' },
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
    const newBlock: Block = { type, text: '' };
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
        const element = document.querySelector(`[data-block-index="${newIndex}"]`);
        if (element) {
          (element as HTMLElement).focus();
          // Place cursor at the beginning
          const range = document.createRange();
          const sel = window.getSelection();
          range.setStart(element.firstChild || element, 0);
          range.collapse(true);
          sel?.removeAllRanges();
          sel?.addRange(range);
        }
      }
    }, 10);
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
        const element = document.querySelector(`[data-block-index="${newIndex}"]`);
        if (element) {
          (element as HTMLElement).focus();
        }
      }, 10);
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
  
  function removeComponentFromBlock(index: number) {
    const newBlocks = [...blocks];
    newBlocks[index] = { type: 'text', text: '' };
    onUpdate(newBlocks);
  }
  
  function handleKeyDown(event: KeyboardEvent, index: number) {
    const target = event.target as HTMLElement;
    
    // Handle slash commands
    if (event.key === '/') {
      const selection = window.getSelection();
      if (selection) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        slashMenuPosition = { x: rect.left, y: rect.bottom + 5 };
        showSlashMenu = true;
        slashCommand = '';
        slashMenuBlockIndex = index;
      }
      return;
    }
    
    // Hide slash menu on escape
    if (event.key === 'Escape' && showSlashMenu) {
      showSlashMenu = false;
      event.preventDefault();
      return;
    }
    
    // Handle Enter to create new block
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      addBlockAfter(index);
      return;
    }
    
    // Handle Backspace on empty block to delete
    if (event.key === 'Backspace' && target.textContent === '') {
      event.preventDefault();
      deleteBlock(index);
      return;
    }
    
    // Handle Tab to convert to heading
    if (event.key === 'Tab' && target.textContent?.startsWith('#')) {
      event.preventDefault();
      const level = Math.min(target.textContent.match(/^#+/)?.[0].length || 1, 4);
      convertBlockType(index, 'heading');
      const newBlocks = [...blocks];
      if (newBlocks[index]) {
        newBlocks[index].level = level;
        newBlocks[index].text = target.textContent.replace(/^#+\s*/, '');
        onUpdate(newBlocks);
      }
      return;
    }
    
    // Handle keyboard shortcuts for markdown
    if (event.key === 's' && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      onSave();
      return;
    }
  }
  
  function handleInput(event: Event, index: number) {
    const target = event.target as HTMLElement;
    const text = target.textContent || '';
    
    // Check for slash command
    if (showSlashMenu && slashMenuBlockIndex === index) {
      const match = text.match(/\/(\w*)$/);
      if (match) {
        slashCommand = match[1];
      }
    }
    
    updateBlockContent(index, text);
  }
  
  function handleBlur(event: FocusEvent, index: number) {
    editingBlockIndex = null;
  }
  
  function handleFocus(index: number) {
    editingBlockIndex = index;
  }
  
  function executeSlashCommand(blockType: typeof blockTypes[0]) {
    if (slashMenuBlockIndex !== null) {
      convertBlockType(slashMenuBlockIndex, blockType.type as Block['type']);
      showSlashMenu = false;
    }
  }
  
  function getBlockClasses(block: Block, isEditing: boolean): string {
    const baseClasses = 'outline-none transition-all duration-200 relative';
    const editingClasses = isEditing ? 'bg-yellow-50/30' : '';
    
    if (block.type === 'heading') {
      const level = block.level || 2;
      const sizeClasses = {
        1: 'text-4xl font-bold mb-6 mt-8',
        2: 'text-3xl font-bold mb-4 mt-6',
        3: 'text-2xl font-bold mb-3 mt-4',
        4: 'text-xl font-bold mb-2 mt-4'
      };
      return `${baseClasses} ${editingClasses} ${sizeClasses[level as keyof typeof sizeClasses]}`;
    }
    
    if (block.type === 'text') {
      return `${baseClasses} ${editingClasses} text-gray-700 mb-4 leading-relaxed empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400`;
    }
    
    if (block.type === 'image') {
      return `${baseClasses} ${editingClasses} mb-4`;
    }
    
    if (block.type === 'button') {
      return `${baseClasses} ${editingClasses} inline-block px-6 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 mb-4`;
    }
    
    return baseClasses;
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
  {#each blocks as block, index (index)}
    <div class="block-wrapper group relative">
      <!-- Block handle (visible on hover) -->
      <div class="absolute -left-8 top-1 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1">
        <button
          class="p-1 text-gray-400 hover:text-gray-600 cursor-grab"
          title="Drag to move"
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
        <button
          class={getBlockClasses(block, editingBlockIndex === index)}
          contenteditable="true"
          data-block-index={index}
          data-placeholder={getPlaceholder(block)}
          onkeydown={(e) => handleKeyDown(e, index)}
          oninput={(e) => handleInput(e, index)}
          onblur={(e) => handleBlur(e, index)}
          onfocus={() => handleFocus(index)}
          bind:innerText={block.label}
        ></button>
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
        <div
          class={getBlockClasses(block, editingBlockIndex === index)}
          contenteditable="true"
          data-block-index={index}
          data-placeholder={getPlaceholder(block)}
          onkeydown={(e) => handleKeyDown(e, index)}
          oninput={(e) => handleInput(e, index)}
          onblur={(e) => handleBlur(e, index)}
          onfocus={() => handleFocus(index)}
          bind:innerText={block.text}
          role="textbox"
          aria-label="{block.type} block"
          aria-multiline="true"
        ></div>
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
    class="fixed z-50 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[200px]"
    style="left: {slashMenuPosition.x}px; top: {slashMenuPosition.y}px;"
  >
    {#each filteredBlockTypes as blockType}
      <button
        class="w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-100 text-left transition-colors"
        onclick={() => executeSlashCommand(blockType)}
      >
        <span class="w-8 h-8 flex items-center justify-center bg-gray-100 rounded text-sm">
          {blockType.icon}
        </span>
        <div>
          <div class="font-medium text-sm">{blockType.label}</div>
          <div class="text-xs text-gray-400">Type /{blockType.shortcut}</div>
        </div>
      </button>
    {/each}
    {#if filteredBlockTypes.length === 0}
      <div class="px-4 py-2 text-sm text-gray-400">No commands found</div>
    {/if}
  </div>
{/if}

<!-- Component Picker Modal -->
{#if showComponentPicker}
  <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" onclick={() => showComponentPicker = false}>
    <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden" onclick={(e) => e.stopPropagation()}>
      <div class="p-4 border-b flex justify-between items-center">
        <h3 class="font-semibold text-lg">Select Component</h3>
        <button class="text-gray-500 hover:text-gray-700" onclick={() => showComponentPicker = false}>×</button>
      </div>
      <div class="p-4 overflow-y-auto max-h-[60vh]">
        {#if availableComponents.length === 0}
          <div class="text-center py-8 text-gray-500">
            <div class="text-4xl mb-2">📦</div>
            <p class="mb-4">No custom components available</p>
            <a href="/admin/components" class="text-teal-600 hover:underline">Create components in the library</a>
          </div>
        {:else}
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            {#each availableComponents as component}
              <button
                class="text-left p-4 border rounded-lg hover:border-teal-500 hover:bg-teal-50 transition-colors"
                onclick={() => selectComponent(component.id)}
              >
                <div class="flex items-center gap-2 mb-2">
                  <span class="text-2xl">📦</span>
                  <span class="font-medium">{component.name}</span>
                </div>
                {#if component.description}
                  <p class="text-sm text-gray-500">{component.description}</p>
                {/if}
                <div class="mt-2 text-xs text-gray-400 uppercase">{component.category}</div>
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
  }
  
  .notion-editor [contenteditable]:empty:before {
    content: attr(data-placeholder);
    color: #9ca3af;
    pointer-events: none;
  }
  
  .notion-editor [contenteditable]:focus {
    background-color: rgba(254, 252, 232, 0.3);
  }
  
  .image-block {
    margin: 1rem 0;
  }
  
  .component-preview :global(*) {
    max-width: 100%;
  }
</style>