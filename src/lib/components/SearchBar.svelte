<!-- search bar -->
<script>
    import { goto } from '$app/navigation';
    let { config } = $props();

    let searchTerm = '';
    let searchResults = [];
    let isSearching = false;
    let showResults = false;
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
          
          searchResults = data || [];
          console.log(`✅ Search completed! Found ${searchResults.length} results:`, searchResults.map(r => ({ 
            id: r.id, 
            title: r.attributes.title, 
            type: r.type,
            contentPreview: r.attributes.content?.substring(0, 50) + '...'
          })));
          showResults = true;
        } catch (error) {
          console.error('❌ Search error:', error);
          searchResults = [];
          showResults = true; // Keep results open to show error message
        } finally {
          isSearching = false;
        }
      }, 300); // Debounce delay
    }

    function handleResultClick(result) {
      console.log('🖱️ Result clicked:', {
        id: result.id,
        title: result.attributes.title,
        type: result.type,
        slug: result.attributes.slug
      });
      
      showResults = false;
      searchTerm = '';

      // Navigate to the appropriate page based on type
      if (result.type === 'page') {
        console.log('🔗 Navigating to page:', `/${result.attributes.slug}`);
        goto(`/${result.attributes.slug}`);
      } else if (result.attributes.slug) {
        console.log('🔗 Navigating to slug:', `/${result.attributes.slug}`);
        goto(`/${result.attributes.slug}`);
      }
    }

    function clearSearch() {
      console.log('🧹 Clearing search');
      searchTerm = '';
      searchResults = [];
      showResults = false;
    }
  </script>
  
<div class="relative w-full max-w-md mx-auto mt-8">
    <input
        type="text"
        placeholder={config.placeholder}
        class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        bind:value={searchTerm}
        on:input={search}
        on:focus={() => { if (searchTerm.length >= 1) showResults = true; }}
        on:keydown={(e) => {
            if (e.key === 'Escape') {
                showResults = false;
                e.currentTarget.blur();
            }
        }}
    />
    <button
        class="absolute top-0 right-0 px-4 py-2 bg-teal-500 text-white rounded-r-lg hover:bg-teal-600 focus:outline-none"
        on:click={search}
    >
        {config.buttonLabel}
    </button>

    {#if showResults}
        <div class="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
            {#if isSearching}
                <div class="px-4 py-3 text-gray-600 text-center">
                    <div class="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-teal-500 mr-2"></div>
                    Searching...
                </div>
            {:else if searchResults.length === 0}
                <div class="px-4 py-3 text-gray-600 text-center">
                    {#if searchTerm}
                        No results found for "{searchTerm}"
                    {:else}
                        Enter a search term to find content
                    {/if}
                </div>
            {:else}
                {#each searchResults as result}
                    <div
                        class="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                        on:click={() => handleResultClick(result)}
                    >
                        <div class="font-medium text-gray-900">{result.attributes.title}</div>
                        <div class="text-sm text-gray-600 mt-1">
                            {#if result.type === 'page'}
                                Topic
                            {:else}
                                Article
                            {/if}
                            {#if result.attributes.content}
                                • {result.attributes.content.replace(/<[^>]*>/g, '').substring(0, 100)}{result.attributes.content.replace(/<[^>]*>/g, '').length > 100 ? '...' : ''}
                            {/if}
                        </div>
                    </div>
                {/each}
            {/if}
        </div>
    {/if}
</div>

<!-- Click outside to close results -->
{#if showResults}
    <div class="fixed inset-0 z-40" on:click={clearSearch}></div>
{/if}
