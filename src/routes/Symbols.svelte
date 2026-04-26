<!-- src/routes/Symbols.svelte — Deciphering the Code -->
<script>
    let { symbols } = $props();
    const items = symbols?.items ?? [];
    const title = symbols?.titleLine1 || symbols?.titleLine2
        ? `${symbols?.titleLine1 ?? ''} ${symbols?.titleLine2 ?? ''}`.trim()
        : 'Deciphering the Code';

    function iconFor(item) {
        if (item?.icon) return item.icon;
        const t = (item?.title ?? '').toLowerCase();
        if (t.includes('beast')) return 'pets';
        if (t.includes('woman') || t.includes('women')) return 'woman_2';
        if (t.includes('water') && t.includes('earth')) return 'public';
        if (t.includes('water')) return 'water_drop';
        if (t.includes('earth')) return 'public';
        if (t.includes('wind')) return 'air';
        if (t.includes('horn') || t.includes('king')) return 'crown';
        if (t.includes('fire')) return 'local_fire_department';
        if (t.includes('star')) return 'star';
        return 'auto_awesome';
    }
</script>

<section class="px-6 md:px-12 py-24 md:py-32 bg-[var(--ea-surface)]">
    <div class="max-w-4xl mx-auto">
        <div class="text-center mb-20 md:mb-24">
            <h2 class="font-headline text-5xl md:text-6xl text-[var(--ea-primary)] mb-6 leading-tight">{title}</h2>
            <p class="font-body text-[var(--ea-on-surface-variant)]">
                {symbols?.description ?? 'Unlocking the prophetic lexicon through textual evidence.'}
            </p>
        </div>

        <div class="space-y-8">
            {#each items as item}
                <div class="flex items-start gap-8 md:gap-12 p-6 md:p-8 hover:bg-[var(--ea-surface-low)] transition-colors rounded-xl">
                    <span
                        class="material-symbols-outlined text-[var(--ea-primary)] mt-1 flex-none"
                        style="font-size: 2.25rem; font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;"
                        aria-hidden="true"
                    >{iconFor(item)}</span>
                    <div>
                        <h4 class="font-headline text-2xl md:text-3xl text-[var(--ea-primary)] mb-2 leading-tight">{item.title}</h4>
                        <p class="font-body text-[var(--ea-on-surface-variant)] leading-relaxed">{item.description}</p>
                    </div>
                </div>
            {/each}
        </div>

        {#if symbols?.cta?.href}
            <div class="text-center mt-16">
                <a href={`/${symbols.cta.href}`} class="ea-btn-ghost">
                    {symbols.cta.label ?? 'View More'}
                </a>
            </div>
        {/if}
    </div>
</section>
