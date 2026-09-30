<script>
    import Seo from '$lib/components/Seo.svelte';
    import OverviewNav from '$lib/components/OverviewNav.svelte';
    import { DIVISIONS, DIVISION_WIDTHS, OUTLINE_ITEMS } from '$lib/data/revelation-outline.js';
    import {
        INTRO,
        DAY_OF_THE_LORD,
        PREMISES,
        PREMISES_CLOSE,
        STORY,
        AWAKENING,
        HARVEST,
        PATTERN,
        CLOSING
    } from '$lib/data/revelation-study.js';

    // Hover drives the chart on a pointer; a tap pins, which is the same
    // gesture doing the same work where there is no hover.
    let hovered = $state(/** @type {string | null} */ (null));
    let pinned = $state(/** @type {string | null} */ (null));
    let hoveredDivision = $state(/** @type {string | null} */ (null));

    let activeItem = $derived(OUTLINE_ITEMS.find((item) => item.id === (hovered ?? pinned)) ?? null);
    let activeDivision = $derived(hoveredDivision ?? activeItem?.divisionId ?? null);
    let anyActive = $derived(Boolean(activeItem || hoveredDivision));

    let activeDivisionInfo = $derived(DIVISIONS.find((d) => d.id === activeDivision) ?? null);
    // The counterpart step in the other kingdom's trial — the whole point of
    // divisions 2 and 3 standing side by side.
    let counterpart = $derived(
        activeItem?.pair
            ? OUTLINE_ITEMS.find(
                  (item) => item.pair === activeItem?.pair && item.divisionId !== activeItem?.divisionId
              ) ?? null
            : null
    );

    const columns = DIVISION_WIDTHS.map((width) => `${width}fr`).join(' ');

    /** @param {{ id: string, divisionId: string, pair?: number }} item */
    function itemState(item) {
        if (!anyActive) return 'rest';
        if (activeItem?.id === item.id) return 'active';
        if (counterpart?.id === item.id) return 'pair';
        if (item.divisionId === activeDivision) return 'lit';
        return 'dim';
    }

    /** @param {string} id */
    function divisionState(id) {
        if (!anyActive) return 'rest';
        if (id === activeDivision) return 'active';
        if (counterpart?.divisionId === id) return 'pair';
        return 'dim';
    }

    /** @param {string} id */
    function togglePin(id) {
        pinned = pinned === id ? null : id;
    }

    function clearAll() {
        hovered = null;
        hoveredDivision = null;
    }

    // The study around the chart arrives the same way it does on the other
    // pages: a fade up as each section comes into view.
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
    title="The Day of the Lord — The Book of Revelation"
    description="Revelation read as the day of the Lord: seven premises, the book in four divisions, and one history told twice — Christ's kingdom judged in chapters 4–11, the beast's kingdom in 12–19."
    keywords="day of the lord, book of revelation, outline of revelation, seven seals, 144000, mark of the beast, midnight cry, three angels, revelation 17"
/>


