<script lang="ts">
  import ComponentList from './ComponentList.svelte';
  import ComponentEditor from './ComponentEditor.svelte';
  import SectionSettings from './SectionSettings.svelte';
  import BlocksEditor from './BlocksEditor.svelte';
  import Preview from './Preview.svelte';

  import type { Component, PageData, ImageSelectorState, SectionSettingsData } from './types';
  import {
    BLOCK_TYPES,
    createComponent,
    migrateComponent,
    updateComponentField,
    updateComponentSection,
    getSectionSettings,
    updateSectionStyle,
    addBlockToSection,
    updateBlockInSection,
    deleteBlockFromSection,
    moveBlockInSection,
    addNestedBlockToLayout,
    updateNestedBlockInLayout,
    deleteNestedBlockFromLayout,
    applyBlocksToHtml
  } from './component-utils';

  // Props passed from the page load function
  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();

  // Runes-based reactive state management
  // Array of all components being edited
  let components: Component[] = $state(data.components ?? []);
  // List of available images for selection
  let availableImages: string[] = $state([]);
  // Image selector state
  let imageSelectorState: ImageSelectorState = $state({
    showImageSelectorFor: null,
    showImageSelectorForBlock: null,
    showImageSelectorForNestedBlock: null
  });

  // ID of currently selected component for editing
  let selectedId: string = $state(components[0]?.id ?? '');
  // Currently selected component (derived from selectedId)
  const selected: Component | undefined = $derived(components.find((c: Component) => c.id === selectedId) ?? components[0]);
  // Computed section settings for the selected component
  const sectionSettings: SectionSettingsData = $derived(getSectionSettings(selected?.section));

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
  $effect(() => {
    components.forEach((c: Component, idx: number) => {
      if (!c.section) {
        components[idx] = migrateComponent(c);
      }
    });
  });

  /**
   * Creates a new component with default settings and selects it for editing.
   */
  function addComponent(): void {
    const id: string = `component-${Date.now()}`;
    const name: string = 'New Component';
    const newComponent = createComponent(id, name);
    components.push(newComponent);
    selectedId = id;
  }

  /**
   * Updates a specific field of the currently selected component.
   */
  function updateSelected(field: string, value: any): void {
    if (!selected) return;
    components = updateComponentField(components, selected.id, field, value);
    // If updating the ID, also update selectedId to maintain selection
    if (field === 'id') {
      selectedId = value;
    }
  }

  /**
   * Updates the section configuration of the selected component.
   */
  function updateSection(partial: Partial<import('./types').Section>): void {
    if (!selected) return;
    components = updateComponentSection(components, selected.id, partial);
  }

  /**
   * Updates the section styling based on simplified UI settings.
   */
  function updateSectionStyle(partial: Partial<SectionSettingsData>): void {
    if (!selected) return;
    components = updateSectionStyle(components, selected.id, partial);
    components = components.map(c => c.id === selected!.id ? applyBlocksToHtml(c) : c);
  }

  /**
   * Adds a new block to the selected component's section.
   */
  function addBlock(): void {
    if (!selected) return;
    components = addBlockToSection(components, selected.id);
    components = components.map(c => c.id === selected!.id ? applyBlocksToHtml(c) : c);
  }

  /**
   * Updates a block at the specified index in the selected component's section.
   */
  function updateBlock(index: number, partial: Partial<import('./types').Block>): void {
    if (!selected) return;
    components = updateBlockInSection(components, selected.id, index, partial);
    components = components.map(c => c.id === selected!.id ? applyBlocksToHtml(c) : c);
  }

  /**
   * Deletes a block at the specified index from the selected component's section.
   */
  function deleteBlockAt(index: number): void {
    if (!selected) return;
    components = deleteBlockFromSection(components, selected.id, index);
    components = components.map(c => c.id === selected!.id ? applyBlocksToHtml(c) : c);
  }

  /**
   * Moves a block from one index to another within the selected component's section.
   */
  function moveBlock(fromIndex: number, toIndex: number): void {
    if (!selected) return;
    components = moveBlockInSection(components, selected.id, fromIndex, toIndex);
    components = components.map(c => c.id === selected!.id ? applyBlocksToHtml(c) : c);
  }

  /**
   * Saves only the currently selected component to the server via API call.
   */
  async function save(): Promise<void> {
    if (!selected) {
      alert('No component selected');
      return;
    }

    // Store the current selection to ensure it's maintained
    const currentSelectedId: string = selected.id;

    const res: Response = await fetch('/api/components', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(selected)
    });

    if (!res.ok) {
      try {
        const errorData = await res.json();
        alert(`Failed to save component: ${errorData.error || 'Unknown error'}`);
      } catch {
        alert(`Failed to save component: HTTP ${res.status}`);
      }
      return;
    }

    // Reload components from server to ensure local state is synced
    try {
      const reloadRes: Response = await fetch('/api/components');
      if (reloadRes.ok) {
        components = await reloadRes.json();
      }
    } catch (error) {
      console.error('Failed to reload components after save:', error);
    }

    // Ensure selection is maintained after save
    selectedId = currentSelectedId;

    alert(`Component "${selected.name}" saved`);
  }

  /**
   * Permanently deletes the currently selected component and saves the change to database.
   */
  async function deleteSelected(): Promise<void> {
    if (!selected) return;
    if (!confirm(`Permanently delete component "${selected.name}" (${selected.id})?`)) return;

    const idx: number = components.findIndex((c: Component) => c.id === selected.id);
    if (idx !== -1) {
      // Remove component from local state
      components.splice(idx, 1);

      // Save the updated components array to database
      try {
        const res: Response = await fetch('/api/components', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(components)
        });

        if (!res.ok) {
          alert('Failed to delete component - changes not saved');
          // Restore the component if save failed
          components.splice(idx, 0, selected);
          return;
        }

        // Choose a new selection if any components remain
        selectedId = components[0]?.id ?? '';
        alert(`Component "${selected.name}" permanently deleted`);
      } catch (error) {
        console.error('Failed to delete component:', error);
        alert('Failed to delete component - changes not saved');
        // Restore the component if save failed
        components.splice(idx, 0, selected);
      }
    }
  }

  /**
   * Sets which component should show the image selector modal.
   */
  function setShowImageSelectorFor(id: string | null): void {
    imageSelectorState.showImageSelectorFor = id;
  }

  /**
   * Sets which block index should show the image selector modal.
   */
  function setShowImageSelectorForBlock(index: number | null): void {
    imageSelectorState.showImageSelectorForBlock = index;
  }

  /**
   * Sets which nested block should show the image selector modal.
   */
  function setShowImageSelectorForNestedBlock(parentIndex: number | null, nestedIndex: number | null): void {
    if (parentIndex === null || nestedIndex === null) {
      imageSelectorState.showImageSelectorForNestedBlock = null;
    } else {
      imageSelectorState.showImageSelectorForNestedBlock = { parentIndex, nestedIndex };
    }
  }

  /**
   * Adds a nested block to a layout block at the specified parent index.
   */
  function addNestedBlock(parentIndex: number, blockType: import('./types').Block['type'] = 'text'): void {
    if (!selected) return;
    components = addNestedBlockToLayout(components, selected.id, parentIndex, blockType);
    components = components.map(c => c.id === selected!.id ? applyBlocksToHtml(c) : c);
  }

  /**
   * Updates a nested block within a layout block.
   */
  function updateNestedBlock(parentIndex: number, nestedIndex: number, partial: Partial<import('./types').Block>): void {
    if (!selected) return;
    components = updateNestedBlockInLayout(components, selected.id, parentIndex, nestedIndex, partial);
    components = components.map(c => c.id === selected!.id ? applyBlocksToHtml(c) : c);
  }

  /**
   * Deletes a nested block from a layout block.
   */
  function deleteNestedBlockAt(parentIndex: number, nestedIndex: number): void {
    if (!selected) return;
    components = deleteNestedBlockFromLayout(components, selected.id, parentIndex, nestedIndex);
    components = components.map(c => c.id === selected!.id ? applyBlocksToHtml(c) : c);
  }
