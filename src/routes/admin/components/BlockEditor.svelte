<script>
  let { block, index, updateBlock, deleteBlockAt, moveBlock, totalBlocks, loadAvailableImages, availableImages, showImageSelectorForBlock, setShowImageSelectorForBlock } = $props();
</script>

<div class="border rounded p-3 space-y-2 bg-white">
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-2">
      <span class="text-xs text-gray-500">#{index + 1}</span>
      <select
        class="border px-2 py-1 rounded text-sm"
        value={block.type}
        oninput={(e) => updateBlock(index, { type: e.target.value })}
      >
        <option value="heading">Heading</option>
        <option value="text">Text</option>
        <option value="image">Image</option>
        <option value="button">Button</option>
      </select>
    </div>
    <div class="flex gap-1">
      <button
        class="px-2 py-1 text-xs border rounded"
        onclick={(e) => { e.preventDefault(); moveBlock(index, -1); }}
        disabled={index === 0}
      >
        ↑
      </button>
      <button
        class="px-2 py-1 text-xs border rounded"
        onclick={(e) => { e.preventDefault(); moveBlock(index, 1); }}
        disabled={index === totalBlocks - 1}
      >
        ↓
      </button>
      <button
        class="px-2 py-1 text-xs bg-red-100 text-red-700 rounded"
        onclick={(e) => { e.preventDefault(); deleteBlockAt(index); }}
      >
        Remove
      </button>
    </div>
  </div>

  {#if block.type === 'heading'}
    <div class="flex flex-wrap gap-3 items-center mb-2">
      <div class="flex gap-2 items-center">
        <label for="block-level-{index}" class="text-xs text-gray-600">Level</label>
        <select
          id="block-level-{index}"
          class="border px-2 py-1 rounded text-sm"
          value={block.level ?? 2}
          oninput={(e) => updateBlock(index, { level: Number(e.target.value) })}
        >
          <option value={1}>H1</option>
          <option value={2}>H2</option>
          <option value={3}>H3</option>
          <option value={4}>H4</option>
        </select>
      </div>
      <div class="flex gap-1 items-center text-xs text-gray-600">
        <label for="block-heading-align-{index}" class="text-xs text-gray-600">Align</label>
        <select
          id="block-heading-align-{index}"
          class="border px-2 py-1 rounded text-xs"
          value={block.align ?? 'left'}
          oninput={(e) => updateBlock(index, { align: e.target.value })}
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </div>
      <div class="flex gap-1 items-center text-xs text-gray-600">
        <label for="block-heading-color-{index}" class="text-xs text-gray-600">Color</label>
        <select
          id="block-heading-color-{index}"
          class="border px-2 py-1 rounded text-xs"
          value={block.color ?? 'black'}
          oninput={(e) => updateBlock(index, { color: e.target.value })}
        >
          <option value="black">Black</option>
          <option value="gray">Gray</option>
          <option value="white">White</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="teal">Teal</option>
        </select>
      </div>
    </div>
    <input
      id="block-heading-text-{index}"
      class="w-full border px-2 py-1 rounded text-sm"
      placeholder="Heading text"
      value={block.text ?? ''}
      oninput={(e) => updateBlock(index, { text: e.target.value })}
    />
  {:else if block.type === 'text'}
    <div class="flex flex-wrap gap-3 mb-2 text-xs text-gray-600 items-center">
      <div class="flex gap-1 items-center">
        <label for="block-text-align-{index}" class="text-xs text-gray-600">Align</label>
        <select
          id="block-text-align-{index}"
          class="border px-2 py-1 rounded text-xs"
          value={block.align ?? 'left'}
          oninput={(e) => updateBlock(index, { align: e.target.value })}
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </div>
      <div class="flex gap-1 items-center">
        <label for="block-text-color-{index}" class="text-xs text-gray-600">Color</label>
        <select
          id="block-text-color-{index}"
          class="border px-2 py-1 rounded text-xs"
          value={block.color ?? 'gray'}
          oninput={(e) => updateBlock(index, { color: e.target.value })}
        >
          <option value="gray">Gray</option>
          <option value="black">Black</option>
          <option value="white">White</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="teal">Teal</option>
        </select>
      </div>
    </div>
    <textarea
      id="block-text-{index}"
      class="w-full border px-2 py-1 rounded text-sm h-24"
      placeholder="Paragraph text"
      value={block.text ?? ''}
      oninput={(e) => updateBlock(index, { text: e.target.value })}
    ></textarea>
  {:else if block.type === 'image'}
    <div class="flex flex-wrap gap-3 mb-2 text-xs text-gray-600 items-center">
      <div class="flex gap-1 items-center">
        <label for="block-image-align-{index}" class="text-xs text-gray-600">Align</label>
        <select
          id="block-image-align-{index}"
          class="border px-2 py-1 rounded text-xs"
          value={block.align ?? 'left'}
          oninput={(e) => updateBlock(index, { align: e.target.value })}
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </div>
      <div class="flex gap-2 items-center">
        <label for="block-image-width-{index}" class="text-xs text-gray-600">Width</label>
        <input
          id="block-image-width-{index}"
          type="range"
          min="25"
          max="100"
          step="25"
          value={block.widthPercent ?? 100}
          oninput={(e) => updateBlock(index, { widthPercent: Number(e.target.value) })}
        />
        <span>{block.widthPercent ?? 100}%</span>
      </div>
    </div>
    <input
      id="block-image-src-{index}"
      class="w-full border px-2 py-1 rounded text-sm mb-2"
      placeholder="Image src (e.g. /my-image.jpg)"
      value={block.src ?? ''}
      oninput={(e) => updateBlock(index, { src: e.target.value })}
    />
    <input
      id="block-image-alt-{index}"
      class="w-full border px-2 py-1 rounded text-sm"
      placeholder="Alt text"
      value={block.alt ?? ''}
      oninput={(e) => updateBlock(index, { alt: e.target.value })}
    />
    <div class="mt-2">
      <button
        class="px-3 py-1.5 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
        onclick={async () => {
          if (showImageSelectorForBlock !== index) {
            await loadAvailableImages();
            setShowImageSelectorForBlock(index);
          } else {
            setShowImageSelectorForBlock(null);
          }
        }}
      >
        {showImageSelectorForBlock === index ? 'Hide' : 'Choose'} from existing images
      </button>
    </div>
    {#if showImageSelectorForBlock === index}
      <div class="border rounded p-2 max-h-48 overflow-y-auto bg-gray-50 mt-2">
        {#if availableImages.length > 0}
          {#each availableImages as img}
            <button
              class="block w-full text-left text-xs p-2 hover:bg-white rounded border-b last:border-b-0"
              onclick={() => {
                updateBlock(index, { src: img.url });
                setShowImageSelectorForBlock(null);
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
  {:else if block.type === 'button'}
    <div class="flex gap-2 items-center mb-2 text-xs text-gray-600">
      <label for="block-button-align-{index}" class="text-xs text-gray-600">Align</label>
      <select
        id="block-button-align-{index}"
        class="border px-2 py-1 rounded text-xs"
        value={block.align ?? 'left'}
        oninput={(e) => updateBlock(index, { align: e.target.value })}
      >
        <option value="left">Left</option>
        <option value="center">Center</option>
        <option value="right">Right</option>
      </select>
    </div>
    <input
      id="block-button-label-{index}"
      class="w-full border px-2 py-1 rounded text-sm mb-2"
      placeholder="Button label"
      value={block.label ?? ''}
      oninput={(e) => updateBlock(index, { label: e.target.value })}
    />
    <input
      id="block-button-href-{index}"
      class="w-full border px-2 py-1 rounded text-sm"
      placeholder="Link href (e.g. /contact)"
      value={block.href ?? ''}
      oninput={(e) => updateBlock(index, { href: e.target.value })}
    />
  {/if}
</div>