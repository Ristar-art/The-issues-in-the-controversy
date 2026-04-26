<!-- src/routes/Progress.svelte — Historical Timeline (Editorial Architect) -->
<script>
    let { progress } = $props();
    const images = progress?.images ?? [];
    const labels = progress?.labels ?? [
        { era: '605 BC', title: 'The Lion of Babylon', body: 'The emergence of centralized power and the head of gold in the prophetic vision.' },
        { era: '1446 BC', title: 'The Exodus', body: 'A template for liberation and the establishment of a theocratic covenant.' },
        { era: '331 BC', title: 'The Hellenistic Surge', body: 'The leopard of Daniel 7 and the rapid expansion of humanistic philosophy.' },
        { era: '538 AD', title: 'The Inversion', body: 'An institutional overlay rewrites the sovereign code in the margins of history.' },
        { era: 'Now', title: 'The Delay', body: 'Final arguments. The verdict is returned. The archive is closed.' }
    ];

    const entries = images.length
        ? images.map((img, i) => ({
            era: labels[i]?.era ?? `Phase ${i + 1}`,
            title: img.title ?? labels[i]?.title ?? img.alt ?? `Phase ${i + 1}`,
            body: img.description ?? labels[i]?.body ?? '',
            src: img.src,
            alt: img.alt ?? ''
        }))
        : labels.map((l) => ({ ...l, src: null, alt: '' }));

    let scroller;
    function scrollBy(dx) {
        if (scroller) scroller.scrollBy({ left: dx, behavior: 'smooth' });
    }
</script>

<section class="py-20 md:py-24 bg-[var(--ea-surface-low)]">
    <div class="px-6 md:px-12 mb-12 md:mb-16 flex items-end justify-between gap-4 flex-wrap">
        <div>
            <h2 class="font-headline text-4xl md:text-5xl text-[var(--ea-primary)] mb-2 leading-tight">
                {progress?.title ?? 'Historical Timeline'}
            </h2>
            <p class="ea-eyebrow">The Arc of Human Agency</p>
        </div>
        <div class="flex gap-4">
            <button
                type="button"
                class="w-12 h-12 rounded-full border border-[var(--ea-outline-variant)] flex items-center justify-center hover:bg-[var(--ea-surface)] transition-colors"
                aria-label="Scroll timeline left"
                onclick={() => scrollBy(-420)}
            >
                <svg class="w-5 h-5 text-[var(--ea-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button
                type="button"
                class="w-12 h-12 rounded-full border border-[var(--ea-outline-variant)] flex items-center justify-center hover:bg-[var(--ea-surface)] transition-colors"
                aria-label="Scroll timeline right"
                onclick={() => scrollBy(420)}
            >
                <svg class="w-5 h-5 text-[var(--ea-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    </div>

    <div bind:this={scroller} class="hscroll no-scrollbar flex gap-6 md:gap-8 px-6 md:px-12 pb-8">
        {#each entries as e}
            <article class="snap-start flex-none w-[300px] md:w-[400px] bg-[var(--ea-surface-lowest)] p-6 md:p-8 shadow-sm rounded-md group">
                {#if e.src}
                    <div class="h-56 md:h-64 overflow-hidden mb-6 rounded-lg">
                        <img
                            src={e.src}
                            alt={e.alt}
                            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            loading="lazy"
                        />
                    </div>
                {/if}
                <div class="flex items-center gap-4 mb-4">
                    <span class="ea-chip">{e.era}</span>
                    <span class="h-px flex-1 bg-[var(--ea-outline-variant)]/50"></span>
                </div>
                <h4 class="font-headline text-2xl md:text-3xl text-[var(--ea-primary)] mb-4 leading-tight">{e.title}</h4>
                <p class="font-body text-[var(--ea-on-surface-variant)] text-sm leading-relaxed">{e.body}</p>
            </article>
        {/each}
    </div>
</section>
