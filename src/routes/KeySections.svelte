<!-- src/routes/KeySections.svelte — The Framework -->
<script>
    let { keySections } = $props();
    const items = keySections?.items ?? [];
    const phases = ['Phase 01 · Analysis', 'Phase 02 · Intervention', 'Phase 03 · Activation'];
    const icons = [
        'M12 9v4m0 4h.01M4.93 19h14.14a2 2 0 001.74-3l-7.07-12a2 2 0 00-3.48 0L3.19 16a2 2 0 001.74 3z',
        'M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z',
        'M5 13l4 4L19 7'
    ];
</script>

<section class="py-24 md:py-32 bg-[var(--c-bg)] border-t border-[var(--c-border)]">
    <div class="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <!-- Header -->
        <div class="text-center max-w-3xl mx-auto mb-16">
            <p class="eyebrow-dim mb-4">The Framework</p>
            <h2 class="font-display text-3xl md:text-5xl text-[var(--c-fg)] mb-4">
                {keySections?.title ?? 'The Issue, The Remedy, Our Part'}
            </h2>
            <div class="section-divider-dark mx-auto"></div>
        </div>

        <!-- Phase Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 border border-[var(--c-border)]">
            {#each items.slice(0, 3) as section, index}
                <article class="group relative p-8 md:p-12 border-b md:border-b-0 md:border-r last:border-r-0 last:border-b-0 border-[var(--c-border)] hover:bg-[var(--c-surface)] transition-colors">
                    <p class="eyebrow-dark mb-6">
                        {phases[index] ?? `Phase 0${index + 1}`}
                    </p>

                    <h3 class="font-display text-2xl md:text-3xl text-[var(--c-fg)] mb-6 uppercase tracking-tight">
                        {section.title}
                    </h3>

                    <p class="font-body text-[var(--c-fg-muted)] leading-relaxed mb-10">
                        {section.description}
                    </p>

                    <svg class="w-10 h-10 text-[var(--c-teal-dim)] group-hover:text-[var(--c-teal)] transition-colors mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d={icons[index] ?? icons[0]} />
                    </svg>

                    {#if section.cta?.href}
                        <a href={section.cta.href} class="link-dark">
                            {section.cta.label ?? 'Read more'}
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                            </svg>
                        </a>
                    {/if}

                    <!-- Phase index corner -->
                    <span class="absolute top-6 right-6 font-mono-editorial text-xs tracking-[0.25em] text-[var(--c-fg-dim)]">
                        / {String(index + 1).padStart(2, '0')}
                    </span>
                </article>
            {/each}
        </div>
    </div>
</section>
