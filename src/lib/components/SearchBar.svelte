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

<section class="bg-[var(--ea-surface)]">
  <div class="max-w-3xl mx-auto px-6 py-10 relative" bind:this={containerRef}>
    <div class="relative flex items-center bg-[var(--ea-surface-high)] rounded-md focus-within:bg-[var(--ea-surface-lowest)] focus-within:border-b-2 focus-within:border-[var(--ea-primary)] transition-colors">
      <!-- Search Icon -->
      <div class="pl-4 pr-2">
        <svg class="w-5 h-5 text-[var(--ea-on-surface-variant)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <!-- Search Input -->
      <input
        type="text"
        placeholder={config?.placeholder ?? 'Search the archives...'}
        class="w-full bg-transparent py-3 pr-4 font-body text-[var(--ea-on-surface)] placeholder-[var(--ea-on-surface-variant)] focus:outline-none"
        bind:value={searchTerm}
        on:input={search}
        on:focus={() => { if (searchTerm.length >= 1) showResults = true; }}
        on:keydown={(e) => {
          if (e.key === 'Escape') { showResults = false; e.currentTarget.blur(); }
        }}
      />

      <!-- Search Button -->
      <button
        class="px-4 md:px-6 py-3 font-label text-xs font-bold uppercase tracking-[0.2em] text-[var(--ea-primary)] hover:text-[var(--ea-secondary)] transition-colors"
        on:click={search}
      >
        {config?.buttonLabel ?? 'Search'}
      </button>
    </div>

    <!-- Search Results Dropdown -->
    {#if showResults && searchTerm.length >= 1}
      <div bind:this={dropdownRef} class="absolute {positionAbove ? 'bottom-full mb-2' : 'top-full mt-2'} left-6 right-6 bg-[var(--ea-surface-lowest)] shadow-2xl rounded-md z-50 max-h-96 overflow-y-auto">
        {#if isSearching}
          <div class="px-6 py-4 text-[var(--ea-on-surface-variant)] text-center font-body">
            <span class="inline-block w-4 h-4 border-2 border-[var(--ea-outline-variant)] border-t-[var(--ea-primary)] rounded-full animate-spin mr-2"></span>
            Searching...
          </div>
        {:else if searchResults.length === 0}
          <div class="px-6 py-4 text-[var(--ea-on-surface-variant)] text-center font-body">
            No results found for "{searchTerm}"
          </div>
        {:else}
          {#each searchResults as result (result?.id)}
            {#if result}
              <button
                type="button"
                class="w-full text-left px-6 py-4 hover:bg-[var(--ea-surface-low)] cursor-pointer transition-colors"
                on:click={() => handleResultClick(result)}
              >
                <div class="font-headline text-lg text-[var(--ea-primary)] mb-1">{result.attributes?.title ?? result.title ?? 'Untitled'}</div>
                <div class="font-body text-sm text-[var(--ea-on-surface-variant)]">
                  {#if result.type === 'page'}
                    <span class="text-[var(--ea-secondary)] font-label uppercase tracking-[0.2em] text-xs font-bold">Topic</span>
                  {:else}
                    <span class="text-[var(--ea-secondary)] font-label uppercase tracking-[0.2em] text-xs font-bold">Article</span>
                  {/if}
                  {#if getContentSnippet(result)}
                    <span class="mx-2 text-[var(--ea-on-surface-variant)]/60">•</span>
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
    <button
      type="button"
      class="fixed inset-0 z-40 cursor-default"
      on:click={clearSearch}
      aria-label="Close search results"
    ></button>
  {/if}
</section>
