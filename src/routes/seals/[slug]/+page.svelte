<script>
    import HeroExpand from '$lib/components/HeroExpand.svelte';

    let { data } = $props();

    let seal = $derived(data.seal);
    let detail = $derived(data.detail);
    let position = $derived(data.position);

    let num = $derived(String(position.number).padStart(2, '0'));
    let total = $derived(String(position.total).padStart(2, '0'));

    // Section headings double as anchors for the aside's contents list.
    /** @param {string} heading */
    function anchor(heading) {
        return heading
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    let sections = $derived(detail.sections ?? []);
    let description = $derived(detail.summary || detail.subtitle || seal.body);
</script>

<svelte:head>
    <title>{seal.title} - The Seven Seals | The Issues in the Controversy</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={`${seal.title} — ${seal.era}`} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="article" />
</svelte:head>

<div class="doc-sd">
    <article>
        <!-- ============================= HERO ============================= -->
        <header class="doc-sd__hero">
            <img class="doc-sd__hero-img" src={seal.img} alt={seal.alt} fetchpriority="high" />
            <span class="doc-sd__hero-veil" aria-hidden="true"></span>

            <HeroExpand src={seal.img} alt={seal.alt} caption={`${seal.era} · ${seal.title}`} />

            <div class="doc-sd__hero-text">
                <nav class="doc-sd__crumbs" aria-label="Breadcrumb">
                    <a href="/seals">The Seven Seals</a>
                    <span aria-hidden="true">·</span>
                    <span>Seal {num} / {total}</span>
                </nav>

                <p class="doc-sd__eyebrow">{seal.era} · {seal.reference}</p>
                <h1 class="doc-sd__title">{seal.title}</h1>
                {#if detail.subtitle}
                    <p class="doc-sd__lede">{detail.subtitle}</p>
                {:else}
                    <p class="doc-sd__lede">{seal.body}</p>
                {/if}
            </div>
        </header>

        <!-- ============================= BODY ============================= -->
        <div class="doc-sd__body">
            <aside class="doc-sd__aside">
                <div class="doc-sd__meta">
                    <p class="doc-sd__meta-label">Passage</p>
                    <p class="doc-sd__meta-value">{seal.reference}</p>
                </div>
                <div class="doc-sd__meta">
                    <p class="doc-sd__meta-label">Position</p>
                    <p class="doc-sd__meta-value">Seal {num} of {total}</p>
                </div>

                {#if sections.length}
                    <nav class="doc-sd__contents" aria-label="On this page">
                        <p class="doc-sd__meta-label">On this page</p>
                        {#each sections as section}
                            {#if section.heading}
                                <a href="#{anchor(section.heading)}">{section.heading}</a>
                            {/if}
                        {/each}
                    </nav>
                {/if}

                {#if detail.related?.length}
                    <nav class="doc-sd__contents" aria-label="Further reading">
                        <p class="doc-sd__meta-label">Further reading</p>
                        {#each detail.related as link}
                            <a href={link.href}>{link.label}</a>
                        {/each}
                    </nav>
                {/if}
            </aside>

            <div class="doc-sd__main">
                {#if data.written}
                    {#if detail.passage}
                        <blockquote class="doc-sd__passage">
                            <p>{detail.passage}</p>
                            <cite>{seal.reference}</cite>
                        </blockquote>
                    {/if}

                    {#if detail.summary}
                        <p class="doc-sd__summary">{detail.summary}</p>
                    {/if}

                    {#each sections as section}
                        <section class="doc-sd__section" id={section.heading ? anchor(section.heading) : undefined}>
                            {#if section.heading}
                                <h2 class="doc-sd__heading">{section.heading}</h2>
                            {/if}
                            {#each section.paragraphs ?? [] as paragraph}
                                <p class="doc-sd__p">{paragraph}</p>
                            {/each}
                            {#if section.quote}
                                <blockquote class="doc-sd__pull">
                                    <p>{section.quote.text}</p>
                                    {#if section.quote.cite}<cite>{section.quote.cite}</cite>{/if}
                                </blockquote>
                            {/if}
                        </section>
                    {/each}

                    {#if detail.keyPoints?.length}
                        <section class="doc-sd__section">
                            <h2 class="doc-sd__heading">What this seal rests on</h2>
                            <ul class="doc-sd__points">
                                {#each detail.keyPoints as point}
                                    <li>{point}</li>
                                {/each}
                            </ul>
                        </section>
                    {/if}

                    {#if detail.questions?.length}
                        <section class="doc-sd__section">
                            <h2 class="doc-sd__heading">Questions to carry further</h2>
                            <ol class="doc-sd__questions">
                                {#each detail.questions as question}
                                    <li>{question}</li>
                                {/each}
                            </ol>
                        </section>
                    {/if}
                {:else}
                    <!-- The study is written after the page: say so plainly
                         rather than showing an empty column. -->
                    <div class="doc-sd__pending">
                        <p class="doc-sd__eyebrow doc-sd__eyebrow--dim">In preparation</p>
                        <h2 class="doc-sd__heading">The fuller study on this seal is still being written.</h2>
                        <p class="doc-sd__p">{seal.body}</p>
                        <p class="doc-sd__p">
                            Until it is here, the overview of all seven stands on the index, and the
                            series covers the same ground on film.
                        </p>
                        <div class="doc-sd__pending-links">
                            <a href="/seals" class="doc-sd__btn">Back to the seven</a>
                            <a href="/videos" class="doc-sd__btn doc-sd__btn--quiet">Watch the series</a>
                        </div>
                    </div>
                {/if}
            </div>
        </div>

        <!-- ========================== WALK-THROUGH ========================= -->
        <nav class="doc-sd__walk" aria-label="Seal navigation">
            {#if data.previous}
                <a href="/seals/{data.previous.id}" class="doc-sd__walk-link">
                    <span class="doc-sd__walk-dir">← Previous seal</span>
                    <span class="doc-sd__walk-title">{data.previous.title}</span>
                </a>
            {:else}
                <a href="/seals" class="doc-sd__walk-link">
                    <span class="doc-sd__walk-dir">← The index</span>
                    <span class="doc-sd__walk-title">All seven seals</span>
                </a>
            {/if}

            {#if data.next}
                <a href="/seals/{data.next.id}" class="doc-sd__walk-link doc-sd__walk-link--end">
                    <span class="doc-sd__walk-dir">Next seal →</span>
                    <span class="doc-sd__walk-title">{data.next.title}</span>
                </a>
            {:else}
                <a href="/topics" class="doc-sd__walk-link doc-sd__walk-link--end">
                    <span class="doc-sd__walk-dir">Onward →</span>
                    <span class="doc-sd__walk-title">The studies</span>
                </a>
            {/if}
        </nav>
    </article>
</div>

<style>
    .doc-sd {
        --nav-h: 5.2rem;
        min-height: 100vh;
        background: var(--doc-bg);
        color: var(--doc-ink);
        padding-top: var(--nav-h);
        font-family: 'Public Sans', sans-serif;
        transition: background 0.4s ease, color 0.4s ease;
    }
    .doc-sd :where(h1, h2) {
        font-family: 'Newsreader', Georgia, serif;
        font-weight: 400;
        color: var(--doc-ink);
        letter-spacing: -0.018em;
        line-height: 1.05;
        margin: 0;
    }

    /* ------------------------------ Hero ------------------------------ */
    .doc-sd__hero {
        position: relative;
        display: flex;
        align-items: flex-end;
        min-height: clamp(20rem, 56vh, 32rem);
        overflow: hidden;
        border-bottom: 1px solid var(--doc-line);
        isolation: isolate;
    }
    .doc-sd__hero-img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        filter: grayscale(0.35) contrast(1.06) brightness(0.62);
        z-index: -2;
    }
    .doc-sd__hero-veil {
        position: absolute;
        inset: 0;
        z-index: -1;
        background:
            linear-gradient(to top, rgba(11, 11, 13, 0.94) 0%, rgba(11, 11, 13, 0.6) 50%, rgba(11, 11, 13, 0.3) 100%),
            linear-gradient(to right, rgba(11, 11, 13, 0.7) 0%, transparent 70%);
    }
    .doc-sd__hero-text {
        position: relative;
        max-width: 46rem;
        /* Right padding keeps the last line clear of the expand hint. */
        padding: clamp(2.5rem, 7vw, 4.5rem) clamp(1.5rem, 6vw, 7rem) clamp(2.25rem, 5vw, 3.5rem);
    }
    /* The hero owns the hover; the hint only obeys it. */
    .doc-sd__hero:hover :global(.hero-expand__hint) { opacity: 1; transform: none; }
    /* Touch shows the hint permanently, so the lede has to make room for it. */
    @media (max-width: 700px) {
        .doc-sd__hero-text { padding-bottom: 5.5rem; }
    }
    /* The hero stays dark in both themes, so its type is pinned rather than
       following the page palette. */
    .doc-sd__hero-text .doc-sd__title { color: #f1ebe0; }
    .doc-sd__hero-text .doc-sd__lede { color: rgba(241, 235, 224, 0.78); }

    .doc-sd__crumbs {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        color: rgba(241, 235, 224, 0.6);
        margin-bottom: 1.5rem;
    }
    .doc-sd__crumbs a { color: inherit; text-decoration: none; transition: color 0.3s ease; }
    .doc-sd__crumbs a:hover { color: var(--doc-ember-soft); }

    .doc-sd__eyebrow {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.6875rem;
        letter-spacing: 0.3em;
        text-transform: uppercase;
        color: var(--doc-ember);
        margin: 0 0 1.25rem;
        display: inline-flex;
        align-items: center;
        gap: 0.85rem;
    }
    .doc-sd__eyebrow::before {
        content: '';
        width: 28px;
        height: 1px;
        background: currentColor;
        opacity: 0.7;
    }
    .doc-sd__eyebrow--dim { color: var(--doc-dim); }

    .doc-sd__title {
        font-size: clamp(2.4rem, 7vw, 4.75rem);
        line-height: 0.98;
        margin-bottom: 1.35rem !important;
    }
    .doc-sd__lede {
        font-size: clamp(1rem, 1.6vw, 1.2rem);
        line-height: 1.7;
        color: var(--doc-muted);
        max-width: 40rem;
        margin: 0;
    }

    /* ------------------------------ Body ------------------------------ */
    .doc-sd__body {
        display: grid;
        grid-template-columns: 1fr;
        gap: clamp(2.5rem, 5vw, 4.5rem);
        padding: clamp(2.5rem, 6vw, 4.5rem) clamp(1.5rem, 6vw, 7rem) clamp(3.5rem, 8vw, 6rem);
    }
    @media (min-width: 960px) {
        .doc-sd__body { grid-template-columns: minmax(0, 15rem) minmax(0, 1fr); }
        /* The aside travels with the reader through a long study. */
        .doc-sd__aside {
            position: sticky;
            top: calc(var(--nav-h) + 1.5rem);
            align-self: start;
        }
    }

    .doc-sd__aside { display: flex; flex-direction: column; gap: 2rem; }
    .doc-sd__meta { display: flex; flex-direction: column; gap: 0.4rem; }
    .doc-sd__meta-label {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.5625rem;
        letter-spacing: 0.28em;
        text-transform: uppercase;
        color: var(--doc-dim);
        margin: 0;
    }
    .doc-sd__meta-value {
        font-family: 'Newsreader', Georgia, serif;
        font-size: 1.05rem;
        color: var(--doc-ink);
        margin: 0;
    }
    .doc-sd__contents { display: flex; flex-direction: column; gap: 0.6rem; }
    .doc-sd__contents a {
        font-size: 0.9rem;
        color: var(--doc-muted);
        text-decoration: none;
        border-left: 1px solid var(--doc-line);
        padding: 0.15rem 0 0.15rem 0.85rem;
        transition: color 0.3s ease, border-color 0.3s ease;
    }
    .doc-sd__contents a:hover { color: var(--doc-ember-soft); border-left-color: var(--doc-ember); }

    .doc-sd__main { max-width: 44rem; }

    /* Scripture — the passage the whole study hangs on, set apart from it. */
    .doc-sd__passage {
        margin: 0 0 clamp(2rem, 4vw, 3rem);
        padding: clamp(1.5rem, 3vw, 2.25rem) 0 clamp(1.5rem, 3vw, 2.25rem) clamp(1.25rem, 3vw, 2rem);
        border-left: 2px solid var(--doc-ember);
        background: var(--doc-line-soft);
    }
    .doc-sd__passage p {
        font-family: 'Newsreader', Georgia, serif;
        font-size: clamp(1.15rem, 2.2vw, 1.5rem);
        line-height: 1.6;
        color: var(--doc-ink);
        margin: 0 0 1rem;
    }
    .doc-sd__passage cite,
    .doc-sd__pull cite {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-style: normal;
        font-size: 0.625rem;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        color: var(--doc-ember);
    }

    .doc-sd__summary {
        font-size: clamp(1.05rem, 1.7vw, 1.25rem);
        line-height: 1.75;
        color: var(--doc-ink);
        margin: 0 0 clamp(2rem, 4vw, 3rem);
    }

    .doc-sd__section { margin-bottom: clamp(2.5rem, 5vw, 4rem); scroll-margin-top: calc(var(--nav-h) + 1.5rem); }
    .doc-sd__heading {
        font-size: clamp(1.5rem, 3vw, 2.1rem);
        line-height: 1.15;
        margin-bottom: 1.25rem !important;
        padding-top: 1.5rem;
        border-top: 1px solid var(--doc-line);
    }
    .doc-sd__p {
        font-size: 1.05rem;
        line-height: 1.85;
        color: var(--doc-muted);
        margin: 0 0 1.35rem;
    }
    .doc-sd__pull {
        margin: 2rem 0;
        padding-left: 1.5rem;
        border-left: 1px solid var(--doc-line);
    }
    .doc-sd__pull p {
        font-family: 'Newsreader', Georgia, serif;
        font-style: italic;
        font-size: clamp(1.15rem, 2vw, 1.4rem);
        line-height: 1.6;
        color: var(--doc-ember-soft);
        margin: 0 0 0.75rem;
    }

    .doc-sd__points, .doc-sd__questions {
        margin: 0;
        padding-left: 1.25rem;
        color: var(--doc-muted);
        font-size: 1.02rem;
        line-height: 1.8;
    }
    .doc-sd__points li, .doc-sd__questions li { margin-bottom: 0.85rem; padding-left: 0.35rem; }
    .doc-sd__points li::marker { color: var(--doc-ember); }
    .doc-sd__questions li::marker {
        color: var(--doc-ember);
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.8rem;
    }

    /* Pending state */
    .doc-sd__pending {
        border: 1px solid var(--doc-line);
        border-left: 2px solid var(--doc-ember);
        padding: clamp(1.75rem, 4vw, 2.75rem);
    }
    .doc-sd__pending .doc-sd__heading { border-top: none; padding-top: 0; }
    .doc-sd__pending-links { display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 2rem; }

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
        padding: 0.9rem 1.5rem;
        transition: border-color 0.3s ease, color 0.3s ease;
    }
    .doc-sd__btn:hover { border-color: var(--doc-ember); color: var(--doc-ember-soft); }
    .doc-sd__btn--quiet { color: var(--doc-muted); }

    /* --------------------------- Walk-through --------------------------- */
    .doc-sd__walk {
        display: grid;
        grid-template-columns: 1fr;
        border-top: 1px solid var(--doc-line);
    }
    @media (min-width: 700px) { .doc-sd__walk { grid-template-columns: 1fr 1fr; } }
    .doc-sd__walk-link {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        padding: clamp(2rem, 4vw, 3rem) clamp(1.5rem, 6vw, 7rem);
        text-decoration: none;
        border-bottom: 1px solid var(--doc-line);
        transition: background 0.3s ease;
    }
    @media (min-width: 700px) {
        .doc-sd__walk-link--end {
            text-align: right;
            align-items: flex-end;
            border-left: 1px solid var(--doc-line);
        }
    }
    .doc-sd__walk-link:hover { background: var(--doc-line-soft); }
    .doc-sd__walk-dir {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        color: var(--doc-ember);
    }
    .doc-sd__walk-title {
        font-family: 'Newsreader', Georgia, serif;
        font-size: clamp(1.3rem, 2.5vw, 1.8rem);
        color: var(--doc-ink);
        line-height: 1.15;
        transition: color 0.3s ease;
    }
    .doc-sd__walk-link:hover .doc-sd__walk-title { color: var(--doc-ember-soft); }

    @media (prefers-reduced-motion: reduce) {
        .doc-sd :where(a, img) { transition: none !important; }
    }
</style>
