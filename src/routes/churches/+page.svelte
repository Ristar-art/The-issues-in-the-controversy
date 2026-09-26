<script>
    import {
        CHURCHES,
        CHURCHES_TITLE,
        CHURCHES_SUBTITLE,
        WHY_CONDITIONS,
        LITERAL_CITIES,
        USUAL_ERAS,
        CONDITION_CLASSES,
        WURMBRAND,
        WHERE_IT_ENDS
    } from '$lib/data/churches.js';
    import ChurchesOverview from '$lib/components/ChurchesOverview.svelte';

    // The same reveal treatment the seals page uses, so a reader moving between
    // the two studies meets the same rhythm.
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

    const total = String(CHURCHES.length).padStart(2, '0');
</script>

<svelte:head>
    <title>The Seven Churches — The Issues in the Controversy</title>
    <meta
        name="description"
        content="The seven churches of Revelation 2 and 3 read as seven conditions of one church — each with a starting point and no ending point, so that all seven stand together at the end: Christianity under oppressive rival religions, under a persecuting state, under the Orthodox Church, under Rome, under Protestantism, under the little book, and under the little book in apostasy."
    />
    <meta name="keywords" content="seven churches, revelation 2, revelation 3, ephesus, smyrna, pergamos, thyatira, sardis, philadelphia, laodicea, seven conditions of the church, orthodox church, little book movement, seven candlesticks" />
</svelte:head>

