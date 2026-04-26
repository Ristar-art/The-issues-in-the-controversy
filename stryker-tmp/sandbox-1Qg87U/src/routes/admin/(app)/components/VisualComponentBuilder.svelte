<script>
  import QuillBlock from '../editorial/[slug]/QuillBlock.svelte';

  let { component, onSave, onCancel } = $props();
  
  // Editor mode: 'visual' or 'code'
  let editorMode = $state('visual');
  
  // Block types for visual builder
  const blockTypes = [
    { type: 'heading', label: 'Heading', icon: 'H' },
    { type: 'text', label: 'Text', icon: 'T' },
    { type: 'image', label: 'Image', icon: '📷' },
    { type: 'button', label: 'Button', icon: '🔘' },
    { type: 'divider', label: 'Line', icon: '―' },
    { type: 'layout', label: 'Layout', icon: '⊞' }
  ];
  
  // Initialize blocks from component data or empty array
  let blocks = $state(component.blocks || []);
  
  // Component metadata
  let componentName = $state(component.name || '');
  let componentDescription = $state(component.description || '');
  let componentCategory = $state(component.category || 'custom');
  
  // HTML content for code mode (synced with blocks)
  let htmlContent = $state(component.html || '');
  
  // Background settings
  let backgroundColor = $state(component.backgroundColor || '');
  let backgroundImage = $state(component.backgroundImage || '');
  let backgroundSize = $state(component.backgroundSize || 'cover');
  let backgroundPosition = $state(component.backgroundPosition || 'center');
  let componentMinHeight = $state(component.minHeight || '');
  let showBgColorPicker = $state(false);
  
  // Color palette
  const colorPalette = [
    { name: 'Yellow', hex: '#FFFF00' },
    { name: 'Lime', hex: '#00FF00' },
    { name: 'Cyan', hex: '#00FFFF' },
    { name: 'Magenta', hex: '#FF00FF' },
    { name: 'Pink', hex: '#FFC0CB' },
    { name: 'Orange', hex: '#FFA500' },
    { name: 'Red', hex: '#FF0000' },
    { name: 'Brown', hex: '#A52A2A' },
    { name: 'Maroon', hex: '#800000' },
    { name: 'Dark Green', hex: '#006400' },
    { name: 'Olive', hex: '#808000' },
    { name: 'Teal', hex: '#008080' },
    { name: 'Navy', hex: '#000080' },
    { name: 'Purple', hex: '#800080' },
    { name: 'Indigo', hex: '#4B0082' },
    { name: 'Light Blue', hex: '#ADD8E6' },
    { name: 'Light Green', hex: '#90EE90' },
    { name: 'Light Yellow', hex: '#FFFFE0' },
    { name: 'Light Pink', hex: '#FFB6C1' },
    { name: 'Gold', hex: '#FFD700' },
    { name: 'Silver', hex: '#C0C0C0' },
    { name: 'Coral', hex: '#FF7F50' },
    { name: 'Salmon', hex: '#FA8072' },
    { name: 'Khaki', hex: '#F0E68C' },
    { name: 'Lavender', hex: '#E6E6FA' },
    { name: 'Plum', hex: '#DDA0DD' },
    { name: 'Turquoise', hex: '#40E0D0' },
    { name: 'Tan', hex: '#D2B48C' },
    { name: 'Beige', hex: '#F5F5DC' },
    { name: 'Mint', hex: '#98FF98' },
    { name: 'Sky Blue', hex: '#87CEEB' },
    { name: 'Peach', hex: '#FFDAB9' },
    { name: 'Periwinkle', hex: '#CCCCFF' },
    { name: 'Sage', hex: '#B2AC88' },
    { name: 'Crimson', hex: '#DC143C' },
    { name: 'Violet', hex: '#EE82EE' },
    { name: 'Amber', hex: '#FFBF00' },
    { name: 'Rose', hex: '#FF007F' }
  ];
  

  
  // Open gallery picker popup and return a promise with the selected URL
  function openGalleryPicker() {
    return new Promise((resolve) => {
      const popup = window.open('/admin/gallery?picker=true', 'gallery-picker', 'width=900,height=650');
      function onMessage(e) {
        if (e.data?.type === 'gallery-pick') {
          window.removeEventListener('message', onMessage);
          resolve(e.data.url);
        }
      }
      window.addEventListener('message', onMessage);
      // If popup is closed without picking
      const check = setInterval(() => {
        if (popup?.closed) {
          clearInterval(check);
          window.removeEventListener('message', onMessage);
          resolve(null);
        }
      }, 500);
    });
  }

  // Add a new block
  function addBlock(type) {
    const newBlock = { type };
    
    switch (type) {
      case 'heading':
        newBlock.text = '';
        newBlock.level = 2;
        newBlock.align = 'left';
        newBlock.color = '#111827';
        break;
      case 'text':
        newBlock.text = '';
        newBlock.align = 'left';
        newBlock.color = '#374151';
        break;
      case 'image':
        newBlock.src = '';
        newBlock.alt = '';
        newBlock.align = 'center';
        newBlock.widthPercent = 100;
        break;
      case 'button':
        newBlock.label = '';
        newBlock.href = '';
        newBlock.align = 'left';
        break;
      case 'divider':
        newBlock.style = 'solid';
        newBlock.width = 100;
        newBlock.thickness = 1;
        newBlock.color = '#d1d5db';
        newBlock.align = 'center';
        break;
      case 'layout':
        newBlock.layout = 'linear';
        newBlock.columns = 2;
        newBlock.justifyItems = 'center';
        newBlock.blocks = [];
        break;
    }
    
    blocks = [...blocks, newBlock];
    generateHtmlFromBlocks();
  }
  
  // Update a block
  function updateBlock(index, updates) {
    blocks = blocks.map((block, i) => 
      i === index ? { ...block, ...updates } : block
    );
    generateHtmlFromBlocks();
  }
  
  // Delete a block
  function deleteBlock(index) {
    blocks = blocks.filter((_, i) => i !== index);
    generateHtmlFromBlocks();
  }
  
  // Move a block up or down
  function moveBlock(index, direction) {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= blocks.length) return;
    
    const newBlocks = [...blocks];
    [newBlocks[index], newBlocks[newIndex]] = [newBlocks[newIndex], newBlocks[index]];
    blocks = newBlocks;
    generateHtmlFromBlocks();
  }
  
  // Add nested block to layout
  function addNestedBlock(parentIndex, type) {
    const parent = blocks[parentIndex];
    if (!parent.blocks) parent.blocks = [];
    
    const newBlock = { type };
    if (type === 'heading' || type === 'text') {
      newBlock.text = '';
      newBlock.align = 'left';
      newBlock.verticalAlign = 'top';
    } else if (type === 'image') {
      newBlock.src = '';
      newBlock.alt = '';
      newBlock.align = 'center';
    }
    
    const updatedBlocks = [...blocks];
    updatedBlocks[parentIndex] = {
      ...parent,
      blocks: [...(parent.blocks || []), newBlock]
    };
    blocks = updatedBlocks;
    generateHtmlFromBlocks();
  }
  
  // Update nested block
  function updateNestedBlock(parentIndex, nestedIndex, updates) {
    const updatedBlocks = [...blocks];
    if (updatedBlocks[parentIndex].blocks) {
      updatedBlocks[parentIndex].blocks[nestedIndex] = {
        ...updatedBlocks[parentIndex].blocks[nestedIndex],
        ...updates
      };
    }
    blocks = updatedBlocks;
    generateHtmlFromBlocks();
  }
  
  // Delete nested block
  function deleteNestedBlock(parentIndex, nestedIndex) {
    const updatedBlocks = [...blocks];
    if (updatedBlocks[parentIndex].blocks) {
      updatedBlocks[parentIndex].blocks = updatedBlocks[parentIndex].blocks.filter(
        (_, i) => i !== nestedIndex
      );
    }
    blocks = updatedBlocks;
    generateHtmlFromBlocks();
  }
  
  // Generate HTML from blocks
  function generateHtmlFromBlocks() {
    let blocksHtml = '';
    
    for (const block of blocks) {
      blocksHtml += generateBlockHtml(block);
    }
    
    // Build background styles
    const bgStyles = [];
    if (backgroundColor) bgStyles.push(`background-color: ${backgroundColor}`);
    if (backgroundImage) bgStyles.push(`background-image: url('${backgroundImage}')`);
    if (backgroundImage) bgStyles.push(`background-size: ${backgroundSize}`);
    if (backgroundImage) bgStyles.push(`background-position: ${backgroundPosition}`);
    if (backgroundImage) bgStyles.push('background-repeat: no-repeat');
    if (componentMinHeight) bgStyles.push(`min-height: ${componentMinHeight}`);
    
    const styleAttr = bgStyles.length > 0 ? ` style="${bgStyles.join('; ')}"` : '';
    
    // Wrap blocks in section with background
    htmlContent = `<section class="py-8"${styleAttr}>\n  <div class="container mx-auto px-4">\n    ${blocksHtml}\n  </div>\n</section>`;
  }
  
  // Map vertical align value to CSS align-self
  function getVerticalAlignStyle(va) {
    if (!va || va === 'top') return '';
    if (va === 'center') return 'align-self: center;';
    if (va === 'bottom') return 'align-self: end;';
    return '';
  }

  // Generate HTML for a single block
  function generateBlockHtml(block) {
    const alignClass = block.align ? `text-${block.align === 'center' ? 'center' : block.align === 'right' ? 'right' : 'left'}` : '';
    const colorStyle = block.color ? `color: ${block.color};` : '';
    const vAlignStyle = getVerticalAlignStyle(block.verticalAlign);

    switch (block.type) {
      case 'heading': {
        const tag = `h${block.level || 2}`;
        const styles = [colorStyle, vAlignStyle].filter(Boolean).join(' ');
        const style = styles ? ` style="${styles}"` : '';
        return `<${tag} class="${alignClass} mb-4"${style}>${block.text || ''}</${tag}>\n`;
      }

      case 'text': {
        const styles = [colorStyle, vAlignStyle].filter(Boolean).join(' ');
        const textStyle = styles ? ` style="${styles}"` : '';
        return `<div class="${alignClass} mb-4"${textStyle}>${block.text || ''}</div>\n`;
      }
        
      case 'image': {
        const widthStyle = block.widthPercent ? `width: ${block.widthPercent}%;` : '';
        const imgStyle = widthStyle ? ` style="${widthStyle}"` : '';
        return `<div class="${alignClass} mb-4"><img src="${block.src || ''}" alt="${block.alt || ''}" class="rounded"${imgStyle} /></div>\n`;
      }
        
      case 'button':
        return `<div class="${alignClass} mb-4"><a href="${block.href || '#'}" class="inline-block px-6 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors">${block.label || 'Button'}</a></div>\n`;
        
      case 'divider': {
        const dividerWidth = block.width || 100;
        const dividerThickness = block.thickness || 1;
        const dividerStyle = block.style || 'solid';
        const dividerColor = block.color || '#d1d5db';
        const dividerAlign = block.align || 'center';
        const marginAuto = dividerAlign === 'center' ? 'margin-left: auto; margin-right: auto;' : dividerAlign === 'right' ? 'margin-left: auto;' : '';
        return `<div class="mb-4"><hr style="border: none; border-top: ${dividerThickness}px ${dividerStyle} ${dividerColor}; width: ${dividerWidth}%; ${marginAuto}" /></div>\n`;
      }

      case 'layout': {
        let layoutStyle = '';
        let layoutClass = 'space-y-4';
        if (block.layout === 'grid') {
          const cols = block.columns || 2;
          const ji = block.justifyItems || 'center';
          layoutStyle = ` style="display: grid; grid-template-columns: repeat(${cols}, 1fr); gap: 1rem; justify-items: ${ji}"`;
          layoutClass = '';
        }
        let nestedHtml = '';
        for (const nested of block.blocks || []) {
          nestedHtml += generateBlockHtml(nested);
        }
        return `<div class="${layoutClass} mb-4"${layoutStyle}>${nestedHtml}</div>\n`;
      }
        
      default:
        return '';
    }
  }
  
  // Handle HTML changes in code mode
  function handleHtmlChange(newHtml) {
    htmlContent = newHtml;
  }
  
  // Save the component
  function save() {
    const updatedComponent = {
      ...component,
      name: componentName,
      description: componentDescription,
      category: componentCategory,
      html: htmlContent,
      blocks: blocks,
      backgroundColor,
      backgroundImage,
      backgroundSize,
      backgroundPosition,
      minHeight: componentMinHeight
    };
    onSave(updatedComponent);
  }
  
  // Initialize HTML from blocks if in visual mode
  $effect(() => {
    if (editorMode === 'visual') {
      generateHtmlFromBlocks();
    }
  });
