<script>
    export let data;
</script>

<svelte:head>
    <title>{data.article.title} — The Issues in the Controversy</title>
</svelte:head>

<div class="doc-article">
    <main>
        {#if data.article.featuredImage}
            <!-- ============================================ -->
            <!-- HERO with featured image                       -->
            <!-- ============================================ -->
            <section class="doc-article__hero">
                <img src={data.article.featuredImage} alt={data.article.title} class="doc-article__hero-img" />
                <div class="doc-article__hero-scrim" aria-hidden="true"></div>
                <div class="doc-article__hero-content">
                    <a href="/topics" class="doc-article__back doc-article__back--light">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Topics
                    </a>
                    <h1 class="doc-article__title doc-article__title--onmedia">{data.article.title}</h1>
                </div>
            </section>
        {:else}
            <!-- ============================================ -->
            <!-- HEADER without featured image                  -->
            <!-- ============================================ -->
            <section class="doc-article__head">
                <a href="/topics" class="doc-article__back">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Topics
                </a>
                <h1 class="doc-article__title">{data.article.title}</h1>
            </section>
        {/if}

        <!-- ============================================ -->
        <!-- ARTICLE BODY                                   -->
        <!-- ============================================ -->
        <section class="doc-article__body">
            <div class="doc-article__rule" aria-hidden="true"></div>
            <article class="article-content">
                {@html data.article.content}
            </article>

            <div class="doc-article__foot">
                <a href="/topics" class="doc-article__cta">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    All Topics
                </a>
                <a href="/" class="doc-article__home">Return Home</a>
            </div>
        </section>
    </main>
</div>

<style>
    .doc-article {
        --nav-h: 5.2rem;
        --read: color-mix(in srgb, var(--doc-ink) 86%, var(--doc-bg));
        min-height: 100vh;
        background: var(--doc-bg);
        color: var(--doc-ink);
        font-family: 'Public Sans', sans-serif;
        transition: background 0.4s ease, color 0.4s ease;
    }

    /* ---------- Hero (featured image) — always cinematic ---------- */
    .doc-article__hero {
        position: relative;
        min-height: 60vh;
        display: flex;
        align-items: flex-end;
        overflow: hidden;
    }
    .doc-article__hero-img {
        position: absolute; inset: 0;
        width: 100%; height: 100%; object-fit: cover;
        filter: saturate(0.78) contrast(1.06) brightness(0.82);
    }
    .doc-article__hero-scrim {
        position: absolute; inset: 0;
        background: linear-gradient(to top, var(--doc-bg) 1%, rgba(11,11,13,0.35) 45%, rgba(11,11,13,0.15) 100%);
    }
    .doc-article__hero-content {
        position: relative; z-index: 2;
        width: 100%; max-width: 72rem;
        padding: clamp(3rem, 8vw, 6rem) clamp(1.5rem, 6vw, 7rem);
    }
    .doc-article__title--onmedia { color: #f4efe7 !important; text-shadow: 0 2px 30px rgba(0,0,0,0.45); }
    .doc-article__back--light { color: #e7b083 !important; }
    .doc-article__back--light:hover { color: #f4efe7 !important; }

    /* ---------- Header (no image) ---------- */
    .doc-article__head {
        padding: calc(var(--nav-h) + clamp(2.5rem, 6vw, 4.5rem)) clamp(1.5rem, 6vw, 7rem) clamp(1.5rem, 4vw, 3rem);
        max-width: 64rem;
    }

    .doc-article__back {
        display: inline-flex; align-items: center; gap: 0.55rem;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.6875rem; letter-spacing: 0.26em; text-transform: uppercase;
        color: var(--doc-ember); text-decoration: none;
        margin-bottom: 1.75rem;
        transition: color 0.3s ease;
    }
    .doc-article__back:hover { color: var(--doc-ember-soft); }
    .doc-article__back svg { width: 0.95rem; height: 0.95rem; }

    .doc-article__title {
        font-family: 'Newsreader', Georgia, serif;
        font-weight: 400;
        color: var(--doc-ink);
        font-size: clamp(2.4rem, 6vw, 5rem);
        line-height: 1.04;
        letter-spacing: -0.02em;
        max-width: 24ch;
        margin: 0;
    }

    /* ---------- Body ---------- */
    .doc-article__body { padding: clamp(3rem, 7vw, 6rem) clamp(1.5rem, 6vw, 7rem); }
    .doc-article__rule { width: 80px; height: 2px; background: var(--doc-ember); margin: 0 auto clamp(2.5rem, 5vw, 3.5rem); }

    .doc-article__foot {
        max-width: 44rem;
        margin: clamp(3.5rem, 7vw, 5rem) auto 0;
        padding-top: 2.5rem;
        border-top: 1px solid var(--doc-line);
        display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1.5rem;
    }
    .doc-article__cta {
        display: inline-flex; align-items: center; gap: 0.55rem;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.6875rem; letter-spacing: 0.24em; text-transform: uppercase;
        color: var(--doc-ember-soft); text-decoration: none;
        border-bottom: 1px solid var(--doc-line); padding-bottom: 0.4rem;
        transition: border-color 0.3s ease, color 0.3s ease;
    }
    .doc-article__cta:hover { border-bottom-color: var(--doc-ember); color: var(--doc-ember); }
    .doc-article__cta svg { width: 0.95rem; height: 0.95rem; }
    .doc-article__home {
        display: inline-flex; align-items: center;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.6875rem; letter-spacing: 0.22em; text-transform: uppercase;
        color: var(--doc-ink); text-decoration: none;
        border: 1px solid var(--doc-line); border-radius: 2px;
        padding: 0.85rem 1.4rem;
        transition: border-color 0.3s ease, color 0.3s ease;
    }
    .doc-article__home:hover { border-color: var(--doc-ember); color: var(--doc-ember-soft); }

    /* ---------- Prose ---------- */
    .article-content {
        max-width: 44rem;
        margin: 0 auto;
        font-family: 'Public Sans', sans-serif;
        font-size: 1.0625rem;
        line-height: 1.85;
        color: var(--read);
    }

    .article-content :global(h1),
    .article-content :global(h2),
    .article-content :global(h3),
    .article-content :global(h4),
    .article-content :global(h5),
    .article-content :global(h6) {
        font-family: 'Newsreader', 'Times New Roman', serif;
        font-weight: 500;
        color: var(--doc-ink);
        line-height: 1.15;
        margin-top: 2.5rem;
        margin-bottom: 1rem;
        letter-spacing: -0.01em;
    }
    .article-content :global(h1) { font-size: 2.5rem; }
    .article-content :global(h2) { font-size: 2rem; }
    .article-content :global(h3) { font-size: 1.5rem; }
    .article-content :global(h4) { font-size: 1.25rem; }

    .article-content :global(p) { margin: 1.25rem 0; }

    .article-content :global(a) {
        color: var(--doc-ember-soft);
        text-decoration: underline;
        text-decoration-color: var(--doc-line);
        text-underline-offset: 3px;
        transition: text-decoration-color 0.2s, color 0.2s;
    }
    .article-content :global(a:hover) { color: var(--doc-ember); text-decoration-color: var(--doc-ember); }

    .article-content :global(strong) { color: var(--doc-ink); font-weight: 600; }
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
    .article-content :global(li) { margin: 0.4rem 0 !important; display: list-item !important; }
    .article-content :global(li::marker) { color: var(--doc-ember); }

    .article-content :global(blockquote) {
        font-family: 'Newsreader', 'Times New Roman', serif;
        font-size: 1.375rem;
        font-style: italic;
        color: var(--doc-ink);
        border-left: 3px solid var(--doc-ember);
        padding: 0.25rem 0 0.25rem 1.75rem;
        margin: 2.25rem 0;
        line-height: 1.5;
    }

    .article-content :global(pre) {
        background: var(--doc-bg-3);
        color: var(--doc-ink);
        padding: 1.25rem 1.5rem;
        border: 1px solid var(--doc-line);
        border-radius: 0.5rem;
        overflow-x: auto;
        margin: 1.5rem 0;
        font-family: 'JetBrains Mono', 'Courier New', monospace;
        font-size: 0.9em;
        line-height: 1.6;
    }
    .article-content :global(pre code) { color: inherit; background: none; }
    .article-content :global(code) {
        background: var(--doc-bg-3);
        color: var(--doc-ember-soft);
        padding: 0.15em 0.4em;
        border-radius: 0.25rem;
        font-size: 0.92em;
        font-family: 'JetBrains Mono', 'Courier New', monospace;
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
        background: var(--doc-line);
        margin: 3rem 0;
    }

    .article-content :global(.ql-align-center) { text-align: center; }
    .article-content :global(.ql-align-right) { text-align: right; }
    .article-content :global(.ql-align-justify) { text-align: justify; }
</style>
