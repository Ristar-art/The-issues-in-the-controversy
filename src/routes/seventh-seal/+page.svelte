<script>
    import Seo from '$lib/components/Seo.svelte';
    import HeroExpand from '$lib/components/HeroExpand.svelte';
    import { SITE_URL, absolute } from '$lib/seo';
    import {
        SEVENTH_SEAL,
        SIXTH_SEAL,
        SEVENTH_SEAL_HREF,
        SEVENTH_SEAL_TITLE,
        SEVENTH_SEAL_SUBTITLE,
        SEVENTH_SEAL_KEYS,
        SILENCE,
        CENSER,
        TRUMPETS_GIVEN,
        REIGN_VERSE,
        TRUMPET_STUDIES
    } from '$lib/data/seventh-seal.js';
    import { SEAM } from '$lib/data/flashback-trumpets.js';

    // The flashback (Revelation 10:1 – 11:14) is printed between the sixth
    // trumpet and the seventh, so the list is split there and the seam drawn.
    const firstSix = TRUMPET_STUDIES.slice(0, 6);
    const seventhTrumpet = TRUMPET_STUDIES[6];

    // Same reveal treatment as /seals, so the two pages keep one rhythm.
    /** @param {HTMLElement} node */
    function reveal(node) {
        if (typeof window === 'undefined') return;
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduce) { node.classList.add('is-in'); return; }
        const io = new IntersectionObserver((entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-in');
                    io.unobserve(entry.target);
                }
            }
        }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
        io.observe(node);
        return { destroy() { io.disconnect(); } };
    }

    const description =
        'The seventh seal is not one more scene beside the other six. Heaven falls silent, the censer is cast down, and seven angels are given the seven trumpets that come out of it.';

    const jsonld = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Article',
                headline: `${SEVENTH_SEAL_TITLE} — ${SEVENTH_SEAL.title}`,
                description,
                image: absolute(SEVENTH_SEAL.img),
                articleSection: 'The Seven Seals',
                isPartOf: { '@type': 'WebPage', '@id': absolute('/seals') },
                publisher: { '@id': `${SITE_URL}/#organization` }
            },
            {
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: absolute('/') },
                    { '@type': 'ListItem', position: 2, name: 'The Seven Seals', item: absolute('/seals') },
                    { '@type': 'ListItem', position: 3, name: SEVENTH_SEAL_TITLE, item: absolute(SEVENTH_SEAL_HREF) }
                ]
            }
        ]
    };
</script>

<Seo
    title="The Seventh Seal and the Seven Trumpets"
    {description}
    keywords="seventh seal, seven trumpets, silence in heaven, half an hour, golden censer, close of probation, revelation 8, revelation 9, revelation 11:15, seventh trumpet"
    image={SEVENTH_SEAL.img}
    type="article"
    {jsonld}
/>

