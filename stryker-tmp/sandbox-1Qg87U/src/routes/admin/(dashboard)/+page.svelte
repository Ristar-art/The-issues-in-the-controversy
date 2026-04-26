<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  let articles = $state([]);
  let components = $state([]);
  let images = $state([]);
  let loading = $state(true);
  let searchQuery = $state('');

  async function handleLogout() {
    await fetch('/api/session', { method: 'DELETE' });
    goto('/login');
  }

  async function fetchAll() {
    try {
      const [articlesRes, componentsRes, imagesRes] = await Promise.all([
        fetch('/api/articles'),
        fetch('/api/components'),
        fetch('/api/images')
      ]);

      if (articlesRes.ok) articles = await articlesRes.json();
      if (componentsRes.ok) components = await componentsRes.json();
      if (imagesRes.ok) {
        const data = await imagesRes.json();
        images = Array.isArray(data) ? data : [];
      }
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      loading = false;
    }
  }

  onMount(fetchAll);

  let publishedCount = $derived(articles.filter(a => a.attributes?.published).length);
  let draftCount = $derived(articles.filter(a => !a.attributes?.published).length);

  let searchResults = $derived(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return articles.filter(a => {
      const title = (a.attributes?.title || '').toLowerCase();
      const slug = (a.attributes?.slug || '').toLowerCase();
      const content = (a.attributes?.content || '').toLowerCase();
      return title.includes(q) || slug.includes(q) || content.includes(q);
    });
  });

  let recentArticles = $derived(
    [...articles]
      .sort((a, b) => {
        const dateA = a.attributes?.publishedAt || a.attributes?.createdAt || '';
        const dateB = b.attributes?.publishedAt || b.attributes?.createdAt || '';
        return dateB.localeCompare(dateA);
      })
      .slice(0, 5)
  );
</script>

