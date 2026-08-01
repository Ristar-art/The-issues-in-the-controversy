<script>
    import SearchBar from '$lib/components/SearchBar.svelte';

    const { data } = $props();
    const landing = data.landing ?? {};

    const hero = '/homescreen (1).webp';

    // ----- Hero content -----
    const heroCta = { label: 'Begin the Story', href: '/topics' };
    const heroCtaSecondary = { label: 'Read the Brief', href: '#chapters' };

    // ----- Chapters (Key Topics) -----
    const chapters = [
        {
            title: 'The Overview of Daniel and Revelation',
            description: 'A panoramic view of the prophecies in the books of Daniel and Revelation.',
            href: 'the-overview-of-daniel-and-revelations'
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
    const progressTitle = 'The Seven Seals';
    const progressEyebrow = 'The state of the Church, the kingdom of Christ.';
    const progressDefaults = [
        { era: '1st Seal', title: 'The White Horse', body: 'The church in its infancy, while it was still pure, in the age of the apostles.', img:"/white horse.jpg", alt:"An image of the rider on a white horse" },
        { era: '2nd Seal', title: 'The Red Horse', body: 'The church in the age of compromise, while it was being widely adopted and also being corrupted.',img:"/red horse.jpg", alt:"An image of the rider on a red horse" },
        { era: '3rd Seal', title: 'The Black Horse', body: 'The age where the word of God was being sold by the church.',img:"/black horse.jpg", alt: "An image of the rider on a black horse" },
        { era: '4th Seal', title: 'The Pale Horse', body: 'An era where the church became the source of death.',img:"/pale horse.jpg", alt: "An image of the rider on a pale horse" },
        { era: '5th Seal', title: 'The Souls Under The Altar', body: 'The period of the pre-advent judgement. The saints of God are vindicated.',img:"/the fith seal.jpg", alt: "An image of the souls under the altar" },
        { era: '6th Seal', title: 'The Apocalyptic Events', body: 'The Spirit of God and His protection are withdrawn from earth.',img:"/Appocalips.jpg", alt: "An image of apocalyptic events" },
        { era: '7th Seal', title: 'The Seven Trumpets', body: 'The close of probation. There is no more grace given.',img:"/seven trampets.jpg", alt:"An image of seven angels with seven trumpets" }
    ];

    let timelineScroller;
    function scrollTimelineBy(dx) {
        if (timelineScroller) timelineScroller.scrollBy({ left: dx, behavior: 'smooth' });
    }

    // ----- Featured Videos (Screening Room) -----
    const videos = [
        { title: 'Introduction to The Series', embedUrl: 'https://www.youtube.com/embed/Xu8IJtZBdqc' },
        { title: 'Foundations', embedUrl: 'https://www.youtube.com/embed/8KA32Gaam7Y' },
        { title: "A Bird's Eye View", embedUrl: 'https://www.youtube.com/embed/WMXqrUp98RY' },
        { title: 'The Kingdom of God', embedUrl: 'https://www.youtube.com/embed/Sj43-YLaFQc' }
    ];
    const featureVideo = videos[0];
    const sideVideos = videos.slice(1, 4);
    let selectedVideo = $state(null);

    function getVideoId(url) {
        if (!url) return null;
        if (url.includes('/embed/')) return url.split('/embed/')[1]?.split('?')[0];
        if (url.includes('youtu.be/')) return url.split('youtu.be/')[1]?.split('?')[0];
        try {
            const parsed = new URL(url);
            return parsed.searchParams.get('v');
        } catch { return null; }
    }
    function getThumbnailUrl(id) { return `https://img.youtube.com/vi/${id}/hqdefault.jpg`; }
    function openModal(video) { selectedVideo = video; }
    function closeModal() { selectedVideo = null; }

    // ----- The Thesis (Issue / Solution / Our Part) -----
    const thesisItems = [
        { num: 'I', title: 'The Issue', description: 'What are the key areas of satan’s assault and why it worked.', cta: { href: 'the-issue', label: 'Read More' } },
        { num: 'II', title: "God's Solution", description: "What is God's answer to the challenges laid against Him by satan?", cta: { href: 'gods-solution', label: 'Read More' } },
        { num: 'III', title: 'Our Part', description: 'Understanding our role in the greater plan and how we can contribute positively.', cta: { href: 'our-part', label: 'Read More' } }
    ];

    // ----- Symbols (Decoding the Code) -----
    const symbolsItems = [
        { title: 'A Beast', description: 'Kingdom / Political Power' },
        { title: 'A Woman', description: 'A Religious Body' },
        { title: 'Earth and Water', description: 'Geography' }
    ];

    // ----- The Truth -----
    const truthPoints = [
        'Who and what is God the Father?',
        'What is the identity of Jesus Christ, the Word of God?',
        'Is the Holy Spirit a self-existent being like the Father and Jesus Christ?'
    ];

    // ----- Government -----
    const governmentItems = [
        { title: 'The Legal Law', description: 'The governance that works from outside to compel behaviour.' },
        { title: 'The Nature Law', description: 'The governance that works from within to influence behaviour.' },
        { title: 'The Politics of the Universe', description: 'The role of politics in how the masses choose the form of government they want to be under.' }
    ];

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
    const siteUrl = 'https://the-issues-in-the-controversy.vercel.app';
    const pageUrl = `${siteUrl}/`;
    const imageUrl = `${siteUrl}/_.jpeg`;
</script>

<svelte:head>
    <title>The Endgame of Heaven — A Prophecy Documentary | Daniel & Revelation</title>
    <meta name="title" content="The Endgame of Heaven — A Prophecy Documentary | Daniel & Revelation" />
    <meta name="description" content="A documentary journey through the prophecies of Daniel and Revelation — the seven seals, the character of God, and the great controversy unfolding to its end." />
    <meta name="keywords" content="biblical prophecy, book of daniel, book of revelation, seven seals, character of god, prophetic symbols, kingdom of god, spiritual warfare" />
    <meta name="author" content="The Issues in the Controversy" />
    <meta name="robots" content="index, follow" />
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="canonical" href={pageUrl} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={pageUrl} />
    <meta property="og:title" content="The Endgame of Heaven — A Prophecy Documentary" />
    <meta property="og:description" content="A documentary journey through the prophecies of Daniel and Revelation." />
    <meta property="og:image" content={imageUrl} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:site_name" content="The Issues in the Controversy" />
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:title" content="The Endgame of Heaven — A Prophecy Documentary" />
    <meta property="twitter:description" content="A documentary journey through the prophecies of Daniel and Revelation." />
    <meta property="twitter:image" content={imageUrl} />
    <link rel="icon" type="image/x-icon" href="/logoimage.jpg" />
</svelte:head>

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
        <section id="chapters" class="doc-chapters" use:reveal>
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
        </section>

        <!-- ======================================================== -->
        <!-- THE SEVEN SEALS — Filmstrip                                -->
        <!-- ======================================================== -->
        <section class="doc-seals" use:reveal>
            <header class="doc-section-head doc-section-head--split">
                <div>
                    <p class="doc-act">Act II · The Seven Seals</p>
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
                    <article class="doc-still">
                        <div class="doc-still__frame">
                            <img src={e.img} alt={e.alt} class="doc-still__img" loading="lazy" />
                            <span class="doc-still__tc">SEAL {String(i + 1).padStart(2, '0')} / 07</span>
                        </div>
                        <h3 class="doc-still__title">{e.title}</h3>
                        <p class="doc-still__body">{e.body}</p>
                    </article>
                {/each}
            </div>
        </section>

        <!-- ======================================================== -->
        <!-- SCREENING ROOM — Featured Videos                           -->
        <!-- ======================================================== -->
        <section class="doc-screening" use:reveal>
            <header class="doc-section-head">
                <p class="doc-act">Act III · The Screening Room</p>
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
                            <span class="doc-tc">Series 01 · EP 01</span>
                            <span class="doc-player__name">{featureVideo.title}</span>
                        </span>
                    </button>
                {/if}

                <div class="doc-playlist">
                    <p class="doc-playlist__intro">An immersive walkthrough of the Endgame of Heaven — the series, episode by episode.</p>
                    <ul>
                        {#each sideVideos as video, i}
                            {@const vId = getVideoId(video.embedUrl)}
                            <li>
                                <button type="button" class="doc-track" onclick={() => openModal(video)}>
                                    <span class="doc-track__thumb">
                                        {#if vId}<img src={getThumbnailUrl(vId)} alt="" loading="lazy" />{/if}
                                        <span class="doc-track__play" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span>
                                    </span>
                                    <span class="doc-track__text">
                                        <span class="doc-tc">EP {String(i + 2).padStart(2, '0')}</span>
                                        <span class="doc-track__name">{video.title}</span>
                                    </span>
                                </button>
                            </li>
                        {/each}
                    </ul>
                    <a href="/topics" class="doc-btn doc-btn--ghost">View All Episodes</a>
                </div>
            </div>
        </section>

        <!-- ======================================================== -->
        <!-- THE THESIS — Issue / Solution / Our Part                   -->
        <!-- ======================================================== -->
        <section class="doc-thesis" use:reveal>
            <header class="doc-section-head">
                <p class="doc-act">Act IV · The Thesis</p>
                <h2 class="doc-section-title">The Issue, The Answer, Our Part</h2>
            </header>
            <div class="doc-thesis__grid">
                {#each thesisItems as item}
                    <article class="doc-panel">
                        <span class="doc-panel__num">{item.num}</span>
                        <h3 class="doc-panel__title">{item.title}</h3>
                        <p class="doc-panel__desc">{item.description}</p>
                        <a href={`/${item.cta.href}`} class="doc-textlink">{item.cta.label}</a>
                    </article>
                {/each}
            </div>
        </section>

        <!-- ======================================================== -->
        <!-- DECODING THE SYMBOLS                                       -->
        <!-- ======================================================== -->
        <section class="doc-symbols" use:reveal>
            <header class="doc-section-head">
                <p class="doc-act">Reference · The Lexicon</p>
                <h2 class="doc-section-title">Decoding the Symbols</h2>
                <p class="doc-section-sub">Unlocking the prophetic vocabulary through textual evidence.</p>
            </header>
            <dl class="doc-glossary">
                {#each symbolsItems as item}
                    <div class="doc-glossary__row">
                        <dt>{item.title}</dt>
                        <dd>{item.description}</dd>
                    </div>
                {/each}
            </dl>
            <a href="prhophetic-symbols-and-their-meaning" class="doc-textlink doc-textlink--center">View the Full Lexicon</a>
        </section>

        <!-- ======================================================== -->
        <!-- THE TRUTH — Interrogation                                  -->
        <!-- ======================================================== -->
        <section class="doc-truth" use:reveal>
            <p class="doc-act doc-act--center">The Central Question</p>
            <h2 class="doc-truth__title">What is the truth<br />about <span class="doc-em">God?</span></h2>
            <p class="doc-truth__sub">Is God a trinity?</p>
            <ol class="doc-truth__list">
                {#each truthPoints as point, i}
                    <li>
                        <span class="doc-tc">Q{String(i + 1).padStart(2, '0')}</span>
                        <span>{point}</span>
                    </li>
                {/each}
            </ol>
            <a href="the-truth-about-god" class="doc-btn doc-btn--solid">Read the Investigation</a>
        </section>

        <!-- ======================================================== -->
        <!-- GOVERNING THE SOUL — Government                            -->
        <!-- ======================================================== -->
        <section class="doc-gov" use:reveal>
            <header class="doc-section-head">
                <p class="doc-act">Act V · The Governments</p>
                <h2 class="doc-section-title">The Framewoks of Governance</h2>
            </header>
            <div class="doc-gov__grid">
                {#each governmentItems as item, i}
                    <article class="doc-gov__card">
                        <span class="doc-tc">{String(i + 1).padStart(2, '0')}</span>
                        <h3 class="doc-gov__title">{item.title}</h3>
                        <p class="doc-gov__desc">{item.description}</p>
                    </article>
                {/each}
            </div>
        </section>

        <!-- ======================================================== -->
        <!-- END CARD                                                   -->
        <!-- ======================================================== -->
        <section class="doc-endcard" use:reveal>
            <p class="doc-kicker">The story continues</p>
            <h2 class="doc-endcard__title">Watch it all unfold.</h2>
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
    .doc-act--center { justify-content: center; }

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

    .doc-textlink {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.6875rem;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: var(--ember-soft);
        text-decoration: none;
        border-bottom: 1px solid var(--line);
        padding-bottom: 0.35rem;
        transition: border-color 0.3s ease, color 0.3s ease;
        align-self: flex-start;
    }
    .doc-textlink:hover { border-color: var(--ember); color: var(--ember); }
    .doc-textlink--center { display: block; width: max-content; margin: 3rem auto 0; }

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
    .doc-coldopen, .doc-chapters, .doc-seals, .doc-screening,
    .doc-thesis, .doc-symbols, .doc-truth, .doc-gov, .doc-endcard {
        opacity: 0;
        transform: translateY(28px);
        transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1), transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
    }
    .doc-coldopen:global(.is-in), .doc-chapters:global(.is-in), .doc-seals:global(.is-in),
    .doc-screening:global(.is-in), .doc-thesis:global(.is-in), .doc-symbols:global(.is-in),
    .doc-truth:global(.is-in), .doc-gov:global(.is-in), .doc-endcard:global(.is-in) {
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
        filter: saturate(0.7) contrast(1.08) brightness(0.78);
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
            linear-gradient(to top, var(--bg) 2%, rgba(11,11,13,0.35) 45%, rgba(11,11,13,0.55) 100%),
            radial-gradient(120% 100% at 15% 70%, rgba(11,11,13,0.7), transparent 60%);
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
        background: linear-gradient(to bottom, rgba(11,11,13,0.85), rgba(11,11,13,0));
    }
    .doc-letterbox--bottom {
        bottom: 0;
        background: linear-gradient(to top, rgba(11,11,13,0.85), rgba(11,11,13,0));
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
        margin-inline: calc(-1 * clamp(1.5rem, 6vw, 7rem));
        padding-inline: clamp(1.5rem, 6vw, 7rem);
    }
    .doc-still {
        flex: 0 0 auto;
        width: clamp(260px, 70vw, 400px);
        scroll-snap-align: start;
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
    .doc-still__tc {
        position: absolute;
        left: 0.85rem; bottom: 0.7rem;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.625rem; letter-spacing: 0.2em;
        color: var(--ink);
        background: rgba(11,11,13,0.7);
        padding: 0.3rem 0.55rem;
        backdrop-filter: blur(4px);
    }
    .doc-still__title { font-size: clamp(1.4rem, 2.5vw, 1.9rem); margin-bottom: 0.7rem; }
    .doc-still__body { font-size: 0.9rem; line-height: 1.6; color: var(--muted); }

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
       THESIS
       ============================================================ */
    .doc-thesis { padding-block: clamp(4rem, 9vh, 8rem); background: var(--bg-2); }
    .doc-thesis__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--line); border: 1px solid var(--line); }
    .doc-panel {
        background: var(--bg);
        padding: clamp(2rem, 3.5vw, 3.5rem);
        display: flex; flex-direction: column; gap: 1.1rem;
        min-height: 22rem;
        transition: background 0.4s ease;
    }
    .doc-panel:hover { background: var(--bg-3); }
    .doc-panel__num {
        font-family: 'Newsreader', serif; font-style: italic;
        font-size: 3rem; color: var(--ember); line-height: 1;
    }
    .doc-panel__title { font-size: clamp(1.6rem, 2.6vw, 2.2rem); }
    .doc-panel__desc { flex: 1; line-height: 1.65; }

    /* ============================================================
       SYMBOLS / GLOSSARY
       ============================================================ */
    .doc-symbols { padding-block: clamp(4rem, 9vh, 8rem); max-width: 60rem; margin-inline: auto; }
    .doc-glossary { margin: 0; }
    .doc-glossary__row {
        display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;
        align-items: baseline;
        padding: clamp(1.4rem, 3vw, 2.2rem) 0;
        border-top: 1px solid var(--line);
    }
    .doc-glossary__row:last-child { border-bottom: 1px solid var(--line); }
    .doc-glossary dt { font-family: 'Newsreader', serif; font-size: clamp(1.5rem, 3vw, 2.3rem); color: var(--ink); }
    .doc-glossary dd {
        margin: 0;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.8rem; letter-spacing: 0.12em; text-transform: uppercase;
        color: var(--ember-soft);
    }

    /* ============================================================
       THE TRUTH
       ============================================================ */
    .doc-truth {
        padding-block: clamp(6rem, 14vh, 12rem);
        text-align: center;
        background:
            radial-gradient(80% 60% at 50% 0%, rgba(217,122,67,0.10), transparent 70%),
            var(--bg);
        border-top: 1px solid var(--line-soft);
        border-bottom: 1px solid var(--line-soft);
        display: flex; flex-direction: column; align-items: center;
    }
    .doc-truth__title { font-size: clamp(2.8rem, 8vw, 6.5rem); margin: 1.5rem 0; }
    .doc-truth__sub { font-family: 'Newsreader', serif; font-style: italic; font-size: 1.3rem; color: var(--muted); margin-bottom: 3rem; }
    .doc-truth__list { list-style: none; margin: 0 0 3.5rem; padding: 0; text-align: left; max-width: 38rem; display: flex; flex-direction: column; gap: 1.2rem; }
    .doc-truth__list li { display: grid; grid-template-columns: auto 1fr; gap: 1.2rem; align-items: start; color: var(--ink); line-height: 1.5; }
    .doc-truth__list .doc-tc { color: var(--ember); padding-top: 0.2rem; }

    /* ============================================================
       GOVERNMENT
       ============================================================ */
    .doc-gov { padding-block: clamp(4rem, 9vh, 8rem); background: var(--bg-2); }
    .doc-gov__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: clamp(1rem, 2.5vw, 2rem); }
    .doc-gov__card {
        border: 1px solid var(--line);
        padding: clamp(1.8rem, 3vw, 2.8rem);
        display: flex; flex-direction: column; gap: 1rem;
        transition: border-color 0.4s ease, transform 0.4s ease;
    }
    .doc-gov__card:hover { border-color: var(--ember); transform: translateY(-4px); }
    .doc-gov__card .doc-tc { color: var(--ember); }
    .doc-gov__title { font-size: clamp(1.4rem, 2.4vw, 2rem); }
    .doc-gov__desc { font-size: 0.92rem; line-height: 1.6; }

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
        .doc-thesis__grid { grid-template-columns: 1fr; }
        .doc-gov__grid { grid-template-columns: 1fr; }
    }
    @media (max-width: 640px) {
        .doc-chapter { grid-template-columns: auto 1fr; }
        .doc-chapter__go { display: none; }
        .doc-glossary__row { grid-template-columns: 1fr; gap: 0.5rem; }
    }
    @media (prefers-reduced-motion: reduce) {
        .doc-hero__img { animation: none; transform: none; }
        .doc-scrollcue__line { animation: none; }
    }
</style>
