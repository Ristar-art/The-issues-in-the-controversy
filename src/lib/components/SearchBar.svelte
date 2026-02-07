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
    
    if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
      positionAbove = true;
    } else {
      positionAbove = false;
    }
  }

  $effect(() => {
    if (showResults) {
      setTimeout(updateDropdownPosition, 0);
    }
  });

  async function search() {
    console.log('🔍 Search input changed:', searchTerm);
    
    if (searchTerm.length < 1) {
      console.log('📝 Search cleared - hiding results');
      searchResults = [];
      showResults = false;
      isSearching = false;
      clearTimeout(debounceTimer);
      return;
    }

    // Show results immediately when typing
    showResults = true;
    isSearching = true;
    console.log('⏳ Starting search debounce for:', searchTerm);

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(async () => {
      try {
        console.log('🚀 Executing search for:', searchTerm);
        const response = await fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`);
        
        if (!response.ok) {
          throw new Error(`Search failed: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('📦 Raw API response:', data);
        
        if (data.error) {
          throw new Error(data.error);
        }
        
        searchResults = Array.isArray(data) ? data : [];
        console.log(`✅ Search completed! Found ${searchResults.length} results:`, searchResults.map(r => ({ 
          id: r.id, 
          title: r.attributes.title, 
          type: r.type,
          contentPreview: r.attributes.content?.substring(0, 50) + '...'
        })));
      } catch (error) {
        console.error('❌ Search error:', error);
        searchResults = [];
      } finally {
        isSearching = false;
      }
    }, 300);
  }

  function handleResultClick(result) {
    const attrs = result?.attributes ?? {};

    console.log('🖱️ Result clicked:', {
      id: result?.id,
      title: attrs.title,
      type: result?.type,
      slug: attrs.slug
    });
    
    showResults = false;
    searchTerm = '';

    // Navigate to the appropriate page based on type
    if (result?.type === 'page' && attrs.slug) {
      console.log('🔗 Navigating to page:', `/${attrs.slug}`);
      goto(`/${attrs.slug}`);
    } else if (attrs.slug) {
      console.log('🔗 Navigating to slug:', `/${attrs.slug}`);
      goto(`/${attrs.slug}`);
    }
  }

  function clearSearch() {
    console.log('🧹 Clearing search');
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

<div class="relative w-[75%] max-w-xl mx-auto py-8 border-b border-[var(--color-pearl)]" bind:this={containerRef}>
  <div class="relative">
    <!-- Search Icon -->
    <div class="absolute left-0 top-1/2 transform -translate-y-1/2">
      <svg class="w-5 h-5 text-[var(--color-warm-gray)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
      </svg>
    </div>
    
    <!-- Search Input -->
    <input
      type="text"
      placeholder={config.placeholder}
      class="w-full pl-10 pr-4 py-3 bg-transparent border-none font-body text-[var(--color-ink)] placeholder-[var(--color-silver)] focus:outline-none focus:ring-0"
      bind:value={searchTerm}
      on:input={search}
      on:focus={() => { 
        if (searchTerm.length >= 1) {
          showResults = true; 
        }
      }}
      on:keydown={(e) => {
        if (e.key === 'Escape') {
          showResults = false;
          e.currentTarget.blur();
        }
      }}
    />
    
    <!-- Search Button -->
    <button
      class="absolute right-0 top-1/2 transform -translate-y-1/2 font-body text-sm font-semibold text-[var(--color-stone)] hover:text-[var(--color-accent)] transition-colors uppercase tracking-wider"
      on:click={search}
    >
      {config.buttonLabel}
    </button>
  </div>

  <!-- Search Results Dropdown -->
  {#if showResults && searchTerm.length >= 1}
    <div bind:this={dropdownRef} class="absolute {positionAbove ? 'bottom-full mb-2' : 'top-full mt-2'} left-0 right-0 bg-[var(--color-paper)] border border-[var(--color-pearl)] shadow-xl z-50 max-h-96 overflow-y-auto">
      {#if isSearching}
        <div class="px-6 py-4 text-[var(--color-stone)] text-center font-body">
          <span class="inline-block w-4 h-4 border-2 border-[var(--color-pearl)] border-t-[var(--color-accent)] rounded-full animate-spin mr-2"></span>
          Searching...
        </div>
      {:else if searchResults.length === 0}
        <div class="px-6 py-4 text-[var(--color-stone)] text-center font-body">
          No results found for "{searchTerm}"
        </div>
      {:else}
        {#each searchResults as result (result?.id)}
          {#if result}
            <button
              type="button"
              class="w-full text-left px-6 py-4 hover:bg-[var(--color-cream)] cursor-pointer border-b border-[var(--color-pearl)] last:border-b-0 transition-colors"
              on:click={() => handleResultClick(result)}
            >
              <div class="font-headline text-[var(--color-ink)] mb-1">{result.attributes?.title ?? result.title ?? 'Untitled'}</div>
              <div class="font-body text-sm text-[var(--color-stone)]">
                {#if result.type === 'page'}
                  <span class="text-[var(--color-accent)] font-semibold uppercase tracking-wider text-xs">Topic</span>
                {:else}
                  <span class="text-[var(--color-accent)] font-semibold uppercase tracking-wider text-xs">Article</span>
                {/if}
                {#if getContentSnippet(result)}
                  <span class="mx-2 text-[var(--color-silver)]">•</span>
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

<!-- Click outside to close results -->
{#if showResults}
  <button 
    type="button"
    class="fixed inset-0 z-40 cursor-default" 
    on:click={clearSearch}
    aria-label="Close search results"
  ></button>
{/if}
