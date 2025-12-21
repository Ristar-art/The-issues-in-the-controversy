 <script>
    let { block, index, updateBlock, deleteBlockAt, moveBlock, totalBlocks, loadAvailableImages, availableImages, showImageSelectorForBlock, setShowImageSelectorForBlock, showImageSelectorForNestedBlock, setShowImageSelectorForNestedBlock, addNestedBlock, updateNestedBlock, deleteNestedBlockAt } = $props();

    function insertText(prefix, suffix, placeholder) {
        const textarea = document.getElementById(`block-text-${index}`);
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = block.text ?? '';
        const before = text.substring(0, start);
        const selected = text.substring(start, end);
        const after = text.substring(end);
        const newText = before + prefix + (selected || placeholder) + suffix + after;
        updateBlock(index, { text: newText });
        setTimeout(() => {
            textarea.selectionStart = textarea.selectionEnd = start + prefix.length + (selected ? selected.length : placeholder.length);
            textarea.focus();
        }, 0);
    }

    function insertBold() {
        insertText('**', '**', 'bold text');
    }

    function insertItalic() {
        insertText('*', '*', 'italic text');
    }

    function insertBullet() {
        insertText('- ', '\n', 'list item');
    }

    function insertNumber() {
        insertText('1. ', '\n', 'list item');
    }

    function insertLink() {
        const textarea = document.getElementById(`block-text-${index}`);
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = block.text ?? '';
        const before = text.substring(0, start);
        const selected = text.substring(start, end);
        const after = text.substring(end);
        const newText = before + `[${selected || 'link text'}](url)` + after;
        updateBlock(index, { text: newText });
        setTimeout(() => {
            textarea.selectionStart = start + (selected ? selected.length + 3 : 13);
            textarea.selectionEnd = start + (selected ? selected.length + 6 : 16);
            textarea.focus();
        }, 0);
    }
 </script>

 <div class="border rounded p-3 space-y-2 bg-white" data-testid={`block-editor-${index}`}>
   <p class="sr-only">Block #{index + 1} - {block.type}</p>
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
         <option value="layout">Layout Container</option>
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
     <div class="flex gap-1 mb-2">
       <button
         type="button"
         class="px-2 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded"
         onclick={insertBold}
       >
         <strong>B</strong>
       </button>
       <button
         type="button"
         class="px-2 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded italic"
         onclick={insertItalic}
       >
         <em>I</em>
       </button>
       <button
         type="button"
         class="px-2 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded"
         onclick={insertBullet}
       >
         •
       </button>
       <button
         type="button"
         class="px-2 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded"
         onclick={insertNumber}
       >
         1.
       </button>
       <button
         type="button"
         class="px-2 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded"
         onclick={insertLink}
       >
         🔗
       </button>
     </div>
     <textarea
       id="block-text-{index}"
       class="w-full border px-2 py-1 rounded text-sm h-24"
       placeholder="Paragraph text (supports **bold**, *italic*, - lists, 1. lists, [text](url))"
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
   {:else if block.type === 'layout'}
     <div class="flex flex-wrap gap-3 mb-2 text-xs text-gray-600 items-center">
       <div class="flex gap-1 items-center">
         <label for="block-layout-type-{index}" class="text-xs text-gray-600">Layout</label>
         <select
           id="block-layout-type-{index}"
           class="border px-2 py-1 rounded text-xs"
           value={block.layout ?? 'linear'}
           oninput={(e) => updateBlock(index, { layout: e.target.value })}
         >
           <option value="linear">Linear</option>
           <option value="grid">Grid</option>
         </select>
       </div>
       {#if block.layout === 'grid'}
         <div class="flex gap-2 items-center">
           <label for="block-layout-columns-{index}" class="text-xs text-gray-600">Columns</label>
           <select
             id="block-layout-columns-{index}"
             class="border px-2 py-1 rounded text-xs"
             value={block.columns ?? 2}
             oninput={(e) => updateBlock(index, { columns: Number(e.target.value) })}
           >
             <option value={1}>1</option>
             <option value={2}>2</option>
             <option value={3}>3</option>
             <option value={4}>4</option>
           </select>
         </div>
       {/if}
     </div>
     <div class="border-l-4 border-gray-300 pl-4">
       <div class="flex items-center justify-between mb-2">
         <p class="text-xs text-gray-500">Nested blocks</p>
         <div class="space-x-1">
           <button
             class="px-2 py-1 text-xs bg-teal-600 text-white rounded"
             onclick={(e) => { e.preventDefault(); addNestedBlock(index, 'text'); }}
           >
             + Text
           </button>
           <button
             class="px-2 py-1 text-xs bg-blue-600 text-white rounded"
             onclick={(e) => { e.preventDefault(); addNestedBlock(index, 'heading'); }}
           >
             + Heading
           </button>
           <button
             class="px-2 py-1 text-xs bg-green-600 text-white rounded"
             onclick={(e) => { e.preventDefault(); addNestedBlock(index, 'image'); }}
           >
             + Image
           </button>
         </div>
       </div>
       {#if block.blocks && block.blocks.length}
         <div class="space-y-2">
           {#each block.blocks as nestedBlock, nestedIndex}
             <div class="border rounded p-2 bg-gray-50">
               <div class="flex items-center justify-between mb-1">
                 <span class="text-xs font-medium">{nestedIndex + 1}. {nestedBlock.type}</span>
                 <button
                   class="px-1 py-0.5 text-xs bg-red-500 text-white rounded"
                   onclick={(e) => { e.preventDefault(); deleteNestedBlockAt(index, nestedIndex); }}
                 >
                   ×
                 </button>
               </div>
{#if nestedBlock.type === 'heading' || nestedBlock.type === 'text'}
                  <div class="flex flex-wrap gap-2 mb-1 text-xs text-gray-600 items-center">
                    <div class="flex gap-1 items-center">
                      <label for="nested-block-align-{index}-{nestedIndex}" class="text-xs text-gray-600">Align</label>
                      <select
                        id="nested-block-align-{index}-{nestedIndex}"
                        class="border px-1 py-0.5 rounded text-xs"
                        value={nestedBlock.align ?? 'left'}
                        oninput={(e) => updateNestedBlock(index, nestedIndex, { align: e.target.value })}
                      >
                        <option value="left">Left</option>
                        <option value="center">Center</option>
                        <option value="right">Right</option>
                      </select>
                    </div>
                    <div class="flex gap-1 items-center">
                      <label for="nested-block-color-{index}-{nestedIndex}" class="text-xs text-gray-600">Color</label>
                      <select
                        id="nested-block-color-{index}-{nestedIndex}"
                        class="border px-1 py-0.5 rounded text-xs"
                        value={nestedBlock.color ?? (nestedBlock.type === 'heading' ? 'black' : 'gray')}
                        oninput={(e) => updateNestedBlock(index, nestedIndex, { color: e.target.value })}
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
                    class="w-full border px-2 py-1 rounded text-xs"
                    placeholder="Text content"
                    value={nestedBlock.text ?? ''}
                    oninput={(e) => updateNestedBlock(index, nestedIndex, { text: e.target.value })}
                  />
{:else if nestedBlock.type === 'image'}
                   <div class="flex flex-wrap gap-2 mb-1 text-xs text-gray-600 items-center">
                     <div class="flex gap-1 items-center">
                       <label for="nested-image-align-{index}-{nestedIndex}" class="text-xs text-gray-600">Align</label>
                       <select
                         id="nested-image-align-{index}-{nestedIndex}"
                         class="border px-1 py-0.5 rounded text-xs"
                         value={nestedBlock.align ?? 'left'}
                         oninput={(e) => updateNestedBlock(index, nestedIndex, { align: e.target.value })}
                       >
                         <option value="left">Left</option>
                         <option value="center">Center</option>
                         <option value="right">Right</option>
                       </select>
                     </div>
                   </div>
                   <input
                     class="w-full border px-2 py-1 rounded text-xs"
                     placeholder="Image src"
                     value={nestedBlock.src ?? ''}
                     oninput={(e) => updateNestedBlock(index, nestedIndex, { src: e.target.value })}
                   />
                  <div class="mt-1">
                    <button
                      class="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                      onclick={async () => {
                        if (!showImageSelectorForNestedBlock ||
                            showImageSelectorForNestedBlock.parentIndex !== index ||
                            showImageSelectorForNestedBlock.nestedIndex !== nestedIndex) {
                          await loadAvailableImages();
                          setShowImageSelectorForNestedBlock(index, nestedIndex);
                        } else {
                          setShowImageSelectorForNestedBlock(null, null);
                        }
                      }}
                    >
                      {showImageSelectorForNestedBlock &&
                       showImageSelectorForNestedBlock.parentIndex === index &&
                       showImageSelectorForNestedBlock.nestedIndex === nestedIndex ? 'Hide' : 'Choose'} from existing images
                    </button>
                  </div>
                  {#if showImageSelectorForNestedBlock &&
                      showImageSelectorForNestedBlock.parentIndex === index &&
                      showImageSelectorForNestedBlock.nestedIndex === nestedIndex}
                    <div class="border rounded p-2 max-h-32 overflow-y-auto bg-gray-50 mt-1">
                      {#if availableImages.length > 0}
                        {#each availableImages as img}
                          <button
                            class="block w-full text-left text-xs p-1 hover:bg-white rounded border-b last:border-b-0"
                            onclick={() => {
                              updateNestedBlock(index, nestedIndex, { src: img.url });
                              setShowImageSelectorForNestedBlock(null, null);
                            }}
                          >
                            📷 {img.name}
                          </button>
                        {/each}
                      {:else}
                        <p class="text-xs text-gray-500 p-1">No images available yet</p>
                      {/if}
                    </div>
                  {/if}
                {/if}
             </div>
           {/each}
         </div>
       {:else}
         <p class="text-xs text-gray-400 italic">No nested blocks yet. Click the buttons above to add some.</p>
       {/if}
     </div>
   {/if}
</div>