</script>

<main class="max-w-7xl mx-auto py-8 px-4">
  <h1 class="text-2xl font-bold mb-6 fixed top-10  z-50 bg-white">Components Editor</h1>

  <div class="flex gap-6 mt-10 ">
    <aside class="w-1/2 pr-4">
      {#if selected}
      <section class="flex-1 space-y-4">
        <ComponentEditor {selected} {updateSelected} {applyBlocksToHtml} />

        <SectionSettings
          {sectionSettings}
          {updateSectionStyle}
          {selected}
          {loadAvailableImages}
          {availableImages}
          showImageSelectorFor={imageSelectorState.showImageSelectorFor}
          setShowImageSelectorFor={setShowImageSelectorFor}
        />

        <BlocksEditor
          {selected}
          blockTypes={BLOCK_TYPES}
          {addBlock}
          {updateBlock}
          {deleteBlockAt}
          {moveBlock}
          {loadAvailableImages}
          {availableImages}
          showImageSelectorForBlock={imageSelectorState.showImageSelectorForBlock}
          setShowImageSelectorForBlock={setShowImageSelectorForBlock}
          showImageSelectorForNestedBlock={imageSelectorState.showImageSelectorForNestedBlock}
          setShowImageSelectorForNestedBlock={setShowImageSelectorForNestedBlock}
          {addNestedBlock}
          {updateNestedBlock}
          {deleteNestedBlockAt}
        />
      </section>
    {/if}
    </aside>
    <div class="w-1/2 border-l pl-4 fixed left-1/2 right-0 overflow-y-auto max-h-screen px-6">
      <ComponentList {components} {selectedId} {addComponent} onSelect={(id) => selectedId = id} />
      {#if selected}
        <Preview {selected}/>

        <div class="pt-4 flex gap-3">
          <button class="px-4 py-2 bg-teal-600 text-white rounded" onclick={(e) => { e.preventDefault(); save(); }}>
            Save Component
          </button>
          <button class="px-4 py-2 bg-red-600 text-white rounded" onclick={(e) => { e.preventDefault(); deleteSelected(); }}>
            Delete
          </button>
        </div>
      {/if}
    </div>
  </div>
</main>