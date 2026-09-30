<script>
    import Seo from '$lib/components/Seo.svelte';
    import {
        BEAST_TITLE,
        BEAST_SUBTITLE,
        KEY_TEXT,
        VANTAGE,
        READING,
        HEADS,
        EIGHTH,
        HORNS,
        WOMAN,
        NEXT
    } from '$lib/data/beast.js';
    import BeastDiagram from '$lib/components/BeastDiagram.svelte';
    import HeroExpand from '$lib/components/HeroExpand.svelte';

    // The same reveal treatment the seals and churches pages use, so a reader
    // moving between the studies meets one rhythm.
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
        }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
        io.observe(node);
        return { destroy() { io.disconnect(); } };
    }

    const total = String(HEADS.length).padStart(2, '0');
</script>

<Seo
    title="The Beast and the Woman"
    description="Revelation 17 read as it is drawn: one beast, seven heads — Egypt, Assyria, Babylon, Medo-Persia, Greece, Rome and a seventh that continues a short space — and ten horns that stand on the beast itself, not on the heads. The woman who rides it is a religious body using a power that is not her own."
    keywords="revelation 17, beast with seven heads, ten horns, scarlet beast, the woman on the beast, mystery babylon, seven kings, five are fallen, one hour with the beast"
    image="/The beast with seven heads.png"
/>