<div class="doc-rv">
    <OverviewNav current="revelation" />

    <main>
        <!-- ============================ HEADER ============================ -->
        <section class="doc-rv__head">
            <p class="doc-rv__eyebrow">{INTRO.eyebrow}</p>
            <h1 class="doc-rv__title">The Day of the<br /><span class="doc-rv__em">Lord</span></h1>
            <p class="doc-rv__lede">{INTRO.lede}</p>
            <p class="doc-rv__caveat">{INTRO.caveat}</p>
        </section>

        <!-- ====================== PREMISE 01 · THE DAY ====================== -->
        <section class="doc-rv__day" use:reveal>
            <div class="doc-rv__day-text">
                <p class="doc-rv__eyebrow">{DAY_OF_THE_LORD.eyebrow}</p>
                <h2 class="doc-rv__h2">Revelation is <span class="doc-rv__em">the day of the Lord.</span></h2>

                <div class="doc-rv__verses">
                    {#each DAY_OF_THE_LORD.verses as verse}
                        <blockquote class="doc-rv__quote">
                            <p>“{verse.quote}”</p>
                            <cite>{verse.reference}</cite>
                        </blockquote>
                    {/each}
                </div>

                <p class="doc-rv__body">{DAY_OF_THE_LORD.body}</p>
            </div>

            <div class="doc-rv__day-span">
                <p class="doc-rv__label">The span it covers</p>
                <ol class="doc-rv__span">
                    {#each DAY_OF_THE_LORD.span as step, i}
                        <li>
                            <span class="doc-rv__num">{String(i + 1).padStart(2, '0')}</span>
                            <span>{step}</span>
                        </li>
                    {/each}
                </ol>
                <p class="doc-rv__body">
                    <span class="doc-rv__ref">{DAY_OF_THE_LORD.spanNoteRef}</span>
                    {DAY_OF_THE_LORD.spanNote}
                </p>
                <p class="doc-rv__statement">{DAY_OF_THE_LORD.turn}</p>

                <!-- The verse that puts John himself inside that period. -->
                <div class="doc-rv__john">
                    <blockquote class="doc-rv__quote">
                        <p>“{DAY_OF_THE_LORD.johnQuote}”</p>
                        <cite>{DAY_OF_THE_LORD.johnRef}</cite>
                    </blockquote>
                    <p class="doc-rv__body">{DAY_OF_THE_LORD.johnNote}</p>
                </div>
            </div>
        </section>

        <!-- ========================= PREMISES 02–07 ========================= -->
        <section class="doc-rv__premises" use:reveal>
            <div class="doc-rv__sec-head">
                <p class="doc-rv__eyebrow">Premises 02–07</p>
                <h2 class="doc-rv__h2">Two kingdoms, <span class="doc-rv__em">one history told twice.</span></h2>
            </div>

            <ol class="doc-rv__premiselist">
                {#each PREMISES as premise}
                    <li>
                        <span class="doc-rv__num">{String(premise.num).padStart(2, '0')}</span>
                        <span class="doc-rv__premise-text">{premise.body}</span>
                    </li>
                {/each}
            </ol>

            <p class="doc-rv__statement">{PREMISES_CLOSE}</p>
        </section>

        <!-- ============================= CHART ============================= -->
        <section class="doc-rv__chartwrap">
            <div class="doc-rv__chart-head">
                <p class="doc-rv__eyebrow">The template, drawn</p>
                <h2 class="doc-rv__h2">Twenty-two chapters, <span class="doc-rv__em">four divisions.</span></h2>
                <p class="doc-rv__lede">
                    The two long divisions at the centre are the same trial run twice - the kingdom of
                    Christ, then the kingdom of the beast - and their five steps answer one another
                    point for point. Take any step and its counterpart lights with it.
                </p>
            </div>

            <div class="doc-rv__hint">
                <span>Hover a step to find its counterpart</span>
                <span class="doc-rv__hint-sep" aria-hidden="true">·</span>
                <span>tap or click to pin one</span>
            </div>

            <div class="doc-rv__scroll">
                <div class="doc-rv__chart" role="group" aria-label="The book of Revelation in four divisions" onmouseleave={clearAll}>
                    <!-- Chapter rail: every chapter of the book, grouped under
                         the division it belongs to. -->
                    <div class="doc-rv__rail" style="grid-template-columns: {columns};">
                        {#each DIVISIONS as division}
                            <div class="doc-rv__chips" data-division={division.id} data-state={divisionState(division.id)}>
                                {#each division.chapters as chapter}
                                    <span class="doc-rv__chip" data-division={division.id}>{chapter}</span>
                                {/each}
                            </div>
                        {/each}
                    </div>

                    <div class="doc-rv__panels" style="grid-template-columns: {columns};">
                        {#each DIVISIONS as division}
                            <!-- svelte-ignore a11y_no_static_element_interactions -->
                            <section
                                class="doc-rv__panel"
                                class:doc-rv__panel--vertical={division.vertical}
                                data-division={division.id}
                                data-state={divisionState(division.id)}
                                onmouseenter={() => (hoveredDivision = division.id)}
                                onmouseleave={() => (hoveredDivision = null)}
                            >
                                {#if division.title}
                                    <h2 class="doc-rv__panel-title">{division.title}</h2>
                                {/if}

                                <ol class="doc-rv__list">
                                    {#each division.items as item}
                                        <li>
                                            <button
                                                type="button"
                                                class="doc-rv__item"
                                                data-division={division.id}
                                                data-state={itemState({ ...item, divisionId: division.id })}
                                                aria-pressed={pinned === item.id}
                                                onmouseenter={() => (hovered = item.id)}
                                                onmouseleave={() => (hovered = null)}
                                                onfocus={() => (hovered = item.id)}
                                                onblur={() => (hovered = null)}
                                                onclick={() => togglePin(item.id)}
                                            >
                                                {item.label}
                                            </button>
                                        </li>
                                    {/each}
                                </ol>
                            </section>
                        {/each}
                    </div>

                    <!-- The four division markers, as in the reference chart. -->
                    <div class="doc-rv__markers" style="grid-template-columns: {columns};">
                        {#each DIVISIONS as division}
                            <div class="doc-rv__markerwrap">
                                <button
                                    type="button"
                                    class="doc-rv__marker"
                                    data-division={division.id}
                                    data-state={divisionState(division.id)}
                                    onmouseenter={() => (hoveredDivision = division.id)}
                                    onmouseleave={() => (hoveredDivision = null)}
                                    onfocus={() => (hoveredDivision = division.id)}
                                    onblur={() => (hoveredDivision = null)}
                                    aria-label={`Division ${division.num}: ${division.title ?? division.range}`}
                                >
                                    {division.num}
                                </button>
                            </div>
                        {/each}
                    </div>
                </div>
            </div>

            <!-- ========================= READING PANEL ======================== -->
            <div class="doc-rv__panelout" aria-live="polite">
                {#if activeItem}
                    <p class="doc-rv__meta">
                        <span class="doc-rv__meta-div" data-division={activeItem.divisionId}>
                            Division {activeItem.divisionNum} · {activeItem.range}
                        </span>
                    </p>
                    <h2 class="doc-rv__out-title">{activeItem.label}</h2>
                    <p class="doc-rv__refs">{activeItem.refs}</p>
                    <p class="doc-rv__note">{activeItem.note}</p>

                    {#if counterpart}
                        <p class="doc-rv__counter">
                            <span class="doc-rv__counter-label">Its counterpart</span>
                            <span class="doc-rv__counter-text">
                                {counterpart.label} - {counterpart.refs}
                            </span>
                        </p>
                    {/if}

                    {#if pinned === activeItem.id}
                        <button type="button" class="doc-rv__unpin" onclick={() => (pinned = null)}>Unpin</button>
                    {/if}
                {:else if activeDivisionInfo}
                    <p class="doc-rv__meta">
                        <span class="doc-rv__meta-div" data-division={activeDivisionInfo.id}>
                            Division {activeDivisionInfo.num} · {activeDivisionInfo.range}
                        </span>
                    </p>
                    {#if activeDivisionInfo.title}
                        <h2 class="doc-rv__out-title">{activeDivisionInfo.title}</h2>
                    {/if}
                    <p class="doc-rv__note doc-rv__note--lead">{activeDivisionInfo.blurb}</p>
                {:else}
                    <p class="doc-rv__note doc-rv__note--lead">
                        Two kingdoms, one trial apiece. Take any step in either and the chart shows
                        you where the other kingdom stands at that same moment.
                    </p>
                {/if}
            </div>
        </section>

        <!-- ======================= THE STORY AS IT RUNS ===================== -->
        <section class="doc-rv__story" use:reveal>
            <div class="doc-rv__sec-head">
                <p class="doc-rv__eyebrow">The story as it runs</p>
                <h2 class="doc-rv__h2">Each side, <span class="doc-rv__em">end to end.</span></h2>
            </div>

            <div class="doc-rv__sides">
                {#each STORY as side}
                    <article class="doc-rv__side" data-division={side.division}>
                        <p class="doc-rv__side-label">{side.label}</p>
                        <h3 class="doc-rv__h3">{side.title}</h3>
                        <p class="doc-rv__body">{side.body}</p>
                    </article>
                {/each}
            </div>
        </section>

        <!-- ========================= THE MIDNIGHT CRY ======================= -->
        <section class="doc-rv__wake" use:reveal>
            <div class="doc-rv__sec-head">
                <p class="doc-rv__eyebrow">{AWAKENING.eyebrow}</p>
                <h2 class="doc-rv__h2">The crisis does not only threaten. <span class="doc-rv__em">It wakes.</span></h2>
            </div>

            <div class="doc-rv__wake-grid">
                <div class="doc-rv__stack">
                    <p class="doc-rv__body">{AWAKENING.body}</p>
                    <p class="doc-rv__body">{AWAKENING.virgins}</p>
                </div>

                <div class="doc-rv__stack">
                    <!-- The caution the study keeps beside the midnight cry:
                         the awakening is made in heaven, not announced here. -->
                    <div class="doc-rv__warning">
                        <p class="doc-rv__warning-title">{AWAKENING.warning.title}</p>
                        <p class="doc-rv__body">{AWAKENING.warning.body}</p>
                    </div>
                    <blockquote class="doc-rv__quote doc-rv__quote--loud">
                        <p>“{AWAKENING.cry.quote}”</p>
                        <cite>{AWAKENING.cry.reference}</cite>
                    </blockquote>
                    <p class="doc-rv__body">{AWAKENING.cry.note}</p>
                </div>
            </div>
        </section>

        <!-- ==================== HARVEST, PLAGUES, THE PAUSE ================= -->
        <section class="doc-rv__harvest" use:reveal>
            <div class="doc-rv__sec-head">
                <p class="doc-rv__eyebrow">{HARVEST.eyebrow}</p>
                <h2 class="doc-rv__h2">Then the narrative <span class="doc-rv__em">stops.</span></h2>
            </div>

            <ol class="doc-rv__steps">
                {#each HARVEST.steps as step}
                    <li>
                        <span class="doc-rv__ref">{step.reference}</span>
                        <span class="doc-rv__body doc-rv__body--ink">{step.body}</span>
                    </li>
                {/each}
            </ol>

            <p class="doc-rv__body">{HARVEST.pause}</p>

            <a class="doc-rv__here" href={HARVEST.here.href}>
                <span class="doc-rv__here-ref">{HARVEST.here.reference}</span>
                <span class="doc-rv__here-body">{HARVEST.here.body}</span>
                <span class="doc-rv__here-link">
                    {HARVEST.here.linkLabel}
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m0 0l-6-6m6 6l-6 6" />
                    </svg>
                </span>
            </a>
        </section>

        <!-- ============================ THE PATTERN ========================= -->
        <section class="doc-rv__pattern" use:reveal>
            <div class="doc-rv__sec-head">
                <p class="doc-rv__eyebrow">The pattern</p>
                <h2 class="doc-rv__h2">Four stages, <span class="doc-rv__em">two kingdoms.</span></h2>
            </div>

            <table class="doc-rv__table">
                <thead>
                    <tr>
                        <th scope="col">Stage</th>
                        <th scope="col">Christ’s kingdom</th>
                        <th scope="col">Beast’s kingdom</th>
                    </tr>
                </thead>
                <tbody>
                    {#each PATTERN as row}
                        <tr>
                            <th scope="row">{row.stage}</th>
                            <td data-label="Christ’s kingdom" data-division="christ">{row.christ}</td>
                            <td data-label="Beast’s kingdom" data-division="beast">{row.beast}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </section>

        <!-- ============================ CLOSING ============================ -->
        <section class="doc-rv__close">
            <p class="doc-rv__eyebrow">Reading it</p>
            <h2 class="doc-rv__close-title">God’s day, not a date on a calendar.</h2>
            <p class="doc-rv__lede">{CLOSING}</p>
            <div class="doc-rv__actions">
                <a href="/overview" class="doc-rv__btn">
                    The parallel chart
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m0 0l-6-6m6 6l-6 6" />
                    </svg>
                </a>
                <a href="/seals" class="doc-rv__btn doc-rv__btn--quiet">The Seven Seals</a>
                <a href="/symbols" class="doc-rv__btn doc-rv__btn--quiet">The lexicon</a>
            </div>
        </section>
    </main>
</div>

<style>
    .doc-rv {
        --nav-h: 5.2rem;
        /* The four divisions keep the reference chart's colour logic, pitched
           to sit on the documentary palette. */
        --dv-introduction: #8c2f2f;
        --dv-christ: #1e4b7a;
        --dv-beast: #17706b;
        --dv-consummation: #4a2c6d;

        min-height: 100vh;
        background: var(--doc-bg);
        color: var(--doc-ink);
        padding-top: var(--nav-h);
        font-family: 'Public Sans', sans-serif;
        transition: background 0.4s ease, color 0.4s ease;
    }
    .doc-rv :where(h1, h2, h3) {
        font-family: 'Newsreader', Georgia, serif;
        font-weight: 400;
        color: var(--doc-ink);
        letter-spacing: -0.018em;
        line-height: 1.02;
        margin: 0;
    }

    /* The written study fades up as it arrives; the chart does not move. */
    main > section { transition: opacity 0.8s ease, transform 0.8s ease; }
    main > section:not(.doc-rv__head):not(.doc-rv__chartwrap):not(.doc-rv__close):not(:global(.is-in)) {
        opacity: 0;
        transform: translateY(24px);
    }

    /* Header */
    .doc-rv__head {
        padding: clamp(3rem, 7vw, 5rem) clamp(1.5rem, 6vw, 7rem) clamp(2rem, 4vw, 3rem);
        max-width: 64rem;
    }
    .doc-rv__eyebrow {
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
    .doc-rv__eyebrow::before {
        content: '';
        width: 28px;
        height: 1px;
        background: var(--doc-ember);
        opacity: 0.7;
    }
    .doc-rv__title {
        font-size: clamp(2.6rem, 8vw, 6rem);
        line-height: 0.95;
        margin-bottom: 1.75rem !important;
    }
    .doc-rv__em { font-style: italic; font-weight: 300; color: var(--doc-ember-soft); }
    .doc-rv__lede {
        font-size: clamp(1rem, 1.6vw, 1.2rem);
        color: var(--doc-muted);
        max-width: 46rem;
        line-height: 1.7;
        margin: 0;
    }

    .doc-rv__caveat {
        font-family: 'Newsreader', Georgia, serif;
        font-style: italic;
        font-size: clamp(1rem, 1.7vw, 1.2rem);
        line-height: 1.6;
        color: var(--doc-ember-soft);
        max-width: 42rem;
        margin: 1.5rem 0 0;
    }

    /* --------------------------- Study type --------------------------- */
    .doc-rv__h2 {
        font-size: clamp(1.8rem, 4vw, 2.9rem);
        line-height: 1.08 !important;
        margin-bottom: 1.25rem !important;
    }
    .doc-rv__h3 {
        font-size: clamp(1.25rem, 2.4vw, 1.7rem);
        line-height: 1.15 !important;
        margin-bottom: 0.9rem !important;
    }
    .doc-rv__body {
        font-size: clamp(0.98rem, 1.4vw, 1.08rem);
        line-height: 1.75;
        color: var(--doc-muted);
        margin: 0;
        max-width: 42rem;
    }
    .doc-rv__body--ink { color: var(--doc-ink); }
    .doc-rv__label,
    .doc-rv__num {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        color: var(--doc-dim);
        margin: 0;
    }
    .doc-rv__num { color: var(--doc-ember); }
    .doc-rv__ref {
        display: block;
        font-family: 'Newsreader', Georgia, serif;
        font-style: italic;
        font-size: 0.95rem;
        color: var(--doc-ember-soft);
        margin: 0 0 0.4rem;
    }
    .doc-rv__statement {
        font-family: 'Newsreader', Georgia, serif;
        font-size: clamp(1.25rem, 2.4vw, 1.75rem);
        line-height: 1.38;
        color: var(--doc-ink);
        max-width: 44rem;
        margin: 2rem 0 0;
        padding-top: 1.5rem;
        border-top: 1px solid var(--doc-line);
    }
    .doc-rv__quote {
        margin: 0;
        padding-left: clamp(1rem, 2vw, 1.5rem);
        border-left: 3px solid var(--doc-ember);
    }
    .doc-rv__quote p {
        font-family: 'Newsreader', Georgia, serif;
        font-style: italic;
        font-size: clamp(1.05rem, 2vw, 1.35rem);
        line-height: 1.45;
        color: var(--doc-ink);
        margin: 0 0 0.6rem;
    }
    .doc-rv__quote--loud p { font-size: clamp(1.35rem, 3vw, 2.1rem); line-height: 1.3; }
    .doc-rv__quote cite {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        font-style: normal;
        color: var(--doc-dim);
    }
    .doc-rv__sec-head { max-width: 46rem; margin-bottom: clamp(2rem, 4vw, 3rem); }
    .doc-rv__stack { display: grid; gap: 1.5rem; align-content: start; }

    .doc-rv__day,
    .doc-rv__premises,
    .doc-rv__story,
    .doc-rv__wake,
    .doc-rv__harvest,
    .doc-rv__pattern {
        padding: clamp(3rem, 7vw, 5rem) clamp(1.5rem, 6vw, 7rem);
        border-top: 1px solid var(--doc-line);
    }

    /* Premise 01 — the day itself */
    .doc-rv__day { display: grid; gap: clamp(2rem, 5vw, 4rem); }
    @media (min-width: 960px) {
        .doc-rv__day { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }
    }
    .doc-rv__verses { display: grid; gap: 1.25rem; margin-bottom: 1.75rem; }
    .doc-rv__day-span { display: grid; gap: 1.5rem; align-content: start; }
    .doc-rv__span { list-style: none; margin: 0; padding: 0; }
    .doc-rv__span li {
        display: grid;
        grid-template-columns: auto minmax(0, 1fr);
        gap: 1rem;
        align-items: baseline;
        padding: 0.85rem 0;
        border-top: 1px solid var(--doc-line);
        font-family: 'Newsreader', Georgia, serif;
        font-size: clamp(1.05rem, 1.9vw, 1.3rem);
        color: var(--doc-ink);
    }
    .doc-rv__span li:last-child { border-bottom: 1px solid var(--doc-line); }
    .doc-rv__john {
        display: grid;
        gap: 1rem;
        padding: clamp(1.25rem, 2.5vw, 1.75rem);
        border: 1px solid var(--doc-line);
        border-radius: 2px;
        background: var(--doc-bg-2);
    }

    /* Premises 02–07 */
    .doc-rv__premises { background: var(--doc-bg-2); }
    .doc-rv__premiselist {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: 0;
    }
    @media (min-width: 900px) {
        .doc-rv__premiselist { grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: clamp(2rem, 4vw, 3.5rem); }
    }
    .doc-rv__premiselist li {
        display: grid;
        grid-template-columns: auto minmax(0, 1fr);
        gap: 1rem;
        align-items: baseline;
        padding: 1rem 0;
        border-top: 1px solid var(--doc-line);
    }
    .doc-rv__premise-text {
        font-family: 'Newsreader', Georgia, serif;
        font-size: clamp(1.05rem, 1.9vw, 1.3rem);
        line-height: 1.45;
        color: var(--doc-ink);
    }

    /* ------------------------------ Chart ------------------------------ */
    .doc-rv__chartwrap { padding: 0 clamp(1.5rem, 6vw, 7rem) clamp(3rem, 6vw, 5rem); }
    .doc-rv__chart-head {
        max-width: 46rem;
        padding: clamp(2.5rem, 5vw, 4rem) 0 clamp(1.5rem, 3vw, 2.25rem);
        border-top: 1px solid var(--doc-line);
    }
    .doc-rv__hint {
        display: flex;
        flex-wrap: wrap;
        gap: 0.6rem;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: var(--doc-dim);
        margin-bottom: 1.25rem;
    }
    .doc-rv__hint-sep { opacity: 0.6; }

    /* The columns carry the structure, so the chart scrolls rather than
       reflowing, as on the parallel chart. */
    .doc-rv__scroll { overflow-x: auto; padding-bottom: 0.75rem; }
    .doc-rv__chart { min-width: 54rem; display: flex; flex-direction: column; gap: 0.6rem; }

    .doc-rv__rail,
    .doc-rv__panels,
    .doc-rv__markers { display: grid; gap: 0.5rem; }

    /* Chapter chips */
    .doc-rv__chips {
        display: flex;
        flex-wrap: wrap;
        gap: 0.3rem;
        transition: opacity 0.25s ease, filter 0.25s ease;
    }
    .doc-rv__chip {
        flex: 1 1 auto;
        min-width: 1.6rem;
        text-align: center;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        font-weight: 700;
        color: #f1ebe0;
        border-radius: 2px;
        padding: 0.28rem 0.3rem;
    }
    .doc-rv__chip[data-division='introduction'] { background: var(--dv-introduction); }
    .doc-rv__chip[data-division='christ'] { background: var(--dv-christ); }
    .doc-rv__chip[data-division='beast'] { background: var(--dv-beast); }
    .doc-rv__chip[data-division='consummation'] { background: var(--dv-consummation); }

    /* Panels */
    .doc-rv__panel {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        min-height: 17rem;
        padding: clamp(0.9rem, 1.6vw, 1.35rem);
        border: 1px solid rgba(241, 235, 224, 0.14);
        border-radius: 3px;
        transition: opacity 0.25s ease, filter 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
    }
    .doc-rv__panel[data-division='introduction'] { background: var(--dv-introduction); }
    .doc-rv__panel[data-division='christ'] { background: var(--dv-christ); }
    .doc-rv__panel[data-division='beast'] { background: var(--dv-beast); }
    .doc-rv__panel[data-division='consummation'] { background: var(--dv-consummation); }

    .doc-rv__panel-title {
        font-family: 'Public Sans', sans-serif;
        font-weight: 700;
        font-size: clamp(0.85rem, 1.4vw, 1.05rem);
        line-height: 1.25;
        text-align: center;
        color: #f2dd6e;
    }

    .doc-rv__list {
        margin: 0;
        padding-left: 1.35rem;
        display: flex;
        flex-direction: column;
        gap: 0.55rem;
        color: #eef1f5;
    }
    .doc-rv__list li::marker {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.7rem;
        color: rgba(238, 241, 245, 0.7);
    }

    .doc-rv__item {
        display: block;
        width: 100%;
        text-align: left;
        background: none;
        border: none;
        border-left: 2px solid transparent;
        border-radius: 2px;
        padding: 0.15rem 0.4rem;
        margin-left: -0.4rem;
        cursor: pointer;
        font-family: 'Public Sans', sans-serif;
        font-size: clamp(0.78rem, 1.15vw, 0.92rem);
        line-height: 1.45;
        color: #eef1f5;
        transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease, opacity 0.25s ease;
    }
    .doc-rv__item:hover { color: #ffffff; }

    /* The two narrow divisions run vertically, as they do in the reference. */
    .doc-rv__panel--vertical .doc-rv__list {
        writing-mode: vertical-rl;
        transform: rotate(180deg);
        padding: 1.35rem 0 0;
        margin-inline: auto;
        gap: 1.1rem;
    }
    .doc-rv__panel--vertical .doc-rv__item { white-space: nowrap; }

    /* States — the counterpart is marked differently from the rest of its
       division, because finding it is the reason to hover at all. */
    .doc-rv__item[data-state='dim'] { opacity: 0.45; }
    .doc-rv__item[data-state='lit'] { opacity: 1; }
    .doc-rv__item[data-state='active'] {
        background: rgba(255, 255, 255, 0.16);
        border-left-color: var(--doc-ember);
        color: #ffffff;
    }
    .doc-rv__item[data-state='pair'] {
        background: rgba(217, 122, 67, 0.28);
        border-left-color: var(--doc-ember-soft);
        color: #ffffff;
    }

    .doc-rv__panel[data-state='dim'],
    .doc-rv__chips[data-state='dim'] { opacity: 0.4; filter: saturate(0.55); }
    .doc-rv__panel[data-state='active'] { box-shadow: 0 0 0 2px var(--doc-ember); }
    .doc-rv__panel[data-state='pair'] { box-shadow: 0 0 0 2px var(--doc-ember-soft); }

    /* Division markers */
    .doc-rv__markerwrap { display: flex; justify-content: center; }
    .doc-rv__marker {
        width: 2.4rem;
        height: 2.4rem;
        border-radius: 999px;
        border: 1px solid rgba(241, 235, 224, 0.2);
        background: var(--doc-ember);
        color: #14140f;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.9rem;
        font-weight: 700;
        cursor: pointer;
        transition: opacity 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
    }
    .doc-rv__marker[data-state='dim'] { opacity: 0.4; }
    .doc-rv__marker[data-state='active'] { transform: scale(1.1); box-shadow: 0 0 0 3px var(--doc-line); }
    .doc-rv__marker[data-state='pair'] { box-shadow: 0 0 0 3px var(--doc-line-soft); }

    /* ---------------------------- Reading panel ---------------------------- */
    .doc-rv__panelout {
        margin-top: clamp(1.5rem, 3vw, 2.5rem);
        border-top: 1px solid var(--doc-line);
        border-left: 2px solid var(--doc-ember);
        padding: clamp(1.25rem, 3vw, 2rem);
        background: var(--doc-line-soft);
        min-height: 12rem;
    }
    .doc-rv__meta {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        margin: 0 0 0.9rem;
    }
    .doc-rv__meta-div { color: var(--doc-ember); }
    .doc-rv__out-title {
        font-size: clamp(1.4rem, 3vw, 2.1rem);
        line-height: 1.12;
        margin-bottom: 0.6rem !important;
    }
    .doc-rv__refs {
        font-family: 'Newsreader', Georgia, serif;
        font-style: italic;
        font-size: 1rem;
        color: var(--doc-ember-soft);
        margin: 0 0 0.9rem;
    }
    .doc-rv__note {
        font-size: 1.02rem;
        line-height: 1.75;
        color: var(--doc-muted);
        max-width: 46rem;
        margin: 0;
    }
    .doc-rv__note--lead {
        font-family: 'Newsreader', Georgia, serif;
        font-style: italic;
        font-size: clamp(1.05rem, 1.8vw, 1.3rem);
    }
    .doc-rv__counter {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
        margin: 1.5rem 0 0;
        padding-left: 1rem;
        border-left: 2px solid var(--doc-ember-soft);
    }
    .doc-rv__counter-label {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.5625rem;
        letter-spacing: 0.26em;
        text-transform: uppercase;
        color: var(--doc-ember-soft);
    }
    .doc-rv__counter-text { color: var(--doc-ink); line-height: 1.6; }
    .doc-rv__unpin {
        margin-top: 1.25rem;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: var(--doc-ember-soft);
        background: none;
        border: none;
        border-bottom: 1px solid var(--doc-line);
        padding: 0 0 0.35rem;
        cursor: pointer;
        transition: border-color 0.3s ease, color 0.3s ease;
    }
    .doc-rv__unpin:hover { border-color: var(--doc-ember); color: var(--doc-ember); }

    /* -------------------------- The story as it runs ------------------------- */
    .doc-rv__sides { display: grid; gap: clamp(1.5rem, 3vw, 2.5rem); }
    @media (min-width: 900px) {
        .doc-rv__sides { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }
    /* Each side carries the colour its division wears on the chart. */
    .doc-rv__side {
        border-top: 3px solid var(--dv, var(--doc-line));
        padding-top: 1.25rem;
    }
    .doc-rv__side[data-division='christ'] { --dv: var(--dv-christ); }
    .doc-rv__side[data-division='beast'] { --dv: var(--dv-beast); }
    .doc-rv__side-label {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        color: var(--doc-ember);
        margin: 0 0 0.9rem;
    }

    /* ----------------------------- The midnight cry -------------------------- */
    .doc-rv__wake { background: var(--doc-bg-2); }
    .doc-rv__wake-grid { display: grid; gap: clamp(2rem, 4vw, 3.5rem); }
    @media (min-width: 960px) {
        .doc-rv__wake-grid { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }
    }
    .doc-rv__warning {
        display: grid;
        gap: 0.85rem;
        padding: clamp(1.25rem, 2.5vw, 1.75rem);
        border: 1px dashed var(--doc-line);
        border-radius: 2px;
    }
    .doc-rv__warning-title {
        font-family: 'Newsreader', Georgia, serif;
        font-size: clamp(1.2rem, 2.2vw, 1.5rem);
        color: var(--doc-ink);
        margin: 0;
    }

    /* --------------------------- Harvest and the pause ----------------------- */
    .doc-rv__steps {
        list-style: none;
        margin: 0 0 2rem;
        padding: 0;
        display: grid;
        gap: 0;
    }
    @media (min-width: 760px) {
        .doc-rv__steps { grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: clamp(2rem, 4vw, 3rem); }
    }
    .doc-rv__steps li {
        padding: 1rem 0;
        border-top: 1px solid var(--doc-line);
    }
    .doc-rv__here {
        display: grid;
        gap: 0.6rem;
        max-width: 34rem;
        margin-top: clamp(2rem, 4vw, 3rem);
        padding: clamp(1.25rem, 2.5vw, 1.75rem);
        border: 1px solid var(--doc-ember);
        border-radius: 2px;
        background: linear-gradient(135deg, rgba(217, 122, 67, 0.12), transparent 75%);
        text-decoration: none;
        transition: background 0.3s ease;
    }
    .doc-rv__here:hover { background: linear-gradient(135deg, rgba(217, 122, 67, 0.2), transparent 75%); }
    .doc-rv__here-ref {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        color: var(--doc-ember);
    }
    .doc-rv__here-body {
        font-family: 'Newsreader', Georgia, serif;
        font-size: clamp(1.2rem, 2.4vw, 1.6rem);
        line-height: 1.3;
        color: var(--doc-ink);
    }
    .doc-rv__here-link {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: var(--doc-ember-soft);
    }
    .doc-rv__here-link svg { width: 0.9rem; height: 0.9rem; transition: transform 0.3s ease; }
    .doc-rv__here:hover .doc-rv__here-link svg { transform: translateX(4px); }

    /* -------------------------------- Pattern -------------------------------- */
    .doc-rv__pattern { background: var(--doc-bg-2); }
    .doc-rv__table { width: 100%; border-collapse: collapse; }
    .doc-rv__table th[scope='col'] {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        font-weight: 400;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: var(--doc-ember);
        text-align: left;
        padding: 0 1.25rem 0.9rem 0;
        border-bottom: 1px solid var(--doc-ember);
    }
    .doc-rv__table th[scope='row'] {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        font-weight: 400;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: var(--doc-ink);
        text-align: left;
        vertical-align: top;
        padding: 1.2rem 1.25rem 1.2rem 0;
        border-bottom: 1px solid var(--doc-line);
        white-space: nowrap;
    }
    .doc-rv__table td {
        font-family: 'Newsreader', Georgia, serif;
        font-size: clamp(1rem, 1.7vw, 1.2rem);
        line-height: 1.45;
        color: var(--doc-ink);
        padding: 1.2rem 1.25rem 1.2rem 0;
        border-bottom: 1px solid var(--doc-line);
        vertical-align: top;
        width: 37%;
    }
    /* Narrow screens: each stage becomes a labelled block rather than a table
       that has to scroll sideways. */
    @media (max-width: 760px) {
        .doc-rv__table thead { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
        .doc-rv__table,
        .doc-rv__table tbody,
        .doc-rv__table tr,
        .doc-rv__table th[scope='row'],
        .doc-rv__table td { display: block; width: 100%; }
        .doc-rv__table tr { padding: 1rem 0; border-bottom: 1px solid var(--doc-line); }
        .doc-rv__table th[scope='row'] { border: 0; padding: 0 0 0.6rem; color: var(--doc-ember); }
        .doc-rv__table td { border: 0; padding: 0.4rem 0; }
        .doc-rv__table td::before {
            content: attr(data-label);
            display: block;
            font-family: 'JetBrains Mono', ui-monospace, monospace;
            font-size: 0.5625rem;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            color: var(--doc-dim);
            margin-bottom: 0.25rem;
        }
    }

    /* Closing */
    .doc-rv__close {
        border-top: 1px solid var(--doc-line);
        padding: clamp(3.5rem, 8vw, 6rem) clamp(1.5rem, 6vw, 7rem) clamp(4rem, 9vw, 8rem);
        max-width: 64rem;
    }
    .doc-rv__close-title {
        font-size: clamp(1.9rem, 4vw, 3rem);
        line-height: 1.1;
        margin-bottom: 1.5rem !important;
    }
    .doc-rv__actions { display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 2.5rem; }
    .doc-rv__btn {
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
    .doc-rv__btn:hover { border-color: var(--doc-ember); color: var(--doc-ember-soft); }
    .doc-rv__btn svg { width: 1rem; height: 1rem; transition: transform 0.3s ease; }
    .doc-rv__btn:hover svg { transform: translateX(4px); }
    .doc-rv__btn--quiet { color: var(--doc-muted); }

    @media (prefers-reduced-motion: reduce) {
        .doc-rv :where(a, button, .doc-rv__panel, .doc-rv__item) { transition: none !important; }
        .doc-rv__marker[data-state='active'] { transform: none; }
    }
</style>
