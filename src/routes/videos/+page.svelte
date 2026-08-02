<script>
    import { onMount } from 'svelte';
    import { getVideoId, getThumbnailUrl, episodeLabel } from '$lib/data/videos.js';

    let { data } = $props();

    // Pulled from the YouTube playlist server-side; see $lib/server/youtube.js.
    const videos = $derived(data.videos ?? []);
    // Episode 01 headlines the page; the rest fill the grid below it.
    const featureVideo = $derived(videos[0] ?? null);
    const featureId = $derived(featureVideo ? getVideoId(featureVideo.embedUrl) : null);
    const restVideos = $derived(videos.slice(1));

    let selectedVideo = $state(null);
    let heroMuted = $state(true);
    let heroReady = $state(false);
    let stageEl = $state(null);
    let player = null;

    function openModal(video) {
        selectedVideo = video;
        // Don't leave two soundtracks competing.
        player?.pauseVideo?.();
    }
    function closeModal() {
        selectedVideo = null;
        player?.playVideo?.();
    }

    /**
     * Autoplay is only permitted while muted, so the hero starts silent and
     * stays that way until this runs off a real click — which also satisfies
     * the gesture requirement browsers put on unmuting.
     */
    function toggleSound() {
        if (!player) return;
        if (heroMuted) {
            player.unMute();
            player.setVolume(70);
            heroMuted = false;
        } else {
            player.mute();
            heroMuted = true;
        }
    }

    function onKeydown(e) {
        if (e.key === 'Escape') closeModal();
    }

    onMount(() => {
        let cancelled = false;
        // Autoplaying footage is motion; leave it paused if that's unwanted.
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        function createPlayer() {
            if (cancelled || !stageEl || !featureId) return;
            // The API swaps this node for an iframe, so it's created outside
            // Svelte's control — Svelte must not be tracking a node that
            // disappears from under it.
            const target = document.createElement('div');
            stageEl.appendChild(target);

            player = new window.YT.Player(target, {
                videoId: featureId,
                playerVars: {
                    autoplay: reduceMotion ? 0 : 1,
                    mute: 1,
                    controls: 0,
                    loop: 1,
                    playlist: featureId,
                    modestbranding: 1,
                    playsinline: 1,
                    rel: 0,
                    iv_load_policy: 3
                },
                events: {
                    onReady: (e) => {
                        e.target.mute();
                        if (!reduceMotion) e.target.playVideo();
                        heroReady = true;
                    }
                }
            });
        }

        if (window.YT?.Player) {
            createPlayer();
        } else {
            // The API invokes this global exactly once when it finishes loading.
            const previous = window.onYouTubeIframeAPIReady;
            window.onYouTubeIframeAPIReady = () => {
                previous?.();
                createPlayer();
            };
            if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
                const script = document.createElement('script');
                script.src = 'https://www.youtube.com/iframe_api';
                document.head.appendChild(script);
            }
        }

        return () => {
            cancelled = true;
            player?.destroy?.();
            player = null;
        };
    });

    const siteUrl = 'https://the-issues-in-the-controversy.vercel.app';
</script>

<svelte:window on:keydown={onKeydown} />

<svelte:head>
    <title>Videos — The Issues in the Controversy</title>
    <meta
        name="description"
        content="Every episode of The Endgame of Heaven — an immersive walkthrough of the prophecies of Daniel and Revelation, episode by episode."
    />
    <link rel="canonical" href={`${siteUrl}/videos`} />
</svelte:head>

