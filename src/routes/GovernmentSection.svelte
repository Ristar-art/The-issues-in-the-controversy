<!-- src/routes/GovernmentSection.svelte -->
<script>
    let { government } = $props();
    const items = government?.items ?? [];
</script>

<section class="py-24 md:py-32 bg-[var(--c-bg)] border-t border-[var(--c-border)]">
    <div class="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div class="mb-16 border-l border-[var(--c-teal)] pl-6 md:pl-10 max-w-3xl">
            <p class="eyebrow-dim mb-3">Systems of Order</p>
            <h2 class="font-display text-3xl md:text-5xl text-[var(--c-fg)]">
                {government?.title ?? 'Governing the Soul'}
            </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            {#each items as item, index}
                <article class="group card-dark overflow-hidden">
                    {#if item.image?.src}
                        <div class="relative aspect-[4/3] overflow-hidden">
                            <img
                                src={item.image.src}
                                alt={item.image.alt ?? item.title}
                                class="absolute inset-0 w-full h-full object-cover img-dark group-hover:scale-105 transition-transform duration-700"
                                loading="lazy"
                            />
                            <div class="absolute inset-0 bg-gradient-to-t from-[var(--c-void)] to-transparent"></div>
                            <span class="absolute top-4 left-4 font-mono-editorial text-xs tracking-[0.25em] text-[var(--c-teal)] uppercase">
                                0{index + 1}
                            </span>
                        </div>
                    {/if}
                    <div class="p-6 md:p-8 border-t border-[var(--c-border)]">
                        <h3 class="font-display text-xl md:text-2xl text-[var(--c-fg)] uppercase tracking-tight mb-3 group-hover:text-[var(--c-teal)] transition-colors">
                            {item.title}
                        </h3>
                        <p class="font-body text-sm text-[var(--c-fg-muted)] leading-relaxed">
                            {item.description}
                        </p>
                    </div>
                </article>
            {/each}
        </div>
    </div>
</section>
