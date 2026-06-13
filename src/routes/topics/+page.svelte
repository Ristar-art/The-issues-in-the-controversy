<script>
    import { onMount } from 'svelte';

    let topics = [];
    let loading = true;
    let error = null;
    let searchQuery = '';

    async function fetchTopics() {
        try {
            const response = await fetch('/api/articles');
            if (!response.ok) throw new Error('Failed to fetch topics');
            const allPages = await response.json();
            topics = allPages
                .filter(page => page.attributes.published)
                .sort((a, b) => a.attributes.title.localeCompare(b.attributes.title));
        } catch (err) {
            error = err.message;
        } finally {
            loading = false;
        }
    }

    $: filteredTopics = searchQuery
        ? topics.filter(topic =>
            topic.attributes.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : topics;

    onMount(fetchTopics);
</script>

<svelte:head>
    <title>Topics — The Issues in the Controversy</title>
    <meta name="description" content="Explore our comprehensive topics on biblical prophecy, Daniel, Revelation, and God's character." />
</svelte:head>

<div class="doc-tp">
    <main>
        <!-- ============================ HEADER ============================ -->
        <section class="doc-tp__head">
            <p class="doc-tp__eyebrow">Study Areas · Index</p>
            <h1 class="doc-tp__title">Topics<br /><span class="doc-tp__em">&amp; Studies</span></h1>
            <p class="doc-tp__lede">
                A comprehensive collection of studies covering biblical prophecy, the character of God,
                and the issues at the heart of the great controversy.
            </p>
        </section>

        <!-- ========================= SEARCH + GRID ========================= -->
        <section class="doc-tp__body">
            {#if loading}
                <div class="doc-tp__state">
                    <span class="doc-tp__spinner"></span>
                    <p class="doc-tp__eyebrow">Loading topics</p>
                </div>
            {:else if error}
                <div class="doc-tp__state">
                    <p class="doc-tp__error">Error loading topics: {error}</p>
                </div>
            {:else if topics.length === 0}
                <div class="doc-tp__state">
                    <p class="doc-tp__muted">No published topics available at this time.</p>
                </div>
            {:else}
                <!-- Filter row -->
                <div class="doc-tp__filter">
                    <p class="doc-tp__count">
                        {searchQuery && filteredTopics.length !== topics.length
                            ? `Showing ${filteredTopics.length} of ${topics.length}`
                            : `${topics.length} ${topics.length === 1 ? 'Study' : 'Studies'}`}
                    </p>
                    <div class="doc-tp__search">
                        <svg class="doc-tp__search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input type="text" bind:value={searchQuery} placeholder="Search topics…" />
                        {#if searchQuery}
                            <button type="button" on:click={() => (searchQuery = '')} aria-label="Clear search">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        {/if}
                    </div>
                </div>

                {#if filteredTopics.length === 0}
                    <div class="doc-tp__state">
                        <p class="doc-tp__muted">No topics found matching "{searchQuery}"</p>
                        <button type="button" on:click={() => (searchQuery = '')} class="doc-tp__clear">Clear search</button>
                    </div>
                {:else}
                    <div class="doc-tp__grid">
                        {#each filteredTopics as topic, index}
                            <a href="/{topic.attributes.slug}" class="doc-tp__card">
                                <div class="doc-tp__card-meta">
                                    <span class="doc-tp__num">{String(index + 1).padStart(2, '0')} · Study</span>
                                    <span class="doc-tp__open">Open</span>
                                </div>
                                <h2 class="doc-tp__card-title">{topic.attributes.title}</h2>
                                <span class="doc-tp__cta">
                                    Read Chapter
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m0 0l-6-6m6 6l-6 6" />
                                    </svg>
                                </span>
                            </a>
                        {/each}
                    </div>
                {/if}
            {/if}
        </section>
    </main>
</div>

<style>
    .doc-tp {
        --nav-h: 5.2rem;
        min-height: 100vh;
        background: var(--doc-bg);
        color: var(--doc-ink);
        padding-top: var(--nav-h);
        font-family: 'Public Sans', sans-serif;
        transition: background 0.4s ease, color 0.4s ease;
    }
    .doc-tp :where(h1, h2) {
        font-family: 'Newsreader', Georgia, serif;
        font-weight: 400;
        color: var(--doc-ink);
        letter-spacing: -0.018em;
        line-height: 1.02;
        margin: 0;
    }

    /* Header */
    .doc-tp__head {
        padding: clamp(3.5rem, 8vw, 6rem) clamp(1.5rem, 6vw, 7rem) clamp(2.5rem, 5vw, 4rem);
        max-width: 64rem;
    }
    .doc-tp__eyebrow {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.6875rem;
        letter-spacing: 0.34em;
        text-transform: uppercase;
        color: var(--doc-ember);
        margin: 0 0 1.5rem;
        display: inline-flex;
        align-items: center;
        gap: 0.85rem;
    }
    .doc-tp__eyebrow::before {
        content: '';
        width: 28px;
        height: 1px;
        background: var(--doc-ember);
        opacity: 0.7;
    }
    .doc-tp__title {
        font-size: clamp(3rem, 10vw, 7rem);
        line-height: 0.95;
        margin-bottom: 1.75rem !important;
    }
    .doc-tp__em { font-style: italic; font-weight: 300; color: var(--doc-ember-soft); }
    .doc-tp__lede {
        font-family: 'Public Sans', sans-serif;
        font-size: clamp(1rem, 1.6vw, 1.2rem);
        color: var(--doc-muted);
        max-width: 42rem;
        line-height: 1.7;
        margin: 0;
    }

    /* Body */
    .doc-tp__body { padding: 0 clamp(1.5rem, 6vw, 7rem) clamp(4rem, 9vw, 8rem); }

    /* States */
    .doc-tp__state { text-align: center; padding: 6rem 0; display: flex; flex-direction: column; align-items: center; gap: 1.25rem; }
    .doc-tp__spinner {
        width: 2.5rem; height: 2.5rem;
        border: 2px solid var(--doc-line);
        border-top-color: var(--doc-ember);
        border-radius: 999px;
        animation: docTpSpin 0.8s linear infinite;
    }
    @keyframes docTpSpin { to { transform: rotate(360deg); } }
    .doc-tp__error { color: var(--doc-ember); font-family: 'Public Sans', sans-serif; }
    .doc-tp__muted { color: var(--doc-muted); font-family: 'Public Sans', sans-serif; }
    .doc-tp__clear {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.6875rem; letter-spacing: 0.22em; text-transform: uppercase;
        color: var(--doc-ember-soft); background: none; cursor: pointer;
        border: none; border-bottom: 1px solid var(--doc-line); padding-bottom: 0.35rem;
        transition: border-color 0.3s ease, color 0.3s ease;
    }
    .doc-tp__clear:hover { border-color: var(--doc-ember); color: var(--doc-ember); }

    /* Filter row */
    .doc-tp__filter {
        display: flex; align-items: flex-end; justify-content: space-between;
        gap: 1.5rem; flex-wrap: wrap;
        border-bottom: 1px solid var(--doc-line);
        padding-bottom: 1.5rem;
        margin-bottom: clamp(2.5rem, 5vw, 4.5rem);
    }
    .doc-tp__count {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.6875rem; letter-spacing: 0.28em; text-transform: uppercase;
        color: var(--doc-ember); margin: 0;
    }
    .doc-tp__search { position: relative; width: 100%; max-width: 24rem; display: flex; align-items: center; }
    .doc-tp__search input {
        width: 100%; background: transparent; border: none;
        border-bottom: 1px solid var(--doc-line);
        padding: 0.75rem 2rem 0.75rem 2rem;
        font-family: 'Public Sans', sans-serif; font-size: 0.95rem;
        color: var(--doc-ink); outline: none;
        transition: border-color 0.3s ease;
    }
    .doc-tp__search input::placeholder { color: var(--doc-dim); }
    .doc-tp__search input:focus { border-bottom-color: var(--doc-ember); }
    .doc-tp__search-icon { position: absolute; left: 0; width: 1.25rem; height: 1.25rem; color: var(--doc-dim); pointer-events: none; }
    .doc-tp__search button {
        position: absolute; right: 0; background: none; border: none; cursor: pointer;
        color: var(--doc-dim); display: inline-flex; transition: color 0.3s ease;
    }
    .doc-tp__search button:hover { color: var(--doc-ember-soft); }
    .doc-tp__search button svg { width: 1.25rem; height: 1.25rem; }

    /* Grid */
    .doc-tp__grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: clamp(2.5rem, 5vw, 4rem) clamp(2rem, 4vw, 3.5rem);
    }
    @media (min-width: 768px) { .doc-tp__grid { grid-template-columns: 1fr 1fr; } }

    .doc-tp__card {
        display: block;
        border-top: 1px solid var(--doc-line);
        padding-top: clamp(1.75rem, 3vw, 2.5rem);
        text-decoration: none;
        transition: border-color 0.4s ease;
    }
    .doc-tp__card:hover { border-top-color: var(--doc-ember); }
    .doc-tp__card-meta { display: flex; align-items: baseline; justify-content: space-between; gap: 1.5rem; margin-bottom: 1.5rem; }
    .doc-tp__num {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem; letter-spacing: 0.24em; text-transform: uppercase;
        color: var(--doc-ember);
    }
    .doc-tp__open {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem; letter-spacing: 0.24em; text-transform: uppercase;
        color: var(--doc-dim);
    }
    .doc-tp__card-title {
        font-size: clamp(1.6rem, 3vw, 2.3rem);
        line-height: 1.12;
        margin-bottom: 1.75rem !important;
        transition: color 0.3s ease;
    }
    .doc-tp__card:hover .doc-tp__card-title { color: var(--doc-ember-soft); }
    .doc-tp__cta {
        display: inline-flex; align-items: center; gap: 0.55rem;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem; letter-spacing: 0.24em; text-transform: uppercase;
        color: var(--doc-ember-soft);
        border-bottom: 1px solid var(--doc-line);
        padding-bottom: 0.4rem;
        transition: border-color 0.3s ease, color 0.3s ease;
    }
    .doc-tp__card:hover .doc-tp__cta { border-bottom-color: var(--doc-ember); color: var(--doc-ember); }
    .doc-tp__cta svg { width: 0.95rem; height: 0.95rem; transition: transform 0.3s ease; }
    .doc-tp__card:hover .doc-tp__cta svg { transform: translateX(4px); }
</style>