<div class="doc-bs">
    <main>
        <!-- ============================== HERO ============================== -->
        <section class="doc-bs__hero">
            <img
                class="doc-bs__hero-img"
                src="/The beast with seven heads.png"
                alt="A seven-headed beast rising out of a stormy sea, with horns rising from its back behind the heads"
                fetchpriority="high"
            />
            <span class="doc-bs__hero-veil" aria-hidden="true"></span>

            <div class="doc-bs__hero-text">
                <p class="doc-bs__eyebrow">Revelation 17</p>
                <h1 class="doc-bs__title">The Beast<br /><span class="doc-bs__em">and the Woman</span></h1>
                <p class="doc-bs__lede">
                    {BEAST_SUBTITLE} The heads are the political powers the beast has ruled
                    through, each one in its turn at war with the people of God. The horns are not
                    on them. They are on the beast - and so is the woman.
                </p>

                <p class="doc-bs__credit">
                    An artist’s impression, not a photograph of a prophecy. Worth noticing even
                    here: the horns rise out of the body behind the heads.
                </p>
            </div>

            <!-- The hero crops a wide painting to a tall frame, and the horns
                 are the part the crop costs. This gives the whole plate back. -->
            <HeroExpand
                src="/The beast with seven heads.png"
                alt="A seven-headed beast rising out of a stormy sea, with horns rising from its back behind the heads"
                caption="The beast with seven heads — an artist’s impression. The horns rise out of the body, behind the heads."
            />
        </section>

        <!-- ============================= THE TEXT ============================ -->
        <section class="doc-bs__text">
            <blockquote class="doc-bs__quote">
                <p>“{KEY_TEXT.quote}”</p>
                <cite>{KEY_TEXT.reference}</cite>
            </blockquote>
            <p class="doc-bs__body">
                One sentence hands over the whole picture: a woman, sitting; a beast, carrying her;
                seven heads and ten horns, both belonging to the beast. Everything on this page is
                an attempt to draw that sentence without adding to it.
            </p>
        </section>

        <!-- ============================= DIAGRAM ============================= -->
        <section class="doc-bs__chart">
            <BeastDiagram />

            <figure class="doc-bs__source">
                <img
                    src="/beast-chart-source.jpg"
                    alt="The original chart: a red bar labelled Beast, seven lettered circles on top of it, ten spikes to the right of them, and a purple triangle labelled Woman over the circles"
                    loading="lazy"
                />
                <figcaption>
                    The chart this redraws. E, A, B, MP, G, R and a question mark for the seventh —
                    with the horns set apart on the beast’s own back, where the chapter puts them.
                </figcaption>
            </figure>
        </section>

        <!-- ========================== HOW TO READ IT ========================= -->
        <section class="doc-bs__why" use:reveal>
            <div class="doc-bs__why-head">
                <p class="doc-bs__eyebrow">How the picture is read</p>
                <h2 class="doc-bs__why-title">
                    The horns belong to the body,<br />not to the heads.
                </h2>
                <blockquote class="doc-bs__vantage">
                    <p>“{VANTAGE.quote}”</p>
                    <cite>{VANTAGE.reference}</cite>
                </blockquote>
            </div>

            <ol class="doc-bs__claims">
                {#each READING as item, i}
                    <li class="doc-bs__claim">
                        <span class="doc-bs__claim-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                        <div>
                            <h3 class="doc-bs__claim-title">{item.claim}</h3>
                            <p class="doc-bs__ref">{item.refs}</p>
                            <p class="doc-bs__body">{item.note}</p>
                        </div>
                    </li>
                {/each}
            </ol>
        </section>

        <!-- ============================ THE HORNS ============================ -->
        <section class="doc-bs__horns" id="the-horns" use:reveal>
            <div class="doc-bs__horns-text">
                <p class="doc-bs__eyebrow">{HORNS.title}</p>
                <h2 class="doc-bs__horns-title">Ten kings, one hour, with the beast.</h2>
                <blockquote class="doc-bs__pull">
                    <p>“{HORNS.quote}”</p>
                    <cite>{HORNS.reference}</cite>
                </blockquote>

                <dl class="doc-bs__points">
                    {#each HORNS.points as point}
                        <div>
                            <dt>{point.claim}</dt>
                            <dd>
                                <span class="doc-bs__ref">{point.refs}</span>
                                {point.note}
                            </dd>
                        </div>
                    {/each}
                </dl>
            </div>

            <figure class="doc-bs__detail">
                <div class="doc-bs__detail-frame">
                    <img
                        src="/The beast with seven heads.png"
                        alt="Detail of the beast: the horns rising out of its back and shoulders, behind and above the heads"
                        loading="lazy"
                    />
                </div>
                <figcaption>
                    Even the painters put them here. The horns come up out of the shoulders and the
                    back - behind the necks, rooted in the body. Not one of them grows out of a
                    skull.
                </figcaption>
            </figure>
        </section>

        <!-- ============================ THE HEADS ============================ -->
        <section class="doc-bs__heads-intro" use:reveal>
            <p class="doc-bs__eyebrow">The seven heads</p>
            <h2 class="doc-bs__why-title">
                Seven powers. One quarrel,<br />carried from Egypt forward.
            </h2>
            <p class="doc-bs__lede">
                Each head is a kingdom that held the people of God under its hand, and each did the
                same thing in its own idiom - bondage, deportation, a decree, an image, a cross.
                The beast is what they have in common: it wore them one after another, and it is
                still here when the last of them has fallen.
            </p>
        </section>

        {#each HEADS as head, i}
            <section class="doc-bs__head" id={head.id} data-status={head.status} use:reveal>
                <div class="doc-bs__head-side">
                    <span class="doc-bs__tc">HEAD {String(i + 1).padStart(2, '0')} / {total}</span>
                    <span class="doc-bs__code" aria-hidden="true">{head.code}</span>
                    <h3 class="doc-bs__head-title">{head.name}</h3>
                    <p class="doc-bs__era">{head.era}</p>
                    <p class="doc-bs__status">{head.statusLabel}</p>
                    <p class="doc-bs__ref">{head.refs}</p>
                </div>

                <div class="doc-bs__head-main">
                    <p class="doc-bs__charge">{head.charge}</p>
                    <p class="doc-bs__body">{head.body}</p>
                    <blockquote class="doc-bs__verse">{head.verse}</blockquote>
                </div>

                <span class="doc-bs__ghost" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            </section>
        {/each}

        <!-- ============================ THE EIGHTH =========================== -->
        <section class="doc-bs__eighth" id="the-eighth" use:reveal>
            <p class="doc-bs__eyebrow">And an eighth</p>
            <h2 class="doc-bs__eighth-title">Counted eighth. Never drawn as a head.</h2>
            <blockquote class="doc-bs__pull">
                <p>“{EIGHTH.quote}”</p>
                <cite>{EIGHTH.reference}</cite>
            </blockquote>
            <p class="doc-bs__body">{EIGHTH.note}</p>
        </section>

        <!-- ============================ THE WOMAN =========================== -->
        <section class="doc-bs__woman" id="the-woman" use:reveal>
            <div class="doc-bs__woman-head">
                <p class="doc-bs__eyebrow">{WOMAN.title}</p>
                <h2 class="doc-bs__woman-title">
                    She has no horns of her own.<br />That is why she rides.
                </h2>
                <p class="doc-bs__lede">{WOMAN.lede}</p>
                <blockquote class="doc-bs__pull">
                    <p>“{WOMAN.quote}”</p>
                    <cite>{WOMAN.reference}</cite>
                </blockquote>
            </div>

            <ol class="doc-bs__traits">
                {#each WOMAN.traits as trait, i}
                    <li class="doc-bs__trait">
                        <span class="doc-bs__claim-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                        <div>
                            <h3 class="doc-bs__claim-title">{trait.label}</h3>
                            <p class="doc-bs__ref">{trait.refs}</p>
                            <p class="doc-bs__body">{trait.note}</p>
                        </div>
                    </li>
                {/each}
            </ol>

            <div class="doc-bs__end">
                <p class="doc-bs__eyebrow">How the ride ends</p>
                <blockquote class="doc-bs__pull">
                    <p>“{WOMAN.end.quote}”</p>
                    <cite>{WOMAN.end.reference}</cite>
                </blockquote>
                <p class="doc-bs__body">{WOMAN.end.note}</p>
            </div>
        </section>

        <!-- ============================= CLOSING ============================= -->
        <section class="doc-bs__close" use:reveal>
            <p class="doc-bs__eyebrow">Where this leads</p>
            <h2 class="doc-bs__close-title">One body, wearing one head at a time.</h2>
            <p class="doc-bs__lede">
                {BEAST_TITLE} are the two oldest figures in the controversy: a power that rules,
                and a worship that should have belonged to God and went to the power instead. The
                empires in the heads are the same ones Daniel watched come and go, and the same
                history the seals and the churches read from the inside.
            </p>
            <div class="doc-bs__actions">
                {#each NEXT as link}
                    <a href={link.href} class="doc-bs__btn" class:doc-bs__btn--quiet={link.quiet}>
                        {link.label}
                        {#if !link.quiet}
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m0 0l-6-6m6 6l-6 6" />
                            </svg>
                        {/if}
                    </a>
                {/each}
            </div>
        </section>
    </main>
</div>

<style>
    .doc-bs {
        --nav-h: 5.2rem;
        min-height: 100vh;
        background: var(--doc-bg);
        color: var(--doc-ink);
        padding-top: var(--nav-h);
        font-family: 'Public Sans', sans-serif;
        transition: background 0.4s ease, color 0.4s ease;
    }
    .doc-bs :where(h1, h2, h3) {
        font-family: 'Newsreader', Georgia, serif;
        font-weight: 400;
        color: var(--doc-ink);
        letter-spacing: -0.018em;
        line-height: 1.05;
        margin: 0;
    }

    /* Head sections take the colour of their standing in Revelation 17:10, the
       same three tones the chart uses. */
    [data-status='fallen'] { --head-tone: var(--bh-fallen); }
    [data-status='present'] { --head-tone: var(--bh-present); }
    [data-status='future'] { --head-tone: var(--bh-future); }

    /* ------------------------------- Hero ------------------------------- */
    .doc-bs__hero {
        position: relative;
        display: flex;
        align-items: flex-end;
        min-height: clamp(24rem, 70vh, 42rem);
        overflow: hidden;
        border-bottom: 1px solid var(--doc-line);
    }
    /* The hero owns the hover; the hint only obeys it. */
    .doc-bs__hero:hover :global(.hero-expand__hint) { opacity: 1; transform: none; }
    .doc-bs__hero-img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center 42%;
        filter: contrast(1.06) saturate(0.85) brightness(0.68);
        z-index: 0;
    }
    .doc-bs__hero-veil {
        position: absolute;
        inset: 0;
        z-index: 1;
        background:
            linear-gradient(to top, rgba(11, 11, 13, 0.95) 0%, rgba(11, 11, 13, 0.55) 45%, rgba(11, 11, 13, 0.25) 100%),
            linear-gradient(to right, rgba(11, 11, 13, 0.78) 0%, transparent 68%);
    }
    .doc-bs__hero-text {
        position: relative;
        z-index: 2;
        max-width: 46rem;
        padding: clamp(2.5rem, 7vw, 5rem) clamp(1.5rem, 6vw, 7rem) clamp(3.5rem, 7vw, 5rem);
    }
    /* The hero stays dark in both themes, so its type is pinned to the dark
       palette rather than following the page. */
    .doc-bs__hero-text .doc-bs__title { color: #f1ebe0; }
    .doc-bs__hero-text .doc-bs__lede { color: rgba(241, 235, 224, 0.78); }
    .doc-bs__credit {
        max-width: 30rem;
        margin: 1.5rem 0 0;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.5625rem;
        letter-spacing: 0.14em;
        line-height: 1.8;
        text-transform: uppercase;
        color: rgba(241, 235, 224, 0.5);
    }
    /* Touch has no hover, so the viewer's hint stands permanently in the
       bottom corner — the hero text has to clear it. */
    @media (max-width: 700px) {
        .doc-bs__hero-text { padding-bottom: 6rem; }
    }

    .doc-bs__eyebrow {
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
    .doc-bs__eyebrow::before {
        content: '';
        width: 28px;
        height: 1px;
        background: var(--doc-ember);
        opacity: 0.7;
    }
    .doc-bs__title {
        font-size: clamp(2.8rem, 9vw, 6.4rem);
        line-height: 0.95;
        margin-bottom: 1.75rem !important;
    }
    .doc-bs__em { font-style: italic; font-weight: 300; color: var(--doc-ember-soft); }
    .doc-bs__lede {
        font-size: clamp(1rem, 1.6vw, 1.2rem);
        color: var(--doc-muted);
        max-width: 44rem;
        line-height: 1.7;
        margin: 0;
    }
    .doc-bs__body {
        font-size: clamp(0.98rem, 1.4vw, 1.08rem);
        line-height: 1.75;
        color: var(--doc-muted);
        margin: 0;
    }
    .doc-bs__ref {
        font-family: 'Newsreader', Georgia, serif;
        font-style: italic;
        font-size: 0.95rem;
        color: var(--doc-ember-soft);
        margin: 0 0 0.75rem;
    }

    /* ------------------------------ The text ------------------------------ */
    .doc-bs__text {
        display: grid;
        gap: clamp(1.5rem, 3vw, 2.5rem);
        padding: clamp(3rem, 7vw, 5rem) clamp(1.5rem, 6vw, 7rem);
        border-bottom: 1px solid var(--doc-line);
    }
    @media (min-width: 960px) {
        .doc-bs__text { grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr); align-items: end; }
    }
    .doc-bs__quote {
        margin: 0;
        padding-left: clamp(1rem, 2vw, 1.75rem);
        border-left: 3px solid var(--doc-ember);
    }
    .doc-bs__quote p {
        font-family: 'Newsreader', Georgia, serif;
        font-style: italic;
        font-size: clamp(1.3rem, 3vw, 2.1rem);
        line-height: 1.35;
        color: var(--doc-ink);
        margin: 0 0 1rem;
    }
    .doc-bs__quote cite,
    .doc-bs__pull cite,
    .doc-bs__vantage cite {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        font-style: normal;
        color: var(--doc-dim);
    }

    /* ------------------------------- Chart ------------------------------- */
    .doc-bs__chart {
        padding: clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 6vw, 7rem);
        background: var(--doc-bg-2);
        border-bottom: 1px solid var(--doc-line);
    }
    .doc-bs__source {
        margin: clamp(2rem, 4vw, 3rem) 0 0;
        display: grid;
        gap: 0.9rem;
        max-width: 34rem;
    }
    .doc-bs__source img {
        width: 100%;
        height: auto;
        display: block;
        border: 1px solid var(--doc-line);
        border-radius: 2px;
    }
    .doc-bs__source figcaption,
    .doc-bs__detail figcaption {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.14em;
        line-height: 1.9;
        text-transform: uppercase;
        color: var(--doc-dim);
        margin: 0;
    }

    /* ----------------------------- How to read ---------------------------- */
    .doc-bs__why {
        display: grid;
        gap: clamp(2rem, 4vw, 3.5rem);
        padding: clamp(3rem, 7vw, 5rem) clamp(1.5rem, 6vw, 7rem);
        border-bottom: 1px solid var(--doc-line);
        opacity: 0;
        transform: translateY(24px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    .doc-bs__why:global(.is-in) { opacity: 1; transform: none; }
    @media (min-width: 960px) {
        .doc-bs__why { grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr); }
    }
    .doc-bs__why-title {
        font-size: clamp(1.7rem, 3.4vw, 2.6rem);
        line-height: 1.1;
    }
    .doc-bs__vantage {
        margin: 1.75rem 0 0;
        padding-top: 1.5rem;
        border-top: 1px solid var(--doc-line);
    }
    .doc-bs__vantage p {
        font-family: 'Newsreader', Georgia, serif;
        font-style: italic;
        font-size: 1.1rem;
        line-height: 1.6;
        color: var(--doc-muted);
        margin: 0 0 0.85rem;
    }

    .doc-bs__claims,
    .doc-bs__traits {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: clamp(1.5rem, 3vw, 2.25rem);
    }
    .doc-bs__claim,
    .doc-bs__trait {
        display: grid;
        grid-template-columns: auto minmax(0, 1fr);
        gap: clamp(0.9rem, 2vw, 1.5rem);
    }
    .doc-bs__claim-n {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.6875rem;
        letter-spacing: 0.2em;
        color: var(--doc-ember);
        padding-top: 0.35rem;
    }
    .doc-bs__claim-title {
        font-size: clamp(1.15rem, 2vw, 1.45rem);
        line-height: 1.2;
        margin-bottom: 0.55rem !important;
    }

    /* ------------------------------- Horns ------------------------------- */
    .doc-bs__horns {
        display: grid;
        gap: clamp(2rem, 4vw, 3.5rem);
        padding: clamp(3rem, 7vw, 5rem) clamp(1.5rem, 6vw, 7rem);
        background: var(--doc-bg-2);
        border-bottom: 1px solid var(--doc-line);
        scroll-margin-top: calc(var(--nav-h) + 1rem);
        opacity: 0;
        transform: translateY(24px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    .doc-bs__horns:global(.is-in) { opacity: 1; transform: none; }
    @media (min-width: 960px) {
        .doc-bs__horns { grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr); }
    }
    .doc-bs__horns-title {
        font-size: clamp(1.7rem, 3.4vw, 2.6rem);
        line-height: 1.1;
        margin-bottom: 1.5rem !important;
    }
    .doc-bs__pull {
        margin: 0 0 2rem;
        padding-left: clamp(1rem, 2vw, 1.5rem);
        border-left: 3px solid var(--doc-ember);
    }
    .doc-bs__pull p {
        font-family: 'Newsreader', Georgia, serif;
        font-style: italic;
        font-size: clamp(1.1rem, 2.2vw, 1.5rem);
        line-height: 1.45;
        color: var(--doc-ink);
        margin: 0 0 0.85rem;
    }
    .doc-bs__points { margin: 0; display: grid; gap: 1.25rem; }
    .doc-bs__points > div {
        padding-top: 1.25rem;
        border-top: 1px solid var(--doc-line-soft);
    }
    .doc-bs__points dt {
        font-family: 'Newsreader', Georgia, serif;
        font-size: clamp(1.05rem, 1.8vw, 1.25rem);
        line-height: 1.3;
        color: var(--doc-ink);
        margin-bottom: 0.5rem;
    }
    .doc-bs__points dd {
        margin: 0;
        font-size: 0.95rem;
        line-height: 1.7;
        color: var(--doc-muted);
    }
    .doc-bs__points dd .doc-bs__ref { display: block; margin-bottom: 0.35rem; }

    .doc-bs__detail { margin: 0; display: grid; gap: 0.9rem; align-content: start; }
    .doc-bs__detail-frame {
        overflow: hidden;
        border: 1px solid var(--doc-line);
        border-radius: 2px;
        aspect-ratio: 4 / 3;
    }
    /* Cropped onto the shoulders, where the horns come out of the body. */
    .doc-bs__detail-frame img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: 58% 36%;
        transform: scale(1.85);
        transform-origin: 58% 36%;
        filter: contrast(1.05) saturate(0.9);
    }

    /* ------------------------------- Heads ------------------------------- */
    .doc-bs__heads-intro {
        padding: clamp(3rem, 7vw, 5rem) clamp(1.5rem, 6vw, 7rem) clamp(1.5rem, 3vw, 2.5rem);
        max-width: 60rem;
        opacity: 0;
        transform: translateY(24px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    .doc-bs__heads-intro:global(.is-in) { opacity: 1; transform: none; }
    .doc-bs__heads-intro .doc-bs__why-title { margin-bottom: 1.5rem !important; }

    .doc-bs__head {
        position: relative;
        display: grid;
        grid-template-columns: 1fr;
        gap: clamp(1.25rem, 3vw, 3rem);
        padding: clamp(2.5rem, 5vw, 3.5rem) clamp(1.5rem, 6vw, 7rem);
        border-bottom: 1px solid var(--doc-line);
        scroll-margin-top: calc(var(--nav-h) + 1rem);
        opacity: 0;
        transform: translateY(24px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    .doc-bs__head:global(.is-in) { opacity: 1; transform: none; }
    @media (min-width: 900px) {
        .doc-bs__head { grid-template-columns: minmax(0, 0.75fr) minmax(0, 1.25fr); }
    }
    .doc-bs__head-side { position: relative; z-index: 1; }
    .doc-bs__tc {
        display: block;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.5625rem;
        letter-spacing: 0.24em;
        color: var(--doc-dim);
        margin-bottom: 1rem;
    }
    /* The chart's circle, carried into the section so the two read as one. */
    .doc-bs__code {
        display: grid;
        place-items: center;
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        background: var(--head-tone, var(--doc-line));
        border: 2px solid rgba(0, 0, 0, 0.35);
        font-family: 'Newsreader', Georgia, serif;
        font-style: italic;
        font-size: 1.15rem;
        color: var(--bh-ink);
        margin-bottom: 1rem;
    }
    .doc-bs__head-title {
        font-size: clamp(2rem, 4.5vw, 3.2rem);
        line-height: 1;
        border-bottom: 3px solid var(--head-tone, var(--doc-line));
        padding-bottom: 0.5rem;
        display: inline-block;
        margin-bottom: 0.9rem !important;
    }
    .doc-bs__era,
    .doc-bs__status {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        margin: 0 0 0.5rem;
    }
    .doc-bs__era { color: var(--doc-dim); }
    .doc-bs__status { color: var(--doc-ember); }

    .doc-bs__head-main { position: relative; z-index: 1; }
    .doc-bs__charge {
        font-family: 'Newsreader', Georgia, serif;
        font-size: clamp(1.2rem, 2.4vw, 1.65rem);
        line-height: 1.3;
        color: var(--doc-ink);
        margin: 0 0 1.1rem;
        padding-left: 1.25rem;
        border-left: 3px solid var(--head-tone, var(--doc-line));
    }
    .doc-bs__verse {
        margin: 1.5rem 0 0;
        padding-top: 1.25rem;
        border-top: 1px solid var(--doc-line-soft);
        font-family: 'Newsreader', Georgia, serif;
        font-style: italic;
        font-size: 1.05rem;
        line-height: 1.6;
        color: var(--doc-ember-soft);
    }
    .doc-bs__ghost {
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

    /* ------------------------------- Eighth ------------------------------- */
    .doc-bs__eighth {
        padding: clamp(3rem, 7vw, 5rem) clamp(1.5rem, 6vw, 7rem);
        max-width: 58rem;
        border-bottom: 1px solid var(--doc-line);
        scroll-margin-top: calc(var(--nav-h) + 1rem);
        opacity: 0;
        transform: translateY(24px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    .doc-bs__eighth:global(.is-in) { opacity: 1; transform: none; }
    .doc-bs__eighth-title {
        font-size: clamp(1.7rem, 3.4vw, 2.6rem);
        line-height: 1.1;
        margin-bottom: 1.75rem !important;
    }

    /* -------------------------------- Woman ------------------------------- */
    .doc-bs__woman {
        display: grid;
        gap: clamp(2rem, 4vw, 3.5rem);
        padding: clamp(3rem, 7vw, 5rem) clamp(1.5rem, 6vw, 7rem);
        background: var(--doc-bg-2);
        border-bottom: 1px solid var(--doc-line);
        scroll-margin-top: calc(var(--nav-h) + 1rem);
        opacity: 0;
        transform: translateY(24px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    .doc-bs__woman:global(.is-in) { opacity: 1; transform: none; }
    @media (min-width: 960px) {
        .doc-bs__woman { grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr); }
        .doc-bs__end { grid-column: 1 / -1; }
    }
    .doc-bs__woman-title {
        font-size: clamp(1.7rem, 3.4vw, 2.6rem);
        line-height: 1.1;
        margin-bottom: 1.5rem !important;
    }
    /* The woman's own colour, used once, on the rule that carries her title. */
    .doc-bs__woman-head .doc-bs__lede { margin-bottom: 1.75rem; }
    .doc-bs__woman-head .doc-bs__pull { border-left-color: var(--bh-woman); }
    .doc-bs__end {
        padding-top: clamp(1.75rem, 3vw, 2.5rem);
        border-top: 1px solid var(--doc-line);
        max-width: 52rem;
    }
    .doc-bs__end .doc-bs__pull { border-left-color: var(--bh-horn); }

    /* ------------------------------- Closing ------------------------------ */
    .doc-bs__close {
        padding: clamp(3.5rem, 8vw, 6rem) clamp(1.5rem, 6vw, 7rem) clamp(4rem, 9vw, 8rem);
        max-width: 64rem;
        opacity: 0;
        transform: translateY(24px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    .doc-bs__close:global(.is-in) { opacity: 1; transform: none; }
    .doc-bs__close-title {
        font-size: clamp(1.9rem, 4vw, 3rem);
        line-height: 1.1;
        margin-bottom: 1.5rem !important;
    }
    .doc-bs__actions { display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 2.5rem; }
    .doc-bs__btn {
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
    .doc-bs__btn:hover { border-color: var(--doc-ember); color: var(--doc-ember-soft); }
    .doc-bs__btn svg { width: 1rem; height: 1rem; transition: transform 0.3s ease; }
    .doc-bs__btn:hover svg { transform: translateX(4px); }
    .doc-bs__btn--quiet { color: var(--doc-muted); }

    @media (prefers-reduced-motion: reduce) {
        .doc-bs__why,
        .doc-bs__horns,
        .doc-bs__heads-intro,
        .doc-bs__head,
        .doc-bs__eighth,
        .doc-bs__woman,
        .doc-bs__close { opacity: 1; transform: none; transition: none; }
        .doc-bs :where(a, svg, img) { transition: none !important; }
    }
</style>
