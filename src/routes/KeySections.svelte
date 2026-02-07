 <!-- src/lib/components/KeySections.svelte -->
<script>
    let { keySections } = $props();
</script>

<section class="py-24 bg-[var(--color-cream)]">
    <div class="container mx-auto px-4 max-w-6xl">
        <!-- Section Header -->
        <div class="mb-16 max-w-3xl">
            <span class="eyebrow">Essential Reading</span>
            <h2 class="font-display text-4xl md:text-5xl text-[var(--color-ink)] mb-6">{keySections.title}</h2>
            <div class="section-divider"></div>
        </div>
        
        <!-- Key Sections Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            {#each keySections.items as section, index}
                <article class="group bg-[var(--color-paper)] p-8 card-editorial">
                    <!-- Section Number -->
                    <div class="flex items-center justify-between mb-6">
                        <span class="font-display text-4xl text-[var(--color-pearl)] group-hover:text-[var(--color-accent)] transition-colors duration-300">
                            {String(index + 1).padStart(2, '0')}
                        </span>
                        <svg class="w-6 h-6 text-[var(--color-silver)] group-hover:text-[var(--color-accent)] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                        </svg>
                    </div>
                    
                    <!-- Content -->
                    <h3 class="font-headline text-2xl text-[var(--color-ink)] mb-4 group-hover:text-[var(--color-accent)] transition-colors duration-300">
                        {section.title}
                    </h3>
                    <p class="font-body text-[var(--color-stone)] leading-relaxed mb-6">
                        {section.description}
                    </p>
                    
                    <!-- CTA -->
                    <a href={section.cta.href} class="link-editorial inline-flex items-center text-sm">
                        {section.cta.label}
                        <svg class="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                        </svg>
                    </a>
                </article>
            {/each}
        </div>
    </div>
</section>
