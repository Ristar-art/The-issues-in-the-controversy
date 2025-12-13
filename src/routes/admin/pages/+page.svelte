<script>
  import { onMount } from 'svelte';

  let articles = [];
  let components = [];
  let loading = true;
  let error = null;
  let newArticleTitle = '';
  let newArticleSlug = '';
  let newArticleContent = '';
  let selectedComponentIds = [];
  let creating = false;

  function slugify(text) {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  }

  $: if (newArticleTitle) newArticleSlug = slugify(newArticleTitle);

  async function fetchArticles() {
    try {
      const response = await fetch('/api/articles');
      if (!response.ok) throw new Error('Failed to fetch articles');
      articles = await response.json();
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  }

  async function fetchComponents() {
    try {
      const response = await fetch('/api/components');
      if (!response.ok) throw new Error('Failed to fetch components');
      components = await response.json();
    } catch (err) {
      console.error('Failed to fetch components:', err);
    }
  }

  async function createArticle() {
    if (!newArticleTitle || !newArticleSlug) return;

    creating = true;
    try {
      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newArticleTitle,
          slug: newArticleSlug,
          content: newArticleContent,
          componentIds: selectedComponentIds
        })
      });
      if (!response.ok) throw new Error('Failed to create article');
      await fetchArticles();
      newArticleTitle = '';
      newArticleSlug = '';
      newArticleContent = '';
      selectedComponentIds = [];
    } catch (err) {
      error = err.message;
    } finally {
      creating = false;
    }
  }

  async function deleteArticle(id) {
    if (!confirm('Are you sure you want to delete this article?')) return;

    try {
      const response = await fetch(`/api/articles?id=${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete article');
      await fetchArticles();
    } catch (err) {
      error = err.message;
    }
  }

  function toggleComponentSelection(componentId) {
    if (selectedComponentIds.includes(componentId)) {
      selectedComponentIds = selectedComponentIds.filter(id => id !== componentId);
    } else {
      selectedComponentIds = [...selectedComponentIds, componentId];
    }
  }

  onMount(async () => {
    await Promise.all([fetchArticles(), fetchComponents()]);
  });
</script>

<main class="max-w-5xl mx-auto py-8 px-4">
  <h1 class="text-2xl font-bold mb-6">Pages Editor</h1>

  {#if loading}
    <p class="text-gray-600">Loading pages...</p>
  {:else if error}
    <p class="text-red-600">Error: {error}</p>
  {:else}
    <div class="flex gap-6">
      <aside class="w-1/3 border-r pr-4">
        <div class="space-y-4">
          <h2 class="text-lg font-semibold">Available Pages</h2>
          <div class="space-y-2">
            {#each articles as article}
              <div class="p-3 border rounded-lg bg-gray-50">
                <h3 class="font-medium">{article.attributes.title}</h3>
                <p class="text-sm text-gray-600">/{article.attributes.slug}</p>
                <button
                  class="mt-2 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                  onclick={() => deleteArticle(article.id)}
                >
                  Delete
                </button>
                <a
                  href="/{article.attributes.slug}"
                  target="_blank"
                  class="mt-2 ml-2 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 inline-block"
                >
                  Preview
                </a>
              </div>
            {/each}
          </div>
        </div>
      </aside>

      <section class="flex-1 space-y-4">
        <div class="bg-white border rounded-lg p-6">
          <h2 class="text-lg font-semibold mb-4">Create New Page</h2>
           <form onsubmit={(e) => { e.preventDefault(); createArticle(); }} class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                bind:value={newArticleTitle}
                placeholder="Page Title"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Slug</label>
              <input
                type="text"
                bind:value={newArticleSlug}
                placeholder="page-slug"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Content (optional if using components)</label>
              <textarea
                bind:value={newArticleContent}
                placeholder="Custom HTML content..."
                rows="4"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              ></textarea>
            </div>

            {#if components.length > 0}
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Select Components</label>
                <div class="space-y-2 max-h-48 overflow-y-auto border border-gray-300 rounded-md p-3">
                  {#each components as component}
                    <label class="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedComponentIds.includes(component.id)}
                        onchange={() => toggleComponentSelection(component.id)}
                        class="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                      />
                      <span class="text-sm">{component.name} <span class="text-gray-500">({component.id})</span></span>
                    </label>
                  {/each}
                </div>
              </div>
            {/if}

            <button
              type="submit"
              disabled={creating}
              class="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {#if creating}Creating...{:else}Create Page{/if}
            </button>
          </form>
        </div>
      </section>
    </div>
  {/if}
</main>