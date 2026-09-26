<script>
    import {
        SUBTITLE,
        QUESTION,
        WINDS,
        PLACEMENT,
        SEAL_SENSES,
        SECOND_SEAL,
        THE_MARK,
        TRIBES,
        NOT_A_NUMBER,
        NOT_JEWS,
        MISREADINGS,
        TRIBULATION,
        ROBES,
        BLOTTING,
        TEMPLE,
        VERDICT
    } from '$lib/data/the-144000.js';
    import { PRINCIPLE, getCase } from '$lib/data/heard-seen.js';
    import HeardSeen from '$lib/components/HeardSeen.svelte';

    // The chapter's own argument runs through Revelation 5 before it runs
    // through Revelation 7: the precedent first, then the case it decides.
    const precedent = getCase('lion-and-lamb');
    const application = getCase('number-and-multitude');

    // The same reveal treatment the seals and churches pages use, so a reader
    // moving between the studies meets the same rhythm.
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
</script>

<svelte:head>
    <title>The 144,000 — The Issues in the Controversy</title>
    <meta
        name="description"
        content="Revelation 7 read in its place: the sealing of the hundred and forty and four thousand falls under the fifth seal, before the day of wrath, and answers the question chapter 6 ends with - who shall be able to stand?"
    />
    <meta name="keywords" content="144000, the 144000, revelation 7, sealed in their foreheads, four winds, seal of God, mark of the beast, great multitude, white robes, the great tribulation, twelve tribes, ephraim and dan, philadelphia, brotherly love, day of atonement, blotting out of sins, perfected kingdom, fifth seal" />
</svelte:head>

