<script>
    import HeroExpand from '$lib/components/HeroExpand.svelte';
    import Seo from '$lib/components/Seo.svelte';
    import VerseRefs from '$lib/components/VerseRefs.svelte';
    import { SITE_URL, absolute } from '$lib/seo';

    let { data } = $props();

    let church = $derived(data.church);
    let position = $derived(data.position);

    let num = $derived(String(position.number).padStart(2, '0'));
    let total = $derived(String(position.total).padStart(2, '0'));

    let description = $derived(
        `${church.name}, ${church.reference}: Christianity under ${church.under}. ${church.verdict}`
    );

    // A church is one letter inside a series, so the breadcrumb is stated
    // outright — it is what a search result shows under the title.
    let jsonld = $derived({
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Article',
                headline: `${church.name} — Christianity under ${church.under}`,
                description,
                image: absolute(church.img),
                articleSection: 'The Seven Churches',
                isPartOf: { '@type': 'WebPage', '@id': absolute('/churches') },
                publisher: { '@id': `${SITE_URL}/#organization` }
            },
            {
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: absolute('/') },
                    { '@type': 'ListItem', position: 2, name: 'The Seven Churches', item: absolute('/churches') },
                    { '@type': 'ListItem', position: 3, name: church.name, item: absolute(`/churches/${church.id}`) }
                ]
            }
        ]
    });
</script>

<Seo
    title={`${church.name} — The Seven Churches of Revelation`}
    {description}
    image={church.img}
    type="article"
    {jsonld}
/>

