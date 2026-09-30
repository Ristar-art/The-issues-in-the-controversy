<script>
    import Seo from '$lib/components/Seo.svelte';
    import SealsFlashback from '$lib/components/SealsFlashback.svelte';
    import TrumpetsFlashback from '$lib/components/TrumpetsFlashback.svelte';
    import { SEALS_ARGUMENT, QUESTION, ANSWER } from '$lib/data/flashback-seals.js';
    import { ARGUMENT, SEAM, OATH } from '$lib/data/flashback-trumpets.js';
    import {
        PRINCIPLE,
        SEAL_READING,
        SEALING_CASE,
        TRUMPETS_CASE,
        INTERLUDE_PARTS,
        QUICKLY,
        MYSTERY,
        TRADITION,
        CONTEXT,
        APPROACH,
        IN_SHORT
    } from '$lib/data/flashback-study.js';

    // The written case fades up as it arrives, the same as on the other
    // studies. The charts themselves are left alone.
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
        }, { threshold: 0.1, rootMargin: '0px 0px -8% 0px' });
        io.observe(node);
        return { destroy() { io.disconnect(); } };
    }
</script>

<Seo
    title="The Flashbacks — The Seals and the Trumpets Run Unbroken"
    description="Revelation 7 sits between the sixth seal and the seventh; Revelation 10:1 – 11:14 sits between the sixth trumpet and the seventh. Neither is a gap in the sequence. Two interactive charts showing that the seals and the trumpets each run continuously from the first to the seventh."
    keywords="seven seals, seven trumpets, revelation 7, 144000, revelation 10, two witnesses, flashback, sixth seal, seventh seal, mystery of God finished"
/>