<div class="doc-sd">
    <main>
        <!-- ============================== HERO ============================== -->
        <section class="doc-sd__hero">
            <img
                class="doc-sd__hero-img"
                src="/The 144 000.jpg"
                alt="An angel with the seal of the living God sealing a man in the forehead, before ranks under the banners of the twelve tribes"
                fetchpriority="high"
            />
            <span class="doc-sd__hero-veil" aria-hidden="true"></span>

            <div class="doc-sd__hero-text">
                <p class="doc-sd__eyebrow">Revelation 7 · Between the fifth seal and the sixth</p>
                <h1 class="doc-sd__title">The<br /><span class="doc-sd__em">144,000</span></h1>
                <p class="doc-sd__lede">{SUBTITLE}</p>
            </div>
        </section>

        <!-- ============================ THE QUESTION ============================ -->
        <section class="doc-sd__band doc-sd__band--alt" id="the-question" use:reveal>
            <div class="doc-sd__wrap">
                <p class="doc-sd__eyebrow">Why the chapter exists</p>
                <h2 class="doc-sd__h2">God asks, because he means to answer.</h2>

                <blockquote class="doc-sd__pull">
                    {QUESTION.quote}
                    <cite>{QUESTION.refs}</cite>
                </blockquote>

                <div class="doc-sd__cols">
                    {#each QUESTION.notes as note}
                        <p class="doc-sd__body">{note}</p>
                    {/each}
                </div>

                <p class="doc-sd__note">{QUESTION.pivot}</p>
            </div>
        </section>

        <!-- ============================== THE WINDS ============================== -->
        <section class="doc-sd__band" id="the-winds" use:reveal>
            <div class="doc-sd__wrap">
                <p class="doc-sd__eyebrow">Revelation 7:1–3</p>
                <h2 class="doc-sd__h2">Four angels, holding four winds.</h2>

                <blockquote class="doc-sd__pull">
                    {WINDS.quote}
                    <cite>{WINDS.refs}</cite>
                </blockquote>

                <div class="doc-sd__split">
                    <div class="doc-sd__prose">
                        {#each WINDS.reading as para}
                            <p class="doc-sd__body">{para}</p>
                        {/each}
                    </div>

                    <aside class="doc-sd__aside">
                        <p class="doc-sd__aside-k">What a wind is, in the prophets</p>
                        {#each WINDS.witnesses as w}
                            <blockquote class="doc-sd__quote">
                                {w.quote}
                                <cite>{w.refs}</cite>
                            </blockquote>
                        {/each}
                    </aside>
                </div>
            </div>
        </section>

        <!-- ============================== PLACEMENT ============================== -->
        <section class="doc-sd__band doc-sd__band--alt" id="when" use:reveal>
            <div class="doc-sd__wrap">
                <p class="doc-sd__eyebrow">When the sealing happens</p>
                <h2 class="doc-sd__h2">One window, and no other.</h2>
                <p class="doc-sd__lede doc-sd__lede--tight">{PLACEMENT.lede}</p>

                <!-- The sequence, with the one slot the sealing occupies marked.
                     Everything the page later rules out is ruled out here. -->
                <ol class="doc-sd__track">
                    {#each PLACEMENT.steps as step}
                        <li class="doc-sd__stop" class:doc-sd__stop--here={step.here}>
                            <span class="doc-sd__stop-era">{step.era} seal</span>
                            <h3 class="doc-sd__stop-title">{step.title}</h3>
                            <p class="doc-sd__stop-note">{step.note}</p>
                            {#if step.here}
                                <p class="doc-sd__flag">{step.here}</p>
                            {/if}
                        </li>
                    {/each}
                </ol>

                <p class="doc-sd__note">{PLACEMENT.flashback}</p>

                <dl class="doc-sd__keys">
                    {#each PLACEMENT.consequences as item}
                        <div class="doc-sd__key">
                            <dt>{item.term}</dt>
                            <dd>{item.meaning}</dd>
                        </div>
                    {/each}
                </dl>
            </div>
        </section>

        <!-- =============================== THE SEAL =============================== -->
        <section class="doc-sd__band" id="the-seal" use:reveal>
            <div class="doc-sd__wrap">
                <p class="doc-sd__eyebrow">What a seal is</p>
                <h2 class="doc-sd__h2">Approval, guarantee, and the end of the matter.</h2>

                <div class="doc-sd__grid doc-sd__grid--3">
                    {#each SEAL_SENSES as sense}
                        <article class="doc-sd__card">
                            <h3 class="doc-sd__card-title">{sense.term}</h3>
                            <p class="doc-sd__body">{sense.meaning}</p>
                            <p class="doc-sd__refs">{sense.refs}</p>
                        </article>
                    {/each}
                </div>

                <div class="doc-sd__turn">
                    <p class="doc-sd__eyebrow">And which seal this is not</p>
                    <p class="doc-sd__lede doc-sd__lede--tight">{SECOND_SEAL.lede}</p>

                    <dl class="doc-sd__keys">
                        {#each SECOND_SEAL.reasons as item}
                            <div class="doc-sd__key">
                                <dt>{item.term}</dt>
                                <dd>{item.meaning}</dd>
                            </div>
                        {/each}
                    </dl>
                </div>
            </div>
        </section>

        <!-- ============================== THE MARK ============================== -->
        <section class="doc-sd__band doc-sd__band--alt" id="the-mark" use:reveal>
            <div class="doc-sd__wrap">
                <p class="doc-sd__eyebrow">The Father’s name in the forehead</p>
                <h2 class="doc-sd__h2">A character, not a stamp.</h2>

                <blockquote class="doc-sd__pull">
                    {THE_MARK.quote}
                    <cite>{THE_MARK.refs}</cite>
                </blockquote>

                <div class="doc-sd__prose doc-sd__prose--wide">
                    {#each THE_MARK.reading as para}
                        <p class="doc-sd__body">{para}</p>
                    {/each}
                </div>

                <!-- Two marks, set opposite each other the way the book sets them. -->
                <div class="doc-sd__grid doc-sd__grid--2">
                    {#each THE_MARK.pair as item}
                        <article class="doc-sd__card doc-sd__card--face">
                            <h3 class="doc-sd__card-title">{item.term}</h3>
                            <p class="doc-sd__body">{item.meaning}</p>
                            <p class="doc-sd__refs">{item.refs}</p>
                        </article>
                    {/each}
                </div>
            </div>
        </section>

        <!-- =========================== HEARD VS SEEN =========================== -->
        <section class="doc-sd__band" id="heard-and-seen" use:reveal>
            <div class="doc-sd__wrap">
                <p class="doc-sd__eyebrow">The key to the chapter</p>
                <h2 class="doc-sd__h2">John heard one thing. He turned, and saw another.</h2>
                <p class="doc-sd__lede doc-sd__lede--tight">
                    This is the hinge the whole identity turns on, and the book teaches it two
                    chapters earlier before it asks anyone to use it. What is announced gives the
                    name. What is shown gives the thing. Where the two seem to disagree, it is the
                    sight that is doing the teaching - and both are true at once.
                </p>

                <!-- The rule in three lines, before it is used twice. -->
                <ol class="doc-sd__reasons doc-sd__reasons--3">
                    {#each PRINCIPLE as step, i}
                        <li class="doc-sd__reason">
                            <span class="doc-sd__reason-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                            <h3 class="doc-sd__reason-title">{step.step}</h3>
                            <p class="doc-sd__body">{step.note}</p>
                        </li>
                    {/each}
                </ol>

                {#if precedent}
                    <div class="doc-sd__case">
                        <p class="doc-sd__eyebrow">The precedent · Revelation 5</p>
                        <h3 class="doc-sd__h3">{precedent.label}</h3>
                        <p class="doc-sd__body doc-sd__body--intro">{precedent.intro}</p>
                        <HeardSeen item={precedent} />
                    </div>
                {/if}

                {#if application}
                    <div class="doc-sd__case">
                        <p class="doc-sd__eyebrow">The same turn · Revelation 7</p>
                        <h3 class="doc-sd__h3">{application.label}</h3>
                        <p class="doc-sd__body doc-sd__body--intro">{application.intro}</p>
                        <HeardSeen item={application} />

                        <div class="doc-sd__split doc-sd__split--reading">
                            <div class="doc-sd__prose">
                                <p class="doc-sd__eyebrow">What it means</p>
                                {#each application.reading as para}
                                    <p class="doc-sd__body">{para}</p>
                                {/each}
                            </div>

                            <dl class="doc-sd__keys">
                                {#each application.keys as key}
                                    <div class="doc-sd__key">
                                        <dt>{key.term}</dt>
                                        <dd>
                                            {key.meaning}
                                            <span class="doc-sd__key-refs">{key.refs}</span>
                                        </dd>
                                    </div>
                                {/each}
                            </dl>
                        </div>
                    </div>
                {/if}

                <!-- The illustration that settles it, and the phrase that is
                     often read as though it were a measurement. -->
                <div class="doc-sd__turn">
                    <p class="doc-sd__eyebrow">Two descriptions of one crowd</p>
                    <p class="doc-sd__body">
                        Put a photograph of a crowd of children in front of anyone and ask where they
                        come from, and they will answer from the skin, the eyes, the hair: Ethiopia,
                        China, the Caribbean, the United States. Now say the children are all
                        Christians - and then say they are all of Israel. Both statements are true.
                        The eyes gave a physical description and the voice gave a spiritual one, and
                        neither cancels the other.
                    </p>
                    <p class="doc-sd__body">
                        That is exactly the position John is in. The voice gives him tribes and
                        twelve thousands, which is the spiritual description. Then he turns, and what
                        his eyes report is every nation, kindred, people and tongue. A great
                        multitude which no man could number is a man’s way of speaking - the way a
                        crowd is called countless, or people like sand. Anyone in a stadium of a
                        hundred thousand says the same. It is not a statement that the saved are
                        beyond arithmetic; it is a statement of what a crowd looks like to a pair of
                        eyes.
                    </p>
                </div>
            </div>
        </section>

        <!-- ============================== THE NUMBER ============================== -->
        <section class="doc-sd__band doc-sd__band--alt" id="the-number" use:reveal>
            <div class="doc-sd__wrap">
                <p class="doc-sd__eyebrow">Six reasons</p>
                <h2 class="doc-sd__h2">The number is a description, not a headcount.</h2>

                <ol class="doc-sd__reasons">
                    {#each NOT_A_NUMBER as item, i}
                        <li class="doc-sd__reason">
                            <span class="doc-sd__reason-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                            <h3 class="doc-sd__reason-title">{item.term}</h3>
                            <p class="doc-sd__body">{item.meaning}</p>
                            {#if item.refs}<p class="doc-sd__refs">{item.refs}</p>{/if}
                        </li>
                    {/each}
                </ol>
            </div>
        </section>

        <!-- =============================== THE TRIBES =============================== -->
        <section class="doc-sd__band" id="the-tribes" use:reveal>
            <div class="doc-sd__wrap">
                <p class="doc-sd__eyebrow">Revelation 7:5–8</p>
                <h2 class="doc-sd__h2">Twelve tribes - but not Israel’s twelve.</h2>
                <p class="doc-sd__lede doc-sd__lede--tight">{TRIBES.lede}</p>

                <div class="doc-sd__split doc-sd__split--roll">
                    <div>
                        <p class="doc-sd__eyebrow">Sealed, twelve thousand each</p>
                        <ol class="doc-sd__roll">
                            {#each TRIBES.list as tribe, i}
                                <li class="doc-sd__tribe">
                                    <span class="doc-sd__tribe-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                                    <span class="doc-sd__tribe-name">{tribe.name}</span>
                                    {#if tribe.note}<span class="doc-sd__tribe-note">{tribe.note}</span>{/if}
                                </li>
                            {/each}
                        </ol>
                    </div>

                    <aside class="doc-sd__aside doc-sd__aside--absent">
                        <p class="doc-sd__aside-k">Not on the list</p>
                        {#each TRIBES.absent as tribe}
                            <div class="doc-sd__absent">
                                <h3 class="doc-sd__absent-name">{tribe.name}</h3>
                                <p class="doc-sd__body">{tribe.note}</p>
                            </div>
                        {/each}
                    </aside>
                </div>

                <div class="doc-sd__prose doc-sd__prose--wide">
                    {#each TRIBES.reading as para}
                        <p class="doc-sd__body">{para}</p>
                    {/each}
                </div>
            </div>
        </section>

        <!-- ============================== NOT JEWS ============================== -->
        <section class="doc-sd__band doc-sd__band--alt" id="not-literal-israel" use:reveal>
            <div class="doc-sd__wrap">
                <p class="doc-sd__eyebrow">Israel, in a symbolic book</p>
                <h2 class="doc-sd__h2">Babylon is not Babylon. Why would Israel be Israel?</h2>

                <dl class="doc-sd__keys doc-sd__keys--pair">
                    {#each NOT_JEWS as item}
                        <div class="doc-sd__key">
                            <dt>{item.term}</dt>
                            <dd>
                                {item.meaning}
                                {#if item.refs}<span class="doc-sd__key-refs">{item.refs}</span>{/if}
                            </dd>
                        </div>
                    {/each}
                </dl>
            </div>
        </section>

        <!-- ============================= MISREADINGS ============================= -->
        <section class="doc-sd__band" id="misreadings" use:reveal>
            <div class="doc-sd__wrap">
                <p class="doc-sd__eyebrow">What the placing rules out</p>
                <h2 class="doc-sd__h2">Five readings, and where each one breaks.</h2>

                <div class="doc-sd__claims">
                    {#each MISREADINGS as item}
                        <article class="doc-sd__claim">
                            <p class="doc-sd__claim-text">“{item.claim}”</p>
                            <div class="doc-sd__claim-ans">
                                <span class="doc-sd__claim-k">Why not</span>
                                <p class="doc-sd__body">{item.fails}</p>
                            </div>
                        </article>
                    {/each}
                </div>
            </div>
        </section>

        <!-- ============================ THE TRIBULATION ============================ -->
        <section class="doc-sd__band doc-sd__band--alt" id="the-great-tribulation" use:reveal>
            <div class="doc-sd__wrap">
                <p class="doc-sd__eyebrow">Revelation 7:14</p>
                <h2 class="doc-sd__h2">The great tribulation - with the article.</h2>

                <blockquote class="doc-sd__pull">
                    {TRIBULATION.quote}
                    <cite>{TRIBULATION.refs}</cite>
                </blockquote>

                <p class="doc-sd__note">{TRIBULATION.article}</p>

                <div class="doc-sd__split">
                    <div class="doc-sd__prose">
                        {#each TRIBULATION.reading as para}
                            <p class="doc-sd__body">{para}</p>
                        {/each}
                    </div>

                    <aside class="doc-sd__aside">
                        <p class="doc-sd__aside-k">The time it names</p>
                        {#each TRIBULATION.witnesses as w}
                            <blockquote class="doc-sd__quote">
                                {w.quote}
                                <cite>{w.refs}</cite>
                            </blockquote>
                        {/each}
                    </aside>
                </div>
            </div>
        </section>

        <!-- =============================== THE ROBES =============================== -->
        <section class="doc-sd__band" id="the-robes" use:reveal>
            <div class="doc-sd__wrap">
                <p class="doc-sd__eyebrow">Two companies, two verbs</p>
                <h2 class="doc-sd__h2">Given, and washed.</h2>
                <p class="doc-sd__lede doc-sd__lede--tight">{ROBES.lede}</p>

                <div class="doc-sd__grid doc-sd__grid--2">
                    {#each ROBES.pair as item}
                        <article class="doc-sd__card doc-sd__card--face">
                            <p class="doc-sd__card-k">{item.who}</p>
                            <h3 class="doc-sd__card-title">{item.term}</h3>
                            <p class="doc-sd__body">{item.meaning}</p>
                            <p class="doc-sd__refs">{item.refs}</p>
                        </article>
                    {/each}
                </div>

                <div class="doc-sd__prose doc-sd__prose--wide">
                    {#each ROBES.reading as para}
                        <p class="doc-sd__body">{para}</p>
                    {/each}
                </div>
            </div>
        </section>

        <!-- ============================== THE BLOTTING ============================== -->
        <section class="doc-sd__band doc-sd__band--alt" id="the-blotting-out" use:reveal>
            <div class="doc-sd__wrap">
                <p class="doc-sd__eyebrow">What the washing removes</p>
                <h2 class="doc-sd__h2">The pollution of sin, and the day it is dealt with.</h2>

                <blockquote class="doc-sd__pull">
                    {BLOTTING.quote}
                    <cite>{BLOTTING.refs}</cite>
                </blockquote>

                <div class="doc-sd__prose doc-sd__prose--wide">
                    {#each BLOTTING.reading as para}
                        <p class="doc-sd__body">{para}</p>
                    {/each}
                </div>

                <!-- The feasts, because they are where the sequence is set. -->
                <div class="doc-sd__grid doc-sd__grid--4">
                    {#each BLOTTING.feasts as feast}
                        <article class="doc-sd__card doc-sd__card--slim">
                            <h3 class="doc-sd__card-title doc-sd__card-title--sm">{feast.term}</h3>
                            <p class="doc-sd__body">{feast.meaning}</p>
                            <p class="doc-sd__refs">{feast.refs}</p>
                        </article>
                    {/each}
                </div>

                <p class="doc-sd__note">{BLOTTING.closing}</p>
            </div>
        </section>

        <!-- =============================== THE TEMPLE =============================== -->
        <section class="doc-sd__band" id="the-temple" use:reveal>
            <div class="doc-sd__wrap">
                <p class="doc-sd__eyebrow">Revelation 7:15</p>
                <h2 class="doc-sd__h2">Day and night in his temple.</h2>

                <div class="doc-sd__chain">
                    {#each TEMPLE.chain as link}
                        <blockquote class="doc-sd__quote doc-sd__quote--chain">
                            {link.quote}
                            <cite>{link.refs}</cite>
                        </blockquote>
                    {/each}
                </div>

                <div class="doc-sd__prose doc-sd__prose--wide">
                    {#each TEMPLE.reading as para}
                        <p class="doc-sd__body">{para}</p>
                    {/each}
                </div>

                <div class="doc-sd__turn">
                    <blockquote class="doc-sd__pull doc-sd__pull--quiet">
                        {TEMPLE.promises.quote}
                        <cite>{TEMPLE.promises.refs}</cite>
                    </blockquote>
                    <p class="doc-sd__body">{TEMPLE.promises.note}</p>
                </div>
            </div>
        </section>

        <!-- ================================ VERDICT ================================ -->
        <section class="doc-sd__close" id="who-they-are" use:reveal>
            <p class="doc-sd__eyebrow">Who they are</p>
            <h2 class="doc-sd__close-title">The kingdom of God, perfected.</h2>
            <p class="doc-sd__lede">{VERDICT.lede}</p>

            <div class="doc-sd__prose doc-sd__prose--wide">
                {#each VERDICT.points as point}
                    <p class="doc-sd__body">{point}</p>
                {/each}
            </div>

            <div class="doc-sd__actions">
                <a href="/seals" class="doc-sd__btn">
                    The seven seals
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m0 0l-6-6m6 6l-6 6" />
                    </svg>
                </a>
                <a href="/flashbacks" class="doc-sd__btn doc-sd__btn--quiet">The flashbacks</a>
                <a href="/churches" class="doc-sd__btn doc-sd__btn--quiet">Philadelphia</a>
                <a href="/beast" class="doc-sd__btn doc-sd__btn--quiet">The mark of the beast</a>
                <a href="/symbols" class="doc-sd__btn doc-sd__btn--quiet">The lexicon</a>
            </div>
        </section>
    </main>
</div>

<style>
    .doc-sd {
        --nav-h: 5.2rem;
        min-height: 100vh;
        background: var(--doc-bg);
        color: var(--doc-ink);
        font-family: 'Public Sans', sans-serif;
        transition: background 0.4s ease, color 0.4s ease;
    }
    .doc-sd :where(h1, h2, h3) {
        font-family: 'Newsreader', Georgia, serif;
        font-weight: 400;
        color: var(--doc-ink);
        letter-spacing: -0.018em;
        line-height: 1.05;
        margin: 0;
    }

    /* -------------------------------- Hero -------------------------------- */
    .doc-sd__hero {
        position: relative;
        min-height: min(88vh, 46rem);
        display: flex;
        align-items: flex-end;
        padding: calc(var(--nav-h) + 3rem) clamp(1.5rem, 6vw, 7rem) clamp(3rem, 7vw, 5.5rem);
        overflow: hidden;
        border-bottom: 1px solid var(--doc-line);
    }
    .doc-sd__hero-img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center 28%;
        filter: contrast(1.05) saturate(0.92);
    }
    .doc-sd__hero-veil {
        position: absolute;
        inset: 0;
        background: linear-gradient(
            to top,
            rgba(8, 7, 6, 0.94) 0%,
            rgba(8, 7, 6, 0.78) 38%,
            rgba(8, 7, 6, 0.42) 70%,
            rgba(8, 7, 6, 0.3) 100%
        );
    }
    .doc-sd__hero-text { position: relative; max-width: 52rem; }
    /* The hero sits on its own dark ground, so its type is fixed light rather
       than themed - the same treatment the seals hero uses. */
    .doc-sd__hero-text :where(h1) { color: #f6f3ec; }
    .doc-sd__hero-text .doc-sd__lede { color: rgba(246, 243, 236, 0.82); }

    .doc-sd__title {
        font-size: clamp(3.2rem, 11vw, 7.5rem);
        line-height: 0.92;
        margin-bottom: 1.75rem !important;
    }
    .doc-sd__em { font-style: italic; font-weight: 300; color: var(--doc-ember-soft); }

    /* ------------------------------ Shared type ------------------------------ */
    .doc-sd__eyebrow {
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
    .doc-sd__eyebrow::before {
        content: '';
        width: 28px;
        height: 1px;
        background: var(--doc-ember);
        opacity: 0.7;
    }
    .doc-sd__h2 {
        font-size: clamp(1.9rem, 4.2vw, 3rem);
        line-height: 1.08;
        margin-bottom: 1.6rem !important;
        max-width: 42rem;
    }
    .doc-sd__h3 {
        font-size: clamp(1.4rem, 2.8vw, 2rem);
        line-height: 1.12;
        margin-bottom: 1rem !important;
    }
    .doc-sd__lede {
        font-size: clamp(1rem, 1.6vw, 1.2rem);
        color: var(--doc-muted);
        max-width: 44rem;
        line-height: 1.7;
        margin: 0;
    }
    .doc-sd__lede--tight { margin-bottom: clamp(2rem, 4vw, 3rem); }
    .doc-sd__body {
        font-size: clamp(0.98rem, 1.4vw, 1.08rem);
        line-height: 1.75;
        color: var(--doc-muted);
        margin: 0;
    }
    .doc-sd__body + .doc-sd__body { margin-top: 1.15rem; }
    .doc-sd__body--intro { max-width: 46rem; margin-bottom: clamp(1.75rem, 3vw, 2.5rem); }
    .doc-sd__refs {
        margin: 1rem 0 0;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.5rem;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: var(--doc-dim);
    }

    /* A quoted verse, set large; and the smaller one used inside asides. */
    .doc-sd__pull {
        margin: 0 0 clamp(2rem, 4vw, 3rem);
        padding-left: clamp(1.1rem, 2vw, 1.75rem);
        border-left: 2px solid var(--doc-ember);
        max-width: 46rem;
        font-family: 'Newsreader', Georgia, serif;
        font-size: clamp(1.15rem, 2.2vw, 1.6rem);
        line-height: 1.45;
        color: var(--doc-ink);
    }
    .doc-sd__pull--quiet { font-size: clamp(1.05rem, 1.7vw, 1.3rem); }
    .doc-sd__quote {
        margin: 0;
        padding-left: 1.1rem;
        border-left: 1px solid var(--doc-line);
        font-family: 'Newsreader', Georgia, serif;
        font-size: 1rem;
        line-height: 1.6;
        color: var(--doc-muted);
    }
    .doc-sd__quote + .doc-sd__quote { margin-top: 1.5rem; }
    .doc-sd :where(.doc-sd__pull, .doc-sd__quote) cite {
        display: block;
        margin-top: 0.9rem;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-style: normal;
        font-size: 0.5625rem;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: var(--doc-ember);
    }

    /* A remark set apart from the running prose. */
    .doc-sd__note {
        margin: clamp(2rem, 4vw, 3rem) 0 0;
        padding: 1.4rem 1.6rem;
        border: 1px solid var(--doc-line);
        border-left: 3px solid var(--doc-ember);
        border-radius: 2px;
        max-width: 52rem;
        font-size: clamp(0.98rem, 1.4vw, 1.08rem);
        line-height: 1.75;
        color: var(--doc-muted);
    }

    /* -------------------------------- Bands -------------------------------- */
    .doc-sd__band {
        padding: clamp(3rem, 7vw, 5.5rem) clamp(1.5rem, 6vw, 7rem);
        border-bottom: 1px solid var(--doc-line);
        background: var(--doc-bg);
        scroll-margin-top: calc(var(--nav-h) + 1rem);
        opacity: 0;
        transform: translateY(24px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    .doc-sd__band:global(.is-in) { opacity: 1; transform: none; }
    .doc-sd__band--alt { background: var(--doc-bg-2); }
    .doc-sd__wrap { max-width: 78rem; }

    .doc-sd__cols { max-width: 46rem; }
    @media (min-width: 1000px) {
        .doc-sd__cols {
            max-width: none;
            columns: 2;
            column-gap: clamp(2rem, 4vw, 3.5rem);
        }
        .doc-sd__cols .doc-sd__body + .doc-sd__body { margin-top: 1.15rem; }
    }

    .doc-sd__prose { max-width: 42rem; }
    .doc-sd__prose--wide { max-width: 48rem; }

    .doc-sd__split {
        display: grid;
        gap: clamp(2rem, 4vw, 3.5rem);
    }
    @media (min-width: 960px) {
        .doc-sd__split { grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr); }
        .doc-sd__split--roll { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }
    }
    .doc-sd__split--reading { margin-top: clamp(2.5rem, 5vw, 4rem); }

    .doc-sd__aside {
        align-self: start;
        padding: clamp(1.4rem, 2.5vw, 2rem);
        border: 1px solid var(--doc-line);
        border-radius: 2px;
        background: var(--doc-bg-3, var(--doc-bg));
    }
    .doc-sd__aside-k {
        margin: 0 0 1.4rem;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.5625rem;
        letter-spacing: 0.28em;
        text-transform: uppercase;
        color: var(--doc-ember);
    }

    /* Something set off from the band it sits in — a follow-on point. */
    .doc-sd__turn {
        margin-top: clamp(2.5rem, 5vw, 4rem);
        padding-top: clamp(2rem, 4vw, 3rem);
        border-top: 1px solid var(--doc-line);
        max-width: 52rem;
    }

    /* ------------------------------- Timeline ------------------------------- */
    .doc-sd__track {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: 0;
        border-top: 1px solid var(--doc-line);
    }
    @media (min-width: 1100px) {
        .doc-sd__track {
            grid-template-columns: repeat(7, minmax(0, 1fr));
            border-top: none;
        }
    }
    .doc-sd__stop {
        padding: 1.4rem 0;
        border-bottom: 1px solid var(--doc-line);
    }
    @media (min-width: 1100px) {
        .doc-sd__stop {
            padding: 1.2rem 1rem 1.6rem 0;
            border-bottom: none;
            border-top: 1px solid var(--doc-line);
        }
        /* The one slot that matters is drawn, not just labelled. */
        .doc-sd__stop--here { border-top-color: var(--doc-ember); border-top-width: 2px; }
    }
    .doc-sd__stop--here { border-bottom-color: var(--doc-ember); }
    .doc-sd__stop-era {
        display: block;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.5625rem;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        color: var(--doc-dim);
        margin-bottom: 0.7rem;
    }
    .doc-sd__stop--here .doc-sd__stop-era { color: var(--doc-ember); }
    .doc-sd__stop-title {
        font-size: clamp(1.05rem, 1.7vw, 1.22rem);
        line-height: 1.2;
        margin-bottom: 0.6rem !important;
    }
    .doc-sd__stop-note {
        margin: 0;
        font-size: 0.9rem;
        line-height: 1.65;
        color: var(--doc-muted);
    }
    .doc-sd__flag {
        margin: 0.9rem 0 0;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.5rem;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: var(--doc-ember);
    }

    /* --------------------------- Definition blocks --------------------------- */
    .doc-sd__keys {
        margin: clamp(2rem, 4vw, 3rem) 0 0;
        display: grid;
        gap: 0;
        align-content: start;
    }
    @media (min-width: 960px) {
        .doc-sd__keys--pair {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            column-gap: clamp(2rem, 4vw, 3.5rem);
        }
    }
    .doc-sd__split .doc-sd__keys { margin-top: 0; }
    .doc-sd__key {
        display: grid;
        gap: 0.5rem;
        padding: 1.2rem 0;
        border-top: 1px solid var(--doc-line);
        align-content: start;
    }
    .doc-sd__keys > .doc-sd__key:last-child { border-bottom: 1px solid var(--doc-line); }
    .doc-sd__keys dt {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.5625rem;
        letter-spacing: 0.26em;
        text-transform: uppercase;
        color: var(--doc-ember);
    }
    .doc-sd__keys dd {
        margin: 0;
        font-size: 0.95rem;
        line-height: 1.7;
        color: var(--doc-muted);
    }
    .doc-sd__key-refs {
        display: block;
        margin-top: 0.55rem;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.5rem;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: var(--doc-dim);
    }

    /* --------------------------------- Cards --------------------------------- */
    .doc-sd__grid {
        display: grid;
        gap: clamp(1.25rem, 2.5vw, 2rem);
        margin-top: clamp(2rem, 4vw, 3rem);
    }
    @media (min-width: 760px) {
        .doc-sd__grid--2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .doc-sd__grid--4 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }
    @media (min-width: 1000px) {
        .doc-sd__grid--3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        .doc-sd__grid--4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
    }
    .doc-sd__card {
        display: flex;
        flex-direction: column;
        padding: clamp(1.4rem, 2.5vw, 2rem);
        border: 1px solid var(--doc-line);
        border-radius: 2px;
        background: var(--doc-bg-3, var(--doc-bg));
    }
    .doc-sd__card--face { border-top: 2px solid var(--doc-ember); }
    .doc-sd__card--slim { padding: 1.3rem 1.4rem; }
    .doc-sd__card .doc-sd__refs { margin-top: auto; padding-top: 1.2rem; }
    .doc-sd__card-k {
        margin: 0 0 0.85rem;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.5625rem;
        letter-spacing: 0.26em;
        text-transform: uppercase;
        color: var(--doc-dim);
    }
    .doc-sd__card-title {
        font-size: clamp(1.25rem, 2.2vw, 1.6rem);
        line-height: 1.15;
        margin-bottom: 0.95rem !important;
    }
    .doc-sd__card-title--sm { font-size: clamp(1.1rem, 1.7vw, 1.3rem); }

    /* -------------------------------- Reasons -------------------------------- */
    .doc-sd__reasons {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: clamp(1.75rem, 3vw, 2.5rem);
    }
    @media (min-width: 860px) {
        .doc-sd__reasons { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }
    @media (min-width: 1240px) {
        .doc-sd__reasons { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    }
    /* The three-line statement of the rule, which wants its three columns
       sooner than the six-item lists do. */
    .doc-sd__reasons--3 { margin-bottom: clamp(2.5rem, 5vw, 4rem); }
    @media (min-width: 860px) {
        .doc-sd__reasons--3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    }
    .doc-sd__reason {
        padding-top: 1.1rem;
        border-top: 1px solid var(--doc-ember);
        display: flex;
        flex-direction: column;
    }
    .doc-sd__reason-n {
        display: block;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.24em;
        color: var(--doc-ember);
        margin-bottom: 0.85rem;
    }
    .doc-sd__reason-title {
        font-size: clamp(1.15rem, 2vw, 1.4rem);
        line-height: 1.18;
        margin-bottom: 0.8rem !important;
    }
    .doc-sd__reason .doc-sd__refs { margin-top: auto; padding-top: 1.1rem; }

    /* ------------------------------- Tribe roll ------------------------------- */
    .doc-sd__roll { list-style: none; margin: 0; padding: 0; }
    .doc-sd__tribe {
        display: grid;
        grid-template-columns: 2.6rem minmax(0, 1fr);
        gap: 0.2rem 0.9rem;
        padding: 0.85rem 0;
        border-top: 1px solid var(--doc-line);
        align-items: baseline;
    }
    .doc-sd__tribe:last-child { border-bottom: 1px solid var(--doc-line); }
    .doc-sd__tribe-n {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.5625rem;
        letter-spacing: 0.2em;
        color: var(--doc-dim);
    }
    .doc-sd__tribe-name {
        font-family: 'Newsreader', Georgia, serif;
        font-size: clamp(1.1rem, 1.8vw, 1.35rem);
        color: var(--doc-ink);
    }
    .doc-sd__tribe-note {
        grid-column: 2;
        font-size: 0.88rem;
        line-height: 1.6;
        color: var(--doc-muted);
    }

    .doc-sd__aside--absent { display: grid; gap: 1.75rem; align-content: start; }
    .doc-sd__absent { padding-top: 1.1rem; border-top: 1px solid var(--doc-ember); }
    .doc-sd__absent-name {
        font-size: clamp(1.3rem, 2.4vw, 1.75rem);
        margin-bottom: 0.75rem !important;
        /* Struck through, because that is what the list does to them. */
        text-decoration: line-through;
        text-decoration-color: var(--doc-ember);
        text-decoration-thickness: 1px;
    }

    /* -------------------------------- The case -------------------------------- */
    .doc-sd__case + .doc-sd__case {
        margin-top: clamp(3rem, 6vw, 5rem);
        padding-top: clamp(3rem, 6vw, 5rem);
        border-top: 1px solid var(--doc-line);
    }

    /* -------------------------------- Claims -------------------------------- */
    .doc-sd__claims { display: grid; gap: clamp(1.25rem, 2.5vw, 1.75rem); }
    .doc-sd__claim {
        display: grid;
        gap: 1.1rem;
        padding: clamp(1.4rem, 2.5vw, 1.9rem);
        border: 1px solid var(--doc-line);
        border-radius: 2px;
        background: var(--doc-bg-2);
    }
    @media (min-width: 900px) {
        .doc-sd__claim { grid-template-columns: minmax(0, 1fr) minmax(0, 1.45fr); gap: clamp(1.5rem, 3vw, 2.5rem); }
    }
    .doc-sd__claim-text {
        margin: 0;
        font-family: 'Newsreader', Georgia, serif;
        font-style: italic;
        font-size: clamp(1.05rem, 1.8vw, 1.28rem);
        line-height: 1.5;
        color: var(--doc-ink);
    }
    .doc-sd__claim-ans { display: grid; gap: 0.7rem; align-content: start; }
    .doc-sd__claim-k {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.5625rem;
        letter-spacing: 0.28em;
        text-transform: uppercase;
        color: var(--doc-ember);
    }

    /* --------------------------------- Chain --------------------------------- */
    .doc-sd__chain {
        display: grid;
        gap: clamp(1.25rem, 2.5vw, 2rem);
        margin-bottom: clamp(2rem, 4vw, 3rem);
    }
    @media (min-width: 1000px) {
        .doc-sd__chain { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    }
    .doc-sd__quote--chain { border-left-color: var(--doc-ember); }
    .doc-sd__chain .doc-sd__quote + .doc-sd__quote { margin-top: 0; }

    /* -------------------------------- Closing -------------------------------- */
    .doc-sd__close {
        padding: clamp(3.5rem, 8vw, 6rem) clamp(1.5rem, 6vw, 7rem) clamp(4rem, 9vw, 8rem);
        max-width: 68rem;
        scroll-margin-top: calc(var(--nav-h) + 1rem);
        opacity: 0;
        transform: translateY(24px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    .doc-sd__close:global(.is-in) { opacity: 1; transform: none; }
    .doc-sd__close-title {
        font-size: clamp(1.9rem, 4vw, 3rem);
        line-height: 1.1;
        margin-bottom: 1.5rem !important;
    }
    .doc-sd__close .doc-sd__prose { margin-top: clamp(1.75rem, 3vw, 2.5rem); }
    .doc-sd__actions { display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 2.5rem; }
    .doc-sd__btn {
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
    .doc-sd__btn:hover { border-color: var(--doc-ember); color: var(--doc-ember-soft); }
    .doc-sd__btn svg { width: 1rem; height: 1rem; transition: transform 0.3s ease; }
    .doc-sd__btn:hover svg { transform: translateX(4px); }
    .doc-sd__btn--quiet { color: var(--doc-muted); }

    @media (prefers-reduced-motion: reduce) {
        .doc-sd__band,
        .doc-sd__close { opacity: 1; transform: none; transition: none; }
        .doc-sd :where(a, svg) { transition: none !important; }
    }
</style>
