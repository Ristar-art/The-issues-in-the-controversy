<script>
    import { OVERVIEWS } from '$lib/data/overviews.js';

    /** Which overview is being read — that cell shows as current, not as a link. */
    let { current } = $props();
</script>

<!-- Sits directly under the site nav on every overview page. Built like the
     seal walk-through — mono kicker over a serif title — but as a switcher
     rather than a sequence, so the two overviews read as alternatives. -->
<nav class="ov-nav" aria-label="Overviews">
    {#each OVERVIEWS as overview}
        {#if overview.id === current}
            <div class="ov-nav__cell ov-nav__cell--current" aria-current="page">
                <span class="ov-nav__kicker">{overview.kicker} · Reading now</span>
                <span class="ov-nav__title">{overview.title}</span>
                <span class="ov-nav__blurb">{overview.blurb}</span>
            </div>
        {:else}
            <a href={overview.href} class="ov-nav__cell">
                <span class="ov-nav__kicker">
                    {overview.kicker}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m0 0l-6-6m6 6l-6 6" />
                    </svg>
                </span>
                <span class="ov-nav__title">{overview.title}</span>
                <span class="ov-nav__blurb">{overview.blurb}</span>
            </a>
        {/if}
    {/each}
</nav>

<style>
    .ov-nav {
        display: grid;
        grid-template-columns: 1fr;
        border-bottom: 1px solid var(--doc-line);
        background: var(--doc-bg-2);
    }
    /* Auto-fit rather than a fixed count, so the bar keeps working as
       overviews are added to the list. */
    @media (min-width: 760px) {
        .ov-nav { grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr)); }
    }

    .ov-nav__cell {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding: clamp(1.1rem, 2.5vw, 1.6rem) clamp(1.5rem, 6vw, 7rem);
        text-decoration: none;
        border-top: 2px solid transparent;
        transition: background 0.3s ease, border-color 0.3s ease;
    }
    .ov-nav__cell + .ov-nav__cell { border-top: 1px solid var(--doc-line); }
    @media (min-width: 760px) {
        .ov-nav__cell + .ov-nav__cell { border-top: 2px solid transparent; border-left: 1px solid var(--doc-line); }
    }

    /* The one being read is marked by the rule above it, not by being loud. */
    .ov-nav__cell--current { border-top-color: var(--doc-ember); background: var(--doc-line-soft); }
    a.ov-nav__cell:hover { background: var(--doc-line-soft); }

    .ov-nav__kicker {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.5625rem;
        letter-spacing: 0.26em;
        text-transform: uppercase;
        color: var(--doc-ember);
    }
    .ov-nav__kicker svg { width: 0.85rem; height: 0.85rem; transition: transform 0.3s ease; }
    a.ov-nav__cell:hover .ov-nav__kicker svg { transform: translateX(4px); }

    .ov-nav__title {
        font-family: 'Newsreader', Georgia, serif;
        font-size: clamp(1.15rem, 2.2vw, 1.55rem);
        line-height: 1.15;
        color: var(--doc-ink);
        transition: color 0.3s ease;
    }
    a.ov-nav__cell:hover .ov-nav__title { color: var(--doc-ember-soft); }

    .ov-nav__blurb {
        font-size: 0.9rem;
        line-height: 1.5;
        color: var(--doc-muted);
    }

    @media (prefers-reduced-motion: reduce) {
        .ov-nav__cell, .ov-nav__kicker svg, .ov-nav__title { transition: none !important; }
    }
</style>
