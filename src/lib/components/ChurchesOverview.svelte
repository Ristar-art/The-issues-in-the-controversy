<script>
    import { CHURCHES } from '$lib/data/churches.js';

    // The chart's whole argument is in the left rail: one church, held down the
    // side of all seven rows, so the seven read as states of that one thing
    // rather than as seven separate bodies listed in order.
    let hovered = $state(/** @type {string | null} */ (null));
</script>

<!-- The seven churches as seven conditions. Each row is one sentence —
     Christianity under a given power — with that phrase carried in the colour
     the rest of the chart is keyed to, the date the condition started, and the
     state the letter finds it in printed beside it. The dates column has a
     beginning and no end on purpose: that is the argument. -->
<figure class="ch">
    <figcaption class="ch__cap">
        <p class="ch__kicker">The shape of it</p>
        <h2 class="ch__cap-title">Seven churches, seven conditions</h2>
        <p class="ch__note">
            The letters are not a directory of congregations. They are one church described seven
            times over - Christianity as it is found under one power after another, from a hostile
            synagogue to a movement that has kept the name and lost the thing. Each condition
            starts where the chart says it starts. Not one of them is given a date to stop, which
            is why all seven are still in the world.
        </p>
    </figcaption>

    <div class="ch__scroll">
        <div class="ch__chart">
            <!-- The rail. One label, seven rows, drawn once. -->
            <div class="ch__rail" aria-hidden="true">
                <span class="ch__rail-line"></span>
                <span class="ch__rail-label">One church</span>
            </div>

            <ol class="ch__rows">
                {#each CHURCHES as church}
                    <li>
                        <a
                            href="#{church.id}"
                            class="ch__row"
                            data-church={church.id}
                            data-dim={hovered !== null && hovered !== church.id}
                            onmouseenter={() => (hovered = church.id)}
                            onmouseleave={() => (hovered = null)}
                            onfocus={() => (hovered = church.id)}
                            onblur={() => (hovered = null)}
                        >
                            <span class="ch__tick" aria-hidden="true"></span>

                            <span class="ch__n">{church.n}</span>

                            <span class="ch__name">
                                {church.name}
                                <span class="ch__meaning">{church.meaning}</span>
                            </span>

                            <!-- A start and an open end, drawn as text: the
                                 arrow is the claim the page is making. -->
                            <span class="ch__span">
                                <span class="ch__from">{church.began}</span>
                                <span class="ch__to" aria-label="continues to the end">→ the end</span>
                            </span>

                            <!-- The sentence from the chart this page is built
                                 on, with the power carrying the weight. -->
                            <span class="ch__line">
                                Christianity under
                                <span class="ch__env">{church.under}</span>
                            </span>

                            <span class="ch__state">
                                <span class="ch__state-k">The state</span>
                                <span class="ch__state-v">{church.condition}</span>
                                <span class="ch__ref">{church.reference}</span>
                            </span>
                        </a>
                    </li>
                {/each}
            </ol>
        </div>
    </div>

    <p class="ch__legend">
        <span class="ch__legend-mark" aria-hidden="true"></span>
        Every row starts and no row closes - all seven conditions coexist today. Each links to its
        letter further down the page.
    </p>
</figure>

<style>
    .ch {
        --rail: 1.6rem;
        margin: 0;
    }

    .ch__cap { max-width: 46rem; margin-bottom: clamp(1.75rem, 3.5vw, 2.5rem); }
    .ch__kicker {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.28em;
        text-transform: uppercase;
        color: var(--doc-ember);
        margin: 0 0 0.85rem;
    }
    .ch__cap-title {
        font-family: 'Newsreader', Georgia, serif;
        font-weight: 400;
        font-size: clamp(1.6rem, 3.4vw, 2.5rem);
        line-height: 1.1;
        letter-spacing: -0.018em;
        color: var(--doc-ink);
        margin: 0 0 1rem;
    }
    .ch__note {
        font-size: 0.98rem;
        line-height: 1.7;
        color: var(--doc-muted);
        margin: 0;
    }

    /* The row is one line across on a wide screen, so it scrolls sideways on a
       narrow one rather than folding the sentence out of shape. */
    .ch__scroll { overflow-x: auto; padding-bottom: 0.5rem; }
    .ch__chart { display: flex; gap: 0; min-width: 58rem; }

    /* -------------------------------- Rail -------------------------------- */
    .ch__rail {
        position: relative;
        flex: none;
        width: var(--rail);
        margin-right: 1.1rem;
    }
    .ch__rail-line {
        position: absolute;
        top: 1.6rem;
        bottom: 1.6rem;
        right: 0;
        border-right: 1px solid var(--doc-ember);
        opacity: 0.55;
    }
    /* Set on its side against the rail — the label belongs to the whole column,
       not to any one row of it. */
    .ch__rail-label {
        position: absolute;
        top: 50%;
        right: 0.55rem;
        transform: translate(50%, -50%) rotate(180deg);
        writing-mode: vertical-rl;
        white-space: nowrap;
        padding: 0.75rem 0;
        background: var(--doc-bg-2);
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.5625rem;
        letter-spacing: 0.3em;
        text-transform: uppercase;
        color: var(--doc-ember);
    }

    /* -------------------------------- Rows -------------------------------- */
    .ch__rows {
        flex: 1;
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: 0.3rem;
    }

    .ch__row {
        position: relative;
        display: grid;
        grid-template-columns: 2.1rem minmax(8.5rem, 0.8fr) 7.5rem minmax(13rem, 1.3fr) minmax(11.5rem, 1.1fr);
        align-items: center;
        gap: 1.25rem;
        padding: 0.95rem 1.15rem 0.95rem 1.25rem;
        text-decoration: none;
        color: var(--doc-ink);
        background: var(--doc-bg-2);
        border: 1px solid var(--doc-line);
        /* The tone is carried on the leading edge rather than as a fill, so the
           seven read as one column of text with a changing marker. */
        border-left: 3px solid var(--row-tone, var(--doc-line));
        border-radius: 2px;
        transition: background 0.25s ease, opacity 0.25s ease, transform 0.25s ease,
            box-shadow 0.25s ease;
    }
    .ch__row:hover {
        background: var(--doc-bg-3);
        transform: translateX(2px);
        box-shadow: 0 8px 22px var(--doc-shadow);
    }
    .ch__row[data-dim='true'] { opacity: 0.45; }

    /* The stub that ties each row back to the rail. */
    .ch__tick {
        position: absolute;
        top: 50%;
        left: calc(-1.1rem - 3px);
        width: 1.1rem;
        border-top: 1px solid var(--doc-ember);
        opacity: 0.55;
    }

    .ch__n {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 1.05rem;
        font-weight: 700;
        line-height: 1;
        color: var(--row-tone, var(--doc-ember));
    }

    .ch__name {
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
        font-family: 'Newsreader', Georgia, serif;
        font-size: clamp(1.05rem, 1.7vw, 1.3rem);
        line-height: 1.1;
    }
    .ch__meaning {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.5rem;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: var(--doc-dim);
    }

    /* A start with no stop. The arrow is drawn in the row's own tone so the
       seven open ends read as one continuous claim down the column. */
    .ch__span {
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
    }
    .ch__from {
        font-size: 0.6875rem;
        letter-spacing: 0.1em;
        color: var(--doc-ink);
    }
    .ch__to {
        font-size: 0.5rem;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: var(--row-tone, var(--doc-ember));
    }

    .ch__line {
        font-size: clamp(0.9rem, 1.25vw, 1.02rem);
        line-height: 1.45;
        color: var(--doc-muted);
    }
    /* The phrase the chart exists to carry. */
    .ch__env {
        color: var(--row-tone, var(--doc-ember));
        font-weight: 600;
    }

    .ch__state { display: flex; flex-direction: column; gap: 0.35rem; }
    .ch__state-k {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.5rem;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        color: var(--doc-dim);
    }
    .ch__state-v {
        font-family: 'Newsreader', Georgia, serif;
        font-style: italic;
        font-size: clamp(0.92rem, 1.3vw, 1.05rem);
        line-height: 1.3;
        color: var(--doc-ink);
    }

    /* Under the state it belongs to rather than pinned to the row's corner —
       a condition that wraps to two lines then cannot collide with it. */
    .ch__ref {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.5rem;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: var(--doc-dim);
    }

    /* Tones. The --ch-* tokens are declared in app.css and carry a separate
       light-mode value, so every row reads on paper as well as on the dark
       ground. */
    [data-church='ephesus'] { --row-tone: var(--ch-ephesus); }
    [data-church='smyrna'] { --row-tone: var(--ch-smyrna); }
    [data-church='pergamos'] { --row-tone: var(--ch-pergamos); }
    [data-church='thyatira'] { --row-tone: var(--ch-thyatira); }
    [data-church='sardis'] { --row-tone: var(--ch-sardis); }
    [data-church='philadelphia'] { --row-tone: var(--ch-philadelphia); }
    [data-church='laodicea'] { --row-tone: var(--ch-laodicea); }

    /* -------------------------------- Legend -------------------------------- */
    .ch__legend {
        margin: 1.25rem 0 0;
        max-width: 46rem;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.5625rem;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        line-height: 1.9;
        color: var(--doc-dim);
    }
    .ch__legend-mark {
        display: inline-block;
        width: 1.4rem;
        height: 0;
        margin-right: 0.7rem;
        vertical-align: 0.25rem;
        border-top: 1px solid var(--doc-ember);
    }

    @media (prefers-reduced-motion: reduce) {
        .ch :where(a) { transition: none !important; }
        .ch__row:hover { transform: none; }
    }
</style>
