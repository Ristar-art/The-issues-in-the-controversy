<script>
    import SearchBar from '$lib/components/SearchBar.svelte';
    import Seo from '$lib/components/Seo.svelte';
    import { SITE_URL, SITE_NAME, SITE_ALTERNATE_NAME, SITE_DESCRIPTION, absolute } from '$lib/seo';
    import { getVideoId, getThumbnailUrl, episodeLabel } from '$lib/data/videos.js';
    import { SEALS, SEALS_TITLE, SEALS_SUBTITLE } from '$lib/data/seals.js';

    const { data } = $props();
    const landing = data.landing ?? {};

    const hero = '/thetrhoneroom.jpg';

    // ----- Hero content -----
    const heroCta = { label: 'Begin the Story', href: '/topics' };
    const heroCtaSecondary = { label: 'Read the Brief', href: '#chapters' };


    // ----- Chapters (Key Topics) -----
    const chapters = [
        
        {
            title: 'The Overview of Daniel and Revelation',
            description: 'A panoramic view of the prophecies in the books of Daniel and Revelation.',
            href: 'the-overview-of-daniel-and-revelation'
        },
        {
            title: 'Analysis of the Judgment of the Kingdoms',
            description: 'Understanding the nature of the judgement in Daniel 7 and Revelation 4.',
            href: 'analysis-of-the-judgment-of-the-kingdoms'
        },
        {
            title: 'The Character of God',
            description: 'A deep dive into understanding the kind of person our Father is.',
            href: 'the-character-of-god'
        },
        {
            title: 'The Gospel of the Kingdom',
            description: 'This gospel of the kingdom will be preached in the whole world. - Matthew 24:14.',
            href: 'the-gospel-of-the-kingdom'
        }
    ];

    // ----- The Seven Seals (Progress) -----
    // The full treatment lives at /seals; this strip is the teaser for it.
    const progressTitle = SEALS_TITLE;
    const progressEyebrow = SEALS_SUBTITLE;
    const progressDefaults = SEALS;

    let timelineScroller;
    function scrollTimelineBy(dx) {
        if (timelineScroller) timelineScroller.scrollBy({ left: dx, behavior: 'smooth' });
    }

    // ----- Featured Videos (Screening Room) -----
    // Pulled from the YouTube playlist server-side; see $lib/server/youtube.js.
    const videos = $derived(data.videos ?? []);
    const featureVideo = $derived(videos[0] ?? null);
    // The landing page stays a curated teaser; /videos carries the full list.
    const sideVideos = $derived(videos.slice(1, 4));
    let selectedVideo = $state(null);

    function openModal(video) { selectedVideo = video; }
    function closeModal() { selectedVideo = null; }

    // ----- Scroll reveal -----
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

    // ----- SEO -----
    // The site and the film series share a home page, so the structured data
    // names both: the site as the WebSite, the fellowship as its publisher.
    const homeJsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'WebSite',
                '@id': `${SITE_URL}/#website`,
                url: `${SITE_URL}/`,
                name: SITE_NAME,
                alternateName: SITE_ALTERNATE_NAME,
                description: SITE_DESCRIPTION,
                inLanguage: 'en',
                publisher: { '@id': `${SITE_URL}/#organization` }
            },
            {
                '@type': 'Organization',
                '@id': `${SITE_URL}/#organization`,
                name: SITE_NAME,
                url: `${SITE_URL}/`,
                logo: absolute('/logoimage.jpg')
            }
        ]
    };
</script>

<Seo
    title="The Endgame of Heaven — Daniel & Revelation Prophecy"
    description="A documentary journey through the prophecies of Daniel and Revelation — the seven seals, the seven churches, the beast, the 144,000, the character of God, and the great controversy unfolding to its end."
    keywords="biblical prophecy, book of daniel, book of revelation, seven seals, seven churches, the 144000, mark of the beast, character of god, prophetic symbols, kingdom of god, great controversy"
    path="/"
    jsonld={homeJsonLd}
/>

