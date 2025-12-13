<script>
  import BlockEditor from './BlockEditor.svelte';

  let { selected, blockTypes, addBlock, updateBlock, deleteBlockAt, moveBlock, loadAvailableImages, availableImages, showImageSelectorForBlock, setShowImageSelectorForBlock } = $props();
</script>

<div class="flex items-center justify-between mb-2">
  <h2 class="font-semibold">Blocks (visual builder)</h2>
  <div class="space-x-2">
    <button
      class="px-3 py-1 text-sm bg-teal-600 text-white rounded"
      onclick={(e) => { e.preventDefault(); addBlock(); }}
    >
      + Add block
    </button>
  </div>
</div>

  {#if selected.section && selected.section.blocks && selected.section.blocks.length}
    <ul class="space-y-3">
      {#each selected.section.blocks as block, i}
        <li>
        <BlockEditor
          {block}
          index={i}
          totalBlocks={selected.section.blocks.length}
          {updateBlock}
          {deleteBlockAt}
          {moveBlock}
          {loadAvailableImages}
          {availableImages}
          {showImageSelectorForBlock}
          {setShowImageSelectorForBlock}
        />
        </li>
      {/each}
    </ul>
  {:else}
    <p class="text-sm text-gray-500">No blocks yet. Click "Add block" to start building this component visually.</p>
  {/if}