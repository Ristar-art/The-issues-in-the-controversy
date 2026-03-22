<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { createEventDispatcher, onMount } from 'svelte';

  // Define interfaces for type safety
  interface Article {
    id: string;
    attributes: {
      title: string;
      slug: string;
      published: boolean;
      featuredImage?: string;
    };
  }



  // Props passed from parent component
  export let articles: Article[] = [];
  export let loading: boolean = true;
  export let error: string | null = null;

  // State variables for creating new articles
  let newArticleTitle: string = '';
  let newArticleSlug: string = '';
  let newFeaturedImage: string = '';
  let uploadingImage: boolean = false;
  let creating: boolean = false;

  // State variables for editing existing articles
  let editingId: string | null = null;
  let editTitle: string = '';
  let editSlug: string = '';
  let editFeaturedImage: string = '';
  let uploadingEditImage: boolean = false;

  // Event dispatcher to communicate with parent component
  const dispatch = createEventDispatcher();

  // Auto-start editing if article ID is provided in URL query params
  onMount(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const editArticleId = urlParams.get('edit');
    if (editArticleId) {
      const articleToEdit = articles.find(a => a.id === editArticleId);
      if (articleToEdit) {
        startEditing(articleToEdit);
      }
    }
  });

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
  // Upload a file to Firebase Storage via /api/media, then return the URL
  async function uploadToStorage(file: File): Promise<string | null> {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await fetch('/api/media', {
        method: 'POST',
        body: formData
      });
      if (!response.ok) throw new Error('Failed to upload image');
      const result = await response.json();
      return result.url;
    } catch (err: any) {
      error = err.message;
      return null;
    }
  }

  // Open gallery picker popup
  function openGalleryPicker(): Promise<string | null> {
    return new Promise((resolve) => {
      const popup = window.open('/admin/gallery?picker=true', 'gallery-picker', 'width=900,height=650');
      function onMessage(e: MessageEvent) {
        if (e.data?.type === 'gallery-pick') {
          window.removeEventListener('message', onMessage);
          resolve(e.data.url);
        }
      }
      window.addEventListener('message', onMessage);
      const check = setInterval(() => {
        if (popup?.closed) {
          clearInterval(check);
          window.removeEventListener('message', onMessage);
          resolve(null);
        }
      }, 500);
    });
  }

  async function handleImageUpload(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    uploadingImage = true;
    const url = await uploadToStorage(file);
    if (url) newFeaturedImage = url;
    uploadingImage = false;
    input.value = '';
  }

  async function pickNewFeaturedImage(): Promise<void> {
    const url = await openGalleryPicker();
    if (url) newFeaturedImage = url;
  }

  function removeFeaturedImage(): void {
    newFeaturedImage = '';
  }

  async function handleEditImageUpload(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    uploadingEditImage = true;
    const url = await uploadToStorage(file);
    if (url) editFeaturedImage = url;
    uploadingEditImage = false;
    input.value = '';
  }

  async function pickEditFeaturedImage(): Promise<void> {
    const url = await openGalleryPicker();
    if (url) editFeaturedImage = url;
  }

  function removeEditFeaturedImage(): void {
    editFeaturedImage = '';
  }

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
          featuredImage: newFeaturedImage || undefined,
        })
      });
      if (!response.ok) throw new Error('Failed to create article');

      // Notify parent component to refresh the articles list
      dispatch('refresh');

      // Reset form fields
      newArticleTitle = '';
      newArticleSlug = '';
      newFeaturedImage = '';
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
   */
  async function updateArticle(id: string, title: string, slug: string): Promise<void> {
    try {
      const response: Response = await fetch('/api/articles', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          title,
          slug,
          featuredImage: editFeaturedImage || null,
        })
      });
      if (!response.ok) throw new Error('Failed to update article');
      dispatch('refresh');
      editingId = null;
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
   * Initiates editing mode for a specific article.
   * Populates the edit form fields with the article's current data.
   * @param article - The article to start editing
   */
  function startEditing(article: Article): void {
    editingId = article.id;
    editTitle = article.attributes.title;
    editSlug = article.attributes.slug;
    editFeaturedImage = article.attributes.featuredImage || '';
  }

  function cancelEditing(): void {
    editingId = null;
    editTitle = '';
    editSlug = '';
    editFeaturedImage = '';
  }
