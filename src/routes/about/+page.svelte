<script>
    import Seo from '$lib/components/Seo.svelte';
    import { THESIS_ITEMS } from '$lib/data/thesis.js';

    // What the site is made of, grouped the way the Explore menu groups it, and
    // ordered the way a reader is meant to meet it. Keep this in step with the
    // nav and the sitemap: every href below is a route that exists.
    const PART_GROUPS = [
        {
            title: 'Start here',
            items: [
                {
                    href: '/faoundations',
                    label: 'Foundations',
                    note: 'What Revelation assumes before it begins: a government that rules by consent rather than force, a war fought with lies, three charges laid against God, and the judgment by which they are settled.'
                }
            ]
        },
        {
            title: 'The maps',
            items: [
                {
                    href: '/overview',
                    label: 'The overviews',
                    note: 'Three charts: Daniel and Revelation in parallel, the book of Revelation in four divisions, and the visions of Daniel side by side.'
                },
                {
                    href: '/scene/revelation-4',
                    label: 'The throne room',
                    note: 'Revelation 4 as a scene rather than a diagram - every element of it pinned to the verse it is built from. The court of Daniel 7, seen from inside.'
                },
                {
                    href: '/symbols',
                    label: 'The lexicon',
                    note: 'The prophetic vocabulary - beast, horn, waters, woman, a day for a year - each with the passage that defines it.'
                }
            ]
        },
        {
            title: 'The kingdom of Christ',
            items: [
                {
                    href: '/churches',
                    label: 'The seven churches',
                    note: 'Revelation 2–3 read as seven conditions of one church. Each is given a starting point; not one is given an end, so all seven stand together now.'
                },
                {
                    href: '/seals',
                    label: 'The seven seals',
                    note: 'The seals of Revelation 6–8 read as successive states of the church, one study at a time.'
                },
                {
                    href: '/flashbacks',
                    label: 'The flashbacks',
                    note: 'Where the vision order is not the event order - the case for reading certain chapters earlier than the book prints them, and what changes when it is done.'
                },
                {
                    href: '/the-144000',
                    label: 'The 144,000',
                    note: 'Chapter 6 ends by asking who shall be able to stand. Chapter 7 answers it, and the sealing has to fall before the day of wrath rather than after it.'
                }
            ]
        },
        {
            title: 'The kingdom of the beast',
            items: [
                {
                    href: '/beast',
                    label: 'The beast and the woman',
                    note: 'Revelation 17 - seven heads, ten horns set on the beast and not on the heads, and a woman who rides a power she does not own.'
                }
            ]
        },
        {
            title: 'The same ground, other forms',
            items: [
                {
                    href: '/topics',
                    label: 'The written studies',
                    note: 'The written work in full, from the character of God to the gospel of the kingdom.'
                },
                {
                    href: '/videos',
                    label: 'The film series',
                    note: 'The same ground walked on film, episode by episode.'
                }
            ]
        }
    ];

    const PART_COUNT = PART_GROUPS.reduce((n, g) => n + g.items.length, 0);

    // How the studies are meant to be checked — the working rules of the project.
    const METHOD = [
        {
            num: '01',
            title: 'The Bible defines its own symbols',
            body: 'No figure is guessed at. Where a beast, a woman or a day means something, the meaning is taken from another passage - and that passage is printed beside it.'
        },
        {
            num: '02',
            title: 'Every claim carries its passage',
            body: 'Charts, studies and captions all name the text they rest on, so a reader can check the claim rather than take it.'
        },
        {
            num: '03',
            title: 'The prophecies are read as one',
            body: 'Daniel and Revelation cover the same ground repeatedly, each pass adding what the last left out. The charts are built to show that rather than assert it - and where a chapter is read out of the order the book prints it in, the reason is argued in the open.'
        }
    ];
</script>

<Seo
    title="About"
    description="What this project is: a study of the great controversy through the prophecies of Daniel and Revelation - foundations, the seven churches, the seven seals, the 144,000 and the beast - published as written studies, a film series, and reference charts anyone can check."
    keywords="about, open face fellowship, great controversy, daniel and revelation study, foundations of revelation, seven churches, seven seals, the 144000, bible prophecy ministry"
/>


