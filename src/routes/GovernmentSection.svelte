<!-- src/routes/GovernmentSection.svelte — Governing the Soul -->
<script>
    let { government } = $props();
    const items = government?.items ?? [];

    const iconPaths = [
        'M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z',
        'M15 21a6 6 0 00-9-5.197m13.5-9A2.25 2.25 0 1118 8.25a2.25 2.25 0 011.5-2.25zm0 0V4.5A2.25 2.25 0 0017.25 2.25H6.75A2.25 2.25 0 004.5 4.5v1.5m15 0v12a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 18V6m15 0H4.5',
        'M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z'
    ];
</script>

<section class="px-6 md:px-12 py-20 md:py-24 bg-[var(--ea-tertiary)] text-white">
    <div class="mb-12 md:mb-16 max-w-3xl">
        <h2 class="font-headline text-3xl md:text-4xl text-white leading-tight">
            {government?.title ?? 'Governing the Soul'}
        </h2>
        <div class="h-1 w-20 bg-[var(--ea-secondary)] mt-4"></div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {#each items as item, index}
            <article class="bg-[var(--ea-tertiary-container)] p-10 md:p-12 rounded-lg border border-white/5 flex flex-col">
                <svg class="w-9 h-9 text-[var(--ea-secondary-fixed)] mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.4" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d={iconPaths[index % iconPaths.length]} />
                </svg>
                <h3 class="font-headline text-2xl md:text-3xl text-white mb-4 leading-tight">{item.title}</h3>
                <p class="font-body text-[var(--ea-on-tertiary-container)] text-sm leading-relaxed">{item.description}</p>
            </article>
        {/each}
    </div>
</section>