<div class="doc-ch">
    <main>
        <!-- ============================= HEADER ============================= -->
        <section class="doc-ch__head">
            <p class="doc-ch__eyebrow">Act I · Revelation 2 – 3</p>
            <h1 class="doc-ch__title">The Seven<br /><span class="doc-ch__em">Churches</span></h1>
            <p class="doc-ch__lede">
                {CHURCHES_SUBTITLE} The letters are not seven pieces of local correspondence that
                happen to have survived, and they are not seven eras that each closed when the next
                one opened. Every one of these conditions begins somewhere. Not one of them is ever
                given an end. So all seven are in the world tonight, and all seven will be standing
                on the day of the Lord - which is the only reason it makes sense to send this book
                to them.
            </p>
        </section>

        <!-- ========================= THE LITERAL SEVEN ========================= -->
        <!-- Settled first, and then left behind: the congregations were real, and
             they are not what the letters are mainly about. -->
        <section class="doc-ch__cities" use:reveal>
            <div>
                <p class="doc-ch__eyebrow">They were real places</p>
                <p class="doc-ch__region">{LITERAL_CITIES.region}</p>
                <p class="doc-ch__body">{LITERAL_CITIES.note}</p>
            </div>
            <ol class="doc-ch__road">
                {#each LITERAL_CITIES.order as city, i}
                    <li><span aria-hidden="true">{i + 1}</span>{city}</li>
                {/each}
            </ol>
        </section>

        <!-- ============================== CHART ============================== -->
        <section class="doc-ch__chart">
            <ChurchesOverview />
        </section>

        <!-- ============================ THE CLAIM ============================ -->
        <!-- The reason for reading them as conditions rather than as addresses,
             kept to things the book does rather than things read into it. -->
        <section class="doc-ch__why" use:reveal>
            <div class="doc-ch__why-head">
                <p class="doc-ch__eyebrow">Why conditions, not addresses</p>
                <h2 class="doc-ch__why-title">
                    Seven cities are named.<br />Seven states are meant.
                </h2>
            </div>

            <ol class="doc-ch__claims">
                {#each WHY_CONDITIONS as item, i}
                    <li class="doc-ch__claim">
                        <span class="doc-ch__claim-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                        <div>
                            <h3 class="doc-ch__claim-title">{item.claim}</h3>
                            <p class="doc-ch__ref">{item.refs}</p>
                            <p class="doc-ch__body">{item.note}</p>
                        </div>
                    </li>
                {/each}
            </ol>
        </section>

        <!-- ========================= THE TWO CHARTS ========================= -->
        <!-- The difference this page turns on, set down side by side rather than
             argued: the same seven names, closed off on one side and left open
             on the other. -->
        <section class="doc-ch__views" use:reveal>
            <div class="doc-ch__views-head">
                <p class="doc-ch__eyebrow">The difference</p>
                <h2 class="doc-ch__why-title">
                    Same seven names.<br />One of the charts never closes.
                </h2>
                <p class="doc-ch__body">
                    The usual reading gives each church a span and shuts it when the next one
                    starts. The organised church did pass through those phases - the apostolic
                    structure with its twelve is long gone. But Revelation deals in spiritual
                    entities, not in organisational charts, and the condition does not die with the
                    structure. Take the closing dates away and every one of the seven runs to the
                    end.
                </p>
            </div>

            <div class="doc-ch__views-pair">
                <div class="doc-ch__view doc-ch__view--usual">
                    <h3 class="doc-ch__view-title">The usual chart</h3>
                    <p class="doc-ch__view-sub">Seven eras, each one closed</p>
                    <ul class="doc-ch__view-list">
                        {#each USUAL_ERAS as era}
                            <li>
                                <span class="doc-ch__view-name">{era.name}</span>
                                <span class="doc-ch__view-span">{era.span}</span>
                            </li>
                        {/each}
                    </ul>
                    <p class="doc-ch__view-foot">
                        On this chart Ephesus is not there to receive the book it was sent.
                    </p>
                </div>

                <div class="doc-ch__view doc-ch__view--open">
                    <h3 class="doc-ch__view-title">This reading</h3>
                    <p class="doc-ch__view-sub">Seven conditions, none closed</p>
                    <ul class="doc-ch__view-list">
                        {#each CHURCHES as church}
                            <li data-church={church.id}>
                                <span class="doc-ch__view-name">{church.name}</span>
                                <span class="doc-ch__view-span">
                                    {church.began}
                                    <span class="doc-ch__view-arrow" aria-label="continues to the end">→ the end</span>
                                </span>
                            </li>
                        {/each}
                    </ul>
                    <p class="doc-ch__view-foot">
                        All seven present together, which is what makes the book worth sending.
                    </p>
                </div>
            </div>
        </section>

        <!-- ============================ THE SEVEN ============================ -->
        {#each CHURCHES as church, i}
            <section class="doc-ch__letter" id={church.id} use:reveal>
                <div class="doc-ch__letter-side">
                    <span class="doc-ch__tc">LETTER {String(i + 1).padStart(2, '0')} / {total}</span>
                    <h2 class="doc-ch__letter-title" data-church={church.id}>{church.name}</h2>
                    <p class="doc-ch__meaning">{church.meaning}</p>

                    <p class="doc-ch__era">
                        Began {church.began}
                        <span class="doc-ch__era-open" data-church={church.id}>· and has not ended</span>
                    </p>
                    <p class="doc-ch__began-note">{church.beganNote}</p>
                    <p class="doc-ch__ref">{church.reference}</p>

                    <p class="doc-ch__env-line">
                        Christianity under
                        <span class="doc-ch__env" data-church={church.id}>{church.under}</span>
                    </p>
                    <p class="doc-ch__size">{church.size}</p>
                </div>

                <div class="doc-ch__letter-main">
                    <blockquote class="doc-ch__state" data-church={church.id}>
                        <span class="doc-ch__state-k">The state it is found in</span>
                        <p class="doc-ch__state-v">“{church.condition}”</p>
                    </blockquote>

                    <p class="doc-ch__body">{church.body}</p>

                    {#if church.second}
                        <!-- Several of the letters address two parties at once: God's
                             people, and something standing among them that is not. -->
                        <p class="doc-ch__second" data-church={church.id}>
                            <span class="doc-ch__second-k">The other party addressed</span>
                            {church.second}
                        </p>
                    {/if}

                    {#if church.today}
                        <p class="doc-ch__today">
                            <span class="doc-ch__today-k">Where it is found now</span>
                            {church.today}
                        </p>
                    {/if}

                    <dl class="doc-ch__lines">
                        <div>
                            <dt>The verdict</dt>
                            <dd>{church.verdict}</dd>
                        </div>
                        <div>
                            <dt>The counsel</dt>
                            <dd>{church.counsel}</dd>
                        </div>
                        <div>
                            <dt>To him that overcometh</dt>
                            <dd>{church.promise}</dd>
                        </div>
                    </dl>
                </div>

                <span class="doc-ch__ghost" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            </section>
        {/each}

        <!-- ========================= HOW THEY GROUP ========================= -->
        <section class="doc-ch__classes" use:reveal>
            <div>
                <p class="doc-ch__eyebrow">Five you can name, two you cannot</p>
                <h2 class="doc-ch__why-title">
                    The first two are not<br />denominations at all.
                </h2>
            </div>

            <div class="doc-ch__classes-body">
                {#each CONDITION_CLASSES as group}
                    <div class="doc-ch__class">
                        <h3 class="doc-ch__class-title">{group.label}</h3>
                        <p class="doc-ch__meaning">{group.members}</p>
                        <p class="doc-ch__body">{group.note}</p>
                    </div>
                {/each}

                <figure class="doc-ch__quote">
                    <blockquote>“{WURMBRAND.quote}”</blockquote>
                    <figcaption>
                        <p class="doc-ch__quote-src">{WURMBRAND.source}</p>
                        <p class="doc-ch__body">{WURMBRAND.note}</p>
                    </figcaption>
                </figure>
            </div>
        </section>

        <!-- =========================== WHERE IT ENDS =========================== -->
        <section class="doc-ch__ends" use:reveal>
            <p class="doc-ch__eyebrow">Where the seven stop being seven</p>
            <h2 class="doc-ch__close-title">{WHERE_IT_ENDS.title}</h2>
            <p class="doc-ch__lede">{WHERE_IT_ENDS.note}</p>
            <p class="doc-ch__turning">{WHERE_IT_ENDS.turning}</p>
            <div class="doc-ch__actions">
                <a href="/the-144000" class="doc-ch__btn">
                    The 144,000
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m0 0l-6-6m6 6l-6 6" />
                    </svg>
                </a>
                <a href="/beast" class="doc-ch__btn doc-ch__btn--quiet">The mark of the beast</a>
            </div>
        </section>

        <!-- ============================= CLOSING ============================= -->
        <section class="doc-ch__close" use:reveal>
            <p class="doc-ch__eyebrow">Where this leads</p>
            <h2 class="doc-ch__close-title">The same church, opened a second time.</h2>
            <p class="doc-ch__lede">
                {CHURCHES_TITLE} give the states of the church from the inside - what it is, what it
                has lost, what it is told to do. The seven seals give the same history from the
                throne, as the judgement of that kingdom. Two readings of one body, and they run
                over the same ground.
            </p>
            <div class="doc-ch__actions">
                <a href="/seals" class="doc-ch__btn">
                    The seven seals
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m0 0l-6-6m6 6l-6 6" />
                    </svg>
                </a>
                <a href="/overview/revelation" class="doc-ch__btn doc-ch__btn--quiet">The book in outline</a>
                <a href="/topics" class="doc-ch__btn doc-ch__btn--quiet">Read the studies</a>
            </div>
        </section>
    </main>
</div>

<style>
    .doc-ch {
        --nav-h: 5.2rem;
        min-height: 100vh;
        background: var(--doc-bg);
        color: var(--doc-ink);
        padding-top: var(--nav-h);
        font-family: 'Public Sans', sans-serif;
        transition: background 0.4s ease, color 0.4s ease;
    }
    .doc-ch :where(h1, h2, h3) {
        font-family: 'Newsreader', Georgia, serif;
        font-weight: 400;
        color: var(--doc-ink);
        letter-spacing: -0.018em;
        line-height: 1.05;
        margin: 0;
    }

    /* The letters carry the same colour their row does in the chart. The
       --ch-* tokens live in app.css and have a light-mode value each. */
    [data-church='ephesus'] { --row-tone: var(--ch-ephesus); }
    [data-church='smyrna'] { --row-tone: var(--ch-smyrna); }
    [data-church='pergamos'] { --row-tone: var(--ch-pergamos); }
    [data-church='thyatira'] { --row-tone: var(--ch-thyatira); }
    [data-church='sardis'] { --row-tone: var(--ch-sardis); }
    [data-church='philadelphia'] { --row-tone: var(--ch-philadelphia); }
    [data-church='laodicea'] { --row-tone: var(--ch-laodicea); }

    /* ------------------------------ Header ------------------------------ */
    /* No photograph: there is no image of a condition, and a stock church
       exterior would argue the opposite of what the page argues. */
    .doc-ch__head {
        padding: clamp(3rem, 8vw, 6rem) clamp(1.5rem, 6vw, 7rem) clamp(2.5rem, 5vw, 3.5rem);
        border-bottom: 1px solid var(--doc-line);
    }
    .doc-ch__eyebrow {
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
    .doc-ch__eyebrow::before {
        content: '';
        width: 28px;
        height: 1px;
        background: var(--doc-ember);
        opacity: 0.7;
    }
    .doc-ch__title {
        font-size: clamp(3rem, 10vw, 7rem);
        line-height: 0.95;
        margin-bottom: 1.75rem !important;
    }
    .doc-ch__em { font-style: italic; font-weight: 300; color: var(--doc-ember-soft); }
    .doc-ch__lede {
        font-size: clamp(1rem, 1.6vw, 1.2rem);
        color: var(--doc-muted);
        max-width: 44rem;
        line-height: 1.7;
        margin: 0;
    }

    /* ---------------------------- Literal seven ---------------------------- */
    .doc-ch__cities {
        display: grid;
        gap: clamp(1.5rem, 4vw, 3rem);
        padding: clamp(2rem, 5vw, 3.25rem) clamp(1.5rem, 6vw, 7rem);
        border-bottom: 1px solid var(--doc-line);
        opacity: 0;
        transform: translateY(24px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    .doc-ch__cities:global(.is-in) { opacity: 1; transform: none; }
    @media (min-width: 900px) {
        .doc-ch__cities { grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr); align-items: start; }
    }
    .doc-ch__region {
        font-family: 'Newsreader', Georgia, serif;
        font-size: clamp(1.15rem, 2vw, 1.45rem);
        line-height: 1.25;
        color: var(--doc-ink);
        margin: 0 0 0.75rem;
    }
    /* The road, drawn as the list it is: one behind the other, in the order the
       letters are dictated in. */
    .doc-ch__road {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: 0.5rem;
    }
    .doc-ch__road li {
        display: grid;
        grid-template-columns: 1.6rem minmax(0, 1fr);
        align-items: baseline;
        gap: 0.75rem;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.6875rem;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: var(--doc-muted);
        padding-bottom: 0.5rem;
        border-bottom: 1px solid var(--doc-line-soft);
    }
    .doc-ch__road li span { color: var(--doc-ember); }

    .doc-ch__chart {
        padding: clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 6vw, 7rem);
        background: var(--doc-bg-2);
        border-bottom: 1px solid var(--doc-line);
    }

    /* ------------------------------- The claim ------------------------------- */
    .doc-ch__why {
        display: grid;
        gap: clamp(2rem, 4vw, 3.5rem);
        padding: clamp(3rem, 7vw, 5rem) clamp(1.5rem, 6vw, 7rem);
        border-bottom: 1px solid var(--doc-line);
        opacity: 0;
        transform: translateY(24px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    .doc-ch__why:global(.is-in) { opacity: 1; transform: none; }
    @media (min-width: 960px) {
        .doc-ch__why { grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr); }
    }
    .doc-ch__why-title {
        font-size: clamp(1.7rem, 3.4vw, 2.6rem);
        line-height: 1.1;
    }

    .doc-ch__claims {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: clamp(1.5rem, 3vw, 2.25rem);
    }
    .doc-ch__claim {
        display: grid;
        grid-template-columns: auto minmax(0, 1fr);
        gap: clamp(0.9rem, 2vw, 1.5rem);
    }
    .doc-ch__claim-n {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.6875rem;
        letter-spacing: 0.2em;
        color: var(--doc-ember);
        padding-top: 0.35rem;
    }
    .doc-ch__claim-title {
        font-size: clamp(1.15rem, 2vw, 1.45rem);
        line-height: 1.2;
        margin-bottom: 0.55rem !important;
    }

    /* ------------------------------ Two charts ------------------------------ */
    .doc-ch__views {
        display: grid;
        gap: clamp(2rem, 4vw, 3.5rem);
        padding: clamp(3rem, 7vw, 5rem) clamp(1.5rem, 6vw, 7rem);
        background: var(--doc-bg-2);
        border-bottom: 1px solid var(--doc-line);
        opacity: 0;
        transform: translateY(24px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    .doc-ch__views:global(.is-in) { opacity: 1; transform: none; }
    @media (min-width: 1040px) {
        .doc-ch__views { grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr); align-items: start; }
    }
    .doc-ch__views-head > .doc-ch__body { margin-top: 1.25rem; max-width: 34rem; }
    .doc-ch__views-pair { display: grid; gap: clamp(1.25rem, 3vw, 2rem); }
    @media (min-width: 620px) {
        .doc-ch__views-pair { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }
    .doc-ch__view {
        padding: clamp(1.25rem, 3vw, 1.75rem);
        border: 1px solid var(--doc-line);
        border-radius: 2px;
        background: var(--doc-bg);
    }
    /* The closed chart is set back; the open one is the page's own. */
    .doc-ch__view--usual { opacity: 0.72; }
    .doc-ch__view--open { border-color: var(--doc-ember); }
    .doc-ch__view-title { font-size: clamp(1.1rem, 1.8vw, 1.3rem); margin-bottom: 0.35rem !important; }
    .doc-ch__view-sub {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.5rem;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        color: var(--doc-dim);
        margin: 0 0 1.25rem;
    }
    .doc-ch__view-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.55rem; }
    .doc-ch__view-list li {
        display: grid;
        gap: 0.2rem;
        padding-bottom: 0.55rem;
        border-bottom: 1px solid var(--doc-line-soft);
    }
    .doc-ch__view-name {
        font-family: 'Newsreader', Georgia, serif;
        font-size: 1.02rem;
        color: var(--doc-ink);
    }
    .doc-ch__view-span {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.14em;
        color: var(--doc-muted);
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }
    .doc-ch__view-arrow {
        text-transform: uppercase;
        font-size: 0.5rem;
        letter-spacing: 0.18em;
        color: var(--row-tone, var(--doc-ember));
        align-self: center;
    }
    .doc-ch__view-foot {
        margin: 1.25rem 0 0;
        font-size: 0.85rem;
        line-height: 1.6;
        color: var(--doc-dim);
    }

    /* -------------------------------- Letters -------------------------------- */
    .doc-ch__letter {
        position: relative;
        display: grid;
        grid-template-columns: 1fr;
        gap: clamp(1.5rem, 4vw, 3.5rem);
        padding: clamp(2.75rem, 6vw, 4.5rem) clamp(1.5rem, 6vw, 7rem);
        border-bottom: 1px solid var(--doc-line);
        /* Clears the fixed nav when a chart row jumps here. */
        scroll-margin-top: calc(var(--nav-h) + 1rem);
        opacity: 0;
        transform: translateY(24px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    .doc-ch__letter:global(.is-in) { opacity: 1; transform: none; }
    @media (min-width: 900px) {
        .doc-ch__letter { grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr); }
    }

    .doc-ch__letter-side { position: relative; z-index: 1; }
    .doc-ch__tc {
        display: inline-block;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.5625rem;
        letter-spacing: 0.24em;
        color: var(--doc-dim);
        margin-bottom: 1rem;
    }
    .doc-ch__letter-title {
        font-size: clamp(2.2rem, 5vw, 3.6rem);
        line-height: 1;
        /* The tone is carried by a rule under the name rather than by the name
           itself, so the pale tones stay readable in both themes. */
        border-bottom: 3px solid var(--row-tone, var(--doc-line));
        padding-bottom: 0.5rem;
        display: inline-block;
        margin-bottom: 0.9rem !important;
    }
    .doc-ch__meaning {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.5625rem;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: var(--doc-dim);
        margin: 0 0 0.9rem;
    }
    .doc-ch__era {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: var(--doc-ember);
        margin: 0 0 0.4rem;
    }
    /* Said once per letter, because it is the whole reading in four words. */
    .doc-ch__era-open { color: var(--row-tone, var(--doc-ember-soft)); }
    .doc-ch__began-note {
        font-size: 0.9rem;
        line-height: 1.6;
        color: var(--doc-dim);
        margin: 0 0 0.9rem;
    }
    .doc-ch__ref {
        font-family: 'Newsreader', Georgia, serif;
        font-style: italic;
        font-size: 0.98rem;
        color: var(--doc-ember-soft);
        margin: 0 0 1.25rem;
    }
    .doc-ch__env-line {
        font-size: clamp(0.95rem, 1.4vw, 1.08rem);
        line-height: 1.5;
        color: var(--doc-muted);
        margin: 0;
        padding-top: 1.1rem;
        border-top: 1px solid var(--doc-line);
    }
    .doc-ch__env { color: var(--row-tone, var(--doc-ember)); font-weight: 600; }
    .doc-ch__size {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.5625rem;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: var(--doc-dim);
        margin: 0.7rem 0 0;
    }

    .doc-ch__letter-main { position: relative; z-index: 1; }
    .doc-ch__state {
        margin: 0 0 1.5rem;
        padding: 0 0 0 1.25rem;
        border-left: 3px solid var(--row-tone, var(--doc-line));
    }
    .doc-ch__state-k {
        display: block;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.5rem;
        letter-spacing: 0.28em;
        text-transform: uppercase;
        color: var(--doc-dim);
        margin-bottom: 0.55rem;
    }
    .doc-ch__state-v {
        font-family: 'Newsreader', Georgia, serif;
        font-style: italic;
        font-size: clamp(1.25rem, 2.4vw, 1.75rem);
        line-height: 1.25;
        color: var(--doc-ink);
        margin: 0;
    }

    .doc-ch__body {
        font-size: clamp(0.98rem, 1.4vw, 1.08rem);
        line-height: 1.75;
        color: var(--doc-muted);
        margin: 0;
    }

    /* Two notes under the paragraph, set in as asides: who else the letter is
       talking to, and where the condition is found now. */
    .doc-ch__second,
    .doc-ch__today {
        margin: 1.4rem 0 0;
        padding: 0.9rem 0 0 1.1rem;
        border-top: 1px solid var(--doc-line-soft);
        font-size: 0.95rem;
        line-height: 1.7;
        color: var(--doc-muted);
    }
    .doc-ch__second { border-left: 2px solid var(--row-tone, var(--doc-line)); }
    .doc-ch__second-k,
    .doc-ch__today-k {
        display: block;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.5rem;
        letter-spacing: 0.26em;
        text-transform: uppercase;
        color: var(--doc-ember);
        margin-bottom: 0.4rem;
    }

    .doc-ch__lines {
        margin: 1.75rem 0 0;
        display: grid;
        gap: 1.1rem;
    }
    .doc-ch__lines > div {
        display: grid;
        gap: 0.4rem;
        padding-top: 1.1rem;
        border-top: 1px solid var(--doc-line-soft);
    }
    .doc-ch__lines dt {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.5rem;
        letter-spacing: 0.26em;
        text-transform: uppercase;
        color: var(--doc-ember);
    }
    .doc-ch__lines dd {
        margin: 0;
        font-size: 0.95rem;
        line-height: 1.65;
        color: var(--doc-muted);
    }

    /* Oversized numeral behind the letter — decorative, and hidden from
       readers who would otherwise hear the count twice. */
    .doc-ch__ghost {
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

    /* ------------------------------- Grouping ------------------------------- */
    .doc-ch__classes {
        display: grid;
        gap: clamp(2rem, 4vw, 3.5rem);
        padding: clamp(3rem, 7vw, 5rem) clamp(1.5rem, 6vw, 7rem);
        background: var(--doc-bg-2);
        border-bottom: 1px solid var(--doc-line);
        opacity: 0;
        transform: translateY(24px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    .doc-ch__classes:global(.is-in) { opacity: 1; transform: none; }
    @media (min-width: 960px) {
        .doc-ch__classes { grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr); align-items: start; }
    }
    .doc-ch__classes-body { display: grid; gap: clamp(1.5rem, 3vw, 2.25rem); }
    .doc-ch__class-title {
        font-size: clamp(1.15rem, 2vw, 1.45rem);
        line-height: 1.2;
        margin-bottom: 0.55rem !important;
    }
    .doc-ch__quote {
        margin: 0;
        padding: clamp(1.25rem, 3vw, 1.75rem);
        border: 1px solid var(--doc-line);
        border-left: 3px solid var(--doc-ember);
        border-radius: 2px;
        background: var(--doc-bg);
    }
    .doc-ch__quote blockquote {
        margin: 0 0 0.85rem;
        font-family: 'Newsreader', Georgia, serif;
        font-style: italic;
        font-size: clamp(1.1rem, 2vw, 1.4rem);
        line-height: 1.35;
        color: var(--doc-ink);
    }
    .doc-ch__quote-src {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.5625rem;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: var(--doc-dim);
        margin: 0 0 1.1rem;
    }

    /* ------------------------------ Where it ends ------------------------------ */
    .doc-ch__ends {
        padding: clamp(3rem, 7vw, 5rem) clamp(1.5rem, 6vw, 7rem);
        max-width: 64rem;
        border-bottom: 1px solid var(--doc-line);
        opacity: 0;
        transform: translateY(24px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    .doc-ch__ends:global(.is-in) { opacity: 1; transform: none; }
    .doc-ch__turning {
        margin: 1.75rem 0 0;
        padding-left: 1.1rem;
        border-left: 3px solid var(--doc-ember);
        font-family: 'Newsreader', Georgia, serif;
        font-style: italic;
        font-size: clamp(1.1rem, 2vw, 1.4rem);
        line-height: 1.35;
        color: var(--doc-ink);
    }

    /* -------------------------------- Closing -------------------------------- */
    .doc-ch__close {
        padding: clamp(3.5rem, 8vw, 6rem) clamp(1.5rem, 6vw, 7rem) clamp(4rem, 9vw, 8rem);
        max-width: 64rem;
        opacity: 0;
        transform: translateY(24px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    .doc-ch__close:global(.is-in) { opacity: 1; transform: none; }
    .doc-ch__close-title {
        font-size: clamp(1.9rem, 4vw, 3rem);
        line-height: 1.1;
        margin-bottom: 1.5rem !important;
    }
    .doc-ch__actions { display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 2.5rem; }
    .doc-ch__btn {
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
    .doc-ch__btn:hover { border-color: var(--doc-ember); color: var(--doc-ember-soft); }
    .doc-ch__btn svg { width: 1rem; height: 1rem; transition: transform 0.3s ease; }
    .doc-ch__btn:hover svg { transform: translateX(4px); }
    .doc-ch__btn--quiet { color: var(--doc-muted); }

    @media (prefers-reduced-motion: reduce) {
        .doc-ch__cities,
        .doc-ch__why,
        .doc-ch__views,
        .doc-ch__letter,
        .doc-ch__classes,
        .doc-ch__ends,
        .doc-ch__close { opacity: 1; transform: none; transition: none; }
        .doc-ch :where(a, svg) { transition: none !important; }
    }
</style>
