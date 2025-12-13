<script>
  let {
    sectionSettings,
    updateSectionStyle,
    selected,
    loadAvailableImages,
    availableImages,
    showImageSelectorFor,
    setShowImageSelectorFor
  } = $props();
</script>

<div class="pt-4 border-t mt-4">
  <div class="mb-4 space-y-2 text-sm">
    <h2 class="font-semibold">Section layout (visual)</h2>
    <div class="flex flex-wrap gap-4 text-xs text-gray-600">
      <div>
        <label for="section-background" class="block mb-1">Background</label>
        <select
          id="section-background"
          class="border px-2 py-1 rounded text-xs"
          value={sectionSettings.background}
          oninput={(e) => updateSectionStyle({ background: e.target.value })}
        >
          <option value="white">White</option>
          <option value="gray">Light gray</option>
          <option value="teal">Teal</option>
          <option value="image">Image</option>
        </select>
        {#if sectionSettings.background === 'image'}
          <input
            id="section-background-image"
            class="w-full border px-2 py-1 rounded text-xs mt-1"
            placeholder="Background image URL"
            value={sectionSettings.backgroundImage}
            oninput={(e) => updateSectionStyle({ backgroundImage: e.target.value })}
          />
          <div class="mt-2 space-y-2">
            <div>
              <label class="block text-xs text-gray-600 mb-1">Upload new image:</label>
              <input
                id="section-background-file"
                type="file"
                accept="image/*"
                class="text-xs w-full"
                onchange={async (e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  const formData = new FormData();
                  formData.append('image', file);
                  try {
                    const res = await fetch('/api/upload-image', {
                      method: 'POST',
                      body: formData
                    });
                    const data = await res.json();
                    if (res.ok) {
                      updateSectionStyle({ backgroundImage: data.url });
                    } else {
                      alert('Upload failed: ' + data.error);
                    }
                  } catch (error) {
                    alert('Upload error: ' + error.message);
                  }
                }}
              />
            </div>
            <div>
              <button
                class="px-3 py-1.5 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                onclick={async () => {
                  if (showImageSelectorFor !== selected.id) {
                    await loadAvailableImages();
                    setShowImageSelectorFor(selected.id);
                  } else {
                    setShowImageSelectorFor(null);
                  }
                }}
              >
                {showImageSelectorFor === selected.id ? 'Hide' : 'Choose'} from existing images
              </button>
            </div>
            {#if showImageSelectorFor === selected.id}
              <div class="border rounded p-2 max-h-48 overflow-y-auto bg-gray-50">
                {#if availableImages.length > 0}
                  {#each availableImages as img}
                    <button
                      class="block w-full text-left text-xs p-2 hover:bg-white rounded border-b last:border-b-0"
                      onclick={() => {
                        updateSectionStyle({ backgroundImage: img.url });
                        setShowImageSelectorFor(null);
                      }}
                    >
                      📷 {img.name}
                    </button>
                  {/each}
                {:else}
                  <p class="text-xs text-gray-500 p-2">No images available yet</p>
                {/if}
              </div>
            {/if}
          </div>
        {/if}
      </div>
      <div>
        <label for="section-width" class="block mb-1">Width</label>
        <select
          id="section-width"
          class="border px-2 py-1 rounded text-xs"
          value={sectionSettings.width}
          oninput={(e) => updateSectionStyle({ width: e.target.value })}
        >
          <option value="boxed">Boxed</option>
          <option value="full">Full width</option>
        </select>
      </div>
      <div>
        <label for="section-padding" class="block mb-1">Padding</label>
        <select
          id="section-padding"
          class="border px-2 py-1 rounded text-xs"
          value={sectionSettings.padding}
          oninput={(e) => updateSectionStyle({ padding: e.target.value })}
        >
          <option value="normal">Normal</option>
          <option value="large">Large</option>
        </select>
      </div>
    </div>
  </div>
</div>