<div class="doc-cd" data-church={church.id}>
    <article>
        <!-- ============================= HEADER ============================ -->
        <header class="doc-cd__head">
            <nav class="doc-cd__crumbs" aria-label="Breadcrumb">
                <a href="/churches">The Seven Churches</a>
                <span aria-hidden="true">·</span>
                <span>Letter {num} / {total}</span>
            </nav>

            <p class="doc-cd__eyebrow"><VerseRefs refs={church.reference} /></p>
            <h1 class="doc-cd__title">{church.name}</h1>
            <p class="doc-cd__meaning">{church.meaning}</p>
            <p class="doc-cd__lede">
                Christianity under <span class="doc-cd__env">{church.under}</span>
            </p>
        </header>

        <!-- The plates carry their own lettering, so they are shown whole
             rather than cropped and darkened behind the title. -->
        <figure class="doc-cd__plate">
            <img src={church.img} alt={church.alt} width="1280" height="720" fetchpriority="high" />
            <HeroExpand src={church.img} alt={church.alt} caption={`${church.name} · ${church.reference}`} />
        </figure>

        <!-- ============================= BODY ============================= -->
        <div class="doc-cd__body">
            <aside class="doc-cd__aside">
                <div class="doc-cd__meta">
                    <p class="doc-cd__meta-label">Letter</p>
                    <p class="doc-cd__meta-value"><VerseRefs refs={church.reference} /></p>
                </div>
                <div class="doc-cd__meta">
                    <p class="doc-cd__meta-label">Began</p>
                    <p class="doc-cd__meta-value">{church.began} <span class="doc-cd__open">→ the end</span></p>
                </div>
                <div class="doc-cd__meta">
                    <p class="doc-cd__meta-label">Size</p>
                    <p class="doc-cd__meta-value">{church.size}</p>
                </div>
                <div class="doc-cd__meta">
                    <p class="doc-cd__meta-label">Position</p>
                    <p class="doc-cd__meta-value">Church {num} of {total}</p>
                </div>

                <nav class="doc-cd__contents" aria-label="Further reading">
                    <p class="doc-cd__meta-label">Further reading</p>
                    <a href="/churches#{church.id}">{church.name} among the seven</a>
                    <a href="/seals">The seven seals — the same history as public record</a>
                </nav>
            </aside>

            <div class="doc-cd__main">
                <blockquote class="doc-cd__state">
                    <span class="doc-cd__state-k">The state it is found in</span>
                    <p>“{church.condition}”</p>
                    <cite><VerseRefs refs={church.reference} /></cite>
                </blockquote>

                {#if data.detail}
    <p class="doc-cd__lead">{data.detail.intro}</p>
                {/if}

                <section class="doc-cd__section">
                    <h2 class="doc-cd__heading">The condition</h2>
                    <p class="doc-cd__p">{church.body}</p>
                    <p class="doc-cd__p doc-cd__p--note">
                        <span class="doc-cd__k">Where it began</span>
                        {church.beganNote}
                    </p>
                </section>

                {#if church.second}
                    <!-- Several of the letters address two parties at once: God's
                         people, and something standing among them that is not. -->
                    <section class="doc-cd__section">
                        <h2 class="doc-cd__heading">The other party addressed</h2>
                        <p class="doc-cd__p">{church.second}</p>
                    </section>
                {/if}

                {#if church.today}
                    <section class="doc-cd__section">
                        <h2 class="doc-cd__heading">Where it is found now</h2>
                        <p class="doc-cd__p">{church.today}</p>
                    </section>
                {/if}

                {#if data.detail}
                    {#each data.detail.sections as section}
                        <section class="doc-cd__section">
                            <h2 class="doc-cd__heading">{section.heading}</h2>
                            {#each section.paragraphs as para}
                                <p class="doc-cd__p">{para}</p>
                            {/each}
                            {#if section.verses?.length}
                                {#each section.verses as v}
                                    <blockquote class="doc-cd__verse">
                                        {#if v.text}<p>“{v.text}”</p>{/if}
                                        <cite><VerseRefs refs={v.ref} /></cite>
                                    </blockquote>
                                {/each}
                            {/if}
                        </section>
                    {/each}

                    <blockquote class="doc-cd__state">
                        <span class="doc-cd__state-k">In one line</span>
                        <p>{data.detail.pullQuote}</p>
                    </blockquote>

                    <section class="doc-cd__section">
                        <h2 class="doc-cd__heading">What to take from it</h2>
                        <ul class="doc-cd__take">
                            {#each data.detail.takeaways as t}<li>{t}</li>{/each}
                        </ul>
                        <p class="doc-cd__refs">
                            <span class="doc-cd__k">Key verses</span>
                            {#each data.detail.keyVerses as k, i}{#if i > 0} · {/if}<VerseRefs refs={k.ref} />{/each}
                        </p>
                    </section>
                {/if}

                <section class="doc-cd__section">
                    <h2 class="doc-cd__heading">The letter</h2>
                    <dl class="doc-cd__lines">
                        <div>
                            <dt>The verdict</dt>
                            <dd>{church.verdict}</dd>
                        </div>
                        <div>
                            <dt>The counsel</dt>
                            <dd class="doc-cd__scripture">“{church.counsel}”</dd>
                        </div>
                        <div>
                            <dt>To him that overcometh</dt>
                            <dd class="doc-cd__scripture">{church.promise}</dd>
                        </div>
                    </dl>
                </section>
            </div>
        </div>

        <!-- ========================== WALK-THROUGH ========================= -->
        <nav class="doc-cd__walk" aria-label="Church navigation">
            {#if data.previous}
                <a href="/churches/{data.previous.id}" class="doc-cd__walk-link">
                    <span class="doc-cd__walk-dir">← Previous church</span>
                    <span class="doc-cd__walk-title">{data.previous.name}</span>
                </a>
            {:else}
                <a href="/churches" class="doc-cd__walk-link">
                    <span class="doc-cd__walk-dir">← The index</span>
                    <span class="doc-cd__walk-title">All seven churches</span>
                </a>
            {/if}

            {#if data.next}
                <a href="/churches/{data.next.id}" class="doc-cd__walk-link doc-cd__walk-link--end">
                    <span class="doc-cd__walk-dir">Next church →</span>
                    <span class="doc-cd__walk-title">{data.next.name}</span>
                </a>
            {:else}
                <a href="/seals" class="doc-cd__walk-link doc-cd__walk-link--end">
                    <span class="doc-cd__walk-dir">Onward →</span>
                    <span class="doc-cd__walk-title">The seven seals</span>
                </a>
            {/if}
        </nav>
    </article>
</div>

<style>
    .doc-cd {
        --nav-h: 5.2rem;
        --gutter: clamp(1.5rem, 6vw, 7rem);
        min-height: 100vh;
        background: var(--doc-bg);
        color: var(--doc-ink);
        padding-top: var(--nav-h);
        font-family: 'Public Sans', sans-serif;
        transition: background 0.4s ease, color 0.4s ease;
    }
    .doc-cd :where(h1, h2) {
        font-family: 'Newsreader', Georgia, serif;
        font-weight: 400;
        color: var(--doc-ink);
        letter-spacing: -0.018em;
        line-height: 1.05;
        margin: 0;
    }

    /* Each page carries its church's colour from the chart. The --ch-* tokens
       live in app.css and have a light-mode value each. */
    [data-church='ephesus'] { --row-tone: var(--ch-ephesus); }
    [data-church='smyrna'] { --row-tone: var(--ch-smyrna); }
    [data-church='pergamos'] { --row-tone: var(--ch-pergamos); }
    [data-church='thyatira'] { --row-tone: var(--ch-thyatira); }
    [data-church='sardis'] { --row-tone: var(--ch-sardis); }
    [data-church='philadelphia'] { --row-tone: var(--ch-philadelphia); }
    [data-church='laodicea'] { --row-tone: var(--ch-laodicea); }

    /* ------------------------------ Header ------------------------------ */
    .doc-cd__head {
        padding: clamp(2.5rem, 6vw, 4rem) var(--gutter) clamp(2rem, 4vw, 3rem);
        max-width: 52rem;
    }
    .doc-cd__crumbs {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        color: var(--doc-dim);
        margin-bottom: 1.5rem;
    }
    .doc-cd__crumbs a { color: inherit; text-decoration: none; transition: color 0.3s ease; }
    .doc-cd__crumbs a:hover { color: var(--doc-ember-soft); }

    .doc-cd__eyebrow {
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
    .doc-cd__eyebrow::before {
        content: '';
        width: 28px;
        height: 1px;
        background: currentColor;
        opacity: 0.7;
    }
    .doc-cd__title {
        font-size: clamp(2.6rem, 8vw, 5.25rem);
        line-height: 0.98;
        margin-bottom: 0.9rem !important;
        border-left: 3px solid var(--row-tone, var(--doc-ember));
        padding-left: clamp(0.9rem, 2vw, 1.25rem);
    }
    .doc-cd__meaning {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: var(--doc-dim);
        margin: 0 0 1.5rem;
    }
    .doc-cd__lede {
        font-family: 'Newsreader', Georgia, serif;
        font-size: clamp(1.25rem, 2.6vw, 1.75rem);
        line-height: 1.35;
        color: var(--doc-muted);
        margin: 0;
    }
    .doc-cd__env { color: var(--row-tone, var(--doc-ember)); }

    /* ------------------------------ Plate ------------------------------ */
    .doc-cd__plate {
        position: relative;
        margin: 0 var(--gutter);
        max-width: 64rem;
        border: 1px solid var(--doc-line);
        border-radius: 2px;
        overflow: hidden;
        background: var(--doc-bg-2);
    }
    .doc-cd__plate img {
        display: block;
        width: 100%;
        height: auto;
    }
    /* The plate owns the hover; the hint only obeys it. */
    .doc-cd__plate:hover :global(.hero-expand__hint) { opacity: 1; transform: none; }

    /* ------------------------------ Body ------------------------------ */
    .doc-cd__body {
        display: grid;
        grid-template-columns: 1fr;
        gap: clamp(2.5rem, 5vw, 4.5rem);
        padding: clamp(2.5rem, 6vw, 4.5rem) var(--gutter) clamp(3.5rem, 8vw, 6rem);
    }
    @media (min-width: 960px) {
        .doc-cd__body { grid-template-columns: minmax(0, 15rem) minmax(0, 1fr); }
        /* The aside travels with the reader through the letter. */
        .doc-cd__aside {
            position: sticky;
            top: calc(var(--nav-h) + 1.5rem);
            align-self: start;
        }
    }

    .doc-cd__aside { display: flex; flex-direction: column; gap: 2rem; }
    .doc-cd__meta { display: flex; flex-direction: column; gap: 0.4rem; }
    .doc-cd__meta-label {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.5625rem;
        letter-spacing: 0.28em;
        text-transform: uppercase;
        color: var(--doc-dim);
        margin: 0;
    }
    .doc-cd__meta-value {
        font-family: 'Newsreader', Georgia, serif;
        font-size: 1.05rem;
        color: var(--doc-ink);
        margin: 0;
    }
    /* A start with no stop: the claim the chart makes, kept here too. */
    .doc-cd__open {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.5625rem;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: var(--row-tone, var(--doc-ember));
        white-space: nowrap;
    }
    .doc-cd__contents { display: flex; flex-direction: column; gap: 0.6rem; }
    .doc-cd__contents a {
        font-size: 0.9rem;
        color: var(--doc-muted);
        text-decoration: none;
        border-left: 1px solid var(--doc-line);
        padding: 0.15rem 0 0.15rem 0.85rem;
        transition: color 0.3s ease, border-color 0.3s ease;
    }
    .doc-cd__contents a:hover { color: var(--doc-ember-soft); border-left-color: var(--doc-ember); }

    .doc-cd__main { max-width: 44rem; }

    .doc-cd__state {
        margin: 0 0 clamp(2rem, 4vw, 3rem);
        padding: clamp(1.5rem, 3vw, 2.25rem) 0 clamp(1.5rem, 3vw, 2.25rem) clamp(1.25rem, 3vw, 2rem);
        border-left: 2px solid var(--row-tone, var(--doc-ember));
        background: var(--doc-line-soft);
    }
    .doc-cd__state-k,
    .doc-cd__k {
        display: block;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.5625rem;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        color: var(--doc-dim);
        margin-bottom: 0.75rem;
    }
    .doc-cd__state p {
        font-family: 'Newsreader', Georgia, serif;
        font-style: italic;
        font-size: clamp(1.25rem, 2.6vw, 1.75rem);
        line-height: 1.45;
        color: var(--doc-ink);
        margin: 0 0 1rem;
    }
    .doc-cd__state cite {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-style: normal;
        font-size: 0.625rem;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        color: var(--doc-ember);
    }

    .doc-cd__section { margin-bottom: clamp(2.5rem, 5vw, 4rem); }
    .doc-cd__heading {
        font-size: clamp(1.5rem, 3vw, 2.1rem);
        line-height: 1.15;
        margin-bottom: 1.25rem !important;
        padding-top: 1.5rem;
        border-top: 1px solid var(--doc-line);
    }
    .doc-cd__p {
        font-size: 1.05rem;
        line-height: 1.85;
        color: var(--doc-muted);
        margin: 0 0 1.35rem;
    }
    .doc-cd__p--note {
        font-size: 0.98rem;
        padding-left: 1.25rem;
        border-left: 1px solid var(--doc-line);
    }

    .doc-cd__lead {
        font-family: 'Newsreader', Georgia, serif;
        font-size: clamp(1.2rem, 2.2vw, 1.45rem);
        line-height: 1.6;
        color: var(--doc-ink);
        margin: 0 0 clamp(2rem, 4vw, 3rem);
    }
    .doc-cd__verse {
        margin: 0 0 1.35rem;
        padding-left: 1.25rem;
        border-left: 2px solid var(--row-tone, var(--doc-ember));
    }
    .doc-cd__verse p {
        font-family: 'Newsreader', Georgia, serif;
        font-style: italic;
        font-size: 1.15rem;
        line-height: 1.6;
        color: var(--doc-ink);
        margin: 0 0 0.4rem;
    }
    .doc-cd__verse cite {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-style: normal;
        font-size: 0.625rem;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        color: var(--doc-ember);
    }
    .doc-cd__take { margin: 0 0 1.5rem; padding-left: 1.25rem; display: grid; gap: 0.75rem; }
    .doc-cd__take li { font-size: 1.05rem; line-height: 1.75; color: var(--doc-muted); }
    .doc-cd__refs { font-size: 0.98rem; color: var(--doc-muted); margin: 0; }

    .doc-cd__lines { margin: 0; display: grid; gap: 1.75rem; }
    .doc-cd__lines dt {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.5625rem;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        color: var(--row-tone, var(--doc-ember));
        margin-bottom: 0.5rem;
    }
    .doc-cd__lines dd {
        margin: 0;
        font-size: 1.05rem;
        line-height: 1.8;
        color: var(--doc-muted);
    }
    .doc-cd__lines dd.doc-cd__scripture {
        font-family: 'Newsreader', Georgia, serif;
        font-style: italic;
        font-size: clamp(1.1rem, 2vw, 1.3rem);
        line-height: 1.55;
        color: var(--doc-ink);
    }

    /* --------------------------- Walk-through --------------------------- */
    .doc-cd__walk {
        display: grid;
        grid-template-columns: 1fr;
        border-top: 1px solid var(--doc-line);
    }
    @media (min-width: 700px) { .doc-cd__walk { grid-template-columns: 1fr 1fr; } }
    .doc-cd__walk-link {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        padding: clamp(2rem, 4vw, 3rem) var(--gutter);
        text-decoration: none;
        border-bottom: 1px solid var(--doc-line);
        transition: background 0.3s ease;
    }
    @media (min-width: 700px) {
        .doc-cd__walk-link--end {
            text-align: right;
            align-items: flex-end;
            border-left: 1px solid var(--doc-line);
        }
    }
    .doc-cd__walk-link:hover { background: var(--doc-line-soft); }
    .doc-cd__walk-dir {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        color: var(--doc-ember);
    }
    .doc-cd__walk-title {
        font-family: 'Newsreader', Georgia, serif;
        font-size: clamp(1.3rem, 2.5vw, 1.8rem);
        color: var(--doc-ink);
        line-height: 1.15;
        transition: color 0.3s ease;
    }
    .doc-cd__walk-link:hover .doc-cd__walk-title { color: var(--doc-ember-soft); }

    @media (prefers-reduced-motion: reduce) {
        .doc-cd :where(a, img) { transition: none !important; }
    }
</style>
