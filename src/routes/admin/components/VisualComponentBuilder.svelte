<script>
  let { component, onSave, onCancel } = $props();
  
  // Editor mode: 'visual' or 'code'
  let editorMode = $state('visual');
  
  // Block types for visual builder
  const blockTypes = [
    { type: 'heading', label: 'Heading', icon: 'H' },
    { type: 'text', label: 'Text', icon: 'T' },
    { type: 'image', label: 'Image', icon: '📷' },
    { type: 'button', label: 'Button', icon: '🔘' },
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
  let showBgImageSelector = $state(false);
  let showBgColorPicker = $state(false);
  
  // Available images for selection
  let availableImages = $state([]);
  let showImageSelectorForBlock = $state(null);
  
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
  
  // State for color pickers
  let showColorPicker = $state({});
  
  // Load available images
  async function loadAvailableImages() {
    try {
      const res = await fetch('/api/images');
      if (res.ok) {
        availableImages = await res.json();
      }
    } catch (err) {
      console.error('Failed to load images:', err);
    }
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
      case 'layout':
        newBlock.layout = 'linear';
        newBlock.columns = 2;
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
  
  // Toggle color picker
  function toggleColorPicker(blockIndex, nestedIndex = null) {
    const key = nestedIndex !== null ? `nested-${blockIndex}-${nestedIndex}` : `block-${blockIndex}`;
    showColorPicker[key] = !showColorPicker[key];
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
  
  // Generate HTML for a single block
  function generateBlockHtml(block) {
    const alignClass = block.align ? `text-${block.align === 'center' ? 'center' : block.align === 'right' ? 'right' : 'left'}` : '';
    const colorStyle = block.color ? `color: ${block.color};` : '';
    
    switch (block.type) {
      case 'heading': {
        const tag = `h${block.level || 2}`;
        const style = colorStyle ? ` style="${colorStyle}"` : '';
        return `<${tag} class="${alignClass} mb-4"${style}>${block.text || ''}</${tag}>\n`;
      }
        
      case 'text': {
        const textStyle = colorStyle ? ` style="${colorStyle}"` : '';
        const formattedText = formatText(block.text || '');
        return `<p class="${alignClass} mb-4"${textStyle}>${formattedText}</p>\n`;
      }
        
      case 'image': {
        const widthStyle = block.widthPercent ? `width: ${block.widthPercent}%;` : '';
        const imgStyle = widthStyle ? ` style="${widthStyle}"` : '';
        return `<div class="${alignClass} mb-4"><img src="${block.src || ''}" alt="${block.alt || ''}" class="rounded"${imgStyle} /></div>\n`;
      }
        
      case 'button':
        return `<div class="${alignClass} mb-4"><a href="${block.href || '#'}" class="inline-block px-6 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors">${block.label || 'Button'}</a></div>\n`;
        
      case 'layout': {
        const layoutClass = block.layout === 'grid' 
          ? `grid grid-cols-1 md:grid-cols-${block.columns || 2} gap-4` 
          : 'space-y-4';
        let nestedHtml = '';
        for (const nested of block.blocks || []) {
          nestedHtml += generateBlockHtml(nested);
        }
        return `<div class="${layoutClass} mb-4">${nestedHtml}</div>\n`;
      }
        
      default:
        return '';
    }
  }
  
  // Format text with markdown-like syntax
  function formatText(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/==(.*?)==\(([^)]+)\)/g, '<mark style="background-color: $2; padding: 0.125rem 0.25rem;">$1</mark>')
      .replace(/\n/g, '<br>');
  }
  
  // Handle HTML changes in code mode
  function handleHtmlChange(newHtml) {
    htmlContent = newHtml;
  }
  
  // Insert formatting at cursor position
  function insertFormat(blockIndex, prefix, suffix, placeholder) {
    const block = blocks[blockIndex];
    if (block.type !== 'text' && block.type !== 'heading') return;
    
    const textarea = document.getElementById(`block-text-${blockIndex}`);
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = block.text || '';
    const before = text.substring(0, start);
    const selected = text.substring(start, end);
    const after = text.substring(end);
    
    const newText = before + prefix + (selected || placeholder) + suffix + after;
    updateBlock(blockIndex, { text: newText });
    
    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd = start + prefix.length + (selected ? selected.length : placeholder.length);
      textarea.focus();
    }, 0);
  }
  
  // Insert highlight
  function insertHighlight(blockIndex, color) {
    const block = blocks[blockIndex];
    if (block.type !== 'text') return;
    
    const textarea = document.getElementById(`block-text-${blockIndex}`);
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = block.text || '';
    const before = text.substring(0, start);
    const selected = text.substring(start, end);
    const after = text.substring(end);
    
    const newText = before + `==${selected || 'highlighted text'}==(${color})` + after;
    updateBlock(blockIndex, { text: newText });
    
    setTimeout(() => {
      const extraLength = color.length + 4;
      textarea.selectionStart = start + (selected ? 0 : extraLength);
      textarea.selectionEnd = end + extraLength;
      textarea.focus();
    }, 0);
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
    <h2>📦 Edit Component</h2>
    
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
    
    <button class="btn-close" onclick={onCancel}>×</button>
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
                      if (!showBgImageSelector) {
                        await loadAvailableImages();
                      }
                      showBgImageSelector = !showBgImageSelector;
                    }}
                  >
                    {showBgImageSelector ? 'Hide' : 'Choose'} Background Image
                  </button>
                {/if}
                {#if showBgImageSelector}
                  <div class="image-selector">
                    {#if availableImages.length > 0}
                      {#each availableImages as img}
                        <button
                          class="image-option"
                          onclick={() => {
                            backgroundImage = img.url;
                            showBgImageSelector = false;
                          }}
                        >
                          📷 {img.name}
                        </button>
                      {/each}
                    {:else}
                      <p class="no-images">No images available</p>
                    {/if}
                  </div>
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
                      <div class="control-group">
                        <label>Color</label>
                        <button 
                          class="color-btn"
                          style="background-color: {block.color || '#111827'}"
                          onclick={() => toggleColorPicker(index)}
                        ></button>
                        {#if showColorPicker[`block-${index}`]}
                          <div class="color-picker-popup">
                            <div class="picker-header">
                              <span>Text Color</span>
                              <button onclick={() => showColorPicker[`block-${index}`] = false}>✕</button>
                            </div>
                            <div class="color-grid">
                              {#each colorPalette as color}
                                <button
                                  class="color-option"
                                  style="background-color: {color.hex}"
                                  title={color.name}
                                  onclick={() => {
                                    updateBlock(index, { color: color.hex });
                                    showColorPicker[`block-${index}`] = false;
                                  }}
                                ></button>
                              {/each}
                            </div>
                          </div>
                        {/if}
                      </div>
                    </div>
                    <input
                      id="block-text-{index}"
                      type="text"
                      class="block-input"
                      placeholder="Heading text"
                      value={block.text || ''}
                      oninput={(e) => updateBlock(index, { text: e.target.value })}
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
                      <div class="control-group">
                        <label>Color</label>
                        <button 
                          class="color-btn"
                          style="background-color: {block.color || '#374151'}"
                          onclick={() => toggleColorPicker(index)}
                        ></button>
                        {#if showColorPicker[`block-${index}`]}
                          <div class="color-picker-popup">
                            <div class="picker-header">
                              <span>Text Color</span>
                              <button onclick={() => showColorPicker[`block-${index}`] = false}>✕</button>
                            </div>
                            <div class="color-grid">
                              {#each colorPalette as color}
                                <button
                                  class="color-option"
                                  style="background-color: {color.hex}"
                                  title={color.name}
                                  onclick={() => {
                                    updateBlock(index, { color: color.hex });
                                    showColorPicker[`block-${index}`] = false;
                                  }}
                                ></button>
                              {/each}
                            </div>
                          </div>
                        {/if}
                      </div>
                    </div>
                    
                    <!-- Text Formatting Toolbar -->
                    <div class="format-toolbar">
                      <button onclick={() => insertFormat(index, '**', '**', 'bold text')} title="Bold"><strong>B</strong></button>
                      <button onclick={() => insertFormat(index, '*', '*', 'italic text')} title="Italic" class="italic"><em>I</em></button>
                      <button onclick={() => insertFormat(index, '- ', '\n', 'list item')} title="Bullet list">•</button>
                      <button onclick={() => insertFormat(index, '1. ', '\n', 'list item')} title="Numbered list">1.</button>
                      <button onclick={() => insertFormat(index, '[', '](url)', 'link text')} title="Link">🔗</button>
                      <div class="relative">
                        <button class="highlight-btn" title="Highlight text">🖍️</button>
                        <div class="highlight-popup">
                          {#each colorPalette.slice(0, 12) as color}
                            <button
                              class="highlight-option"
                              style="background-color: {color.hex}"
                              title={color.name}
                              onclick={() => insertHighlight(index, color.hex)}
                            ></button>
                          {/each}
                        </div>
                      </div>
                    </div>
                    
                    <textarea
                      id="block-text-{index}"
                      class="block-textarea"
                      placeholder="Enter text content (supports **bold**, *italic*, ==highlight==)"
                      rows="4"
                      value={block.text || ''}
                      oninput={(e) => updateBlock(index, { text: e.target.value })}
                    ></textarea>
                    
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
                    <button 
                      class="btn-choose-image"
                      onclick={async () => {
                        if (showImageSelectorForBlock !== index) {
                          await loadAvailableImages();
                          showImageSelectorForBlock = index;
                        } else {
                          showImageSelectorForBlock = null;
                        }
                      }}
                    >
                      {showImageSelectorForBlock === index ? 'Hide' : 'Choose'} from existing images
                    </button>
                    {#if showImageSelectorForBlock === index}
                      <div class="image-selector">
                        {#if availableImages.length > 0}
                          {#each availableImages as img}
                            <button
                              class="image-option"
                              onclick={() => {
                                updateBlock(index, { src: img.url });
                                showImageSelectorForBlock = null;
                              }}
                            >
                              📷 {img.name}
                            </button>
                          {/each}
                        {:else}
                          <p class="no-images">No images available</p>
                        {/if}
                      </div>
                    {/if}
                    
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
                                  <select 
                                    value={nestedBlock.align || 'left'}
                                    onchange={(e) => updateNestedBlock(index, nestedIndex, { align: e.target.value })}
                                  >
                                    <option value="left">Left</option>
                                    <option value="center">Center</option>
                                    <option value="right">Right</option>
                                  </select>
                                  <button 
                                    class="color-btn small"
                                    style="background-color: {nestedBlock.color || (nestedBlock.type === 'heading' ? '#111827' : '#374151')}"
                                    onclick={() => toggleColorPicker(index, nestedIndex)}
                                  ></button>
                                  {#if showColorPicker[`nested-${index}-${nestedIndex}`]}
                                    <div class="color-picker-popup small">
                                      <div class="color-grid">
                                        {#each colorPalette as color}
                                          <button
                                            class="color-option"
                                            style="background-color: {color.hex}"
                                            title={color.name}
                                            onclick={() => {
                                              updateNestedBlock(index, nestedIndex, { color: color.hex });
                                              showColorPicker[`nested-${index}-${nestedIndex}`] = false;
                                            }}
                                          ></button>
                                        {/each}
                                      </div>
                                    </div>
                                  {/if}
                                </div>
                                {#if nestedBlock.type === 'heading'}
                                  <input
                                    type="text"
                                    class="nested-input"
                                    placeholder="Heading text"
                                    value={nestedBlock.text || ''}
                                    oninput={(e) => updateNestedBlock(index, nestedIndex, { text: e.target.value })}
                                  />
                                {:else}
                                  <textarea
                                    class="nested-textarea"
                                    placeholder="Text content"
                                    rows="2"
                                    value={nestedBlock.text || ''}
                                    oninput={(e) => updateNestedBlock(index, nestedIndex, { text: e.target.value })}
                                  ></textarea>
                                {/if}
                              {:else if nestedBlock.type === 'image'}
                                <input
                                  type="text"
                                  class="nested-input"
                                  placeholder="Image URL"
                                  value={nestedBlock.src || ''}
                                  oninput={(e) => updateNestedBlock(index, nestedIndex, { src: e.target.value })}
                                />
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
    <button class="btn-secondary" onclick={onCancel}>Cancel</button>
    <button class="btn-primary" onclick={save}>Save Component</button>
  </div>
</div>

<style>
  .visual-builder {
    background: white;
    border-radius: 0.75rem;
    display: flex;
    flex-direction: column;
    max-height: 90vh;
  }
  
  .builder-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .builder-header h2 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
  }
  
  .mode-toggle {
    display: flex;
    gap: 0.25rem;
    background: #f3f4f6;
    padding: 0.25rem;
    border-radius: 0.375rem;
  }
  
  .mode-btn {
    padding: 0.5rem 1rem;
    border: none;
    background: transparent;
    color: #6b7280;
    font-size: 0.875rem;
    cursor: pointer;
    border-radius: 0.25rem;
    transition: all 0.2s;
  }
  
  .mode-btn.active {
    background: white;
    color: #111827;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }
  
  .btn-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    color: #9ca3af;
    cursor: pointer;
  }
  
  .builder-body {
    flex: 1;
    overflow-y: auto;
    padding: 1.5rem;
  }
  
  .form-section {
    margin-bottom: 1.5rem;
  }
  
  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .form-group label {
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
  }
  
  .form-group input,
  .form-group textarea {
    padding: 0.5rem 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    font-size: 0.875rem;
  }
  
  .form-group input:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: #0d9488;
  }
  
  /* Visual Mode */
  .visual-mode {
    margin-bottom: 1.5rem;
  }

  /* Background Section */
  .background-section {
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    padding: 1rem;
    margin-bottom: 1.5rem;
  }

  .section-title {
    font-size: 0.875rem;
    font-weight: 600;
    color: #374151;
    margin: 0 0 0.75rem 0;
  }

  .background-controls {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }

  .bg-color-control {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    position: relative;
  }

  .color-value {
    font-size: 0.75rem;
    color: #6b7280;
    font-family: monospace;
  }

  .btn-clear {
    padding: 0.125rem 0.375rem;
    font-size: 0.75rem;
    background: #fee2e2;
    color: #ef4444;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
  }

  .btn-clear:hover {
    background: #fecaca;
  }

  .custom-color {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
    padding-top: 0.5rem;
    border-top: 1px solid #e5e7eb;
  }

  .custom-color label {
    font-size: 0.75rem;
    color: #6b7280;
  }

  .bg-image-control {
    position: relative;
  }

  .btn-choose-bg {
    padding: 0.5rem 0.75rem;
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    cursor: pointer;
  }

  .btn-choose-bg:hover {
    background: #2563eb;
  }

  .bg-image-preview {
    position: relative;
    display: inline-block;
  }

  .bg-image-preview img {
    width: 100px;
    height: 60px;
    object-fit: cover;
    border-radius: 0.375rem;
    border: 2px solid #e5e7eb;
  }

  .btn-remove-image {
    position: absolute;
    top: -8px;
    right: -8px;
    width: 20px;
    height: 20px;
    background: #ef4444;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .btn-remove-image:hover {
    background: #dc2626;
  }

  .block-selector {
    margin-bottom: 1rem;
  }
  
  .selector-label {
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
    margin-bottom: 0.5rem;
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
    padding: 0.5rem 0.75rem;
    background: white;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .block-btn:hover {
    background: #f9fafb;
    border-color: #0d9488;
  }
  
  .block-icon {
    font-size: 1rem;
  }
  
  .block-label {
    font-size: 0.875rem;
  }
  
  .blocks-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .empty-blocks {
    text-align: center;
    padding: 2rem;
    background: #f9fafb;
    border: 2px dashed #e5e7eb;
    border-radius: 0.5rem;
    color: #6b7280;
  }
  
  .block-item {
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    background: white;
  }
  
  .block-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    background: #f9fafb;
    border-bottom: 1px solid #e5e7eb;
    border-radius: 0.5rem 0.5rem 0 0;
  }
  
  .block-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .block-number {
    font-size: 0.75rem;
    color: #6b7280;
  }
  
  .block-type-badge {
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;
    color: #0d9488;
    background: rgba(13, 148, 136, 0.1);
    padding: 0.125rem 0.5rem;
    border-radius: 0.25rem;
  }
  
  .block-actions {
    display: flex;
    gap: 0.25rem;
  }
  
  .action-btn {
    padding: 0.25rem 0.5rem;
    border: 1px solid #d1d5db;
    background: white;
    border-radius: 0.25rem;
    cursor: pointer;
    font-size: 0.875rem;
  }
  
  .action-btn:hover:not(:disabled) {
    background: #f3f4f6;
  }
  
  .action-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .action-btn.delete {
    border-color: #fecaca;
    background: #fef2f2;
    color: #ef4444;
  }
  
  .block-content {
    padding: 1rem;
  }
  
  .block-controls {
    display: flex;
    gap: 1rem;
    margin-bottom: 0.75rem;
    flex-wrap: wrap;
  }
  
  .control-group {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .control-group label {
    font-size: 0.75rem;
    color: #6b7280;
  }
  
  .control-group select,
  .control-group input[type="range"] {
    font-size: 0.875rem;
    padding: 0.25rem 0.5rem;
    border: 1px solid #d1d5db;
    border-radius: 0.25rem;
  }
  
  .color-btn {
    width: 1.5rem;
    height: 1.5rem;
    border: 2px solid #e5e7eb;
    border-radius: 0.25rem;
    cursor: pointer;
  }
  
  .color-btn.small {
    width: 1.25rem;
    height: 1.25rem;
  }
  
  .color-picker-popup {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 10;
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    padding: 0.75rem;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
    margin-top: 0.5rem;
    width: 280px;
  }
  
  .color-picker-popup.small {
    width: 240px;
  }
  
  .picker-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }
  
  .picker-header span {
    font-size: 0.875rem;
    font-weight: 500;
  }
  
  .picker-header button {
    background: none;
    border: none;
    cursor: pointer;
    color: #6b7280;
  }
  
  .color-grid {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 0.25rem;
  }
  
  .color-option {
    width: 100%;
    aspect-ratio: 1;
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 0.25rem;
    cursor: pointer;
  }
  
  .color-option:hover {
    transform: scale(1.1);
  }
  
  .block-input,
  .block-textarea {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
  }
  
  .block-input:focus,
  .block-textarea:focus {
    outline: none;
    border-color: #0d9488;
  }
  
  .block-textarea {
    resize: vertical;
    font-family: inherit;
  }
  
  .format-toolbar {
    display: flex;
    gap: 0.25rem;
    margin-bottom: 0.5rem;
  }
  
  .format-toolbar button {
    padding: 0.25rem 0.5rem;
    background: #f3f4f6;
    border: 1px solid #d1d5db;
    border-radius: 0.25rem;
    cursor: pointer;
    font-size: 0.875rem;
  }
  
  .format-toolbar button:hover {
    background: #e5e7eb;
  }
  
  .format-toolbar button.italic {
    font-style: italic;
  }
  
  .format-toolbar .highlight-btn {
    background: #fef3c7;
  }
  
  .format-toolbar .relative {
    position: relative;
  }
  
  .highlight-popup {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 10;
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 0.375rem;
    padding: 0.5rem;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 0.25rem;
    margin-top: 0.25rem;
    display: none;
  }
  
  .format-toolbar .relative:hover .highlight-popup {
    display: grid;
  }
  
  .highlight-option {
    width: 1.5rem;
    height: 1.5rem;
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 0.25rem;
    cursor: pointer;
  }
  
  .btn-choose-image {
    padding: 0.5rem 0.75rem;
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    cursor: pointer;
    margin-top: 0.5rem;
  }
  
  .btn-choose-image:hover {
    background: #2563eb;
  }
  
  .image-selector {
    margin-top: 0.5rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.375rem;
    max-height: 200px;
    overflow-y: auto;
  }
  
  .image-option {
    width: 100%;
    text-align: left;
    padding: 0.5rem 0.75rem;
    background: white;
    border: none;
    border-bottom: 1px solid #f3f4f6;
    cursor: pointer;
    font-size: 0.875rem;
  }
  
  .image-option:hover {
    background: #f9fafb;
  }
  
  .no-images {
    padding: 1rem;
    text-align: center;
    color: #6b7280;
    font-size: 0.875rem;
  }
  
  /* Nested blocks */
  .nested-blocks {
    border-left: 3px solid #0d9488;
    padding-left: 1rem;
    margin-top: 0.75rem;
  }
  
  .nested-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }
  
  .nested-header span {
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
  }
  
  .nested-actions {
    display: flex;
    gap: 0.25rem;
  }
  
  .nested-actions button {
    padding: 0.25rem 0.5rem;
    background: #0d9488;
    color: white;
    border: none;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    cursor: pointer;
  }
  
  .nested-actions button:hover {
    background: #0f766e;
  }
  
  .nested-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .nested-item {
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 0.375rem;
    padding: 0.75rem;
  }
  
  .nested-header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }
  
  .nested-header-row span {
    font-size: 0.875rem;
    font-weight: 500;
  }
  
  .nested-header-row button {
    background: none;
    border: none;
    color: #ef4444;
    cursor: pointer;
    font-size: 1.25rem;
    line-height: 1;
  }
  
  .nested-controls {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    position: relative;
  }
  
  .nested-controls select {
    font-size: 0.875rem;
    padding: 0.25rem;
    border: 1px solid #d1d5db;
    border-radius: 0.25rem;
  }
  
  .nested-input,
  .nested-textarea {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #d1d5db;
    border-radius: 0.25rem;
    font-size: 0.875rem;
  }
  
  .no-nested {
    font-size: 0.875rem;
    color: #6b7280;
    font-style: italic;
    margin: 0;
  }
  
  /* Code Mode */
  .code-mode {
    margin-bottom: 1.5rem;
  }
  
  .code-editor {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    font-family: monospace;
    font-size: 0.875rem;
    resize: vertical;
  }
  
  /* Preview Section */
  .preview-section {
    border-top: 1px solid #e5e7eb;
    padding-top: 1.5rem;
  }
  
  .preview-section h3 {
    font-size: 0.875rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.75rem;
  }
  
  .preview-box {
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    padding: 1rem;
    background: #fafafa;
    min-height: 100px;
    max-height: 300px;
    overflow: auto;
  }
  
  .preview-box :global(*) {
    max-width: 100%;
  }
  
  /* Footer */
  .builder-footer {
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
    padding: 1rem 1.5rem;
    border-top: 1px solid #e5e7eb;
    background: #f9fafb;
  }
  
  .btn-secondary {
    padding: 0.5rem 1rem;
    background: white;
    color: #374151;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    cursor: pointer;
  }
  
  .btn-secondary:hover {
    background: #f3f4f6;
  }
  
  .btn-primary {
    padding: 0.5rem 1rem;
    background: #0d9488;
    color: white;
    border: none;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    cursor: pointer;
  }
  
  .btn-primary:hover {
    background: #0f766e;
  }
  
  /* Responsive */
  @media (max-width: 640px) {
    .form-row {
      grid-template-columns: 1fr;
    }
    
    .block-controls {
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .mode-toggle {
      flex-direction: column;
    }
  }
</style>