<script>
    import Seo from '$lib/components/Seo.svelte';
    import { SEALS_TITLE, SEALS_SUBTITLE, CHAIN, REIGN } from '$lib/data/seals.js';
    import SealsOverview from '$lib/components/SealsOverview.svelte';
    import HeroExpand from '$lib/components/HeroExpand.svelte';

    // Same reveal treatment the landing page uses, so a reader arriving from
    // the filmstrip meets the same rhythm here.
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
        }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
        io.observe(node);
        return { destroy() { io.disconnect(); } };
    }
</script>

<Seo
    title="The Seven Seals"
    description="Out of the judgement of Christ's kingdom come the seven seals; out of the seventh seal, the seven trumpets; and out of the seventh trumpet, Christ as the sole ruler of the universe."
    keywords="seven seals, seven trumpets, judgement of Christ's kingdom, revelation 6, revelation 8, revelation 11:15, seventh seal, seventh trumpet, white horse, red horse, black horse, pale horse, souls under the altar"
    image="/the fith seal.jpg"
/>


<div class="doc-sl">
    <main>
        <!-- ============================= HERO ============================= -->
        <section class="doc-sl__hero">
            <img
                class="doc-sl__hero-img"
                src="/thumbnail-SeXhKRiCmU0-640x480.jpg"
                alt="A hand resting on a scroll closed with seven wax seals"
                fetchpriority="high"
            />
            <span class="doc-sl__hero-veil" aria-hidden="true"></span>

            <!-- The hero crops the frame and grades it dark for the type.
                 This gives the plate back, uncropped and ungraded. -->
            <HeroExpand
                src="/thumbnail-SeXhKRiCmU0-640x480.jpg"
                alt="A hand resting on a scroll closed with seven wax seals"
                caption="The sealed scroll — Revelation 6 – 8"
            />

            <div class="doc-sl__hero-text">
                <p class="doc-sl__eyebrow">Act II · Revelation 6 – 8</p>
                <h1 class="doc-sl__title">The Seven<br /><span class="doc-sl__em">Seals</span></h1>
                <p class="doc-sl__lede">
                    {SEALS_SUBTITLE} Out of the judgement of that kingdom come the seven seals.
                    Out of the seventh seal come the seven trumpets. And out of the seventh
                    trumpet, Christ is left the sole ruler of the universe - there are no longer
                    other kingdoms.
                </p>
            </div>
        </section>

        <!-- ========================== INTRODUCTION ========================== -->
        <!-- The seals are almost always read as disasters queued up for the last
             days. Everything on this page depends on the opposite reading, so the
             case for it is made here, before the chart. -->
        <section class="doc-sl__intro" id="how-to-read" use:reveal>
            <p class="doc-sl__eyebrow">Before the first seal</p>
            <h2 class="doc-sl__intro-title">
                A courtroom, not a catastrophe.
            </h2>

            <!-- The plate carries the second paragraph: it is the room being
                 described, so it sits beside the prose rather than under it. -->
            <div class="doc-sl__split">
                <div>
                    <div class="doc-sl__prose">
                        <p>
                            Most readings treat the seven seals as escalating disasters held back for the
                            end of the world: the white horse is the Antichrist, the red horse is world
                            war, the pale horse is famine and mass death. Each symbol is handed a meaning
                            of its own, and no single picture has to hold them all together.
                        </p>
                        <p>
                            But the seals are not opened on earth. John is taken up through an open door
                            and the scene he describes is a court already in session — the four living
                            creatures full of eyes, the Spirit in unlimited measure, innumerable angels as
                            witnesses, the four and twenty elders, and a sealed book waiting to be opened.
                            Daniel had described the same room. Only the Lion of the tribe of Judah, the
                            Lamb that was slain, is found worthy to open the book, and when he takes it
                            every creature in heaven and earth and sea breaks into praise. A court does not
                            convene to release catastrophes on the world. It convenes to examine a record.
                        </p>
                    </div>

                    <blockquote class="doc-sl__pull">
                        <p>The judgment was set, and the books were opened.</p>
                        <cite>Daniel 7:10</cite>
                    </blockquote>
                </div>

                <figure class="doc-sl__plate">
                    <img
                        src="/courtroom.jpg"
                        alt="The throne in heaven: the four living creatures, the seven lamps of fire, the sea of glass and the crowned elders seated around it"
                        loading="lazy"
                        width="1280"
                        height="720"
                    />
                    <figcaption>
                        The court in session — the throne, the four living creatures, the seven lamps
                        of fire before it, and the four and twenty elders seated around.
                        <span>Revelation 4:2–10 · Daniel 7:9–10</span>
                    </figcaption>
                </figure>
            </div>

            <!-- Three things to settle before the sequence makes sense. -->
            <ol class="doc-sl__keys">
                <li class="doc-sl__key">
                    <span class="doc-sl__key-n" aria-hidden="true">01</span>
                    <div>
                        <h3 class="doc-sl__key-title">“Come and see”</h3>
                        <p>
                            The King James and Young’s Literal both have the living creature say
                            <em>come and see</em>; several modern versions print only <em>come</em>,
                            and that one word changes the scene. “Come” either calls John forward
                            or summons something out of the seal. “Come and see” addresses the
                            assembled court and invites it to examine what is being produced —
                            which is exactly what you would expect while evidence is being laid out.
                        </p>
                    </div>
                </li>
                <li class="doc-sl__key">
                    <span class="doc-sl__key-n" aria-hidden="true">02</span>
                    <div>
                        <h3 class="doc-sl__key-title">The horse is the people of God</h3>
                        <p>
                            One verse in the middle of Zechariah gives the figure away: God has
                            visited the house of Judah and made them <em>as his goodly horse in the
                            battle</em>. A horse was what gave an army its advantage, so the sense is
                            that his people are the instrument he fights with — the same kind of
                            figure as a battle axe and weapons of war. John is watching the kingdom
                            at war, phase by phase, not four riders arriving.
                        </p>
                    </div>
                </li>
                <li class="doc-sl__key">
                    <span class="doc-sl__key-n" aria-hidden="true">03</span>
                    <div>
                        <h3 class="doc-sl__key-title">Where the count begins</h3>
                        <p>
                            The record does not open in Eden, or with Adam, or with the generation
                            of Noah. It opens with the apostolic church — the point the kingdom of
                            Christ began, at the crucifixion and the resurrection. If individual
                            people were the subject, every human being would have to be examined and
                            the record would have to start at Adam. It starts where the kingdom
                            starts, because the kingdom is what is on trial.
                        </p>
                    </div>
                </li>
            </ol>

            <!-- The second paragraph describes the trajectory in words; the
                 diagram beside it is that same trajectory drawn. -->
            <div class="doc-sl__split">
                <div class="doc-sl__prose">
                    <p>
                        That last point decides the whole reading. This is the judgement of a kingdom,
                        not an audit of personal salvation — the government of Christ is what stands
                        examined. Individuals are examined too, because a kingdom cannot be examined in
                        a vacuum and everyone in it is part of the testimony of it. But the question
                        before the court is whether the kingdom works, and the motive that puts in a
                        believer is not anxiety about being lost. It is the desire that Christ be
                        glorified in the life that is put on display.
                    </p>
                    <p>
                        Then watch the colours. White, red, black, pale — pure, then bloodied, then
                        bought, then lethal. It is not decoration; it is a direction, and the direction
                        is down. By the fourth seal the public face of the kingdom is a source of
                        death, and the evidence appears to prove that the government of Christ has
                        failed. The cause is named in the studies that follow: every time the kingdom
                        was renewed it installed a human system of government, saying Christ was in
                        charge while putting men at the helm. The direction changes at the fifth seal,
                        and it changes for one reason — Christ is allowed to be Lord.
                    </p>
                </div>

                <figure class="doc-sl__plate doc-sl__plate--diagram">
                    <img
                        src="/churhstate.jpg"
                        alt="A line diagram of the seven seals. The line falls from the white horse through the red, black and pale horses to its lowest point, then rises again at the souls under the altar, marked Christ in you, and continues up past the cosmic signs to the close of probation and the seven trumpets."
                        loading="lazy"
                        width="1280"
                        height="720"
                    />
                    <figcaption>
                        The same trajectory drawn: down through the four horses, and up again from
                        the fifth seal — not by reform, but by Christ in you.
                        <span>From the study</span>
                    </figcaption>
                </figure>
            </div>

            <p class="doc-sl__verse">
                The seven churches tell this history from within · the seven seals tell it as public record
            </p>
        </section>

        <!-- Orientation band: the whole sequence at a glance. Each seal in the
             chart is the way into its own study at /seals/[slug], so the
             sequence is read there rather than repeated down this page. -->
        <section class="doc-sl__head">
            <SealsOverview />
        </section>

        <!-- ============================== THE CHAIN ============================= -->
        <!-- The three hand-offs written out, in the order the chart draws them,
             so the argument survives without the diagram. -->
        <section class="doc-sl__chain" id="the-chain" use:reveal>
            <p class="doc-sl__eyebrow">One line, three hand-offs</p>
            <h2 class="doc-sl__chain-title">Where the sevens come from,<br />and where they end.</h2>

            <ol class="doc-sl__steps">
                {#each CHAIN as step, i}
                    <li class="doc-sl__step" id={step.id}>
                        <span class="doc-sl__step-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                        <div class="doc-sl__step-text">
                            <h3 class="doc-sl__step-title">
                                {step.from} <span class="doc-sl__step-to">{step.to}</span>
                            </h3>
                            <p class="doc-sl__ref">{step.reference}</p>
                            <p class="doc-sl__body">{step.body}</p>
                        </div>
                    </li>
                {/each}
            </ol>
        </section>

        <!-- ============================= CLOSING ============================ -->
        <section class="doc-sl__close" use:reveal>
            <p class="doc-sl__eyebrow">Where this leads</p>
            <h2 class="doc-sl__close-title">
                After the seventh trumpet there is no other kingdom.
            </h2>
            <p class="doc-sl__lede">
                {SEALS_TITLE} are one line through a longer prophecy, and it closes on a single
                throne: the kingdoms of this world become the kingdoms of our Lord and of his
                Christ, and he shall reign for ever and ever. The studies follow that line from
                Daniel through Revelation, and the series walks the same ground on film.
            </p>

            <p class="doc-sl__verse">{REIGN.reference}</p>

            <div class="doc-sl__actions">
                <a href="/topics" class="doc-sl__btn">
                    Read the studies
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m0 0l-6-6m6 6l-6 6" />
                    </svg>
                </a>
                <a href="/videos" class="doc-sl__btn doc-sl__btn--quiet">Watch the series</a>
            </div>
        </section>

    </main>
</div>

<style>
    .doc-sl {
        --nav-h: 5.2rem;
        min-height: 100vh;
        background: var(--doc-bg);
        color: var(--doc-ink);
        padding-top: var(--nav-h);
        font-family: 'Public Sans', sans-serif;
        transition: background 0.4s ease, color 0.4s ease;
    }
    .doc-sl :where(h1, h2) {
        font-family: 'Newsreader', Georgia, serif;
        font-weight: 400;
        color: var(--doc-ink);
        letter-spacing: -0.018em;
        line-height: 1.02;
        margin: 0;
    }

    /* ------------------------------ Hero ------------------------------ */
    /* The source frame is only 640px wide, so it is graded dark and veiled
       rather than shown at full brightness — the softness of the upscale
       reads as depth instead of as a low-resolution image. */
    .doc-sl__hero {
        position: relative;
        display: flex;
        align-items: flex-end;
        min-height: clamp(24rem, 68vh, 40rem);
        overflow: hidden;
        border-bottom: 1px solid var(--doc-line);
        /* Deliberately *not* isolated: the layers below stack with positive
           z-indices instead of negative ones, so the hero raises no stacking
           context of its own and the expand viewer — fixed, and above the
           nav — is free to cover the whole window. */
    }
    /* The hero owns the hover; the hint only obeys it. */
    .doc-sl__hero:hover :global(.hero-expand__hint) { opacity: 1; transform: none; }
    .doc-sl__hero-img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center 45%;
        filter: contrast(1.08) saturate(0.9) brightness(0.72);
        z-index: 0;
    }
    /* Two stops rather than one: a floor under the whole frame so the type
       holds at any crop, and a deeper wash at the bottom where it sits. */
    .doc-sl__hero-veil {
        position: absolute;
        inset: 0;
        z-index: 1;
        background:
            linear-gradient(to top, rgba(11, 11, 13, 0.94) 0%, rgba(11, 11, 13, 0.55) 45%, rgba(11, 11, 13, 0.25) 100%),
            linear-gradient(to right, rgba(11, 11, 13, 0.75) 0%, transparent 65%);
    }
    .doc-sl__hero-text {
        position: relative;
        z-index: 2;
        max-width: 46rem;
        padding: clamp(2.5rem, 7vw, 5rem) clamp(1.5rem, 6vw, 7rem) clamp(2.5rem, 6vw, 4.5rem);
    }
    /* The hero is dark in both themes, so its type is pinned to the dark
       palette instead of following the page's. */
    .doc-sl__hero-text .doc-sl__title { color: #f1ebe0; }
    .doc-sl__hero-text .doc-sl__lede { color: rgba(241, 235, 224, 0.78); }
    /* Touch has no hover, so the viewer's hint stands permanently in the
       bottom corner — the hero text has to clear it. */
    @media (max-width: 700px) {
        .doc-sl__hero-text { padding-bottom: 6rem; }
    }

    /* --------------------------- Introduction --------------------------- */
    /* Set on the page's own ground rather than the banded background, so the
       argument reads as body copy and the chart below it reads as an inset. */
    .doc-sl__intro {
        padding: clamp(3rem, 7vw, 5rem) clamp(1.5rem, 6vw, 7rem);
        border-bottom: 1px solid var(--doc-line);
        scroll-margin-top: calc(var(--nav-h) + 1rem);
        opacity: 0;
        transform: translateY(24px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    .doc-sl__intro:global(.is-in) { opacity: 1; transform: none; }
    .doc-sl__intro-title {
        font-size: clamp(1.9rem, 4vw, 3rem);
        line-height: 1.1;
        margin-bottom: clamp(1.75rem, 3vw, 2.5rem) !important;
    }

    /* The opening argument and the plate of the room it describes, side by
       side — the prose alone left the right half of the band empty. */
    .doc-sl__split {
        display: grid;
        gap: clamp(2rem, 4vw, 3.5rem);
        align-items: start;
    }
    @media (min-width: 1000px) {
        .doc-sl__split { grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr); }
    }
    /* The grid already spaces the two columns apart. */
    .doc-sl__split .doc-sl__pull { margin-bottom: 0; }

    .doc-sl__plate { margin: 0; }
    .doc-sl__plate img {
        display: block;
        width: 100%;
        height: auto;
        border: 1px solid var(--doc-line);
        /* Graded down a touch: the plate is bright and the band around it is
           not, so it is brought toward the page rather than left glaring. */
        filter: brightness(0.9) contrast(1.05) saturate(0.92);
        transition: filter 0.6s ease;
    }
    .doc-sl__plate:hover img { filter: none; }

    /* The hand-drawn chart is ink on white paper. Rather than sit it in a
       bright panel, the paper is dropped out and only the ink is kept, so the
       drawing reads as if it were struck straight onto the page.

       Dark (default): inverting flips the white ground to black and the ink to
       light, and the 180° hue rotation puts the reds and oranges back where
       they started. `screen` then discards the black ground.
       Light: `multiply` alone discards the white ground. */
    .doc-sl__plate--diagram img {
        border: none;
        filter: invert(1) hue-rotate(180deg);
        mix-blend-mode: screen;
        /* The photo above fades its grade on hover; this one has no hover
           state, and animating the filter makes the drawing morph whenever the
           theme is toggled. */
        transition: none;
    }
    .doc-sl__plate--diagram:hover img { filter: invert(1) hue-rotate(180deg); }
    :global(:root[data-doc-theme='light']) .doc-sl__plate--diagram img,
    :global(:root[data-doc-theme='light']) .doc-sl__plate--diagram:hover img {
        filter: none;
        mix-blend-mode: multiply;
    }
    .doc-sl__plate figcaption {
        margin-top: 0.9rem;
        padding-left: 0.9rem;
        border-left: 1px solid var(--doc-line);
        font-size: 0.85rem;
        line-height: 1.6;
        color: var(--doc-dim);
    }
    .doc-sl__plate figcaption span {
        display: block;
        margin-top: 0.5rem;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.5625rem;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: var(--doc-ember);
    }

    /* A single measure for the running argument — the keys below break out of
       it into columns, which is what marks them as asides rather than prose. */
    .doc-sl__prose { max-width: 40rem; }
    .doc-sl__prose p {
        font-size: clamp(0.98rem, 1.4vw, 1.1rem);
        line-height: 1.8;
        color: var(--doc-muted);
        margin: 0 0 1.25rem;
    }
    .doc-sl__prose p:last-child { margin-bottom: 0; }

    .doc-sl__pull {
        margin: clamp(2.25rem, 5vw, 3.25rem) 0;
        padding-left: clamp(1.25rem, 3vw, 2rem);
        border-left: 2px solid var(--doc-ember);
        max-width: 38rem;
    }
    .doc-sl__pull p {
        font-family: 'Newsreader', Georgia, serif;
        font-style: italic;
        font-size: clamp(1.25rem, 2.6vw, 1.8rem);
        line-height: 1.35;
        letter-spacing: -0.01em;
        color: var(--doc-ink);
        margin: 0 0 0.85rem;
    }
    .doc-sl__pull cite {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-style: normal;
        font-size: 0.5625rem;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        color: var(--doc-ember);
    }

    /* Three settled points, side by side on a wide screen so they read as one
       set rather than three more paragraphs. */
    .doc-sl__keys {
        list-style: none;
        margin: clamp(2.25rem, 5vw, 3.25rem) 0;
        padding: clamp(2rem, 4vw, 2.75rem) 0 0;
        border-top: 1px solid var(--doc-line);
        display: grid;
        gap: clamp(1.75rem, 4vw, 2.5rem);
    }
    @media (min-width: 900px) {
        .doc-sl__keys { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    }
    .doc-sl__key {
        display: grid;
        grid-template-columns: auto minmax(0, 1fr);
        gap: 0.9rem;
    }
    .doc-sl__key-n {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.2em;
        color: var(--doc-ember);
        padding-top: 0.3rem;
    }
    .doc-sl__key-title {
        font-family: 'Newsreader', Georgia, serif;
        font-weight: 400;
        font-size: clamp(1.1rem, 1.8vw, 1.3rem);
        line-height: 1.25;
        letter-spacing: -0.01em;
        color: var(--doc-ink);
        margin: 0 0 0.6rem;
    }
    .doc-sl__key p {
        font-size: 0.95rem;
        line-height: 1.7;
        color: var(--doc-muted);
        margin: 0;
    }
    .doc-sl__key em { font-style: italic; color: var(--doc-ember-soft); }

    /* Orientation band */
    .doc-sl__head {
        padding: clamp(2rem, 5vw, 3.5rem) clamp(1.5rem, 6vw, 7rem);
        background: var(--doc-bg-2);
        border-bottom: 1px solid var(--doc-line);
    }
    .doc-sl__eyebrow {
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
    .doc-sl__eyebrow::before {
        content: '';
        width: 28px;
        height: 1px;
        background: var(--doc-ember);
        opacity: 0.7;
    }
    .doc-sl__title {
        font-size: clamp(3rem, 10vw, 7rem);
        line-height: 0.95;
        margin-bottom: 1.75rem !important;
    }
    .doc-sl__em { font-style: italic; font-weight: 300; color: var(--doc-ember-soft); }
    .doc-sl__lede {
        font-size: clamp(1rem, 1.6vw, 1.2rem);
        color: var(--doc-muted);
        max-width: 42rem;
        line-height: 1.7;
        margin: 0;
    }

    .doc-sl__ref {
        font-family: 'Newsreader', Georgia, serif;
        font-style: italic;
        font-size: 1rem;
        color: var(--doc-ember-soft);
        margin: 0 0 1.4rem;
    }
    .doc-sl__body {
        font-size: clamp(0.98rem, 1.4vw, 1.1rem);
        line-height: 1.75;
        color: var(--doc-muted);
        margin: 0;
        border-left: 1px solid var(--doc-line);
        padding-left: 1.25rem;
    }

    /* ------------------------------ The chain ------------------------------ */
    /* The ladder is the diagram in words: each step names what it comes out of
       and what it opens, and the rule down the left carries the eye through
       all three without numbering them twice. */
    /* The orientation band above already draws the rule between the two. */
    .doc-sl__chain {
        padding: clamp(3.5rem, 8vw, 6rem) clamp(1.5rem, 6vw, 7rem);
        background: var(--doc-bg-2);
        scroll-margin-top: calc(var(--nav-h) + 1rem);
        opacity: 0;
        transform: translateY(24px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    .doc-sl__chain:global(.is-in) { opacity: 1; transform: none; }
    .doc-sl__chain-title {
        font-size: clamp(1.9rem, 4vw, 3rem);
        line-height: 1.1;
        margin-bottom: clamp(2.5rem, 5vw, 3.5rem) !important;
    }

    .doc-sl__steps {
        list-style: none;
        margin: 0;
        padding: 0;
        max-width: 58rem;
        display: grid;
        gap: clamp(2rem, 4vw, 3rem);
    }
    .doc-sl__step {
        display: grid;
        grid-template-columns: auto minmax(0, 1fr);
        gap: clamp(1rem, 3vw, 2rem);
        scroll-margin-top: calc(var(--nav-h) + 1rem);
    }
    .doc-sl__step-n {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.6875rem;
        letter-spacing: 0.2em;
        color: var(--doc-ember);
        padding-top: 0.45rem;
    }
    /* The last step is the conclusion, so the rule stops rather than running on
       into it — the sequence ends here. */
    .doc-sl__step:not(:last-child) .doc-sl__step-n {
        position: relative;
    }
    .doc-sl__step:not(:last-child) .doc-sl__step-n::after {
        content: '';
        position: absolute;
        top: 2.1rem;
        bottom: calc(-1 * clamp(2rem, 4vw, 3rem));
        left: 50%;
        border-left: 1px solid var(--doc-line);
    }
    .doc-sl__step-title {
        font-family: 'Newsreader', Georgia, serif;
        font-weight: 400;
        font-size: clamp(1.35rem, 2.8vw, 2rem);
        line-height: 1.15;
        letter-spacing: -0.015em;
        color: var(--doc-ink);
        margin: 0 0 0.7rem;
    }
    .doc-sl__step-to { font-style: italic; color: var(--doc-ember-soft); }
    .doc-sl__step .doc-sl__body { margin-top: 0; }

    /* Closing */
    .doc-sl__close {
        border-top: 1px solid var(--doc-line);
        padding: clamp(3.5rem, 8vw, 6rem) clamp(1.5rem, 6vw, 7rem) clamp(4rem, 9vw, 8rem);
        max-width: 64rem;
        opacity: 0;
        transform: translateY(24px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    .doc-sl__close:global(.is-in) { opacity: 1; transform: none; }
    .doc-sl__close-title {
        font-size: clamp(1.9rem, 4vw, 3rem);
        line-height: 1.1;
        margin-bottom: 1.5rem !important;
    }
    .doc-sl__verse {
        margin: 1.75rem 0 0;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        color: var(--doc-ember);
    }
    .doc-sl__actions { display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 2.5rem; }
    .doc-sl__btn {
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
    .doc-sl__btn:hover { border-color: var(--doc-ember); color: var(--doc-ember-soft); }
    .doc-sl__btn svg { width: 1rem; height: 1rem; transition: transform 0.3s ease; }
    .doc-sl__btn:hover svg { transform: translateX(4px); }
    .doc-sl__btn--quiet { color: var(--doc-muted); }

    @media (prefers-reduced-motion: reduce) {
        .doc-sl__intro,
        .doc-sl__chain,
        .doc-sl__close { opacity: 1; transform: none; transition: none; }
        .doc-sl :where(a, img, svg) { transition: none !important; }
    }
</style>
