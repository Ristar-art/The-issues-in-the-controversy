<script>
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import { compressImageToWebp } from '$lib/utils/compress-image';

  let media = $state([]);
  let loading = $state(true);
  let uploading = $state(false);
  let uploadProgress = $state('');
  let filter = $state('all');
  let searchQuery = $state('');
  let selectedFile = $state(null);
  let copied = $state(false);
  let dragOver = $state(false);
  let error = $state('');

  // Picker mode — when opened from component builder
  let pickerMode = $derived(page.url.searchParams.get('picker') === 'true');

  function pickFile(file) {
    if (window.opener) {
      window.opener.postMessage({ type: 'gallery-pick', url: file.url, name: file.name }, '*');
      window.close();
    }
  }

  const ACCEPT_MAP = {
    all: 'image/*,audio/*,video/*',
    images: 'image/*',
    audio: 'audio/*',
    video: 'video/*',
  };

  async function fetchMedia() {
    loading = true;
    error = '';
    try {
      const typeParam = filter !== 'all' ? `?type=${filter}` : '';
      const res = await fetch(`/api/media${typeParam}`);
      if (!res.ok) throw new Error('Failed to load media');
      media = await res.json();
    } catch (err) {
      error = err.message;
      console.error(err);
    } finally {
      loading = false;
    }
  }

  async function uploadFiles(files) {
    if (!files.length) return;
    uploading = true;
    error = '';
    let uploaded = 0;

    for (const file of files) {
      uploadProgress = `Uploading ${uploaded + 1} of ${files.length}: ${file.name}`;
      const toUpload = await compressImageToWebp(file);
      const formData = new FormData();
      formData.append('file', toUpload);

      try {
        const res = await fetch('/api/media', { method: 'POST', body: formData });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.message || `Failed to upload ${file.name}`);
        }
        uploaded++;
      } catch (err) {
        error = err.message;
        console.error(err);
      }
    }

    uploadProgress = '';
    uploading = false;
    await fetchMedia();
  }

  function handleFileInput(e) {
    const files = Array.from(e.target.files || []);
    uploadFiles(files);
    e.target.value = '';
  }

  function handleDrop(e) {
    e.preventDefault();
    dragOver = false;
    const files = Array.from(e.dataTransfer.files || []);
    uploadFiles(files);
  }

  function handleDragOver(e) {
    e.preventDefault();
    dragOver = true;
  }

  function handleDragLeave() {
    dragOver = false;
  }

  async function deleteFile(file) {
    if (!confirm(`Delete "${file.name}"? This cannot be undone.`)) return;
    try {
      const res = await fetch('/api/media', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: file.path }),
      });
      if (!res.ok) throw new Error('Failed to delete');
      if (selectedFile?.path === file.path) selectedFile = null;
      await fetchMedia();
    } catch (err) {
      error = err.message;
    }
  }

  async function copyUrl(url) {
    await navigator.clipboard.writeText(url);
    copied = true;
    setTimeout(() => (copied = false), 2000);
  }

  function formatSize(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
    });
  }

  function getCategoryIcon(category) {
    if (category === 'images') return 'img';
    if (category === 'audio') return 'aud';
    if (category === 'video') return 'vid';
    return '?';
  }

  onMount(fetchMedia);

  let filteredMedia = $derived(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return media;
    return media.filter(f => f.name.toLowerCase().includes(q));
  });

  let counts = $derived({
    all: media.length,
    images: media.filter(f => f.category === 'images').length,
    audio: media.filter(f => f.category === 'audio').length,
    video: media.filter(f => f.category === 'video').length,
  });
</script>