<div class="doc-vid">
    <main>
        <!-- ======================================================== -->
        <!-- HERO — Episode 01 plays muted behind the title             -->
        <!-- ======================================================== -->
        <section class="doc-vid__hero">
            <!-- The poster sits underneath so there's no black gap while the
                 player boots, and it stands in entirely if YouTube is blocked. -->
            <div
                class="doc-vid__stage"
                class:is-ready={heroReady}
                bind:this={stageEl}
                style={featureId ? `background-image: url(${getThumbnailUrl(featureId)})` : undefined}
            ></div>
            <div class="doc-vid__heroscrim" aria-hidden="true"></div>

            <div class="doc-vid__herocontent">
                <!-- The footage carries the hero, so the page's heading is kept
                     for document structure and assistive tech only. -->
                <h1 class="doc-vid__srtitle">Videos</h1>

                <div class="doc-vid__herobar">
                    <button
                        type="button"
                        class="doc-vid__sound"
                        onclick={toggleSound}
                        disabled={!heroReady}
                        aria-pressed={!heroMuted}
                    >
                        {#if heroMuted}
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M11 5L6 9H2v6h4l5 4V5z" />
                                <path stroke-linecap="round" stroke-width="1.8" d="M22 9l-6 6M16 9l6 6" />
                            </svg>
                            Sound off
                        {:else}
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M11 5L6 9H2v6h4l5 4V5z" />
                                <path stroke-linecap="round" stroke-width="1.8" d="M15.5 8.5a5 5 0 010 7M18.5 5.5a9 9 0 010 13" />
                            </svg>
                            Sound on
                        {/if}
                    </button>
                    {#if featureVideo}
                        <span class="doc-tc doc-vid__nowplaying">
                            {episodeLabel(featureVideo)} · {featureVideo.title}
                        </span>
                    {/if}
                </div>
            </div>

            <div class="doc-vid__cue" aria-hidden="true">
                <span>Scroll</span>
                <span class="doc-vid__cueline"></span>
            </div>
        </section>

        <!-- ======================================================== -->
        <!-- EPISODE GRID                                               -->
        <!-- ======================================================== -->
        <section class="doc-vid__body">
            <header class="doc-vid__sectionhead">
                <h2 class="doc-vid__sectiontitle">The Rest of the Series</h2>
                <span class="doc-tc">
                    Series 01 · {videos.length} {videos.length === 1 ? 'Episode' : 'Episodes'}
                </span>
            </header>

            <div class="doc-vid__grid">
                {#each restVideos as video}
                    {@const id = getVideoId(video.embedUrl)}
                    <button
                        type="button"
                        class="doc-vid__card"
                        onclick={() => openModal(video)}
                        aria-label={`Play ${video.title}`}
                    >
                        <span class="doc-vid__thumb">
                            {#if id}
                                <img src={getThumbnailUrl(id)} alt="" loading="lazy" />
                            {/if}
                            <span class="doc-vid__veil" aria-hidden="true"></span>
                            <span class="doc-play" aria-hidden="true">
                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                            </span>
                        </span>
                        <span class="doc-vid__meta">
                            <span class="doc-tc">{episodeLabel(video)}</span>
                            <span class="doc-vid__name">{video.title}</span>
                        </span>
                    </button>
                {/each}
            </div>

            <div class="doc-vid__foot">
                <a href="/topics" class="doc-btn doc-btn--ghost">Browse Written Studies</a>
                <a href="/" class="doc-vid__home">Return Home</a>
            </div>
        </section>
    </main>

    <!-- ======================================================== -->
    <!-- PLAYER MODAL                                               -->
    <!-- ======================================================== -->
    {#if selectedVideo}
        <div class="doc-modal" role="dialog" aria-modal="true" aria-label={selectedVideo.title}>
            <button type="button" class="doc-modal__backdrop" aria-label="Close" onclick={closeModal}></button>
            <div class="doc-modal__inner">
                <button type="button" class="doc-modal__close" onclick={closeModal}>Close ✕</button>
                <div class="doc-modal__frame">
                    <iframe
                        src={`${selectedVideo.embedUrl}?autoplay=1`}
                        title={selectedVideo.title}
                        allow="autoplay; encrypted-media; picture-in-picture"
                        allowfullscreen
                    ></iframe>
                </div>
                <h2 class="doc-modal__title">{selectedVideo.title}</h2>
            </div>
        </div>
    {/if}
</div>

<style>
    /* Follows the documentary theme used by the landing and topics pages.
       Those pages scope their own doc-* classes, so the shared pieces are
       restated here rather than imported. */
    .doc-vid {
        --nav-h: 5.2rem;
        min-height: 100vh;
        background: var(--doc-bg);
        color: var(--doc-ink);
        padding-top: var(--nav-h);
        font-family: 'Public Sans', sans-serif;
        transition: background 0.4s ease, color 0.4s ease;
    }
    .doc-vid :where(h1, h2) {
        font-family: 'Newsreader', Georgia, serif;
        font-weight: 400;
        color: var(--doc-ink);
        letter-spacing: -0.018em;
        line-height: 1.02;
        margin: 0;
    }

    /* ---------- Hero ---------- */
    /* One height drives both the section and the player. At normal window
       shapes it resolves to the video's own 16:9, so nothing is cropped; the
       viewport and mobile bounds only take over at the extremes. */
    .doc-vid__hero {
        --hero-h: max(32rem, min(calc(100vw * 9 / 16), calc(100svh - var(--nav-h))));
        /* The hero sits on dark footage — pin the palette to the dark context
           so the overlay text stays legible in both themes, matching how the
           landing hero handles the same problem. */
        --doc-bg: #0b0b0d;
        --doc-ink: #f1ebe0;
        --doc-muted: #cfc7ba;
        --doc-dim: #9a9384;
        --doc-ember: #d97a43;
        --doc-ember-soft: #e7b083;
        --doc-line: rgba(241, 235, 224, 0.18);
        position: relative;
        height: var(--hero-h);
        display: flex;
        align-items: flex-end;
        overflow: hidden;
    }
    .doc-vid__stage {
        position: absolute;
        inset: 0;
        background-color: #000;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
    }
    /* The iframe is injected by the YouTube API, so it sits outside Svelte's
       style scoping. Sizing it from the same --hero-h keeps it exactly 16:9
       while still covering the box in both directions. */
    .doc-vid__stage :global(iframe) {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: max(100vw, calc(var(--hero-h) * 16 / 9));
        height: max(calc(100vw * 9 / 16), var(--hero-h));
        border: 0;
        /* Our own control handles sound; don't let the embed swallow clicks. */
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.8s ease;
    }
    .doc-vid__stage.is-ready :global(iframe) { opacity: 1; }

    .doc-vid__heroscrim {
        position: absolute;
        inset: 0;
        background:
            linear-gradient(to top, var(--doc-bg) 2%, rgba(11, 11, 13, 0.35) 45%, rgba(11, 11, 13, 0.6) 100%),
            radial-gradient(120% 100% at 15% 70%, rgba(11, 11, 13, 0.75), transparent 60%);
    }
    .doc-vid__herocontent {
        position: relative;
        z-index: 2;
        width: 100%;
        max-width: 64rem;
        padding: clamp(2.5rem, 6vw, 4.5rem) clamp(1.5rem, 6vw, 7rem);
    }

    .doc-vid__herobar {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 1.25rem;
    }
    .doc-vid__sound {
        display: inline-flex;
        align-items: center;
        gap: 0.6rem;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.6875rem;
        font-weight: 500;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: var(--doc-ink);
        background: rgba(11, 11, 13, 0.55);
        border: 1px solid var(--doc-line);
        border-radius: 999px;
        padding: 0.7rem 1.25rem;
        cursor: pointer;
        backdrop-filter: blur(6px);
        transition: border-color 0.3s ease, color 0.3s ease, background 0.3s ease;
    }
    .doc-vid__sound svg { width: 1rem; height: 1rem; }
    .doc-vid__sound:hover:not(:disabled) {
        border-color: var(--doc-ember);
        color: var(--doc-ember-soft);
    }
    .doc-vid__sound[aria-pressed='true'] {
        border-color: var(--doc-ember);
        color: var(--doc-ember);
    }
    .doc-vid__sound:disabled { opacity: 0.45; cursor: default; }
    .doc-vid__nowplaying { color: var(--doc-muted); }

    /* Scroll cue — matches the one on the landing hero. */
    .doc-vid__cue {
        position: absolute;
        bottom: clamp(40px, 9vh, 90px);
        left: 50%;
        transform: translateX(-50%);
        z-index: 3;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.6rem;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.6rem;
        letter-spacing: 0.3em;
        text-transform: uppercase;
        color: var(--doc-muted);
        pointer-events: none;
    }
    .doc-vid__cueline {
        width: 1px;
        height: 46px;
        background: linear-gradient(to bottom, var(--doc-ember), transparent);
        animation: docVidPulse 2.2s ease-in-out infinite;
    }
    @keyframes docVidPulse {
        0%, 100% { opacity: 0.35; }
        50% { opacity: 1; }
    }
    /* Below this the control bar spans the full width and would collide. */
    @media (max-width: 640px) {
        .doc-vid__cue { display: none; }
    }

    /* ---------- Section head ---------- */
    .doc-vid__sectionhead {
        display: flex;
        flex-wrap: wrap;
        align-items: baseline;
        justify-content: space-between;
        gap: 1rem;
        padding: clamp(3rem, 7vw, 5rem) 0 clamp(1.75rem, 3vw, 2.5rem);
    }
    .doc-vid__sectiontitle { font-size: clamp(1.75rem, 4vw, 2.75rem); }
    /* Kept in the accessibility tree, taken out of the visual layout. */
    .doc-vid__srtitle {
        position: absolute;
        width: 1px;
        height: 1px;
        margin: -1px;
        padding: 0;
        overflow: hidden;
        clip-path: inset(50%);
        white-space: nowrap;
        border: 0;
    }
    .doc-tc {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.6875rem;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: var(--doc-dim);
    }
    /* ---------- Grid ---------- */
    .doc-vid__body { padding: 0 clamp(1.5rem, 6vw, 7rem) clamp(4rem, 9vw, 8rem); }
    .doc-vid__grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(min(100%, 20rem), 1fr));
        gap: clamp(1.5rem, 3vw, 2.5rem);
    }

    .doc-vid__card {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 0;
        background: none;
        border: none;
        text-align: left;
        cursor: pointer;
        color: inherit;
        font: inherit;
    }
    .doc-vid__thumb {
        position: relative;
        display: block;
        aspect-ratio: 16 / 9;
        overflow: hidden;
        background: var(--doc-bg-2);
        border: 1px solid var(--doc-line);
        border-radius: 2px;
    }
    .doc-vid__thumb img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        filter: saturate(0.75) contrast(1.05) brightness(0.85);
        transition: transform 0.6s ease, filter 0.4s ease;
    }
    .doc-vid__veil {
        position: absolute;
        inset: 0;
        background: linear-gradient(to top, rgba(11, 11, 13, 0.55), transparent 60%);
    }
    .doc-play {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 3.4rem;
        height: 3.4rem;
        border-radius: 999px;
        background: var(--doc-ember);
        color: #160d07;
        transition: transform 0.3s ease, background 0.3s ease;
    }
    .doc-play svg { width: 1.4rem; height: 1.4rem; margin-left: 2px; }

    .doc-vid__card:hover .doc-vid__thumb img,
    .doc-vid__card:focus-visible .doc-vid__thumb img {
        transform: scale(1.05);
        filter: saturate(0.9) contrast(1.08) brightness(0.95);
    }
    .doc-vid__card:hover .doc-play,
    .doc-vid__card:focus-visible .doc-play {
        transform: translate(-50%, -50%) scale(1.1);
        background: var(--doc-ember-soft);
    }
    .doc-vid__card:focus-visible .doc-vid__thumb { outline: 2px solid var(--doc-ember); outline-offset: 3px; }
    .doc-vid__card:focus-visible { outline: none; }

    .doc-vid__meta { display: flex; flex-direction: column; gap: 0.5rem; }
    .doc-vid__name {
        font-family: 'Newsreader', Georgia, serif;
        font-size: 1.5rem;
        line-height: 1.2;
        color: var(--doc-ink);
        transition: color 0.3s ease;
    }
    .doc-vid__card:hover .doc-vid__name,
    .doc-vid__card:focus-visible .doc-vid__name { color: var(--doc-ember-soft); }

    /* ---------- Footer actions ---------- */
    .doc-vid__foot {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 1.5rem;
        margin-top: clamp(3rem, 6vw, 5rem);
        padding-top: 2rem;
        border-top: 1px solid var(--doc-line);
    }
    .doc-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.6rem;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.6875rem;
        font-weight: 500;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        text-decoration: none;
        padding: 1rem 1.6rem;
        border-radius: 2px;
        transition: transform 0.3s ease, background 0.3s ease, color 0.3s ease, border-color 0.3s ease;
    }
    .doc-btn--ghost { color: var(--doc-ink); border: 1px solid var(--doc-line); }
    .doc-btn--ghost:hover { border-color: var(--doc-ember); color: var(--doc-ember-soft); }
    .doc-vid__home {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.6875rem;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: var(--doc-muted);
        text-decoration: none;
        transition: color 0.3s ease;
    }
    .doc-vid__home:hover { color: var(--doc-ember-soft); }

    /* ---------- Modal ---------- */
    .doc-modal {
        position: fixed;
        inset: 0;
        z-index: 80;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1.5rem;
    }
    .doc-modal__backdrop {
        position: absolute;
        inset: 0;
        background: rgba(5, 5, 7, 0.94);
        backdrop-filter: blur(8px);
        border: none;
        cursor: pointer;
    }
    .doc-modal__inner { position: relative; z-index: 1; width: 100%; max-width: 64rem; }
    .doc-modal__close {
        background: none;
        border: none;
        cursor: pointer;
        color: var(--doc-muted);
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.6875rem;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        margin-bottom: 0.75rem;
        padding: 0;
    }
    .doc-modal__close:hover { color: var(--doc-ember); }
    .doc-modal__frame {
        aspect-ratio: 16 / 9;
        background: #000;
        overflow: hidden;
        border: 1px solid var(--doc-line);
    }
    .doc-modal__frame iframe { width: 100%; height: 100%; border: 0; }
    .doc-modal__title { margin-top: 1rem; font-size: 1.2rem; color: var(--doc-ink); }

    @media (prefers-reduced-motion: reduce) {
        .doc-vid__cueline { animation: none; opacity: 0.7; }
        .doc-vid__thumb img,
        .doc-play,
        .doc-vid__card:hover .doc-vid__thumb img,
        .doc-vid__card:hover .doc-play { transition: none; transform: none; }
        .doc-vid__card:hover .doc-play { transform: translate(-50%, -50%); }
    }
</style>