<div class="doc-fb">
    <main>
        <!-- ============================= HEADER ============================= -->
        <section class="doc-fb__head">
            <!-- Text first, chart second — the stacked order and the two-column
                 order (text left, chart right from 900px) are the same. -->
            <div class="doc-fb__head-text">
                <p class="doc-fb__eyebrow">Study · Revelation 6 – 11</p>
                <h1 class="doc-fb__title">The<br /><span class="doc-fb__em">Flashbacks</span></h1>
                <p class="doc-fb__lede">
                    Twice in Revelation the same thing happens. A sequence of seven is running - the
                    seals, and then the trumpets - and both times, between the sixth and the seventh, the
                    vision stops going forward and turns back. Read straight through, those two stops look
                    like gaps in the count. They are not. Each chart below takes the middle out and puts
                    it back, so you can see for yourself that nothing in either sequence is missing when
                    it is gone.
                </p>
            </div>

            <figure class="doc-fb__head-fig">
                <img
                    src="/flashbacks.jpg"
                    alt="Chart of the flashbacks in Revelation: chapters 4 through 11b laid out left to right, with chapter 7 (the 144,000) and chapters 10 – 11a (the little book and the two witnesses) arrowed back to an earlier point in the sequence."
                    width="640"
                    height="480"
                />
            </figure>

            <nav class="doc-fb__jump" aria-label="The two flashbacks">
                <a href="#seals">
                    <span class="doc-fb__jump-n">01</span>
                    <span class="doc-fb__jump-t">The Seven Seals</span>
                    <span class="doc-fb__jump-r">Revelation 7</span>
                </a>
                <a href="#trumpets">
                    <span class="doc-fb__jump-n">02</span>
                    <span class="doc-fb__jump-t">The Seven Trumpets</span>
                    <span class="doc-fb__jump-r">Revelation 10:1 – 11:14</span>
                </a>
            </nav>
        </section>

        <!-- ============================ THE PRINCIPLE ========================= -->
        <section class="doc-fb__principle" use:reveal>
            <div class="doc-fb__principle-text">
                <p class="doc-fb__eyebrow">{PRINCIPLE.eyebrow}</p>
                <h2 class="doc-fb__h2">{PRINCIPLE.question}</h2>
                <p class="doc-fb__statement">{PRINCIPLE.answer}</p>
            </div>

            <div class="doc-fb__noah">
                <p class="doc-fb__noah-title">{PRINCIPLE.noah.title}</p>
                <p class="doc-fb__body">{PRINCIPLE.noah.body}</p>
            </div>
        </section>

        <!-- ======================= FLASHBACK ONE · SEALS ======================= -->
        <section class="doc-fb__act" id="seals">
            <div class="doc-fb__act-head">
                <p class="doc-fb__eyebrow">Flashback One · Revelation 6 – 8:1</p>
                <h2 class="doc-fb__act-title">The seals do not stop for the sealing.</h2>
                <p class="doc-fb__lede">
                    The sixth seal ends with the kings of the earth hiding in the rocks and asking a
                    question. Before the seventh is opened, a whole chapter goes by - four winds held,
                    an hundred and forty-four thousand sealed, a multitude standing in white robes.
                    It looks like an eighth thing wedged into a list of seven. It is not: it is the
                    answer to the question, laid over ground the fifth seal has already covered.
                </p>
            </div>

            <div class="doc-fb__chartwrap">
                <SealsFlashback />
            </div>

            <div class="doc-fb__qa">
                <blockquote class="doc-fb__quote">
                    <p class="doc-fb__quote-tag">The question</p>
                    <p>{QUESTION.text}</p>
                    <cite>{QUESTION.ref}</cite>
                </blockquote>
                <blockquote class="doc-fb__quote doc-fb__quote--answer">
                    <p class="doc-fb__quote-tag">The answer, in the very next words</p>
                    <p>{ANSWER.text}</p>
                    <cite>{ANSWER.ref}</cite>
                </blockquote>
            </div>

            <!-- What the seven are doing, in the order the text prints them. -->
            <div class="doc-fb__reading">
                <p class="doc-fb__label">What each seal is doing</p>
                <ol class="doc-fb__readlist">
                    {#each SEAL_READING as seal}
                        <li>
                            <span class="doc-fb__read-label">{seal.label}</span>
                            <span class="doc-fb__ref">{seal.refs}</span>
                            <p class="doc-fb__body">{seal.body}</p>
                        </li>
                    {/each}
                </ol>
            </div>

            <div class="doc-fb__case">
                <div class="doc-fb__case-head">
                    <p class="doc-fb__eyebrow">{SEALING_CASE.eyebrow}</p>
                    <h3 class="doc-fb__h3">{SEALING_CASE.title}</h3>
                </div>
                <div class="doc-fb__case-body">
                    <p class="doc-fb__body">{SEALING_CASE.body}</p>
                    <p class="doc-fb__body">{SEALING_CASE.why}</p>
                </div>
            </div>

            <div class="doc-fb__argument">
                {#each SEALS_ARGUMENT as move}
                    <article class="doc-fb__move">
                        <p class="doc-fb__move-kicker">{move.kicker}</p>
                        <h3 class="doc-fb__move-title">{move.title}</h3>
                        <p class="doc-fb__move-body">{move.body}</p>
                    </article>
                {/each}
            </div>
        </section>

        <!-- ====================== FLASHBACK TWO · TRUMPETS ====================== -->
        <section class="doc-fb__act" id="trumpets">
            <div class="doc-fb__act-head">
                <p class="doc-fb__eyebrow">Flashback Two · Revelation 8 – 11</p>
                <h2 class="doc-fb__act-title">The trumpets do the same thing again.</h2>
                <p class="doc-fb__lede">
                    The sixth angel sounds in chapter 9 - and then the vision stops. Two whole
                    chapters go by before the seventh is allowed to sound: an angel with an open book,
                    a temple measured, two witnesses prophesying a thousand two hundred and threescore
                    days. That is far too much time to fit between two blasts. It is the same device,
                    used a second time, for the same reason.
                </p>
            </div>

            <!-- Before the chart: what the trumpets are, and the two texts
                 that put them after the close of probation. -->
            <div class="doc-fb__case">
                <div class="doc-fb__case-head">
                    <p class="doc-fb__eyebrow">{TRUMPETS_CASE.eyebrow}</p>
                    <h3 class="doc-fb__h3">{TRUMPETS_CASE.title}</h3>
                    <p class="doc-fb__body">{TRUMPETS_CASE.lede}</p>
                </div>
                <ol class="doc-fb__proofs">
                    {#each TRUMPETS_CASE.proofs as proof}
                        <li>
                            <span class="doc-fb__num">{proof.num}</span>
                            <h4 class="doc-fb__proof-title">{proof.title}</h4>
                            <span class="doc-fb__ref">{proof.refs}</span>
                            <p class="doc-fb__body">{proof.body}</p>
                        </li>
                    {/each}
                </ol>
            </div>

            <p class="doc-fb__aside">{TRUMPETS_CASE.traditional}</p>

            <div class="doc-fb__chartwrap">
                <TrumpetsFlashback />
            </div>

            <!-- The three things chapters 10–11 put in before the seventh. -->
            <div class="doc-fb__reading">
                <p class="doc-fb__label">What the middle is made of</p>
                <ol class="doc-fb__parts">
                    {#each INTERLUDE_PARTS as part}
                        <li>
                            <span class="doc-fb__num">{part.num}</span>
                            <h4 class="doc-fb__part-title">{part.name}</h4>
                            <span class="doc-fb__ref">{part.refs}</span>
                            <p class="doc-fb__body">{part.body}</p>
                        </li>
                    {/each}
                </ol>
            </div>

            <div class="doc-fb__seamnote">
                <blockquote class="doc-fb__quote">
                    <p class="doc-fb__quote-tag">The seam</p>
                    <p>{SEAM.text}</p>
                    <cite>{SEAM.ref}</cite>
                </blockquote>
                <p class="doc-fb__lede">
                    That verse is the stitch. The second woe was the sixth trumpet, sounded back in
                    9:13, and here - after the book, the measuring, the witnesses, the ascent and the
                    earthquake - Revelation reaches back and picks the sequence up exactly where it
                    left it. The narrative never lost its place. It was showing you something else.
                </p>
            </div>

            <div class="doc-fb__argument">
                {#each ARGUMENT as move}
                    <article class="doc-fb__move">
                        <p class="doc-fb__move-kicker">{move.kicker}</p>
                        <h3 class="doc-fb__move-title">{move.title}</h3>
                        <p class="doc-fb__move-body">{move.body}</p>
                    </article>
                {/each}
            </div>

            <blockquote class="doc-fb__quote doc-fb__quote--wide">
                <p class="doc-fb__quote-tag">Why the seventh angel is held</p>
                <p>{OATH.text}</p>
                <cite>{OATH.ref}</cite>
            </blockquote>

            <!-- One word in 11:14 closes the gap the middle would otherwise need. -->
            <div class="doc-fb__case">
                <div class="doc-fb__case-head">
                    <p class="doc-fb__eyebrow">{QUICKLY.eyebrow}</p>
                    <h3 class="doc-fb__h3">“Quickly” leaves no room.</h3>
                    <!-- The verse itself is already printed above, as the seam. -->
                    <p class="doc-fb__label">{QUICKLY.reference}, the seam above</p>
                </div>
                <div class="doc-fb__case-body">
                    <p class="doc-fb__body">{QUICKLY.body}</p>
                    <p class="doc-fb__body">{QUICKLY.why}</p>
                    <p class="doc-fb__aside doc-fb__aside--flush">{QUICKLY.concurrent}</p>
                </div>
            </div>
        </section>

        <!-- ========================= WHAT THE MYSTERY IS ====================== -->
        <section class="doc-fb__mystery" use:reveal>
            <div class="doc-fb__mystery-text">
                <p class="doc-fb__eyebrow">{MYSTERY.eyebrow}</p>
                <h2 class="doc-fb__h2">More than <span class="doc-fb__em">“Christ in you.”</span></h2>
                <blockquote class="doc-fb__quote doc-fb__quote--tight">
                    <p>{MYSTERY.quote}</p>
                    <cite>{MYSTERY.reference}</cite>
                </blockquote>
                <p class="doc-fb__body">{MYSTERY.close}</p>
            </div>

            <ol class="doc-fb__steps">
                {#each MYSTERY.steps as step}
                    <li>
                        <span class="doc-fb__step-label">{step.label}</span>
                        <p class="doc-fb__step-body">{step.body}</p>
                    </li>
                {/each}
            </ol>
        </section>

        <!-- =================== WHY THE TRADITIONAL READING AROSE ============== -->
        <section class="doc-fb__tradition" use:reveal>
            <div class="doc-fb__sec-head">
                <p class="doc-fb__eyebrow">{TRADITION.eyebrow}</p>
                <h2 class="doc-fb__h2">A straight timeline, <span class="doc-fb__em">read backwards from 1844.</span></h2>
                <p class="doc-fb__body">{TRADITION.body}</p>
            </div>

            <div class="doc-fb__break">
                <p class="doc-fb__break-title">{TRADITION.inconsistency.title}</p>
                <p class="doc-fb__body">{TRADITION.inconsistency.body}</p>
            </div>
        </section>

        <!-- ========================== CONTEXT IS KING ========================= -->
        <section class="doc-fb__context" use:reveal>
            <div class="doc-fb__sec-head">
                <p class="doc-fb__eyebrow">{CONTEXT.eyebrow}</p>
                <h2 class="doc-fb__h2">{CONTEXT.title}</h2>
            </div>

            <div class="doc-fb__cases">
                {#each CONTEXT.cases as item}
                    <article class="doc-fb__casecard">
                        <span class="doc-fb__case-label">{item.label}</span>
                        <span class="doc-fb__ref">{item.refs}</span>
                        <p class="doc-fb__body">{item.body}</p>
                    </article>
                {/each}
            </div>

            <p class="doc-fb__body doc-fb__body--wide">{CONTEXT.hint}</p>
        </section>

        <!-- ========================== HOW THIS IS STUDIED ===================== -->
        <section class="doc-fb__approach" use:reveal>
            <div class="doc-fb__sec-head">
                <p class="doc-fb__eyebrow">{APPROACH.eyebrow}</p>
                <h2 class="doc-fb__h2">{APPROACH.title}</h2>
            </div>

            <ol class="doc-fb__approachlist">
                {#each APPROACH.points as point, i}
                    <li>
                        <span class="doc-fb__num">{String(i + 1).padStart(2, '0')}</span>
                        <span>{point}</span>
                    </li>
                {/each}
            </ol>

            <p class="doc-fb__statement">{APPROACH.close}</p>
        </section>

        <!-- ============================= CLOSING ============================= -->
        <section class="doc-fb__close">
            <p class="doc-fb__eyebrow">Reading them</p>
            <h2 class="doc-fb__close-title">A gap is not a break. It is an explanation.</h2>
            <p class="doc-fb__lede">{IN_SHORT}</p>
            <div class="doc-fb__actions">
                <a href="/overview" class="doc-fb__btn">
                    The parallel chart
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m0 0l-6-6m6 6l-6 6" />
                    </svg>
                </a>
                <a href="/seals" class="doc-fb__btn doc-fb__btn--quiet">The Seven Seals</a>
                <a href="/symbols" class="doc-fb__btn doc-fb__btn--quiet">The lexicon</a>
            </div>
        </section>
    </main>
</div>

<style>
    .doc-fb {
        --nav-h: 5.2rem;
        --pad-x: clamp(1.5rem, 6vw, 7rem);

        min-height: 100vh;
        background: var(--doc-bg);
        color: var(--doc-ink);
        padding-top: var(--nav-h);
        font-family: 'Public Sans', sans-serif;
        transition: background 0.4s ease, color 0.4s ease;
    }
    .doc-fb :where(h1, h2, h3) {
        font-family: 'Newsreader', Georgia, serif;
        font-weight: 400;
        color: var(--doc-ink);
        letter-spacing: -0.018em;
        line-height: 1.02;
        margin: 0;
    }

    /* ------------------------------- Header ------------------------------- */
    .doc-fb__head {
        padding: clamp(3rem, 7vw, 5.5rem) var(--pad-x) clamp(2.5rem, 5vw, 3.5rem);
        max-width: 84rem;
        display: grid;
        gap: clamp(2rem, 4vw, 3.5rem);
        align-items: center;
    }
    .doc-fb__head-fig {
        margin: 0;
        min-width: 0;
    }
    /* The chart's own background is black, so it gets a plate of its own
       rather than bleeding into the cream of the light theme. */
    .doc-fb__head-fig img {
        display: block;
        width: 100%;
        height: auto;
        background: #000;
        border: 1px solid var(--doc-line);
        border-radius: 2px;
    }
    @media (min-width: 900px) {
        .doc-fb__head {
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
            align-items: center;
        }
        .doc-fb__head-text { grid-column: 1; grid-row: 1; }
        .doc-fb__head-fig { grid-column: 2; grid-row: 1; }
        /* The index belongs under both, not under the prose alone. */
        .doc-fb__jump { grid-column: 1 / -1; grid-row: 2; }
    }
    .doc-fb__eyebrow {
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
    .doc-fb__eyebrow::before {
        content: '';
        width: 28px;
        height: 1px;
        background: var(--doc-ember);
        opacity: 0.7;
    }
    .doc-fb__title {
        font-size: clamp(3rem, 10vw, 7rem);
        line-height: 0.95;
        margin-bottom: 1.75rem !important;
    }
    .doc-fb__em { font-style: italic; font-weight: 300; color: var(--doc-ember-soft); }
    .doc-fb__lede {
        font-size: clamp(1rem, 1.6vw, 1.2rem);
        color: var(--doc-muted);
        max-width: 46rem;
        line-height: 1.7;
        margin: 0;
    }

    /* The page carries two studies; the index says so before the first chart. */
    .doc-fb__jump {
        /* Spacing comes from the header grid's gap now. */
        display: grid;
        gap: 0.75rem;
        max-width: 46rem;
    }
    @media (min-width: 720px) {
        .doc-fb__jump { grid-template-columns: 1fr 1fr; }
    }
    .doc-fb__jump a {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
        padding: 1.1rem 1.3rem;
        text-decoration: none;
        border: 1px solid var(--doc-line);
        border-left: 2px solid var(--doc-ember);
        border-radius: 2px;
        background: var(--doc-line-soft);
        transition: border-color 0.3s ease, background 0.3s ease;
    }
    .doc-fb__jump a:hover { background: var(--doc-bg-2); border-color: var(--doc-ember); }
    .doc-fb__jump-n {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.5625rem;
        letter-spacing: 0.28em;
        color: var(--doc-ember);
    }
    .doc-fb__jump-t {
        font-family: 'Newsreader', Georgia, serif;
        font-size: 1.2rem;
        color: var(--doc-ink);
    }
    .doc-fb__jump-r {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.5625rem;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: var(--doc-dim);
    }

    /* -------------------------------- Acts -------------------------------- */
    .doc-fb__act {
        border-top: 1px solid var(--doc-line);
        padding: clamp(3rem, 7vw, 5rem) 0 clamp(1rem, 2vw, 1.5rem);
        scroll-margin-top: var(--nav-h);
    }
    .doc-fb__act-head { padding: 0 var(--pad-x); max-width: 64rem; }
    .doc-fb__act-title {
        font-size: clamp(1.9rem, 4vw, 3rem);
        line-height: 1.1;
        margin-bottom: 1.5rem !important;
    }

    .doc-fb__chartwrap { padding: clamp(2rem, 4vw, 3rem) var(--pad-x) 0; }

    /* --------------------------- Quotes & argument --------------------------- */
    .doc-fb__qa,
    .doc-fb__seamnote { padding: clamp(2.5rem, 5vw, 4rem) var(--pad-x) 0; max-width: 68rem; }
    @media (min-width: 900px) {
        .doc-fb__qa { display: grid; grid-template-columns: 1fr 1fr; gap: 2.5rem; }
    }

    .doc-fb__quote {
        margin: 0 0 1.75rem;
        border-left: 2px solid var(--doc-ember);
        padding: 0.35rem 0 0.35rem 1.5rem;
        max-width: 44rem;
    }
    .doc-fb__quote--answer { border-left-color: #4fc424; }
    .doc-fb__quote p {
        font-family: 'Newsreader', Georgia, serif;
        font-style: italic;
        font-size: clamp(1.15rem, 2.2vw, 1.55rem);
        line-height: 1.45;
        color: var(--doc-ink);
        margin: 0 0 0.9rem;
    }
    .doc-fb__quote-tag {
        font-family: 'JetBrains Mono', ui-monospace, monospace !important;
        font-style: normal !important;
        font-size: 0.5625rem !important;
        letter-spacing: 0.26em;
        text-transform: uppercase;
        color: var(--doc-dim) !important;
        margin-bottom: 0.75rem !important;
    }
    .doc-fb__quote cite {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-style: normal;
        font-size: 0.625rem;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        color: var(--doc-ember);
    }
    .doc-fb__quote--wide {
        margin: clamp(1rem, 3vw, 2rem) var(--pad-x) 0;
        max-width: 52rem;
    }

    .doc-fb__argument {
        padding: clamp(2rem, 4vw, 3rem) var(--pad-x) 0;
        display: grid;
        gap: clamp(2rem, 4vw, 3rem);
    }
    @media (min-width: 900px) {
        .doc-fb__argument { grid-template-columns: repeat(3, 1fr); }
    }
    .doc-fb__move { max-width: 32rem; }
    .doc-fb__move-kicker {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.3em;
        text-transform: uppercase;
        color: var(--doc-ember);
        margin: 0 0 1rem;
    }
    .doc-fb__move-title {
        font-size: clamp(1.35rem, 2.4vw, 1.75rem);
        line-height: 1.15;
        margin-bottom: 1rem !important;
    }
    .doc-fb__move-body {
        font-size: 1rem;
        line-height: 1.75;
        color: var(--doc-muted);
        margin: 0;
    }

    /* ---------------------------- Study additions ---------------------------- */
    .doc-fb__h2 {
        font-size: clamp(1.8rem, 4vw, 2.9rem);
        line-height: 1.08 !important;
        margin-bottom: 1.25rem !important;
    }
    .doc-fb__h3 {
        font-size: clamp(1.35rem, 2.6vw, 1.9rem);
        line-height: 1.15 !important;
        margin-bottom: 1rem !important;
    }
    .doc-fb__body {
        font-size: clamp(0.98rem, 1.4vw, 1.08rem);
        line-height: 1.75;
        color: var(--doc-muted);
        margin: 0;
        max-width: 42rem;
    }
    .doc-fb__body--wide { max-width: 52rem; margin-top: clamp(1.5rem, 3vw, 2.25rem); }
    .doc-fb__label,
    .doc-fb__num {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        color: var(--doc-dim);
        margin: 0;
    }
    .doc-fb__num { color: var(--doc-ember); display: block; }
    .doc-fb__ref {
        display: block;
        font-family: 'Newsreader', Georgia, serif;
        font-style: italic;
        font-size: 0.95rem;
        color: var(--doc-ember-soft);
        margin: 0 0 0.5rem;
    }
    .doc-fb__statement {
        font-family: 'Newsreader', Georgia, serif;
        font-size: clamp(1.25rem, 2.4vw, 1.75rem);
        line-height: 1.38;
        color: var(--doc-ink);
        max-width: 44rem;
        margin: 1.75rem 0 0;
    }
    /* A quieter line than the body - used where the study steps aside to
       note what a rival reading has to do. */
    .doc-fb__aside {
        font-family: 'Newsreader', Georgia, serif;
        font-style: italic;
        font-size: clamp(1rem, 1.8vw, 1.2rem);
        line-height: 1.6;
        color: var(--doc-ember-soft);
        max-width: 44rem;
        margin: clamp(1.5rem, 3vw, 2.25rem) 0 0;
        padding: 0 var(--pad-x);
    }
    .doc-fb__aside--flush { padding: 0; }
    .doc-fb__quote--tight { margin-bottom: 1.25rem; }
    .doc-fb__sec-head { max-width: 46rem; margin-bottom: clamp(2rem, 4vw, 3rem); }

    /* The principle the page turns on */
    .doc-fb__principle {
        border-top: 1px solid var(--doc-line);
        padding: clamp(3rem, 7vw, 5rem) var(--pad-x);
        display: grid;
        gap: clamp(2rem, 5vw, 4rem);
    }
    @media (min-width: 960px) {
        .doc-fb__principle { grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr); }
    }
    .doc-fb__principle-text { max-width: 40rem; }
    .doc-fb__noah {
        display: grid;
        gap: 0.85rem;
        align-content: start;
        padding: clamp(1.5rem, 3vw, 2rem);
        border: 1px dashed var(--doc-line);
        border-radius: 2px;
    }
    .doc-fb__noah-title {
        font-family: 'Newsreader', Georgia, serif;
        font-size: clamp(1.2rem, 2.2vw, 1.45rem);
        color: var(--doc-ink);
        margin: 0;
    }

    /* Seal-by-seal reading, and the three parts of the interlude */
    .doc-fb__reading { padding: clamp(2.5rem, 5vw, 4rem) var(--pad-x) 0; }
    .doc-fb__readlist,
    .doc-fb__parts,
    .doc-fb__proofs {
        list-style: none;
        margin: 1.25rem 0 0;
        padding: 0;
        display: grid;
        gap: clamp(1.5rem, 3vw, 2.25rem);
    }
    @media (min-width: 900px) {
        .doc-fb__readlist { grid-template-columns: repeat(4, minmax(0, 1fr)); }
        .doc-fb__parts { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        .doc-fb__proofs { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }
    .doc-fb__readlist li,
    .doc-fb__parts li,
    .doc-fb__proofs li {
        border-top: 1px solid var(--doc-line);
        padding-top: 1.1rem;
    }
    .doc-fb__read-label {
        display: block;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        color: var(--doc-ember);
        margin-bottom: 0.6rem;
    }
    .doc-fb__part-title,
    .doc-fb__proof-title {
        font-family: 'Newsreader', Georgia, serif;
        font-weight: 400;
        font-size: clamp(1.15rem, 2.1vw, 1.4rem);
        line-height: 1.2;
        color: var(--doc-ink);
        margin: 0.9rem 0 0.5rem;
    }

    /* The cases made either side of a chart */
    .doc-fb__case {
        padding: clamp(2.5rem, 5vw, 4rem) var(--pad-x) 0;
        display: grid;
        gap: clamp(1.5rem, 4vw, 3rem);
    }
    @media (min-width: 960px) {
        .doc-fb__case { grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr); }
    }
    .doc-fb__case-head { max-width: 34rem; }
    .doc-fb__case-body { display: grid; gap: 1.25rem; align-content: start; }
    .doc-fb__case .doc-fb__proofs { margin-top: 0; }

    /* What the mystery is */
    .doc-fb__mystery {
        border-top: 1px solid var(--doc-line);
        padding: clamp(3rem, 7vw, 5rem) var(--pad-x);
        display: grid;
        gap: clamp(2rem, 5vw, 4rem);
    }
    @media (min-width: 960px) {
        .doc-fb__mystery { grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr); }
    }
    .doc-fb__mystery-text { max-width: 40rem; display: grid; gap: 1.25rem; align-content: start; }
    .doc-fb__mystery-text .doc-fb__h2 { margin-bottom: 0 !important; }
    .doc-fb__steps { list-style: none; margin: 0; padding: 0; align-self: center; }
    .doc-fb__steps li {
        padding: 1.25rem 0;
        border-top: 1px solid var(--doc-line);
    }
    .doc-fb__steps li:last-child { border-bottom: 1px solid var(--doc-line); }
    .doc-fb__step-label {
        display: block;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        color: var(--doc-ember);
        margin-bottom: 0.6rem;
    }
    .doc-fb__step-body {
        font-family: 'Newsreader', Georgia, serif;
        font-size: clamp(1.1rem, 2vw, 1.35rem);
        line-height: 1.45;
        color: var(--doc-ink);
        margin: 0;
    }

    /* Why the traditional reading arose */
    .doc-fb__tradition,
    .doc-fb__context,
    .doc-fb__approach {
        border-top: 1px solid var(--doc-line);
        padding: clamp(3rem, 7vw, 5rem) var(--pad-x);
    }
    .doc-fb__tradition,
    .doc-fb__approach { background: var(--doc-bg-2); }
    .doc-fb__break {
        display: grid;
        gap: 0.9rem;
        max-width: 46rem;
        padding-left: clamp(1rem, 2vw, 1.5rem);
        border-left: 3px solid var(--doc-ember);
    }
    .doc-fb__break-title {
        font-family: 'Newsreader', Georgia, serif;
        font-size: clamp(1.25rem, 2.4vw, 1.6rem);
        color: var(--doc-ink);
        margin: 0;
    }

    /* Context is king — one period past, one future */
    .doc-fb__cases { display: grid; gap: clamp(1.25rem, 3vw, 2rem); }
    @media (min-width: 860px) {
        .doc-fb__cases { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }
    .doc-fb__casecard {
        display: grid;
        gap: 0.5rem;
        align-content: start;
        padding: clamp(1.25rem, 2.5vw, 1.75rem);
        border: 1px solid var(--doc-line);
        border-radius: 2px;
        background: var(--doc-bg-2);
    }
    .doc-fb__case-label {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        color: var(--doc-ember);
    }

    /* How this is studied */
    .doc-fb__approachlist { list-style: none; margin: 0; padding: 0; }
    .doc-fb__approachlist li {
        display: grid;
        grid-template-columns: auto minmax(0, 1fr);
        gap: clamp(1rem, 2.5vw, 1.75rem);
        align-items: baseline;
        padding: 1.1rem 0;
        border-top: 1px solid var(--doc-line);
        font-family: 'Newsreader', Georgia, serif;
        font-size: clamp(1.05rem, 1.9vw, 1.3rem);
        line-height: 1.45;
        color: var(--doc-ink);
    }
    .doc-fb__approachlist li:last-child { border-bottom: 1px solid var(--doc-line); }

    /* The study fades up as it arrives; the charts do not move. */
    main > section { transition: opacity 0.8s ease, transform 0.8s ease; }
    main > section:not(.doc-fb__head):not(.doc-fb__act):not(.doc-fb__close):not(:global(.is-in)) {
        opacity: 0;
        transform: translateY(24px);
    }

    /* ------------------------------- Closing ------------------------------- */
    .doc-fb__close {
        border-top: 1px solid var(--doc-line);
        margin-top: clamp(3rem, 6vw, 4.5rem);
        padding: clamp(3.5rem, 8vw, 6rem) var(--pad-x) clamp(4rem, 9vw, 8rem);
        max-width: 64rem;
    }
    .doc-fb__close-title {
        font-size: clamp(1.9rem, 4vw, 3rem);
        line-height: 1.1;
        margin-bottom: 1.5rem !important;
    }
    .doc-fb__actions { display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 2.5rem; }
    .doc-fb__btn {
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
    .doc-fb__btn:hover { border-color: var(--doc-ember); color: var(--doc-ember-soft); }
    .doc-fb__btn svg { width: 1rem; height: 1rem; transition: transform 0.3s ease; }
    .doc-fb__btn:hover svg { transform: translateX(4px); }
    .doc-fb__btn--quiet { color: var(--doc-muted); }

    @media (prefers-reduced-motion: reduce) {
        .doc-fb a { transition: none !important; }
    }
</style>