<div class="doc-root">
    <div class="doc-grain" aria-hidden="true"></div>

    <main>
        <!-- ======================================================== -->
        <!-- TITLE CARD — Hero                                          -->
        <!-- ======================================================== -->
        <section class="doc-hero">
            <img src={hero} alt="" aria-hidden="true" class="doc-hero__img" />
            <div class="doc-hero__scrim" aria-hidden="true"></div>
            <div class="doc-letterbox doc-letterbox--top" aria-hidden="true"></div>
            <div class="doc-letterbox doc-letterbox--bottom" aria-hidden="true"></div>

            <!-- <div class="doc-hero__rail" aria-hidden="true">
                <span class="doc-tc">REC ●</span>
                <span class="doc-tc">00:00:01:14</span>
            </div> -->

            <div class="doc-hero__content">
                <!-- <p class="doc-kicker">A Documentary in Seven Seals</p> -->
                <h1 class="doc-hero__title">
                    The Endgame<br />of <span class="doc-em">Heaven</span>
                </h1>
                <p class="doc-hero__logline">
                    Revelation, Made Clear
                    <!-- <span class="doc-cite">— Daniel 7:9–10</span> -->
                </p>
                <div class="doc-hero__cta">
                    <a href={heroCta.href} class="doc-btn doc-btn--solid">
                        {heroCta.label}
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m0 0l-6-6m6 6l-6 6"/></svg>
                    </a>
                    <a href={heroCtaSecondary.href} class="doc-btn doc-btn--ghost">{heroCtaSecondary.label}</a>
                </div>
            </div>

            <div class="doc-scrollcue" aria-hidden="true">
                <span>Scroll</span>
                <span class="doc-scrollcue__line"></span>
            </div>
        </section>

        <!-- ======================================================== -->
        <!-- COLD OPEN — Logline                                        -->
        <!-- ======================================================== -->
        <section class="doc-coldopen" use:reveal>
            <p class="doc-act">Prologue</p>
            <p class="doc-coldopen__lede">
                Many will be purified, made spotless and refined, but the wicked will continue to be wicked. None of the wicked will understand, <span class="doc-em">but those who are wise will understand.</span>       
            </p>
            <p class="doc-coldopen__sub">
                Blessed is the one who reads aloud the words of this prophecy, and blessed are those who hear it and take to heart what is written in it, because the time is near.            </p>
        </section>

        {#if landing.searchBar}
            <div class="doc-search">
                <SearchBar config={landing.searchBar} />
            </div>
        {/if}

        <!-- ======================================================== -->
        <!-- CHAPTERS — Key Topics                                      -->
        <!-- ======================================================== -->
        <!-- <section id="chapters" class="doc-chapters" use:reveal>
            <header class="doc-section-head">
                <p class="doc-act">Act I · The Foundations</p>
                <h2 class="doc-section-title">Chapters</h2>
            </header>

            <ol class="doc-chapter-list">
                {#each chapters as ch, i}
                    <li>
                        <a href={`/${ch.href}`} class="doc-chapter">
                            <span class="doc-chapter__num">{String(i + 1).padStart(2, '0')}</span>
                            <span class="doc-chapter__body">
                                <span class="doc-chapter__title">{ch.title}</span>
                                <span class="doc-chapter__desc">{ch.description}</span>
                            </span>
                            <span class="doc-chapter__go" aria-hidden="true">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M5 12h14m0 0l-6-6m6 6l-6 6"/></svg>
                            </span>
                        </a>
                    </li>
                {/each}
            </ol>
        </section> -->

        <!-- ======================================================== -->
        <!-- THE SEVEN SEALS — Filmstrip                                -->
        <!-- ======================================================== -->
        <section class="doc-seals" use:reveal>
            <header class="doc-section-head doc-section-head--split">
                <div>
                    <p class="doc-act">The Books Were Open</p>
                    <h2 class="doc-section-title">{progressTitle}</h2>
                    <p class="doc-section-sub">{progressEyebrow}</p>
                </div>
                <div class="doc-seals__nav">
                    <button type="button" class="doc-round" aria-label="Scroll left" onclick={() => scrollTimelineBy(-440)}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 19l-7-7 7-7"/></svg>
                    </button>
                    <button type="button" class="doc-round" aria-label="Scroll right" onclick={() => scrollTimelineBy(440)}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 5l7 7-7 7"/></svg>
                    </button>
                </div>
            </header>

            <div bind:this={timelineScroller} class="doc-filmstrip no-scrollbar">
                {#each progressDefaults as e, i}
                    <!-- The whole still is the link — each one opens that
                         seal's own study rather than the index. -->
                    <a class="doc-still" href="/seals/{e.id}">
                        <div class="doc-still__frame">
                            <img src={e.img} alt={e.alt} class="doc-still__img" loading="lazy" />
                            <span class="doc-still__tc">SEAL {String(i + 1).padStart(2, '0')} / 07</span>
                        </div>
                        <h3 class="doc-still__title">
                            {e.title}
                            <svg class="doc-still__go" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m0 0l-6-6m6 6l-6 6" />
                            </svg>
                        </h3>
                        <p class="doc-still__body">{e.body}</p>
                    </a>
                {/each}
            </div>

            <a href="/seals" class="doc-btn doc-btn--ghost doc-seals__more">Open the Seven Seals</a>
        </section>

        <!-- ======================================================== -->
        <!-- SCREENING ROOM — Featured Videos                           -->
        <!-- ======================================================== -->
        <section class="doc-screening" use:reveal>
            <header class="doc-section-head">
                <p class="doc-act">The Judgment Room</p>
                <h2 class="doc-section-title">Revelation, Made Clear</h2>
            </header>

            <div class="doc-screening__grid">
                {#if featureVideo}
                    {@const fId = getVideoId(featureVideo.embedUrl)}
                    <button type="button" class="doc-player" onclick={() => openModal(featureVideo)} aria-label={`Play ${featureVideo.title}`}>
                        {#if fId}<img src={getThumbnailUrl(fId)} alt={featureVideo.title} class="doc-player__img" loading="lazy" />{/if}
                        <span class="doc-player__veil" aria-hidden="true"></span>
                        <span class="doc-play" aria-hidden="true">
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                        </span>
                        <span class="doc-player__meta">
                            <span class="doc-tc">Series 01 · {episodeLabel(featureVideo)}</span>
                            <span class="doc-player__name">{featureVideo.title}</span>
                        </span>
                    </button>
                {/if}

                <div class="doc-playlist">
                    <p class="doc-playlist__intro">An immersive walkthrough of the Endgame of Heaven - the series, episode by episode.</p>
                    <ul>
                        {#each sideVideos as video}
                            {@const vId = getVideoId(video.embedUrl)}
                            <li>
                                <button type="button" class="doc-track" onclick={() => openModal(video)}>
                                    <span class="doc-track__thumb">
                                        {#if vId}<img src={getThumbnailUrl(vId)} alt="" loading="lazy" />{/if}
                                        <span class="doc-track__play" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span>
                                    </span>
                                    <span class="doc-track__text">
                                        <span class="doc-tc">{episodeLabel(video)}</span>
                                        <span class="doc-track__name">{video.title}</span>
                                    </span>
                                </button>
                            </li>
                        {/each}
                    </ul>
                    <a href="/videos" class="doc-btn doc-btn--ghost">View All Episodes</a>
                </div>
            </div>
        </section>

        <!-- ======================================================== -->
        <!-- END CARD                                                   -->
        <!-- ======================================================== -->
        <section class="doc-endcard" use:reveal>
            <p class="doc-kicker">The Battle For The Kingdom</p>
            <h2 class="doc-endcard__title">Be A Part Of It.</h2>
            <a href="/topics" class="doc-btn doc-btn--solid">Explore Every Topic</a>
        </section>
    </main>

    <!-- ======================================================== -->
    <!-- VIDEO MODAL                                                -->
    <!-- ======================================================== -->
    {#if selectedVideo}
        <div class="doc-modal" role="dialog" aria-modal="true" aria-label={selectedVideo.title}>
            <button type="button" class="doc-modal__backdrop" aria-label="Close" onclick={closeModal}></button>
            <div class="doc-modal__inner">
                <button type="button" class="doc-modal__close" onclick={closeModal}>Close ✕</button>
                <div class="doc-modal__frame">
                    <iframe src={selectedVideo.embedUrl} title={selectedVideo.title} allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>
                </div>
                <h3 class="doc-modal__title">{selectedVideo.title}</h3>
            </div>
        </div>
    {/if}
</div>

<style>
    /* ============================================================
       THE ENDGAME OF HEAVEN — Documentary / Storytelling theme
       Cinematic, dark, film-grain. Newsreader display + JetBrains
       Mono timecodes + Public Sans body. Landing page only.
       ============================================================ */
    .doc-root {
        /* Short aliases inherit the themeable global palette (dark/light) */
        --bg: var(--doc-bg);
        --bg-2: var(--doc-bg-2);
        --bg-3: var(--doc-bg-3);
        --ink: var(--doc-ink);
        --muted: var(--doc-muted);
        --dim: var(--doc-dim);
        --ember: var(--doc-ember);
        --ember-soft: var(--doc-ember-soft);
        --line: var(--doc-line);
        --line-soft: var(--doc-line-soft);

        --nav-h: 5.2rem;

        position: relative;
        padding-top: var(--nav-h);
        background: var(--bg);
        color: var(--ink);
        font-family: 'Public Sans', sans-serif;
        overflow-x: clip;
        transition: background 0.4s ease, color 0.4s ease;
    }

    /* The hero sits on a dark cinematic photo — keep its text light in both
       themes by pinning the palette to the dark context locally. */
    .doc-hero {
        --bg: #0b0b0d;
        --ink: #f1ebe0;
        --muted: #cfc7ba;
        --dim: #9a9384;
        --ember: #d97a43;
        --ember-soft: #e7b083;
        --line: rgba(241, 235, 224, 0.18);
    }

    /* Film grain overlay */
    .doc-grain {
        position: fixed;
        inset: 0;
        z-index: 60;
        pointer-events: none;
        opacity: 0.05;
        mix-blend-mode: overlay;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    }

    .doc-root :where(h1, h2, h3) {
        font-family: 'Newsreader', Georgia, serif;
        font-weight: 400;
        color: var(--ink);
        letter-spacing: -0.018em;
        line-height: 1.02;
        margin: 0;
    }
    .doc-root :where(p) { margin: 0; color: var(--muted); }

    .doc-em { font-style: italic; font-weight: 300; color: var(--ember-soft); }

    /* Timecode / mono labels */
    .doc-tc {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.6875rem;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: var(--dim);
    }
    .doc-kicker {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.6875rem;
        letter-spacing: 0.42em;
        text-transform: uppercase;
        color: var(--ember);
    }
    .doc-act {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.6875rem;
        letter-spacing: 0.34em;
        text-transform: uppercase;
        color: var(--ember);
        display: inline-flex;
        align-items: center;
        gap: 0.85rem;
    }
    .doc-act::before {
        content: '';
        width: 28px;
        height: 1px;
        background: var(--ember);
        opacity: 0.7;
    }

    /* ---------- Buttons ---------- */
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
    .doc-btn--solid { background: var(--ember); color: #160d07; }
    .doc-btn--solid:hover { background: var(--ember-soft); transform: translateY(-2px); }
    .doc-btn--ghost { color: var(--ink); border: 1px solid var(--line); }
    .doc-btn--ghost:hover { border-color: var(--ember); color: var(--ember-soft); }

    /* ---------- Section scaffolding ---------- */
    main > section { padding-inline: clamp(1.5rem, 6vw, 7rem); }

    .doc-section-head { margin-bottom: clamp(2.5rem, 5vw, 4.5rem); }
    .doc-section-head--split {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        gap: 2rem;
        flex-wrap: wrap;
    }
    .doc-section-title {
        font-size: clamp(2.6rem, 6vw, 5rem);
        margin-top: 1.1rem;
    }
    .doc-section-sub { margin-top: 1rem; color: var(--muted); max-width: 40ch; }

    /* Reveal animation */
    .doc-coldopen, .doc-chapters, .doc-seals, .doc-screening, .doc-endcard {
        opacity: 0;
        transform: translateY(28px);
        transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1), transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
    }
    .doc-coldopen:global(.is-in), .doc-chapters:global(.is-in), .doc-seals:global(.is-in),
    .doc-screening:global(.is-in), .doc-endcard:global(.is-in) {
        opacity: 1;
        transform: none;
    }

    /* ============================================================
       HERO / TITLE CARD
       ============================================================ */
    .doc-hero {
        position: relative;
        /* Height alone tracks the hero photo's proportions (2554 × 1659), so
           `cover` has almost nothing to trim off the top and bottom. Driving
           this off the width via `height` rather than `aspect-ratio` is
           deliberate: an aspect-ratio box whose height gets clamped resolves
           its *width* from the ratio too, which pulls the section in from the
           edge of the screen. Capped at the viewport so wide monitors don't
           get a runaway hero; floored so it always covers the fold. */
        height: min(calc(100vw * 1659 / 2554), 100svh);
        min-height: calc(100svh - var(--nav-h));
        display: flex;
        align-items: center;
        padding-inline: clamp(1.5rem, 6vw, 7rem) !important;
        overflow: hidden;
    }
    .doc-hero__img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        filter: saturate(0.88) contrast(1.04) brightness(1);
        transform: scale(1.06);
        animation: docKenBurns 24s ease-out forwards;
    }
    /* Settle on the full frame rather than pushing past it, so the drift
       never eats the edges of the photo. */
    @keyframes docKenBurns {
        to { transform: scale(1); }
    }
    .doc-hero__scrim {
        position: absolute;
        inset: 0;
        background:
            linear-gradient(to top, var(--bg) 2%, rgba(11,11,13,0.12) 45%, rgba(11,11,13,0.22) 100%),
            radial-gradient(110% 90% at 12% 72%, rgba(11,11,13,0.62), transparent 58%);
    }
    /* Cinematic framing without an opaque band clipping the photo: the bars
       fade out instead of cutting a hard edge. */
    .doc-letterbox {
        position: absolute;
        left: 0;
        right: 0;
        height: clamp(28px, 6vh, 64px);
        z-index: 3;
        pointer-events: none;
    }
    .doc-letterbox--top {
        top: 0;
        background: linear-gradient(to bottom, rgba(11,11,13,0.55), rgba(11,11,13,0));
    }
    .doc-letterbox--bottom {
        bottom: 0;
        background: linear-gradient(to top, rgba(11,11,13,0.55), rgba(11,11,13,0));
    }

    .doc-hero__rail {
        position: absolute;
        top: clamp(28px, 6vh, 64px);
        left: 0;
        right: 0;
        display: flex;
        justify-content: space-between;
        padding: 1.25rem clamp(1.5rem, 6vw, 7rem);
        z-index: 4;
    }
    .doc-hero__rail .doc-tc:first-child { color: var(--ember); }

    .doc-hero__content { position: relative; z-index: 4; max-width: 60rem; }
    .doc-hero__title {
        font-size: clamp(3rem, 11vw, 9rem);
        line-height: 0.92;
        margin: 1.2rem 0;
        text-shadow: 0 2px 30px rgba(0,0,0,0.4);
    }
    .doc-hero__logline {
        font-family: 'Newsreader', Georgia, serif;
        font-style: italic;
        font-size: clamp(1.05rem, 2.2vw, 1.6rem);
        color: var(--ink);
        max-width: 34ch;
        line-height: 1.5;
        margin-bottom: 2.5rem;
    }
    .doc-cite {
        display: block;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-style: normal;
        font-size: 0.7rem;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: var(--ember);
        margin-top: 1rem;
    }
    .doc-hero__cta { display: flex; flex-wrap: wrap; gap: 1rem; }

    .doc-scrollcue {
        position: absolute;
        bottom: clamp(40px, 9vh, 90px);
        left: 50%;
        transform: translateX(-50%);
        z-index: 4;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.6rem;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.6rem;
        letter-spacing: 0.3em;
        text-transform: uppercase;
        color: var(--muted);
    }
    .doc-scrollcue__line {
        width: 1px;
        height: 46px;
        background: linear-gradient(to bottom, var(--ember), transparent);
        animation: docPulse 2.2s ease-in-out infinite;
    }
    @keyframes docPulse { 0%,100% { opacity: 0.35; } 50% { opacity: 1; } }

    /* ============================================================
       COLD OPEN
       ============================================================ */
    .doc-coldopen {
        padding-block: clamp(6rem, 14vh, 12rem);
        max-width: 64rem;
        margin-inline: auto;
        text-align: center;
    }
    .doc-coldopen__lede {
        font-family: 'Newsreader', Georgia, serif;
        font-size: clamp(1.7rem, 4.2vw, 3.2rem);
        line-height: 1.28;
        color: var(--ink);
        margin: 2rem 0 1.8rem;
        letter-spacing: -0.01em;
    }
    .doc-coldopen__sub { font-size: 1.0625rem; max-width: 48ch; margin-inline: auto; }

    .doc-search { padding-inline: clamp(1.5rem, 6vw, 7rem); padding-bottom: 2rem; }

    /* ============================================================
       CHAPTERS
       ============================================================ */
    .doc-chapters { padding-block: clamp(4rem, 9vh, 8rem); border-top: 1px solid var(--line-soft); }
    .doc-chapter-list { list-style: none; margin: 0; padding: 0; }
    .doc-chapter-list li { border-top: 1px solid var(--line); }
    .doc-chapter-list li:last-child { border-bottom: 1px solid var(--line); }

    .doc-chapter {
        display: grid;
        grid-template-columns: auto 1fr auto;
        align-items: center;
        gap: clamp(1.25rem, 4vw, 3.5rem);
        padding: clamp(1.5rem, 3.5vw, 2.6rem) 0;
        text-decoration: none;
        transition: padding-left 0.4s cubic-bezier(0.22,1,0.36,1);
    }
    .doc-chapter:hover { padding-left: clamp(0.5rem, 2vw, 1.75rem); }
    .doc-chapter__num {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.875rem;
        color: var(--ember);
        letter-spacing: 0.1em;
    }
    .doc-chapter__title {
        display: block;
        font-family: 'Newsreader', Georgia, serif;
        font-size: clamp(1.5rem, 3.4vw, 2.6rem);
        color: var(--ink);
        line-height: 1.1;
        transition: color 0.3s ease;
    }
    .doc-chapter:hover .doc-chapter__title { color: var(--ember-soft); }
    .doc-chapter__desc { display: block; color: var(--dim); font-size: 0.95rem; margin-top: 0.5rem; max-width: 60ch; }
    .doc-chapter__go {
        color: var(--dim);
        transition: transform 0.35s ease, color 0.3s ease;
    }
    .doc-chapter__go svg { width: 1.5rem; height: 1.5rem; }
    .doc-chapter:hover .doc-chapter__go { color: var(--ember); transform: translateX(8px); }

    /* ============================================================
       SEVEN SEALS — Filmstrip
       ============================================================ */
    .doc-seals { padding-block: clamp(4rem, 9vh, 8rem); background: var(--bg-2); }
    .doc-seals__nav { display: flex; gap: 0.75rem; }
    .doc-round {
        width: 3rem; height: 3rem; border-radius: 999px;
        border: 1px solid var(--line);
        background: transparent; color: var(--ink);
        display: inline-flex; align-items: center; justify-content: center;
        cursor: pointer; transition: border-color 0.3s, color 0.3s, background 0.3s;
    }
    .doc-round svg { width: 1.1rem; height: 1.1rem; }
    .doc-round:hover { border-color: var(--ember); color: var(--ember); }

    .doc-filmstrip {
        display: flex;
        gap: clamp(1rem, 2.5vw, 2rem);
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        padding-bottom: 1.5rem;
        /* The strip bleeds to both screen edges, then re-creates the section
           gutter with its own padding so the first card lines up with the
           headings above it. Mandatory snapping measures from the padding-box
           edge, so without a matching scroll-padding it snaps the first card
           flush to the screen and swallows that left gutter on load. */
        margin-inline: calc(-1 * clamp(1.5rem, 6vw, 7rem));
        padding-inline: clamp(1.5rem, 6vw, 7rem);
        scroll-padding-inline: clamp(1.5rem, 6vw, 7rem);
    }
    .doc-still {
        flex: 0 0 auto;
        display: block;
        width: clamp(260px, 70vw, 400px);
        scroll-snap-align: start;
        text-decoration: none;
        color: inherit;
    }
    /* The strip scrolls, so a card reached by keyboard has to bring itself
       into view with room to spare rather than sitting half-clipped. */
    .doc-still:focus-visible {
        outline: 2px solid var(--ember);
        outline-offset: 6px;
    }
    .doc-still__frame {
        position: relative;
        aspect-ratio: 4 / 3;
        overflow: hidden;
        border: 1px solid var(--line);
        margin-bottom: 1.4rem;
    }
    .doc-still__img {
        width: 100%; height: 100%; object-fit: cover;
        filter: grayscale(0.55) contrast(1.06) brightness(0.85);
        transition: filter 0.6s ease, transform 0.9s ease;
    }
    .doc-still:hover .doc-still__img { filter: grayscale(0) contrast(1.05) brightness(1); transform: scale(1.04); }
    /* The timecode sits on the photo, over its own dark scrim, so its text
       stays light in both themes rather than following --ink. */
    .doc-still__tc {
        position: absolute;
        left: 0.85rem; bottom: 0.7rem;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.625rem; letter-spacing: 0.2em;
        color: #f1ebe0;
        background: rgba(11,11,13,0.78);
        padding: 0.3rem 0.55rem;
        backdrop-filter: blur(4px);
    }
    .doc-still__title {
        display: flex;
        align-items: baseline;
        gap: 0.6rem;
        font-size: clamp(1.4rem, 2.5vw, 1.9rem);
        margin-bottom: 0.7rem;
        transition: color 0.3s ease;
    }
    .doc-still:hover .doc-still__title { color: var(--ember); }
    /* Holds its place when hidden, so the title does not shift on hover. */
    .doc-still__go {
        flex: none;
        width: 1rem;
        height: 1rem;
        opacity: 0;
        transform: translateX(-4px);
        transition: opacity 0.3s ease, transform 0.3s ease;
    }
    .doc-still:hover .doc-still__go,
    .doc-still:focus-visible .doc-still__go { opacity: 1; transform: none; }
    .doc-still__body { font-size: 0.9rem; line-height: 1.6; color: var(--muted); }
    /* The strip scrolls sideways, so the way onward sits under it rather than
       at its end, where it would be hidden until the last card is reached. */
    .doc-seals__more { margin-top: clamp(1.5rem, 3vw, 2.5rem); }

    /* ============================================================
       SCREENING ROOM
       ============================================================ */
    .doc-screening { padding-block: clamp(4rem, 9vh, 8rem); }
    .doc-screening__grid {
        display: grid;
        grid-template-columns: 1.5fr 1fr;
        gap: clamp(2rem, 4vw, 4rem);
        align-items: start;
    }
    .doc-player {
        position: relative;
        display: block; width: 100%;
        aspect-ratio: 16 / 9;
        border: 1px solid var(--line);
        overflow: hidden;
        cursor: pointer;
        padding: 0; background: var(--bg-2);
    }
    .doc-player__img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.7) saturate(0.85); transition: transform 0.9s ease, filter 0.5s ease; }
    .doc-player:hover .doc-player__img { transform: scale(1.04); filter: brightness(0.55); }
    .doc-player__veil { position: absolute; inset: 0; background: linear-gradient(to top, rgba(11,11,13,0.85), transparent 60%); }
    .doc-play {
        position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
        width: 5rem; height: 5rem; border-radius: 999px;
        border: 1px solid rgba(255,255,255,0.4);
        background: rgba(255,255,255,0.08);
        backdrop-filter: blur(6px);
        display: flex; align-items: center; justify-content: center;
        color: #fff; transition: transform 0.4s ease, background 0.4s ease;
    }
    .doc-play svg { width: 2rem; height: 2rem; margin-left: 0.2rem; }
    .doc-player:hover .doc-play { transform: translate(-50%,-50%) scale(1.1); background: var(--ember); border-color: var(--ember); color: #160d07; }
    .doc-player__meta { position: absolute; left: 1.5rem; bottom: 1.4rem; text-align: left; display: flex; flex-direction: column; gap: 0.5rem; }
    .doc-player__name { font-family: 'Newsreader', serif; font-size: 1.6rem; color: #fff; }

    .doc-playlist { display: flex; flex-direction: column; gap: 1.5rem; }
    .doc-playlist__intro { font-family: 'Newsreader', serif; font-style: italic; font-size: 1.2rem; color: var(--ink); line-height: 1.5; }
    .doc-playlist ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; }
    .doc-playlist li { border-top: 1px solid var(--line); }
    .doc-track {
        display: flex; align-items: center; gap: 1rem; width: 100%;
        padding: 0.9rem 0; background: transparent; border: none; cursor: pointer; text-align: left;
        transition: padding-left 0.35s ease;
    }
    .doc-track:hover { padding-left: 0.6rem; }
    .doc-track__thumb { position: relative; flex: 0 0 auto; width: 6rem; height: 3.6rem; overflow: hidden; background: var(--bg-3); }
    .doc-track__thumb img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.75); transition: filter 0.4s; }
    .doc-track:hover .doc-track__thumb img { filter: brightness(1); }
    .doc-track__play { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s; color: #fff; }
    .doc-track__play svg { width: 1.2rem; height: 1.2rem; }
    .doc-track:hover .doc-track__play { opacity: 1; }
    .doc-track__text { display: flex; flex-direction: column; gap: 0.3rem; }
    .doc-track__name { font-family: 'Newsreader', serif; font-size: 1.1rem; color: var(--ink); transition: color 0.3s; }
    .doc-track:hover .doc-track__name { color: var(--ember-soft); }

    /* ============================================================
       END CARD
       ============================================================ */
    .doc-endcard {
        padding-block: clamp(6rem, 14vh, 11rem);
        text-align: center;
        display: flex; flex-direction: column; align-items: center; gap: 1.6rem;
    }
    .doc-endcard__title { font-size: clamp(2.6rem, 7vw, 5.5rem); margin: 0.5rem 0 0.5rem; }

    /* ============================================================
       MODAL
       ============================================================ */
    .doc-modal { position: fixed; inset: 0; z-index: 80; display: flex; align-items: center; justify-content: center; padding: 1.5rem; }
    .doc-modal__backdrop { position: absolute; inset: 0; background: rgba(5,5,7,0.94); backdrop-filter: blur(8px); border: none; cursor: pointer; }
    .doc-modal__inner { position: relative; z-index: 1; width: 100%; max-width: 64rem; }
    .doc-modal__close {
        position: absolute; top: -2.6rem; right: 0;
        background: none; border: none; cursor: pointer;
        font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase;
        color: var(--ink); transition: color 0.3s;
    }
    .doc-modal__close:hover { color: var(--ember); }
    .doc-modal__frame { aspect-ratio: 16 / 9; background: #000; overflow: hidden; border: 1px solid var(--line); }
    .doc-modal__frame iframe { width: 100%; height: 100%; border: 0; }
    .doc-modal__title { margin-top: 1rem; font-size: 1.2rem; color: var(--ink); }

    .no-scrollbar::-webkit-scrollbar { height: 4px; }
    .no-scrollbar::-webkit-scrollbar-thumb { background: var(--line); border-radius: 3px; }
    .no-scrollbar { scrollbar-width: thin; scrollbar-color: var(--line) transparent; }

    /* ============================================================
       RESPONSIVE
       ============================================================ */
    @media (max-width: 900px) {
        .doc-screening__grid { grid-template-columns: 1fr; }
    }
    @media (max-width: 640px) {
        .doc-chapter { grid-template-columns: auto 1fr; }
        .doc-chapter__go { display: none; }
    }
    @media (prefers-reduced-motion: reduce) {
        .doc-hero__img { animation: none; transform: none; }
        .doc-scrollcue__line { animation: none; }
        /* The arrow still appears on hover — it just stops sliding in. */
        .doc-still__go { transition: none; transform: none; }
        .doc-still__img { transition: none; }
        .doc-still:hover .doc-still__img { transform: none; }
    }
</style>
