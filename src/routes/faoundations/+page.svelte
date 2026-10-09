<script>
    import Seo from '$lib/components/Seo.svelte';
    import {
        FOUNDATIONS_SUBTITLE,
        FRAGMENTS,
        UNFINISHED,
        QUESTIONS,
        BASIS,
        METHOD,
        CHARGES,
        RESPONSE,
        JUDGMENTS,
        TIMELINE,
        ON_TRIAL,
        DANIEL,
        PARALLEL,
        CARRY_FORWARD,
        NEXT
    } from '$lib/data/foundations.js';
    import HeroExpand from '$lib/components/HeroExpand.svelte';
    import { biblehubUrl } from '$lib/utils/biblehub.js';

    // The same reveal treatment the beast, seals and churches pages use, so a
    // reader moving between the studies meets one rhythm.
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

    /** @param {number} i */
    const pad = (i) => String(i).padStart(2, '0');

    const HERO_ALT = 'Two winged warriors meet in the sky - one in white and gold with sword and shield, one in black armour with raised blade - while smaller angels fight around them';
</script>

<!-- Every citation opens its verse on Bible Hub, in a new tab so the reader
     keeps their place in the study. -->
{#snippet verseLink(/** @type {string} */ reference)}
    {@const href = biblehubUrl(reference)}
    {#if href}
        <a class="doc-fd__verse-link" {href} target="_blank" rel="noopener noreferrer">{reference}</a>
    {:else}
        {reference}
    {/if}
{/snippet}

<Seo
    title="Foundations — Before You Read Revelation"
    description="What every reader of Revelation should know first: a war over God's character, government and justice, fought with lies and answered with truth, settled by three judgments — and mapped in advance by Daniel 7."
    keywords="how to understand revelation, great controversy, war in heaven, character of god, government of god, judgment, daniel 7, revelation 4 and 5, romans 3:4, ephesians 3:10"
    image="/war.jpg"
/>


<div class="doc-fd">
    <main>
        <!-- ============================== HERO ============================== -->
        <section class="doc-fd__hero">
            <img class="doc-fd__hero-img" src="/war.jpg" alt={HERO_ALT} fetchpriority="high" />
            <span class="doc-fd__hero-veil" aria-hidden="true"></span>

            <div class="doc-fd__hero-text">
                <p class="doc-fd__eyebrow">Before you read Revelation</p>
                <h1 class="doc-fd__title">The <span class="doc-fd__em">Foundations</span></h1>
                <p class="doc-fd__lede">{FOUNDATIONS_SUBTITLE}</p>
                <p class="doc-fd__credit">
                    An artist’s impression. The painters give this war swords - the study below
                    argues it is fought with words.
                </p>
            </div>

            <HeroExpand
                src="/war.jpg"
                alt={HERO_ALT}
                caption="The war in heaven - an artist’s impression."
            />
        </section>

        <!-- =========================== THE WHOLE ============================ -->
        <section class="doc-fd__whole" use:reveal>
            <div>
                <p class="doc-fd__eyebrow">Why the usual readings fail</p>
                <p class="doc-fd__body">{FRAGMENTS.body}</p>
                <ul class="doc-fd__chips" aria-label="Fragments mistaken for the whole">
                    {#each FRAGMENTS.examples as fragment}
                        <li>{fragment}</li>
                    {/each}
                </ul>
            </div>
            <div class="doc-fd__thesis">
                <p class="doc-fd__thesis-line">{FRAGMENTS.thesis}</p>
                <p class="doc-fd__thesis-note">{FRAGMENTS.thesisNote}</p>
            </div>
        </section>

        <!-- ====================== THE CONFLICT IS NOT OVER ===================== -->
        <section class="doc-fd__frame" use:reveal>
            <div class="doc-fd__frame-text">
                <p class="doc-fd__eyebrow">The conflict is not over</p>
                <h2 class="doc-fd__h2">A war that extends <span class="doc-fd__em">beyond Earth.</span></h2>
                <p class="doc-fd__body">{UNFINISHED.body}</p>
                <ul class="doc-fd__evidence">
                    {#each UNFINISHED.evidence as line}
                        <li>{line}</li>
                    {/each}
                </ul>
                <p class="doc-fd__body">{UNFINISHED.close}</p>
            </div>

            <nav class="doc-fd__questions" aria-label="The six questions">
                <p class="doc-fd__label">Six questions frame the background</p>
                <ol>
                    {#each QUESTIONS as item, i}
                        <li>
                            <a href={item.href}>
                                <span class="doc-fd__qn">Q{pad(i + 1)}</span>
                                <span class="doc-fd__qt">{item.q}</span>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v14m0 0l-6-6m6 6l6-6" />
                                </svg>
                            </a>
                        </li>
                    {/each}
                </ol>
            </nav>
        </section>

        <!-- ========================= 01 · THE BASIS ========================= -->
        <section class="doc-fd__sec" id="basis" use:reveal>
            <header class="doc-fd__sec-head">
                <p class="doc-fd__q">Q01 · {QUESTIONS[0].q}</p>
                <h2 class="doc-fd__h2">God does not rule <span class="doc-fd__em">by force.</span></h2>
            </header>

            <div class="doc-fd__contrast">
                <article class="doc-fd__side doc-fd__side--false">
                    <p class="doc-fd__label">{BASIS.assumption.label}</p>
                    <h3 class="doc-fd__side-title">{BASIS.assumption.title}</h3>
                    <p class="doc-fd__body">{BASIS.assumption.body}</p>
                </article>
                <article class="doc-fd__side doc-fd__side--true">
                    <p class="doc-fd__label">{BASIS.foundation.label}</p>
                    <h3 class="doc-fd__side-title">{BASIS.foundation.title}</h3>
                    <p class="doc-fd__body">{BASIS.foundation.body}</p>
                </article>
            </div>

            <p class="doc-fd__statement">{BASIS.close}</p>
            <span class="doc-fd__ghost" aria-hidden="true">01</span>
        </section>

        <!-- ========================= 02 · THE METHOD ======================== -->
        <section class="doc-fd__sec doc-fd__sec--alt" id="method" use:reveal>
            <header class="doc-fd__sec-head">
                <p class="doc-fd__q">Q02 · {QUESTIONS[1].q}</p>
                <h2 class="doc-fd__h2">Satan’s weapon is <span class="doc-fd__em">propaganda.</span></h2>
            </header>

            <div class="doc-fd__split">
                <div>
                    <p class="doc-fd__body">{METHOD.body}</p>
                    <p class="doc-fd__statement doc-fd__statement--tight">{METHOD.close}</p>
                </div>

                <div class="doc-fd__eden">
                    <p class="doc-fd__label">The pattern, already visible in Eden</p>
                    {#each METHOD.eden as step}
                        <div class="doc-fd__eden-step">
                            <blockquote class="doc-fd__pull">
                                <p>“{step.line}”</p>
                                {#if step.reference}<cite>{@render verseLink(step.reference)}</cite>{/if}
                            </blockquote>
                            <p class="doc-fd__effect">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m0 0l-6-6m6 6l-6 6" />
                                </svg>
                                <span>{step.effect}</span>
                            </p>
                        </div>
                    {/each}
                </div>
            </div>
            <span class="doc-fd__ghost" aria-hidden="true">02</span>
        </section>

        <!-- ======================== 03 · THE CHARGES ======================== -->
        <section class="doc-fd__sec" id="charges" use:reveal>
            <header class="doc-fd__sec-head">
                <p class="doc-fd__q">Q03 · {QUESTIONS[2].q}</p>
                <h2 class="doc-fd__h2">Three charges <span class="doc-fd__em">against God.</span></h2>
                <p class="doc-fd__lede doc-fd__lede--page">
                    Satan, once a privileged angel with access to the throne, attacked God on three
                    fronts.
                </p>
            </header>

            <ol class="doc-fd__charges">
                {#each CHARGES as charge, i}
                    <li class="doc-fd__charge">
                        <span class="doc-fd__num">{pad(i + 1)}</span>
                        <h3 class="doc-fd__charge-title">{charge.name}</h3>
                        <p class="doc-fd__ref">{@render verseLink(charge.refs)}</p>
                        {#if charge.quote}
                            <blockquote class="doc-fd__inline-quote">“{charge.quote}”</blockquote>
                        {/if}
                        <p class="doc-fd__body">{charge.body}</p>
                    </li>
                {/each}
            </ol>

            <p class="doc-fd__statement">
                Character, government, justice: those are the issues still on the table.
            </p>
            <span class="doc-fd__ghost" aria-hidden="true">03</span>
        </section>

        <!-- ======================= 04 · THE RESPONSE ======================== -->
        <section class="doc-fd__sec doc-fd__sec--alt" id="response" use:reveal>
            <header class="doc-fd__sec-head">
                <p class="doc-fd__q">Q04 · {QUESTIONS[3].q}</p>
                <h2 class="doc-fd__h2">God answers with truth - <span class="doc-fd__em">and with His Son.</span></h2>
            </header>

            <div class="doc-fd__split">
                <div class="doc-fd__stack">
                    <p class="doc-fd__body doc-fd__body--ink">{RESPONSE.body}</p>
                    <blockquote class="doc-fd__pull">
                        <p>“{RESPONSE.weapon.quote}”</p>
                        <cite>{@render verseLink(RESPONSE.weapon.reference)}</cite>
                    </blockquote>
                    <p class="doc-fd__body">{RESPONSE.weapon.note}</p>
                </div>

                <div class="doc-fd__stack">
                    <p class="doc-fd__label">Christ is the answer to the first charge</p>
                    {#each RESPONSE.verses as verse}
                        <blockquote class="doc-fd__verse">
                            <p>“{verse.quote}”</p>
                            <cite>{@render verseLink(verse.reference)}</cite>
                        </blockquote>
                    {/each}
                    <p class="doc-fd__body">{RESPONSE.calvary}</p>
                </div>
            </div>

            <!-- Where the three charges stand, as the study leaves them. -->
            <div class="doc-fd__ledger">
                <p class="doc-fd__label">The three charges, as they stand</p>
                <ul>
                    {#each CHARGES as charge}
                        <li class="doc-fd__ledger-row" class:is-answered={charge.answered}>
                            <span class="doc-fd__ledger-mark" aria-hidden="true">
                                {#if charge.answered}
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M5 13l4 4L19 7" />
                                    </svg>
                                {/if}
                            </span>
                            <span class="doc-fd__ledger-name">{charge.name}</span>
                            <span class="doc-fd__ledger-status">{charge.status}</span>
                        </li>
                    {/each}
                </ul>
                <p class="doc-fd__body">{RESPONSE.open}</p>
            </div>

            <div class="doc-fd__church">
                <blockquote class="doc-fd__quote">
                    <p>“{RESPONSE.church.quote}”</p>
                    <cite>{@render verseLink(RESPONSE.church.reference)}</cite>
                </blockquote>
                <div>
                    <p class="doc-fd__body">{RESPONSE.church.note}</p>
                    <p class="doc-fd__statement doc-fd__statement--tight">That is what Revelation is about.</p>
                </div>
            </div>
            <span class="doc-fd__ghost" aria-hidden="true">04</span>
        </section>

        <!-- ======================= 05 · THE JUDGMENTS ======================= -->
        <section class="doc-fd__sec" id="judgment" use:reveal>
            <header class="doc-fd__sec-head">
                <p class="doc-fd__q">Q05 · {QUESTIONS[4].q}</p>
                <h2 class="doc-fd__h2">The issues are settled <span class="doc-fd__em">by judgment.</span></h2>
                <p class="doc-fd__lede doc-fd__lede--page">
                    Everything in this conflict is settled by judgment. Not one judgment, but three.
                </p>
            </header>

            <div class="doc-fd__progress" id="progress">
                <p class="doc-fd__q">Q06 · {QUESTIONS[5].q}</p>
                <ol class="doc-fd__timeline">
                    {#each JUDGMENTS as judgment}
                        <li class="doc-fd__judgment" data-phase={judgment.phase}>
                            <span class="doc-fd__node" aria-hidden="true">{judgment.numeral}</span>
                            <p class="doc-fd__phase">{judgment.phaseLabel}</p>
                            <h3 class="doc-fd__judgment-title">{judgment.name}</h3>
                            <blockquote class="doc-fd__verse">
                                <p>“{judgment.quote}”</p>
                                <cite>{@render verseLink(judgment.reference)}</cite>
                            </blockquote>
                            <p class="doc-fd__body">{judgment.body}</p>
                        </li>
                    {/each}
                </ol>
                <p class="doc-fd__timeline-note">
                    <span class="doc-fd__ref">{@render verseLink(TIMELINE.reference)}</span>
                    {TIMELINE.body}
                </p>
            </div>
            <span class="doc-fd__ghost" aria-hidden="true">05</span>
        </section>

        <!-- ========================= WHO IS ON TRIAL ======================== -->
        <section class="doc-fd__trial" id="on-trial" use:reveal>
            <p class="doc-fd__eyebrow">Who is on trial?</p>
            <p class="doc-fd__trial-assume">
                {ON_TRIAL.assumption} <em>{ON_TRIAL.question}</em>
                <span>{ON_TRIAL.correction}</span>
            </p>
            <blockquote class="doc-fd__trial-quote">
                <p>“{ON_TRIAL.quote}”</p>
                <cite>{@render verseLink(ON_TRIAL.reference)}</cite>
            </blockquote>
            <p class="doc-fd__body">{ON_TRIAL.body}</p>
            <p class="doc-fd__trial-close">{ON_TRIAL.close}</p>
        </section>

        <!-- ========================== 06 · DANIEL =========================== -->
        <section class="doc-fd__sec" id="daniel" use:reveal>
            <header class="doc-fd__sec-head">
                <p class="doc-fd__q">The key</p>
                <h2 class="doc-fd__h2">Daniel is the key <span class="doc-fd__em">to Revelation.</span></h2>
            </header>

            <div class="doc-fd__split">
                <p class="doc-fd__body">
                    <span class="doc-fd__ref">{@render verseLink(DANIEL.sealedRef)}</span>
                    {DANIEL.sealed}
                </p>
                <p class="doc-fd__statement doc-fd__statement--tight">{DANIEL.conclusion}</p>
            </div>

            <div class="doc-fd__kingdoms-wrap">
                <p class="doc-fd__label">Daniel 7 · Five kingdoms, not four</p>
                <ol class="doc-fd__kingdoms">
                    {#each DANIEL.kingdoms as kingdom, i}
                        <li class="doc-fd__kingdom" class:is-fifth={kingdom.fifth}>
                            <span class="doc-fd__num">{pad(i + 1)}</span>
                            <span class="doc-fd__kingdom-beast">{kingdom.beast}</span>
                            <span class="doc-fd__kingdom-name">{kingdom.empire}</span>
                        </li>
                    {/each}
                </ol>
            </div>

            <div class="doc-fd__court">
                <p class="doc-fd__body">{DANIEL.court}</p>
                <ol class="doc-fd__verdicts">
                    {#each DANIEL.verdicts as verdict, i}
                        <li>
                            <span class="doc-fd__num">Verdict {pad(i + 1)}</span>
                            <p class="doc-fd__ref">{@render verseLink(verdict.reference)}</p>
                            <p class="doc-fd__body doc-fd__body--ink">{verdict.body}</p>
                        </li>
                    {/each}
                </ol>
            </div>
            <span class="doc-fd__ghost" aria-hidden="true">06</span>
        </section>

        <!-- ======================= THE SAME COURTROOM ======================= -->
        <section class="doc-fd__parallel" use:reveal>
            <div class="doc-fd__parallel-head">
                <p class="doc-fd__eyebrow">Revelation 4–5 is the same scene</p>
                <h2 class="doc-fd__h2">What John sees is what <span class="doc-fd__em">Daniel saw.</span></h2>
            </div>

            <table class="doc-fd__table">
                <thead>
                    <tr>
                        <th scope="col">Daniel 7</th>
                        <th scope="col">Revelation 4–5</th>
                    </tr>
                </thead>
                <tbody>
                    {#each PARALLEL as row}
                        <tr>
                            <td data-label="Daniel 7">{row.daniel}</td>
                            <td data-label="Revelation 4–5">{row.revelation}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>

            <p class="doc-fd__statement">
                Revelation is Daniel 7 in close-up: the judgment between the beast and the kingdom
                of Christ, given in greater detail.
            </p>
        </section>

        <!-- ======================== CARRY FORWARD =========================== -->
        <section class="doc-fd__carry" use:reveal>
            <div class="doc-fd__carry-head">
                <p class="doc-fd__eyebrow">What to carry forward</p>
                <h2 class="doc-fd__h2">This is only <span class="doc-fd__em">the foundation.</span></h2>
                <p class="doc-fd__lede doc-fd__lede--page">The rest of Revelation is built on it.</p>
            </div>

            <ol class="doc-fd__takeaways">
                {#each CARRY_FORWARD as point, i}
                    <li>
                        <span class="doc-fd__num">{pad(i + 1)}</span>
                        <span>{point}</span>
                    </li>
                {/each}
            </ol>
        </section>

        <!-- ============================== NEXT ============================== -->
        <section class="doc-fd__next">
            <p class="doc-fd__eyebrow">Build on it</p>
            <ul class="doc-fd__nextlist">
                {#each NEXT as link}
                    <li>
                        <a href={link.href} class="doc-fd__nextlink">
                            <span class="doc-fd__next-label">
                                {link.label}
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m0 0l-6-6m6 6l-6 6" />
                                </svg>
                            </span>
                            <span class="doc-fd__next-note">{link.note}</span>
                        </a>
                    </li>
                {/each}
            </ul>
        </section>
    </main>
</div>

<style>
    .doc-fd {
        --nav-h: 5.2rem;
        --gutter: clamp(1.5rem, 6vw, 7rem);
        min-height: 100vh;
        background: var(--doc-bg);
        color: var(--doc-ink);
        padding-top: var(--nav-h);
        font-family: 'Public Sans', sans-serif;
        transition: background 0.4s ease, color 0.4s ease;
        overflow-x: clip;
    }
    .doc-fd :where(h1, h2, h3) {
        font-family: 'Newsreader', Georgia, serif;
        font-weight: 400;
        color: var(--doc-ink);
        letter-spacing: -0.018em;
        line-height: 1.05;
        margin: 0;
    }

    /* Sections fade up as they arrive, the same as the other studies. */
    main > section { transition: opacity 0.8s ease, transform 0.8s ease; }
    main > section:not(.doc-fd__hero):not(.doc-fd__next):not(:global(.is-in)) {
        opacity: 0;
        transform: translateY(24px);
    }

    /* ------------------------------ Shared type ------------------------------ */
    .doc-fd__eyebrow {
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
    .doc-fd__eyebrow::before {
        content: '';
        width: 28px;
        height: 1px;
        background: var(--doc-ember);
        opacity: 0.7;
    }
    .doc-fd__em { font-style: italic; font-weight: 300; color: var(--doc-ember-soft); }
    .doc-fd__h2 {
        font-size: clamp(1.8rem, 4vw, 2.9rem);
        line-height: 1.08 !important;
    }
    .doc-fd__lede {
        font-size: clamp(1rem, 1.6vw, 1.2rem);
        color: var(--doc-muted);
        max-width: 44rem;
        line-height: 1.7;
        margin: 0;
    }
    .doc-fd__lede--page { margin-top: 1.25rem; }
    .doc-fd__body {
        font-size: clamp(0.98rem, 1.4vw, 1.08rem);
        line-height: 1.75;
        color: var(--doc-muted);
        margin: 0;
        max-width: 40rem;
    }
    .doc-fd__body--ink { color: var(--doc-ink); }
    .doc-fd__label {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        color: var(--doc-dim);
        margin: 0 0 1.25rem;
    }
    .doc-fd__num {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.6875rem;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: var(--doc-ember);
        display: block;
    }
    .doc-fd__ref {
        display: block;
        font-family: 'Newsreader', Georgia, serif;
        font-style: italic;
        font-size: 0.95rem;
        color: var(--doc-ember-soft);
        margin: 0 0 0.6rem;
    }
    .doc-fd__statement {
        font-family: 'Newsreader', Georgia, serif;
        font-size: clamp(1.3rem, 2.6vw, 1.85rem);
        line-height: 1.35;
        color: var(--doc-ink);
        max-width: 46rem;
        margin: clamp(2.5rem, 5vw, 3.5rem) 0 0;
        padding-top: 1.5rem;
        border-top: 1px solid var(--doc-line);
    }
    .doc-fd__statement--tight { margin-top: 1.75rem; }
    .doc-fd cite {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        font-style: normal;
        color: var(--doc-dim);
    }
    /* Citations keep the look of the text they sit in, and show the link on
       hover with an ember underline. */
    .doc-fd__verse-link {
        color: inherit;
        text-decoration: underline;
        text-decoration-color: var(--doc-line);
        text-decoration-thickness: 1px;
        text-underline-offset: 0.2em;
        transition: color 0.3s ease, text-decoration-color 0.3s ease;
    }
    .doc-fd__verse-link:hover,
    .doc-fd__verse-link:focus-visible {
        color: var(--doc-ember-soft);
        text-decoration-color: var(--doc-ember);
    }

    /* Quotations, in three weights: a pull quote with the ember rule, a quieter
       verse, and the one full-voice quotation per section. */
    .doc-fd__pull,
    .doc-fd__quote {
        margin: 0;
        padding-left: clamp(1rem, 2vw, 1.5rem);
        border-left: 3px solid var(--doc-ember);
    }
    .doc-fd__pull p,
    .doc-fd__quote p {
        font-family: 'Newsreader', Georgia, serif;
        font-style: italic;
        font-size: clamp(1.1rem, 2.2vw, 1.45rem);
        line-height: 1.45;
        color: var(--doc-ink);
        margin: 0 0 0.75rem;
    }
    .doc-fd__quote p { font-size: clamp(1.25rem, 2.8vw, 1.9rem); line-height: 1.38; }
    .doc-fd__verse { margin: 0; }
    .doc-fd__verse p {
        font-family: 'Newsreader', Georgia, serif;
        font-style: italic;
        font-size: 1.1rem;
        line-height: 1.55;
        color: var(--doc-ink);
        margin: 0 0 0.5rem;
    }

    /* --------------------------------- Hero --------------------------------- */
    .doc-fd__hero {
        position: relative;
        display: flex;
        align-items: flex-end;
        min-height: clamp(26rem, 78vh, 46rem);
        overflow: hidden;
        border-bottom: 1px solid var(--doc-line);
    }
    /* The hero owns the hover; the hint only obeys it. */
    .doc-fd__hero:hover :global(.hero-expand__hint) { opacity: 1; transform: none; }
    .doc-fd__hero-img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: 55% 30%;
        filter: contrast(1.05) saturate(0.9) brightness(0.72);
        z-index: 0;
    }
    .doc-fd__hero-veil {
        position: absolute;
        inset: 0;
        z-index: 1;
        background:
            linear-gradient(to top, rgba(11, 11, 13, 0.96) 0%, rgba(11, 11, 13, 0.55) 42%, rgba(11, 11, 13, 0.2) 100%),
            linear-gradient(to right, rgba(11, 11, 13, 0.75) 0%, transparent 65%);
    }
    .doc-fd__hero-text {
        position: relative;
        z-index: 2;
        max-width: 48rem;
        padding: clamp(2.5rem, 7vw, 5rem) var(--gutter) clamp(3.5rem, 7vw, 5rem);
    }
    .doc-fd__title {
        font-size: clamp(3rem, 10vw, 7rem);
        line-height: 0.95;
        margin-bottom: 1.75rem !important;
    }
    /* The hero stays dark in both themes, so its type is pinned to the dark
       palette rather than following the page. */
    .doc-fd__hero-text .doc-fd__title { color: #f1ebe0; }
    .doc-fd__hero-text .doc-fd__em { color: #e3a376; }
    .doc-fd__hero-text .doc-fd__eyebrow { color: #d97a43; }
    .doc-fd__hero-text .doc-fd__eyebrow::before { background: #d97a43; }
    .doc-fd__hero-text .doc-fd__lede { color: rgba(241, 235, 224, 0.8); }
    .doc-fd__credit {
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
        .doc-fd__hero-text { padding-bottom: 6rem; }
    }

    /* ------------------------------- The whole ------------------------------- */
    .doc-fd__whole {
        display: grid;
        gap: clamp(2rem, 5vw, 4rem);
        padding: clamp(3rem, 7vw, 5rem) var(--gutter);
        border-bottom: 1px solid var(--doc-line);
    }
    @media (min-width: 960px) {
        .doc-fd__whole { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); align-items: center; }
    }
    .doc-fd__chips {
        list-style: none;
        margin: 1.75rem 0 0;
        padding: 0;
        display: flex;
        flex-wrap: wrap;
        gap: 0.6rem;
    }
    .doc-fd__chips li {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: var(--doc-dim);
        border: 1px dashed var(--doc-line);
        border-radius: 2px;
        padding: 0.55rem 0.8rem;
    }
    .doc-fd__thesis {
        padding-left: clamp(1rem, 2.5vw, 2rem);
        border-left: 3px solid var(--doc-ember);
    }
    .doc-fd__thesis-line {
        font-family: 'Newsreader', Georgia, serif;
        font-size: clamp(2rem, 5vw, 3.6rem);
        line-height: 1.02;
        letter-spacing: -0.018em;
        color: var(--doc-ink);
        margin: 0 0 1rem;
    }
    .doc-fd__thesis-note {
        font-family: 'Newsreader', Georgia, serif;
        font-style: italic;
        font-size: clamp(1.05rem, 1.8vw, 1.3rem);
        line-height: 1.5;
        color: var(--doc-ember-soft);
        margin: 0;
    }

    /* ------------------------ The conflict is not over ----------------------- */
    .doc-fd__frame {
        display: grid;
        gap: clamp(2.5rem, 5vw, 4.5rem);
        padding: clamp(3rem, 7vw, 5rem) var(--gutter);
        background: var(--doc-bg-2);
        border-bottom: 1px solid var(--doc-line);
    }
    @media (min-width: 960px) {
        .doc-fd__frame { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }
    }
    .doc-fd__frame-text { display: grid; gap: 1.5rem; align-content: start; }
    .doc-fd__frame-text .doc-fd__eyebrow { margin-bottom: 0; }
    .doc-fd__evidence {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: 0.2rem;
    }
    .doc-fd__evidence li {
        font-family: 'Newsreader', Georgia, serif;
        font-size: clamp(1.2rem, 2.2vw, 1.5rem);
        line-height: 1.4;
        color: var(--doc-ink);
        padding: 0.55rem 0 0.55rem 1.1rem;
        border-left: 1px solid var(--doc-ember);
    }

    .doc-fd__questions ol {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    .doc-fd__questions a {
        display: grid;
        grid-template-columns: auto minmax(0, 1fr) auto;
        gap: 1rem;
        align-items: baseline;
        padding: 1.05rem 0;
        border-top: 1px solid var(--doc-line);
        color: var(--doc-ink);
        text-decoration: none;
        transition: border-color 0.3s ease, color 0.3s ease;
    }
    .doc-fd__questions li:last-child a { border-bottom: 1px solid var(--doc-line); }
    .doc-fd__questions a:hover,
    .doc-fd__questions a:focus-visible { border-top-color: var(--doc-ember); color: var(--doc-ember-soft); }
    .doc-fd__qn {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.2em;
        color: var(--doc-ember);
    }
    .doc-fd__qt {
        font-family: 'Newsreader', Georgia, serif;
        font-size: clamp(1.05rem, 1.8vw, 1.25rem);
        line-height: 1.4;
    }
    .doc-fd__questions svg {
        width: 0.9rem;
        height: 0.9rem;
        color: var(--doc-dim);
        align-self: center;
        transition: transform 0.3s ease, color 0.3s ease;
    }
    .doc-fd__questions a:hover svg { transform: translateY(3px); color: var(--doc-ember); }

    /* --------------------------- Numbered sections --------------------------- */
    .doc-fd__sec {
        position: relative;
        padding: clamp(3.5rem, 8vw, 6rem) var(--gutter);
        border-bottom: 1px solid var(--doc-line);
        scroll-margin-top: var(--nav-h);
        overflow: hidden;
    }
    .doc-fd__sec--alt { background: var(--doc-bg-2); }
    .doc-fd__sec > :not(.doc-fd__ghost) { position: relative; z-index: 1; }
    .doc-fd__sec-head { max-width: 46rem; margin-bottom: clamp(2rem, 5vw, 3.5rem); }
    .doc-fd__q {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.6875rem;
        letter-spacing: 0.2em;
        line-height: 1.7;
        text-transform: uppercase;
        color: var(--doc-ember);
        margin: 0 0 1.25rem;
    }
    /* The section number, set large and faint behind the text. */
    .doc-fd__ghost {
        position: absolute;
        top: clamp(1rem, 3vw, 2rem);
        right: clamp(0.5rem, 3vw, 3rem);
        z-index: 0;
        font-family: 'Newsreader', Georgia, serif;
        font-size: clamp(7rem, 20vw, 16rem);
        line-height: 1;
        color: var(--doc-ink);
        opacity: 0.045;
        pointer-events: none;
        user-select: none;
    }

    .doc-fd__split {
        display: grid;
        gap: clamp(2rem, 5vw, 4rem);
    }
    @media (min-width: 960px) {
        .doc-fd__split { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }
    }
    .doc-fd__stack { display: grid; gap: 1.5rem; align-content: start; }
    .doc-fd__stack .doc-fd__label { margin-bottom: 0; }

    /* 01 — the assumption set against the foundation */
    .doc-fd__contrast {
        display: grid;
        gap: 1.25rem;
    }
    @media (min-width: 860px) {
        .doc-fd__contrast { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }
    }
    .doc-fd__side {
        padding: clamp(1.5rem, 3vw, 2.25rem);
        border: 1px solid var(--doc-line);
        border-radius: 2px;
        display: grid;
        gap: 0.9rem;
        align-content: start;
    }
    .doc-fd__side .doc-fd__label { margin: 0; }
    .doc-fd__side--false .doc-fd__side-title {
        color: var(--doc-muted);
        text-decoration: line-through;
        text-decoration-color: var(--doc-ember);
        text-decoration-thickness: 1px;
    }
    .doc-fd__side--true {
        border-color: var(--doc-ember);
        background: linear-gradient(180deg, rgba(217, 122, 67, 0.08), transparent 70%);
    }
    .doc-fd__side--true .doc-fd__label { color: var(--doc-ember); }
    .doc-fd__side-title {
        font-size: clamp(1.3rem, 2.4vw, 1.7rem);
        line-height: 1.2 !important;
    }

    /* 02 — Eden, line by line */
    .doc-fd__eden { display: grid; gap: 1.75rem; align-content: start; }
    .doc-fd__eden .doc-fd__label { margin: 0; }
    .doc-fd__eden-step { display: grid; gap: 0.85rem; }
    .doc-fd__effect {
        display: grid;
        grid-template-columns: auto minmax(0, 1fr);
        gap: 0.7rem;
        margin: 0;
        padding-left: clamp(1rem, 2vw, 1.5rem);
        color: var(--doc-muted);
        line-height: 1.65;
    }
    .doc-fd__effect svg { width: 0.95rem; height: 0.95rem; color: var(--doc-ember); margin-top: 0.3rem; }

    /* 03 — the three charges */
    .doc-fd__charges {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: clamp(2rem, 4vw, 3rem);
    }
    @media (min-width: 860px) {
        .doc-fd__charges { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    }
    .doc-fd__charge {
        display: flex;
        flex-direction: column;
        border-top: 1px solid var(--doc-line);
        padding-top: 1.5rem;
        transition: border-color 0.4s ease;
    }
    .doc-fd__charge:hover { border-top-color: var(--doc-ember); }
    .doc-fd__charge .doc-fd__num { margin-bottom: 1rem; }
    .doc-fd__charge-title {
        font-size: clamp(1.6rem, 3vw, 2.2rem);
        margin-bottom: 0.4rem !important;
    }
    .doc-fd__inline-quote {
        margin: 0.25rem 0 1rem;
        font-family: 'Newsreader', Georgia, serif;
        font-style: italic;
        font-size: 1.1rem;
        line-height: 1.5;
        color: var(--doc-ink);
    }

    /* 04 — the ledger of charges, and the church */
    .doc-fd__ledger {
        margin-top: clamp(3rem, 6vw, 4.5rem);
        max-width: 46rem;
    }
    .doc-fd__ledger ul { list-style: none; margin: 0 0 1.75rem; padding: 0; }
    .doc-fd__ledger-row {
        display: grid;
        grid-template-columns: auto minmax(0, 1fr) auto;
        gap: 1rem;
        align-items: center;
        padding: 1rem 0;
        border-top: 1px solid var(--doc-line);
    }
    .doc-fd__ledger-row:last-child { border-bottom: 1px solid var(--doc-line); }
    .doc-fd__ledger-mark {
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
        border: 1px dashed var(--doc-dim);
        display: grid;
        place-items: center;
    }
    .doc-fd__ledger-mark svg { width: 0.85rem; height: 0.85rem; }
    .is-answered .doc-fd__ledger-mark {
        border: 1px solid var(--doc-ember);
        background: var(--doc-ember);
        color: var(--doc-bg);
    }
    .doc-fd__ledger-name {
        font-family: 'Newsreader', Georgia, serif;
        font-size: clamp(1.2rem, 2.2vw, 1.5rem);
        color: var(--doc-ink);
    }
    .doc-fd__ledger-status {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.5625rem;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: var(--doc-dim);
        text-align: right;
    }
    .is-answered .doc-fd__ledger-status { color: var(--doc-ember-soft); }

    .doc-fd__church {
        display: grid;
        gap: clamp(1.5rem, 4vw, 3rem);
        margin-top: clamp(3rem, 6vw, 4.5rem);
        padding-top: clamp(2rem, 4vw, 3rem);
        border-top: 1px solid var(--doc-line);
    }
    @media (min-width: 960px) {
        .doc-fd__church { grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr); align-items: end; }
    }

    /* 05 — three judgments on one line */
    .doc-fd__progress { scroll-margin-top: var(--nav-h); }
    .doc-fd__timeline {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: 0;
        position: relative;
    }
    .doc-fd__judgment {
        position: relative;
        display: grid;
        gap: 0.75rem;
        align-content: start;
        padding: 0 0 2.5rem 3.5rem;
    }
    /* The line the three stand on: vertical on small screens, across on wide. */
    .doc-fd__judgment::before {
        content: '';
        position: absolute;
        left: 1.1rem;
        top: 2.2rem;
        bottom: 0;
        width: 1px;
        background: var(--doc-line);
    }
    .doc-fd__judgment:last-child::before { display: none; }
    .doc-fd__node {
        position: absolute;
        left: 0;
        top: 0;
        width: 2.2rem;
        height: 2.2rem;
        border-radius: 50%;
        display: grid;
        place-items: center;
        font-family: 'Newsreader', Georgia, serif;
        font-size: 0.95rem;
        color: var(--doc-ink);
        background: var(--doc-bg);
        border: 1px solid var(--doc-line);
    }
    .doc-fd__phase {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.5625rem;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: var(--doc-dim);
        margin: 0.55rem 0 0;
    }
    .doc-fd__judgment-title { font-size: clamp(1.4rem, 2.6vw, 1.9rem); line-height: 1.15 !important; }
    [data-phase='past'] .doc-fd__node { background: var(--doc-bg-3); color: var(--doc-muted); }
    [data-phase='present'] .doc-fd__node {
        background: var(--doc-ember);
        border-color: var(--doc-ember);
        color: #0b0b0d;
        box-shadow: 0 0 0 6px rgba(217, 122, 67, 0.16);
    }
    [data-phase='present'] .doc-fd__phase { color: var(--doc-ember); }
    [data-phase='future'] .doc-fd__node { border-style: dashed; color: var(--doc-dim); }
    @media (min-width: 900px) {
        .doc-fd__timeline { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: clamp(1.5rem, 3vw, 2.5rem); }
        .doc-fd__judgment { padding: 3.5rem 0 0; }
        .doc-fd__judgment::before {
            left: 2.6rem;
            right: calc(0.4rem - clamp(1.5rem, 3vw, 2.5rem));
            top: 1.1rem;
            bottom: auto;
            width: auto;
            height: 1px;
        }
        .doc-fd__judgment:last-child::before { display: none; }
        .doc-fd__phase { margin-top: 0; }
    }
    .doc-fd__timeline-note {
        max-width: 46rem;
        margin: clamp(1rem, 3vw, 3rem) 0 0;
        padding-top: 1.5rem;
        border-top: 1px solid var(--doc-line);
        color: var(--doc-muted);
        line-height: 1.75;
    }

    /* ---------------------------- Who is on trial ---------------------------- */
    /* The turn the study hangs on — the one section that raises its voice. */
    .doc-fd__trial {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: clamp(4rem, 9vw, 7rem) var(--gutter);
        border-bottom: 1px solid var(--doc-line);
        background:
            radial-gradient(80% 60% at 50% 0%, rgba(217, 122, 67, 0.12), transparent 70%),
            var(--doc-bg);
        scroll-margin-top: var(--nav-h);
    }
    .doc-fd__trial-assume {
        max-width: 36rem;
        margin: 0 0 2.5rem;
        color: var(--doc-muted);
        line-height: 1.7;
    }
    .doc-fd__trial-assume em {
        font-family: 'Newsreader', Georgia, serif;
        font-size: 1.15em;
        color: var(--doc-ink);
    }
    .doc-fd__trial-assume span { display: block; margin-top: 0.35rem; }
    .doc-fd__trial-quote { margin: 0 0 2.5rem; max-width: 52rem; }
    .doc-fd__trial-quote p {
        font-family: 'Newsreader', Georgia, serif;
        font-style: italic;
        font-size: clamp(1.5rem, 3.6vw, 2.6rem);
        line-height: 1.3;
        color: var(--doc-ink);
        margin: 0 0 1.25rem;
    }
    .doc-fd__trial .doc-fd__body { max-width: 38rem; }
    .doc-fd__trial-close {
        font-family: 'Newsreader', Georgia, serif;
        font-size: clamp(1.25rem, 2.4vw, 1.65rem);
        line-height: 1.4;
        color: var(--doc-ember-soft);
        max-width: 40rem;
        margin: 2rem 0 0;
    }

    /* ------------------------------ 06 — Daniel ------------------------------ */
    .doc-fd__kingdoms-wrap { margin-top: clamp(3rem, 6vw, 4.5rem); }
    .doc-fd__kingdoms {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 0.75rem;
    }
    @media (min-width: 700px) { .doc-fd__kingdoms { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
    @media (min-width: 1100px) { .doc-fd__kingdoms { grid-template-columns: repeat(5, minmax(0, 1fr)); } }
    .doc-fd__kingdom {
        display: grid;
        gap: 0.5rem;
        align-content: start;
        padding: 1.25rem;
        border: 1px solid var(--doc-line);
        border-radius: 2px;
        background: var(--doc-bg-2);
    }
    .doc-fd__kingdom-beast {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.5625rem;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: var(--doc-dim);
        line-height: 1.6;
    }
    .doc-fd__kingdom-name {
        font-family: 'Newsreader', Georgia, serif;
        font-size: clamp(1.15rem, 2vw, 1.4rem);
        line-height: 1.2;
        color: var(--doc-ink);
    }
    /* The fifth kingdom is not a beast, and stands apart from the four. */
    .doc-fd__kingdom.is-fifth {
        grid-column: 1 / -1;
        border-color: var(--doc-ember);
        background: linear-gradient(135deg, rgba(217, 122, 67, 0.14), transparent 75%), var(--doc-bg-2);
    }
    .doc-fd__kingdom.is-fifth .doc-fd__kingdom-beast { color: var(--doc-ember); }
    .doc-fd__kingdom.is-fifth .doc-fd__kingdom-name { font-style: italic; color: var(--doc-ember-soft); }
    @media (min-width: 1100px) {
        .doc-fd__kingdom.is-fifth { grid-column: auto; }
    }

    .doc-fd__court {
        display: grid;
        gap: 1.75rem;
        margin-top: clamp(2.5rem, 5vw, 3.5rem);
    }
    .doc-fd__verdicts {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: clamp(1.5rem, 3vw, 2.5rem);
    }
    @media (min-width: 860px) {
        .doc-fd__verdicts { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }
    .doc-fd__verdicts li {
        border-top: 1px solid var(--doc-line);
        padding-top: 1.25rem;
    }
    .doc-fd__verdicts .doc-fd__num { margin-bottom: 0.75rem; }

    /* ------------------------ Daniel 7 and Revelation 4–5 -------------------- */
    .doc-fd__parallel {
        padding: clamp(3.5rem, 8vw, 6rem) var(--gutter);
        background: var(--doc-bg-2);
        border-bottom: 1px solid var(--doc-line);
    }
    .doc-fd__parallel-head { margin-bottom: clamp(2rem, 4vw, 3rem); }
    .doc-fd__table {
        width: 100%;
        max-width: 60rem;
        border-collapse: collapse;
    }
    .doc-fd__table th {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        font-weight: 400;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        color: var(--doc-ember);
        text-align: left;
        padding: 0 1.5rem 1rem 0;
        border-bottom: 1px solid var(--doc-ember);
    }
    .doc-fd__table td {
        font-family: 'Newsreader', Georgia, serif;
        font-size: clamp(1.05rem, 1.8vw, 1.25rem);
        line-height: 1.45;
        color: var(--doc-ink);
        padding: 1.1rem 1.5rem 1.1rem 0;
        border-bottom: 1px solid var(--doc-line);
        vertical-align: top;
        width: 50%;
    }
    .doc-fd__table td:first-child { color: var(--doc-muted); }
    /* Narrow screens: each row becomes a pair, labelled, rather than a table
       that has to scroll sideways. */
    @media (max-width: 640px) {
        .doc-fd__table thead { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
        .doc-fd__table,
        .doc-fd__table tbody,
        .doc-fd__table tr,
        .doc-fd__table td { display: block; width: 100%; }
        .doc-fd__table tr { padding: 1rem 0; border-bottom: 1px solid var(--doc-line); }
        .doc-fd__table td { border: 0; padding: 0.25rem 0; }
        .doc-fd__table td::before {
            content: attr(data-label);
            display: block;
            font-family: 'JetBrains Mono', ui-monospace, monospace;
            font-size: 0.5625rem;
            letter-spacing: 0.22em;
            text-transform: uppercase;
            color: var(--doc-ember);
            margin-bottom: 0.25rem;
        }
    }

    /* ----------------------------- Carry forward ----------------------------- */
    .doc-fd__carry {
        display: grid;
        gap: clamp(2rem, 5vw, 4rem);
        padding: clamp(3.5rem, 8vw, 6rem) var(--gutter);
        border-bottom: 1px solid var(--doc-line);
    }
    @media (min-width: 960px) {
        .doc-fd__carry { grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr); }
    }
    .doc-fd__takeaways {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    .doc-fd__takeaways li {
        display: grid;
        grid-template-columns: auto minmax(0, 1fr);
        gap: 1.25rem;
        align-items: baseline;
        padding: 1.1rem 0;
        border-top: 1px solid var(--doc-line);
        font-family: 'Newsreader', Georgia, serif;
        font-size: clamp(1.1rem, 2vw, 1.35rem);
        line-height: 1.45;
        color: var(--doc-ink);
    }
    .doc-fd__takeaways li:last-child { border-bottom: 1px solid var(--doc-line); }

    /* ---------------------------------- Next --------------------------------- */
    .doc-fd__next {
        padding: clamp(3rem, 6vw, 4.5rem) var(--gutter) clamp(4rem, 9vw, 7rem);
    }
    .doc-fd__nextlist {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: 0;
    }
    @media (min-width: 860px) {
        .doc-fd__nextlist { grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: clamp(2rem, 4vw, 3rem); }
    }
    .doc-fd__nextlink {
        display: grid;
        gap: 0.45rem;
        padding: clamp(1.25rem, 2.5vw, 1.6rem) 0;
        border-top: 1px solid var(--doc-line);
        text-decoration: none;
        transition: border-color 0.35s ease;
    }
    .doc-fd__nextlink:hover { border-top-color: var(--doc-ember); }
    .doc-fd__next-label {
        display: inline-flex;
        align-items: center;
        gap: 0.6rem;
        font-family: 'Newsreader', Georgia, serif;
        font-size: clamp(1.3rem, 2.5vw, 1.7rem);
        color: var(--doc-ink);
        transition: color 0.3s ease;
    }
    .doc-fd__next-label svg { width: 1rem; height: 1rem; color: var(--doc-ember); transition: transform 0.3s ease; }
    .doc-fd__nextlink:hover .doc-fd__next-label { color: var(--doc-ember-soft); }
    .doc-fd__nextlink:hover .doc-fd__next-label svg { transform: translateX(4px); }
    .doc-fd__next-note { color: var(--doc-muted); line-height: 1.6; }

    @media (prefers-reduced-motion: reduce) {
        .doc-fd :where(a, svg, section, li) { transition: none !important; }
    }
</style>