<div class="dashboard">
  <div class="dashboard-header">
    <h1 class="dashboard-title">Admin</h1>
    <button class="logout-button" onclick={handleLogout}>Sign Out</button>
  </div>

  {#if loading}
    <div class="loading">Loading dashboard...</div>
  {:else}
    <!-- Search Bar -->
    <div class="search-section">
      <div class="search-bar">
        <input
          type="text"
          placeholder="Search articles by title, slug, or content..."
          bind:value={searchQuery}
        />
      </div>
      {#if searchResults().length > 0}
        <div class="search-results">
          {#each searchResults() as result}
            <a href="/admin/editorial/{result.attributes.slug}" class="search-result">
              <div class="search-result-header">
                <span class="search-result-title">{result.attributes.title}</span>
                <span class="badge {result.attributes?.published ? 'published' : 'draft'}">
                  {result.attributes?.published ? 'Published' : 'Draft'}
                </span>
              </div>
              <span class="search-result-slug">/{result.attributes.slug}</span>
            </a>
          {/each}
        </div>
      {:else if searchQuery.trim()}
        <p class="no-results">No articles match "{searchQuery}".</p>
      {/if}
    </div>

    <!-- Stats Cards -->
    <div class="stats-grid">
      <div class="stat-card">
        <span class="stat-number">{articles.length}</span>
        <span class="stat-label">Total Articles</span>
        <div class="stat-detail">
          <span class="badge published">{publishedCount} published</span>
          <span class="badge draft">{draftCount} drafts</span>
        </div>
      </div>
      <div class="stat-card">
        <span class="stat-number">{components.length}</span>
        <span class="stat-label">Components</span>
      </div>
      <div class="stat-card">
        <span class="stat-number">{images.length}</span>
        <span class="stat-label">Images</span>
      </div>
    </div>

    <!-- Navigation Cards -->
    <div class="section">
      <h2 class="section-title">Manage</h2>
      <div class="nav-grid">
        <a href="/admin/pages" class="nav-card">
          <h3>Pages</h3>
          <p>{articles.length} article{articles.length !== 1 ? 's' : ''}</p>
          <span class="nav-arrow">&rarr;</span>
        </a>
        <a href="/admin/components" class="nav-card">
          <h3>Components</h3>
          <p>{components.length} component{components.length !== 1 ? 's' : ''}</p>
          <span class="nav-arrow">&rarr;</span>
        </a>
        <a href="/admin/gallery" class="nav-card">
          <h3>Gallery</h3>
          <p>{images.length} file{images.length !== 1 ? 's' : ''}</p>
          <span class="nav-arrow">&rarr;</span>
        </a>
      </div>
    </div>

    <!-- Recent Articles -->
    <div class="section">
      <h2 class="section-title">Recent Articles</h2>
      {#if recentArticles.length === 0}
        <p class="empty-state">No articles yet. Create your first one!</p>
      {:else}
        <div class="articles-list">
          {#each recentArticles as article}
            <div class="article-row">
              <div class="article-info">
                <span class="article-title">{article.attributes?.title || 'Untitled'}</span>
                <span class="article-slug">/{article.attributes?.slug}</span>
              </div>
              <div class="article-actions">
                <span class="badge {article.attributes?.published ? 'published' : 'draft'}">
                  {article.attributes?.published ? 'Published' : 'Draft'}
                </span>
                <a href="/admin/editorial/{article.attributes?.slug}" class="btn-edit">Edit</a>
                <a href="/admin/preview/{article.attributes?.slug}" class="btn-preview">Preview</a>
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>

    <!-- Landing Page -->
    <div class="section">
      <h2 class="section-title">Landing Page</h2>
      <div class="landing-card">
        <p>Configure your site's landing page content and layout.</p>
        <a href="/" target="_blank" class="btn-view">View Live Site &rarr;</a>
      </div>
    </div>
  {/if}
</div>

<style>
  .dashboard {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem 1.5rem;
  }

  .dashboard-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
  }

  .dashboard-title {
    font-size: 1.75rem;
    margin: 0;
  }

  .logout-button {
    background: none;
    border: 1px solid var(--color-pearl);
    color: var(--color-stone);
    padding: 0.4rem 0.9rem;
    border-radius: 6px;
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.15s;
  }

  .logout-button:hover {
    border-color: var(--color-stone);
    color: var(--color-ink);
  }

  .loading {
    text-align: center;
    color: var(--color-stone);
    padding: 4rem 0;
    font-size: 0.95rem;
  }

  /* Search */
  .search-section {
    margin-bottom: 2rem;
  }

  .search-bar input {
    width: 100%;
    padding: 0.6rem 1rem;
    border: 1px solid var(--color-pearl);
    border-radius: 6px;
    font-size: 0.9rem;
    background: var(--color-paper);
    color: var(--color-ink);
    outline: none;
    transition: border-color 0.15s;
  }

  .search-bar input:focus {
    border-color: var(--color-stone);
  }

  .search-results {
    margin-top: 0.5rem;
    border: 1px solid var(--color-pearl);
    border-radius: 6px;
    overflow: hidden;
    background: var(--color-paper);
    max-height: 320px;
    overflow-y: auto;
  }

  .search-result {
    display: block;
    padding: 0.75rem 1rem;
    text-decoration: none;
    color: var(--color-ink);
    border-bottom: 1px solid var(--color-pearl);
    transition: background 0.1s;
  }

  .search-result:last-child {
    border-bottom: none;
  }

  .search-result:hover {
    background: var(--color-cream);
  }

  .search-result-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .search-result-title {
    font-weight: 600;
    font-size: 0.9rem;
  }

  .search-result-slug {
    display: block;
    font-size: 0.75rem;
    color: var(--color-stone);
    margin-top: 0.15rem;
  }

  .no-results {
    margin-top: 0.5rem;
    font-size: 0.85rem;
    color: var(--color-stone);
  }

  /* Stats */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-bottom: 2.5rem;
  }

  .stat-card {
    background: var(--color-paper);
    border: 1px solid var(--color-pearl);
    border-radius: 8px;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .stat-number {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 2rem;
    font-weight: 700;
    color: var(--color-ink);
    line-height: 1;
  }

  .stat-label {
    font-size: 0.8rem;
    color: var(--color-stone);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 600;
  }

  .stat-detail {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.35rem;
  }

  /* Badges */
  .badge {
    font-size: 0.7rem;
    padding: 0.15rem 0.5rem;
    border-radius: 99px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  .badge.published {
    background: #e6f4ea;
    color: #1e7e34;
  }

  .badge.draft {
    background: #fef3cd;
    color: #856404;
  }

  /* Sections */
  .section {
    margin-bottom: 2.5rem;
  }

  .section-title {
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--color-stone);
    margin: 0 0 1rem 0;
  }

  /* Nav Cards */
  .nav-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  .nav-card {
    background: var(--color-ink);
    color: var(--color-paper);
    border-radius: 8px;
    padding: 1.25rem;
    text-decoration: none;
    position: relative;
    transition: background 0.15s;
  }

  .nav-card:hover {
    background: var(--color-charcoal);
  }

  .nav-card h3 {
    color: var(--color-paper);
    font-size: 1.1rem;
    margin: 0 0 0.25rem 0;
  }

  .nav-card p {
    color: var(--color-silver);
    font-size: 0.8rem;
    margin: 0;
  }

  .nav-arrow {
    position: absolute;
    top: 1.25rem;
    right: 1.25rem;
    font-size: 1.2rem;
    color: var(--color-silver);
  }

  /* Articles List */
  .articles-list {
    background: var(--color-paper);
    border: 1px solid var(--color-pearl);
    border-radius: 8px;
    overflow: hidden;
  }

  .article-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.85rem 1rem;
    border-bottom: 1px solid var(--color-pearl);
  }

  .article-row:last-child {
    border-bottom: none;
  }

  .article-info {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    min-width: 0;
  }

  .article-title {
    font-weight: 600;
    font-size: 0.9rem;
    color: var(--color-ink);
  }

  .article-slug {
    font-size: 0.75rem;
    color: var(--color-stone);
  }

  .article-actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-shrink: 0;
  }

  .btn-edit,
  .btn-preview {
    font-size: 0.75rem;
    padding: 0.25rem 0.6rem;
    border-radius: 4px;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.15s;
  }

  .btn-edit {
    background: var(--color-ink);
    color: var(--color-paper);
  }

  .btn-edit:hover {
    background: var(--color-charcoal);
  }

  .btn-preview {
    background: none;
    border: 1px solid var(--color-pearl);
    color: var(--color-stone);
  }

  .btn-preview:hover {
    border-color: var(--color-stone);
    color: var(--color-ink);
  }

  .empty-state {
    color: var(--color-stone);
    font-size: 0.9rem;
  }

  /* Landing Card */
  .landing-card {
    background: var(--color-paper);
    border: 1px solid var(--color-pearl);
    border-radius: 8px;
    padding: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .landing-card p {
    margin: 0;
    font-size: 0.85rem;
    color: var(--color-stone);
  }

  .btn-view {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--color-ink);
    text-decoration: none;
    white-space: nowrap;
    transition: color 0.15s;
  }

  .btn-view:hover {
    color: var(--color-accent);
  }

  /* Responsive */
  @media (max-width: 640px) {
    .stats-grid {
      grid-template-columns: 1fr;
    }

    .nav-grid {
      grid-template-columns: 1fr;
    }

    .article-row {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }

    .landing-card {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.75rem;
    }
  }
</style>
