<script lang="ts">
    import { page } from '$app/stores';

    let status = $derived($page.status);
    let isNotFound = $derived(status === 404);
    // SvelteKit always supplies a message; fall back defensively anyway.
    let message = $derived($page.error?.message ?? 'An unexpected error occurred.');

    const sections = [
        { href: '/topics', label: 'Topics', note: 'Every study in the series' },
        { href: '/blog', label: 'Blog', note: 'Latest writing' },
        { href: '/about', label: 'About', note: 'What this project is' },
        { href: '/contact', label: 'Contact', note: 'Get in touch' }
    ];
</script>

<svelte:head>
    <title>{isNotFound ? '404 — Page Not Found' : `${status} — Error`} · The Issues in the Controversy</title>
    <meta name="robots" content="noindex" />
</svelte:head>

<div class="doc-err">
    <div class="doc-err__grain" aria-hidden="true"></div>

    <main class="doc-err__inner">
        <p class="doc-err__eyebrow">{isNotFound ? 'Signal lost' : 'Transmission fault'}</p>

        <p class="doc-err__code">{status}</p>

        <h1 class="doc-err__title">
            {#if isNotFound}
                This page is not<br /><span class="doc-err__em">in the record</span>
            {:else}
                Something broke<br /><span class="doc-err__em">in transmission</span>
            {/if}
        </h1>

        <p class="doc-err__lede">
            {#if isNotFound}
                The address you followed doesn't match anything in the archive. It may
                have been moved, renamed, or never existed at all.
            {:else}
                {message}
            {/if}
        </p>

        <div class="doc-err__cta">
            <a href="/" class="doc-btn doc-btn--solid">
                Return Home
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m0 0l-6-6m6 6l-6 6" />
                </svg>
            </a>
            <a href="/topics" class="doc-btn doc-btn--ghost">Browse Topics</a>
        </div>

        <nav class="doc-err__map" aria-label="Site sections">
            <p class="doc-err__maplabel">Or pick up the thread</p>
            <ul>
                {#each sections as section, i}
                    <li>
                        <a href={section.href}>
                            <span class="doc-tc">{String(i + 1).padStart(2, '0')}</span>
                            <span class="doc-err__maplink">{section.label}</span>
                            <span class="doc-err__mapnote">{section.note}</span>
                        </a>
                    </li>
                {/each}
            </ul>
        </nav>
    </main>
</div>

<style>
    /* Mirrors the documentary theme used by the landing and topics pages.
       Those pages scope their own doc-* classes, so the shared pieces
       (grain, timecode, buttons) are restated here rather than imported. */
    .doc-err {
        --nav-h: 5.2rem;
        position: relative;
        min-height: 100vh;
        background: var(--doc-bg);
        color: var(--doc-ink);
        padding-top: var(--nav-h);
        font-family: 'Public Sans', sans-serif;
        transition: background 0.4s ease, color 0.4s ease;
    }

    /* Film grain overlay */
    .doc-err__grain {
        position: fixed;
        inset: 0;
        z-index: 60;
        pointer-events: none;
        opacity: 0.05;
        mix-blend-mode: overlay;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    }

    .doc-err__inner {
        max-width: 64rem;
        padding: clamp(3.5rem, 8vw, 6rem) clamp(1.5rem, 6vw, 7rem) clamp(4rem, 9vw, 8rem);
    }

    .doc-err__eyebrow {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.6875rem;
        letter-spacing: 0.34em;
        text-transform: uppercase;
        color: var(--doc-ember);
        margin: 0 0 2rem;
        display: inline-flex;
        align-items: center;
        gap: 0.85rem;
    }
    .doc-err__eyebrow::before {
        content: '';
        width: 28px;
        height: 1px;
        background: var(--doc-ember);
        opacity: 0.7;
    }

    /* The status code is the graphic anchor — oversized timecode type. */
    .doc-err__code {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: clamp(5rem, 18vw, 12rem);
        font-weight: 700;
        line-height: 0.85;
        letter-spacing: -0.04em;
        color: var(--doc-ember);
        opacity: 0.22;
        margin: 0 0 clamp(1rem, 3vw, 2rem);
        user-select: none;
    }

    .doc-err__title {
        font-family: 'Newsreader', Georgia, serif;
        font-weight: 400;
        color: var(--doc-ink);
        letter-spacing: -0.018em;
        font-size: clamp(2.25rem, 7vw, 4.5rem);
        line-height: 1.02;
        margin: 0 0 1.75rem;
    }
    .doc-err__em { font-style: italic; font-weight: 300; color: var(--doc-ember-soft); }

    .doc-err__lede {
        font-size: clamp(1rem, 1.6vw, 1.2rem);
        color: var(--doc-muted);
        max-width: 38rem;
        line-height: 1.7;
        margin: 0 0 clamp(2rem, 4vw, 3rem);
    }

    /* ---------- Buttons (matched to the landing page) ---------- */
    .doc-err__cta { display: flex; flex-wrap: wrap; gap: 1rem; }
    .doc-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.6rem;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.6875rem;
        font-weight: 500;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        text-decoration: none;
        padding: 1rem 1.6rem;
        border-radius: 2px;
        transition: transform 0.3s ease, background 0.3s ease, color 0.3s ease, border-color 0.3s ease;
    }
    .doc-btn svg { width: 1rem; height: 1rem; }
    .doc-btn--solid { background: var(--doc-ember); color: #160d07; }
    .doc-btn--solid:hover { background: var(--doc-ember-soft); transform: translateY(-2px); }
    .doc-btn--ghost { color: var(--doc-ink); border: 1px solid var(--doc-line); }
    .doc-btn--ghost:hover { border-color: var(--doc-ember); color: var(--doc-ember-soft); }

    /* ---------- Section index ---------- */
    .doc-err__map {
        margin-top: clamp(3.5rem, 8vw, 5.5rem);
        border-top: 1px solid var(--doc-line);
        padding-top: 2rem;
    }
    .doc-err__maplabel {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.6875rem;
        letter-spacing: 0.28em;
        text-transform: uppercase;
        color: var(--doc-dim);
        margin: 0 0 1.25rem;
    }
    .doc-err__map ul { list-style: none; margin: 0; padding: 0; }
    .doc-err__map li { border-bottom: 1px solid var(--doc-line-soft); }
    .doc-err__map a {
        display: grid;
        grid-template-columns: 3rem minmax(0, 9rem) minmax(0, 1fr);
        align-items: baseline;
        gap: 1rem;
        padding: 1rem 0;
        text-decoration: none;
        transition: color 0.3s ease, padding-left 0.3s ease;
    }
    .doc-err__map a:hover { padding-left: 0.5rem; }

    .doc-tc {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.6875rem;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: var(--doc-dim);
    }
    .doc-err__map a:hover .doc-tc { color: var(--doc-ember); }

    .doc-err__maplink {
        font-family: 'Newsreader', Georgia, serif;
        font-size: 1.35rem;
        color: var(--doc-ink);
        transition: color 0.3s ease;
    }
    .doc-err__map a:hover .doc-err__maplink { color: var(--doc-ember-soft); }

    .doc-err__mapnote {
        font-size: 0.9rem;
        color: var(--doc-muted);
        line-height: 1.5;
    }

    @media (max-width: 640px) {
        .doc-err__map a { grid-template-columns: 2.5rem minmax(0, 1fr); }
        .doc-err__mapnote { display: none; }
    }

    @media (prefers-reduced-motion: reduce) {
        .doc-err__map a:hover { padding-left: 0; }
        .doc-btn--solid:hover { transform: none; }
    }
</style>
