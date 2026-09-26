<script>
    import {
        TRUMPETS,
        INTERLUDE,
        INTERLUDE_COLUMNS,
        FLASHBACK_CELLS
    } from '$lib/data/flashback-trumpets.js';

    // The control this chart is built around: with the middle retracted the
    // seven trumpets stand in an unbroken row, and expanding it puts
    // Revelation 10:1 – 11:14 back between the sixth and the seventh.
    let open = $state(false);

    // Same reading behaviour as the parallel chart — hover drives it on a
    // pointer, and a tap pins a block where there is no hover.
    let hovered = $state(/** @type {string | null} */ (null));
    let pinned = $state(/** @type {string | null} */ (null));
    let hoveredBand = $state(/** @type {string | null} */ (null));

    let activeCell = $derived(
        FLASHBACK_CELLS.find((cell) => cell.id === (hovered ?? pinned)) ?? null
    );
    let activeBand = $derived(hoveredBand ?? activeCell?.band ?? null);
    let anyActive = $derived(Boolean(activeBand));

    // The first six blasts sit to the left of the gap; the seventh sits after it.
    const beforeGap = TRUMPETS.slice(0, 6);
    const afterGap = TRUMPETS[6];

    const interludeColumns = INTERLUDE_COLUMNS.map((width) => `${width}fr`).join(' ');

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

    function toggleGap() {
        open = !open;
        // A block inside the gap cannot stay pinned once the gap is shut.
        if (!open && FLASHBACK_CELLS.find((cell) => cell.id === pinned)?.band === 'interlude') {
            pinned = null;
        }
    }
</script>

