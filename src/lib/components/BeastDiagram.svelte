<script>
    import { HEADS } from '$lib/data/beast.js';

    // The chart the page is built on, redrawn: one body, seven heads sitting on
    // it, ten horns rooted in the same top edge as the heads but well clear of
    // them, and the woman riding across the heads. The horns' position is the
    // whole argument, so they are drawn on the beast's own back and nowhere
    // near a head — as Revelation 17 counts them.
    //
    // The SVG is decorative: every word in it is repeated in the key below,
    // which is the part that is focusable and links onward. That keeps the
    // drawing free to be a drawing.
    let hovered = $state(/** @type {string | null} */ (null));

    const R = 36;
    const HEAD_Y = 226;
    const BEAST_TOP = 262;
    // Seven circles, tangent to the beast's back — the source chart's geometry.
    const heads = HEADS.map((head, i) => ({ ...head, cx: 96 + i * 76 }));

    // Ten horns on the body itself, to the right of the last head. The gap
    // between the two is deliberate and is the point of the chart.
    const HORN_X0 = 660;
    const HORN_STEP = 30;
    const horns = Array.from({ length: 10 }, (_, i) => {
        const x = HORN_X0 + i * HORN_STEP;
        const tip = 148 + (i % 3) * 7;
        return { x, d: `M${x - 8},${BEAST_TOP} Q${x - 6},${tip + 60} ${x + 2},${tip} Q${x + 7},${tip + 62} ${x + 8},${BEAST_TOP} Z` };
    });

    /** @param {string} id */
    function dim(id) {
        return hovered !== null && hovered !== id;
    }
</script>

