  <script lang="ts">
    import { createEventDispatcher } from 'svelte';

    // Define interfaces for type safety
    interface Article {
      id: string;
      attributes: {
        title: string;
        slug: string;
        content?: string;
        published: boolean;
        componentIds?: string[];
      };
    }

    interface Component {
      id: string;
      name: string;
    }

    // Props passed from parent component
    export let articles: Article[] = [];
    export let components: Component[] = [];
    export let loading: boolean = true;
    export let error: string | null = null;

    // State variables for creating new articles
    let newArticleTitle: string = '';
    let newArticleSlug: string = '';
    let newArticleContent: string = '';
    let selectedComponentIds: string[] = [];
    let creating: boolean = false;

    // State variables for editing existing articles
    let editingId: string | null = null;
    let editTitle: string = '';
    let editSlug: string = '';
    let editContent: string = '';
    let editComponentIds: string[] = [];

    // Event dispatcher to communicate with parent component
    const dispatch = createEventDispatcher();

    /**
     * Converts a string into a URL-friendly slug.
     * This function transforms text by converting to lowercase, trimming whitespace,
     * replacing spaces with hyphens, removing non-word characters except hyphens,
     * collapsing multiple hyphens into one, and removing leading/trailing hyphens.
     * @param text - The input text to slugify
     * @returns The slugified version of the input text
     */
    function slugify(text: string): string {
      return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/[^\w\-]+/g, '') // Remove non-word characters except hyphens
        .replace(/\-\-+/g, '-') // Collapse multiple hyphens
        .replace(/^-+/, '') // Remove leading hyphens
        .replace(/-+$/, ''); // Remove trailing hyphens
    }

    // Reactive statements to auto-generate slugs when titles change
    $: if (newArticleTitle) newArticleSlug = slugify(newArticleTitle);
    $: if (editTitle && editingId) editSlug = slugify(editTitle);

    /**
     * Creates a new article by sending a POST request to the API.
     * Validates that title and slug are provided, sets loading state,
     * and dispatches a 'refresh' event on success to update the parent component.
     * Resets form fields after successful creation.
     */
    async function createArticle(): Promise<void> {
      if (!newArticleTitle || !newArticleSlug) return;

      creating = true;
      try {
        const response: Response = await fetch('/api/articles', {
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

        // Notify parent component to refresh the articles list
        dispatch('refresh');

        // Reset form fields
        newArticleTitle = '';
        newArticleSlug = '';
        newArticleContent = '';
        selectedComponentIds = [];
      } catch (err: any) {
        error = err.message;
      } finally {
        creating = false;
      }
    }

    /**
     * Deletes an article by sending a DELETE request to the API.
     * Prompts user for confirmation before proceeding.
     * Dispatches a 'refresh' event on success.
     * @param id - The ID of the article to delete
     */
    async function deleteArticle(id: string): Promise<void> {
      if (!confirm('Are you sure you want to delete this article?')) return;

      try {
        const response: Response = await fetch(`/api/articles?id=${id}`, {
          method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete article');
        dispatch('refresh');
      } catch (err: any) {
        error = err.message;
      }
    }

    /**
     * Updates an existing article by sending a PUT request to the API.
     * Dispatches a 'refresh' event on success and exits edit mode.
     * @param id - The ID of the article to update
     * @param title - The new title
     * @param slug - The new slug
     * @param content - The new content
     * @param componentIds - Array of component IDs associated with the article
     */
    async function updateArticle(id: string, title: string, slug: string, content: string, componentIds: string[]): Promise<void> {
      try {
        const response: Response = await fetch('/api/articles', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id,
            title,
            slug,
            content,
            componentIds
          })
        });
        if (!response.ok) throw new Error('Failed to update article');
        dispatch('refresh');
        editingId = null; // Exit edit mode
      } catch (err: any) {
        error = err.message;
      }
    }

    /**
     * Toggles the published status of an article.
     * Sends a PUT request to update the published field.
     * @param article - The article object to toggle publish status for
     */
    async function togglePublish(article: Article): Promise<void> {
      try {
        const response: Response = await fetch('/api/articles', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: article.id,
            published: !article.attributes.published
          })
        });
        if (!response.ok) throw new Error('Failed to update article');
        dispatch('refresh');
      } catch (err: any) {
        error = err.message;
      }
    }

    /**
     * Toggles the selection of a component for new articles.
     * Adds or removes the component ID from the selectedComponentIds array.
     * @param componentId - The ID of the component to toggle
     */
    function toggleComponentSelection(componentId: string): void {
      if (selectedComponentIds.includes(componentId)) {
        selectedComponentIds = selectedComponentIds.filter(id => id !== componentId);
      } else {
        selectedComponentIds = [...selectedComponentIds, componentId];
      }
    }

    /**
     * Moves a selected component up in the order for new articles.
     * Swaps the component at the given index with the one above it.
     * @param index - The index of the component to move up
     */
    function moveComponentUp(index: number): void {
      if (index > 0) {
        const newOrder = [...selectedComponentIds];
        [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
        selectedComponentIds = newOrder;
      }
    }

    /**
     * Moves a selected component down in the order for new articles.
     * Swaps the component at the given index with the one below it.
     * @param index - The index of the component to move down
     */
    function moveComponentDown(index: number): void {
      if (index < selectedComponentIds.length - 1) {
        const newOrder = [...selectedComponentIds];
        [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
        selectedComponentIds = newOrder;
      }
    }

    /**
     * Toggles the selection of a component for editing articles.
     * Adds or removes the component ID from the editComponentIds array.
     * @param componentId - The ID of the component to toggle
     */
    function toggleEditComponentSelection(componentId: string): void {
      if (editComponentIds.includes(componentId)) {
        editComponentIds = editComponentIds.filter(id => id !== componentId);
      } else {
        editComponentIds = [...editComponentIds, componentId];
      }
    }

    /**
     * Moves a selected component up in the order for editing articles.
     * Swaps the component at the given index with the one above it.
     * @param index - The index of the component to move up
     */
    function moveEditComponentUp(index: number): void {
      if (index > 0) {
        const newOrder = [...editComponentIds];
        [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
        editComponentIds = newOrder;
      }
    }

    /**
     * Moves a selected component down in the order for editing articles.
     * Swaps the component at the given index with the one below it.
     * @param index - The index of the component to move down
     */
    function moveEditComponentDown(index: number): void {
      if (index < editComponentIds.length - 1) {
        const newOrder = [...editComponentIds];
        [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
        editComponentIds = newOrder;
      }
    }

    /**
     * Initiates editing mode for a specific article.
     * Populates the edit form fields with the article's current data.
     * @param article - The article to start editing
     */
    function startEditing(article: Article): void {
      editingId = article.id;
      editTitle = article.attributes.title;
      editSlug = article.attributes.slug;
      editContent = article.attributes.content || '';
      editComponentIds = article.attributes.componentIds || [];
    }

    /**
     * Cancels the current editing session.
     * Resets all edit-related state variables and exits edit mode.
     */
    function cancelEditing(): void {
      editingId = null;
      editTitle = '';
      editSlug = '';
      editContent = '';
      editComponentIds = [];
    }
</script>

<main class="max-w-5xl mx-auto py-8 px-4">
  <h1 class="text-2xl font-bold mb-6">Pages Editor</h1>

  {#if loading}
    <p class="text-gray-600">Loading pages...</p>
  {:else if error}
    <p class="text-red-600">Error: {error}</p>
  {:else}
     <div class="flex gap-6">
       <section class="w-1/3 border-r pr-4">
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

                {#if selectedComponentIds.length > 0}
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Selected Components Order</label>
                    <div class="space-y-2 border border-gray-300 rounded-md p-3">
                      {#each selectedComponentIds as componentId, index}
                        {@const component = components.find(c => c.id === componentId)}
                        {#if component}
                          <div class="flex items-center justify-between bg-gray-50 p-2 rounded">
                            <span class="text-sm">{component.name} <span class="text-gray-500">({component.id})</span></span>
                            <div class="flex space-x-1">
                              <button
                                type="button"
                                onclick={() => moveComponentUp(index)}
                                disabled={index === 0}
                                class="px-2 py-1 text-xs bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed rounded"
                              >
                                ↑
                              </button>
                              <button
                                type="button"
                                onclick={() => moveComponentDown(index)}
                                disabled={index === selectedComponentIds.length - 1}
                                class="px-2 py-1 text-xs bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed rounded"
                              >
                                ↓
                              </button>
                            </div>
                          </div>
                        {/if}
                      {/each}
                    </div>
                  </div>
                {/if}
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

       <aside class="flex-1 space-y-4">
         <div class="space-y-4">
           <h2 class="text-lg font-semibold">Available Pages</h2>
           <div class="space-y-2">
              {#each articles as article}
                <div class="p-3 border rounded-lg bg-gray-50">
                  {#if editingId === article.id}
                    <form onsubmit={(e) => { e.preventDefault(); updateArticle(article.id, editTitle, editSlug, editContent, editComponentIds); }} class="space-y-4">
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                          type="text"
                          bind:value={editTitle}
                          required
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                        <input
                          type="text"
                          bind:value={editSlug}
                          required
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Content</label>
                        <textarea
                          bind:value={editContent}
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
                                   checked={editComponentIds.includes(component.id)}
                                   onchange={() => toggleEditComponentSelection(component.id)}
                                   class="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                                 />
                                 <span class="text-sm">{component.name} <span class="text-gray-500">({component.id})</span></span>
                               </label>
                             {/each}
                           </div>
                         </div>

                         {#if editComponentIds.length > 0}
                           <div>
                             <label class="block text-sm font-medium text-gray-700 mb-2">Selected Components Order</label>
                             <div class="space-y-2 border border-gray-300 rounded-md p-3">
                               {#each editComponentIds as componentId, index}
                                 {@const component = components.find(c => c.id === componentId)}
                                 {#if component}
                                   <div class="flex items-center justify-between bg-gray-50 p-2 rounded">
                                     <span class="text-sm">{component.name} <span class="text-gray-500">({component.id})</span></span>
                                     <div class="flex space-x-1">
                                       <button
                                         type="button"
                                         onclick={() => moveEditComponentUp(index)}
                                         disabled={index === 0}
                                         class="px-2 py-1 text-xs bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed rounded"
                                       >
                                         ↑
                                       </button>
                                       <button
                                         type="button"
                                         onclick={() => moveEditComponentDown(index)}
                                         disabled={index === editComponentIds.length - 1}
                                         class="px-2 py-1 text-xs bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed rounded"
                                       >
                                         ↓
                                       </button>
                                     </div>
                                   </div>
                                 {/if}
                               {/each}
                             </div>
                           </div>
                         {/if}
                       {/if}
                      <div class="flex gap-2">
                        <button
                          type="submit"
                          class="px-3 py-1 bg-teal-600 text-white text-sm rounded hover:bg-teal-700"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onclick={cancelEditing}
                          class="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  {:else}
                    <h3 class="font-medium">{article.attributes.title}</h3>
                    <p class="text-sm text-gray-600">/{article.attributes.slug}</p>
                    <p class="text-sm {article.attributes.published ? 'text-green-600' : 'text-red-600'}">
                      {article.attributes.published ? 'Published' : 'Draft'}
                    </p>
                    <button
                      class="mt-2 px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700"
                      onclick={() => startEditing(article)}
                    >
                      Edit
                    </button>
                    <button
                      class="mt-2 ml-2 px-3 py-1 {article.attributes.published ? 'bg-orange-600 hover:bg-orange-700' : 'bg-green-600 hover:bg-green-700'} text-white text-sm rounded"
                      onclick={() => togglePublish(article)}
                    >
                      {article.attributes.published ? 'Unpublish' : 'Publish'}
                    </button>
                    <button
                      class="mt-2 ml-2 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
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
                  {/if}
                </div>
              {/each}
           </div>
         </div>
       </aside>
     </div>
  {/if}
</main>