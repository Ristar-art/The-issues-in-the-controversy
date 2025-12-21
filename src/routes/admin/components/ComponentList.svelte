<script>
  let { components, selectedId, addComponent, onSelect } = $props();
</script>

<div class="flex items-center justify-between mb-4">
  <h2 class="font-semibold mr-2">Components</h2>
  <select class="w-full px-2 py-1 border rounded" onchange={(e) => onSelect(e.target.value)}>
  {#if selectedId === null || selectedId === undefined}
    <option value="" selected disabled hidden>Select a component...</option>
  {/if}
  {#each components as c}
    <option value={c.id} selected={c.id === selectedId}>
      {c.name} ({c.id})
    </option>
  {/each}
</select>
  <button class="px-2 py-1 text-sm bg-teal-600 text-white rounded ml-2 w-24" onclick={addComponent}>
    + Add
  </button>
</div>
