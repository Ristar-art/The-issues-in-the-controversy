<script>
    /**
     * The affordance for a cropped hero: a hint that the image continues past
     * its frame, and a viewer that shows the whole of it, uncropped.
     *
     * Drop it inside a positioned hero element. On pointer devices the hint
     * stays hidden until the hero is hovered, which each hero opts into with
     * one rule of its own — the hover belongs to the hero, not to this button:
     *
     *     .my-hero:hover :global(.hero-expand__hint) { opacity: 1; transform: none; }
     *
     * Where there is no hover — touch — the hint is simply always visible.
     */
    let { src, alt = '', caption = '' } = $props();

    let open = $state(false);
    /** @type {HTMLButtonElement | undefined} */
    let hintEl = $state();
    /** @type {HTMLButtonElement | undefined} */
    let closeEl = $state();

    function show() { open = true; }
    function hide() { open = false; }

    /** @param {KeyboardEvent} event */
    function onKeydown(event) {
        if (!open) return;
        if (event.key === 'Escape') {
            event.preventDefault();
            hide();
        }
    }

    // The page behind must not scroll while the viewer is up, and focus has to
    // travel into the viewer and back out to where it came from.
    $effect(() => {
        if (!open) return;
        const previous = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        closeEl?.focus();
        return () => {
            document.body.style.overflow = previous;
            hintEl?.focus();
        };
    });
</script>

<svelte:window onkeydown={onKeydown} />

<button
    bind:this={hintEl}
    type="button"
    class="hero-expand__hint"
    onclick={show}
    aria-haspopup="dialog"
>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7" d="M15 3h6m0 0v6m0-6l-7 7M9 21H3m0 0v-6m0 6l7-7" />
    </svg>
    View full image
</button>

{#if open}
    <div
        class="hero-expand__overlay"
        role="dialog"
        aria-modal="true"
        aria-label={alt ? `Full image: ${alt}` : 'Full image'}
    >
        <!-- Dismissal by clicking away, as its own element rather than a
             handler on the dialog: the close button below carries the same
             action for the keyboard, so this stays out of the tab order. -->
        <button class="hero-expand__backdrop" onclick={hide} tabindex="-1" aria-hidden="true"></button>

        <button bind:this={closeEl} type="button" class="hero-expand__close" onclick={hide} aria-label="Close full image">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>

        <figure class="hero-expand__figure">
            <!-- contain, never cover: the point of the viewer is that nothing
                 is cut off, whatever the shape of the image or the window. -->
            <img class="hero-expand__full" {src} {alt} />
            {#if caption}
                <figcaption class="hero-expand__caption">{caption}</figcaption>
            {/if}
        </figure>
    </div>
{/if}

<style>
    .hero-expand__hint {
        position: absolute;
        right: clamp(1rem, 3vw, 2rem);
        bottom: clamp(1rem, 3vw, 2rem);
        z-index: 3;
        display: inline-flex;
        align-items: center;
        gap: 0.55rem;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: #f1ebe0;
        background: rgba(11, 11, 13, 0.62);
        border: 1px solid rgba(241, 235, 224, 0.28);
        border-radius: 2px;
        padding: 0.65rem 0.95rem;
        cursor: pointer;
        backdrop-filter: blur(6px);
        -webkit-backdrop-filter: blur(6px);
        transition: opacity 0.35s ease, transform 0.35s ease, border-color 0.3s ease, background 0.3s ease;
    }
    .hero-expand__hint svg { width: 0.95rem; height: 0.95rem; }
    .hero-expand__hint:hover {
        border-color: var(--doc-ember, #d97a43);
        background: rgba(11, 11, 13, 0.8);
    }

    /* Touch has no hover, so the hint stands permanently. Only where a real
       pointer exists does it wait to be invited. */
    @media (hover: hover) and (pointer: fine) {
        .hero-expand__hint { opacity: 0; transform: translateY(8px); }
        /* Keyboard users never hover — focus must reveal it too. */
        .hero-expand__hint:focus-visible { opacity: 1; transform: none; }
    }

    /* ------------------------------ Viewer ------------------------------ */
    .hero-expand__overlay {
        position: fixed;
        inset: 0;
        z-index: 200;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: clamp(1.5rem, 5vw, 4rem);
        background: rgba(6, 6, 8, 0.94);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        animation: heroExpandIn 0.22s ease-out;
    }
    @keyframes heroExpandIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    .hero-expand__backdrop {
        position: absolute;
        inset: 0;
        background: none;
        border: none;
        padding: 0;
        cursor: zoom-out;
    }

    .hero-expand__figure {
        position: relative;
        margin: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        max-width: 100%;
        max-height: 100%;
    }
    .hero-expand__full {
        display: block;
        max-width: 100%;
        /* Leaves room for the caption without the image ever overflowing. */
        max-height: calc(100vh - 9rem);
        width: auto;
        height: auto;
        object-fit: contain;
        border: 1px solid rgba(241, 235, 224, 0.14);
    }
    .hero-expand__caption {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: rgba(241, 235, 224, 0.6);
        text-align: center;
        margin: 0;
        max-width: 44rem;
    }

    .hero-expand__close {
        position: absolute;
        top: clamp(1rem, 3vw, 2rem);
        right: clamp(1rem, 3vw, 2rem);
        width: 2.75rem;
        height: 2.75rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        border: 1px solid rgba(241, 235, 224, 0.24);
        background: transparent;
        color: #f1ebe0;
        cursor: pointer;
        transition: border-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
    }
    .hero-expand__close svg { width: 1.25rem; height: 1.25rem; }
    .hero-expand__close:hover {
        border-color: var(--doc-ember, #d97a43);
        color: var(--doc-ember-soft, #e3a376);
        transform: rotate(90deg);
    }

    @media (prefers-reduced-motion: reduce) {
        .hero-expand__hint,
        .hero-expand__close,
        .hero-expand__overlay { transition: none !important; animation: none !important; }
        .hero-expand__close:hover { transform: none; }
        @media (hover: hover) and (pointer: fine) {
            .hero-expand__hint { transform: none; }
        }
    }
</style>