</script>

<div class="visual-builder">
  <!-- Header -->
  <div class="builder-header">
    <div class="header-title">
      <span class="eyebrow">Content Management</span>
      <h2 class="font-display">Edit Component</h2>
    </div>

    <!-- Mode Toggle -->
    <div class="mode-toggle">
      <button
        class="mode-btn {editorMode === 'visual' ? 'active' : ''}"
        onclick={() => editorMode = 'visual'}
      >
        Visual Builder
      </button>
      <button
        class="mode-btn {editorMode === 'code' ? 'active' : ''}"
        onclick={() => editorMode = 'code'}
      >
        Code Editor
      </button>
    </div>

    <button class="btn-close" onclick={onCancel} aria-label="Close">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" x2="6" y1="6" y2="18"/>
        <line x1="6" x2="18" y1="6" y2="18"/>
      </svg>
    </button>
  </div>
  
  <!-- Body -->
  <div class="builder-body">
    <!-- Component Info -->
    <div class="form-section">
      <div class="form-row">
        <div class="form-group">
          <label for="component-name">Name</label>
          <input
            id="component-name"
            type="text"
            bind:value={componentName}
            placeholder="Component name"
          />
        </div>
        <div class="form-group">
          <label for="component-description">Description</label>
          <input
            id="component-description"
            type="text"
            bind:value={componentDescription}
            placeholder="Brief description"
          />
        </div>
      </div>
    </div>
    
    {#if editorMode === 'visual'}
      <!-- Visual Builder Mode -->
      <div class="visual-mode">
        <!-- Background Settings -->
        <div class="background-section">
          <h3 class="section-title">🎨 Background Settings</h3>
          <div class="background-controls">
            <!-- Background Color -->
            <div class="control-group">
              <label>Background Color</label>
              <div class="bg-color-control">
                <button 
                  class="color-btn"
                  style="background-color: {backgroundColor || 'transparent'}"
                  onclick={() => showBgColorPicker = !showBgColorPicker}
                ></button>
                {#if backgroundColor}
                  <span class="color-value">{backgroundColor}</span>
                  <button class="btn-clear" onclick={() => backgroundColor = ''}>Clear</button>
                {/if}
                {#if showBgColorPicker}
                  <div class="color-picker-popup">
                    <div class="picker-header">
                      <span>Choose Background Color</span>
                      <button onclick={() => showBgColorPicker = false}>✕</button>
                    </div>
                    <div class="color-grid">
                      {#each colorPalette as color}
                        <button
                          class="color-option"
                          style="background-color: {color.hex}"
                          title={color.name}
                          onclick={() => {
                            backgroundColor = color.hex;
                            showBgColorPicker = false;
                          }}
                        ></button>
                      {/each}
                    </div>
                    <div class="custom-color">
                      <label>Custom:</label>
                      <input 
                        type="color" 
                        value={backgroundColor || '#ffffff'}
                        oninput={(e) => backgroundColor = e.target.value}
                      />
                    </div>
                  </div>
                {/if}
              </div>
            </div>

            <!-- Background Image -->
            <div class="control-group">
              <label>Background Image</label>
              <div class="bg-image-control">
                {#if backgroundImage}
                  <div class="bg-image-preview">
                    <img src={backgroundImage} alt="Background" />
                    <button class="btn-remove-image" onclick={() => backgroundImage = ''}>×</button>
                  </div>
                {:else}
                  <button
                    class="btn-choose-bg"
                    onclick={async () => {
                      const url = await openGalleryPicker();
                      if (url) backgroundImage = url;
                    }}
                  >
                    Choose from Gallery
                  </button>
                {/if}
              </div>
            </div>

            <!-- Background Size (only show if image selected) -->
            {#if backgroundImage}
              <div class="control-group">
                <label>Image Size</label>
                <select bind:value={backgroundSize}>
                  <option value="cover">Cover (fill space)</option>
                  <option value="contain">Contain (fit entirely)</option>
                  <option value="auto">Auto (original size)</option>
                </select>
              </div>

              <div class="control-group">
                <label>Image Position</label>
                <select bind:value={backgroundPosition}>
                  <option value="center">Center</option>
                  <option value="top">Top</option>
                  <option value="bottom">Bottom</option>
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                  <option value="top left">Top Left</option>
                  <option value="top right">Top Right</option>
                  <option value="bottom left">Bottom Left</option>
                  <option value="bottom right">Bottom Right</option>
                </select>
              </div>
            {/if}

            <!-- Min Height -->
            <div class="control-group">
              <label>Minimum Height</label>
              <select bind:value={componentMinHeight}>
                <option value="">Auto</option>
                <option value="200px">Small (200px)</option>
                <option value="400px">Medium (400px)</option>
                <option value="600px">Large (600px)</option>
                <option value="800px">Extra Large (800px)</option>
                <option value="100vh">Full Screen</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Block Type Selector -->
        <div class="block-selector">
          <p class="selector-label">Add blocks:</p>
          <div class="block-buttons">
            {#each blockTypes as type}
              <button 
                class="block-btn"
                onclick={() => addBlock(type.type)}
                title={type.label}
              >
                <span class="block-icon">{type.icon}</span>
                <span class="block-label">{type.label}</span>
              </button>
            {/each}
          </div>
        </div>
        
        <!-- Blocks List -->
        <div class="blocks-list">
          {#if blocks.length === 0}
            <div class="empty-blocks">
              <p>No blocks yet. Click the buttons above to add content.</p>
            </div>
          {:else}
            {#each blocks as block, index}
              <div class="block-item">
                <!-- Block Header -->
                <div class="block-header">
                  <div class="block-info">
                    <span class="block-number">#{index + 1}</span>
                    <span class="block-type-badge">{block.type}</span>
                  </div>
                  <div class="block-actions">
                    <button 
                      class="action-btn"
                      onclick={() => moveBlock(index, -1)}
                      disabled={index === 0}
                      title="Move up"
                    >
                      ↑
                    </button>
                    <button 
                      class="action-btn"
                      onclick={() => moveBlock(index, 1)}
                      disabled={index === blocks.length - 1}
                      title="Move down"
                    >
                      ↓
                    </button>
                    <button 
                      class="action-btn delete"
                      onclick={() => deleteBlock(index)}
                      title="Delete"
                    >
                      ×
                    </button>
                  </div>
                </div>
                
                <!-- Block Content -->
                <div class="block-content">
                  {#if block.type === 'heading'}
                    <div class="block-controls">
                      <div class="control-group">
                        <label>Level</label>
                        <select
                          value={block.level || 2}
                          onchange={(e) => updateBlock(index, { level: Number(e.target.value) })}
                        >
                          <option value={1}>H1</option>
                          <option value={2}>H2</option>
                          <option value={3}>H3</option>
                          <option value={4}>H4</option>
                        </select>
                      </div>
                      <div class="control-group">
                        <label>Align</label>
                        <select
                          value={block.align || 'left'}
                          onchange={(e) => updateBlock(index, { align: e.target.value })}
                        >
                          <option value="left">Left</option>
                          <option value="center">Center</option>
                          <option value="right">Right</option>
                        </select>
                      </div>
                    </div>
                    <QuillBlock
                      content={block.text || ''}
                      placeholder="Heading text"
                      onTextChange={(html) => updateBlock(index, { text: html })}
                      blockIndex={index}
                      toolbarOptions={[
                        ['bold', 'italic', 'underline'],
                        [{ color: [] }],
                        ['link', 'clean']
                      ]}
                    />
                    
                  {:else if block.type === 'text'}
                    <div class="block-controls">
                      <div class="control-group">
                        <label>Align</label>
                        <select
                          value={block.align || 'left'}
                          onchange={(e) => updateBlock(index, { align: e.target.value })}
                        >
                          <option value="left">Left</option>
                          <option value="center">Center</option>
                          <option value="right">Right</option>
                        </select>
                      </div>
                    </div>
                    <QuillBlock
                      content={block.text || ''}
                      placeholder="Enter text content..."
                      onTextChange={(html) => updateBlock(index, { text: html })}
                      blockIndex={index}
                    />
                    
                  {:else if block.type === 'image'}
                    <div class="block-controls">
                      <div class="control-group">
                        <label>Align</label>
                        <select 
                          value={block.align || 'center'}
                          onchange={(e) => updateBlock(index, { align: e.target.value })}
                        >
                          <option value="left">Left</option>
                          <option value="center">Center</option>
                          <option value="right">Right</option>
                        </select>
                      </div>
                      <div class="control-group">
                        <label>Width: {block.widthPercent || 100}%</label>
                        <input 
                          type="range" 
                          min="25" 
                          max="100" 
                          step="25"
                          value={block.widthPercent || 100}
                          oninput={(e) => updateBlock(index, { widthPercent: Number(e.target.value) })}
                        />
                      </div>
                    </div>
                    <input
                      type="text"
                      class="block-input"
                      placeholder="Image URL (e.g., /image.jpg)"
                      value={block.src || ''}
                      oninput={(e) => updateBlock(index, { src: e.target.value })}
                    />
                    <input
                      type="text"
                      class="block-input"
                      placeholder="Alt text (accessibility)"
                      value={block.alt || ''}
                      oninput={(e) => updateBlock(index, { alt: e.target.value })}
                    />
                    <div class="image-pick-buttons">
                      <button
                        class="btn-choose-image"
                        onclick={async () => {
                          const url = await openGalleryPicker();
                          if (url) updateBlock(index, { src: url });
                        }}
                      >
                        Pick from Gallery
                      </button>
                    </div>
                    
                  {:else if block.type === 'button'}
                    <div class="block-controls">
                      <div class="control-group">
                        <label>Align</label>
                        <select 
                          value={block.align || 'left'}
                          onchange={(e) => updateBlock(index, { align: e.target.value })}
                        >
                          <option value="left">Left</option>
                          <option value="center">Center</option>
                          <option value="right">Right</option>
                        </select>
                      </div>
                    </div>
                    <input
                      type="text"
                      class="block-input"
                      placeholder="Button label"
                      value={block.label || ''}
                      oninput={(e) => updateBlock(index, { label: e.target.value })}
                    />
                    <input
                      type="text"
                      class="block-input"
                      placeholder="Link URL (e.g., /contact)"
                      value={block.href || ''}
                      oninput={(e) => updateBlock(index, { href: e.target.value })}
                    />
                    
                  {:else if block.type === 'divider'}
                    <div class="block-controls">
                      <div class="control-group">
                        <label>Style</label>
                        <select
                          value={block.style || 'solid'}
                          onchange={(e) => updateBlock(index, { style: e.target.value })}
                        >
                          <option value="solid">Solid</option>
                          <option value="dashed">Dashed</option>
                          <option value="dotted">Dotted</option>
                          <option value="double">Double</option>
                          <option value="groove">Groove</option>
                          <option value="ridge">Ridge</option>
                        </select>
                      </div>
                      <div class="control-group">
                        <label>Thickness: {block.thickness || 1}px</label>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          step="1"
                          value={block.thickness || 1}
                          oninput={(e) => updateBlock(index, { thickness: Number(e.target.value) })}
                        />
                      </div>
                      <div class="control-group">
                        <label>Width: {block.width || 100}%</label>
                        <input
                          type="range"
                          min="10"
                          max="100"
                          step="5"
                          value={block.width || 100}
                          oninput={(e) => updateBlock(index, { width: Number(e.target.value) })}
                        />
                      </div>
                      <div class="control-group">
                        <label>Align</label>
                        <select
                          value={block.align || 'center'}
                          onchange={(e) => updateBlock(index, { align: e.target.value })}
                        >
                          <option value="left">Left</option>
                          <option value="center">Center</option>
                          <option value="right">Right</option>
                        </select>
                      </div>
                      <div class="control-group">
                        <label>Color</label>
                        <div class="divider-color-picker">
                          <input
                            type="color"
                            value={block.color || '#d1d5db'}
                            oninput={(e) => updateBlock(index, { color: e.target.value })}
                          />
                          <span class="color-hex">{block.color || '#d1d5db'}</span>
                        </div>
                      </div>
                    </div>
                    <!-- Divider Preview -->
                    <div class="divider-preview">
                      <hr style="border: none; border-top: {block.thickness || 1}px {block.style || 'solid'} {block.color || '#d1d5db'}; width: {block.width || 100}%; {block.align === 'center' ? 'margin-left: auto; margin-right: auto;' : block.align === 'right' ? 'margin-left: auto;' : ''}" />
                    </div>

                  {:else if block.type === 'layout'}
                    <div class="block-controls">
                      <div class="control-group">
                        <label>Layout</label>
                        <select 
                          value={block.layout || 'linear'}
                          onchange={(e) => updateBlock(index, { layout: e.target.value })}
                        >
                          <option value="linear">Linear</option>
                          <option value="grid">Grid</option>
                        </select>
                      </div>
                      {#if block.layout === 'grid'}
                        <div class="control-group">
                          <label>Columns</label>
                          <select
                            value={block.columns || 2}
                            onchange={(e) => updateBlock(index, { columns: Number(e.target.value) })}
                          >
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                            <option value={10}>10</option>
                          </select>
                        </div>
                        <div class="control-group">
                          <label>Items Align</label>
                          <select
                            value={block.justifyItems || 'center'}
                            onchange={(e) => updateBlock(index, { justifyItems: e.target.value })}
                          >
                            <option value="start">Start</option>
                            <option value="center">Center</option>
                            <option value="end">End</option>
                            <option value="stretch">Stretch</option>
                          </select>
                        </div>
                      {/if}
                    </div>
                    
                    <!-- Nested Blocks -->
                    <div class="nested-blocks">
                      <div class="nested-header">
                        <span>Nested blocks</span>
                        <div class="nested-actions">
                          <button onclick={() => addNestedBlock(index, 'text')}>+ Text</button>
                          <button onclick={() => addNestedBlock(index, 'heading')}>+ Heading</button>
                          <button onclick={() => addNestedBlock(index, 'image')}>+ Image</button>
                        </div>
                      </div>
                      {#if block.blocks && block.blocks.length > 0}
                        <div class="nested-list">
                          {#each block.blocks as nestedBlock, nestedIndex}
                            <div class="nested-item">
                              <div class="nested-header-row">
                                <span>{nestedIndex + 1}. {nestedBlock.type}</span>
                                <button onclick={() => deleteNestedBlock(index, nestedIndex)}>×</button>
                              </div>
                              {#if nestedBlock.type === 'heading' || nestedBlock.type === 'text'}
                                <div class="nested-controls">
                                  <div class="control-group">
                                    <label>Align</label>
                                    <select
                                      value={nestedBlock.align || 'left'}
                                      onchange={(e) => updateNestedBlock(index, nestedIndex, { align: e.target.value })}
                                    >
                                      <option value="left">Left</option>
                                      <option value="center">Center</option>
                                      <option value="right">Right</option>
                                    </select>
                                  </div>
                                  <div class="control-group">
                                    <label>Vertical</label>
                                    <select
                                      value={nestedBlock.verticalAlign || 'top'}
                                      onchange={(e) => updateNestedBlock(index, nestedIndex, { verticalAlign: e.target.value })}
                                    >
                                      <option value="top">Top</option>
                                      <option value="center">Center</option>
                                      <option value="bottom">Bottom</option>
                                    </select>
                                  </div>
                                </div>
                                {#if nestedBlock.type === 'heading'}
                                  <QuillBlock
                                    content={nestedBlock.text || ''}
                                    placeholder="Heading text"
                                    onTextChange={(html) => updateNestedBlock(index, nestedIndex, { text: html })}
                                    blockIndex={index * 100 + nestedIndex}
                                    toolbarOptions={[
                                      ['bold', 'italic', 'underline'],
                                      [{ color: [] }],
                                      ['link', 'clean']
                                    ]}
                                  />
                                {:else}
                                  <QuillBlock
                                    content={nestedBlock.text || ''}
                                    placeholder="Text content"
                                    onTextChange={(html) => updateNestedBlock(index, nestedIndex, { text: html })}
                                    blockIndex={index * 100 + nestedIndex}
                                  />
                                {/if}
                              {:else if nestedBlock.type === 'image'}
                                {#if nestedBlock.src}
                                  <div class="nested-image-preview">
                                    <img src={nestedBlock.src} alt="Selected" />
                                    <button class="btn-remove-image" onclick={() => updateNestedBlock(index, nestedIndex, { src: '' })}>×</button>
                                  </div>
                                {/if}
                                <div class="image-pick-buttons">
                                  <button
                                    class="btn-choose-image"
                                    onclick={async () => {
                                      const url = await openGalleryPicker();
                                      if (url) updateNestedBlock(index, nestedIndex, { src: url });
                                    }}
                                  >
                                    Pick from Gallery
                                  </button>
                                </div>
                              {/if}
                            </div>
                          {/each}
                        </div>
                      {:else}
                        <p class="no-nested">No nested blocks yet</p>
                      {/if}
                    </div>
                  {/if}
                </div>
              </div>
            {/each}
          {/if}
        </div>
      </div>
      
    {:else}
      <!-- Code Editor Mode -->
      <div class="code-mode">
        <div class="form-group">
          <label>HTML Content</label>
          <textarea
            class="code-editor"
            bind:value={htmlContent}
            rows="16"
            placeholder="<div>Your HTML here...</div>"
          ></textarea>
        </div>
      </div>
    {/if}
    
    <!-- Preview Section -->
    <div class="preview-section">
      <h3>Live Preview</h3>
      <div class="preview-box" style="padding: 0; overflow: hidden;">
        {@html htmlContent}
      </div>
    </div>
  </div>
  
  <!-- Footer -->
  <div class="builder-footer">
    <button class="btn-editorial" onclick={onCancel}>Cancel</button>
    <button class="btn-editorial btn-editorial-accent" onclick={save}>Save Component</button>
  </div>
</div>

<style>
  /* ========== Shell ========== */
  .visual-builder {
    background: var(--color-paper);
    display: flex;
    flex-direction: column;
    max-height: 90vh;
    font-family: 'Source Sans Pro', sans-serif;
    color: var(--color-ink);
  }

  /* ========== Header ========== */
  .builder-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1.5rem;
    padding: 1.75rem 2rem 1.25rem;
    border-bottom: 1px solid var(--color-pearl);
    background: var(--color-paper);
  }

  .header-title {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .header-title .eyebrow {
    margin-bottom: 0;
    font-size: 0.6875rem;
  }

  .builder-header h2 {
    margin: 0;
    font-size: 1.75rem;
    line-height: 1.15;
    color: var(--color-ink);
  }

  .mode-toggle {
    display: flex;
    gap: 0;
    border: 1px solid var(--color-ink);
  }

  .mode-btn {
    padding: 0.625rem 1.25rem;
    border: none;
    background: transparent;
    color: var(--color-ink);
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .mode-btn + .mode-btn {
    border-left: 1px solid var(--color-ink);
  }

  .mode-btn.active {
    background: var(--color-ink);
    color: var(--color-paper);
  }

  .mode-btn:hover:not(.active) {
    background: var(--color-cream);
  }

  .btn-close {
    background: none;
    border: none;
    color: var(--color-stone);
    cursor: pointer;
    padding: 0.5rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s ease;
  }

  .btn-close:hover {
    color: var(--color-accent);
  }

  /* ========== Body ========== */
  .builder-body {
    flex: 1;
    overflow-y: auto;
    padding: 2rem;
    background: var(--color-cream);
  }

  /* ========== Form ========== */
  .form-section {
    margin-bottom: 2rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid var(--color-pearl);
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .form-group label {
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 0.6875rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--color-stone);
  }

  .form-group input,
  .form-group textarea {
    padding: 0.75rem 1rem;
    background: var(--color-paper);
    border: 1px solid var(--color-pearl);
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 0.9375rem;
    color: var(--color-ink);
    transition: border-color 0.2s ease;
  }

  .form-group input::placeholder,
  .form-group textarea::placeholder {
    color: var(--color-warm-gray);
  }

  .form-group input:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: var(--color-accent);
  }

  /* ========== Visual Mode ========== */
  .visual-mode {
    margin-bottom: 2rem;
  }

  /* ========== Background Section ========== */
  .background-section {
    background: var(--color-paper);
    border: 1px solid var(--color-pearl);
    padding: 1.75rem;
    margin-bottom: 2rem;
  }

  .section-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-weight: 600;
    font-size: 1.25rem;
    color: var(--color-ink);
    margin: 0 0 1.25rem 0;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--color-pearl);
  }

  .background-controls {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
  }

  .bg-color-control {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    position: relative;
    flex-wrap: wrap;
  }

  .color-value {
    font-size: 0.75rem;
    color: var(--color-stone);
    font-family: 'Courier New', monospace;
    text-transform: uppercase;
  }

  .btn-clear {
    padding: 0.375rem 0.75rem;
    font-size: 0.6875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    background: transparent;
    color: #b91c1c;
    border: 1px solid #b91c1c;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .btn-clear:hover {
    background: #b91c1c;
    color: var(--color-paper);
  }

  .custom-color {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.75rem;
    padding-top: 0.75rem;
    border-top: 1px solid var(--color-pearl);
  }

  .custom-color label {
    font-size: 0.6875rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--color-stone);
  }

  .bg-image-control {
    position: relative;
  }

  .btn-choose-bg {
    display: inline-flex;
    align-items: center;
    padding: 0.75rem 1.25rem;
    background: transparent;
    border: 1px solid var(--color-ink);
    color: var(--color-ink);
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .btn-choose-bg:hover {
    background: var(--color-ink);
    color: var(--color-paper);
  }

  .bg-image-preview {
    position: relative;
    display: inline-block;
  }

  .bg-image-preview img {
    width: 120px;
    height: 72px;
    object-fit: cover;
    border: 1px solid var(--color-pearl);
    display: block;
  }

  .btn-remove-image {
    position: absolute;
    top: 0.375rem;
    right: 0.375rem;
    width: 22px;
    height: 22px;
    background: rgba(26, 26, 26, 0.75);
    color: var(--color-paper);
    border: none;
    cursor: pointer;
    font-size: 0.875rem;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s ease;
  }

  .btn-remove-image:hover {
    background: var(--color-ink);
  }

  /* ========== Block Selector ========== */
  .block-selector {
    margin-bottom: 1.5rem;
    padding: 1.25rem 0 1.5rem;
    border-top: 1px solid var(--color-pearl);
  }

  .selector-label {
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 0.6875rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--color-stone);
    margin-bottom: 0.875rem;
  }

  .block-buttons {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .block-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.625rem 1rem;
    background: var(--color-paper);
    border: 1px solid var(--color-pearl);
    color: var(--color-ink);
    font-family: 'Source Sans Pro', sans-serif;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .block-btn:hover {
    border-color: var(--color-accent);
    color: var(--color-accent);
  }

  .block-icon {
    font-size: 1rem;
  }

  .block-label {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  /* ========== Blocks List ========== */
  .blocks-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .empty-blocks {
    text-align: center;
    padding: 3rem 2rem;
    background: var(--color-paper);
    border: 2px dashed var(--color-pearl);
    color: var(--color-stone);
    font-family: 'Playfair Display', Georgia, serif;
    font-style: italic;
    font-size: 1.0625rem;
  }

  .empty-blocks p {
    margin: 0;
    color: var(--color-stone);
  }

  .block-item {
    border: 1px solid var(--color-pearl);
    background: var(--color-paper);
    transition: border-color 0.2s ease;
  }

  .block-item:hover {
    border-color: var(--color-silver);
  }

  .block-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.875rem 1.25rem;
    background: var(--color-cream);
    border-bottom: 1px solid var(--color-pearl);
  }

  .block-info {
    display: flex;
    align-items: center;
    gap: 0.875rem;
  }

  .block-number {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 1rem;
    font-weight: 700;
    color: var(--color-accent);
  }

  .block-type-badge {
    font-size: 0.625rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--color-stone);
    padding: 0.25rem 0.625rem;
    border: 1px solid var(--color-pearl);
    background: var(--color-paper);
  }

  .block-actions {
    display: flex;
    gap: 0.375rem;
  }

  .action-btn {
    width: 30px;
    height: 30px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--color-pearl);
    background: var(--color-paper);
    color: var(--color-stone);
    cursor: pointer;
    font-size: 0.9375rem;
    transition: all 0.2s ease;
  }

  .action-btn:hover:not(:disabled) {
    border-color: var(--color-ink);
    color: var(--color-ink);
  }

  .action-btn:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  .action-btn.delete {
    color: #b91c1c;
    border-color: #f5c6c6;
    font-size: 1.125rem;
  }

  .action-btn.delete:hover {
    background: #b91c1c;
    color: var(--color-paper);
    border-color: #b91c1c;
  }

  .block-content {
    padding: 1.5rem;
  }

  .block-controls {
    display: flex;
    gap: 1.25rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;
  }

  .control-group {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
    min-width: 0;
  }

  .bg-color-control.control-group,
  .background-controls .control-group {
    display: flex;
  }

  .control-group label {
    font-size: 0.625rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--color-stone);
  }

  .control-group select,
  .control-group input[type="range"],
  .control-group input[type="text"] {
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 0.875rem;
    padding: 0.5rem 0.75rem;
    background: var(--color-paper);
    border: 1px solid var(--color-pearl);
    color: var(--color-ink);
    transition: border-color 0.2s ease;
  }

  .control-group select:focus,
  .control-group input:focus {
    outline: none;
    border-color: var(--color-accent);
  }

  .control-group input[type="range"] {
    padding: 0;
    border: none;
    background: transparent;
    accent-color: var(--color-accent);
  }

  /* ========== Color Picker ========== */
  .color-btn {
    width: 2rem;
    height: 2rem;
    border: 1px solid var(--color-pearl);
    cursor: pointer;
    background-color: var(--color-cream);
    background-image:
      linear-gradient(45deg, var(--color-pearl) 25%, transparent 25%),
      linear-gradient(-45deg, var(--color-pearl) 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, var(--color-pearl) 75%),
      linear-gradient(-45deg, transparent 75%, var(--color-pearl) 75%);
    background-size: 10px 10px;
    background-position: 0 0, 0 5px, 5px -5px, -5px 0;
  }

  .color-btn.small {
    width: 1.5rem;
    height: 1.5rem;
  }

  .color-picker-popup {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 10;
    background: var(--color-paper);
    border: 1px solid var(--color-pearl);
    padding: 1rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
    margin-top: 0.5rem;
    width: 300px;
  }

  .color-picker-popup.small {
    width: 260px;
  }

  .picker-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.875rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--color-pearl);
  }

  .picker-header span {
    font-size: 0.6875rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--color-stone);
  }

  .picker-header button {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--color-stone);
    font-size: 1rem;
    padding: 0;
    line-height: 1;
  }

  .picker-header button:hover {
    color: var(--color-accent);
  }

  .color-grid {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 0.375rem;
  }

  .color-option {
    width: 100%;
    aspect-ratio: 1;
    border: 1px solid rgba(0, 0, 0, 0.08);
    cursor: pointer;
    transition: transform 0.15s ease;
  }

  .color-option:hover {
    transform: scale(1.15);
    border-color: var(--color-ink);
  }

  /* ========== Block Inputs ========== */
  .block-input,
  .block-textarea {
    width: 100%;
    padding: 0.75rem 1rem;
    background: var(--color-paper);
    border: 1px solid var(--color-pearl);
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 0.9375rem;
    color: var(--color-ink);
    margin-bottom: 0.625rem;
    transition: border-color 0.2s ease;
  }

  .block-input::placeholder,
  .block-textarea::placeholder {
    color: var(--color-warm-gray);
  }

  .block-input:focus,
  .block-textarea:focus {
    outline: none;
    border-color: var(--color-accent);
  }

  .block-textarea {
    resize: vertical;
    font-family: inherit;
  }

  .image-pick-buttons {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }

  .btn-choose-image {
    display: inline-flex;
    align-items: center;
    padding: 0.625rem 1.125rem;
    background: transparent;
    border: 1px solid var(--color-accent);
    color: var(--color-accent);
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .btn-choose-image:hover {
    background: var(--color-accent);
    color: var(--color-paper);
  }

  /* ========== Divider Block ========== */
  .divider-color-picker {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .divider-color-picker input[type="color"] {
    width: 38px;
    height: 30px;
    border: 1px solid var(--color-pearl);
    padding: 2px;
    cursor: pointer;
    background: var(--color-paper);
  }

  .color-hex {
    font-size: 0.75rem;
    color: var(--color-stone);
    font-family: 'Courier New', monospace;
    text-transform: uppercase;
  }

  .divider-preview {
    padding: 1.25rem 1rem;
    margin-top: 0.75rem;
    background: var(--color-cream);
    border: 1px solid var(--color-pearl);
  }

  /* ========== Nested Blocks ========== */
  .nested-blocks {
    border-left: 2px solid var(--color-accent);
    padding-left: 1.25rem;
    margin-top: 1rem;
  }

  .nested-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.875rem;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .nested-header > span {
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 0.6875rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--color-stone);
  }

  .nested-actions {
    display: flex;
    gap: 0.375rem;
    flex-wrap: wrap;
  }

  .nested-actions button {
    padding: 0.375rem 0.75rem;
    background: transparent;
    color: var(--color-ink);
    border: 1px solid var(--color-ink);
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 0.6875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .nested-actions button:hover {
    background: var(--color-ink);
    color: var(--color-paper);
  }

  .nested-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .nested-item {
    background: var(--color-cream);
    border: 1px solid var(--color-pearl);
    padding: 1rem;
  }

  .nested-header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.625rem;
  }

  .nested-header-row span {
    font-size: 0.6875rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--color-stone);
  }

  .nested-header-row button {
    background: none;
    border: none;
    color: #b91c1c;
    cursor: pointer;
    font-size: 1.25rem;
    line-height: 1;
    padding: 0 0.25rem;
    transition: color 0.2s ease;
  }

  .nested-header-row button:hover {
    color: var(--color-ink);
  }

  .nested-controls {
    display: flex;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
    position: relative;
    flex-wrap: wrap;
  }

  .nested-controls select {
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 0.8125rem;
    padding: 0.375rem 0.5rem;
    border: 1px solid var(--color-pearl);
    background: var(--color-paper);
    color: var(--color-ink);
  }

  .nested-input,
  .nested-textarea {
    width: 100%;
    padding: 0.625rem 0.875rem;
    border: 1px solid var(--color-pearl);
    background: var(--color-paper);
    font-size: 0.875rem;
  }

  .nested-image-preview {
    position: relative;
    display: inline-block;
    margin-bottom: 0.625rem;
  }

  .nested-image-preview img {
    width: 120px;
    height: 72px;
    object-fit: cover;
    border: 1px solid var(--color-pearl);
    display: block;
  }

  .no-nested {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 0.9375rem;
    font-style: italic;
    color: var(--color-warm-gray);
    margin: 0;
  }

  /* ========== Code Mode ========== */
  .code-mode {
    margin-bottom: 2rem;
  }

  .code-editor {
    width: 100%;
    padding: 1.25rem;
    background: var(--color-paper);
    border: 1px solid var(--color-pearl);
    font-family: 'Courier New', 'Monaco', monospace;
    font-size: 0.8125rem;
    color: var(--color-ink);
    line-height: 1.6;
    resize: vertical;
    transition: border-color 0.2s ease;
  }

  .code-editor:focus {
    outline: none;
    border-color: var(--color-accent);
  }

  /* ========== Preview Section ========== */
  .preview-section {
    border-top: 1px solid var(--color-pearl);
    padding-top: 2rem;
    margin-top: 2rem;
  }

  .preview-section h3 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--color-ink);
    margin-bottom: 1rem;
    position: relative;
    padding-left: 1rem;
  }

  .preview-section h3::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 1rem;
    background: var(--color-accent);
  }

  .preview-box {
    border: 1px solid var(--color-pearl);
    background: var(--color-paper);
    min-height: 120px;
    max-height: 340px;
    overflow: auto;
  }

  .preview-box :global(*) {
    max-width: 100%;
  }

  /* ========== Footer ========== */
  .builder-footer {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    padding: 1.25rem 2rem;
    border-top: 1px solid var(--color-pearl);
    background: var(--color-paper);
  }

  .builder-footer :global(.btn-editorial) {
    padding: 0.75rem 1.75rem;
    font-size: 0.75rem;
  }

  /* ========== Responsive ========== */
  @media (max-width: 768px) {
    .builder-header {
      flex-wrap: wrap;
      gap: 1rem;
      padding: 1.25rem 1.5rem;
    }

    .builder-body {
      padding: 1.25rem;
    }

    .form-row {
      grid-template-columns: 1fr;
    }

    .block-controls {
      flex-direction: column;
      gap: 0.75rem;
    }

    .mode-toggle {
      order: 3;
      width: 100%;
    }

    .mode-btn {
      flex: 1;
    }

    .builder-footer {
      padding: 1rem 1.25rem;
    }
  }
</style>