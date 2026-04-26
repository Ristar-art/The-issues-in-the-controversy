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

  <!-- Hero Image -->
  {#if data.article.featuredImage}
    <div class="hero-image">
      <img src={data.article.featuredImage} alt={data.article.title} />
      <div class="hero-overlay">
        <h1 class="hero-title">{data.article.title}</h1>
      </div>
    </div>
  {/if}

  <!-- Article Content (identical to public page) -->
  <div class="article-wrapper">
    {#if !data.article.featuredImage}
      <div class="flex items-center gap-3 mb-4">
        <h1 class="text-3xl font-bold">{data.article.title}</h1>
      </div>
    {/if}

    <article class="article-content">
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

  .hero-image {
    position: relative;
    width: 100%;
    height: 400px;
    overflow: hidden;
  }

  .hero-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .hero-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 2rem 1.5rem;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  }

  .hero-title {
    max-width: 900px;
    margin: 0 auto;
    color: #ffffff;
    font-size: 2.5rem;
    font-weight: 700;
    line-height: 1.2;
  }

  .article-wrapper {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem 1.5rem;
  }

  /* Article content — match Quill editor formatting */
  .article-content {
    max-width: 900px;
    line-height: 1.7;
  }

  .article-content :global(ol) {
    list-style-type: decimal !important;
    margin-left: 3rem !important;
    margin-top: 0.5em !important;
    margin-bottom: 0.5em !important;
  }

  .article-content :global(ul) {
    list-style-type: disc !important;
    margin-left: 3rem !important;
    margin-top: 0.5em !important;
    margin-bottom: 0.5em !important;
  }

  .article-content :global(li) {
    margin: 0.25em 0 !important;
    display: list-item !important;
  }

  .article-content :global(pre) {
    background: #1e1e1e;
    color: #d4d4d4;
    padding: 1em;
    border-radius: 0.375rem;
    overflow-x: auto;
    margin: 0.5em 0;
    font-family: 'Courier New', Courier, monospace;
    font-size: 0.9em;
    line-height: 1.5;
  }

  .article-content :global(pre code) {
    color: inherit;
    background: none;
  }

  .article-content :global(blockquote) {
    border-left: 4px solid #e5e7eb;
    padding-left: 1em;
    margin: 0.5em 0;
    color: #6b7280;
  }

  .article-content :global(h1) {
    font-size: 2em;
    font-weight: 700;
    margin: 0.67em 0;
  }

  .article-content :global(h2) {
    font-size: 1.5em;
    font-weight: 600;
    margin: 0.75em 0;
  }

  .article-content :global(h3) {
    font-size: 1.25em;
    font-weight: 600;
    margin: 0.75em 0;
  }

  .article-content :global(p) {
    margin: 0.5em 0;
  }

  .article-content :global(a) {
    color: #0d9488;
    text-decoration: underline;
  }

  .article-content :global(img) {
    max-width: 100%;
    height: auto;
  }

  .article-content :global(.ql-align-center) {
    text-align: center;
  }

  .article-content :global(.ql-align-right) {
    text-align: right;
  }

  .article-content :global(.ql-align-justify) {
    text-align: justify;
  }

  @media (max-width: 768px) {
    .banner-content {
      flex-direction: column;
      gap: 0.75rem;
      align-items: flex-start;
    }
  }
</style>
