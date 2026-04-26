<script>
    export let data;
  </script>
  
  {#if data.article.featuredImage}
    <div class="hero-image">
      <img src={data.article.featuredImage} alt={data.article.title} />
      <div class="hero-overlay">
        <h1 class="hero-title">{data.article.title}</h1>
      </div>
    </div>
  {/if}

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

<style>
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
  .article-content {
    max-width: 900px;
    line-height: 1.7;
  }

  /* Ensure lists are indented from the left (override Tailwind reset) */
  .article-content :global(ol) {
    list-style-type: decimal !important;
    margin-left: 4rem !important;
    margin-top: 0.5em !important;
    margin-bottom: 0.5em !important;
  }

  .article-content :global(ul) {
    list-style-type: disc !important;
    margin-left: 4rem !important;
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

  .article-content :global(.ql-align-center) {
    text-align: center;
  }

  .article-content :global(.ql-align-right) {
    text-align: right;
  }

  .article-content :global(.ql-align-justify) {
    text-align: justify;
  }
</style>