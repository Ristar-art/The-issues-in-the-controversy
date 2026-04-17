<!-- src/routes/Progress.svelte -->
<script>
    let { progress } = $props();
    const images = progress?.images ?? [];
    const labels = progress?.labels ?? [
        { era: '∞ B.C.', tag: 'Heaven', title: 'The Morning Star', body: 'A high-ranking sovereign cabinet member initiates the first breach of protocol.' },
        { era: '4000 B.C.', tag: 'Earth', title: 'Eden Protocol', body: 'The signal is intercepted on a pristine node. The rebellion is seeded in human code.' },
        { era: '1400 B.C.', tag: 'Sinai', title: 'The Sinai Code', body: 'The moral constitution is transmitted in plain text for the first time.' },
        { era: '538 A.D.', tag: 'Empire', title: 'The Inversion', body: 'An institutional overlay rewrites the sovereign code in the margins of history.' },
        { era: 'Now', tag: 'Delay', title: 'The Delay', body: 'Final arguments. The verdict is returned. The archive is closed.' },
    ];

    const entries = images.length
        ? images.map((img, i) => ({
            era: labels[i]?.era ?? String(i + 1).padStart(2, '0'),
            tag: labels[i]?.tag ?? `Phase ${i + 1}`,
            title: img.title ?? labels[i]?.title ?? img.alt ?? `Phase ${i + 1}`,
            body: img.description ?? labels[i]?.body ?? '',
            src: img.src,
            alt: img.alt ?? ''
        }))
        : labels.map((l) => ({ ...l, src: null, alt: '' }));
</script>

<section class="py-24 md:py-32 bg-[var(--c-bg)] border-t border-[var(--c-border)]">
    <div class="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-12">
        <div class="flex items-end justify-between gap-6 flex-wrap">
            <div>
                <p class="eyebrow-dim mb-3">Chronological Transmission</p>
                <h2 class="font-display text-3xl md:text-5xl text-[var(--c-fg)]">
                    {progress?.title ?? 'Historical Timeline'}
                </h2>
            </div>
            <div class="hidden md:flex items-center gap-3 font-mono-editorial text-xs tracking-[0.25em] text-[var(--c-fg-dim)]">
                <span>DRAG</span>
                <span class="w-16 h-px bg-[var(--c-border-strong)]"></span>
                <span>SCROLL</span>
            </div>
        </div>
        <div class="mt-6 h-[2px] w-24 bg-[var(--c-teal)]"></div>
    </div>

    <div class="hscroll pb-8">
        <ol class="flex gap-0 px-6 md:px-12 lg:px-24 snap-x">
            {#each entries as e, i}
                <li class="snap-start flex-none w-[320px] md:w-[400px] border-r border-[var(--c-border)] last:border-r-0">
                    <div class="px-8 py-10 h-full">
                        <div class="font-display text-5xl md:text-6xl text-[var(--c-teal)] leading-none mb-10">
                            {String(i + 1).padStart(2, '0')}
                        </div>
                        <p class="font-mono-editorial text-xs tracking-[0.25em] text-[var(--c-fg-dim)] uppercase mb-2">
                            {e.era} · {e.tag}
                        </p>
                        <h3 class="font-display text-xl md:text-2xl text-[var(--c-fg)] mb-4">
                            {e.title}
                        </h3>
                        {#if e.body}
                            <p class="font-body text-sm text-[var(--c-fg-muted)] leading-relaxed">
                                {e.body}
                            </p>
                        {/if}
                        {#if e.src}
                            <div class="mt-6 overflow-hidden">
                                <img src={e.src} alt={e.alt} class="w-full h-40 object-cover img-dark" loading="lazy" />
                            </div>
                        {/if}
                    </div>
                </li>
            {/each}
        </ol>
    </div>
</section>
