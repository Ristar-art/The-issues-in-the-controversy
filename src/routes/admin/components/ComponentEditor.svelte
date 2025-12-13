<script>
  let { selected, updateSelected, applyBlocksToHtml } = $props();
</script>

{#if selected}
  <div class="space-y-4">
    <div>
      <label for="component-id" class="block text-sm font-medium mb-1">ID</label>
      <input
        id="component-id"
        class="w-full border px-2 py-1 rounded"
        value={selected.id}
        oninput={(e) => updateSelected('id', e.target.value)}
      />
    </div>

    <div>
      <label for="component-name" class="block text-sm font-medium mb-1">Name</label>
      <input
        id="component-name"
        class="w-full border px-2 py-1 rounded"
        value={selected.name}
        oninput={(e) => updateSelected('name', e.target.value)}
      />
    </div>

    <div>
      <label for="component-html" class="block text-sm font-medium mb-1">HTML</label>
      <textarea
        id="component-html"
        class="w-full border px-2 py-1 rounded font-mono text-sm h-48"
        value={selected.html}
        oninput={(e) => updateSelected('html', e.target.value)}
      ></textarea>
      <div class="mt-2 flex gap-2 text-sm">
        <button
          class="px-3 py-1 bg-gray-200 rounded"
          onclick={(e) => { e.preventDefault(); applyBlocksToHtml(); }}
        >
          Apply blocks to HTML
        </button>
        <span class="text-gray-500">(generates HTML from the blocks below)</span>
      </div>
    </div>
  </div>
{/if}