<div class="doc-ss">
    <main>
        <!-- ============================= HERO ============================= -->
        <section class="doc-ss__hero">
            <img class="doc-ss__hero-img" src={SEVENTH_SEAL.img} alt={SEVENTH_SEAL.alt} fetchpriority="high" />
            <span class="doc-ss__hero-veil" aria-hidden="true"></span>

            <HeroExpand
                src={SEVENTH_SEAL.img}
                alt={SEVENTH_SEAL.alt}
                caption={`${SEVENTH_SEAL.era} · ${SEVENTH_SEAL.title}`}
            />

            <div class="doc-ss__hero-text">
                <nav class="doc-ss__crumbs" aria-label="Breadcrumb">
                    <a href="/seals">The Seven Seals</a>
                    <span aria-hidden="true">·</span>
                    <span>Seal 07 / 07</span>
                </nav>
                <p class="doc-ss__eyebrow">Act III · Revelation 8 – 11</p>
                <h1 class="doc-ss__title">The Seventh<br /><span class="doc-ss__em">Seal</span></h1>
                <p class="doc-ss__lede">
                    {SEVENTH_SEAL_SUBTITLE} {SEVENTH_SEAL.body} Everything that follows in
                    Revelation 8 – 11 is held inside this one seal.
                </p>
            </div>
        </section>

        <!-- ========================== INTRODUCTION ========================== -->
        <section class="doc-ss__intro" id="silence" use:reveal>
            <p class="doc-ss__eyebrow">After the sixth seal</p>
            <h2 class="doc-ss__section-title">The court falls silent.</h2>

            <div class="doc-ss__split">
                <div>
                    <div class="doc-ss__prose">
                        <p>
                            Six seals have been opened, and at each one the court has been invited to
                            come and see. The sixth ends with the kings of the earth hiding in the dens
                            and rocks of the mountains and asking a single question: who shall be able
                            to stand? Between the sixth seal and the seventh, Revelation 7 is printed —
                            a <a href="/flashbacks">flashback</a> that answers that question before the
                            count goes on.
                        </p>
                        <p>
                            Then the Lamb opens the seventh seal, and nothing is shown. There is no
                            horse, no altar, no cosmic sign — only silence in heaven about the space of
                            half an hour. A court that has been examining evidence goes quiet when the
                            examination is finished. The seventh seal is the close of probation: the
                            case is decided, and there is no more grace given.
                        </p>
                    </div>

                    <blockquote class="doc-ss__pull">
                        <p>{SILENCE.text}</p>
                        <cite>{SILENCE.ref}</cite>
                    </blockquote>
                </div>

                <figure class="doc-ss__plate">
                    <img
                        src={SEVENTH_SEAL.img}
                        alt={SEVENTH_SEAL.alt}
                        loading="lazy"
                    />
                    <figcaption>
                        The seven angels which stood before God, each given a trumpet.
                        <span>{TRUMPETS_GIVEN.ref}</span>
                    </figcaption>
                </figure>
            </div>

            <!-- Three things to settle before the trumpets make sense. -->
            <ol class="doc-ss__keys">
                {#each SEVENTH_SEAL_KEYS as key, i}
                    <li class="doc-ss__key" id={key.id}>
                        <span class="doc-ss__key-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                        <div>
                            <h3 class="doc-ss__key-title">{key.title}</h3>
                            <p class="doc-ss__key-ref">{key.reference}</p>
                            <p>{key.body}</p>
                        </div>
                    </li>
                {/each}
            </ol>

            <blockquote class="doc-ss__pull doc-ss__pull--wide">
                <p>{CENSER.text}</p>
                <cite>{CENSER.ref}</cite>
            </blockquote>
        </section>

        <!-- ============================ THE TRUMPETS ============================ -->
        <!-- Each card is the way into that trumpet's own study at
             /seventh-seal/[slug], the way each seal opens /seals/[slug]. -->
        <section class="doc-ss__trumpets" id="the-trumpets" use:reveal>
            <p class="doc-ss__eyebrow">Out of the seventh seal</p>
            <h2 class="doc-ss__section-title">The seven trumpets.</h2>
            <p class="doc-ss__lede doc-ss__lede--body">
                {TRUMPETS_GIVEN.text} Six sound one after another; then the vision turns back
                before the seventh is allowed to sound. Open any trumpet for its own study.
            </p>

            <ol class="doc-ss__grid">
                {#each firstSix as trumpet}
                    <li>
                        <a class="doc-ss__card" href={trumpet.href} data-tone={trumpet.tone}>
                            <span class="doc-ss__card-top">
                                <span class="doc-ss__card-n">{String(trumpet.n).padStart(2, '0')}</span>
                                {#if trumpet.woe}<span class="doc-ss__woe">{trumpet.woe}</span>{/if}
                            </span>
                            <span class="doc-ss__card-title">{trumpet.title}</span>
                            <span class="doc-ss__card-ref">{trumpet.reference}</span>
                            <span class="doc-ss__card-body">{trumpet.body}</span>
                            <span class="doc-ss__card-go">Read the {trumpet.ordinal.toLowerCase()} trumpet →</span>
                        </a>
                    </li>
                {/each}
            </ol>

            <!-- The seam: Revelation 10:1 – 11:14, then the seventh. -->
            <a class="doc-ss__seam" href="/flashbacks">
                <span class="doc-ss__seam-label">The flashback · Revelation 10:1 – 11:14</span>
                <span class="doc-ss__seam-text">“{SEAM.text}”</span>
                <span class="doc-ss__seam-ref">{SEAM.ref}</span>
            </a>

            <a class="doc-ss__card doc-ss__card--last" href={seventhTrumpet.href} data-tone={seventhTrumpet.tone}>
                <span class="doc-ss__card-top">
                    <span class="doc-ss__card-n">{String(seventhTrumpet.n).padStart(2, '0')}</span>
                    {#if seventhTrumpet.woe}<span class="doc-ss__woe">{seventhTrumpet.woe}</span>{/if}
                </span>
                <span class="doc-ss__card-title">{seventhTrumpet.title}</span>
                <span class="doc-ss__card-ref">{seventhTrumpet.reference}</span>
                <span class="doc-ss__card-body">{seventhTrumpet.body}</span>
                <span class="doc-ss__card-go">Read the seventh trumpet →</span>
            </a>
        </section>

        <!-- ============================= CLOSING ============================ -->
        <section class="doc-ss__close" use:reveal>
            <p class="doc-ss__eyebrow">Where the seventh seal ends</p>
            <h2 class="doc-ss__section-title">After the seventh trumpet there is no other kingdom.</h2>
            <p class="doc-ss__lede doc-ss__lede--body">
                The seventh seal opens the seven trumpets, and the seventh trumpet opens the reign.
                Great voices in heaven say it outright, and from there the count does not continue —
                no eighth seal, no eighth trumpet, no second throne.
            </p>
            <blockquote class="doc-ss__pull">
                <p>{REIGN_VERSE.text}</p>
                <cite>{REIGN_VERSE.ref}</cite>
            </blockquote>
            <div class="doc-ss__actions">
                <a href="/seals#the-chain" class="doc-ss__btn">
                    The whole chain
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m0 0l-6-6m6 6l-6 6" />
                    </svg>
                </a>
                <a href="/flashbacks" class="doc-ss__btn doc-ss__btn--quiet">The flashbacks</a>
            </div>
        </section>

        <!-- ========================== WALK-THROUGH ========================= -->
        <nav class="doc-ss__walk" aria-label="Seal navigation">
            <a href={SIXTH_SEAL.href} class="doc-ss__walk-link">
                <span class="doc-ss__walk-dir">← Previous seal</span>
                <span class="doc-ss__walk-title">{SIXTH_SEAL.title}</span>
            </a>
            <a href={firstSix[0].href} class="doc-ss__walk-link doc-ss__walk-link--end">
                <span class="doc-ss__walk-dir">First trumpet →</span>
                <span class="doc-ss__walk-title">{firstSix[0].title}</span>
            </a>
        </nav>
    </main>
</div>

<style>
    .doc-ss {
        --nav-h: 5.2rem;
        --pad-x: clamp(1.5rem, 6vw, 7rem);
        --t-ice: #bcd9f0;
        --t-fire: #ec4128;
        --t-ash: #c0c0c0;
        --t-amber: #edb445;
        --t-deep: #1f4fd8;
        --t-ember: #f2801f;
        --t-gold: #f2d94f;
        min-height: 100vh;
        background: var(--doc-bg);
        color: var(--doc-ink);
        padding-top: var(--nav-h);
        font-family: 'Public Sans', sans-serif;
        transition: background 0.4s ease, color 0.4s ease;
    }
    .doc-ss :where(h1, h2) {
        font-family: 'Newsreader', Georgia, serif;
        font-weight: 400;
        color: var(--doc-ink);
        letter-spacing: -0.018em;
        line-height: 1.02;
        margin: 0;
    }

    /* ------------------------------ Hero ------------------------------ */
    .doc-ss__hero {
        position: relative;
        display: flex;
        align-items: flex-end;
        min-height: clamp(24rem, 68vh, 40rem);
        overflow: hidden;
        border-bottom: 1px solid var(--doc-line);
    }
    .doc-ss__hero:hover :global(.hero-expand__hint) { opacity: 1; transform: none; }
    .doc-ss__hero-img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        filter: contrast(1.08) saturate(0.9) brightness(0.68);
        z-index: 0;
    }
    .doc-ss__hero-veil {
        position: absolute;
        inset: 0;
        z-index: 1;
        background:
            linear-gradient(to top, rgba(11, 11, 13, 0.94) 0%, rgba(11, 11, 13, 0.55) 45%, rgba(11, 11, 13, 0.25) 100%),
            linear-gradient(to right, rgba(11, 11, 13, 0.75) 0%, transparent 65%);
    }
    .doc-ss__hero-text {
        position: relative;
        z-index: 2;
        max-width: 46rem;
        padding: clamp(2.5rem, 7vw, 5rem) var(--pad-x) clamp(2.5rem, 6vw, 4.5rem);
    }
    .doc-ss__hero-text .doc-ss__title { color: #f1ebe0; }
    .doc-ss__hero-text .doc-ss__lede { color: rgba(241, 235, 224, 0.78); }
    @media (max-width: 700px) {
        .doc-ss__hero-text { padding-bottom: 6rem; }
    }

    .doc-ss__crumbs {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        color: rgba(241, 235, 224, 0.6);
        margin-bottom: 1.5rem;
    }
    .doc-ss__crumbs a { color: inherit; text-decoration: none; transition: color 0.3s ease; }
    .doc-ss__crumbs a:hover { color: var(--doc-ember-soft); }

    .doc-ss__eyebrow {
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
    .doc-ss__eyebrow::before {
        content: '';
        width: 28px;
        height: 1px;
        background: var(--doc-ember);
        opacity: 0.7;
    }
    .doc-ss__title {
        font-size: clamp(3rem, 10vw, 7rem);
        line-height: 0.95;
        margin-bottom: 1.75rem !important;
    }
    .doc-ss__em { font-style: italic; font-weight: 300; color: var(--doc-ember-soft); }
    .doc-ss__lede {
        font-size: clamp(1rem, 1.6vw, 1.2rem);
        color: var(--doc-muted);
        max-width: 42rem;
        line-height: 1.7;
        margin: 0;
    }
    .doc-ss__lede--body { margin-bottom: clamp(2rem, 4vw, 3rem); }

    .doc-ss__section-title {
        font-size: clamp(1.9rem, 4vw, 3rem);
        line-height: 1.1;
        margin-bottom: clamp(1.75rem, 3vw, 2.5rem) !important;
    }

    /* Shared reveal */
    .doc-ss__intro,
    .doc-ss__trumpets,
    .doc-ss__close {
        scroll-margin-top: calc(var(--nav-h) + 1rem);
        opacity: 0;
        transform: translateY(24px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    .doc-ss__intro:global(.is-in),
    .doc-ss__trumpets:global(.is-in),
    .doc-ss__close:global(.is-in) { opacity: 1; transform: none; }

    /* --------------------------- Introduction --------------------------- */
    .doc-ss__intro {
        padding: clamp(3rem, 7vw, 5rem) var(--pad-x);
        border-bottom: 1px solid var(--doc-line);
    }
    .doc-ss__split {
        display: grid;
        gap: clamp(2rem, 4vw, 3.5rem);
        align-items: start;
    }
    @media (min-width: 1000px) {
        .doc-ss__split { grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr); }
    }
    .doc-ss__split .doc-ss__pull { margin-bottom: 0; }

    .doc-ss__prose { max-width: 40rem; }
    .doc-ss__prose p {
        font-size: clamp(0.98rem, 1.4vw, 1.1rem);
        line-height: 1.8;
        color: var(--doc-muted);
        margin: 0 0 1.25rem;
    }
    .doc-ss__prose p:last-child { margin-bottom: 0; }
    .doc-ss__prose a {
        color: var(--doc-ember-soft);
        text-decoration: none;
        border-bottom: 1px solid var(--doc-line);
        transition: border-color 0.3s ease;
    }
    .doc-ss__prose a:hover { border-bottom-color: var(--doc-ember); }

    .doc-ss__plate { margin: 0; }
    .doc-ss__plate img {
        display: block;
        width: 100%;
        height: auto;
        border: 1px solid var(--doc-line);
        filter: brightness(0.9) contrast(1.05) saturate(0.92);
        transition: filter 0.6s ease;
    }
    .doc-ss__plate:hover img { filter: none; }
    .doc-ss__plate figcaption {
        margin-top: 0.9rem;
        padding-left: 0.9rem;
        border-left: 1px solid var(--doc-line);
        font-size: 0.85rem;
        line-height: 1.6;
        color: var(--doc-dim);
    }
    .doc-ss__plate figcaption span {
        display: block;
        margin-top: 0.5rem;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.5625rem;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: var(--doc-ember);
    }

    .doc-ss__pull {
        margin: clamp(2.25rem, 5vw, 3.25rem) 0;
        padding-left: clamp(1.25rem, 3vw, 2rem);
        border-left: 2px solid var(--doc-ember);
        max-width: 38rem;
    }
    .doc-ss__pull--wide { max-width: 52rem; margin-bottom: 0; }
    .doc-ss__pull p {
        font-family: 'Newsreader', Georgia, serif;
        font-style: italic;
        font-size: clamp(1.25rem, 2.6vw, 1.8rem);
        line-height: 1.35;
        letter-spacing: -0.01em;
        color: var(--doc-ink);
        margin: 0 0 0.85rem;
    }
    .doc-ss__pull cite {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-style: normal;
        font-size: 0.5625rem;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        color: var(--doc-ember);
    }

    .doc-ss__keys {
        list-style: none;
        margin: clamp(2.25rem, 5vw, 3.25rem) 0;
        padding: clamp(2rem, 4vw, 2.75rem) 0 0;
        border-top: 1px solid var(--doc-line);
        display: grid;
        gap: clamp(1.75rem, 4vw, 2.5rem);
    }
    @media (min-width: 900px) {
        .doc-ss__keys { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    }
    .doc-ss__key {
        display: grid;
        grid-template-columns: auto minmax(0, 1fr);
        gap: 0.9rem;
    }
    .doc-ss__key-n {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.2em;
        color: var(--doc-ember);
        padding-top: 0.3rem;
    }
    .doc-ss__key-title {
        font-family: 'Newsreader', Georgia, serif;
        font-weight: 400;
        font-size: clamp(1.1rem, 1.8vw, 1.3rem);
        line-height: 1.25;
        letter-spacing: -0.01em;
        color: var(--doc-ink);
        margin: 0 0 0.35rem;
    }
    .doc-ss__key-ref {
        font-family: 'Newsreader', Georgia, serif;
        font-style: italic;
        font-size: 0.95rem;
        color: var(--doc-ember-soft);
        margin: 0 0 0.6rem !important;
    }
    .doc-ss__key p {
        font-size: 0.95rem;
        line-height: 1.7;
        color: var(--doc-muted);
        margin: 0;
    }

    /* ---------------------------- The trumpets ---------------------------- */
    .doc-ss__trumpets {
        padding: clamp(3rem, 7vw, 5rem) var(--pad-x);
        background: var(--doc-bg-2);
        border-bottom: 1px solid var(--doc-line);
    }
    .doc-ss__grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(auto-fill, minmax(min(100%, 17rem), 1fr));
    }
    .doc-ss__grid li { display: flex; }

    /* Each card carries its trumpet's colour as a bar down the left, the same
       colours the charts on /seals and /flashbacks draw it in. */
    .doc-ss__card {
        --tone: var(--doc-ember);
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 0.6rem;
        width: 100%;
        padding: 1.5rem 1.5rem 1.35rem 1.75rem;
        background: var(--doc-bg);
        border: 1px solid var(--doc-line);
        text-decoration: none;
        transition: border-color 0.3s ease, transform 0.3s ease;
    }
    .doc-ss__card::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 4px;
        background: var(--tone);
    }
    .doc-ss__card[data-tone='ice'] { --tone: var(--t-ice); }
    .doc-ss__card[data-tone='fire'] { --tone: var(--t-fire); }
    .doc-ss__card[data-tone='ash'] { --tone: var(--t-ash); }
    .doc-ss__card[data-tone='amber'] { --tone: var(--t-amber); }
    .doc-ss__card[data-tone='deep'] { --tone: var(--t-deep); }
    .doc-ss__card[data-tone='ember'] { --tone: var(--t-ember); }
    .doc-ss__card[data-tone='gold'] { --tone: var(--t-gold); }
    .doc-ss__card:hover { border-color: var(--tone); transform: translateY(-2px); }

    .doc-ss__card-top { display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
    .doc-ss__card-n {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.6875rem;
        letter-spacing: 0.2em;
        color: var(--doc-ember);
    }
    .doc-ss__woe {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.5625rem;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: #ec4128;
        border: 1px solid currentColor;
        border-radius: 2px;
        padding: 0.25rem 0.5rem;
    }
    .doc-ss__card-title {
        font-family: 'Newsreader', Georgia, serif;
        font-size: clamp(1.25rem, 2.2vw, 1.5rem);
        line-height: 1.2;
        color: var(--doc-ink);
        transition: color 0.3s ease;
    }
    .doc-ss__card:hover .doc-ss__card-title { color: var(--doc-ember-soft); }
    .doc-ss__card-ref {
        font-family: 'Newsreader', Georgia, serif;
        font-style: italic;
        font-size: 0.95rem;
        color: var(--doc-ember-soft);
    }
    .doc-ss__card-body {
        font-size: 0.92rem;
        line-height: 1.7;
        color: var(--doc-muted);
        flex: 1;
    }
    .doc-ss__card-go {
        margin-top: 0.5rem;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.5625rem;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: var(--doc-dim);
        transition: color 0.3s ease;
    }
    .doc-ss__card:hover .doc-ss__card-go { color: var(--doc-ember); }

    .doc-ss__card--last { max-width: 44rem; }

    /* The seam between the sixth and the seventh. */
    .doc-ss__seam {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin: 1.5rem 0;
        padding: 1.25rem 1.5rem;
        border: 1px dashed var(--doc-line);
        text-decoration: none;
        transition: border-color 0.3s ease;
    }
    .doc-ss__seam:hover { border-color: var(--doc-ember); }
    .doc-ss__seam-label,
    .doc-ss__seam-ref {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.5625rem;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: var(--doc-ember);
    }
    .doc-ss__seam-ref { color: var(--doc-dim); }
    .doc-ss__seam-text {
        font-family: 'Newsreader', Georgia, serif;
        font-style: italic;
        font-size: clamp(1.05rem, 1.8vw, 1.25rem);
        color: var(--doc-ink);
    }

    /* ------------------------------ Closing ------------------------------ */
    .doc-ss__close {
        padding: clamp(3.5rem, 8vw, 6rem) var(--pad-x) clamp(4rem, 9vw, 6rem);
        max-width: 64rem;
    }
    .doc-ss__close .doc-ss__pull { margin-bottom: 0; }
    .doc-ss__actions { display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 2.5rem; }
    .doc-ss__btn {
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
    .doc-ss__btn:hover { border-color: var(--doc-ember); color: var(--doc-ember-soft); }
    .doc-ss__btn svg { width: 1rem; height: 1rem; transition: transform 0.3s ease; }
    .doc-ss__btn:hover svg { transform: translateX(4px); }
    .doc-ss__btn--quiet { color: var(--doc-muted); }

    /* --------------------------- Walk-through --------------------------- */
    .doc-ss__walk {
        display: grid;
        grid-template-columns: 1fr;
        border-top: 1px solid var(--doc-line);
    }
    @media (min-width: 700px) { .doc-ss__walk { grid-template-columns: 1fr 1fr; } }
    .doc-ss__walk-link {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        padding: clamp(2rem, 4vw, 3rem) var(--pad-x);
        text-decoration: none;
        border-bottom: 1px solid var(--doc-line);
        transition: background 0.3s ease;
    }
    @media (min-width: 700px) {
        .doc-ss__walk-link--end {
            text-align: right;
            align-items: flex-end;
            border-left: 1px solid var(--doc-line);
        }
    }
    .doc-ss__walk-link:hover { background: var(--doc-line-soft); }
    .doc-ss__walk-dir {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        color: var(--doc-ember);
    }
    .doc-ss__walk-title {
        font-family: 'Newsreader', Georgia, serif;
        font-size: clamp(1.3rem, 2.5vw, 1.8rem);
        color: var(--doc-ink);
        line-height: 1.15;
        transition: color 0.3s ease;
    }
    .doc-ss__walk-link:hover .doc-ss__walk-title { color: var(--doc-ember-soft); }

    @media (prefers-reduced-motion: reduce) {
        .doc-ss__intro,
        .doc-ss__trumpets,
        .doc-ss__close { opacity: 1; transform: none; transition: none; }
        .doc-ss :where(a, img, svg) { transition: none !important; }
        .doc-ss__card:hover { transform: none; }
    }
</style>
