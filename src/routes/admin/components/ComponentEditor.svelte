<script>
  let { selected = null, updateSelected, applyBlocksToHtml } = $props();
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
       <div class="mt-2 text-sm">
         <span class="text-gray-500">(HTML is automatically generated from the blocks below)</span>
       </div>
     </div>
  </div>
{/if}