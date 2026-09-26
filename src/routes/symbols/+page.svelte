<script>
    import {
        SYMBOL_GROUPS,
        ALL_SYMBOLS,
        FEATURED_SYMBOLS,
        SYMBOLS_TITLE,
        SYMBOLS_SUBTITLE
    } from '$lib/data/symbols.js';

    let query = $state('');

    // A search matches the term, its meaning, or a reference — a reader who
    // arrives holding "Daniel 7:25" should find it as readily as one holding
    // the word "horn".
    let groups = $derived.by(() => {
        const q = query.trim().toLowerCase();
        if (!q) return SYMBOL_GROUPS;
        return SYMBOL_GROUPS.map((group) => ({
            ...group,
            items: group.items.filter(
                (item) =>
                    item.term.toLowerCase().includes(q) ||
                    item.meaning.toLowerCase().includes(q) ||
                    item.refs.some((ref) => ref.toLowerCase().includes(q))
            )
        })).filter((group) => group.items.length);
    });

    let matches = $derived(groups.reduce((sum, group) => sum + group.items.length, 0));
</script>

<svelte:head>
    <title>The Lexicon - Decoding the Symbols | The Issues in the Controversy</title>
    <meta
        name="description"
        content="The prophetic lexicon of Daniel and Revelation — beasts, horns, waters, women, times and days, each defined by the passage that defines it."
    />
    <meta name="keywords" content="prophetic symbols, biblical symbols, beast, horn, waters, woman, day for a year, babylon, daniel, revelation" />
</svelte:head>

