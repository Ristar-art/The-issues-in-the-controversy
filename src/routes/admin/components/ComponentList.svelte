<script>
  let { components, selectedId, addComponent, onSelect } = $props();
</script>

<div class="flex items-center justify-between mb-4">
  <h2 class="font-semibold">Components</h2>
  <button class="px-2 py-1 text-sm bg-teal-600 text-white rounded" onclick={addComponent}>
    + Add
  </button>
</div>
<ul class="space-y-1">
  {#each components as c}
    <li>
      <button
        class={`w-full text-left px-2 py-1 rounded ${c.id === selectedId ? 'bg-teal-100' : ''}`}
        onclick={() => onSelect(c.id)}
      >
        {c.name} ({c.id})
      </button>
    </li>
  {/each}
</ul>