<div class="gallery">
  <!-- Header -->
  {#if pickerMode}
    <div class="picker-banner">Click a file to select it</div>
  {/if}
  <div class="gallery-header">
    <h1>{pickerMode ? 'Pick a File' : 'Media Gallery'}</h1>
    <label class="upload-btn" class:disabled={uploading}>
      {uploading ? uploadProgress : 'Upload Files'}
      <input
        type="file"
        multiple
        accept={ACCEPT_MAP[filter]}
        onchange={handleFileInput}
        disabled={uploading}
        hidden
      />
    </label>
  </div>

  <!-- Filters -->
  <div class="toolbar">
    <div class="filter-tabs">
      <button class:active={filter === 'all'} onclick={() => { filter = 'all'; fetchMedia(); }}>
        All ({counts.all})
      </button>
      <button class:active={filter === 'images'} onclick={() => { filter = 'images'; fetchMedia(); }}>
        Images ({counts.images})
      </button>
      <button class:active={filter === 'audio'} onclick={() => { filter = 'audio'; fetchMedia(); }}>
        Audio ({counts.audio})
      </button>
      <button class:active={filter === 'video'} onclick={() => { filter = 'video'; fetchMedia(); }}>
        Video ({counts.video})
      </button>
    </div>
    <input
      type="text"
      class="search-input"
      placeholder="Filter by name..."
      bind:value={searchQuery}
    />
  </div>

  {#if error}
    <div class="error-banner">{error}</div>
  {/if}

  <!-- Drop Zone + Grid -->
  <div
    class="drop-zone"
    class:drag-over={dragOver}
    ondrop={handleDrop}
    ondragover={handleDragOver}
    ondragleave={handleDragLeave}
    role="region"
  >
    {#if loading}
      <div class="loading-state">
        <div class="spinner" aria-label="Loading media"></div>
      </div>
    {:else if filteredMedia().length === 0}
      <div class="empty-state">
        {#if searchQuery.trim()}
          <p>No files match "{searchQuery}".</p>
        {:else}
          <p>No media files yet.</p>
          <p class="hint">Drag and drop files here, or click "Upload Files" above.</p>
        {/if}
      </div>
    {:else}
      <div class="media-grid">
        {#each filteredMedia() as file}
          <button
            class="media-card"
            class:selected={selectedFile?.path === file.path}
            onclick={() => {
              if (pickerMode) {
                pickFile(file);
              } else {
                selectedFile = selectedFile?.path === file.path ? null : file;
              }
            }}
          >
            <div class="media-preview">
              {#if file.category === 'images'}
                <img src={file.url} alt={file.name} loading="lazy" />
              {:else if file.category === 'audio'}
                <div class="media-icon audio-icon">
                  <span class="icon-label">AUDIO</span>
                  <span class="icon-ext">{file.name.split('.').pop()?.toUpperCase()}</span>
                </div>
              {:else if file.category === 'video'}
                <div class="media-icon video-icon">
                  <span class="icon-label">VIDEO</span>
                  <span class="icon-ext">{file.name.split('.').pop()?.toUpperCase()}</span>
                </div>
              {/if}
            </div>
            <div class="media-name" title={file.name}>{file.name}</div>
          </button>
        {/each}
      </div>
    {/if}

    {#if dragOver}
      <div class="drop-overlay">Drop files to upload</div>
    {/if}
  </div>

  <!-- Detail Panel -->
  {#if selectedFile}
    <div class="detail-panel">
      <div class="detail-header">
        <h3>File Details</h3>
        <button class="close-btn" onclick={() => (selectedFile = null)}>&times;</button>
      </div>

      <div class="detail-preview">
        {#if selectedFile.category === 'images'}
          <img src={selectedFile.url} alt={selectedFile.name} />
        {:else if selectedFile.category === 'audio'}
          <audio controls src={selectedFile.url} preload="metadata">
            <track kind="captions" />
          </audio>
        {:else if selectedFile.category === 'video'}
          <video controls src={selectedFile.url} preload="metadata">
            <track kind="captions" />
          </video>
        {/if}
      </div>

      <div class="detail-meta">
        <div class="meta-row">
          <span class="meta-label">Name</span>
          <span class="meta-value">{selectedFile.name}</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">Type</span>
          <span class="meta-value">{selectedFile.contentType}</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">Size</span>
          <span class="meta-value">{formatSize(selectedFile.size)}</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">Uploaded</span>
          <span class="meta-value">{formatDate(selectedFile.created)}</span>
        </div>
      </div>

      <div class="detail-actions">
        <button class="btn-copy" onclick={() => copyUrl(selectedFile.url)}>
          {copied ? 'Copied!' : 'Copy URL'}
        </button>
        <a class="btn-open" href={selectedFile.url} target="_blank" rel="noopener">
          Open in new tab
        </a>
        <button class="btn-delete" onclick={() => deleteFile(selectedFile)}>
          Delete
        </button>
      </div>
    </div>
  {/if}
</div>

<style>
  .gallery {
    max-width: 1100px;
    margin: 0 auto;
    padding: 2rem 1.5rem;
  }

  .picker-banner {
    background: var(--color-ink);
    color: var(--color-paper);
    text-align: center;
    padding: 0.5rem;
    font-size: 0.85rem;
    font-weight: 600;
    border-radius: 6px;
    margin-bottom: 1rem;
  }

  /* Header */
  .gallery-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
  }

  .gallery-header h1 {
    font-size: 1.75rem;
    margin: 0;
  }

  .upload-btn {
    padding: 0.55rem 1.2rem;
    background: var(--color-ink);
    color: var(--color-paper);
    border: none;
    border-radius: 6px;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s;
  }

  .upload-btn:hover:not(.disabled) {
    background: var(--color-charcoal);
  }

  .upload-btn.disabled {
    opacity: 0.6;
    cursor: wait;
  }

  /* Toolbar */
  .toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .filter-tabs {
    display: flex;
    gap: 0.25rem;
    background: var(--color-paper);
    border: 1px solid var(--color-pearl);
    border-radius: 6px;
    padding: 0.2rem;
  }

  .filter-tabs button {
    padding: 0.35rem 0.75rem;
    border: none;
    background: none;
    border-radius: 4px;
    font-size: 0.8rem;
    color: var(--color-stone);
    cursor: pointer;
    font-weight: 500;
    transition: all 0.15s;
  }

  .filter-tabs button.active {
    background: var(--color-ink);
    color: var(--color-paper);
  }

  .filter-tabs button:hover:not(.active) {
    color: var(--color-ink);
  }

  .search-input {
    padding: 0.45rem 0.75rem;
    border: 1px solid var(--color-pearl);
    border-radius: 6px;
    font-size: 0.85rem;
    background: var(--color-paper);
    color: var(--color-ink);
    outline: none;
    width: 200px;
    transition: border-color 0.15s;
  }

  .search-input:focus {
    border-color: var(--color-stone);
  }

  /* Error */
  .error-banner {
    background: #fef2f2;
    color: #991b1b;
    border: 1px solid #fecaca;
    border-radius: 6px;
    padding: 0.6rem 1rem;
    font-size: 0.85rem;
    margin-bottom: 1rem;
  }

  /* Drop Zone */
  .drop-zone {
    position: relative;
    min-height: 300px;
    border: 2px dashed var(--color-pearl);
    border-radius: 10px;
    transition: border-color 0.15s, background 0.15s;
  }

  .drop-zone.drag-over {
    border-color: var(--color-stone);
    background: rgba(0, 0, 0, 0.02);
  }

  .drop-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--color-stone);
    pointer-events: none;
  }

  .loading-state,
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 250px;
    color: var(--color-stone);
    font-size: 0.9rem;
  }

  .spinner {
    width: 2.5rem;
    height: 2.5rem;
    border: 3px solid var(--color-pearl);
    border-top-color: var(--color-ink);
    border-radius: 50%;
    animation: spinner-rotate 0.8s linear infinite;
  }

  @keyframes spinner-rotate {
    to { transform: rotate(360deg); }
  }

  .empty-state p {
    margin: 0.2rem 0;
  }

  .hint {
    font-size: 0.8rem;
    color: var(--color-warm-gray);
  }

  /* Media Grid */
  .media-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 0.75rem;
    padding: 1rem;
  }

  .media-card {
    background: var(--color-paper);
    border: 2px solid var(--color-pearl);
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.15s;
    padding: 0;
    text-align: left;
  }

  .media-card:hover {
    border-color: var(--color-stone);
  }

  .media-card.selected {
    border-color: var(--color-ink);
    box-shadow: 0 0 0 1px var(--color-ink);
  }

  .media-preview {
    aspect-ratio: 1;
    overflow: hidden;
    background: var(--color-cream);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .media-preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .media-icon {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
  }

  .icon-label {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .icon-ext {
    font-size: 0.65rem;
    color: var(--color-warm-gray);
    font-weight: 600;
  }

  .audio-icon {
    color: var(--color-accent);
  }

  .video-icon {
    color: #6366f1;
  }

  .media-name {
    padding: 0.4rem 0.5rem;
    font-size: 0.72rem;
    color: var(--color-graphite);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    border-top: 1px solid var(--color-pearl);
  }

  /* Detail Panel */
  .detail-panel {
    position: fixed;
    right: 0;
    top: 3rem;
    bottom: 0;
    width: 340px;
    background: var(--color-paper);
    border-left: 1px solid var(--color-pearl);
    padding: 1.25rem;
    overflow-y: auto;
    box-shadow: -4px 0 12px rgba(0, 0, 0, 0.05);
    z-index: 40;
  }

  .detail-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .detail-header h3 {
    margin: 0;
    font-size: 1rem;
  }

  .close-btn {
    background: none;
    border: none;
    font-size: 1.4rem;
    cursor: pointer;
    color: var(--color-stone);
    padding: 0;
    line-height: 1;
  }

  .close-btn:hover {
    color: var(--color-ink);
  }

  .detail-preview {
    margin-bottom: 1rem;
    border-radius: 6px;
    overflow: hidden;
    background: var(--color-cream);
  }

  .detail-preview img {
    width: 100%;
    display: block;
  }

  .detail-preview audio {
    width: 100%;
    display: block;
    padding: 1rem;
  }

  .detail-preview video {
    width: 100%;
    display: block;
  }

  /* Meta */
  .detail-meta {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1.25rem;
  }

  .meta-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    font-size: 0.8rem;
  }

  .meta-label {
    color: var(--color-stone);
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.7rem;
    letter-spacing: 0.04em;
  }

  .meta-value {
    color: var(--color-ink);
    text-align: right;
    word-break: break-all;
    max-width: 60%;
  }

  /* Detail Actions */
  .detail-actions {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .btn-copy,
  .btn-open,
  .btn-delete {
    display: block;
    width: 100%;
    padding: 0.5rem;
    border-radius: 6px;
    font-size: 0.8rem;
    font-weight: 600;
    text-align: center;
    cursor: pointer;
    transition: all 0.15s;
    text-decoration: none;
  }

  .btn-copy {
    background: var(--color-ink);
    color: var(--color-paper);
    border: none;
  }

  .btn-copy:hover {
    background: var(--color-charcoal);
  }

  .btn-open {
    background: none;
    border: 1px solid var(--color-pearl);
    color: var(--color-ink);
  }

  .btn-open:hover {
    border-color: var(--color-stone);
  }

  .btn-delete {
    background: none;
    border: 1px solid #fecaca;
    color: #991b1b;
  }

  .btn-delete:hover {
    background: #fef2f2;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .toolbar {
      flex-direction: column;
      align-items: stretch;
    }

    .search-input {
      width: 100%;
    }

    .media-grid {
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    }

    .detail-panel {
      width: 100%;
      top: auto;
      bottom: 0;
      max-height: 50vh;
      border-left: none;
      border-top: 1px solid var(--color-pearl);
    }
  }
</style>
