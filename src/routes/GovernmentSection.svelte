 <!-- src/lib/components/GovernmentSection.svelte -->
<script>
    let { government } = $props();
</script>

<section class="py-24 bg-white">
    <div class="container mx-auto px-4 max-w-6xl">
        <!-- Section Header -->
        <div class="mb-16 max-w-3xl">
            <span class="eyebrow">Systems of Order</span>
            <h2 class="font-display text-4xl md:text-5xl text-[var(--color-ink)] mb-6">{government.title}</h2>
            <div class="section-divider"></div>
        </div>
        
        <!-- Government Types Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            {#each government.items as item, index}
                <article class="group">
                    <!-- Image -->
                    <div class="overflow-hidden mb-6">
                        <img 
                            src={item.image.src} 
                            alt={item.image.alt} 
                            class="w-full h-64 object-cover img-editorial transform group-hover:scale-105 transition-transform duration-700"
                        >
                    </div>
                    
                    <!-- Content -->
                    <div class="relative pl-6 border-l-2 border-[var(--color-pearl)] group-hover:border-[var(--color-accent)] transition-colors duration-300">
                        <span class="absolute -left-px top-0 w-2 h-8 bg-[var(--color-pearl)] group-hover:bg-[var(--color-accent)] transition-colors duration-300"></span>
                        <h3 class="font-headline text-2xl text-[var(--color-ink)] mb-3">
                            {item.title}
                        </h3>
                        <p class="font-body text-[var(--color-stone)] leading-relaxed">
                            {item.description}
                        </p>
                    </div>
                </article>
            {/each}
        </div>
    </div>
</section>
