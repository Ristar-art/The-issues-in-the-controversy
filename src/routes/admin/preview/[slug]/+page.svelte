<script>
  export let data;
</script>

<div class="preview-page">
  <!-- Preview Banner -->
  <div class="preview-banner">
    <div class="banner-content">
      <div class="banner-left">
        <span class="preview-badge">Preview Mode</span>
        <span class="status-badge {data.article.published ? 'published' : 'draft'}">
          {data.article.published ? 'Published' : 'Draft'}
        </span>
      </div>
      <div class="banner-right">
        <a href="/admin/editorial/{data.article.slug}" class="banner-link">
          Back to Editor
        </a>
        {#if data.article.published}
          <a href="/{data.article.slug}" class="banner-link public-link">
            View Public Page
          </a>
        {/if}
      </div>
    </div>
  </div>

  <!-- Article Content (identical to public page) -->
  <div class="article-wrapper">
    <div class="flex items-center gap-3 mb-4">
      <h1 class="text-3xl font-bold">{data.article.title}</h1>
    </div>

    <article class="prose">
      {@html data.article.content}
    </article>
  </div>
</div>

<style>
  .preview-page {
    min-height: 100vh;
    background: #ffffff;
  }

  .preview-banner {
    position: sticky;
    top: 0;
    z-index: 100;
    background: #1e293b;
    color: #ffffff;
    padding: 0.75rem 1.5rem;
    border-bottom: 3px solid #f59e0b;
  }

  .banner-content {
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .banner-left {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .preview-badge {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    background: #f59e0b;
    color: #1e293b;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
  }

  .status-badge {
    font-size: 0.625rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
  }

  .status-badge.published {
    background: #dcfce7;
    color: #166534;
  }

  .status-badge.draft {
    background: #fef3c7;
    color: #92400e;
  }

  .banner-right {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .banner-link {
    font-size: 0.875rem;
    color: #ffffff;
    text-decoration: none;
    padding: 0.375rem 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 0.375rem;
    transition: all 0.2s;
  }

  .banner-link:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.6);
  }

  .public-link {
    background: rgba(255, 255, 255, 0.1);
  }

  .article-wrapper {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem 1.5rem;
  }

  @media (max-width: 768px) {
    .banner-content {
      flex-direction: column;
      gap: 0.75rem;
      align-items: flex-start;
    }
  }
</style>
