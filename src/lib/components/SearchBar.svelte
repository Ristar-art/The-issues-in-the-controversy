<!-- search bar -->
<script>
    let { config } = $props();

    let searchTerm = '';
    let searchResults = [];
  
    async function search() {
    //   if (searchTerm.length < 3) return;
    //   const response = await fetch(`/api/search?q=${searchTerm}`);
    //   const data = await response.json();
    //   searchResults = data.map(item => item.attributes);
    }
  </script>
  
<div class="relative w-full max-w-md mx-auto mt-8 ">
    <input 
        type="text" 
        placeholder={config.placeholder}
        class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        bind:value={searchTerm}
        on:input={search}
    />
    <button 
        class="absolute top-0 right-0 px-4 py-2 bg-teal-500 text-white rounded-r-lg hover:bg-teal-600 focus:outline-none"
        on:click={search}
    >
        {config.buttonLabel}
    </button>
</div>