<div class="fbt">
    <div class="fbt__controls">
        <div class="fbt__hint">
            <span>Hover a block to read it</span>
            <span class="fbt__hint-sep" aria-hidden="true">·</span>
            <span>tap or click to pin one</span>
        </div>

        <button
            type="button"
            class="fbt__toggle"
            class:is-open={open}
            aria-expanded={open}
            aria-controls="fbt-gap"
            onclick={toggleGap}
        >
            <span class="fbt__toggle-icon" aria-hidden="true">
                <span class="fbt__toggle-bar"></span>
                <span class="fbt__toggle-bar fbt__toggle-bar--v"></span>
            </span>
            {open ? 'Retract the flashback' : 'Expand the flashback'}
        </button>
    </div>

    <!-- The two bands double as controls, the way the legend does on the
         parallel chart: they light everything belonging to one of them. -->
    <div class="fbt__legend">
        <button
            type="button"
            class="fbt__key"
            class:is-out={anyActive && activeBand !== 'trumpet'}
            onmouseenter={() => (hoveredBand = 'trumpet')}
            onmouseleave={() => (hoveredBand = null)}
            onfocus={() => (hoveredBand = 'trumpet')}
            onblur={() => (hoveredBand = null)}
        >
            <span class="fbt__swatch fbt__swatch--trumpet" aria-hidden="true"></span>
            The seven trumpets
        </button>
        <button
            type="button"
            class="fbt__key"
            class:is-out={anyActive && activeBand !== 'interlude'}
            onmouseenter={() => (hoveredBand = 'interlude')}
            onmouseleave={() => (hoveredBand = null)}
            onfocus={() => (hoveredBand = 'interlude')}
            onblur={() => (hoveredBand = null)}
        >
            <span class="fbt__swatch fbt__swatch--flash" aria-hidden="true"></span>
            The flashback · Rev 10:1 – 11:14
        </button>
        <span class="fbt__key fbt__key--static">
            <span class="fbt__badge fbt__badge--woe fbt__badge--mini" aria-hidden="true">5</span>
            A woe trumpet
        </span>
    </div>

    <!-- The chart scrolls sideways rather than reflowing: the order of the
         columns is the whole argument, and stacking would lose it. -->
    <div class="fbt__scroll">
        <div
            class="fbt__track"
            data-open={open}
            role="group"
            aria-label="The seven trumpets, with the flashback between the sixth and the seventh"
            onmouseleave={clearAll}
        >
            {#each beforeGap as trumpet}
                <div class="fbt__col">
                    <span class="fbt__badge" class:fbt__badge--woe={trumpet.woe}>{trumpet.n}</span>
                    <button
                        type="button"
                        class="fbt__bar"
                        class:fbt__bar--hollow={trumpet.hollow}
                        data-tone={trumpet.tone}
                        data-state={stateOf({ id: trumpet.id, band: 'trumpet' })}
                        aria-pressed={pinned === trumpet.id}
                        onmouseenter={() => (hovered = trumpet.id)}
                        onmouseleave={() => (hovered = null)}
                        onfocus={() => (hovered = trumpet.id)}
                        onblur={() => (hovered = null)}
                        onclick={() => togglePin(trumpet.id)}
                    >
                        <span>{trumpet.label}</span>
                    </button>
                </div>
            {/each}

            <!-- ============================ THE GAP ============================ -->
            <div class="fbt__gap" id="fbt-gap" data-open={open}>
                <p class="fbt__gap-head" aria-hidden={!open}>Flashback · Revelation 10:1 – 11:14</p>

                <div class="fbt__gap-body">
                    <div
                        class="fbt__gap-grid"
                        style="grid-template-columns: {interludeColumns};"
                        inert={!open}
                    >
                        {#each INTERLUDE as cell}
                            {@const placed = `grid-column: ${cell.col} / span ${cell.span ?? 1}; grid-row: ${cell.row ?? 1} / span ${cell.rowSpan ?? 1};`}
                            <button
                                type="button"
                                class="fbt__cell"
                                class:fbt__cell--vertical={cell.vertical}
                                data-tone={cell.tone}
                                data-state={stateOf({ id: cell.id, band: 'interlude' })}
                                style={placed}
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

                    <!-- With the gap shut, the seam stays visible as a hairline —
                         and is itself the way back in. -->
                    <button
                        type="button"
                        class="fbt__seam"
                        aria-label="Expand the flashback, Revelation 10:1 to 11:14"
                        aria-expanded={open}
                        aria-controls="fbt-gap"
                        tabindex={open ? -1 : 0}
                        onclick={toggleGap}
                    >
                        <span class="fbt__seam-plus" aria-hidden="true">+</span>
                    </button>
                </div>
            </div>

            <div class="fbt__col">
                <span class="fbt__badge fbt__badge--woe">{afterGap.n}</span>
                <button
                    type="button"
                    class="fbt__bar fbt__bar--tall"
                    data-tone={afterGap.tone}
                    data-state={stateOf({ id: afterGap.id, band: 'trumpet' })}
                    aria-pressed={pinned === afterGap.id}
                    onmouseenter={() => (hovered = afterGap.id)}
                    onmouseleave={() => (hovered = null)}
                    onfocus={() => (hovered = afterGap.id)}
                    onblur={() => (hovered = null)}
                    onclick={() => togglePin(afterGap.id)}
                >
                    <span>{afterGap.label}</span>
                </button>
            </div>
        </div>
    </div>

    <!-- The caption answers the toggle, so working it reads as an argument
         rather than as an animation. -->
    <p class="fbt__state" aria-live="polite">
        {#if open}
            <span class="fbt__state-mark">Expanded</span>
            Two chapters now stand between the sixth blast and the seventh - and every one of them
            covers ground the trumpets have already passed.
        {:else}
            <span class="fbt__state-mark">Retracted</span>
            Nothing is missing. Six runs into seven, the count is unbroken, and the sequence reads as
            one line from the first blast to the last.
        {/if}
    </p>

    <!-- ============================ READING PANEL ============================ -->
    <div class="fbt__panel" aria-live="polite">
        {#if activeCell}
            <p class="fbt__panel-meta">
                <span class="fbt__panel-band" data-band={activeCell.band}>{activeCell.bandLabel}</span>
            </p>
            <h3 class="fbt__panel-title">{activeCell.label}</h3>
            <p class="fbt__panel-refs">{activeCell.refs}</p>
            <p class="fbt__panel-note">{activeCell.note}</p>
            {#if pinned === activeCell.id}
                <button type="button" class="fbt__unpin" onclick={() => (pinned = null)}>Unpin</button>
            {/if}
        {:else}
            <p class="fbt__panel-note fbt__panel-note--lead">
                Seven blasts, one line. Work the toggle and watch what the gap does - and what it does
                not do to the count.
            </p>
        {/if}
    </div>
</div>

<style>
    .fbt {
        /* The chart's palette, kept to the colour logic of the reference. */
        --t-ice: #bcd9f0;
        --t-fire: #ec4128;
        --t-ash: #c0c0c0;
        --t-amber: #edb445;
        --t-deep: #1f4fd8;
        --t-ember: #f2801f;
        --t-gold: #f2d94f;
        --t-life: #4fc424;
        --t-sky: #b9d8f2;
        --cell-ink: #14140f;

        /* One row height for the whole chart, so working the toggle moves the
           chart sideways only and never jumps the page. */
        --row-h: 17.5rem;
        --bar-w: 3.15rem;
        --badge-h: 2.4rem;
        --gap-w: 46rem;
        --seam-w: 1.75rem;
    }

    /* ------------------------------ Controls ------------------------------ */
    .fbt__controls {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        margin-bottom: 1.25rem;
    }
    .fbt__hint {
        display: flex;
        flex-wrap: wrap;
        gap: 0.6rem;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: var(--doc-dim);
    }
    .fbt__hint-sep { opacity: 0.6; }

    .fbt__toggle {
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
    .fbt__toggle:hover { background: var(--doc-ember); color: var(--doc-bg); }
    .fbt__toggle:hover .fbt__toggle-bar { background: var(--doc-bg); }

    /* A plus that closes into a minus — the same gesture as the chart itself. */
    .fbt__toggle-icon { position: relative; width: 0.75rem; height: 0.75rem; }
    .fbt__toggle-bar {
        position: absolute;
        inset: 50% 0 auto 0;
        height: 1.5px;
        background: var(--doc-ember);
        transform: translateY(-50%);
        transition: background 0.3s ease, transform 0.35s ease, opacity 0.35s ease;
    }
    .fbt__toggle-bar--v { transform: translateY(-50%) rotate(90deg); }
    .fbt__toggle.is-open .fbt__toggle-bar--v { transform: translateY(-50%) rotate(0deg); opacity: 0; }

    /* ------------------------------- Legend ------------------------------- */
    .fbt__legend {
        display: flex;
        flex-wrap: wrap;
        /* Over the chart, matching the seals. */
        justify-content: center;
        gap: 0.5rem 1.5rem;
        margin-bottom: clamp(1.25rem, 3vw, 2rem);
    }
    .fbt__key {
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
    .fbt__key:hover { color: var(--doc-ink); }
    .fbt__key.is-out { opacity: 0.4; }
    .fbt__key--static { cursor: default; color: var(--doc-dim); }
    .fbt__swatch {
        width: 0.85rem;
        height: 0.85rem;
        border-radius: 2px;
        border: 1px solid rgba(0, 0, 0, 0.35);
    }
    .fbt__swatch--trumpet {
        background: linear-gradient(135deg, var(--t-ice) 0 33%, var(--t-fire) 33% 66%, var(--t-gold) 66% 100%);
    }
    .fbt__swatch--flash { background: var(--t-life); }

    /* -------------------------------- Chart -------------------------------- */
    .fbt__scroll { overflow-x: auto; overflow-y: hidden; padding-bottom: 0.75rem; }

    .fbt__track {
        display: flex;
        align-items: flex-start;
        gap: 0.3rem;
        width: max-content;
        /* See the seals chart: centred while it fits, anchored to its start and
           scrollable once the open gap pushes it past the page. */
        margin-inline: auto;
        padding: 0.25rem 0.25rem 0.5rem;
    }

    .fbt__col {
        flex: 0 0 var(--bar-w);
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    /* Badges — the woe trumpets are ringed, as in the chart. */
    .fbt__badge {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 1.85rem;
        height: var(--badge-h);
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 1.05rem;
        font-weight: 700;
        color: var(--doc-muted);
        line-height: 1;
    }
    .fbt__badge--woe {
        width: 1.85rem;
        height: 1.85rem;
        margin-bottom: calc(var(--badge-h) - 1.85rem);
        border-radius: 50%;
        background: #d8281c;
        color: #fff;
        font-size: 0.95rem;
    }
    .fbt__badge--mini { width: 1.15rem; height: 1.15rem; margin: 0; font-size: 0.6rem; }

    /* The trumpet bars. Vertical text, as the reference has them — the columns
       are narrow because the sequence, not the wording, is the point. */
    .fbt__bar {
        width: 100%;
        height: calc(var(--row-h) * 0.84);
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
    .fbt__bar--tall { height: var(--row-h); }
    .fbt__bar span {
        writing-mode: vertical-rl;
        transform: rotate(180deg);
        white-space: nowrap;
    }
    .fbt__bar--hollow {
        background: transparent !important;
        border: 2px solid var(--t-amber);
        color: var(--t-amber);
    }

    /* ---------------------------- The gap itself ---------------------------- */
    .fbt__gap {
        flex: 0 0 var(--seam-w);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        transition: flex-basis 0.62s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .fbt__gap[data-open='true'] { flex: 0 0 var(--gap-w); }

    .fbt__gap-head {
        height: var(--badge-h);
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0;
        white-space: nowrap;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.58rem;
        letter-spacing: 0.26em;
        text-transform: uppercase;
        color: var(--doc-ember);
        opacity: 0;
        transition: opacity 0.35s ease 0.1s;
    }
    .fbt__gap[data-open='true'] .fbt__gap-head { opacity: 1; }

    .fbt__gap-body { position: relative; height: var(--row-h); }

    /* The grid keeps its full width whatever the gap is doing, so the blocks are
       clipped by the fold rather than squashed by it. */
    .fbt__gap-grid {
        display: grid;
        gap: 0.25rem;
        grid-template-rows: repeat(2, minmax(0, 1fr));
        width: var(--gap-w);
        height: 100%;
        padding-left: 0.35rem;
        opacity: 0;
        transition: opacity 0.4s ease;
    }
    .fbt__gap[data-open='true'] .fbt__gap-grid { opacity: 1; transition-delay: 0.14s; }

    .fbt__cell {
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
        font-size: clamp(0.78rem, 1vw, 0.95rem);
        line-height: 1.2;
        color: var(--cell-ink);
        transition: opacity 0.25s ease, filter 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
    }
    .fbt__cell--vertical span {
        writing-mode: vertical-rl;
        transform: rotate(180deg);
        white-space: nowrap;
    }

    /* Shut, the gap is still marked: a dashed seam that is itself the way in. */
    .fbt__seam {
        position: absolute;
        inset: 0 auto 0 0;
        width: var(--seam-w);
        display: flex;
        align-items: center;
        justify-content: center;
        background: none;
        border: none;
        border-left: 1px dashed var(--doc-ember);
        border-right: 1px dashed var(--doc-ember);
        cursor: pointer;
        opacity: 1;
        transition: opacity 0.3s ease;
    }
    .fbt__gap[data-open='true'] .fbt__seam { opacity: 0; pointer-events: none; }
    .fbt__seam-plus {
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
    .fbt__seam:hover .fbt__seam-plus { background: var(--doc-ember); color: var(--doc-bg); }

    /* -------------------------------- Tones -------------------------------- */
    [data-tone='ice'] { background: var(--t-ice); }
    [data-tone='fire'] { background: var(--t-fire); color: #fff; }
    [data-tone='ash'] { background: var(--t-ash); }
    [data-tone='amber'] { background: var(--t-amber); }
    [data-tone='deep'] { background: var(--t-deep); color: #fff; }
    [data-tone='ember'] { background: var(--t-ember); }
    [data-tone='gold'] { background: var(--t-gold); }
    [data-tone='life'] { background: var(--t-life); }
    [data-tone='sky'] { background: var(--t-sky); }

    /* The response: whatever is off the line of enquiry recedes. */
    [data-state='dim'] { opacity: 0.26; filter: saturate(0.45); }
    [data-state='lit'] { opacity: 1; }
    [data-state='active'] {
        opacity: 1;
        transform: translateY(-2px);
        box-shadow: 0 0 0 2px var(--doc-ember), 0 10px 26px var(--doc-shadow);
    }
    .fbt__bar[aria-pressed='true'],
    .fbt__cell[aria-pressed='true'] { box-shadow: 0 0 0 2px var(--doc-ember); }

    /* ---------------------------- Caption & panel ---------------------------- */
    .fbt__state {
        margin: 1rem 0 0;
        max-width: 46rem;
        font-family: 'Newsreader', Georgia, serif;
        font-style: italic;
        font-size: clamp(1rem, 1.6vw, 1.2rem);
        line-height: 1.65;
        color: var(--doc-muted);
    }
    .fbt__state-mark {
        display: inline-block;
        margin-right: 0.6rem;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-style: normal;
        font-size: 0.625rem;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        color: var(--doc-ember);
    }

    .fbt__panel {
        margin-top: clamp(1.5rem, 3vw, 2.5rem);
        border-top: 1px solid var(--doc-line);
        border-left: 2px solid var(--doc-ember);
        padding: clamp(1.25rem, 3vw, 2rem);
        background: var(--doc-line-soft);
        min-height: 11rem;
    }
    .fbt__panel-meta {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        margin: 0 0 0.9rem;
    }
    .fbt__panel-band[data-band='trumpet'] { color: var(--doc-ember); }
    .fbt__panel-band[data-band='interlude'] { color: var(--t-life); }
    .fbt__panel-title {
        font-family: 'Newsreader', Georgia, serif;
        font-weight: 400;
        color: var(--doc-ink);
        letter-spacing: -0.018em;
        font-size: clamp(1.5rem, 3vw, 2.2rem);
        line-height: 1.1;
        margin: 0 0 0.6rem;
    }
    .fbt__panel-refs {
        font-family: 'Newsreader', Georgia, serif;
        font-style: italic;
        font-size: 1rem;
        color: var(--doc-ember-soft);
        margin: 0 0 0.9rem;
    }
    .fbt__panel-note {
        font-size: 1.02rem;
        line-height: 1.75;
        color: var(--doc-muted);
        max-width: 46rem;
        margin: 0;
    }
    .fbt__panel-note--lead {
        font-family: 'Newsreader', Georgia, serif;
        font-style: italic;
        font-size: clamp(1.05rem, 1.8vw, 1.3rem);
    }
    .fbt__unpin {
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
    .fbt__unpin:hover { border-color: var(--doc-ember); color: var(--doc-ember); }

    /* The chart is tall on a phone; give it back some height there. */
    @media (max-width: 640px) {
        .fbt { --row-h: 15rem; --gap-w: 40rem; }
    }

    @media (prefers-reduced-motion: reduce) {
        .fbt :where(button, .fbt__gap, .fbt__gap-grid, .fbt__gap-head) { transition: none !important; }
        [data-state='active'] { transform: none; }
    }
</style>