<div class="doc-sy">
    <main>
        <!-- ============================ HEADER ============================ -->
        <section class="doc-sy__head">
            <p class="doc-sy__eyebrow">Reference · The Lexicon</p>
            <h1 class="doc-sy__title">Decoding the<br /><span class="doc-sy__em">Symbols</span></h1>
            <p class="doc-sy__lede">
                Prophecy is not written in code to be guessed at - every figure it
                uses is defined somewhere else in the text. The passage that does the defining is kept
                beside each entry, so the definition can be checked rather than trusted.
            </p>
        </section>

        <!-- =========================== FEATURED =========================== -->
        <section class="doc-sy__featured">
            {#each FEATURED_SYMBOLS as symbol}
                <figure class="doc-sy__card">
                    <div class="doc-sy__frame">
                        <img src={symbol.img} alt={symbol.alt} loading="lazy" />
                    </div>
                    <figcaption>
                        <h2 class="doc-sy__card-title">{symbol.title}</h2>
                        <p class="doc-sy__card-meaning">{symbol.description}</p>
                    </figcaption>
                </figure>
            {/each}
        </section>

        <!-- =========================== GLOSSARY =========================== -->
        <section class="doc-sy__body">
            <div class="doc-sy__filter">
                <p class="doc-sy__count">
                    {query.trim() && matches !== ALL_SYMBOLS.length
                        ? `Showing ${matches} of ${ALL_SYMBOLS.length}`
                        : `${ALL_SYMBOLS.length} Entries`}
                </p>
                <div class="doc-sy__search">
                    <svg class="doc-sy__search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        bind:value={query}
                        placeholder="Search a symbol or a passage…"
                        aria-label="Search the lexicon"
                    />
                    {#if query}
                        <button type="button" onclick={() => (query = '')} aria-label="Clear search">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    {/if}
                </div>
            </div>

            {#if groups.length === 0}
                <div class="doc-sy__state">
                    <p class="doc-sy__muted">Nothing in the lexicon matches "{query}"</p>
                    <button type="button" onclick={() => (query = '')} class="doc-sy__clear">Clear search</button>
                </div>
            {:else}
                {#each groups as group (group.id)}
                    <section class="doc-sy__group" id={group.id}>
                        <header class="doc-sy__group-head">
                            <h2 class="doc-sy__group-title">{group.title}</h2>
                            <p class="doc-sy__group-note">{group.note}</p>
                        </header>

                        <dl class="doc-sy__glossary">
                            {#each group.items as item (item.term)}
                                <div class="doc-sy__row">
                                    <dt>{item.term}</dt>
                                    <dd>
                                        <p class="doc-sy__meaning">{item.meaning}</p>
                                        <p class="doc-sy__refs">
                                            {#each item.refs as ref, i}<span>{ref}</span>{#if i < item.refs.length - 1}<span class="doc-sy__dot" aria-hidden="true">·</span>{/if}{/each}
                                        </p>
                                    </dd>
                                </div>
                            {/each}
                        </dl>
                    </section>
                {/each}
            {/if}
        </section>

        <!-- ============================ CLOSING ============================ -->
        <section class="doc-sy__close">
            <p class="doc-sy__eyebrow">How to use it</p>
            <h2 class="doc-sy__close-title">A symbol means what the Bible says it means.</h2>
            <p class="doc-sy__lede">
                {SYMBOLS_TITLE} is groundwork, not the study itself. Carry these definitions into the
                seals and the prophecies of Daniel, and the pictures start reading as history.
            </p>
            <div class="doc-sy__actions">
                <a href="/seals" class="doc-sy__btn">
                    The Seven Seals
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m0 0l-6-6m6 6l-6 6" />
                    </svg>
                </a>
                <a href="/topics" class="doc-sy__btn doc-sy__btn--quiet">All the studies</a>
            </div>
        </section>
    </main>
</div>

<style>
    .doc-sy {
        --nav-h: 5.2rem;
        min-height: 100vh;
        background: var(--doc-bg);
        color: var(--doc-ink);
        padding-top: var(--nav-h);
        font-family: 'Public Sans', sans-serif;
        transition: background 0.4s ease, color 0.4s ease;
    }
    .doc-sy :where(h1, h2) {
        font-family: 'Newsreader', Georgia, serif;
        font-weight: 400;
        color: var(--doc-ink);
        letter-spacing: -0.018em;
        line-height: 1.02;
        margin: 0;
    }

    /* Header */
    .doc-sy__head {
        padding: clamp(3.5rem, 8vw, 6rem) clamp(1.5rem, 6vw, 7rem) clamp(2.5rem, 5vw, 4rem);
        max-width: 64rem;
    }
    .doc-sy__eyebrow {
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
    .doc-sy__eyebrow::before {
        content: '';
        width: 28px;
        height: 1px;
        background: var(--doc-ember);
        opacity: 0.7;
    }
    .doc-sy__title {
        font-size: clamp(3rem, 10vw, 7rem);
        line-height: 0.95;
        margin-bottom: 1.75rem !important;
    }
    .doc-sy__em { font-style: italic; font-weight: 300; color: var(--doc-ember-soft); }
    .doc-sy__lede {
        font-size: clamp(1rem, 1.6vw, 1.2rem);
        color: var(--doc-muted);
        max-width: 44rem;
        line-height: 1.7;
        margin: 0;
    }

    /* Featured triad — the three the landing page carries, with their images */
    .doc-sy__featured {
        display: grid;
        grid-template-columns: 1fr;
        gap: clamp(1.5rem, 3vw, 2.5rem);
        padding: 0 clamp(1.5rem, 6vw, 7rem) clamp(3rem, 6vw, 4.5rem);
    }
    @media (min-width: 760px) { .doc-sy__featured { grid-template-columns: repeat(3, 1fr); } }
    .doc-sy__card { margin: 0; }
    .doc-sy__frame {
        aspect-ratio: 4 / 3;
        overflow: hidden;
        border: 1px solid var(--doc-line);
        margin-bottom: 1.25rem;
    }
    .doc-sy__frame img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        filter: grayscale(0.5) contrast(1.06) brightness(0.85);
        transition: filter 0.6s ease, transform 0.9s ease;
    }
    .doc-sy__frame:hover img { filter: grayscale(0) contrast(1.05) brightness(1); transform: scale(1.04); }
    .doc-sy__card-title { font-size: clamp(1.4rem, 2.5vw, 1.9rem); margin-bottom: 0.5rem !important; }
    .doc-sy__card-meaning {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.6875rem;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: var(--doc-ember-soft);
        margin: 0;
    }

    /* Body */
    .doc-sy__body { padding: 0 clamp(1.5rem, 6vw, 7rem) clamp(3rem, 6vw, 5rem); }

    /* Filter row — the same instrument the topics index uses */
    .doc-sy__filter {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        gap: 1.5rem;
        flex-wrap: wrap;
        border-bottom: 1px solid var(--doc-line);
        padding-bottom: 1.5rem;
        margin-bottom: clamp(2.5rem, 5vw, 4rem);
    }
    .doc-sy__count {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.6875rem;
        letter-spacing: 0.28em;
        text-transform: uppercase;
        color: var(--doc-ember);
        margin: 0;
    }
    .doc-sy__search { position: relative; width: 100%; max-width: 24rem; display: flex; align-items: center; }
    .doc-sy__search input {
        width: 100%;
        background: transparent;
        border: none;
        border-bottom: 1px solid var(--doc-line);
        padding: 0.75rem 2rem;
        font-family: 'Public Sans', sans-serif;
        font-size: 0.95rem;
        color: var(--doc-ink);
        outline: none;
        transition: border-color 0.3s ease;
    }
    .doc-sy__search input::placeholder { color: var(--doc-dim); }
    .doc-sy__search input:focus { border-bottom-color: var(--doc-ember); }
    .doc-sy__search-icon { position: absolute; left: 0; width: 1.25rem; height: 1.25rem; color: var(--doc-dim); pointer-events: none; }
    .doc-sy__search button {
        position: absolute;
        right: 0;
        background: none;
        border: none;
        cursor: pointer;
        color: var(--doc-dim);
        display: inline-flex;
        transition: color 0.3s ease;
    }
    .doc-sy__search button:hover { color: var(--doc-ember-soft); }
    .doc-sy__search button svg { width: 1.25rem; height: 1.25rem; }

    /* Empty state */
    .doc-sy__state { text-align: center; padding: 5rem 0; display: flex; flex-direction: column; align-items: center; gap: 1.25rem; }
    .doc-sy__muted { color: var(--doc-muted); margin: 0; }
    .doc-sy__clear {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.6875rem;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: var(--doc-ember-soft);
        background: none;
        cursor: pointer;
        border: none;
        border-bottom: 1px solid var(--doc-line);
        padding-bottom: 0.35rem;
        transition: border-color 0.3s ease, color 0.3s ease;
    }
    .doc-sy__clear:hover { border-color: var(--doc-ember); color: var(--doc-ember); }

    /* Groups */
    .doc-sy__group { margin-bottom: clamp(3rem, 6vw, 5rem); scroll-margin-top: calc(var(--nav-h) + 1.5rem); }
    .doc-sy__group-head { margin-bottom: clamp(1.25rem, 3vw, 2rem); }
    .doc-sy__group-title {
        font-size: clamp(1.6rem, 3vw, 2.2rem);
        margin-bottom: 0.6rem !important;
    }
    .doc-sy__group-note {
        font-family: 'Newsreader', Georgia, serif;
        font-style: italic;
        font-size: 1.05rem;
        color: var(--doc-muted);
        max-width: 40rem;
        margin: 0;
    }

    /* Glossary rows — term on the left, meaning and its passages on the right,
       the same two-column reading the landing page's short list uses. */
    .doc-sy__glossary { margin: 0; }
    .doc-sy__row {
        display: grid;
        grid-template-columns: 1fr;
        gap: 0.6rem;
        align-items: baseline;
        padding: clamp(1.25rem, 2.5vw, 1.9rem) 0;
        border-top: 1px solid var(--doc-line);
    }
    @media (min-width: 760px) {
        .doc-sy__row { grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr); gap: 2rem; }
    }
    .doc-sy__row:last-child { border-bottom: 1px solid var(--doc-line); }
    .doc-sy__glossary dt {
        font-family: 'Newsreader', Georgia, serif;
        font-size: clamp(1.35rem, 2.6vw, 1.9rem);
        line-height: 1.15;
        color: var(--doc-ink);
    }
    .doc-sy__glossary dd { margin: 0; }
    .doc-sy__meaning {
        font-size: 1rem;
        line-height: 1.7;
        color: var(--doc-muted);
        margin: 0 0 0.65rem;
    }
    .doc-sy__refs {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5rem;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: var(--doc-ember-soft);
        margin: 0;
    }
    .doc-sy__dot { color: var(--doc-dim); }

    /* Closing */
    .doc-sy__close {
        border-top: 1px solid var(--doc-line);
        padding: clamp(3.5rem, 8vw, 6rem) clamp(1.5rem, 6vw, 7rem) clamp(4rem, 9vw, 8rem);
        max-width: 64rem;
    }
    .doc-sy__close-title {
        font-size: clamp(1.9rem, 4vw, 3rem);
        line-height: 1.1;
        margin-bottom: 1.5rem !important;
    }
    .doc-sy__actions { display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 2.5rem; }
    .doc-sy__btn {
        display: inline-flex;
        align-items: center;
        gap: 0.6rem;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.6875rem;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: var(--doc-ink);
        text-decoration: none;
        border: 1px solid var(--doc-line);
        border-radius: 2px;
        padding: 1rem 1.6rem;
        transition: border-color 0.3s ease, color 0.3s ease;
    }
    .doc-sy__btn:hover { border-color: var(--doc-ember); color: var(--doc-ember-soft); }
    .doc-sy__btn svg { width: 1rem; height: 1rem; transition: transform 0.3s ease; }
    .doc-sy__btn:hover svg { transform: translateX(4px); }
    .doc-sy__btn--quiet { color: var(--doc-muted); }

    @media (prefers-reduced-motion: reduce) {
        .doc-sy :where(a, img, button, input) { transition: none !important; }
    }
</style>
