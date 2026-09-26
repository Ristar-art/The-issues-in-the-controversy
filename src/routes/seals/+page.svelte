<script>
    import { SEALS, SEALS_TITLE, SEALS_SUBTITLE, CHAIN, REIGN } from '$lib/data/seals.js';
    import SealsOverview from '$lib/components/SealsOverview.svelte';

    // Same reveal treatment the landing page uses, so a reader arriving from
    // the filmstrip meets the same rhythm here.
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

    const total = String(SEALS.length).padStart(2, '0');
</script>

<svelte:head>
    <title>The Seven Seals - The Issues in the Controversy</title>
    <meta
        name="description"
        content="Out of the judgement of Christ's kingdom come the seven seals; out of the seventh seal, the seven trumpets; and out of the seventh trumpet, Christ as the sole ruler of the universe."
    />
    <meta name="keywords" content="seven seals, seven trumpets, judgement of Christ's kingdom, revelation 6, revelation 8, revelation 11:15, seventh seal, seventh trumpet, kingdoms of this world, white horse, red horse, black horse, pale horse, souls under the altar" />
</svelte:head>

<div class="doc-sl">
    <main>
        <!-- ============================= HERO ============================= -->
        <section class="doc-sl__hero">
            <img
                class="doc-sl__hero-img"
                src="/thumbnail-SeXhKRiCmU0-640x480.jpg"
                alt="A hand resting on a scroll closed with seven wax seals"
                fetchpriority="high"
            />
            <span class="doc-sl__hero-veil" aria-hidden="true"></span>

            <div class="doc-sl__hero-text">
                <p class="doc-sl__eyebrow">Act II · Revelation 6 – 8</p>
                <h1 class="doc-sl__title">The Seven<br /><span class="doc-sl__em">Seals</span></h1>
                <p class="doc-sl__lede">
                    {SEALS_SUBTITLE} Out of the judgement of that kingdom come the seven seals.
                    Out of the seventh seal come the seven trumpets. And out of the seventh
                    trumpet, Christ is left the sole ruler of the universe - there are no longer
                    other kingdoms.
                </p>
            </div>
        </section>

        <!-- Orientation band: the whole sequence at a glance, then the jump
             index — the page is long, and the seals are read out of order as
             often as they are read straight through. -->
        <section class="doc-sl__head">
            <SealsOverview />

            <!-- <nav class="doc-sl__index" aria-label="Jump to a seal">
                {#each SEALS as seal, i}
                    <a href="#{seal.id}" class="doc-sl__chip">
                        <span class="doc-sl__chip-num">{String(i + 1).padStart(2, '0')}</span>
                        {seal.title}
                    </a>
                {/each}
            </nav> -->
        </section>

        <!-- ============================= SEALS ============================= -->
        {#each SEALS as seal, i}
            <section
                class="doc-sl__seal"
                class:doc-sl__seal--flip={i % 2 === 1}
                id={seal.id}
                use:reveal
            >
                <div class="doc-sl__frame">
                    <img src={seal.img} alt={seal.alt} loading={i === 0 ? 'eager' : 'lazy'} />
                    <span class="doc-sl__tc">SEAL {String(i + 1).padStart(2, '0')} / {total}</span>
                </div>

                <div class="doc-sl__text">
                    <p class="doc-sl__era">{seal.era}</p>
                    <h2 class="doc-sl__seal-title">{seal.title}</h2>
                    <p class="doc-sl__ref">{seal.reference}</p>
                    <p class="doc-sl__body">{seal.body}</p>

                    <a href="/seals/{seal.id}" class="doc-sl__more">
                        Go deeper on this seal
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m0 0l-6-6m6 6l-6 6" />
                        </svg>
                    </a>
                </div>

                <span class="doc-sl__ghost" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            </section>
        {/each}

        <!-- ============================== THE CHAIN ============================= -->
        <!-- The three hand-offs written out, in the order the chart draws them,
             so the argument survives without the diagram. -->
        <section class="doc-sl__chain" id="the-chain" use:reveal>
            <p class="doc-sl__eyebrow">One line, three hand-offs</p>
            <h2 class="doc-sl__chain-title">Where the sevens come from,<br />and where they end.</h2>

            <ol class="doc-sl__steps">
                {#each CHAIN as step, i}
                    <li class="doc-sl__step" id={step.id}>
                        <span class="doc-sl__step-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                        <div class="doc-sl__step-text">
                            <h3 class="doc-sl__step-title">
                                {step.from} <span class="doc-sl__step-to">{step.to}</span>
                            </h3>
                            <p class="doc-sl__ref">{step.reference}</p>
                            <p class="doc-sl__body">{step.body}</p>
                        </div>
                    </li>
                {/each}
            </ol>
        </section>

        <!-- ============================= CLOSING ============================ -->
        <section class="doc-sl__close" use:reveal>
            <p class="doc-sl__eyebrow">Where this leads</p>
            <h2 class="doc-sl__close-title">
                After the seventh trumpet there is no other kingdom.
            </h2>
            <p class="doc-sl__lede">
                {SEALS_TITLE} are one line through a longer prophecy, and it closes on a single
                throne: the kingdoms of this world become the kingdoms of our Lord and of his
                Christ, and he shall reign for ever and ever. The studies follow that line from
                Daniel through Revelation, and the series walks the same ground on film.
            </p>

            <p class="doc-sl__verse">{REIGN.reference}</p>

            <div class="doc-sl__actions">
                <a href="/topics" class="doc-sl__btn">
                    Read the studies
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m0 0l-6-6m6 6l-6 6" />
                    </svg>
                </a>
                <a href="/videos" class="doc-sl__btn doc-sl__btn--quiet">Watch the series</a>
            </div>
        </section>

    </main>
</div>

<style>
    .doc-sl {
        --nav-h: 5.2rem;
        min-height: 100vh;
        background: var(--doc-bg);
        color: var(--doc-ink);
        padding-top: var(--nav-h);
        font-family: 'Public Sans', sans-serif;
        transition: background 0.4s ease, color 0.4s ease;
    }
    .doc-sl :where(h1, h2) {
        font-family: 'Newsreader', Georgia, serif;
        font-weight: 400;
        color: var(--doc-ink);
        letter-spacing: -0.018em;
        line-height: 1.02;
        margin: 0;
    }

    /* ------------------------------ Hero ------------------------------ */
    /* The source frame is only 640px wide, so it is graded dark and veiled
       rather than shown at full brightness — the softness of the upscale
       reads as depth instead of as a low-resolution image. */
    .doc-sl__hero {
        position: relative;
        display: flex;
        align-items: flex-end;
        min-height: clamp(24rem, 68vh, 40rem);
        overflow: hidden;
        border-bottom: 1px solid var(--doc-line);
        isolation: isolate;
    }
    .doc-sl__hero-img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center 45%;
        filter: contrast(1.08) saturate(0.9) brightness(0.72);
        z-index: -2;
    }
    /* Two stops rather than one: a floor under the whole frame so the type
       holds at any crop, and a deeper wash at the bottom where it sits. */
    .doc-sl__hero-veil {
        position: absolute;
        inset: 0;
        z-index: -1;
        background:
            linear-gradient(to top, rgba(11, 11, 13, 0.94) 0%, rgba(11, 11, 13, 0.55) 45%, rgba(11, 11, 13, 0.25) 100%),
            linear-gradient(to right, rgba(11, 11, 13, 0.75) 0%, transparent 65%);
    }
    .doc-sl__hero-text {
        position: relative;
        max-width: 46rem;
        padding: clamp(2.5rem, 7vw, 5rem) clamp(1.5rem, 6vw, 7rem) clamp(2.5rem, 6vw, 4.5rem);
    }
    /* The hero is dark in both themes, so its type is pinned to the dark
       palette instead of following the page's. */
    .doc-sl__hero-text .doc-sl__title { color: #f1ebe0; }
    .doc-sl__hero-text .doc-sl__lede { color: rgba(241, 235, 224, 0.78); }

    /* Index band */
    .doc-sl__head {
        padding: clamp(2rem, 5vw, 3.5rem) clamp(1.5rem, 6vw, 7rem);
        background: var(--doc-bg-2);
        border-bottom: 1px solid var(--doc-line);
    }
    .doc-sl__eyebrow {
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
    .doc-sl__eyebrow::before {
        content: '';
        width: 28px;
        height: 1px;
        background: var(--doc-ember);
        opacity: 0.7;
    }
    .doc-sl__title {
        font-size: clamp(3rem, 10vw, 7rem);
        line-height: 0.95;
        margin-bottom: 1.75rem !important;
    }
    .doc-sl__em { font-style: italic; font-weight: 300; color: var(--doc-ember-soft); }
    .doc-sl__lede {
        font-size: clamp(1rem, 1.6vw, 1.2rem);
        color: var(--doc-muted);
        max-width: 42rem;
        line-height: 1.7;
        margin: 0;
    }

    /* Jump index */
    .doc-sl__index {
        display: flex;
        flex-wrap: wrap;
        gap: 0.6rem;
    }
    .doc-sl__chip {
        display: inline-flex;
        align-items: baseline;
        gap: 0.55rem;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: var(--doc-muted);
        text-decoration: none;
        border: 1px solid var(--doc-line);
        border-radius: 2px;
        padding: 0.6rem 0.9rem;
        transition: border-color 0.3s ease, color 0.3s ease;
    }
    .doc-sl__chip:hover { border-color: var(--doc-ember); color: var(--doc-ember-soft); }
    .doc-sl__chip-num { color: var(--doc-ember); }

    /* ---------------------------- Each seal ---------------------------- */
    .doc-sl__seal {
        position: relative;
        display: grid;
        grid-template-columns: 1fr;
        gap: clamp(1.75rem, 4vw, 3.5rem);
        align-items: center;
        padding: clamp(3rem, 7vw, 5.5rem) clamp(1.5rem, 6vw, 7rem);
        border-top: 1px solid var(--doc-line);
        /* Clears the fixed nav when an index chip jumps here. */
        scroll-margin-top: calc(var(--nav-h) + 1rem);
        opacity: 0;
        transform: translateY(24px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    .doc-sl__seal:global(.is-in) { opacity: 1; transform: none; }
    /* The index band already draws the rule above the first seal. */
    .doc-sl__seal:first-of-type { border-top: none; }

    @media (min-width: 860px) {
        .doc-sl__seal { grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr); }
        /* Alternating sides give the sequence a beat, so seven near-identical
           blocks don't read as one repeated block. */
        .doc-sl__seal--flip .doc-sl__frame { order: 2; }
    }

    .doc-sl__frame {
        position: relative;
        aspect-ratio: 4 / 3;
        overflow: hidden;
        border: 1px solid var(--doc-line);
    }
    .doc-sl__frame img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        filter: grayscale(0.55) contrast(1.06) brightness(0.85);
        transition: filter 0.6s ease, transform 0.9s ease;
    }
    .doc-sl__frame:hover img {
        filter: grayscale(0) contrast(1.05) brightness(1);
        transform: scale(1.04);
    }
    .doc-sl__tc {
        position: absolute;
        left: 0.85rem;
        bottom: 0.7rem;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.2em;
        color: #f1ebe0;
        background: rgba(11, 11, 13, 0.7);
        padding: 0.3rem 0.55rem;
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
    }

    .doc-sl__text { max-width: 34rem; }
    .doc-sl__era {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.28em;
        text-transform: uppercase;
        color: var(--doc-ember);
        margin: 0 0 1rem;
    }
    .doc-sl__seal-title {
        font-size: clamp(1.9rem, 4.5vw, 3.2rem);
        line-height: 1.08;
        margin-bottom: 0.9rem !important;
    }
    .doc-sl__ref {
        font-family: 'Newsreader', Georgia, serif;
        font-style: italic;
        font-size: 1rem;
        color: var(--doc-ember-soft);
        margin: 0 0 1.4rem;
    }
    .doc-sl__body {
        font-size: clamp(0.98rem, 1.4vw, 1.1rem);
        line-height: 1.75;
        color: var(--doc-muted);
        margin: 0;
        border-left: 1px solid var(--doc-line);
        padding-left: 1.25rem;
    }

    .doc-sl__more {
        display: inline-flex;
        align-items: center;
        gap: 0.55rem;
        margin-top: 1.75rem;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        color: var(--doc-ember-soft);
        text-decoration: none;
        border-bottom: 1px solid var(--doc-line);
        padding-bottom: 0.4rem;
        transition: border-color 0.3s ease, color 0.3s ease;
    }
    .doc-sl__more:hover { border-bottom-color: var(--doc-ember); color: var(--doc-ember); }
    .doc-sl__more svg { width: 0.95rem; height: 0.95rem; transition: transform 0.3s ease; }
    .doc-sl__more:hover svg { transform: translateX(4px); }

    /* Oversized numeral behind the text — decorative, hidden from readers
       who would otherwise hear it announced twice. */
    .doc-sl__ghost {
        position: absolute;
        top: clamp(1.5rem, 4vw, 3rem);
        right: clamp(1rem, 4vw, 4rem);
        font-family: 'Newsreader', Georgia, serif;
        font-size: clamp(6rem, 18vw, 14rem);
        line-height: 1;
        color: var(--doc-ink);
        opacity: 0.04;
        pointer-events: none;
        user-select: none;
        z-index: 0;
    }
    .doc-sl__frame,
    .doc-sl__text { position: relative; z-index: 1; }

    /* ------------------------------ The chain ------------------------------ */
    /* The ladder is the diagram in words: each step names what it comes out of
       and what it opens, and the rule down the left carries the eye through
       all three without numbering them twice. */
    .doc-sl__chain {
        border-top: 1px solid var(--doc-line);
        padding: clamp(3.5rem, 8vw, 6rem) clamp(1.5rem, 6vw, 7rem);
        background: var(--doc-bg-2);
        scroll-margin-top: calc(var(--nav-h) + 1rem);
        opacity: 0;
        transform: translateY(24px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    .doc-sl__chain:global(.is-in) { opacity: 1; transform: none; }
    .doc-sl__chain-title {
        font-size: clamp(1.9rem, 4vw, 3rem);
        line-height: 1.1;
        margin-bottom: clamp(2.5rem, 5vw, 3.5rem) !important;
    }

    .doc-sl__steps {
        list-style: none;
        margin: 0;
        padding: 0;
        max-width: 58rem;
        display: grid;
        gap: clamp(2rem, 4vw, 3rem);
    }
    .doc-sl__step {
        display: grid;
        grid-template-columns: auto minmax(0, 1fr);
        gap: clamp(1rem, 3vw, 2rem);
        scroll-margin-top: calc(var(--nav-h) + 1rem);
    }
    .doc-sl__step-n {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.6875rem;
        letter-spacing: 0.2em;
        color: var(--doc-ember);
        padding-top: 0.45rem;
    }
    /* The last step is the conclusion, so the rule stops rather than running on
       into it — the sequence ends here. */
    .doc-sl__step:not(:last-child) .doc-sl__step-n {
        position: relative;
    }
    .doc-sl__step:not(:last-child) .doc-sl__step-n::after {
        content: '';
        position: absolute;
        top: 2.1rem;
        bottom: calc(-1 * clamp(2rem, 4vw, 3rem));
        left: 50%;
        border-left: 1px solid var(--doc-line);
    }
    .doc-sl__step-title {
        font-family: 'Newsreader', Georgia, serif;
        font-weight: 400;
        font-size: clamp(1.35rem, 2.8vw, 2rem);
        line-height: 1.15;
        letter-spacing: -0.015em;
        color: var(--doc-ink);
        margin: 0 0 0.7rem;
    }
    .doc-sl__step-to { font-style: italic; color: var(--doc-ember-soft); }
    .doc-sl__step .doc-sl__body { margin-top: 0; }

    /* Closing */
    .doc-sl__close {
        border-top: 1px solid var(--doc-line);
        padding: clamp(3.5rem, 8vw, 6rem) clamp(1.5rem, 6vw, 7rem) clamp(4rem, 9vw, 8rem);
        max-width: 64rem;
        opacity: 0;
        transform: translateY(24px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    .doc-sl__close:global(.is-in) { opacity: 1; transform: none; }
    .doc-sl__close-title {
        font-size: clamp(1.9rem, 4vw, 3rem);
        line-height: 1.1;
        margin-bottom: 1.5rem !important;
    }
    .doc-sl__verse {
        margin: 1.75rem 0 0;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        color: var(--doc-ember);
    }
    .doc-sl__actions { display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 2.5rem; }
    .doc-sl__btn {
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
    .doc-sl__btn:hover { border-color: var(--doc-ember); color: var(--doc-ember-soft); }
    .doc-sl__btn svg { width: 1rem; height: 1rem; transition: transform 0.3s ease; }
    .doc-sl__btn:hover svg { transform: translateX(4px); }
    .doc-sl__btn--quiet { color: var(--doc-muted); }

    @media (prefers-reduced-motion: reduce) {
        .doc-sl__seal,
        .doc-sl__chain,
        .doc-sl__close { opacity: 1; transform: none; transition: none; }
        .doc-sl :where(a, img, svg) { transition: none !important; }
    }
</style>
