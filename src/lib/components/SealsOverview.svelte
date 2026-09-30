<script>
    import { SEALS, JUDGEMENT, REIGN } from '$lib/data/seals.js';
    // The trumpet names come from the canonical list, so the seventh seal opens
    // on the same seven blasts everywhere on the site.
    import { TRUMPETS } from '$lib/data/flashback-trumpets.js';

    // The seals in the order of the page, each carrying the colour it is drawn
    // in. Keyed by id rather than by index so the two lists cannot drift.
    /** @type {Record<string, string>} */
    const SEAL_TONES = {
        'first-seal': 'pure',
        'second-seal': 'fire',
        'third-seal': 'ink',
        'fourth-seal': 'pale',
        'fifth-seal': 'amber',
        'sixth-seal': 'deep',
        'seventh-seal': 'gold'
    };

    // Each tier is drawn as six blocks and a seventh held apart as the circle
    // that opens the tier below it. So the rows carry one to six, and the
    // seventh of each set becomes the next set's origin.
    const sixSeals = SEALS.slice(0, 6);
    const seventhSeal = SEALS[6];
    const sixTrumpets = TRUMPETS.slice(0, 6);
    const seventhTrumpet = TRUMPETS[6];

    let hovered = $state(/** @type {string | null} */ (null));

    /** @param {string} id */
    function toneOf(id) {
        return SEAL_TONES[id] ?? 'pure';
    }
</script>

<!-- An orientation chart, not a study: one chain, read top to bottom. The
     judgement of Christ's kingdom opens the seven seals; the seventh seal
     opens the seven trumpets; the seventh trumpet ends with Christ as the
     sole ruler, and no other kingdom left standing. Every seal below links to
     its own study at /seals/[slug]. -->
