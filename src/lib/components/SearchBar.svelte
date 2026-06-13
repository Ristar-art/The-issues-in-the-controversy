<!-- search bar -->
<script>
  import { goto } from '$app/navigation';
  let { config } = $props();

  let searchTerm = $state('');
  let searchResults = $state([]);
  let isSearching = $state(false);
  let showResults = $state(false);
  let debounceTimer;
  let positionAbove = $state(false);
  let dropdownRef;
  let containerRef;

  function updateDropdownPosition() {
    if (!containerRef || !showResults) return;
    const rect = containerRef.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const dropdownHeight = 384;
    positionAbove = spaceBelow < dropdownHeight && spaceAbove > spaceBelow;
  }

  $effect(() => {
    if (showResults) setTimeout(updateDropdownPosition, 0);
  });

  async function search() {
    if (searchTerm.length < 1) {
      searchResults = [];
      showResults = false;
      isSearching = false;
      clearTimeout(debounceTimer);
      return;
    }
    showResults = true;
    isSearching = true;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(async () => {
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`);
        if (!response.ok) throw new Error(`Search failed: ${response.status}`);
        const data = await response.json();
        if (data.error) throw new Error(data.error);
        searchResults = Array.isArray(data) ? data : [];
      } catch (error) {
        console.error('Search error:', error);
        searchResults = [];
      } finally {
        isSearching = false;
      }
    }, 300);
  }

  function handleResultClick(result) {
    const attrs = result?.attributes ?? {};
    showResults = false;
    searchTerm = '';
    if (result?.type === 'page' && attrs.slug) goto(`/${attrs.slug}`);
    else if (attrs.slug) goto(`/${attrs.slug}`);
  }

  function clearSearch() {
    searchTerm = '';
    searchResults = [];
    showResults = false;
  }

  function getContentSnippet(result) {
    const rawContent = result?.attributes?.content ?? result?.content ?? '';
    if (!rawContent) return '';
    const plainText = rawContent.replace(/<[^>]*>/g, '');
    if (!plainText) return '';
    return plainText.length > 100 ? `${plainText.substring(0, 100)}...` : plainText;
  }
</script>

<section class="doc-sb">
  <div class="doc-sb__wrap" bind:this={containerRef}>
    <p class="doc-sb__label">Search the Archive</p>
    <div class="doc-sb__field">
      <!-- Search Icon -->
      <svg class="doc-sb__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>

      <!-- Search Input -->
      <input
        type="text"
        placeholder={config?.placeholder ?? 'Search the archives…'}
        class="doc-sb__input"
        bind:value={searchTerm}
        on:input={search}
        on:focus={() => { if (searchTerm.length >= 1) showResults = true; }}
        on:keydown={(e) => {
          if (e.key === 'Escape') { showResults = false; e.currentTarget.blur(); }
        }}
      />

      <!-- Search Button -->
      <button class="doc-sb__btn" on:click={search}>
        {config?.buttonLabel ?? 'Search'}
      </button>
    </div>

    <!-- Search Results Dropdown -->
    {#if showResults && searchTerm.length >= 1}
      <div bind:this={dropdownRef} class="doc-sb__results" class:doc-sb__results--above={positionAbove}>
        {#if isSearching}
          <div class="doc-sb__status">
            <span class="doc-sb__spinner"></span>
            Searching…
          </div>
        {:else if searchResults.length === 0}
          <div class="doc-sb__status">
            No results found for "{searchTerm}"
          </div>
        {:else}
          {#each searchResults as result (result?.id)}
            {#if result}
              <button type="button" class="doc-sb__result" on:click={() => handleResultClick(result)}>
                <div class="doc-sb__result-title">{result.attributes?.title ?? result.title ?? 'Untitled'}</div>
                <div class="doc-sb__result-meta">
                  {#if result.type === 'page'}
                    <span class="doc-sb__tag">Topic</span>
                  {:else}
                    <span class="doc-sb__tag">Article</span>
                  {/if}
                  {#if getContentSnippet(result)}
                    <span class="doc-sb__dot">•</span>
                    {getContentSnippet(result)}
                  {/if}
                </div>
              </button>
            {/if}
          {/each}
        {/if}
      </div>
    {/if}
  </div>

  {#if showResults}
    <button type="button" class="doc-sb__scrim" on:click={clearSearch} aria-label="Close search results"></button>
  {/if}
</section>

<style>
  .doc-sb { background: var(--doc-bg); }
  .doc-sb__wrap { max-width: 48rem; margin: 0 auto; padding: 2.5rem 1.5rem; position: relative; }
  .doc-sb__label {
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 0.625rem; letter-spacing: 0.34em; text-transform: uppercase;
    color: var(--doc-ember); margin: 0 0 0.9rem 0.2rem;
  }
  .doc-sb__field {
    display: flex; align-items: center;
    background: var(--doc-bg-2);
    border: 1px solid var(--doc-line);
    border-radius: 2px;
    transition: border-color 0.3s ease, background 0.3s ease;
  }
  .doc-sb__field:focus-within { border-color: var(--doc-ember); background: var(--doc-bg-3); }
  .doc-sb__icon { width: 1.25rem; height: 1.25rem; color: var(--doc-dim); margin-left: 1rem; flex: none; }
  .doc-sb__input {
    width: 100%; background: transparent; border: none; outline: none;
    padding: 0.95rem 1rem;
    font-family: 'Public Sans', sans-serif; font-size: 0.95rem;
    color: var(--doc-ink);
  }
  .doc-sb__input::placeholder { color: var(--doc-dim); }
  .doc-sb__btn {
    flex: none;
    padding: 0.95rem 1.4rem;
    background: none; border: none; cursor: pointer;
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 0.6875rem; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--doc-ember-soft);
    transition: color 0.3s ease;
  }
  .doc-sb__btn:hover { color: var(--doc-ember); }

  .doc-sb__results {
    position: absolute; left: 1.5rem; right: 1.5rem;
    top: calc(100% - 1rem); margin-top: 0.5rem;
    background: var(--doc-bg-2);
    border: 1px solid var(--doc-line);
    border-radius: 2px;
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.55);
    z-index: 50; max-height: 24rem; overflow-y: auto;
  }
  .doc-sb__results--above { top: auto; bottom: calc(100% - 1rem); margin-top: 0; margin-bottom: 0.5rem; }
  .doc-sb__status {
    padding: 1rem 1.5rem; text-align: center;
    font-family: 'Public Sans', sans-serif; color: var(--doc-muted);
  }
  .doc-sb__spinner {
    display: inline-block; width: 1rem; height: 1rem; margin-right: 0.5rem;
    border: 2px solid var(--doc-line); border-top-color: var(--doc-ember);
    border-radius: 999px; animation: docSpin 0.7s linear infinite;
    vertical-align: -0.2rem;
  }
  @keyframes docSpin { to { transform: rotate(360deg); } }
  .doc-sb__result {
    display: block; width: 100%; text-align: left; cursor: pointer;
    padding: 1rem 1.5rem; background: none; border: none;
    border-bottom: 1px solid var(--doc-line-soft);
    transition: background 0.25s ease;
  }
  .doc-sb__result:last-child { border-bottom: none; }
  .doc-sb__result:hover { background: var(--doc-bg-3); }
  .doc-sb__result-title {
    font-family: 'Newsreader', Georgia, serif; font-size: 1.15rem;
    color: var(--doc-ink); margin-bottom: 0.3rem;
  }
  .doc-sb__result-meta { font-family: 'Public Sans', sans-serif; font-size: 0.85rem; color: var(--doc-muted); }
  .doc-sb__tag {
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 0.625rem; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--doc-ember-soft);
  }
  .doc-sb__dot { margin: 0 0.5rem; color: var(--doc-dim); }
  .doc-sb__scrim { position: fixed; inset: 0; z-index: 40; cursor: default; background: none; border: none; }
</style>