<figure class="bh">
    <figcaption class="bh__cap">
        <p class="bh__kicker">The shape of it</p>
        <h2 class="bh__cap-title">One body. Seven heads. Ten horns on the body.</h2>
        <p class="bh__note">
            The heads sit on the beast and the horns sit on the beast. They are drawn far apart
            here because the text never once brings them together - no head is given a horn, no
            horn is assigned to a head, and ten will not divide into seven. The woman is drawn
            across the heads because that is where a rider sits: on top of the thing that carries
            her, steering a power she does not own.
        </p>
    </figcaption>

    <!-- The drawing cannot shrink below the width its ten horns need, so on a
         narrow screen it scrolls — and says so, since the horns are the part
         that starts off-screen. -->
    <p class="bh__hint">Drag the chart sideways — the ten horns sit to the right, on the beast’s back.</p>

    <div class="bh__scroll">
        <svg class="bh__svg" viewBox="0 0 1000 540" aria-hidden="true" focusable="false">
            <!-- The woman: riding the heads, carried by the body under them. -->
            <g
                class="bh__woman"
                class:is-dim={dim('woman')}
                onmouseenter={() => (hovered = 'woman')}
                onmouseleave={() => (hovered = null)}
                role="presentation"
            >
                <polygon class="bh__woman-shape" points="324,84 596,190 52,190" />
                <text class="bh__woman-label" x="324" y="158" text-anchor="middle">THE WOMAN</text>
                <text class="bh__woman-ref" x="324" y="178" text-anchor="middle">REVELATION 17:3</text>
            </g>

            <!-- The horns, rooted in the beast's back. Bracketed and counted so
                 the ten can be read off the drawing without trusting a caption. -->
            <g
                class="bh__horns"
                class:is-dim={dim('horns')}
                onmouseenter={() => (hovered = 'horns')}
                onmouseleave={() => (hovered = null)}
                role="presentation"
            >
                <path class="bh__bracket" d="M652,140 L652,122 L938,122 L938,140" />
                <text class="bh__horns-label" x="795" y="108" text-anchor="middle">TEN HORNS · REVELATION 17:12</text>
                {#each horns as horn}
                    <path class="bh__horn" d={horn.d} />
                {/each}
            </g>

            <!-- The beast: one shape, running the full width, under every head
                 and every horn alike. -->
            <rect class="bh__body" x="36" y="262" width="928" height="176" rx="20" />

            <!-- The root line: the same edge carries the heads and the horns. -->
            <line class="bh__root" x1="60" y1="262" x2="940" y2="262" />
            <g class="bh__callout" class:is-dim={dim('horns')}>
                <line class="bh__leader" x1="795" y1="264" x2="795" y2="292" />
                <text class="bh__callout-label" x="795" y="312" text-anchor="middle">ROOTED HERE — IN THE BEAST</text>
            </g>

            <text class="bh__body-label" x="500" y="382" text-anchor="middle">THE BEAST</text>
            <text class="bh__body-ref" x="500" y="410" text-anchor="middle">ONE ENTITY · REVELATION 17:8, 11</text>

            <!-- The seven heads, sitting on the body, each in the colour of its
                 standing in Revelation 17:10. -->
            {#each heads as head}
                <g
                    class="bh__head"
                    class:is-dim={dim(head.id)}
                    data-status={head.status}
                    onmouseenter={() => (hovered = head.id)}
                    onmouseleave={() => (hovered = null)}
                    role="presentation"
                >
                    <circle class="bh__head-shape" cx={head.cx} cy={HEAD_Y} r={R} />
                    <text class="bh__head-code" x={head.cx} y={HEAD_Y + 9} text-anchor="middle">
                        {head.code}
                    </text>
                </g>
            {/each}

            <text class="bh__foot" x="60" y="472">SEVEN HEADS · FIVE FALLEN · ONE IS · ONE TO COME</text>
            <text class="bh__foot bh__foot--right" x="940" y="472" text-anchor="end">
                TEN HORNS · ONE HOUR WITH THE BEAST
            </text>
            <text class="bh__foot bh__foot--em" x="60" y="500">
                NOT ONE HORN STANDS ON A HEAD.
            </text>
        </svg>
    </div>

    <!-- The key carries every word the drawing does, and is the part a keyboard
         reaches. Each head links to its own section further down the page. -->
    <ol class="bh__key">
        {#each heads as head}
            <li>
                <a
                    href="#{head.id}"
                    class="bh__key-item"
                    data-status={head.status}
                    data-dim={dim(head.id)}
                    onmouseenter={() => (hovered = head.id)}
                    onmouseleave={() => (hovered = null)}
                    onfocus={() => (hovered = head.id)}
                    onblur={() => (hovered = null)}
                >
                    <span class="bh__key-dot" aria-hidden="true">{head.code}</span>
                    <span class="bh__key-text">
                        <span class="bh__key-name">{head.name}</span>
                        <span class="bh__key-era">{head.era}</span>
                        <span class="bh__key-status">{head.statusLabel}</span>
                    </span>
                </a>
            </li>
        {/each}
    </ol>

    <div class="bh__legend">
        <a
            href="#the-horns"
            class="bh__legend-item"
            data-dim={dim('horns')}
            onmouseenter={() => (hovered = 'horns')}
            onmouseleave={() => (hovered = null)}
            onfocus={() => (hovered = 'horns')}
            onblur={() => (hovered = null)}
        >
            <span class="bh__legend-mark bh__legend-mark--horn" aria-hidden="true"></span>
            <span>
                <strong>The ten horns</strong> - on the beast, receiving power one hour with it.
            </span>
        </a>
        <a
            href="#the-woman"
            class="bh__legend-item"
            data-dim={dim('woman')}
            onmouseenter={() => (hovered = 'woman')}
            onmouseleave={() => (hovered = null)}
            onfocus={() => (hovered = 'woman')}
            onblur={() => (hovered = null)}
        >
            <span class="bh__legend-mark bh__legend-mark--woman" aria-hidden="true"></span>
            <span>
                <strong>The woman</strong> - a religious body, riding a power that is not hers.
            </span>
        </a>
    </div>
</figure>

<style>
    .bh { margin: 0; }

    .bh__cap { max-width: 46rem; margin-bottom: clamp(1.75rem, 3.5vw, 2.5rem); }
    .bh__kicker {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.28em;
        text-transform: uppercase;
        color: var(--doc-ember);
        margin: 0 0 0.85rem;
    }
    .bh__cap-title {
        font-family: 'Newsreader', Georgia, serif;
        font-weight: 400;
        font-size: clamp(1.6rem, 3.4vw, 2.5rem);
        line-height: 1.1;
        letter-spacing: -0.018em;
        color: var(--doc-ink);
        margin: 0 0 1rem;
    }
    .bh__note {
        font-size: 0.98rem;
        line-height: 1.7;
        color: var(--doc-muted);
        margin: 0;
    }

    /* The drawing only reads at width; below that it scrolls rather than
       squeezing the ten horns into a smudge. */
    .bh__scroll { overflow-x: auto; padding-bottom: 0.5rem; }
    .bh__hint {
        display: none;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.5625rem;
        letter-spacing: 0.16em;
        line-height: 1.8;
        text-transform: uppercase;
        color: var(--doc-dim);
        margin: 0 0 0.75rem;
    }
    @media (max-width: 48rem) {
        .bh__hint { display: block; }
    }
    .bh__svg {
        display: block;
        width: 100%;
        min-width: 44rem;
        height: auto;
    }

    .bh__head,
    .bh__woman,
    .bh__horns,
    .bh__callout {
        transition: opacity 0.35s ease;
    }
    .bh__head :where(circle, text) { transition: transform 0.35s ease; }
    :where(.bh__head, .bh__woman, .bh__horns, .bh__callout).is-dim { opacity: 0.28; }

    /* ------------------------------- Shapes ------------------------------- */
    .bh__body {
        fill: var(--bh-beast);
        stroke: var(--bh-beast-edge);
        stroke-width: 3;
    }
    .bh__head-shape {
        stroke: rgba(0, 0, 0, 0.45);
        stroke-width: 3;
    }
    [data-status='fallen'] .bh__head-shape { fill: var(--bh-fallen); }
    [data-status='present'] .bh__head-shape { fill: var(--bh-present); }
    [data-status='future'] .bh__head-shape { fill: var(--bh-future); }

    .bh__head-code {
        font-family: 'Newsreader', Georgia, serif;
        font-style: italic;
        font-size: 1.6rem;
        fill: var(--bh-ink);
    }
    .bh__woman-shape {
        fill: var(--bh-woman);
        stroke: rgba(0, 0, 0, 0.45);
        stroke-width: 3;
    }
    .bh__woman-label {
        font-family: 'Newsreader', Georgia, serif;
        font-size: 1.5rem;
        letter-spacing: 0.06em;
        fill: #fdf8ef;
    }
    .bh__woman-ref,
    .bh__horns-label,
    .bh__callout-label,
    .bh__body-ref,
    .bh__foot {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.6875rem;
        letter-spacing: 0.2em;
    }
    .bh__woman-ref { fill: rgba(253, 248, 239, 0.82); }

    .bh__horn {
        fill: var(--bh-horn);
        stroke: rgba(0, 0, 0, 0.35);
        stroke-width: 1.5;
    }
    .bh__bracket {
        fill: none;
        stroke: var(--doc-dim);
        stroke-width: 1.5;
    }
    .bh__horns-label { fill: var(--doc-muted); }

    /* The one edge both heads and horns stand on, drawn so it can be seen. */
    .bh__root {
        stroke: var(--doc-ember);
        stroke-width: 2;
        stroke-dasharray: 5 6;
        opacity: 0.85;
    }
    .bh__leader {
        stroke: rgba(253, 248, 239, 0.75);
        stroke-width: 1.5;
        stroke-dasharray: 4 4;
    }
    .bh__callout-label { fill: rgba(253, 248, 239, 0.9); }

    .bh__body-label {
        font-family: 'Newsreader', Georgia, serif;
        font-size: 2.4rem;
        letter-spacing: 0.1em;
        fill: #fdf8ef;
    }
    .bh__body-ref { fill: rgba(253, 248, 239, 0.78); }

    .bh__foot { fill: var(--doc-dim); font-size: 0.625rem; }
    .bh__foot--em { fill: var(--doc-ember); letter-spacing: 0.24em; }

    /* -------------------------------- Key -------------------------------- */
    .bh__key {
        list-style: none;
        margin: clamp(1.5rem, 3vw, 2.25rem) 0 0;
        padding: 0;
        display: grid;
        gap: 0.5rem;
        grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
    }
    .bh__key-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.7rem 0.85rem;
        border: 1px solid var(--doc-line);
        border-radius: 2px;
        text-decoration: none;
        transition: border-color 0.3s ease, opacity 0.3s ease, background 0.3s ease;
    }
    .bh__key-item:hover,
    .bh__key-item:focus-visible { border-color: var(--doc-ember); background: var(--doc-bg-3); }
    .bh__key-item[data-dim='true'] { opacity: 0.45; }

    .bh__key-dot {
        flex: none;
        display: grid;
        place-items: center;
        width: 2.15rem;
        height: 2.15rem;
        border-radius: 50%;
        font-family: 'Newsreader', Georgia, serif;
        font-style: italic;
        font-size: 0.9rem;
        color: var(--bh-ink);
        border: 2px solid rgba(0, 0, 0, 0.35);
    }
    [data-status='fallen'] .bh__key-dot { background: var(--bh-fallen); }
    [data-status='present'] .bh__key-dot { background: var(--bh-present); }
    [data-status='future'] .bh__key-dot { background: var(--bh-future); }

    .bh__key-text { display: grid; gap: 0.15rem; min-width: 0; }
    .bh__key-name {
        font-size: 0.95rem;
        color: var(--doc-ink);
        line-height: 1.2;
    }
    .bh__key-era,
    .bh__key-status {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.5625rem;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: var(--doc-dim);
    }
    .bh__key-status { color: var(--doc-ember); }

    /* ------------------------------- Legend ------------------------------- */
    .bh__legend {
        display: grid;
        gap: 0.75rem;
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 1px solid var(--doc-line-soft);
    }
    @media (min-width: 760px) {
        .bh__legend { grid-template-columns: 1fr 1fr; gap: 1.5rem; }
    }
    .bh__legend-item {
        display: flex;
        align-items: flex-start;
        gap: 0.7rem;
        font-size: 0.9rem;
        line-height: 1.6;
        color: var(--doc-muted);
        text-decoration: none;
        transition: color 0.3s ease, opacity 0.3s ease;
    }
    .bh__legend-item strong { color: var(--doc-ink); font-weight: 500; }
    .bh__legend-item:hover,
    .bh__legend-item:focus-visible { color: var(--doc-ink); }
    .bh__legend-item[data-dim='true'] { opacity: 0.45; }
    .bh__legend-mark {
        flex: none;
        width: 0.85rem;
        height: 0.85rem;
        margin-top: 0.35rem;
        border: 1px solid rgba(0, 0, 0, 0.35);
    }
    .bh__legend-mark--horn { background: var(--bh-horn); clip-path: polygon(50% 0, 100% 100%, 0 100%); border: none; }
    .bh__legend-mark--woman { background: var(--bh-woman); clip-path: polygon(50% 0, 100% 100%, 0 100%); border: none; }

    @media (prefers-reduced-motion: reduce) {
        .bh :where(a, g, circle, text) { transition: none !important; }
    }
</style>
