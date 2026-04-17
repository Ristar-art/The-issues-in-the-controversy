<!-- src/routes/KeyTopics.svelte -->
<script>
    let { keyTopics } = $props();
    const items = keyTopics?.items ?? [];
    const feature = items[0];
    const rest = items.slice(1, 5);
</script>

<section class="py-24 md:py-32 bg-[var(--c-bg)] border-t border-[var(--c-border)]" id="topics">
    <div class="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <!-- Section Header -->
        <div class="grid md:grid-cols-12 gap-8 mb-16 border-l border-[var(--c-border)] pl-6 md:pl-10">
            <div class="md:col-span-6">
                <p class="eyebrow-dim mb-3">The Investigation</p>
                <h2 class="font-display text-4xl md:text-5xl lg:text-6xl text-[var(--c-fg)]">
                    {keyTopics?.title ?? 'Key Topics'}
                </h2>
            </div>
            <div class="md:col-span-6 md:col-start-8 flex items-end">
                <p class="font-body text-[var(--c-fg-muted)] leading-relaxed">
                    {keyTopics?.subtitle ?? 'Six foundational dossiers on the structure of the Great Controversy — each a door to a deeper reading of the record.'}
                </p>
            </div>
        </div>

        <!-- Bento Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Feature (large) -->
            {#if feature}
                <a
                    href={feature.href ?? '/topics'}
                    class="group relative block h-[420px] md:h-[540px] lg:h-[600px] overflow-hidden card-dark"
                >
                    {#if feature.image?.src}
                        <img
                            src={feature.image.src}
                            alt={feature.image.alt ?? feature.title}
                            class="absolute inset-0 w-full h-full object-cover img-dark group-hover:scale-105 transition-transform duration-700"
                        />
                    {/if}
                    <div class="absolute inset-0 bg-gradient-to-t from-[var(--c-void)] via-[var(--c-void)]/50 to-transparent"></div>

                    <div class="relative z-10 h-full flex flex-col justify-end p-8 md:p-12">
                        <p class="eyebrow-dark mb-3">Archive 01</p>
                        <h3 class="font-display text-3xl md:text-4xl text-[var(--c-fg)] mb-4 group-hover:text-[var(--c-teal)] transition-colors">
                            {feature.title}
                        </h3>
                        <p class="font-body text-[var(--c-fg-muted)] leading-relaxed max-w-md mb-6">
                            {feature.description}
                        </p>
                        <span class="link-dark">
                            Read dossier
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                            </svg>
                        </span>
                    </div>
                </a>
            {/if}

            <!-- Secondary grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {#each rest as topic, index}
                    <a
                        href={topic.href ?? '/topics'}
                        class="group card-dark p-6 md:p-8 flex flex-col justify-between min-h-[240px] md:min-h-[260px]"
                    >
                        <div class="flex items-start justify-between mb-8">
                            <span class="font-mono-editorial text-xs tracking-[0.25em] text-[var(--c-teal)]">
                                0{index + 2}
                            </span>
                            <svg class="w-5 h-5 text-[var(--c-fg-dim)] group-hover:text-[var(--c-teal)] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 17l9.2-9.2M17 17V7H7" />
                            </svg>
                        </div>
                        <div>
                            <h3 class="font-display text-xl md:text-2xl text-[var(--c-fg)] mb-3 uppercase tracking-tight group-hover:text-[var(--c-teal)] transition-colors leading-tight">
                                {topic.title}
                            </h3>
                            <p class="font-body text-sm text-[var(--c-fg-muted)] leading-relaxed">
                                {topic.description}
                            </p>
                        </div>
                    </a>
                {/each}
            </div>
        </div>
    </div>
</section>