<div class="doc-ab">
    <main>
        <!-- ============================ HEADER ============================ -->
        <section class="doc-ab__head">
            <p class="doc-ab__eyebrow">About</p>
            <h1 class="doc-ab__title">The <br /><span class="doc-ab__em"> Endgame</span> of Heaven</h1>
            <p class="doc-ab__lede">
                A study of the endgame of heaven - the charges laid against the character of God, and
                the answer the prophecies of Daniel and Revelation give to them. The work is published
                here in three forms: written studies, a film series, and reference charts anyone can
                check for themselves.
            </p>
        </section>

        <!-- ============================ PURPOSE ============================ -->
        <section class="doc-ab__purpose">
            <div class="doc-ab__col">
                <h2 class="doc-ab__h2">Why the prophecies</h2>
                <p class="doc-ab__p">
                    Daniel and Revelation are usually read for their calendar - who the beast is, when
                    the end comes. That is not what they are for. Behind every kingdom, every seal and
                    every trumpet stands a question about what kind of person God is, and whether the
                    charge brought against Him is true.
                </p>
                <p class="doc-ab__p">
                    The charge comes in three parts: that God's character is not what He says it is,
                    that His government cannot work, and that His justice is a sham. Read that way,
                    the prophecies stop being a puzzle to be solved and become a case being tried.
                    The court sits in Daniel 7. The books are opened. Everything else in both books
                    happens around that.
                </p>
                <p class="doc-ab__p">
                    That is the ground the <a class="doc-ab__inlink" href="/faoundations">Foundations</a>
                    study lays, and the rest of the work here assumes it. It is the place to start.
                </p>
            </div>
            <div class="doc-ab__col">
                <h2 class="doc-ab__h2">Who it is for</h2>
                <p class="doc-ab__p">
                    For anyone willing to check the text. Nothing here asks to be believed on the
                    strength of the person saying it - every study names its passages, and the charts
                    show their working so the reasoning can be followed or refused.
                </p>
                <p class="doc-ab__p">
                    Some of it is long. The questions underneath it are old ones, and they have not
                    been answered quickly by anyone.
                </p>
            </div>
        </section>

        <!-- ============================ THESIS ============================ -->
        <section class="doc-ab__thesis">
            <p class="doc-ab__eyebrow">The argument</p>
            <h2 class="doc-ab__h2 doc-ab__h2--wide">The issue, the answer, our part</h2>
            <div class="doc-ab__grid">
                {#each THESIS_ITEMS as item}
                    <article class="doc-ab__panel">
                        <span class="doc-ab__num">{item.num}</span>
                        <h3 class="doc-ab__panel-title">{item.title}</h3>
                        <p class="doc-ab__panel-desc">{item.description}</p>
                        <a href={`/${item.cta.href}`} class="doc-ab__textlink">{item.cta.label}</a>
                    </article>
                {/each}
            </div>
        </section>

        <!-- ============================ METHOD ============================ -->
        <section class="doc-ab__method">
            <p class="doc-ab__eyebrow">How the work is done</p>
            <h2 class="doc-ab__h2 doc-ab__h2--wide">Three rules the studies keep</h2>
            <div class="doc-ab__rules">
                {#each METHOD as rule}
                    <article class="doc-ab__rule">
                        <span class="doc-ab__num">{rule.num}</span>
                        <h3 class="doc-ab__rule-title">{rule.title}</h3>
                        <p class="doc-ab__p">{rule.body}</p>
                    </article>
                {/each}
            </div>
        </section>

        <!-- ============================= PARTS ============================= -->
        <section class="doc-ab__parts">
            <p class="doc-ab__eyebrow">What is here</p>
            <h2 class="doc-ab__h2 doc-ab__h2--wide">The work, part by part</h2>
            <p class="doc-ab__p doc-ab__parts-lede">
                {PART_COUNT} pieces, in the order they are meant to be met. Foundations comes first
                because everything after it leans on what that study settles; the two kingdoms can
                then be read in either order.
            </p>
            {#each PART_GROUPS as group}
                <div class="doc-ab__group">
                    <h3 class="doc-ab__group-title">{group.title}</h3>
                    <ul class="doc-ab__partlist">
                        {#each group.items as part}
                            <li>
                                <a href={part.href} class="doc-ab__part">
                                    <span class="doc-ab__part-label">
                                        {part.label}
                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m0 0l-6-6m6 6l-6 6" />
                                        </svg>
                                    </span>
                                    <span class="doc-ab__part-note">{part.note}</span>
                                </a>
                            </li>
                        {/each}
                    </ul>
                </div>
            {/each}
        </section>

        <!-- ============================== WHO ============================== -->
        <!-- The specifics of the fellowship — where it meets, how long it has
             been at this, who does the teaching — belong in this section. It is
             deliberately left general rather than invented. -->
        <section class="doc-ab__who">
            <div class="doc-ab__who-text">
                <p class="doc-ab__eyebrow">Who is behind it</p>
                <h2 class="doc-ab__h2">Open Face Fellowship</h2>
                <p class="doc-ab__p">
                    This site is the work of the family at Open Face Fellowship. It is a fellowship
                    rather than an institution: the studies here are what we have found in the text
                    and are still finding, put out openly so they can be weighed.
                </p>
                <p class="doc-ab__p">
                    The name is taken from the manner of the thing - with open face, beholding as in a
                    glass. Nothing in these studies is offered as settled beyond question, and
                    corrections are welcome; several of them have already changed what is written here.
                </p>
                <a href="/contact" class="doc-ab__btn">
                    Write to us
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m0 0l-6-6m6 6l-6 6" />
                    </svg>
                </a>
            </div>
            <figure class="doc-ab__who-figure">
                <img src="/openface.jpg" alt="Open Face Fellowship" loading="lazy" />
            </figure>
        </section>
    </main>
</div>

<style>
    .doc-ab {
        --nav-h: 5.2rem;
        min-height: 100vh;
        background: var(--doc-bg);
        color: var(--doc-ink);
        padding-top: var(--nav-h);
        font-family: 'Public Sans', sans-serif;
        transition: background 0.4s ease, color 0.4s ease;
    }
    .doc-ab :where(h1, h2, h3) {
        font-family: 'Newsreader', Georgia, serif;
        font-weight: 400;
        color: var(--doc-ink);
        letter-spacing: -0.018em;
        line-height: 1.05;
        margin: 0;
    }

    /* Header */
    .doc-ab__head {
        padding: clamp(3.5rem, 8vw, 6rem) clamp(1.5rem, 6vw, 7rem) clamp(2.5rem, 5vw, 4rem);
        max-width: 64rem;
    }
    .doc-ab__eyebrow {
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
    .doc-ab__eyebrow::before {
        content: '';
        width: 28px;
        height: 1px;
        background: var(--doc-ember);
        opacity: 0.7;
    }
    .doc-ab__title {
        font-size: clamp(2.6rem, 8.5vw, 6.5rem);
        line-height: 0.95;
        margin-bottom: 1.75rem !important;
    }
    .doc-ab__em { font-style: italic; font-weight: 300; color: var(--doc-ember-soft); }
    .doc-ab__lede {
        font-size: clamp(1rem, 1.6vw, 1.2rem);
        color: var(--doc-muted);
        max-width: 44rem;
        line-height: 1.7;
        margin: 0;
    }

    /* Shared type */
    .doc-ab__h2 {
        font-size: clamp(1.5rem, 3vw, 2.1rem);
        margin-bottom: 1.25rem !important;
    }
    .doc-ab__h2--wide { font-size: clamp(1.8rem, 4vw, 2.8rem); margin-bottom: 2.5rem !important; }
    .doc-ab__p {
        font-size: 1.02rem;
        line-height: 1.8;
        color: var(--doc-muted);
        margin: 0 0 1.25rem;
    }
    .doc-ab__p:last-of-type { margin-bottom: 0; }
    .doc-ab__inlink {
        color: var(--doc-ink);
        text-decoration: none;
        border-bottom: 1px solid var(--doc-ember);
        transition: color 0.3s ease;
    }
    .doc-ab__inlink:hover { color: var(--doc-ember-soft); }
    .doc-ab__num {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.75rem;
        letter-spacing: 0.24em;
        color: var(--doc-ember);
        display: block;
        margin-bottom: 1rem;
    }

    /* Purpose — two columns of prose */
    .doc-ab__purpose {
        display: grid;
        grid-template-columns: 1fr;
        gap: clamp(2.5rem, 5vw, 4.5rem);
        border-top: 1px solid var(--doc-line);
        padding: clamp(3rem, 6vw, 4.5rem) clamp(1.5rem, 6vw, 7rem);
    }
    @media (min-width: 860px) { .doc-ab__purpose { grid-template-columns: 1fr 1fr; } }
    .doc-ab__col { max-width: 34rem; }

    /* Thesis */
    .doc-ab__thesis {
        border-top: 1px solid var(--doc-line);
        padding: clamp(3rem, 6vw, 4.5rem) clamp(1.5rem, 6vw, 7rem);
    }
    .doc-ab__grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: clamp(2rem, 4vw, 3rem);
    }
    @media (min-width: 800px) { .doc-ab__grid { grid-template-columns: repeat(3, 1fr); } }
    .doc-ab__panel {
        display: flex;
        flex-direction: column;
        border-top: 1px solid var(--doc-line);
        padding-top: 1.5rem;
        transition: border-color 0.4s ease;
    }
    .doc-ab__panel:hover { border-top-color: var(--doc-ember); }
    .doc-ab__panel-title { font-size: clamp(1.35rem, 2.4vw, 1.75rem); margin-bottom: 0.85rem !important; }
    .doc-ab__panel-desc { flex: 1; line-height: 1.7; color: var(--doc-muted); margin: 0 0 1.5rem; }
    .doc-ab__textlink {
        align-self: flex-start;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        color: var(--doc-ember-soft);
        text-decoration: none;
        border-bottom: 1px solid var(--doc-line);
        padding-bottom: 0.35rem;
        transition: border-color 0.3s ease, color 0.3s ease;
    }
    .doc-ab__textlink:hover { border-bottom-color: var(--doc-ember); color: var(--doc-ember); }

    /* Method */
    .doc-ab__method {
        border-top: 1px solid var(--doc-line);
        padding: clamp(3rem, 6vw, 4.5rem) clamp(1.5rem, 6vw, 7rem);
    }
    .doc-ab__rules {
        display: grid;
        grid-template-columns: 1fr;
        gap: clamp(2rem, 4vw, 3rem);
    }
    @media (min-width: 800px) { .doc-ab__rules { grid-template-columns: repeat(3, 1fr); } }
    .doc-ab__rule { max-width: 26rem; }
    .doc-ab__rule-title {
        font-size: clamp(1.2rem, 2.2vw, 1.5rem);
        line-height: 1.2;
        margin-bottom: 0.9rem !important;
    }

    /* Parts */
    .doc-ab__parts {
        border-top: 1px solid var(--doc-line);
        padding: clamp(3rem, 6vw, 4.5rem) clamp(1.5rem, 6vw, 7rem);
    }
    .doc-ab__p.doc-ab__parts-lede { max-width: 42rem; margin-bottom: clamp(2.5rem, 5vw, 3.5rem); }
    /* Groups rather than one flat list, so eleven destinations read as five
       collections — the same grouping the Explore menu uses. */
    .doc-ab__group + .doc-ab__group { margin-top: clamp(2.25rem, 4.5vw, 3.25rem); }
    .doc-ab__group-title {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.6875rem;
        letter-spacing: 0.28em;
        text-transform: uppercase;
        color: var(--doc-ember);
        margin: 0 0 0.75rem !important;
    }
    .doc-ab__partlist { list-style: none; margin: 0; padding: 0; }
    .doc-ab__part {
        display: grid;
        grid-template-columns: 1fr;
        gap: 0.5rem;
        padding: clamp(1.25rem, 2.5vw, 1.8rem) 0;
        border-top: 1px solid var(--doc-line);
        text-decoration: none;
        transition: border-color 0.35s ease;
    }
    @media (min-width: 760px) {
        .doc-ab__part { grid-template-columns: minmax(0, 17rem) minmax(0, 1fr); gap: 2rem; align-items: baseline; }
    }
    .doc-ab__partlist li:last-child .doc-ab__part { border-bottom: 1px solid var(--doc-line); }
    .doc-ab__part:hover { border-top-color: var(--doc-ember); }
    .doc-ab__part-label {
        display: inline-flex;
        align-items: center;
        gap: 0.6rem;
        font-family: 'Newsreader', Georgia, serif;
        font-size: clamp(1.3rem, 2.5vw, 1.75rem);
        color: var(--doc-ink);
        transition: color 0.3s ease;
    }
    .doc-ab__part-label svg { width: 1rem; height: 1rem; color: var(--doc-ember); transition: transform 0.3s ease; }
    .doc-ab__part:hover .doc-ab__part-label { color: var(--doc-ember-soft); }
    .doc-ab__part:hover .doc-ab__part-label svg { transform: translateX(4px); }
    .doc-ab__part-note { color: var(--doc-muted); line-height: 1.7; }

    /* Who */
    .doc-ab__who {
        display: grid;
        grid-template-columns: 1fr;
        gap: clamp(2rem, 5vw, 4rem);
        align-items: center;
        border-top: 1px solid var(--doc-line);
        padding: clamp(3.5rem, 8vw, 6rem) clamp(1.5rem, 6vw, 7rem) clamp(4rem, 9vw, 7rem);
    }
    @media (min-width: 900px) { .doc-ab__who { grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); } }
    .doc-ab__who-text { max-width: 36rem; }
    .doc-ab__who-figure { margin: 0; }
    .doc-ab__who-figure img {
        width: 100%;
        height: auto;
        display: block;
        border: 1px solid var(--doc-line);
        filter: grayscale(0.4) contrast(1.05) brightness(0.92);
        transition: filter 0.6s ease;
    }
    .doc-ab__who-figure img:hover { filter: grayscale(0) contrast(1.02) brightness(1); }

    /* Buttons */
    .doc-ab__btn {
        display: inline-flex;
        align-items: center;
        gap: 0.6rem;
        margin-top: 2rem;
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
    .doc-ab__btn:hover { border-color: var(--doc-ember); color: var(--doc-ember-soft); }
    .doc-ab__btn svg { width: 1rem; height: 1rem; transition: transform 0.3s ease; }
    .doc-ab__btn:hover svg { transform: translateX(4px); }

    @media (prefers-reduced-motion: reduce) {
        .doc-ab :where(a, img, svg) { transition: none !important; }
    }
</style>
