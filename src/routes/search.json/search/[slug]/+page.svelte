<script>
    let searchTerm = '';
    let searchResults = [];
  
    async function search() {
      if (searchTerm.length < 3) return;
      const response = await fetch(`/api/search?q=${searchTerm}`);
      const data = await response.json();
      searchResults = data.map(item => item.attributes);
    }
  </script>
  
  <input type="search" bind:value={searchTerm} on:input={search} />
  
  <ul>
    {#each searchResults as result}
      <li>
        <a href="/{result.slug}">{result.title}</a>
      </li>
    {/each}
  </ul>