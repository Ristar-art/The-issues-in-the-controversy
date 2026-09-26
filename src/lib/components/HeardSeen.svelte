<script>
    /** @type {{ item: import('$lib/data/heard-seen.js').Case }} */
    let { item } = $props();
</script>

<!-- The two halves of one report, set side by side with the turn between them.
     Heard sits on the plainer ground and seen is lifted off it, because that is
     the order the text puts them in and the order the passage has to be read
     in — the announcement first, and then the thing itself. -->
<figure class="hs">
    <div class="hs__pair">
        <!-- ============================== HEARD ============================== -->
        <div class="hs__side hs__side--heard">
            <p class="hs__verb">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M6 8.5a6 6 0 0 1 12 0c0 2.4-1.4 3.3-2.4 4.4-.8.9-1.1 1.7-1.2 3" />
                    <path d="M9 8.6a3 3 0 0 1 6 0" />
                    <path d="M14.4 18.4a2.4 2.4 0 0 1-4 1.4" />
                </svg>
                {item.heard.verb}
            </p>
            <p class="hs__cue">“{item.heard.cue}…”</p>

            <div class="hs__frame" data-fit={item.heard.fit ?? 'cover'}>
                <img
                    src={item.heard.img}
                    alt={item.heard.alt}
                    style:object-position={item.heard.focus ?? 'center'}
                    loading="lazy"
                />
            </div>

            <h3 class="hs__title">{item.heard.title}</h3>
            <blockquote class="hs__quote">{item.heard.quote}</blockquote>
            <p class="hs__refs">{item.heard.refs}</p>
            <p class="hs__gloss">{item.heard.gloss}</p>
        </div>

        <!-- =============================== TURN =============================== -->
        <!-- The hinge. Everything the page argues happens in this gap. -->
        <div class="hs__turn" aria-hidden="true">
            <span class="hs__turn-rule"></span>
            <span class="hs__turn-mark">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 12h13" />
                    <path d="M13 7l5 5-5 5" />
                </svg>
            </span>
            <span class="hs__turn-word">He turned</span>
            <span class="hs__turn-rule"></span>
        </div>

        <!-- =============================== SEEN =============================== -->
        <div class="hs__side hs__side--saw">
            <p class="hs__verb">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z" />
                    <circle cx="12" cy="12" r="2.6" />
                </svg>
                {item.saw.verb}
            </p>
            <p class="hs__cue">“{item.saw.cue}…”</p>

            <div class="hs__frame" data-fit={item.saw.fit ?? 'cover'}>
                <img
                    src={item.saw.img}
                    alt={item.saw.alt}
                    style:object-position={item.saw.focus ?? 'center'}
                    loading="lazy"
                />
            </div>

            <h3 class="hs__title">{item.saw.title}</h3>
            <blockquote class="hs__quote">{item.saw.quote}</blockquote>
            <p class="hs__refs">{item.saw.refs}</p>
            <p class="hs__gloss">{item.saw.gloss}</p>
        </div>
    </div>

    <figcaption class="hs__same">
        <span class="hs__same-k">One subject</span>
        <p>{item.same}</p>
    </figcaption>
</figure>

