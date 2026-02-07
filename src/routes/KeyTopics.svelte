<!-- src/lib/components/KeyTopics.svelte -->
<script>
    let { keyTopics } = $props();
</script>

<section class="py-24 bg-white" id="topics">
    <div class="container mx-auto px-4 max-w-6xl">
        <!-- Section Header -->
        <div class="mb-16">
            <span class="eyebrow">Study Areas</span>
            <h2 class="font-display text-4xl md:text-5xl text-[var(--color-ink)] mb-6">{keyTopics.title}</h2>
            <div class="section-divider"></div>
        </div>
        
        <!-- Topics Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            {#each keyTopics.items as topic, index}
                <article class="group">
                    <!-- Topic Number -->
                    <span class="font-display text-5xl text-[var(--color-pearl)] group-hover:text-[var(--color-accent)] transition-colors duration-300">
                        {String(index + 1).padStart(2, '0')}
                    </span>
                    
                    <!-- Content -->
                    <div class="mt-4">
                        <h3 class="font-headline text-2xl text-[var(--color-ink)] mb-3 group-hover:text-[var(--color-accent)] transition-colors duration-300">
                            {topic.title}
                        </h3>
                        <p class="font-body text-[var(--color-stone)] leading-relaxed mb-4">
                            {topic.description}
                        </p>
                        <a href={topic.href} class="link-editorial inline-flex items-center text-sm">
                            Read more
                            <svg class="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                            </svg>
                        </a>
                    </div>
                    
                    <!-- Bottom Border -->
                    <div class="mt-6 h-px bg-[var(--color-pearl)] group-hover:bg-[var(--color-accent)] transition-colors duration-300"></div>
                </article>
            {/each}
        </div>
    </div>
</section>
