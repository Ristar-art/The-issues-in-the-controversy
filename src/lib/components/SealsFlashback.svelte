<script>
    import {
        SEAL_STEPS,
        REV7,
        REV7_COLUMNS,
        SEALS_FLASHBACK_CELLS
    } from '$lib/data/flashback-seals.js';

    // Retracted, the seven seals stand as one line and the place where
    // Revelation 7 is printed is nothing more than a hairline between the sixth
    // and the seventh. Expanded, the chapter drops out — not into that seam,
    // but underneath the fifth seal, where its events belong, with the tether
    // left behind to show where the text puts it.
    let open = $state(false);

    let hovered = $state(/** @type {string | null} */ (null));
    let pinned = $state(/** @type {string | null} */ (null));
    let hoveredBand = $state(/** @type {string | null} */ (null));

    let activeCell = $derived(
        SEALS_FLASHBACK_CELLS.find((cell) => cell.id === (hovered ?? pinned)) ?? null
    );
    let activeBand = $derived(hoveredBand ?? activeCell?.band ?? null);
    let anyActive = $derived(Boolean(activeBand));

    const beforeSeam = SEAL_STEPS.slice(0, 6);
    const afterSeam = SEAL_STEPS[6];
    const rev7Columns = REV7_COLUMNS.map((width) => `${width}fr`).join(' ');

    /** @param {{ id: string, band: string }} cell */
    function stateOf(cell) {
        if (!anyActive) return 'rest';
        if (activeCell?.id === cell.id) return 'active';
        if (cell.band === activeBand) return 'lit';
        return 'dim';
    }

    /** @param {string} id */
    function togglePin(id) {
        pinned = pinned === id ? null : id;
    }

    function clearAll() {
        hovered = null;
        hoveredBand = null;
    }

    function toggleDrop() {
        open = !open;
        // Nothing in the drop can stay pinned once the drop is shut.
        if (!open && SEALS_FLASHBACK_CELLS.find((cell) => cell.id === pinned)?.band === 'rev7') {
            pinned = null;
        }
    }
</script>