<figure class="ov">
    <figcaption class="ov__cap">
        <p class="ov__kicker">The shape of it</p>
        <h3 class="ov__cap-title">The judgement of Christ’s kingdom</h3>
        <p class="ov__note">
            One line, three hand-offs. Out of the judgement come the seven seals. Out of the
            seventh seal come the seven trumpets. Out of the seventh trumpet, Christ is the sole
            ruler of the universe - there are no longer other kingdoms. Each row runs one to six,
            and the seventh is drawn as the circle beneath it, because the seventh of a set is
            never one more event: it is the door into the next seven.
        </p>
    </figcaption>

    <div class="ov__scroll">
        <div class="ov__stack">
            <!-- ==================== THE JUDGEMENT → THE SEALS ==================== -->
            <div class="ov__tier" style="--depth: 0" role="group" aria-label="The judgement opens the seven seals">
                <div class="ov__origin">
                    <span class="ov__node ov__node--court">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <path d="M12 4v17" />
                            <path d="M8.5 21h7" />
                            <path d="M3.5 6.6h17" />
                            <path d="M3.5 6.6 1 13m2.5-6.4L6 13" />
                            <path d="M1 13a2.5 2.5 0 0 0 5 0" />
                            <path d="M20.5 6.6 18 13m2.5-6.4L23 13" />
                            <path d="M18 13a2.5 2.5 0 0 0 5 0" />
                        </svg>
                    </span>
                    <span class="ov__node-cap">{JUDGEMENT.short}</span>
                </div>

                <span class="ov__link" aria-hidden="true"></span>

                <div class="ov__band">
                    {#each sixSeals as seal, i}
                        <a
                            href="/seals/{seal.id}"
                            class="ov__cell"
                            data-tone={toneOf(seal.id)}
                            data-dim={hovered !== null && hovered !== seal.id}
                            onmouseenter={() => (hovered = seal.id)}
                            onmouseleave={() => (hovered = null)}
                            onfocus={() => (hovered = seal.id)}
                            onblur={() => (hovered = null)}
                        >
                            <span class="ov__n">{i + 1}</span>
                            <span class="ov__label">{seal.title}</span>
                            <span class="ov__ref">{seal.reference}</span>
                        </a>
                    {/each}
                </div>
            </div>

            <!-- ================= THE SEVENTH SEAL → THE TRUMPETS ================= -->
            <div class="ov__tier" style="--depth: 1" role="group" aria-label="The seventh seal opens the seven trumpets">
                <!-- The descent leaves the row above between its sixth block and
                     its seventh, which is exactly where Revelation 7 is printed. -->
                <span class="ov__descent" aria-hidden="true">
                    <span class="ov__seam"><span class="ov__seam-dot"></span></span>
                    <span class="ov__descent-label">Within the seventh seal · Revelation 8 – 11</span>
                </span>

                <div class="ov__origin">
                    <a
                        href="/seals/{seventhSeal.id}"
                        class="ov__node"
                        data-tone={toneOf(seventhSeal.id)}
                        data-dim={hovered !== null && hovered !== seventhSeal.id}
                        onmouseenter={() => (hovered = seventhSeal.id)}
                        onmouseleave={() => (hovered = null)}
                        onfocus={() => (hovered = seventhSeal.id)}
                        onblur={() => (hovered = null)}
                    >
                        <span class="ov__node-n">7</span>
                    </a>
                    <span class="ov__node-cap">7th seal</span>
                </div>

                <span class="ov__link" aria-hidden="true"></span>

                <div class="ov__band">
                    {#each sixTrumpets as trumpet}
                        <div class="ov__cell ov__cell--sub" data-tone={trumpet.tone}>
                            <span class="ov__n">{trumpet.n}</span>
                            <span class="ov__label">{trumpet.label}</span>
                            <span class="ov__ref">{trumpet.refs}</span>
                        </div>
                    {/each}
                </div>
            </div>

            <!-- ================= THE SEVENTH TRUMPET → THE REIGN ================= -->
            <div class="ov__tier" style="--depth: 2" role="group" aria-label="The seventh trumpet leaves Christ the sole ruler">
                <!-- This descent leaves the trumpets between the sixth and the
                     seventh — where Revelation 10:1 – 11:14 is printed. -->
                <span class="ov__descent" aria-hidden="true">
                    <span class="ov__seam"><span class="ov__seam-dot"></span></span>
                    <span class="ov__descent-label">Within the seventh trumpet · Revelation 11:15 – 19</span>
                </span>

                <div class="ov__origin">
                    <span class="ov__node" data-tone={seventhTrumpet.tone}>
                        <span class="ov__node-n">7</span>
                    </span>
                    <span class="ov__node-cap">7th trumpet</span>
                </div>

                <span class="ov__link" aria-hidden="true"></span>

                <div class="ov__band ov__band--reign">
                    {#each REIGN.cells as cell}
                        <div class="ov__cell ov__cell--reign" data-tone={cell.tone}>
                            <span class="ov__label">{cell.label}</span>
                            <span class="ov__ref">{cell.refs}</span>
                        </div>
                    {/each}
                </div>
            </div>

            <p class="ov__verdict">
                <span class="ov__verdict-rule" aria-hidden="true"></span>
                From here the count does not continue. There is no eighth seal, no eighth trumpet
                and no second throne - Christ is the sole ruler of the universe.
            </p>
        </div>
    </div>

    <p class="ov__legend">
        <span class="ov__legend-mark" aria-hidden="true"></span>
        A flashback is printed at each of the two marked edges. Neither breaks the count - the
        seals run one to seven, and so do the trumpets. <a href="/flashbacks">The flashbacks</a>
    </p>
</figure>

<style>
    .ov {
        --s-pure: #f0ece2;
        --s-fire: #ec4128;
        --s-ink: #2b2b2b;
        --s-pale: #a9bb9b;
        --s-amber: #edb445;
        --s-deep: #1f4fd8;
        --s-gold: #f2d94f;
        --t-ice: #bcd9f0;
        --t-ash: #c0c0c0;
        --t-ember: #f2801f;
        --r-reign: #c6dab4;
        --r-reign-soft: #dde8d1;
        --cell-ink: #14140f;
        --cell-gap: 0.25rem;

        /* The circle that opens a tier, the stub that joins it to its row, and
           the drop between one tier and the next. --step is what each tier is
           indented by, so a tier's circle lands under the start of the row it
           came out of. */
        --node: clamp(3.4rem, 5.5vw, 4.5rem);
        --link: 1.1rem;
        --step: calc(var(--node) + var(--link) + var(--cell-gap));
        --drop: clamp(2.25rem, 4vw, 3.25rem);
        --band-h: 6.6rem;
        --node-off: calc((var(--band-h) - var(--node)) / 2);

        margin: 0 0 clamp(2rem, 4vw, 3rem);
    }

    .ov__cap { max-width: 46rem; margin-bottom: clamp(1.5rem, 3vw, 2rem); }
    .ov__kicker {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.28em;
        text-transform: uppercase;
        color: var(--doc-ember);
        margin: 0 0 0.85rem;
    }
    .ov__cap-title {
        font-family: 'Newsreader', Georgia, serif;
        font-weight: 400;
        font-size: clamp(1.35rem, 2.6vw, 1.9rem);
        line-height: 1.15;
        letter-spacing: -0.015em;
        color: var(--doc-ink);
        margin: 0 0 0.85rem;
    }
    .ov__note {
        font-size: 0.98rem;
        line-height: 1.7;
        color: var(--doc-muted);
        margin: 0;
    }

    /* Six columns across is the whole point, so the chart scrolls sideways on
       a narrow screen rather than stacking into a list. */
    .ov__scroll { overflow-x: auto; padding-bottom: 0.5rem; }
    /* The side padding is what the overhanging pieces sit in: the caption
       under the first circle reaches left of it, and the seam dot and its
       label sit on the right-hand edge of every row. */
    .ov__stack { min-width: 56rem; padding: 0.7rem 0.5rem 0 1.1rem; }

    /* -------------------------------- Tiers -------------------------------- */
    .ov__tier {
        position: relative;
        display: flex;
        align-items: flex-start;
        padding-left: calc(var(--depth) * var(--step));
    }
    /* Every tier but the first drops away from the row above it. */
    .ov__tier + .ov__tier { padding-top: var(--drop); }

    .ov__band {
        flex: 1;
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: var(--cell-gap);
    }
    .ov__band--reign { grid-template-columns: repeat(3, 1fr); }

    /* -------------------------------- Cells -------------------------------- */
    .ov__cell {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
        min-height: var(--band-h);
        padding: 0.7rem 0.7rem 0.75rem;
        border: 1px solid rgba(0, 0, 0, 0.45);
        border-radius: 2px;
        color: var(--cell-ink);
        text-decoration: none;
        transition: opacity 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
    }
    a.ov__cell:hover { transform: translateY(-2px); box-shadow: 0 8px 22px var(--doc-shadow); }
    [data-dim='true'] { opacity: 0.42; }
    /* The last tier is the conclusion, so it is set larger and quieter than the
       counted rows above it. */
    .ov__cell--reign { justify-content: center; gap: 0.55rem; }
    .ov__cell--reign .ov__label {
        font-family: 'Newsreader', Georgia, serif;
        font-weight: 400;
        font-size: clamp(0.95rem, 1.5vw, 1.15rem);
        line-height: 1.25;
    }
    .ov__cell--reign .ov__ref { margin-top: 0; }

    .ov__n {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.6875rem;
        font-weight: 700;
        opacity: 0.65;
        line-height: 1;
    }
    .ov__label {
        font-family: 'Public Sans', sans-serif;
        font-weight: 700;
        font-size: clamp(0.78rem, 0.95vw, 0.9rem);
        line-height: 1.2;
    }
    .ov__ref {
        margin-top: auto;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.5rem;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        opacity: 0.62;
    }

    /* -------------------- The circle that opens a tier -------------------- */
    .ov__origin {
        width: var(--node);
        padding-top: var(--node-off);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
    }
    .ov__node {
        display: grid;
        place-items: center;
        width: var(--node);
        height: var(--node);
        border-radius: 50%;
        border: 1px solid rgba(0, 0, 0, 0.45);
        color: var(--cell-ink);
        text-decoration: none;
        box-shadow: 0 0 0 4px var(--doc-bg-2);
        transition: opacity 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
    }
    a.ov__node:hover { transform: translateY(-2px); }
    /* The court is the one node that is not a seal or a trumpet, so it is drawn
       as an outline in the page's own ink rather than filled. */
    .ov__node--court {
        background: transparent;
        border: 2px solid var(--doc-ember);
        color: var(--doc-ember);
    }
    .ov__node--court svg { width: 55%; height: 55%; }
    .ov__node-n {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: clamp(1rem, 1.8vw, 1.3rem);
        font-weight: 700;
        line-height: 1;
    }
    .ov__node-cap {
        width: calc(var(--node) + 1.6rem);
        margin: 0 -0.8rem;
        text-align: center;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.5rem;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        line-height: 1.5;
        color: var(--doc-dim);
    }

    /* The stub joining the circle to its row, struck at the circle's midline. */
    .ov__link {
        width: var(--link);
        margin-top: calc(var(--node-off) + var(--node) / 2);
        border-top: 1px solid var(--doc-ember);
        opacity: 0.7;
    }

    /* --------------------------- The descent --------------------------- */
    /* An elbow: out of the right-hand end of the row above, then down into the
       circle that opens this tier. It starts where the seventh of that set
       would have stood, because the circle below *is* the seventh. */
    .ov__descent {
        position: absolute;
        top: 0;
        right: 0;
        left: calc(var(--depth) * var(--step) + var(--node) / 2);
        height: calc(var(--drop) + var(--node-off));
        border-top: 1px solid var(--doc-ember);
        border-left: 1px solid var(--doc-ember);
        opacity: 0.75;
        pointer-events: none;
    }
    .ov__descent-label {
        position: absolute;
        top: 0.45rem;
        right: 0.15rem;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.5625rem;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: var(--doc-ember);
        white-space: nowrap;
    }
    /* The flashback mark, printed at the point the descent leaves the row. */
    .ov__seam {
        position: absolute;
        top: -0.7rem;
        right: 0;
        height: 1.4rem;
        border-left: 1px dashed var(--doc-ember);
        transform: translateX(0.5px);
    }
    .ov__seam-dot {
        position: absolute;
        top: 0;
        left: 50%;
        width: 0.45rem;
        height: 0.45rem;
        border-radius: 50%;
        background: var(--doc-ember);
        transform: translate(-50%, -50%);
    }

    /* -------------------------------- Tones -------------------------------- */
    [data-tone='pure'] { background: var(--s-pure); }
    [data-tone='fire'] { background: var(--s-fire); color: #fff; }
    [data-tone='ink'] { background: var(--s-ink); color: #f1ebe0; }
    [data-tone='pale'] { background: var(--s-pale); }
    [data-tone='amber'] { background: var(--s-amber); }
    [data-tone='deep'] { background: var(--s-deep); color: #fff; }
    [data-tone='gold'] { background: var(--s-gold); }
    [data-tone='ice'] { background: var(--t-ice); }
    [data-tone='ash'] { background: var(--t-ash); }
    [data-tone='ember'] { background: var(--t-ember); }
    [data-tone='reign'] { background: var(--r-reign); }
    [data-tone='reign-soft'] { background: var(--r-reign-soft); }

    /* ------------------------------- Verdict ------------------------------- */
    .ov__verdict {
        display: flex;
        align-items: baseline;
        gap: 0.85rem;
        margin: clamp(1.25rem, 2.5vw, 1.75rem) 0 0;
        padding-left: calc(2 * var(--step));
        max-width: 62rem;
        font-family: 'Newsreader', Georgia, serif;
        font-size: clamp(0.95rem, 1.4vw, 1.05rem);
        font-style: italic;
        line-height: 1.6;
        color: var(--doc-muted);
    }
    .ov__verdict-rule {
        flex: none;
        width: 1.6rem;
        height: 1px;
        background: var(--doc-ember);
        transform: translateY(-0.35rem);
    }

    /* -------------------------------- Legend -------------------------------- */
    .ov__legend {
        margin: 1.1rem 0 0;
        max-width: 46rem;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.5625rem;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        line-height: 1.9;
        color: var(--doc-dim);
    }
    /* Inline with the sentence it explains, not stranded on its own line. */
    .ov__legend-mark {
        display: inline-block;
        width: 0;
        height: 0.7rem;
        margin-right: 0.7rem;
        vertical-align: -0.1rem;
        border-left: 1px dashed var(--doc-ember);
    }
    .ov__legend a {
        color: var(--doc-ember);
        text-decoration: none;
        border-bottom: 1px solid var(--doc-line);
        transition: border-color 0.3s ease;
    }
    .ov__legend a:hover { border-color: var(--doc-ember); }

    @media (prefers-reduced-motion: reduce) {
        .ov :where(a, .ov__cell, .ov__node) { transition: none !important; }
        a.ov__cell:hover,
        a.ov__node:hover { transform: none; }
    }
</style>