<style>
    .hs { margin: 0; }

    .hs__pair {
        display: grid;
        grid-template-columns: 1fr;
        gap: 0;
        border: 1px solid var(--doc-line);
        border-radius: 2px;
        overflow: hidden;
        background: var(--doc-bg-2);
    }
    /* The turn is a column of its own on a wide screen and a band across the
       middle on a narrow one, so the hinge is never lost in a stack. */
    @media (min-width: 900px) {
        .hs__pair { grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr); }
    }

    .hs__side {
        display: flex;
        flex-direction: column;
        padding: clamp(1.5rem, 3.5vw, 2.5rem);
    }
    /* The heard side is deliberately the plainer of the two. */
    .hs__side--saw { background: var(--doc-bg-3); }

    .hs__verb {
        display: inline-flex;
        align-items: center;
        gap: 0.6rem;
        margin: 0 0 0.75rem;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.6875rem;
        letter-spacing: 0.3em;
        text-transform: uppercase;
        color: var(--doc-ember);
    }
    .hs__verb svg { width: 1.05rem; height: 1.05rem; }

    .hs__cue {
        margin: 0 0 1.25rem;
        font-family: 'Newsreader', Georgia, serif;
        font-style: italic;
        font-size: 0.92rem;
        color: var(--doc-dim);
    }

    .hs__frame {
        position: relative;
        aspect-ratio: 4 / 3;
        margin-bottom: 1.35rem;
        overflow: hidden;
        border: 1px solid var(--doc-line);
        border-radius: 2px;
        background: var(--doc-bg);
    }
    .hs__frame img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        filter: contrast(1.04) saturate(0.95);
        transition: transform 0.9s ease, filter 0.6s ease;
    }
    /* Most of the artwork is painted edge to edge and crops well. A piece drawn
       on a white ground is matted instead — fitted whole, on its own paper,
       rather than cut into a bleed. */
    .hs__frame[data-fit='contain'] {
        background: #f4f1ea;
        border-color: rgba(31, 28, 22, 0.18);
    }
    .hs__frame[data-fit='contain'] img { object-fit: contain; padding: 0.5rem; }
    .hs__frame:hover img { transform: scale(1.03); }

    .hs__title {
        font-family: 'Newsreader', Georgia, serif;
        font-weight: 400;
        font-size: clamp(1.5rem, 3vw, 2.15rem);
        line-height: 1.1;
        letter-spacing: -0.018em;
        color: var(--doc-ink);
        margin: 0 0 1rem;
    }

    .hs__quote {
        margin: 0 0 0.85rem;
        padding-left: 1.1rem;
        border-left: 2px solid var(--doc-ember);
        font-family: 'Newsreader', Georgia, serif;
        font-size: clamp(0.98rem, 1.35vw, 1.1rem);
        line-height: 1.6;
        color: var(--doc-ink);
    }
    .hs__refs {
        margin: 0 0 1.25rem;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.5625rem;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: var(--doc-ember);
    }
    .hs__gloss {
        margin: auto 0 0;
        padding-top: 1.1rem;
        border-top: 1px solid var(--doc-line-soft);
        font-size: 0.95rem;
        line-height: 1.7;
        color: var(--doc-muted);
    }

    /* -------------------------------- The turn -------------------------------- */
    .hs__turn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.9rem;
        padding: 0.9rem clamp(1.5rem, 3.5vw, 2.5rem);
        border-top: 1px solid var(--doc-line);
        border-bottom: 1px solid var(--doc-line);
        background: var(--doc-bg);
    }
    @media (min-width: 900px) {
        .hs__turn {
            flex-direction: column;
            padding: clamp(1.5rem, 3.5vw, 2.5rem) 0.9rem;
            border-top: none;
            border-bottom: none;
            border-left: 1px solid var(--doc-line);
            border-right: 1px solid var(--doc-line);
        }
    }
    .hs__turn-rule {
        flex: 1;
        height: 1px;
        background: var(--doc-line);
    }
    @media (min-width: 900px) {
        .hs__turn-rule { width: 1px; height: auto; }
    }
    .hs__turn-mark {
        flex: none;
        display: grid;
        place-items: center;
        width: 2.4rem;
        height: 2.4rem;
        border-radius: 50%;
        border: 1px solid var(--doc-ember);
        color: var(--doc-ember);
    }
    .hs__turn-mark svg { width: 1.1rem; height: 1.1rem; }
    @media (min-width: 900px) {
        /* Pointing down the page, the way the reader travels. */
        .hs__turn-mark svg { transform: rotate(90deg); }
    }
    .hs__turn-word {
        flex: none;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.5625rem;
        letter-spacing: 0.28em;
        text-transform: uppercase;
        color: var(--doc-ember);
    }
    @media (min-width: 900px) {
        .hs__turn-word {
            writing-mode: vertical-rl;
            transform: rotate(180deg);
        }
    }

    /* ------------------------------- One subject ------------------------------- */
    .hs__same {
        display: grid;
        gap: 0.7rem;
        margin-top: 1.5rem;
        padding: 1.4rem 1.5rem;
        border: 1px solid var(--doc-line);
        border-left: 3px solid var(--doc-ember);
        border-radius: 2px;
    }
    .hs__same-k {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.5625rem;
        letter-spacing: 0.28em;
        text-transform: uppercase;
        color: var(--doc-ember);
    }
    .hs__same p {
        margin: 0;
        font-size: clamp(0.98rem, 1.35vw, 1.08rem);
        line-height: 1.75;
        color: var(--doc-muted);
    }

    @media (prefers-reduced-motion: reduce) {
        .hs :where(img) { transition: none !important; }
        .hs__frame:hover img { transform: none; }
    }
</style>
