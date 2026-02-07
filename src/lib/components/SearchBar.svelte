<!-- search bar -->
<script>
  import { goto } from '$app/navigation';
  let { config } = $props();

  let searchTerm = $state('');
  let searchResults = $state([]);
  let isSearching = $state(false);
  let showResults = $state(false);
  let debounceTimer;

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

<div class="relative w-[75%] max-w-md mx-auto mt-2">
  <div class="relative">
      <input
          type="text"
          placeholder={config.placeholder}
          class="w-full px-4 py-2 pr-24 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
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
      <button
          class="absolute top-0 right-0 h-full px-4 bg-teal-500 text-white rounded-r-lg hover:bg-teal-600 focus:outline-none transition-colors"
          on:click={search}
      >
          {config.buttonLabel}
      </button>
  </div>

  {#if showResults && searchTerm.length >= 1}
      <div class="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {#if isSearching}
              <div class="px-4 py-3 text-gray-600 text-center">
                  <div class="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-teal-500 mr-2"></div>
                  Searching...
              </div>
          {:else if searchResults.length === 0}
              <div class="px-4 py-3 text-gray-600 text-center">
                  No results found for "{searchTerm}"
              </div>
          {:else}
              {#each searchResults as result (result?.id)}
                  {#if result}
                      <button
                          type="button"
                          class="w-full text-left px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                          on:click={() => handleResultClick(result)}
                      >
                          <div class="font-medium text-gray-900">{result.attributes?.title ?? result.title ?? 'Untitled'}</div>
                          <div class="text-sm text-gray-600 mt-1">
                              {#if result.type === 'page'}
                                  <span class="font-medium">Topic</span>
                              {:else}
                                  <span class="font-medium">Article</span>
                              {/if}
                              {#if getContentSnippet(result)}
                                  • {getContentSnippet(result)}
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