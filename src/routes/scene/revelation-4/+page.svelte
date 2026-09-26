<script>
    import ThroneScene from '$lib/components/ThroneScene.svelte';
    import { THRONE_ELEMENTS } from '$lib/data/revelation-4.js';

    let activeId = $state(/** @type {string | null} */ (null));
    let active = $derived(THRONE_ELEMENTS.find((element) => element.id === activeId) ?? null);
</script>

<svelte:head>
    <title>The Throne Room - Revelation 4 in 3D | The Issues in the Controversy</title>
    <meta
        name="description"
        content="An interactive 3D reconstruction of the throne room of Revelation 4 — the throne, the rainbow, the sea of glass, the seven lamps, the four living creatures and the twenty-four elders."
    />
    <meta name="keywords" content="revelation 4, throne room, sea of glass, seven lamps, four living creatures, twenty four elders, 3d scene" />
</svelte:head>

<div class="doc-sc">
    <main>
        <!-- ============================ HEADER ============================ -->
        <section class="doc-sc__head">
            <p class="doc-sc__eyebrow">Scene · Revelation 4</p>
            <h1 class="doc-sc__title">The Throne<br /><span class="doc-sc__em">Room</span></h1>
            <p class="doc-sc__lede">
                Revelation 4 is the one chapter that stops to describe where everything else happens.
                Before a seal is opened, John is shown the room: a throne, a rainbow round about it, a
                sea like crystal, seven lamps burning, four living creatures and four and twenty
                elders enthroned. Every piece below is built from that chapter and labelled with the
                verse it comes from.
            </p>
        </section>

        <!-- ============================= SCENE ============================= -->
        <section class="doc-sc__stage">
            <ThroneScene onactive={(/** @type {string | null} */ id) => (activeId = id)} />

            <!-- ========================= READING PANEL ======================== -->
            <div class="doc-sc__panel" aria-live="polite">
                {#if active}
                    <p class="doc-sc__meta">
                        <span class="doc-sc__meta-num">{active.num}</span>
                        <span class="doc-sc__dot" aria-hidden="true">·</span>
                        <span class="doc-sc__meta-ref">{active.refs}</span>
                    </p>
                    <h2 class="doc-sc__panel-title">{active.label}</h2>
                    <p class="doc-sc__note">{active.note}</p>
                {:else}
                    <p class="doc-sc__note doc-sc__note--lead">
                        Take hold of the scene and turn it. Seven things in the room are marked -
                        each one names the verse it was built from.
                    </p>
                {/if}
            </div>
        </section>

        <!-- ============================ THE LIST ============================ -->
        <section class="doc-sc__list">
            <p class="doc-sc__eyebrow">What is in the room</p>
            <h2 class="doc-sc__h2">Seven things, and the verses they stand on</h2>
            <dl class="doc-sc__glossary">
                {#each THRONE_ELEMENTS as element}
                    <div
                        class="doc-sc__row"
                        class:is-active={activeId === element.id}
                        onmouseenter={() => (activeId = element.id)}
                        onmouseleave={() => (activeId = null)}
                        role="presentation"
                    >
                        <dt>
                            <span class="doc-sc__row-num">{element.num}</span>
                            {element.label}
                        </dt>
                        <dd>
                            <p class="doc-sc__row-note">{element.note}</p>
                            <p class="doc-sc__row-ref">{element.refs}</p>
                        </dd>
                    </div>
                {/each}
            </dl>
        </section>

        <!-- ============================= CLOSING ============================ -->
        <section class="doc-sc__close">
            <p class="doc-sc__eyebrow">A note on the figure</p>
            <h2 class="doc-sc__close-title">The face is left where the text leaves it.</h2>
            <p class="doc-sc__lede">
                One sits on the throne, and the scene shows Him seated - but the chapter gives an
                appearance rather than features, like a jasper and a sardine stone, so the figure is
                built of light and carries no face. What follows this room is the opening of the
                sealed book, and the judgment Daniel saw sitting.
            </p>
            <div class="doc-sc__actions">
                <a href="/seals" class="doc-sc__btn">
                    The Seven Seals
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m0 0l-6-6m6 6l-6 6" />
                    </svg>
                </a>
                <a href="/overview" class="doc-sc__btn doc-sc__btn--quiet">The parallel chart</a>
                <a href="/symbols" class="doc-sc__btn doc-sc__btn--quiet">The lexicon</a>
            </div>
        </section>
    </main>
</div>

<style>
    .doc-sc {
        --nav-h: 5.2rem;
        min-height: 100vh;
        background: var(--doc-bg);
        color: var(--doc-ink);
        padding-top: var(--nav-h);
        font-family: 'Public Sans', sans-serif;
        transition: background 0.4s ease, color 0.4s ease;
    }
    .doc-sc :where(h1, h2) {
        font-family: 'Newsreader', Georgia, serif;
        font-weight: 400;
        color: var(--doc-ink);
        letter-spacing: -0.018em;
        line-height: 1.02;
        margin: 0;
    }

    /* Header */
    .doc-sc__head {
        padding: clamp(3.5rem, 8vw, 6rem) clamp(1.5rem, 6vw, 7rem) clamp(2rem, 4vw, 3rem);
        max-width: 64rem;
    }
    .doc-sc__eyebrow {
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
    .doc-sc__eyebrow::before {
        content: '';
        width: 28px;
        height: 1px;
        background: var(--doc-ember);
        opacity: 0.7;
    }
    .doc-sc__title {
        font-size: clamp(2.8rem, 9vw, 6.5rem);
        line-height: 0.95;
        margin-bottom: 1.75rem !important;
    }
    .doc-sc__em { font-style: italic; font-weight: 300; color: var(--doc-ember-soft); }
    .doc-sc__lede {
        font-size: clamp(1rem, 1.6vw, 1.2rem);
        color: var(--doc-muted);
        max-width: 46rem;
        line-height: 1.7;
        margin: 0;
    }

    /* Stage */
    .doc-sc__stage { padding: 0 clamp(1.5rem, 6vw, 7rem) clamp(3rem, 6vw, 5rem); }
    .doc-sc__panel {
        margin-top: clamp(1.5rem, 3vw, 2.5rem);
        border-top: 1px solid var(--doc-line);
        border-left: 2px solid var(--doc-ember);
        padding: clamp(1.25rem, 3vw, 2rem);
        background: var(--doc-line-soft);
        min-height: 10rem;
    }
    .doc-sc__meta {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.6rem;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        margin: 0 0 0.9rem;
    }
    .doc-sc__meta-num { color: var(--doc-ember); }
    .doc-sc__meta-ref { color: var(--doc-muted); }
    .doc-sc__dot { color: var(--doc-dim); }
    .doc-sc__panel-title {
        font-size: clamp(1.5rem, 3vw, 2.2rem);
        line-height: 1.12;
        margin-bottom: 0.75rem !important;
    }
    .doc-sc__note {
        font-size: 1.02rem;
        line-height: 1.75;
        color: var(--doc-muted);
        max-width: 46rem;
        margin: 0;
    }
    .doc-sc__note--lead {
        font-family: 'Newsreader', Georgia, serif;
        font-style: italic;
        font-size: clamp(1.05rem, 1.8vw, 1.3rem);
    }

    /* The list */
    .doc-sc__list {
        border-top: 1px solid var(--doc-line);
        padding: clamp(3rem, 6vw, 4.5rem) clamp(1.5rem, 6vw, 7rem);
    }
    .doc-sc__h2 {
        font-size: clamp(1.8rem, 4vw, 2.8rem);
        margin-bottom: 2.5rem !important;
    }
    .doc-sc__glossary { margin: 0; }
    .doc-sc__row {
        display: grid;
        grid-template-columns: 1fr;
        gap: 0.6rem;
        padding: clamp(1.25rem, 2.5vw, 1.9rem) 0;
        border-top: 1px solid var(--doc-line);
        transition: border-color 0.3s ease;
    }
    @media (min-width: 760px) {
        .doc-sc__row { grid-template-columns: minmax(0, 1fr) minmax(0, 1.6fr); gap: 2rem; align-items: baseline; }
    }
    .doc-sc__row:last-child { border-bottom: 1px solid var(--doc-line); }
    .doc-sc__row.is-active { border-top-color: var(--doc-ember); }
    .doc-sc__glossary dt {
        display: flex;
        align-items: baseline;
        gap: 0.75rem;
        font-family: 'Newsreader', Georgia, serif;
        font-size: clamp(1.3rem, 2.5vw, 1.8rem);
        line-height: 1.15;
        color: var(--doc-ink);
        transition: color 0.3s ease;
    }
    .doc-sc__row.is-active dt { color: var(--doc-ember-soft); }
    .doc-sc__row-num {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.24em;
        color: var(--doc-ember);
    }
    .doc-sc__glossary dd { margin: 0; }
    .doc-sc__row-note { font-size: 1rem; line-height: 1.7; color: var(--doc-muted); margin: 0 0 0.6rem; }
    .doc-sc__row-ref {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: var(--doc-ember-soft);
        margin: 0;
    }

    /* Closing */
    .doc-sc__close {
        border-top: 1px solid var(--doc-line);
        padding: clamp(3.5rem, 8vw, 6rem) clamp(1.5rem, 6vw, 7rem) clamp(4rem, 9vw, 8rem);
        max-width: 64rem;
    }
    .doc-sc__close-title {
        font-size: clamp(1.9rem, 4vw, 3rem);
        line-height: 1.1;
        margin-bottom: 1.5rem !important;
    }
    .doc-sc__actions { display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 2.5rem; }
    .doc-sc__btn {
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
    .doc-sc__btn:hover { border-color: var(--doc-ember); color: var(--doc-ember-soft); }
    .doc-sc__btn svg { width: 1rem; height: 1rem; transition: transform 0.3s ease; }
    .doc-sc__btn:hover svg { transform: translateX(4px); }
    .doc-sc__btn--quiet { color: var(--doc-muted); }

    @media (prefers-reduced-motion: reduce) {
        .doc-sc :where(a, svg, dt) { transition: none !important; }
    }
</style>
