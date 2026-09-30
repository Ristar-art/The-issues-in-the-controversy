<script>
    import Seo from '$lib/components/Seo.svelte';
    import OverviewNav from '$lib/components/OverviewNav.svelte';
    import { CHART_ROWS, CHART_CELLS, CHART_COLUMNS, PHASES } from '$lib/data/overview-chart.js';
    import {
        KINGDOM_GOSPEL,
        HOW_TO_READ,
        TEMPLATE,
        CHRISTS_KINGDOM,
        BEASTS_KINGDOM,
        ACROSS,
        ACROSS_NOTES,
        NOTES
    } from '$lib/data/overview-study.js';

    // Hover drives the chart on a pointer; a tap pins a block, which is the
    // same gesture doing the same work where there is no hover.
    let hovered = $state(/** @type {string | null} */ (null));
    let pinned = $state(/** @type {string | null} */ (null));
    let hoveredPhase = $state(/** @type {string | null} */ (null));
    let hoveredRow = $state(/** @type {string | null} */ (null));

    let activeCell = $derived(
        CHART_CELLS.find((cell) => cell.id === (hovered ?? pinned)) ?? null
    );
    // The legend and the row labels light a band without selecting a block.
    let activePhase = $derived(hoveredPhase ?? activeCell?.phase ?? null);
    let activeRow = $derived(hoveredRow ?? activeCell?.rowId ?? null);
    let anyActive = $derived(Boolean(activePhase || activeRow));

    let activePhaseInfo = $derived(PHASES.find((phase) => phase.id === activePhase) ?? null);

    const columns = CHART_COLUMNS.map((width) => `${width}fr`).join(' ');

    /** @param {{ phase: string, rowId: string, id?: string }} cell */
    function stateOf(cell) {
        if (!anyActive) return 'rest';
        if (cell.id && activeCell?.id === cell.id) return 'active';
        if (cell.phase === activePhase || cell.rowId === activeRow) return 'lit';
        return 'dim';
    }

    /** @param {string} id */
    function togglePin(id) {
        pinned = pinned === id ? null : id;
    }

    function clearAll() {
        hovered = null;
        hoveredPhase = null;
        hoveredRow = null;
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
    title="The Overview — Daniel and Revelation in Parallel"
    description="An interactive parallel chart of Daniel 7 and Revelation 5–19 — four prophecies laid over one timeline, from the war against the saints to the kingdom given."
    keywords="daniel 7, revelation, parallel prophecy chart, seven seals, two witnesses, mark of the beast, seven plagues, judgment"
    image="/courtroom.jpg"
/>


<div class="doc-ov">
    <OverviewNav current="parallel" />

    <main>
        <!-- ============================ HEADER ============================ -->
        <section class="doc-ov__head">
            <p class="doc-ov__eyebrow">Reference · The Parallel Chart</p>
            <h1 class="doc-ov__title">The<br /><span class="doc-ov__em">Overview</span></h1>
            <p class="doc-ov__lede">
                Daniel 7 and Revelation do not describe separate prophecies. They explore the same
                vision four times, each time passing adding detail the one before it left out. Read the chart
                downward and the parallels line up: what Daniel calls the judgment sitting, Revelation
                calls the fifth seal, the temple measured, and the crisis over worship.
            </p>
        </section>

        <!-- ====================== THE GOSPEL OF THE KINGDOM ====================== -->
        <section class="doc-ov__gospel" use:reveal>
            <div class="doc-ov__gospel-text">
                <p class="doc-ov__eyebrow">{KINGDOM_GOSPEL.eyebrow}</p>
                <h2 class="doc-ov__h2">
                    Not merely the gospel.<br /><span class="doc-ov__em">The gospel of the kingdom.</span>
                </h2>
                <p class="doc-ov__lede">{KINGDOM_GOSPEL.lede}</p>
                <p class="doc-ov__statement">{KINGDOM_GOSPEL.close}</p>
            </div>

            <ol class="doc-ov__witnesses">
                {#each KINGDOM_GOSPEL.witnesses as witness}
                    <li>
                        <p class="doc-ov__ref">{witness.reference}</p>
                        <p class="doc-ov__body">{witness.body}</p>
                    </li>
                {/each}
            </ol>
        </section>

        <!-- ============================= CHART ============================= -->
        <section class="doc-ov__chartwrap">
            <!-- The one instruction the chart needs before it can be read. -->
            <div class="doc-ov__readkey">
                <p class="doc-ov__eyebrow">{HOW_TO_READ.eyebrow}</p>
                <h2 class="doc-ov__h2">Two kingdoms, <span class="doc-ov__em">one judgment.</span></h2>
                <p class="doc-ov__lede">{HOW_TO_READ.lede}</p>
            </div>

            <div class="doc-ov__hint">
                <span>Hover a block to light its parallels</span>
                <span class="doc-ov__hint-sep" aria-hidden="true">·</span>
                <span>tap or click to pin one</span>
            </div>

            <!-- Legend doubles as a control: it lights a whole phase. -->
            <div class="doc-ov__legend">
                {#each PHASES as phase}
                    <button
                        type="button"
                        class="doc-ov__key"
                        data-phase={phase.id}
                        class:is-out={anyActive && activePhase !== phase.id}
                        onmouseenter={() => (hoveredPhase = phase.id)}
                        onmouseleave={() => (hoveredPhase = null)}
                        onfocus={() => (hoveredPhase = phase.id)}
                        onblur={() => (hoveredPhase = null)}
                    >
                        <span class="doc-ov__swatch" data-phase={phase.id} aria-hidden="true"></span>
                        <span class="doc-ov__key-time">{phase.time}</span>
                        <span class="doc-ov__key-label">{phase.label}</span>
                    </button>
                {/each}
            </div>

            <!-- The chart scrolls sideways rather than reflowing: the columns
                 carry the meaning, and a stacked version would lose it. -->
            <div class="doc-ov__scroll">
                <div class="doc-ov__chart" role="group" aria-label="Parallel prophecy chart" onmouseleave={clearAll}>
                    {#each CHART_ROWS as row}
                        <div class="doc-ov__band">
                            <button
                                type="button"
                                class="doc-ov__rowlabel"
                                class:is-lit={activeRow === row.id}
                                class:is-dim={anyActive && activeRow !== row.id}
                                onmouseenter={() => (hoveredRow = row.id)}
                                onmouseleave={() => (hoveredRow = null)}
                                onfocus={() => (hoveredRow = row.id)}
                                onblur={() => (hoveredRow = null)}
                            >
                                {row.label}
                            </button>

                            <div
                                class="doc-ov__grid"
                                style="grid-template-columns: {columns}; grid-template-rows: repeat({row.subRows}, minmax(3.4rem, auto));"
                            >
                                {#each row.cells as cell}
                                    {@const placed = `grid-column: ${cell.col} / span ${cell.span ?? 1}; grid-row: ${cell.row ?? 1} / span ${cell.rowSpan ?? 1};`}
                                    {#if cell.blank}
                                        <!-- Filled in the chart but unlabelled: the band has to
                                             stay unbroken for the columns to read across. -->
                                        <div
                                            class="doc-ov__cell doc-ov__cell--blank"
                                            data-phase={cell.phase}
                                            data-state={stateOf({ ...cell, rowId: row.id })}
                                            style={placed}
                                            aria-hidden="true"
                                        ></div>
                                    {:else}
                                        <button
                                            type="button"
                                            class="doc-ov__cell"
                                            class:doc-ov__cell--vertical={cell.vertical}
                                            data-phase={cell.phase}
                                            data-state={stateOf({ ...cell, rowId: row.id })}
                                            style={placed}
                                            aria-pressed={pinned === cell.id}
                                            onmouseenter={() => (hovered = cell.id ?? null)}
                                            onmouseleave={() => (hovered = null)}
                                            onfocus={() => (hovered = cell.id ?? null)}
                                            onblur={() => (hovered = null)}
                                            onclick={() => cell.id && togglePin(cell.id)}
                                        >
                                            <span>{cell.label}</span>
                                        </button>
                                    {/if}
                                {/each}
                            </div>
                        </div>
                    {/each}
                </div>
            </div>

            <!-- ========================= READING PANEL ======================== -->
            <div class="doc-ov__panel" aria-live="polite">
                {#if activeCell}
                    <p class="doc-ov__panel-meta">
                        <span class="doc-ov__panel-row">{activeCell.rowLabel}</span>
                        <span class="doc-ov__dot" aria-hidden="true">·</span>
                        <span class="doc-ov__panel-phase" data-phase={activeCell.phase}>
                            {PHASES.find((phase) => phase.id === activeCell?.phase)?.label}
                        </span>
                    </p>
                    <h2 class="doc-ov__panel-title">{activeCell.label}</h2>
                    <p class="doc-ov__panel-refs">{activeCell.refs}</p>
                    <p class="doc-ov__panel-note">{activeCell.note}</p>
                    {#if pinned === activeCell.id}
                        <button type="button" class="doc-ov__unpin" onclick={() => (pinned = null)}>
                            Unpin
                        </button>
                    {/if}
                {:else if activePhaseInfo}
                    <p class="doc-ov__panel-meta">
                        <span class="doc-ov__panel-phase" data-phase={activePhaseInfo.id}>
                            {activePhaseInfo.label}
                        </span>
                    </p>
                    <p class="doc-ov__panel-note doc-ov__panel-note--lead">{activePhaseInfo.blurb}</p>
                {:else}
                    <p class="doc-ov__panel-note doc-ov__panel-note--lead">
                        Four prophecies, one timeline. Take any block and the chart lights every other
                        prophecy standing over the same ground.
                    </p>
                {/if}
            </div>
        </section>

        <!-- ======================= I · THE TEMPLATE ========================= -->
        <section class="doc-ov__sec" id={TEMPLATE.id} use:reveal>
            <header class="doc-ov__sec-head">
                <p class="doc-ov__eyebrow">{TEMPLATE.numeral} · {TEMPLATE.eyebrow}</p>
                <h2 class="doc-ov__h2">The template: <span class="doc-ov__em">{TEMPLATE.title}</span></h2>
            </header>

            <ol class="doc-ov__beasts">
                {#each TEMPLATE.beasts as item, i}
                    <li class="doc-ov__beast" class:is-last={i === TEMPLATE.beasts.length - 1}>
                        <span class="doc-ov__num">{String(i + 1).padStart(2, '0')}</span>
                        <span class="doc-ov__beast-name">{item.beast}</span>
                        <span class="doc-ov__beast-empire">{item.empire}</span>
                        <span class="doc-ov__beast-state">{item.state}</span>
                    </li>
                {/each}
            </ol>

            <div class="doc-ov__split">
                <div class="doc-ov__stack">
                    <p class="doc-ov__body">
                        <span class="doc-ov__ref">{TEMPLATE.bodyRef}</span>
                        {TEMPLATE.body}
                    </p>
                    <p class="doc-ov__body">
                        <span class="doc-ov__ref">{TEMPLATE.courtRef}</span>
                        {TEMPLATE.court}
                    </p>
                    <ol class="doc-ov__verdicts">
                        {#each TEMPLATE.verdicts as verdict, i}
                            <li>
                                <span class="doc-ov__num">Verdict {String(i + 1).padStart(2, '0')}</span>
                                <p class="doc-ov__ref">{verdict.reference}</p>
                                <p class="doc-ov__body doc-ov__body--ink">{verdict.body}</p>
                            </li>
                        {/each}
                    </ol>
                </div>

                <div class="doc-ov__stack">
                    <!-- The blank is the whole reason the chart exists: what
                         Daniel skips, Revelation fills. -->
                    <div class="doc-ov__blank">
                        <p class="doc-ov__blank-title">{TEMPLATE.blank.title}</p>
                        <p class="doc-ov__body">{TEMPLATE.blank.body}</p>
                    </div>
                    <p class="doc-ov__statement">{TEMPLATE.five}</p>
                </div>
            </div>
        </section>

        <!-- ==================== II · CHRIST'S KINGDOM ======================= -->
        <section class="doc-ov__sec doc-ov__sec--alt" id={CHRISTS_KINGDOM.id} use:reveal>
            <header class="doc-ov__sec-head">
                <p class="doc-ov__eyebrow">{CHRISTS_KINGDOM.numeral} · {CHRISTS_KINGDOM.eyebrow}</p>
                <h2 class="doc-ov__h2">Christ’s kingdom,<br /><span class="doc-ov__em">{CHRISTS_KINGDOM.title}</span></h2>
                <p class="doc-ov__lede">{CHRISTS_KINGDOM.lede}</p>
            </header>

            <div class="doc-ov__phaseblock" data-phase="persecution">
                <p class="doc-ov__phaselabel">Seals 1–4 · Past</p>
                <ol class="doc-ov__horses">
                    {#each CHRISTS_KINGDOM.horses as horse}
                        <li>
                            <span class="doc-ov__num">{horse.seal}</span>
                            <h3 class="doc-ov__horse-name">{horse.horse}</h3>
                            <p class="doc-ov__body">{horse.body}</p>
                        </li>
                    {/each}
                </ol>
                <p class="doc-ov__body doc-ov__body--note">{CHRISTS_KINGDOM.horsesNote}</p>
            </div>

            <div class="doc-ov__phaseblock" data-phase="judgment">
                <p class="doc-ov__phaselabel">{CHRISTS_KINGDOM.seal5.label}</p>
                <h3 class="doc-ov__h3">{CHRISTS_KINGDOM.seal5.title}</h3>
                <div class="doc-ov__split">
                    <div class="doc-ov__stack">
                        <p class="doc-ov__body">{CHRISTS_KINGDOM.seal5.body}</p>
                        <p class="doc-ov__body">{CHRISTS_KINGDOM.seal5.robes}</p>
                    </div>
                    <div class="doc-ov__stack">
                        <p class="doc-ov__body">{CHRISTS_KINGDOM.seal5.rest}</p>
                        <p class="doc-ov__marker">{CHRISTS_KINGDOM.seal5.marker}</p>
                    </div>
                </div>

                <div class="doc-ov__sealed">
                    <h3 class="doc-ov__h3">{CHRISTS_KINGDOM.sealed.title}</h3>
                    <p class="doc-ov__body">{CHRISTS_KINGDOM.sealed.why}</p>
                    <ol class="doc-ov__points">
                        {#each CHRISTS_KINGDOM.sealed.points as point, i}
                            <li>
                                <span class="doc-ov__num">{String(i + 1).padStart(2, '0')}</span>
                                <h4 class="doc-ov__point-title">{point.title}</h4>
                                <p class="doc-ov__body">{point.body}</p>
                            </li>
                        {/each}
                    </ol>
                </div>
            </div>

            <div class="doc-ov__phaseblock" data-phase="cosmic">
                <p class="doc-ov__phaselabel">{CHRISTS_KINGDOM.future.label}</p>
                <h3 class="doc-ov__h3">{CHRISTS_KINGDOM.future.title}</h3>
                <dl class="doc-ov__seals">
                    {#each CHRISTS_KINGDOM.future.items as item}
                        <div>
                            <dt>{item.name}</dt>
                            <dd>{item.body}</dd>
                        </div>
                    {/each}
                </dl>
                <blockquote class="doc-ov__quote">
                    <p>“{CHRISTS_KINGDOM.future.trumpet.quote}”</p>
                    <cite>{CHRISTS_KINGDOM.future.trumpet.reference}</cite>
                </blockquote>
                <p class="doc-ov__body">{CHRISTS_KINGDOM.future.trumpet.body}</p>
            </div>
        </section>

        <!-- ===================== III · THE BEAST'S KINGDOM ================== -->
        <section class="doc-ov__sec" id={BEASTS_KINGDOM.id} use:reveal>
            <header class="doc-ov__sec-head">
                <p class="doc-ov__eyebrow">{BEASTS_KINGDOM.numeral} · {BEASTS_KINGDOM.eyebrow}</p>
                <h2 class="doc-ov__h2">The beast’s kingdom,<br /><span class="doc-ov__em">{BEASTS_KINGDOM.title}</span></h2>
                <p class="doc-ov__lede">{BEASTS_KINGDOM.lede}</p>
            </header>

            <ol class="doc-ov__movements">
                {#each BEASTS_KINGDOM.movements as movement}
                    <li class="doc-ov__movement" data-phase={movement.phase}>
                        <span class="doc-ov__movement-label">{movement.label}</span>
                        <p class="doc-ov__ref">{movement.refs}</p>
                        <p class="doc-ov__body">{movement.body}</p>
                    </li>
                {/each}
            </ol>
        </section>

        <!-- ====================== THE CHART, READ ACROSS ==================== -->
        <section class="doc-ov__across" use:reveal>
            <div class="doc-ov__sec-head">
                <p class="doc-ov__eyebrow">The chart, read across</p>
                <h2 class="doc-ov__h2">Four moments, <span class="doc-ov__em">three prophecies.</span></h2>
            </div>

            <table class="doc-ov__table">
                <thead>
                    <tr>
                        <th scope="col">Moment</th>
                        <th scope="col">Daniel 7</th>
                        <th scope="col">Christ’s kingdom · Rev 5–11</th>
                        <th scope="col">Beast’s kingdom · Rev 12–19</th>
                    </tr>
                </thead>
                <tbody>
                    {#each ACROSS as row}
                        <tr data-phase={row.phase}>
                            <th scope="row">
                                <span class="doc-ov__swatch" data-phase={row.phase} aria-hidden="true"></span>
                                {row.label}
                            </th>
                            <td data-label="Daniel 7" class:is-blank={row.danielBlank}>{row.daniel}</td>
                            <td data-label="Christ’s kingdom · Rev 5–11">{row.christ}</td>
                            <td data-label="Beast’s kingdom · Rev 12–19">{row.beast}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>

            <div class="doc-ov__acrossnotes">
                {#each ACROSS_NOTES as note}
                    <p class="doc-ov__body">{note}</p>
                {/each}
            </div>
        </section>

        <!-- ============================== NOTES ============================= -->
        <section class="doc-ov__notes" use:reveal>
            <div class="doc-ov__sec-head">
                <p class="doc-ov__eyebrow">Notes that keep the picture from blurring</p>
                <h2 class="doc-ov__h2">Four things <span class="doc-ov__em">easy to lose.</span></h2>
            </div>

            <ol class="doc-ov__notelist">
                {#each NOTES as note, i}
                    <li>
                        <span class="doc-ov__num">{String(i + 1).padStart(2, '0')}</span>
                        <div>
                            <h3 class="doc-ov__note-title">{note.title}</h3>
                            <p class="doc-ov__body">{note.body}</p>
                        </div>
                    </li>
                {/each}
            </ol>
        </section>

        <!-- ============================ CLOSING ============================ -->
        <section class="doc-ov__close">
            <p class="doc-ov__eyebrow">Reading it</p>
            <h2 class="doc-ov__close-title">The columns are the argument.</h2>
            <p class="doc-ov__lede">
                Each row is a prophecy; each column is a moment. Where a block in Daniel sits above a
                block in Revelation, the claim is that both describe one event. The seals carry the
                same sequence in their own language, and the lexicon explains the figures each uses.
            </p>
            <div class="doc-ov__actions">
                <a href="/seals" class="doc-ov__btn">
                    The Seven Seals
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m0 0l-6-6m6 6l-6 6" />
                    </svg>
                </a>
                <a href="/symbols" class="doc-ov__btn doc-ov__btn--quiet">The lexicon</a>
                <a href="/topics" class="doc-ov__btn doc-ov__btn--quiet">All the studies</a>
            </div>
        </section>
    </main>
</div>

<style>
    .doc-ov {
        --nav-h: 5.2rem;
        /* The chart's four bands, tuned to sit on the documentary palette
           while keeping the reference chart's colour logic intact. */
        --ph-persecution: #e0a049;
        --ph-judgment: #5fae4c;
        --ph-cosmic: #86b6e2;
        --ph-kingdom: #e5c445;
        --cell-ink: #14140f;

        min-height: 100vh;
        background: var(--doc-bg);
        color: var(--doc-ink);
        padding-top: var(--nav-h);
        font-family: 'Public Sans', sans-serif;
        transition: background 0.4s ease, color 0.4s ease;
    }
    .doc-ov :where(h1, h2, h3, h4) {
        font-family: 'Newsreader', Georgia, serif;
        font-weight: 400;
        color: var(--doc-ink);
        letter-spacing: -0.018em;
        line-height: 1.02;
        margin: 0;
    }

    /* The written study fades up as it arrives; the chart does not move. */
    main > section { transition: opacity 0.8s ease, transform 0.8s ease; }
    main > section:not(.doc-ov__head):not(.doc-ov__chartwrap):not(.doc-ov__close):not(:global(.is-in)) {
        opacity: 0;
        transform: translateY(24px);
    }

    /* Header — tightened at the top, since the overview switcher now sits
       between it and the site nav. */
    .doc-ov__head {
        padding: clamp(3rem, 7vw, 5rem) clamp(1.5rem, 6vw, 7rem) clamp(2rem, 4vw, 3rem);
        max-width: 64rem;
    }
    .doc-ov__eyebrow {
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
    .doc-ov__eyebrow::before {
        content: '';
        width: 28px;
        height: 1px;
        background: var(--doc-ember);
        opacity: 0.7;
    }
    .doc-ov__title {
        font-size: clamp(3rem, 10vw, 7rem);
        line-height: 0.95;
        margin-bottom: 1.75rem !important;
    }
    .doc-ov__em { font-style: italic; font-weight: 300; color: var(--doc-ember-soft); }
    .doc-ov__lede {
        font-size: clamp(1rem, 1.6vw, 1.2rem);
        color: var(--doc-muted);
        max-width: 46rem;
        line-height: 1.7;
        margin: 0;
    }

    /* --------------------------- Study type --------------------------- */
    .doc-ov__h2 {
        font-size: clamp(1.8rem, 4vw, 2.9rem);
        line-height: 1.08 !important;
        margin-bottom: 1.25rem !important;
    }
    .doc-ov__h3 {
        font-size: clamp(1.3rem, 2.6vw, 1.85rem);
        line-height: 1.15 !important;
        margin-bottom: 1rem !important;
    }
    .doc-ov__body {
        font-size: clamp(0.98rem, 1.4vw, 1.08rem);
        line-height: 1.75;
        color: var(--doc-muted);
        margin: 0;
        max-width: 42rem;
    }
    .doc-ov__body--ink { color: var(--doc-ink); }
    .doc-ov__body--note {
        font-family: 'Newsreader', Georgia, serif;
        font-style: italic;
        color: var(--doc-ember-soft);
    }
    .doc-ov__ref {
        display: block;
        font-family: 'Newsreader', Georgia, serif;
        font-style: italic;
        font-size: 0.95rem;
        color: var(--doc-ember-soft);
        margin: 0 0 0.4rem;
    }
    .doc-ov__num {
        display: block;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: var(--doc-ember);
    }
    .doc-ov__statement {
        font-family: 'Newsreader', Georgia, serif;
        font-size: clamp(1.25rem, 2.4vw, 1.75rem);
        line-height: 1.38;
        color: var(--doc-ink);
        max-width: 44rem;
        margin: 2rem 0 0;
        padding-top: 1.5rem;
        border-top: 1px solid var(--doc-line);
    }
    .doc-ov__quote {
        margin: 0;
        padding-left: clamp(1rem, 2vw, 1.5rem);
        border-left: 3px solid var(--doc-ember);
    }
    .doc-ov__quote p {
        font-family: 'Newsreader', Georgia, serif;
        font-style: italic;
        font-size: clamp(1.15rem, 2.4vw, 1.6rem);
        line-height: 1.4;
        color: var(--doc-ink);
        margin: 0 0 0.75rem;
    }
    .doc-ov__quote cite {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        font-style: normal;
        color: var(--doc-dim);
    }
    .doc-ov__sec-head { max-width: 46rem; margin-bottom: clamp(2rem, 4vw, 3rem); }
    .doc-ov__split { display: grid; gap: clamp(1.75rem, 4vw, 3rem); }
    @media (min-width: 960px) {
        .doc-ov__split { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }
    }
    .doc-ov__stack { display: grid; gap: 1.5rem; align-content: start; }

    /* ------------------- The gospel of the kingdom ------------------- */
    .doc-ov__gospel {
        display: grid;
        gap: clamp(2rem, 5vw, 4rem);
        padding: clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 6vw, 7rem) clamp(3rem, 6vw, 4.5rem);
        border-top: 1px solid var(--doc-line);
    }
    @media (min-width: 960px) {
        .doc-ov__gospel { grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr); }
    }
    .doc-ov__gospel-text { max-width: 36rem; }
    .doc-ov__witnesses {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    .doc-ov__witnesses li {
        padding: 1.1rem 0;
        border-top: 1px solid var(--doc-line);
    }
    .doc-ov__witnesses li:last-child { border-bottom: 1px solid var(--doc-line); }

    /* ------------------------------ Chart ------------------------------ */
    .doc-ov__chartwrap { padding: 0 clamp(1.5rem, 6vw, 7rem) clamp(3rem, 6vw, 5rem); }
    .doc-ov__readkey {
        max-width: 46rem;
        padding: clamp(2.5rem, 5vw, 4rem) 0 clamp(1.5rem, 3vw, 2.25rem);
        border-top: 1px solid var(--doc-line);
    }

    .doc-ov__hint {
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
    .doc-ov__hint-sep { opacity: 0.6; }

    .doc-ov__legend {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem 1.25rem;
        margin-bottom: clamp(1.5rem, 3vw, 2.25rem);
    }
    .doc-ov__key {
        display: inline-flex;
        align-items: center;
        gap: 0.6rem;
        background: none;
        border: none;
        padding: 0.35rem 0;
        cursor: pointer;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: var(--doc-muted);
        transition: color 0.3s ease, opacity 0.3s ease;
    }
    .doc-ov__key:hover { color: var(--doc-ink); }
    .doc-ov__key.is-out { opacity: 0.4; }
    /* The colour means a time on the original chart; the band's name follows it. */
    .doc-ov__key-time { color: var(--doc-ink); }
    .doc-ov__key-label { color: var(--doc-dim); }
    .doc-ov__key:hover .doc-ov__key-label { color: var(--doc-muted); }
    .doc-ov__swatch {
        width: 0.85rem;
        height: 0.85rem;
        border-radius: 2px;
        border: 1px solid rgba(0, 0, 0, 0.35);
    }

    /* The grid is proportional, so it needs a floor before the labels break
       apart — below that the whole chart scrolls sideways instead. */
    .doc-ov__scroll { overflow-x: auto; padding-bottom: 0.75rem; }
    .doc-ov__chart { min-width: 58rem; display: flex; flex-direction: column; gap: 0.35rem; }

    .doc-ov__band {
        display: grid;
        grid-template-columns: 7.5rem minmax(0, 1fr);
        gap: 0.75rem;
        align-items: stretch;
    }

    .doc-ov__rowlabel {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        text-align: right;
        background: none;
        border: none;
        border-right: 1px solid var(--doc-line);
        padding: 0 0.9rem 0 0;
        cursor: pointer;
        font-family: 'Newsreader', Georgia, serif;
        font-size: clamp(0.95rem, 1.5vw, 1.15rem);
        color: var(--doc-muted);
        transition: color 0.3s ease, border-color 0.3s ease, opacity 0.3s ease;
    }
    .doc-ov__rowlabel.is-lit { color: var(--doc-ember-soft); border-right-color: var(--doc-ember); }
    .doc-ov__rowlabel.is-dim { opacity: 0.4; }

    .doc-ov__grid { display: grid; gap: 0.25rem; }

    .doc-ov__cell {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 0.6rem 0.55rem;
        border: 1px solid rgba(0, 0, 0, 0.45);
        border-radius: 2px;
        cursor: pointer;
        font-family: 'Public Sans', sans-serif;
        font-weight: 700;
        font-size: clamp(0.7rem, 1.05vw, 0.9rem);
        line-height: 1.2;
        color: var(--cell-ink);
        transition: opacity 0.25s ease, filter 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
    }
    .doc-ov__cell--blank { cursor: default; }
    /* Two columns in the source chart are too narrow for horizontal text, and
       stay vertical here for the same reason. */
    .doc-ov__cell--vertical span {
        writing-mode: vertical-rl;
        transform: rotate(180deg);
        white-space: nowrap;
    }

    .doc-ov__cell[data-phase='persecution'] { background: var(--ph-persecution); }
    .doc-ov__cell[data-phase='judgment'] { background: var(--ph-judgment); }
    .doc-ov__cell[data-phase='cosmic'] { background: var(--ph-cosmic); }
    .doc-ov__cell[data-phase='kingdom'] { background: var(--ph-kingdom); }
    .doc-ov__swatch[data-phase='persecution'] { background: var(--ph-persecution); }
    .doc-ov__swatch[data-phase='judgment'] { background: var(--ph-judgment); }
    .doc-ov__swatch[data-phase='cosmic'] { background: var(--ph-cosmic); }
    .doc-ov__swatch[data-phase='kingdom'] { background: var(--ph-kingdom); }

    /* The response: everything off the line of enquiry recedes, the parallels
       stay lit, and the block itself lifts. */
    .doc-ov__cell[data-state='dim'] { opacity: 0.26; filter: saturate(0.45); }
    .doc-ov__cell[data-state='lit'] { opacity: 1; }
    .doc-ov__cell[data-state='active'] {
        opacity: 1;
        transform: translateY(-2px);
        box-shadow: 0 0 0 2px var(--doc-ember), 0 10px 26px var(--doc-shadow);
    }
    .doc-ov__cell[aria-pressed='true'] { box-shadow: 0 0 0 2px var(--doc-ember); }

    /* ---------------------------- Reading panel ---------------------------- */
    .doc-ov__panel {
        margin-top: clamp(1.5rem, 3vw, 2.5rem);
        border-top: 1px solid var(--doc-line);
        border-left: 2px solid var(--doc-ember);
        padding: clamp(1.25rem, 3vw, 2rem) clamp(1.25rem, 3vw, 2rem);
        background: var(--doc-line-soft);
        min-height: 11rem;
    }
    .doc-ov__panel-meta {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.6rem;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        margin: 0 0 0.9rem;
    }
    .doc-ov__panel-row { color: var(--doc-ember); }
    .doc-ov__dot { color: var(--doc-dim); }
    .doc-ov__panel-phase[data-phase='persecution'] { color: var(--ph-persecution); }
    .doc-ov__panel-phase[data-phase='judgment'] { color: var(--ph-judgment); }
    .doc-ov__panel-phase[data-phase='cosmic'] { color: var(--ph-cosmic); }
    .doc-ov__panel-phase[data-phase='kingdom'] { color: var(--ph-kingdom); }

    .doc-ov__panel-title {
        font-size: clamp(1.5rem, 3vw, 2.2rem);
        line-height: 1.1;
        margin-bottom: 0.6rem !important;
    }
    .doc-ov__panel-refs {
        font-family: 'Newsreader', Georgia, serif;
        font-style: italic;
        font-size: 1rem;
        color: var(--doc-ember-soft);
        margin: 0 0 0.9rem;
    }
    .doc-ov__panel-note {
        font-size: 1.02rem;
        line-height: 1.75;
        color: var(--doc-muted);
        max-width: 46rem;
        margin: 0;
    }
    .doc-ov__panel-note--lead {
        font-family: 'Newsreader', Georgia, serif;
        font-style: italic;
        font-size: clamp(1.05rem, 1.8vw, 1.3rem);
        color: var(--doc-muted);
    }
    .doc-ov__unpin {
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
    .doc-ov__unpin:hover { border-color: var(--doc-ember); color: var(--doc-ember); }

    /* -------------------------- Study sections -------------------------- */
    .doc-ov__sec,
    .doc-ov__across,
    .doc-ov__notes {
        padding: clamp(3rem, 7vw, 5.5rem) clamp(1.5rem, 6vw, 7rem);
        border-top: 1px solid var(--doc-line);
    }
    .doc-ov__sec--alt { background: var(--doc-bg-2); }

    /* I — the four beasts, then the blank */
    .doc-ov__beasts {
        list-style: none;
        margin: 0 0 clamp(2rem, 4vw, 3rem);
        padding: 0;
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 0.75rem;
    }
    @media (min-width: 860px) { .doc-ov__beasts { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
    .doc-ov__beast {
        display: grid;
        gap: 0.4rem;
        align-content: start;
        padding: 1.15rem;
        border: 1px solid var(--doc-line);
        border-radius: 2px;
        background: var(--doc-bg-2);
    }
    .doc-ov__beast.is-last { border-color: var(--doc-ember); }
    .doc-ov__beast-name {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.5625rem;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: var(--doc-dim);
        line-height: 1.6;
    }
    .doc-ov__beast-empire {
        font-family: 'Newsreader', Georgia, serif;
        font-size: clamp(1.15rem, 2vw, 1.4rem);
        line-height: 1.2;
        color: var(--doc-ink);
    }
    .doc-ov__beast-state {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.5625rem;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: var(--doc-dim);
        line-height: 1.7;
    }
    .doc-ov__beast.is-last .doc-ov__beast-state { color: var(--doc-ember-soft); }

    .doc-ov__verdicts { list-style: none; margin: 0; padding: 0; display: grid; gap: 1.5rem; }
    .doc-ov__verdicts li { border-top: 1px solid var(--doc-line); padding-top: 1.1rem; }
    .doc-ov__verdicts .doc-ov__num { margin-bottom: 0.65rem; }

    /* The gap Daniel leaves, drawn as a gap. */
    .doc-ov__blank {
        padding: clamp(1.5rem, 3vw, 2rem);
        border: 1px dashed var(--doc-line);
        border-radius: 2px;
        display: grid;
        gap: 0.75rem;
    }
    .doc-ov__blank-title {
        font-family: 'Newsreader', Georgia, serif;
        font-size: clamp(1.25rem, 2.2vw, 1.5rem);
        color: var(--doc-ink);
        margin: 0;
    }

    /* II — each block carries the colour of its band on the chart */
    .doc-ov__phaseblock {
        border-left: 3px solid var(--band, var(--doc-line));
        padding-left: clamp(1rem, 2.5vw, 1.75rem);
        margin-bottom: clamp(2.5rem, 5vw, 4rem);
    }
    .doc-ov__phaseblock:last-child { margin-bottom: 0; }
    .doc-ov__phaseblock[data-phase='persecution'] { --band: var(--ph-persecution); }
    .doc-ov__phaseblock[data-phase='judgment'] { --band: var(--ph-judgment); }
    .doc-ov__phaseblock[data-phase='cosmic'] { --band: var(--ph-cosmic); }
    .doc-ov__phaselabel {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        color: var(--band, var(--doc-dim));
        margin: 0 0 1rem;
    }

    .doc-ov__horses {
        list-style: none;
        margin: 0 0 1.5rem;
        padding: 0;
        display: grid;
        gap: clamp(1.5rem, 3vw, 2rem);
    }
    @media (min-width: 900px) { .doc-ov__horses { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
    .doc-ov__horses li { border-top: 1px solid var(--doc-line); padding-top: 1.1rem; }
    .doc-ov__horses .doc-ov__num { margin-bottom: 0.6rem; }
    .doc-ov__horse-name {
        font-size: clamp(1.2rem, 2.2vw, 1.5rem);
        margin-bottom: 0.6rem !important;
    }

    /* The one line on the page that says where the reader is standing. */
    .doc-ov__marker {
        font-family: 'Newsreader', Georgia, serif;
        font-size: clamp(1.4rem, 3vw, 2rem);
        line-height: 1.25;
        color: var(--ph-judgment);
        margin: 0;
        padding-top: 1.25rem;
        border-top: 1px solid var(--doc-line);
    }

    .doc-ov__sealed {
        margin-top: clamp(2rem, 4vw, 3rem);
        padding-top: clamp(1.5rem, 3vw, 2.25rem);
        border-top: 1px solid var(--doc-line);
    }
    .doc-ov__points {
        list-style: none;
        margin: 1.75rem 0 0;
        padding: 0;
        display: grid;
        gap: clamp(1.5rem, 3vw, 2.25rem);
    }
    @media (min-width: 900px) { .doc-ov__points { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
    .doc-ov__points li { border-top: 1px solid var(--doc-line); padding-top: 1.1rem; }
    .doc-ov__points .doc-ov__num { margin-bottom: 0.65rem; }
    .doc-ov__point-title {
        font-family: 'Newsreader', Georgia, serif;
        font-weight: 400;
        font-size: clamp(1.1rem, 2vw, 1.3rem);
        line-height: 1.25;
        color: var(--doc-ink);
        margin: 0 0 0.6rem;
    }

    .doc-ov__seals { margin: 0 0 1.75rem; display: grid; gap: 0.9rem; }
    .doc-ov__seals > div {
        display: grid;
        grid-template-columns: auto minmax(0, 1fr);
        gap: 1rem;
        align-items: baseline;
        border-top: 1px solid var(--doc-line-soft);
        padding-top: 0.9rem;
    }
    .doc-ov__seals dt {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: var(--doc-ember);
    }
    .doc-ov__seals dd {
        margin: 0;
        color: var(--doc-muted);
        line-height: 1.7;
    }
    .doc-ov__phaseblock .doc-ov__quote { margin-bottom: 1.5rem; }

    /* III — the beast's four movements */
    .doc-ov__movements {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: clamp(1.5rem, 3vw, 2.25rem);
    }
    @media (min-width: 900px) { .doc-ov__movements { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
    .doc-ov__movement {
        border-top: 3px solid var(--band, var(--doc-line));
        padding-top: 1.1rem;
        display: grid;
        gap: 0.5rem;
        align-content: start;
    }
    .doc-ov__movement[data-phase='persecution'] { --band: var(--ph-persecution); }
    .doc-ov__movement[data-phase='judgment'] { --band: var(--ph-judgment); }
    .doc-ov__movement[data-phase='cosmic'] { --band: var(--ph-cosmic); }
    .doc-ov__movement[data-phase='kingdom'] { --band: var(--ph-kingdom); }
    .doc-ov__movement-label {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        color: var(--band, var(--doc-dim));
    }

    /* ------------------------ The chart, read across ------------------------ */
    .doc-ov__across { background: var(--doc-bg-2); }
    .doc-ov__table { width: 100%; border-collapse: collapse; }
    .doc-ov__table th[scope='col'] {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        font-weight: 400;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: var(--doc-ember);
        text-align: left;
        padding: 0 1.25rem 0.9rem 0;
        border-bottom: 1px solid var(--doc-ember);
        vertical-align: bottom;
    }
    .doc-ov__table th[scope='row'] {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        font-weight: 400;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: var(--doc-ink);
        text-align: left;
        padding: 1.1rem 1.25rem 1.1rem 0;
        border-bottom: 1px solid var(--doc-line);
        white-space: nowrap;
    }
    .doc-ov__table td {
        font-family: 'Newsreader', Georgia, serif;
        font-size: clamp(1rem, 1.7vw, 1.2rem);
        line-height: 1.45;
        color: var(--doc-ink);
        padding: 1.1rem 1.25rem 1.1rem 0;
        border-bottom: 1px solid var(--doc-line);
        vertical-align: top;
    }
    .doc-ov__table td.is-blank { color: var(--doc-dim); font-style: italic; }
    /* Narrow screens: each row becomes a labelled block rather than a table
       that has to scroll sideways. */
    @media (max-width: 760px) {
        .doc-ov__table thead { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
        .doc-ov__table,
        .doc-ov__table tbody,
        .doc-ov__table tr,
        .doc-ov__table th[scope='row'],
        .doc-ov__table td { display: block; width: 100%; }
        .doc-ov__table tr { padding: 1rem 0; border-bottom: 1px solid var(--doc-line); }
        .doc-ov__table th[scope='row'] { border: 0; padding: 0 0 0.5rem; }
        .doc-ov__table td { border: 0; padding: 0.5rem 0; }
        .doc-ov__table td::before {
            content: attr(data-label);
            display: block;
            font-family: 'JetBrains Mono', ui-monospace, monospace;
            font-size: 0.5625rem;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            color: var(--doc-ember);
            margin-bottom: 0.3rem;
        }
    }
    .doc-ov__acrossnotes {
        display: grid;
        gap: 1rem;
        margin-top: clamp(2rem, 4vw, 3rem);
    }

    /* -------------------------------- Notes -------------------------------- */
    .doc-ov__notelist { list-style: none; margin: 0; padding: 0; }
    .doc-ov__notelist li {
        display: grid;
        grid-template-columns: auto minmax(0, 1fr);
        gap: clamp(1rem, 2.5vw, 2rem);
        padding: clamp(1.25rem, 2.5vw, 1.75rem) 0;
        border-top: 1px solid var(--doc-line);
    }
    .doc-ov__notelist li:last-child { border-bottom: 1px solid var(--doc-line); }
    .doc-ov__notelist .doc-ov__num { padding-top: 0.4rem; }
    .doc-ov__note-title {
        font-size: clamp(1.2rem, 2.2vw, 1.5rem);
        line-height: 1.2 !important;
        margin-bottom: 0.7rem !important;
    }
    .doc-ov__notes .doc-ov__body { max-width: 46rem; }

    /* Closing */
    .doc-ov__close {
        border-top: 1px solid var(--doc-line);
        padding: clamp(3.5rem, 8vw, 6rem) clamp(1.5rem, 6vw, 7rem) clamp(4rem, 9vw, 8rem);
        max-width: 64rem;
    }
    .doc-ov__close-title {
        font-size: clamp(1.9rem, 4vw, 3rem);
        line-height: 1.1;
        margin-bottom: 1.5rem !important;
    }
    .doc-ov__actions { display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 2.5rem; }
    .doc-ov__btn {
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
    .doc-ov__btn:hover { border-color: var(--doc-ember); color: var(--doc-ember-soft); }
    .doc-ov__btn svg { width: 1rem; height: 1rem; transition: transform 0.3s ease; }
    .doc-ov__btn:hover svg { transform: translateX(4px); }
    .doc-ov__btn--quiet { color: var(--doc-muted); }

    @media (prefers-reduced-motion: reduce) {
        .doc-ov :where(a, button, .doc-ov__cell) { transition: none !important; }
        .doc-ov__cell[data-state='active'] { transform: none; }
    }
</style>
