<script>
  let { selected } = $props();
</script>

<div class="mt-6 border-t pt-4">
  <h2 class="font-semibold mb-2">Preview</h2>
  <div class="border p-4">
    {@html selected ? (selected.html ?? String(selected.html)) : ''}
  </div>
</div>