<div class="fbs">
    <div class="fbs__controls">
        <div class="fbs__hint">
            <span>Hover a block to read it</span>
            <span class="fbs__hint-sep" aria-hidden="true">·</span>
            <span>tap or click to pin one</span>
        </div>

        <button
            type="button"
            class="fbs__toggle"
            class:is-open={open}
            aria-expanded={open}
            aria-controls="fbs-drop"
            onclick={toggleDrop}
        >
            <span class="fbs__toggle-icon" aria-hidden="true">
                <span class="fbs__toggle-bar"></span>
                <span class="fbs__toggle-bar fbs__toggle-bar--v"></span>
            </span>
            {open ? 'Retract Revelation 7' : 'Expand Revelation 7'}
        </button>
    </div>

    <div class="fbs__legend">
        <button
            type="button"
            class="fbs__key"
            class:is-out={anyActive && activeBand !== 'seal'}
            onmouseenter={() => (hoveredBand = 'seal')}
            onmouseleave={() => (hoveredBand = null)}
            onfocus={() => (hoveredBand = 'seal')}
            onblur={() => (hoveredBand = null)}
        >
            <span class="fbs__swatch fbs__swatch--seal" aria-hidden="true"></span>
            The seven seals
        </button>
        <button
            type="button"
            class="fbs__key"
            class:is-out={anyActive && activeBand !== 'rev7'}
            onmouseenter={() => (hoveredBand = 'rev7')}
            onmouseleave={() => (hoveredBand = null)}
            onfocus={() => (hoveredBand = 'rev7')}
            onblur={() => (hoveredBand = null)}
        >
            <span class="fbs__swatch fbs__swatch--flash" aria-hidden="true"></span>
            The flashback · Revelation 7
        </button>
        <span class="fbs__key fbs__key--static">
            <span class="fbs__swatch fbs__swatch--seam" aria-hidden="true"></span>
            Where the text prints it
        </span>
    </div>

    <!-- The chart scrolls sideways rather than reflowing: the order of the
         columns is the whole argument, and stacking would lose it. -->
    <div class="fbs__scroll">
        <div
            class="fbs__chart"
            data-open={open}
            role="group"
            aria-label="The seven seals, with Revelation 7 dropped beneath the fifth seal"
            onmouseleave={clearAll}
        >
            {#each beforeSeam as seal}
                <span class="fbs__badge" style="grid-column: {seal.n}; grid-row: 1;">{seal.n}</span>
                <button
                    type="button"
                    class="fbs__bar"
                    class:is-holding={open && seal.holds}
                    data-tone={seal.tone}
                    data-state={stateOf({ id: seal.id, band: 'seal' })}
                    style="grid-column: {seal.n}; grid-row: 2;"
                    aria-pressed={pinned === seal.id}
                    onmouseenter={() => (hovered = seal.id)}
                    onmouseleave={() => (hovered = null)}
                    onfocus={() => (hovered = seal.id)}
                    onblur={() => (hovered = null)}
                    onclick={() => togglePin(seal.id)}
                >
                    <span>{seal.label}</span>
                </button>
            {/each}

            <!-- ============================ THE SEAM ============================ -->
            <!-- Always present, open or shut: this is the one place in the line
                 where the chapter is printed, and the count still runs through it. -->
            <button
                type="button"
                class="fbs__seam"
                style="grid-column: 7; grid-row: 2;"
                aria-label={open ? 'Retract Revelation 7' : 'Expand Revelation 7, printed between the sixth seal and the seventh'}
                aria-expanded={open}
                aria-controls="fbs-drop"
                onclick={toggleDrop}
            >
                <span class="fbs__seam-plus" aria-hidden="true">{open ? '−' : '+'}</span>
            </button>

            <span class="fbs__badge" style="grid-column: 8; grid-row: 1;">{afterSeam.n}</span>
            <button
                type="button"
                class="fbs__bar"
                data-tone={afterSeam.tone}
                data-state={stateOf({ id: afterSeam.id, band: 'seal' })}
                style="grid-column: 8; grid-row: 2;"
                aria-pressed={pinned === afterSeam.id}
                onmouseenter={() => (hovered = afterSeam.id)}
                onmouseleave={() => (hovered = null)}
                onfocus={() => (hovered = afterSeam.id)}
                onblur={() => (hovered = null)}
                onclick={() => togglePin(afterSeam.id)}
            >
                <span>{afterSeam.label}</span>
            </button>

            <!-- =========================== THE TETHER =========================== -->
            <!-- Down from the seam, left along the line, and into the fifth seal:
                 written there, happening here. -->
            <div class="fbs__tether" aria-hidden="true">
                <span class="fbs__tether-seam"></span>
                <span class="fbs__tether-run"></span>
                <span class="fbs__tether-drop"></span>
                <span class="fbs__tether-head"></span>
                <span class="fbs__tether-label">
                    Printed between 6 &amp; 7 — happening in the fifth
                </span>
            </div>

            <!-- ============================ THE DROP ============================ -->
            <div class="fbs__drop" id="fbs-drop" data-open={open} inert={!open}>
                <p class="fbs__drop-head">
                    <span class="fbs__drop-mark">Revelation 7</span>
                    The answer to the question the sixth seal ends on - who shall be able to stand?
                </p>
                <div class="fbs__drop-grid" style="grid-template-columns: {rev7Columns};">
                    {#each REV7 as cell}
                        <button
                            type="button"
                            class="fbs__cell"
                            data-tone={cell.tone}
                            data-state={stateOf({ id: cell.id, band: 'rev7' })}
                            aria-pressed={pinned === cell.id}
                            onmouseenter={() => (hovered = cell.id)}
                            onmouseleave={() => (hovered = null)}
                            onfocus={() => (hovered = cell.id)}
                            onblur={() => (hovered = null)}
                            onclick={() => togglePin(cell.id)}
                        >
                            <span>{cell.label}</span>
                        </button>
                    {/each}
                </div>
            </div>
        </div>
    </div>

    <p class="fbs__state" aria-live="polite">
        {#if open}
            <span class="fbs__state-mark">Expanded</span>
            Revelation 7 is back - but not in the seam. The winds are still being held and the
            servants are still being sealed, which puts the whole chapter inside the little season of
            the fifth seal. The dashed line shows only where it is written.
        {:else}
            <span class="fbs__state-mark">Retracted</span>
            One line, first to seventh. The hairline between the sixth and the seventh is where the
            chapter is printed - not a break in the count, and not a seal of its own.
        {/if}
    </p>

    <!-- ============================ READING PANEL ============================ -->
    <div class="fbs__panel" aria-live="polite">
        {#if activeCell}
            <p class="fbs__panel-meta">
                <span class="fbs__panel-band" data-band={activeCell.band}>{activeCell.bandLabel}</span>
            </p>
            <h3 class="fbs__panel-title">{activeCell.label}</h3>
            <p class="fbs__panel-refs">{activeCell.refs}</p>
            <p class="fbs__panel-note">{activeCell.note}</p>
            {#if pinned === activeCell.id}
                <button type="button" class="fbs__unpin" onclick={() => (pinned = null)}>Unpin</button>
            {/if}
        {:else}
            <p class="fbs__panel-note fbs__panel-note--lead">
                Seven seals, one line. Work the toggle and watch where the chapter lands - and where
                the text had put it.
            </p>
        {/if}
    </div>
</div>

<style>
    .fbs {
        --s-pure: #f0ece2;
        --s-fire: #ec4128;
        --s-ink: #2b2b2b;
        --s-pale: #a9bb9b;
        --s-amber: #edb445;
        --s-deep: #1f4fd8;
        --s-gold: #f2d94f;
        --s-life: #4fc424;
        --cell-ink: #14140f;

        --seal-w: 4.6rem;
        --seam-w: 1.75rem;
        --col-gap: 0.3rem;
        --row-h: 17.5rem;
        --badge-h: 2.4rem;
        /* Where the seam sits, measured back from the right edge of the chart —
           the tether hangs off this, so the two always agree. */
        --seam-x: calc(var(--seal-w) + var(--col-gap) + (var(--seam-w) / 2));
    }

    /* ------------------------------ Controls ------------------------------ */
    .fbs__controls {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        margin-bottom: 1.25rem;
    }
    .fbs__hint {
        display: flex;
        flex-wrap: wrap;
        gap: 0.6rem;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: var(--doc-dim);
    }
    .fbs__hint-sep { opacity: 0.6; }

    .fbs__toggle {
        display: inline-flex;
        align-items: center;
        gap: 0.7rem;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.6875rem;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: var(--doc-ink);
        background: var(--doc-line-soft);
        border: 1px solid var(--doc-ember);
        border-radius: 2px;
        padding: 0.85rem 1.4rem;
        cursor: pointer;
        transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease;
    }
    .fbs__toggle:hover { background: var(--doc-ember); color: var(--doc-bg); }
    .fbs__toggle:hover .fbs__toggle-bar { background: var(--doc-bg); }
    .fbs__toggle-icon { position: relative; width: 0.75rem; height: 0.75rem; }
    .fbs__toggle-bar {
        position: absolute;
        inset: 50% 0 auto 0;
        height: 1.5px;
        background: var(--doc-ember);
        transform: translateY(-50%);
        transition: background 0.3s ease, transform 0.35s ease, opacity 0.35s ease;
    }
    .fbs__toggle-bar--v { transform: translateY(-50%) rotate(90deg); }
    .fbs__toggle.is-open .fbs__toggle-bar--v { transform: translateY(-50%) rotate(0deg); opacity: 0; }

    /* ------------------------------- Legend ------------------------------- */
    .fbs__legend {
        display: flex;
        flex-wrap: wrap;
        /* The key belongs to the chart, so it sits over it rather than at the
           page edge. */
        justify-content: center;
        gap: 0.5rem 1.5rem;
        margin-bottom: clamp(1.25rem, 3vw, 2rem);
    }
    .fbs__key {
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
    .fbs__key:hover { color: var(--doc-ink); }
    .fbs__key.is-out { opacity: 0.4; }
    .fbs__key--static { cursor: default; color: var(--doc-dim); }
    .fbs__swatch {
        width: 0.85rem;
        height: 0.85rem;
        border-radius: 2px;
        border: 1px solid rgba(0, 0, 0, 0.35);
    }
    .fbs__swatch--seal {
        background: linear-gradient(135deg, var(--s-pure) 0 33%, var(--s-fire) 33% 66%, var(--s-deep) 66% 100%);
    }
    .fbs__swatch--flash { background: var(--s-life); }
    .fbs__swatch--seam {
        background: none;
        border: 1px dashed var(--doc-ember);
        border-radius: 0;
    }

    /* -------------------------------- Chart -------------------------------- */
    .fbs__scroll { overflow-x: auto; padding-bottom: 0.75rem; }
    .fbs__chart {
        display: grid;
        grid-template-columns: repeat(6, var(--seal-w)) var(--seam-w) var(--seal-w);
        grid-template-rows: var(--badge-h) var(--row-h) auto auto;
        column-gap: var(--col-gap);
        width: max-content;
        /* Centred while it fits. Auto margins fall to zero once the chart is
           wider than the page, so a narrow screen still scrolls from its start
           rather than clipping the first seal - which centring a flex or grid
           scroller would do. */
        margin-inline: auto;
        padding: 0.25rem 0.25rem 0.5rem;
    }

    .fbs__badge {
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 1.05rem;
        font-weight: 700;
        color: var(--doc-muted);
        line-height: 1;
    }

    /* Every seal the same height: the line is continuous, and the chart should
       not suggest otherwise. */
    .fbs__bar {
        height: var(--row-h);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.5rem 0.35rem;
        border: 1px solid rgba(0, 0, 0, 0.45);
        border-radius: 2px;
        cursor: pointer;
        font-family: 'Public Sans', sans-serif;
        font-weight: 700;
        font-size: 0.9rem;
        line-height: 1.15;
        color: var(--cell-ink);
        transition: opacity 0.25s ease, filter 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
    }
    .fbs__bar span {
        writing-mode: vertical-rl;
        transform: rotate(180deg);
        white-space: nowrap;
    }
    /* The seal the flashback belongs to, marked once the drop is open. */
    .fbs__bar.is-holding { box-shadow: 0 0 0 2px var(--doc-ember); }

    .fbs__seam {
        display: flex;
        align-items: center;
        justify-content: center;
        background: none;
        border: none;
        border-left: 1px dashed var(--doc-ember);
        border-right: 1px dashed var(--doc-ember);
        cursor: pointer;
        padding: 0;
    }
    .fbs__seam-plus {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 1.35rem;
        height: 1.35rem;
        border-radius: 50%;
        border: 1px solid var(--doc-ember);
        background: var(--doc-bg);
        color: var(--doc-ember);
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.8rem;
        line-height: 1;
        transition: background 0.3s ease, color 0.3s ease;
    }
    .fbs__seam:hover .fbs__seam-plus { background: var(--doc-ember); color: var(--doc-bg); }

    /* ------------------------------- Tether ------------------------------- */
    .fbs__tether {
        grid-column: 5 / -1;
        grid-row: 3;
        position: relative;
        height: 0;
        opacity: 0;
        transition: height 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
    }
    .fbs__chart[data-open='true'] .fbs__tether {
        height: 3.6rem;
        opacity: 1;
        transition-delay: 0.12s;
    }
    .fbs__tether span { position: absolute; }
    /* Down from the seam… */
    .fbs__tether-seam {
        top: 0;
        right: var(--seam-x);
        height: 1.7rem;
        border-left: 1px dashed var(--doc-ember);
    }
    /* …left along the line… */
    .fbs__tether-run {
        top: 1.7rem;
        right: var(--seam-x);
        left: calc(var(--seal-w) / 2);
        border-top: 1px dashed var(--doc-ember);
    }
    /* …and down into the fifth seal's column. */
    .fbs__tether-drop {
        top: 1.7rem;
        bottom: 0.35rem;
        left: calc(var(--seal-w) / 2);
        border-left: 1px solid var(--doc-ember);
    }
    .fbs__tether-head {
        bottom: 0;
        left: calc(var(--seal-w) / 2 - 0.3rem);
        width: 0;
        height: 0;
        border-left: 0.3rem solid transparent;
        border-right: 0.3rem solid transparent;
        border-top: 0.42rem solid var(--doc-ember);
    }
    /* Above the run rather than on it, so the dashed line stays readable as a
       line — it is the thing doing the arguing. */
    .fbs__tether-label {
        top: 1.7rem;
        left: 50%;
        transform: translate(-50%, -135%);
        white-space: nowrap;
        padding: 0 0.6rem;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.55rem;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: var(--doc-ember);
    }

    /* -------------------------------- Drop -------------------------------- */
    .fbs__drop {
        grid-column: 1 / -1;
        grid-row: 4;
        max-height: 0;
        opacity: 0;
        overflow: hidden;
        transition: max-height 0.55s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s ease;
    }
    .fbs__drop[data-open='true'] { max-height: 16rem; opacity: 1; transition-delay: 0.1s; }

    .fbs__drop-head {
        display: flex;
        flex-wrap: wrap;
        align-items: baseline;
        gap: 0.75rem;
        margin: 0 0 0.75rem;
        font-family: 'Newsreader', Georgia, serif;
        font-style: italic;
        font-size: 1rem;
        color: var(--doc-muted);
    }
    .fbs__drop-mark {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-style: normal;
        font-size: 0.6rem;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        color: var(--s-life);
    }
    .fbs__drop-grid { display: grid; gap: 0.25rem; }

    .fbs__cell {
        min-height: 6rem;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 0.7rem 0.6rem;
        border: 1px solid rgba(0, 0, 0, 0.45);
        border-radius: 2px;
        cursor: pointer;
        font-family: 'Public Sans', sans-serif;
        font-weight: 700;
        font-size: clamp(0.8rem, 1vw, 0.95rem);
        line-height: 1.25;
        color: var(--cell-ink);
        transition: opacity 0.25s ease, filter 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
    }

    /* -------------------------------- Tones -------------------------------- */
    [data-tone='pure'] { background: var(--s-pure); }
    [data-tone='fire'] { background: var(--s-fire); color: #fff; }
    [data-tone='ink'] { background: var(--s-ink); color: #f1ebe0; }
    [data-tone='pale'] { background: var(--s-pale); }
    [data-tone='amber'] { background: var(--s-amber); }
    [data-tone='deep'] { background: var(--s-deep); color: #fff; }
    [data-tone='gold'] { background: var(--s-gold); }
    [data-tone='life'] { background: var(--s-life); }

    [data-state='dim'] { opacity: 0.26; filter: saturate(0.45); }
    [data-state='lit'] { opacity: 1; }
    [data-state='active'] {
        opacity: 1;
        transform: translateY(-2px);
        box-shadow: 0 0 0 2px var(--doc-ember), 0 10px 26px var(--doc-shadow);
    }
    .fbs__bar[aria-pressed='true'],
    .fbs__cell[aria-pressed='true'] { box-shadow: 0 0 0 2px var(--doc-ember); }

    /* ---------------------------- Caption & panel ---------------------------- */
    .fbs__state {
        margin: 1rem 0 0;
        max-width: 46rem;
        font-family: 'Newsreader', Georgia, serif;
        font-style: italic;
        font-size: clamp(1rem, 1.6vw, 1.2rem);
        line-height: 1.65;
        color: var(--doc-muted);
    }
    .fbs__state-mark {
        display: inline-block;
        margin-right: 0.6rem;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-style: normal;
        font-size: 0.625rem;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        color: var(--doc-ember);
    }

    .fbs__panel {
        margin-top: clamp(1.5rem, 3vw, 2.5rem);
        border-top: 1px solid var(--doc-line);
        border-left: 2px solid var(--doc-ember);
        padding: clamp(1.25rem, 3vw, 2rem);
        background: var(--doc-line-soft);
        min-height: 11rem;
    }
    .fbs__panel-meta {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        margin: 0 0 0.9rem;
    }
    .fbs__panel-band[data-band='seal'] { color: var(--doc-ember); }
    .fbs__panel-band[data-band='rev7'] { color: var(--s-life); }
    .fbs__panel-title {
        font-family: 'Newsreader', Georgia, serif;
        font-weight: 400;
        color: var(--doc-ink);
        letter-spacing: -0.018em;
        font-size: clamp(1.5rem, 3vw, 2.2rem);
        line-height: 1.1;
        margin: 0 0 0.6rem;
    }
    .fbs__panel-refs {
        font-family: 'Newsreader', Georgia, serif;
        font-style: italic;
        font-size: 1rem;
        color: var(--doc-ember-soft);
        margin: 0 0 0.9rem;
    }
    .fbs__panel-note {
        font-size: 1.02rem;
        line-height: 1.75;
        color: var(--doc-muted);
        max-width: 46rem;
        margin: 0;
    }
    .fbs__panel-note--lead {
        font-family: 'Newsreader', Georgia, serif;
        font-style: italic;
        font-size: clamp(1.05rem, 1.8vw, 1.3rem);
    }
    .fbs__unpin {
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
    .fbs__unpin:hover { border-color: var(--doc-ember); color: var(--doc-ember); }

    @media (max-width: 640px) {
        .fbs { --row-h: 15rem; }
    }

    @media (prefers-reduced-motion: reduce) {
        .fbs :where(button, .fbs__tether, .fbs__drop) { transition: none !important; }
        [data-state='active'] { transform: none; }
    }
</style>
