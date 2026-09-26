<script>
    import OverviewNav from '$lib/components/OverviewNav.svelte';
    import { VISION_ROWS, VISION_COLUMNS, VISION_WIDTHS, VISION_CELLS } from '$lib/data/daniel-visions.js';
    import {
        INTRO,
        TWO_TASKS,
        GOVERNMENT,
        WHY_DANIEL,
        JUDAH,
        MARKS,
        MARKS_CLOSE,
        VISIONS,
        VISIONS_LEDE,
        KEY_ORDER,
        KEY_POINTS,
        KEY_CLOSE,
        EXAMPLES,
        WHY_JUDGED,
        CLOSING
    } from '$lib/data/daniel-study.js';

    let hovered = $state(/** @type {string | null} */ (null));
    let pinned = $state(/** @type {string | null} */ (null));
    let hoveredRow = $state(/** @type {string | null} */ (null));
    let hoveredColumn = $state(/** @type {string | null} */ (null));
    // A statue band or an empire label is not a plate — tapping one pins the
    // whole row instead, which is how touch follows an empire across.
    let pinnedRow = $state(/** @type {string | null} */ (null));

    let activeCell = $derived(VISION_CELLS.find((cell) => cell.id === (hovered ?? pinned)) ?? null);
    let activeRow = $derived(hoveredRow ?? activeCell?.rowId ?? pinnedRow);
    let activeColumn = $derived(hoveredColumn ?? activeCell?.columnId ?? null);
    let anyActive = $derived(Boolean(activeRow || activeColumn));

    let activeRowInfo = $derived(VISION_ROWS.find((row) => row.id === activeRow) ?? null);
    // The bands are named "head of gold"; the stone is named "the stone cut
    // without hands" - the same two words, joined without the "of".
    let rowTitle = $derived(
        activeRowInfo
            ? `${activeRowInfo.statue.part}${activeRowInfo.apart ? ' ' : ' of '}${activeRowInfo.statue.material.toLowerCase()}`
            : ''
    );
    let activeColumnInfo = $derived(VISION_COLUMNS.find((col) => col.id === activeColumn) ?? null);
    // Which of the four visions actually reach this empire — the point of the
    // chart is that the later visions start later.
    let rowVisions = $derived(
        activeRowInfo
            ? ['Daniel 2', 'Daniel 7', activeRowInfo.daniel8 ? 'Daniel 8' : null, activeRowInfo.daniel11 ? 'Daniel 11' : null].filter(Boolean)
            : []
    );

    const columns = VISION_WIDTHS.map((width) => `${width}fr`).join(' ');

    // The great image ends with the divided kingdoms. The stone that strikes it
    // is no band of the figure, so the column is closed off before that row.
    const lastImageRow = VISION_ROWS.findLastIndex((row) => !row.apart);

    /** @param {string} rowId @param {string} columnId */
    function cellState(rowId, columnId) {
        if (!anyActive) return 'rest';
        if (rowId === activeRow && columnId === activeColumn) return 'active';
        if (rowId === activeRow || columnId === activeColumn) return 'lit';
        return 'dim';
    }

    /** @param {string} id */
    function togglePin(id) {
        pinned = pinned === id ? null : id;
        pinnedRow = null;
    }

    /** @param {string} id */
    function togglePinRow(id) {
        pinnedRow = pinnedRow === id ? null : id;
        pinned = null;
    }

    function clearAll() {
        hovered = null;
        hoveredRow = null;
        hoveredColumn = null;
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

<svelte:head>
    <title>Daniel - The Restoration of the Kingdom | The Issues in the Controversy</title>
    <meta
        name="description"
        content="Daniel read as the restoration of a kingdom that lost everything: four visions for four aspects of that kingdom, and chapter 7 as the key to Revelation's judgment."
    />
    <meta name="keywords" content="daniel 2, daniel 7, daniel 8, daniel 11, restoration of the kingdom, government of god, pre-advent judgment, little horn, 2300 days, babylon captivity" />
</svelte:head>

<div class="doc-dn">
    <OverviewNav current="daniel" />

    <main>
        <!-- ============================ HEADER ============================ -->
        <section class="doc-dn__head">
            <p class="doc-dn__eyebrow">{INTRO.eyebrow}</p>
            <h1 class="doc-dn__title">The Restoration<br />of the <span class="doc-dn__em">Kingdom</span></h1>
            <p class="doc-dn__lede">{INTRO.lede}</p>
        </section>

        <!-- ========================= THE TWO TASKS ========================= -->
        <section class="doc-dn__tasks" use:reveal>
            <div class="doc-dn__sec-head">
                <p class="doc-dn__eyebrow">{TWO_TASKS.eyebrow}</p>
                <h2 class="doc-dn__h2">
                    Character was answered.<br /><span class="doc-dn__em">Government is the open question.</span>
                </h2>
            </div>

            <ol class="doc-dn__tasklist">
                {#each TWO_TASKS.tasks as task}
                    <li class="doc-dn__task" class:is-open={task.state !== 'Answered'}>
                        <span class="doc-dn__num">{task.num}</span>
                        <h3 class="doc-dn__h3">{task.name}</h3>
                        <p class="doc-dn__body">{task.body}</p>
                        <p class="doc-dn__state">{task.state}</p>
                    </li>
                {/each}
            </ol>

            <p class="doc-dn__statement">{TWO_TASKS.close}</p>
        </section>

        <!-- ===================== GOVERNMENT IS A PRINCIPLE ================== -->
        <section class="doc-dn__gov" use:reveal>
            <div class="doc-dn__stack">
                <p class="doc-dn__eyebrow">{GOVERNMENT.eyebrow}</p>
                <h2 class="doc-dn__h2">A constitution, <span class="doc-dn__em">not a capital.</span></h2>
                <p class="doc-dn__body">{GOVERNMENT.body}</p>
                <p class="doc-dn__body">{GOVERNMENT.satan}</p>
            </div>

            <div class="doc-dn__stack">
                <p class="doc-dn__statement doc-dn__statement--tight">{GOVERNMENT.statement}</p>
                <p class="doc-dn__body">{GOVERNMENT.public}</p>
            </div>
        </section>

        <!-- ======================== WHY DANIEL MATTERS ===================== -->
        <section class="doc-dn__why" use:reveal>
            <div class="doc-dn__stack">
                <p class="doc-dn__eyebrow">{WHY_DANIEL.eyebrow}</p>
                <blockquote class="doc-dn__quote">
                    <p>“{WHY_DANIEL.quote}”</p>
                    <cite>{WHY_DANIEL.reference}</cite>
                </blockquote>
                <p class="doc-dn__body">{WHY_DANIEL.hint}</p>
                <p class="doc-dn__statement doc-dn__statement--tight">{WHY_DANIEL.close}</p>
            </div>

            <!-- How the book itself divides: half history, half prophecy. -->
            <dl class="doc-dn__halves">
                {#each WHY_DANIEL.halves as half}
                    <div>
                        <dt>{half.label}</dt>
                        <dd>{half.chapters}</dd>
                    </div>
                {/each}
            </dl>
        </section>

        <!-- ========================== JUDAH AS A TYPE ====================== -->
        <section class="doc-dn__judah" use:reveal>
            <div class="doc-dn__sec-head">
                <p class="doc-dn__eyebrow">{JUDAH.eyebrow}</p>
                <h2 class="doc-dn__h2">
                    What happened to the Jews<br /><span class="doc-dn__em">illustrates what happens to the church.</span>
                </h2>
                <p class="doc-dn__body">{JUDAH.body}</p>
            </div>

            <div class="doc-dn__split">
                <div class="doc-dn__stack">
                    <p class="doc-dn__body">
                        <span class="doc-dn__ref">{JUDAH.fall.reference}</span>
                        {JUDAH.fall.body}
                    </p>
                    <p class="doc-dn__body doc-dn__body--ink">{JUDAH.spiritual}</p>
                </div>

                <div class="doc-dn__stack">
                    <p class="doc-dn__body">{JUDAH.mercy}</p>
                    <p class="doc-dn__body">{JUDAH.exodus}</p>
                    <p class="doc-dn__line">{JUDAH.daniel}</p>
                </div>
            </div>
        </section>

        <!-- ==================== FOUR MARKS OF A KINGDOM ==================== -->
        <section class="doc-dn__marks" use:reveal>
            <div class="doc-dn__sec-head">
                <p class="doc-dn__eyebrow">Four things that make a kingdom</p>
                <h2 class="doc-dn__h2">All four, <span class="doc-dn__em">gone.</span></h2>
            </div>

            <ol class="doc-dn__marklist">
                {#each MARKS as mark}
                    <li class="doc-dn__mark">
                        <span class="doc-dn__num">{mark.num}</span>
                        <h3 class="doc-dn__h3">{mark.name}</h3>
                        <p class="doc-dn__body">{mark.what}</p>
                        <p class="doc-dn__lost">
                            <span class="doc-dn__lost-label">Now</span>
                            {mark.now}
                        </p>
                    </li>
                {/each}
            </ol>

            <p class="doc-dn__statement">{MARKS_CLOSE}</p>
        </section>

        <!-- ============================= CHART ============================= -->
        <section class="doc-dn__chartwrap">
            <div class="doc-dn__chart-head">
                <p class="doc-dn__eyebrow">Four prophecies, four restorations</p>
                <h2 class="doc-dn__h2">One march of empires, <span class="doc-dn__em">seen four times.</span></h2>
                <p class="doc-dn__lede">
                    Daniel 2 gives the whole of it in a single figure; Daniel 7 gives it again in
                    beasts; Daniel 8 and Daniel 11 each begin one kingdom later and go further into
                    detail. Read across a row and you are looking at one empire seen four times over.
                </p>
            </div>

            <div class="doc-dn__hint">
                <span>Hover a row to follow one empire across the visions</span>
                <span class="doc-dn__hint-sep" aria-hidden="true">·</span>
                <span>tap or click to pin</span>
            </div>

            <div class="doc-dn__scroll">
                <div class="doc-dn__chart" role="group" aria-label="The visions of Daniel" onmouseleave={clearAll}>
                    <!-- Column headings — each is the vision that column belongs to. -->
                    <div class="doc-dn__heads" style="grid-template-columns: {columns};">
                        {#each VISION_COLUMNS as column}
                            <button
                                type="button"
                                class="doc-dn__head-cell"
                                data-state={anyActive ? (column.id === activeColumn ? 'active' : 'dim') : 'rest'}
                                onmouseenter={() => (hoveredColumn = column.id)}
                                onmouseleave={() => (hoveredColumn = null)}
                                onfocus={() => (hoveredColumn = column.id)}
                                onblur={() => (hoveredColumn = null)}
                            >
                                <span class="doc-dn__head-label">{column.label}</span>
                                <span class="doc-dn__head-sub">{column.sub}</span>
                            </button>
                        {/each}
                    </div>

                    <div class="doc-dn__grid" style="grid-template-columns: {columns};">
                        {#each VISION_ROWS as row, i}
                            <!-- The empire itself -->
                            <button
                                type="button"
                                class="doc-dn__empire"
                                class:is-apart={row.apart}
                                data-state={cellState(row.id, 'empire')}
                                aria-pressed={pinnedRow === row.id}
                                onmouseenter={() => (hoveredRow = row.id)}
                                onmouseleave={() => (hoveredRow = null)}
                                onfocus={() => (hoveredRow = row.id)}
                                onblur={() => (hoveredRow = null)}
                                onclick={() => togglePinRow(row.id)}
                            >
                                <span class="doc-dn__empire-name">{row.empire}</span>
                                <span class="doc-dn__empire-era">{row.era}</span>
                            </button>

                            <!-- The great image runs the height of the chart, divided
                                 into its own materials. The bands sit flush so the
                                 column reads as one figure rather than five tiles. -->
                            <button
                                type="button"
                                class="doc-dn__statue"
                                class:is-first={i === 0}
                                class:is-last={i === lastImageRow}
                                class:is-apart={row.apart}
                                style="--tone: {row.statue.tone};"
                                data-state={cellState(row.id, 'daniel-2')}
                                aria-pressed={pinnedRow === row.id}
                                onmouseenter={() => (hoveredRow = row.id)}
                                onmouseleave={() => (hoveredRow = null)}
                                onfocus={() => (hoveredRow = row.id)}
                                onblur={() => (hoveredRow = null)}
                                onclick={() => togglePinRow(row.id)}
                            >
                                <span class="doc-dn__statue-part">{row.statue.part}</span>
                                <span class="doc-dn__statue-material">{row.statue.material}</span>
                            </button>

                            <!-- Daniel 7 · Daniel 8 · Daniel 11 -->
                            {#each [{ key: 'daniel7', col: 'daniel-7' }, { key: 'daniel8', col: 'daniel-8' }, { key: 'daniel11', col: 'daniel-11' }] as slot}
                                {@const cell = /** @type {any} */ (row)[slot.key]}
                                {#if cell}
                                    {@const id = `${row.id}-${slot.key}`}
                                    <button
                                        type="button"
                                        class="doc-dn__plate"
                                        data-state={cellState(row.id, slot.col)}
                                        aria-pressed={pinned === id}
                                        onmouseenter={() => (hovered = id)}
                                        onmouseleave={() => (hovered = null)}
                                        onfocus={() => (hovered = id)}
                                        onblur={() => (hovered = null)}
                                        onclick={() => togglePin(id)}
                                    >
                                        {#if cell.img}
                                            <img class="doc-dn__plate-img" src={cell.img} alt={cell.caption} loading="lazy" />
                                        {:else}
                                            <!-- Standing in for the picture until there is
                                                 one: the plate names what it will show. -->
                                            <span class="doc-dn__plate-mark" aria-hidden="true">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <rect x="3" y="4" width="18" height="16" rx="1" stroke-width="1.3" />
                                                    <path stroke-width="1.3" stroke-linecap="round" d="M3 16l4.5-4.5 3.5 3.5 3-3L21 17" />
                                                    <circle cx="8.5" cy="8.5" r="1.4" stroke-width="1.3" />
                                                </svg>
                                            </span>
                                            <span class="doc-dn__plate-caption">{cell.caption}</span>
                                        {/if}
                                    </button>
                                {:else}
                                    <!-- This vision does not reach back this far. -->
                                    <div class="doc-dn__void" aria-hidden="true"></div>
                                {/if}
                            {/each}
                        {/each}
                    </div>
                </div>
            </div>

            <!-- ========================= READING PANEL ======================== -->
            <div class="doc-dn__panel" aria-live="polite">
                {#if activeCell}
                    <p class="doc-dn__meta">
                        <span class="doc-dn__meta-row">{activeCell.empire}</span>
                        <span class="doc-dn__dot" aria-hidden="true">·</span>
                        <span class="doc-dn__meta-col">
                            {VISION_COLUMNS.find((column) => column.id === activeCell?.columnId)?.label}
                        </span>
                    </p>
                    <h2 class="doc-dn__panel-title">{activeCell.caption}</h2>
                    <p class="doc-dn__refs">{activeCell.refs}</p>
                    <p class="doc-dn__note">{activeCell.note}</p>
                    {#if pinned === activeCell.id}
                        <button type="button" class="doc-dn__unpin" onclick={() => (pinned = null)}>Unpin</button>
                    {/if}
                {:else if activeRowInfo}
                    <p class="doc-dn__meta">
                        <span class="doc-dn__meta-row">{activeRowInfo.empire}</span>
                        <span class="doc-dn__dot" aria-hidden="true">·</span>
                        <span class="doc-dn__meta-col">{activeRowInfo.era}</span>
                    </p>
                    <h2 class="doc-dn__panel-title">{rowTitle}</h2>
                    <p class="doc-dn__refs">{activeRowInfo.statue.refs}</p>
                    <p class="doc-dn__note">{activeRowInfo.statue.note}</p>
                    <p class="doc-dn__seenin">
                        <span class="doc-dn__seenin-label">Seen in</span>
                        <span>{rowVisions.join(' · ')}</span>
                    </p>
                    {#if pinnedRow === activeRowInfo.id}
                        <button type="button" class="doc-dn__unpin" onclick={() => (pinnedRow = null)}>Unpin</button>
                    {/if}
                {:else if activeColumnInfo}
                    <p class="doc-dn__meta"><span class="doc-dn__meta-col">{activeColumnInfo.label}</span></p>
                    <h2 class="doc-dn__panel-title">{activeColumnInfo.sub}</h2>
                    {#if activeColumnInfo.refs}
                        <p class="doc-dn__refs">{activeColumnInfo.refs}</p>
                    {/if}
                    <p class="doc-dn__note doc-dn__note--lead">
                        {#if activeColumnInfo.id === 'empire'}
                            Not a vision but the history they run over — the kingdoms as they actually
                            came and went, from Babylon to the divided west.
                        {:else if activeColumnInfo.id === 'daniel-8' || activeColumnInfo.id === 'daniel-11'}
                            This vision opens with Medo-Persia — Babylon was already falling as it was
                            given, and it carries no picture of it. It ends where they all end.
                        {:else}
                            One vision, running the whole march of empires from Babylon to the divided
                            kingdoms, and on to the kingdom that ends them.
                        {/if}
                    </p>
                {:else}
                    <p class="doc-dn__note doc-dn__note--lead">
                        Four visions over one sequence of kingdoms, each ending in the same place.
                        Take any row and the chart shows that empire in every vision that reaches it.
                    </p>
                {/if}
            </div>
        </section>

        <!-- ====================== THE FOUR RESTORATIONS ==================== -->
        <section class="doc-dn__visions" use:reveal>
            <div class="doc-dn__sec-head">
                <p class="doc-dn__eyebrow">What each vision restores</p>
                <h2 class="doc-dn__h2">Four aspects, <span class="doc-dn__em">four restorations.</span></h2>
                <p class="doc-dn__lede">{VISIONS_LEDE}</p>
            </div>

            <ol class="doc-dn__visionlist">
                {#each VISIONS as vision}
                    <li class="doc-dn__vision">
                        <div class="doc-dn__vision-head">
                            <span class="doc-dn__num">{vision.vision}</span>
                            <h3 class="doc-dn__h3">{vision.aspect}</h3>
                        </div>
                        <p class="doc-dn__body">{vision.body}</p>
                        <p class="doc-dn__ends">
                            <span class="doc-dn__ends-label">How it ends</span>
                            {vision.ends}
                        </p>
                    </li>
                {/each}
            </ol>
        </section>

        <!-- ===================== DANIEL 7 IS THE KEY ======================= -->
        <section class="doc-dn__key" use:reveal>
            <div class="doc-dn__sec-head">
                <p class="doc-dn__eyebrow">Daniel 7 is the key to Revelation</p>
                <h2 class="doc-dn__h2">Revelation is that judgment, <span class="doc-dn__em">opened at length.</span></h2>
            </div>

            <div class="doc-dn__split">
                <div class="doc-dn__stack">
                    <p class="doc-dn__label">The order in Daniel 7</p>
                    <ol class="doc-dn__order">
                        {#each KEY_ORDER as step, i}
                            <li>
                                <span class="doc-dn__num">{String(i + 1).padStart(2, '0')}</span>
                                <span>{step}</span>
                            </li>
                        {/each}
                    </ol>
                </div>

                <ol class="doc-dn__points">
                    {#each KEY_POINTS as point}
                        <li>
                            <h3 class="doc-dn__point-title">{point.title}</h3>
                            <p class="doc-dn__body">{point.body}</p>
                        </li>
                    {/each}
                </ol>
            </div>

            <div class="doc-dn__keyclose">
                <p class="doc-dn__body">{KEY_CLOSE.authority}</p>
                <p class="doc-dn__body">{KEY_CLOSE.weighing}</p>
                <p class="doc-dn__line">{KEY_CLOSE.line}</p>
            </div>
        </section>

        <!-- ========================= WORKED EXAMPLES ======================= -->
        <section class="doc-dn__examples" use:reveal>
            <div class="doc-dn__sec-head">
                <p class="doc-dn__eyebrow">Two worked examples inside Daniel</p>
                <h2 class="doc-dn__h2">Kingdoms already <span class="doc-dn__em">weighed.</span></h2>
            </div>

            <div class="doc-dn__examplelist">
                {#each EXAMPLES as example}
                    <article class="doc-dn__example">
                        <h3 class="doc-dn__h3">{example.name}</h3>
                        <blockquote class="doc-dn__quote">
                            <p>“{example.quote}”</p>
                            <cite>{example.reference}</cite>
                        </blockquote>
                        <p class="doc-dn__body">{example.body}</p>
                    </article>
                {/each}
            </div>
        </section>

        <!-- ====================== WHY CHRIST IS JUDGED ===================== -->
        <section class="doc-dn__trial" use:reveal>
            <div class="doc-dn__sec-head">
                <p class="doc-dn__eyebrow">{WHY_JUDGED.eyebrow}</p>
                <h2 class="doc-dn__h2">The charge is not what most readers <span class="doc-dn__em">assume.</span></h2>
            </div>

            <div class="doc-dn__split">
                <div class="doc-dn__stack">
                    <ul class="doc-dn__notthis">
                        {#each WHY_JUDGED.notThis as line}
                            <li>{line}</li>
                        {/each}
                    </ul>
                    <p class="doc-dn__charge">{WHY_JUDGED.charge}</p>
                </div>

                <div class="doc-dn__stack">
                    <p class="doc-dn__body">{WHY_JUDGED.body}</p>
                    <p class="doc-dn__body doc-dn__body--ink">{WHY_JUDGED.timing}</p>
                    <p class="doc-dn__body">{WHY_JUDGED.transparency}</p>
                </div>
            </div>
        </section>

        <!-- ============================ CLOSING ============================ -->
        <section class="doc-dn__close">
            <p class="doc-dn__eyebrow">Reading it</p>
            <h2 class="doc-dn__close-title">Two kingdoms, grown side by side.</h2>
            <p class="doc-dn__lede">{CLOSING}</p>
            <div class="doc-dn__actions">
                <a href="/overview" class="doc-dn__btn">
                    The parallel chart
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m0 0l-6-6m6 6l-6 6" />
                    </svg>
                </a>
                <a href="/overview/revelation" class="doc-dn__btn doc-dn__btn--quiet">The book of Revelation</a>
                <a href="/symbols" class="doc-dn__btn doc-dn__btn--quiet">The lexicon</a>
            </div>
        </section>
    </main>
</div>

<style>
    .doc-dn {
        --nav-h: 5.2rem;
        min-height: 100vh;
        background: var(--doc-bg);
        color: var(--doc-ink);
        padding-top: var(--nav-h);
        font-family: 'Public Sans', sans-serif;
        transition: background 0.4s ease, color 0.4s ease;
    }
    .doc-dn :where(h1, h2, h3) {
        font-family: 'Newsreader', Georgia, serif;
        font-weight: 400;
        color: var(--doc-ink);
        letter-spacing: -0.018em;
        line-height: 1.02;
        margin: 0;
    }

    /* The written study fades up as it arrives; the chart does not move. */
    main > section { transition: opacity 0.8s ease, transform 0.8s ease; }
    main > section:not(.doc-dn__head):not(.doc-dn__chartwrap):not(.doc-dn__close):not(:global(.is-in)) {
        opacity: 0;
        transform: translateY(24px);
    }

    /* Header */
    .doc-dn__head {
        padding: clamp(3rem, 7vw, 5rem) clamp(1.5rem, 6vw, 7rem) clamp(2rem, 4vw, 3rem);
        max-width: 64rem;
    }
    .doc-dn__eyebrow {
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
    .doc-dn__eyebrow::before {
        content: '';
        width: 28px;
        height: 1px;
        background: var(--doc-ember);
        opacity: 0.7;
    }
    .doc-dn__title {
        font-size: clamp(2.6rem, 8vw, 6rem);
        line-height: 0.95;
        margin-bottom: 1.75rem !important;
    }
    .doc-dn__em { font-style: italic; font-weight: 300; color: var(--doc-ember-soft); }
    .doc-dn__lede {
        font-size: clamp(1rem, 1.6vw, 1.2rem);
        color: var(--doc-muted);
        max-width: 46rem;
        line-height: 1.7;
        margin: 0;
    }

    /* ------------------------------ Chart ------------------------------ */
    .doc-dn__chartwrap { padding: 0 clamp(1.5rem, 6vw, 7rem) clamp(3rem, 6vw, 5rem); }
    .doc-dn__chart-head {
        max-width: 46rem;
        padding: clamp(2.5rem, 5vw, 4rem) 0 clamp(1.5rem, 3vw, 2.25rem);
        border-top: 1px solid var(--doc-line);
    }
    .doc-dn__hint {
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
    .doc-dn__hint-sep { opacity: 0.6; }

    .doc-dn__scroll { overflow-x: auto; padding-bottom: 0.75rem; }
    .doc-dn__chart { min-width: 52rem; display: flex; flex-direction: column; gap: 0.75rem; }

    .doc-dn__heads { display: grid; gap: 0.5rem; }
    .doc-dn__head-cell {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        align-items: flex-start;
        background: none;
        border: none;
        border-bottom: 1px solid var(--doc-line);
        padding: 0 0 0.75rem;
        cursor: pointer;
        text-align: left;
        transition: opacity 0.25s ease, border-color 0.25s ease;
    }
    .doc-dn__head-label {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.6875rem;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        color: var(--doc-ember);
    }
    .doc-dn__head-sub {
        font-family: 'Newsreader', Georgia, serif;
        font-style: italic;
        font-size: 0.9rem;
        color: var(--doc-muted);
    }
    .doc-dn__head-cell[data-state='dim'] { opacity: 0.4; }
    .doc-dn__head-cell[data-state='active'] { border-bottom-color: var(--doc-ember); }

    /* The five rows, all five columns */
    .doc-dn__grid { display: grid; gap: 0.5rem; grid-auto-rows: minmax(5.5rem, auto); }

    /* --- Column 1: the empire --- */
    .doc-dn__empire {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.3rem;
        cursor: pointer;
        background: #2c5f9e;
        color: #f1f4f8;
        border: 1px solid rgba(241, 235, 224, 0.18);
        border-radius: 3px;
        padding: 0.6rem;
        transition: opacity 0.25s ease, filter 0.25s ease, box-shadow 0.25s ease;
    }
    .doc-dn__empire-name {
        font-family: 'Public Sans', sans-serif;
        font-weight: 700;
        font-size: clamp(0.85rem, 1.35vw, 1.05rem);
        line-height: 1.15;
        text-align: center;
    }
    .doc-dn__empire-era {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.5625rem;
        letter-spacing: 0.16em;
        color: rgba(241, 244, 248, 0.72);
    }
    /* The closing row is not an empire among the rest — it is what ends them,
       so it takes the ember rather than the blue of the kingdoms. */
    .doc-dn__empire.is-apart {
        background: var(--doc-ember);
        color: #17150f;
        border-color: rgba(0, 0, 0, 0.35);
    }
    .doc-dn__empire.is-apart .doc-dn__empire-era { color: rgba(23, 21, 15, 0.72); }

    /* --- Column 2: the great image --- */
    .doc-dn__statue {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.2rem;
        cursor: pointer;
        background: linear-gradient(100deg, color-mix(in srgb, var(--tone) 82%, #000) 0%, var(--tone) 45%, color-mix(in srgb, var(--tone) 65%, #000) 100%);
        color: #17150f;
        border: 1px solid rgba(0, 0, 0, 0.4);
        /* Bands touch, so the column reads as one figure. */
        margin-bottom: -0.5rem;
        border-radius: 0;
        transition: opacity 0.25s ease, filter 0.25s ease, box-shadow 0.25s ease;
    }
    .doc-dn__statue.is-first { border-radius: 3px 3px 0 0; }
    .doc-dn__statue.is-last { border-radius: 0 0 3px 3px; margin-bottom: 0; }
    /* The stone is cut out of the mountain, not carried down the figure — it
       stands clear of the image, below the gap that closes it. */
    .doc-dn__statue.is-apart { border-radius: 3px; margin-bottom: 0; }
    .doc-dn__statue-part {
        font-family: 'Newsreader', Georgia, serif;
        font-size: clamp(0.95rem, 1.5vw, 1.15rem);
        line-height: 1.1;
    }
    .doc-dn__statue-material {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.5625rem;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        opacity: 0.75;
    }

    /* --- Columns 3–5: the plates --- */
    .doc-dn__plate {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        cursor: pointer;
        background: var(--doc-bg-3);
        border: 1px solid var(--doc-line);
        border-radius: 3px;
        padding: 0.7rem 0.6rem;
        overflow: hidden;
        transition: opacity 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
    }
    .doc-dn__plate-img { width: 100%; height: 100%; object-fit: cover; border-radius: 2px; }
    .doc-dn__plate-mark { color: var(--doc-dim); display: inline-flex; }
    .doc-dn__plate-mark svg { width: 1.5rem; height: 1.5rem; }
    .doc-dn__plate-caption {
        font-family: 'Newsreader', Georgia, serif;
        font-size: clamp(0.8rem, 1.2vw, 0.95rem);
        line-height: 1.25;
        text-align: center;
        color: var(--doc-ink);
    }
    /* Where a vision does not reach: left open, as in the chart. */
    .doc-dn__void { border: 1px dashed var(--doc-line-soft); border-radius: 3px; opacity: 0.5; }

    /* States, shared across the three kinds of cell */
    .doc-dn__statue[data-state='dim'],
    .doc-dn__empire[data-state='dim'],
    .doc-dn__plate[data-state='dim'] { opacity: 0.3; filter: saturate(0.5); }
    .doc-dn__statue[data-state='lit'],
    .doc-dn__empire[data-state='lit'],
    .doc-dn__plate[data-state='lit'] { opacity: 1; }
    .doc-dn__plate[data-state='lit'] { border-color: var(--doc-ember-soft); }
    .doc-dn__statue[data-state='active'],
    .doc-dn__empire[data-state='active'] { box-shadow: 0 0 0 2px var(--doc-ember); }
    .doc-dn__plate[data-state='active'] {
        border-color: var(--doc-ember);
        box-shadow: 0 0 0 2px var(--doc-ember), 0 10px 26px var(--doc-shadow);
        transform: translateY(-2px);
    }

    /* ---------------------------- Reading panel ---------------------------- */
    .doc-dn__panel {
        margin-top: clamp(1.5rem, 3vw, 2.5rem);
        border-top: 1px solid var(--doc-line);
        border-left: 2px solid var(--doc-ember);
        padding: clamp(1.25rem, 3vw, 2rem);
        background: var(--doc-line-soft);
        min-height: 12rem;
    }
    .doc-dn__meta {
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
    .doc-dn__meta-row { color: var(--doc-ember); }
    .doc-dn__meta-col { color: var(--doc-muted); }
    .doc-dn__dot { color: var(--doc-dim); }
    .doc-dn__panel-title {
        font-size: clamp(1.4rem, 3vw, 2.1rem);
        line-height: 1.12;
        margin-bottom: 0.6rem !important;
    }
    .doc-dn__refs {
        font-family: 'Newsreader', Georgia, serif;
        font-style: italic;
        font-size: 1rem;
        color: var(--doc-ember-soft);
        margin: 0 0 0.9rem;
    }
    .doc-dn__note {
        font-size: 1.02rem;
        line-height: 1.75;
        color: var(--doc-muted);
        max-width: 46rem;
        margin: 0;
    }
    .doc-dn__note--lead {
        font-family: 'Newsreader', Georgia, serif;
        font-style: italic;
        font-size: clamp(1.05rem, 1.8vw, 1.3rem);
    }
    .doc-dn__seenin {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
        align-items: baseline;
        margin: 1.5rem 0 0;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: var(--doc-ink);
    }
    .doc-dn__seenin-label { color: var(--doc-dim); }
    .doc-dn__unpin {
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
    .doc-dn__unpin:hover { border-color: var(--doc-ember); color: var(--doc-ember); }

    /* --------------------------- Study type --------------------------- */
    .doc-dn__h2 {
        font-size: clamp(1.8rem, 4vw, 2.9rem);
        line-height: 1.08 !important;
        margin-bottom: 1.25rem !important;
    }
    .doc-dn__h3 {
        font-size: clamp(1.25rem, 2.3vw, 1.6rem);
        line-height: 1.18 !important;
        margin-bottom: 0.8rem !important;
    }
    .doc-dn__body {
        font-size: clamp(0.98rem, 1.4vw, 1.08rem);
        line-height: 1.75;
        color: var(--doc-muted);
        margin: 0;
        max-width: 42rem;
    }
    .doc-dn__body--ink { color: var(--doc-ink); }
    .doc-dn__label,
    .doc-dn__num {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        color: var(--doc-dim);
        margin: 0;
    }
    .doc-dn__num { color: var(--doc-ember); display: block; }
    .doc-dn__ref {
        display: block;
        font-family: 'Newsreader', Georgia, serif;
        font-style: italic;
        font-size: 0.95rem;
        color: var(--doc-ember-soft);
        margin: 0 0 0.4rem;
    }
    .doc-dn__statement {
        font-family: 'Newsreader', Georgia, serif;
        font-size: clamp(1.25rem, 2.4vw, 1.75rem);
        line-height: 1.38;
        color: var(--doc-ink);
        max-width: 44rem;
        margin: 2rem 0 0;
        padding-top: 1.5rem;
        border-top: 1px solid var(--doc-line);
    }
    .doc-dn__statement--tight { margin-top: 0.5rem; }
    /* The short lines the study lands on - one sentence, standing alone. */
    .doc-dn__line {
        font-family: 'Newsreader', Georgia, serif;
        font-size: clamp(1.4rem, 3vw, 2.1rem);
        line-height: 1.25;
        color: var(--doc-ember-soft);
        margin: 0;
    }
    .doc-dn__quote {
        margin: 0;
        padding-left: clamp(1rem, 2vw, 1.5rem);
        border-left: 3px solid var(--doc-ember);
    }
    .doc-dn__quote p {
        font-family: 'Newsreader', Georgia, serif;
        font-style: italic;
        font-size: clamp(1.1rem, 2.2vw, 1.5rem);
        line-height: 1.42;
        color: var(--doc-ink);
        margin: 0 0 0.6rem;
    }
    .doc-dn__quote cite {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        font-style: normal;
        color: var(--doc-dim);
    }
    .doc-dn__sec-head { max-width: 46rem; margin-bottom: clamp(2rem, 4vw, 3rem); }
    .doc-dn__sec-head .doc-dn__lede { margin-top: 1.25rem; }
    .doc-dn__stack { display: grid; gap: 1.5rem; align-content: start; }
    .doc-dn__split { display: grid; gap: clamp(2rem, 4vw, 3.5rem); }
    @media (min-width: 960px) {
        .doc-dn__split { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }
    }

    .doc-dn__tasks,
    .doc-dn__gov,
    .doc-dn__why,
    .doc-dn__judah,
    .doc-dn__marks,
    .doc-dn__visions,
    .doc-dn__key,
    .doc-dn__examples,
    .doc-dn__trial {
        padding: clamp(3rem, 7vw, 5rem) clamp(1.5rem, 6vw, 7rem);
        border-top: 1px solid var(--doc-line);
    }
    .doc-dn__gov,
    .doc-dn__judah,
    .doc-dn__key,
    .doc-dn__trial { background: var(--doc-bg-2); }
    .doc-dn__gov,
    .doc-dn__why { display: grid; gap: clamp(2rem, 5vw, 4rem); }
    @media (min-width: 960px) {
        .doc-dn__gov { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }
        .doc-dn__why { grid-template-columns: minmax(0, 1.25fr) minmax(0, 0.75fr); }
    }

    /* The two tasks — one closed, one open */
    .doc-dn__tasklist {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: 1.25rem;
    }
    @media (min-width: 860px) {
        .doc-dn__tasklist { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }
    .doc-dn__task {
        display: grid;
        gap: 0.8rem;
        align-content: start;
        padding: clamp(1.5rem, 3vw, 2.25rem);
        border: 1px solid var(--doc-line);
        border-radius: 2px;
        background: var(--doc-bg-2);
    }
    .doc-dn__task.is-open {
        border-color: var(--doc-ember);
        background: linear-gradient(180deg, rgba(217, 122, 67, 0.08), transparent 70%), var(--doc-bg-2);
    }
    .doc-dn__state {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.5625rem;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: var(--doc-dim);
        margin: 0;
    }
    .doc-dn__task.is-open .doc-dn__state { color: var(--doc-ember-soft); }

    /* History against prophecy */
    .doc-dn__halves { margin: 0; display: grid; gap: 1rem; align-content: start; }
    .doc-dn__halves > div {
        padding-top: 1.1rem;
        border-top: 1px solid var(--doc-line);
    }
    .doc-dn__halves dt {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        color: var(--doc-ember);
        margin-bottom: 0.5rem;
    }
    .doc-dn__halves dd {
        margin: 0;
        font-family: 'Newsreader', Georgia, serif;
        font-size: clamp(1.3rem, 2.6vw, 1.8rem);
        color: var(--doc-ink);
    }

    /* The four marks of a kingdom */
    .doc-dn__marklist {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: clamp(1.5rem, 3vw, 2.25rem);
    }
    @media (min-width: 860px) {
        .doc-dn__marklist { grid-template-columns: repeat(4, minmax(0, 1fr)); }
    }
    .doc-dn__mark {
        display: flex;
        flex-direction: column;
        border-top: 1px solid var(--doc-line);
        padding-top: 1.2rem;
        transition: border-color 0.4s ease;
    }
    .doc-dn__mark:hover { border-top-color: var(--doc-ember); }
    .doc-dn__mark .doc-dn__num { margin-bottom: 0.9rem; }
    .doc-dn__lost {
        /* Pinned to the bottom of each card so the four "now" lines align. */
        margin: 1rem 0 0;
        margin-top: auto;
        padding-top: 0.9rem;
        border-top: 1px solid var(--doc-line-soft);
        color: var(--doc-ink);
        line-height: 1.6;
    }
    .doc-dn__lost-label,
    .doc-dn__ends-label {
        display: block;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.5625rem;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: var(--doc-ember);
        margin-bottom: 0.35rem;
    }

    /* Judah as a type */
    .doc-dn__judah .doc-dn__body { max-width: 44rem; }

    /* What each vision restores */
    .doc-dn__visionlist {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: clamp(1.5rem, 3vw, 2.25rem);
    }
    @media (min-width: 900px) {
        .doc-dn__visionlist { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }
    .doc-dn__vision {
        display: grid;
        gap: 1rem;
        align-content: start;
        padding: clamp(1.5rem, 3vw, 2rem);
        border: 1px solid var(--doc-line);
        border-radius: 2px;
        background: var(--doc-bg-2);
    }
    .doc-dn__vision-head { display: grid; gap: 0.6rem; }
    .doc-dn__ends {
        margin: 0;
        padding-top: 1rem;
        border-top: 1px solid var(--doc-line);
        font-family: 'Newsreader', Georgia, serif;
        font-size: clamp(1.05rem, 1.9vw, 1.25rem);
        line-height: 1.45;
        color: var(--doc-ink);
    }

    /* Daniel 7 as the key */
    .doc-dn__order { list-style: none; margin: 0; padding: 0; }
    .doc-dn__order li {
        display: grid;
        grid-template-columns: auto minmax(0, 1fr);
        gap: 1rem;
        align-items: baseline;
        padding: 0.9rem 0;
        border-top: 1px solid var(--doc-line);
        font-family: 'Newsreader', Georgia, serif;
        font-size: clamp(1.05rem, 1.9vw, 1.25rem);
        line-height: 1.45;
        color: var(--doc-ink);
    }
    .doc-dn__order li:last-child { border-bottom: 1px solid var(--doc-line); }
    .doc-dn__points { list-style: none; margin: 0; padding: 0; display: grid; gap: 1.5rem; }
    .doc-dn__points li { border-top: 1px solid var(--doc-line); padding-top: 1.1rem; }
    .doc-dn__point-title {
        font-family: 'Newsreader', Georgia, serif;
        font-weight: 400;
        font-size: clamp(1.1rem, 2vw, 1.3rem);
        line-height: 1.25;
        color: var(--doc-ink);
        margin: 0 0 0.6rem;
    }
    .doc-dn__keyclose {
        display: grid;
        gap: 1.25rem;
        max-width: 46rem;
        margin-top: clamp(2.5rem, 5vw, 3.5rem);
        padding-top: clamp(1.5rem, 3vw, 2.25rem);
        border-top: 1px solid var(--doc-line);
    }

    /* The two worked examples */
    .doc-dn__examplelist { display: grid; gap: clamp(1.5rem, 3vw, 2.5rem); }
    @media (min-width: 900px) {
        .doc-dn__examplelist { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }
    .doc-dn__example {
        display: grid;
        gap: 1.1rem;
        align-content: start;
        border-top: 3px solid var(--doc-ember);
        padding-top: 1.25rem;
    }

    /* Why Christ is judged */
    .doc-dn__notthis { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.6rem; }
    .doc-dn__notthis li {
        font-family: 'Newsreader', Georgia, serif;
        font-size: clamp(1.1rem, 2vw, 1.35rem);
        line-height: 1.4;
        color: var(--doc-dim);
        padding-left: 1.1rem;
        border-left: 1px solid var(--doc-line);
    }
    .doc-dn__charge {
        font-family: 'Newsreader', Georgia, serif;
        font-style: italic;
        font-size: clamp(1.5rem, 3.4vw, 2.4rem);
        line-height: 1.25;
        color: var(--doc-ink);
        margin: 0;
        padding-left: clamp(1rem, 2vw, 1.5rem);
        border-left: 3px solid var(--doc-ember);
    }

    /* Closing */
    .doc-dn__close {
        border-top: 1px solid var(--doc-line);
        padding: clamp(3.5rem, 8vw, 6rem) clamp(1.5rem, 6vw, 7rem) clamp(4rem, 9vw, 8rem);
        max-width: 64rem;
    }
    .doc-dn__close-title {
        font-size: clamp(1.9rem, 4vw, 3rem);
        line-height: 1.1;
        margin-bottom: 1.5rem !important;
    }
    .doc-dn__actions { display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 2.5rem; }
    .doc-dn__btn {
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
    .doc-dn__btn:hover { border-color: var(--doc-ember); color: var(--doc-ember-soft); }
    .doc-dn__btn svg { width: 1rem; height: 1rem; transition: transform 0.3s ease; }
    .doc-dn__btn:hover svg { transform: translateX(4px); }
    .doc-dn__btn--quiet { color: var(--doc-muted); }

    @media (prefers-reduced-motion: reduce) {
        .doc-dn :where(a, button) { transition: none !important; }
        .doc-dn__plate[data-state='active'] { transform: none; }
    }
</style>