</script>

<main class="container-editorial py-16">
  <header class="mb-12">
    <span class="eyebrow">Content Management</span>
    <h1 class="font-display text-4xl md:text-5xl mb-4">Pages Editor</h1>
    <div class="section-divider"></div>
  </header>

  {#if loading}
    <div class="flex items-center gap-3 text-stone">
      <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p class="font-body">Loading pages...</p>
    </div>
  {:else if error}
    <div class="bg-red-50 border border-red-200 p-6 card-editorial">
      <p class="text-red-700 font-body">Error: {error}</p>
    </div>
  {:else}
    <div class="grid lg:grid-cols-3 gap-12">
      <!-- Create New Page Section -->
      <section class="lg:col-span-1">
        <div class="sticky top-8">
          <h2 class="font-headline text-2xl mb-6">Create New Page</h2>
          <div class="card-editorial p-8">
            <form onsubmit={(e) => { e.preventDefault(); createArticle(); }} class="space-y-6">
              <div>
                <label class="block text-sm font-semibold uppercase tracking-wider text-stone mb-2">Title</label>
                <input
                  type="text"
                  bind:value={newArticleTitle}
                  placeholder="Enter page title"
                  required
                  class="w-full px-4 py-3 bg-cream border border-pearl font-body text-ink placeholder-stone focus:outline-none focus:border-accent transition-colors"
                />
              </div>
              <div>
                <label class="block text-sm font-semibold uppercase tracking-wider text-stone mb-2">Slug</label>
                <input
                  type="text"
                  bind:value={newArticleSlug}
                  placeholder="page-slug"
                  required
                  class="w-full px-4 py-3 bg-cream border border-pearl font-body text-ink placeholder-stone focus:outline-none focus:border-accent transition-colors"
                />
              </div>
              <div>
                <label class="block text-sm font-semibold uppercase tracking-wider text-stone mb-2">Featured Image</label>
                {#if newFeaturedImage}
                  <div class="featured-image-preview">
                    <img src={newFeaturedImage} alt="Featured" class="featured-image-img" />
                    <button
                      type="button"
                      onclick={removeFeaturedImage}
                      class="featured-image-remove"
                      aria-label="Remove featured image"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" x2="6" y1="6" y2="18"/>
                        <line x1="6" x2="18" y1="6" y2="18"/>
                      </svg>
                    </button>
                  </div>
                {:else}
                  <div class="featured-image-options">
                    <button
                      type="button"
                      class="featured-image-option"
                      onclick={pickNewFeaturedImage}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-stone">
                        <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                        <circle cx="9" cy="9" r="2"/>
                        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                      </svg>
                      <span>Pick from Gallery</span>
                    </button>
                    <label class="featured-image-option {uploadingImage ? 'opacity-50 pointer-events-none' : ''}">
                      {#if uploadingImage}
                        <svg class="animate-spin h-5 w-5 text-stone" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Uploading...</span>
                      {:else}
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-stone">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                          <polyline points="17 8 12 3 7 8"/>
                          <line x1="12" x2="12" y1="3" y2="15"/>
                        </svg>
                        <span>Upload from PC</span>
                      {/if}
                      <input
                        type="file"
                        accept="image/*"
                        onchange={handleImageUpload}
                        class="hidden"
                      />
                    </label>
                  </div>
                {/if}
              </div>
              <button
                type="submit"
                disabled={creating}
                class="btn-editorial w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {#if creating}
                  <svg class="animate-spin -ml-1 mr-3 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                {:else}
                  Create Page
                {/if}
              </button>
            </form>
          </div>
        </div>
      </section>

      <!-- Available Pages Section -->
      <aside class="lg:col-span-2">
        <h2 class="font-headline text-2xl mb-6">Available Pages</h2>
        <div class="space-y-6">
          {#each articles as article}
            <article class="card-editorial p-8">
              {#if editingId === article.id}
                <form onsubmit={(e) => { e.preventDefault(); updateArticle(article.id, editTitle, editSlug); }} class="space-y-6">
                  <div>
                    <label class="block text-sm font-semibold uppercase tracking-wider text-stone mb-2">Title</label>
                    <input
                      type="text"
                      bind:value={editTitle}
                      required
                      class="w-full px-4 py-3 bg-cream border border-pearl font-body text-ink placeholder-stone focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-semibold uppercase tracking-wider text-stone mb-2">Slug</label>
                    <input
                      type="text"
                      bind:value={editSlug}
                      required
                      class="w-full px-4 py-3 bg-cream border border-pearl font-body text-ink placeholder-stone focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-semibold uppercase tracking-wider text-stone mb-2">Featured Image</label>
                    {#if editFeaturedImage}
                      <div class="featured-image-preview">
                        <img src={editFeaturedImage} alt="Featured" class="featured-image-img" />
                        <button
                          type="button"
                          onclick={removeEditFeaturedImage}
                          class="featured-image-remove"
                          aria-label="Remove featured image"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="18" x2="6" y1="6" y2="18"/>
                            <line x1="6" x2="18" y1="6" y2="18"/>
                          </svg>
                        </button>
                      </div>
                    {:else}
                      <div class="featured-image-options">
                        <button
                          type="button"
                          class="featured-image-option"
                          onclick={pickEditFeaturedImage}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-stone">
                            <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                            <circle cx="9" cy="9" r="2"/>
                            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                          </svg>
                          <span>Pick from Gallery</span>
                        </button>
                        <label class="featured-image-option {uploadingEditImage ? 'opacity-50 pointer-events-none' : ''}">
                          {#if uploadingEditImage}
                            <svg class="animate-spin h-5 w-5 text-stone" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Uploading...</span>
                          {:else}
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-stone">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                              <polyline points="17 8 12 3 7 8"/>
                              <line x1="12" x2="12" y1="3" y2="15"/>
                            </svg>
                            <span>Upload from PC</span>
                          {/if}
                          <input
                            type="file"
                            accept="image/*"
                            onchange={handleEditImageUpload}
                            class="hidden"
                          />
                        </label>
                      </div>
                    {/if}
                  </div>
                  <div class="flex gap-3 pt-2">
                    <button
                      type="submit"
                      class="btn-editorial btn-editorial-accent"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onclick={cancelEditing}
                      class="btn-editorial"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              {:else}
                {#if article.attributes.featuredImage}
                  <div class="article-featured-thumb mb-4">
                    <img src={article.attributes.featuredImage} alt="Featured" class="article-featured-thumb-img" />
                  </div>
                {/if}
                <div class="flex items-start justify-between gap-4 mb-4">
                  <div class="flex-1">
                    <h3 class="font-headline text-xl mb-2">{article.attributes.title}</h3>
                    <p class="text-sm text-stone font-body">/{article.attributes.slug}</p>
                  </div>
                  <button
                    type="button"
                    onclick={() => startEditing(article)}
                    class="p-2 text-stone hover:text-accent transition-colors"
                    aria-label="Edit title"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                      <path d="m15 5 4 4"/>
                    </svg>
                  </button>
                </div>
                
                <div class="flex items-center gap-3 mb-6">
                  <span class="inline-flex items-center px-3 py-1 text-xs font-semibold uppercase tracking-wider {article.attributes.published ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}">
                    {article.attributes.published ? 'Published' : 'Draft'}
                  </span>
                </div>

                <div class="flex flex-wrap gap-3">
                  <a
                    href="/admin/preview/{article.attributes.slug}"
                    target="_blank"
                    class="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold uppercase tracking-wider border border-ink text-ink hover:bg-ink hover:text-paper transition-all"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15 3 21 3 21 9"/>
                      <line x1="10" x2="21" y1="14" y2="3"/>
                    </svg>
                    Preview
                  </a>
                  <button
                    class="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold uppercase tracking-wider border border-accent text-accent hover:bg-accent hover:text-paper transition-all"
                    onclick={() => goto(`/admin/editorial/${article.attributes.slug}`)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 20h9"/>
                      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                    </svg>
                    Edit Content
                  </button>
                  <button
                    class="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold uppercase tracking-wider border {article.attributes.published ? 'border-orange-700 text-orange-700 hover:bg-orange-700 hover:text-white' : 'border-green-700 text-green-700 hover:bg-green-700 hover:text-white'} transition-all"
                    onclick={() => togglePublish(article)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      {#if article.attributes.published}
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="15" x2="9" y1="9" y2="15"/>
                        <line x1="9" x2="15" y1="9" y2="15"/>
                      {:else}
                        <circle cx="12" cy="12" r="10"/>
                        <path d="m9 12 2 2 4-4"/>
                      {/if}
                    </svg>
                    {article.attributes.published ? 'Unpublish' : 'Publish'}
                  </button>
                  <button
                    class="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold uppercase tracking-wider border border-red-700 text-red-700 hover:bg-red-700 hover:text-white transition-all"
                    onclick={() => deleteArticle(article.id)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M3 6h18"/>
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                    </svg>
                    Delete
                  </button>
                </div>
              {/if}
            </article>
          {/each}
        </div>
      </aside>
    </div>
  {/if}
</main>

<style>
  .text-ink {
    color: var(--color-ink);
  }
  .text-stone {
    color: var(--color-stone);
  }
  .bg-cream {
    background-color: var(--color-cream);
  }
  .border-pearl {
    border-color: var(--color-pearl);
  }
  .focus\:border-accent:focus {
    border-color: var(--color-accent);
  }
  .hover\:text-accent:hover {
    color: var(--color-accent);
  }
  .bg-green-100 {
    background-color: #dcfce7;
  }
  .text-green-800 {
    color: #166534;
  }
  .bg-amber-100 {
    background-color: #fef3c7;
  }
  .text-amber-800 {
    color: #92400e;
  }
  .border-orange-700 {
    border-color: #c2410c;
  }
  .text-orange-700 {
    color: #c2410c;
  }
  .hover\:bg-orange-700:hover {
    background-color: #c2410c;
        color: #fef3c7;

  }
  .border-green-700 {
    border-color: #15803d;
  }
  .text-green-700 {
    color: #15803d;
  }
  .hover\:bg-green-700:hover {
    background-color: #15803d;
        color: #fef3c7;

  }
  .border-red-700 {
    border-color: #b91c1c;
  }
  .text-red-700 {
    color: #b91c1c;
  }
  .hover\:bg-red-700:hover {
    background-color: #b91c1c;
    color: #fef3c7;
  }
  .featured-image-options {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
  }
  .featured-image-option {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    padding: 1.25rem 0.75rem;
    border: 2px dashed var(--color-pearl);
    background: none;
    cursor: pointer;
    transition: border-color 0.2s;
    font-size: 0.8rem;
    color: var(--color-stone);
    font-family: inherit;
  }
  .featured-image-option:hover {
    border-color: var(--color-accent);
    color: var(--color-ink);
  }
  .featured-image-preview {
    position: relative;
    border: 1px solid var(--color-pearl);
  }
  .featured-image-img {
    width: 100%;
    height: 10rem;
    object-fit: cover;
    display: block;
  }
  .featured-image-remove {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background: rgba(0, 0, 0, 0.6);
    color: white;
    border: none;
    padding: 0.25rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
  }
  .featured-image-remove:hover {
    background: rgba(0, 0, 0, 0.8);
  }
  .hidden {
    display: none;
  }
  .article-featured-thumb {
    border-bottom: 1px solid var(--color-pearl);
    margin: -2rem -2rem 1rem -2rem;
  }
  .article-featured-thumb-img {
    width: 100%;
    height: 8rem;
    object-fit: cover;
    display: block;
  }
</style>
