<script>
    export let data;
</script>

<svelte:head>
    <title>{data.article.title} — The Issues in the Controversy</title>
</svelte:head>

<div class="font-body ea-root">
    <main>
        {#if data.article.featuredImage}
            <!-- ============================================ -->
            <!-- HERO with featured image                       -->
            <!-- ============================================ -->
            <section class="relative">
                <div class="relative overflow-hidden min-h-[480px] md:min-h-[620px] lg:h-[80vh] lg:max-h-[860px] flex items-end">
                    <img
                        src={data.article.featuredImage}
                        alt={data.article.title}
                        class="absolute inset-0 w-full h-full object-cover"
                    />
                    <!-- <div class="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--ea-primary)]/30 to-[var(--ea-primary)]/85"></div> -->

                    <div class="relative z-10 w-full px-6 md:px-12 lg:px-16 py-16 md:py-24 max-w-5xl">
                        <a
                            href="/topics"
                            class="inline-flex items-center gap-2 ea-eyebrow-light mb-6 hover:text-white transition-colors"
                        >
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Topics
                        </a>
                        <h1 class="font-headline !text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight max-w-4xl">
                            {data.article.title}
                        </h1>
                    </div>
                </div>
            </section>
        {:else}
            <!-- ============================================ -->
            <!-- HEADER without featured image                  -->
            <!-- ============================================ -->
            <section class="px-6 md:px-12 pt-24 md:pt-32 pb-12 md:pb-16">
                <div class="max-w-4xl">
                    <a
                        href="/topics"
                        class="inline-flex items-center gap-2 ea-eyebrow mb-6 hover:text-[var(--ea-primary)] transition-colors"
                    >
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Topics
                    </a>
                    <h1 class="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[var(--ea-primary)] leading-[1.02] tracking-tight">
                        {data.article.title}
                    </h1>
                </div>
            </section>
        {/if}

        <!-- ============================================ -->
        <!-- ARTICLE BODY                                   -->
        <!-- ============================================ -->
        <section class="px-6 md:px-12 py-16 md:py-24">
            <div class="max-w-3xl mx-auto">
                <div class="h-px w-20 bg-[var(--ea-secondary)] mb-12"></div>
                <article class="article-content font-body text-[var(--ea-on-surface-variant)]">
                    {@html data.article.content}
                </article>

                <div class="mt-20 pt-10 border-t border-[var(--ea-outline-variant)] flex flex-wrap items-center justify-between gap-6">
                    <a
                        href="/topics"
                        class="inline-flex items-center gap-2 font-label text-[10px] uppercase tracking-[0.28em] font-bold text-[var(--ea-secondary)] border-b-2 border-[var(--ea-secondary-fixed-dim)] pb-1 hover:border-[var(--ea-secondary)] transition-colors"
                    >
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        All Topics
                    </a>
                    <a href="/" class="ea-btn-ghost">Return Home</a>
                </div>
            </div>
        </section>
    </main>
</div>

<style>
    .article-content {
        font-size: 1.0625rem;
        line-height: 1.85;
    }

    .article-content :global(h1),
    .article-content :global(h2),
    .article-content :global(h3),
    .article-content :global(h4),
    .article-content :global(h5),
    .article-content :global(h6) {
        font-family: 'Newsreader', 'Times New Roman', serif;
        color: var(--ea-primary);
        line-height: 1.15;
        margin-top: 2.5rem;
        margin-bottom: 1rem;
        letter-spacing: -0.01em;
    }

    .article-content :global(h1) { font-size: 2.5rem; }
    .article-content :global(h2) { font-size: 2rem; }
    .article-content :global(h3) { font-size: 1.5rem; }
    .article-content :global(h4) { font-size: 1.25rem; }

    .article-content :global(p) {
        margin: 1.25rem 0;
    }

    .article-content :global(a) {
        color: var(--ea-secondary);
        text-decoration: underline;
        text-decoration-color: var(--ea-secondary-fixed-dim);
        text-underline-offset: 3px;
        transition: text-decoration-color 0.2s;
    }
    .article-content :global(a:hover) {
        text-decoration-color: var(--ea-secondary);
    }

    .article-content :global(strong) { color: var(--ea-primary); font-weight: 600; }
    .article-content :global(em) { font-style: italic; }

    .article-content :global(ol) {
        list-style-type: decimal !important;
        margin-left: 2rem !important;
        margin-top: 1rem !important;
        margin-bottom: 1rem !important;
    }

    .article-content :global(ul) {
        list-style-type: disc !important;
        margin-left: 2rem !important;
        margin-top: 1rem !important;
        margin-bottom: 1rem !important;
    }

    .article-content :global(li) {
        margin: 0.4rem 0 !important;
        display: list-item !important;
    }

    .article-content :global(blockquote) {
        font-family: 'Newsreader', 'Times New Roman', serif;
        font-size: 1.375rem;
        font-style: italic;
        color: var(--ea-primary);
        border-left: 3px solid var(--ea-secondary);
        padding: 0.25rem 0 0.25rem 1.75rem;
        margin: 2.25rem 0;
        line-height: 1.5;
    }

    .article-content :global(pre) {
        background: var(--ea-primary);
        color: var(--ea-primary-fixed);
        padding: 1.25rem 1.5rem;
        border-radius: 0.5rem;
        overflow-x: auto;
        margin: 1.5rem 0;
        font-family: 'Courier New', Courier, monospace;
        font-size: 0.9em;
        line-height: 1.6;
    }

    .article-content :global(pre code) {
        color: inherit;
        background: none;
    }

    .article-content :global(code) {
        background: var(--ea-surface-container);
        color: var(--ea-primary);
        padding: 0.15em 0.4em;
        border-radius: 0.25rem;
        font-size: 0.92em;
        font-family: 'Courier New', Courier, monospace;
    }

    .article-content :global(img) {
        max-width: 100%;
        height: auto;
        border-radius: 0.5rem;
        margin: 2rem 0;
    }

    .article-content :global(hr) {
        border: 0;
        height: 1px;
        background: var(--ea-outline-variant);
        margin: 3rem 0;
    }

    .article-content :global(.ql-align-center) { text-align: center; }
    .article-content :global(.ql-align-right) { text-align: right; }
    .article-content :global(.ql-align-justify) { text-align: justify; }
</style>
