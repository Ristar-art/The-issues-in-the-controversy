<!--  src/lib/components/Symbols.svelte -->
<script>
    let { symbols } = $props();
</script>

<section class="py-24 bg-white">
    <div class="container mx-auto px-4 max-w-6xl">
        <!-- Section Header -->
        <div class="mb-16 max-w-3xl">
            <span class="eyebrow">Visual Language</span>
            <h2 class="font-display text-4xl md:text-5xl text-[var(--color-ink)] mb-4">
                {symbols.titleLine1}
            </h2>
            <h2 class="font-display text-4xl md:text-5xl text-[var(--color-ink)] italic">
                {symbols.titleLine2}
            </h2>
            <div class="section-divider mt-6"></div>
        </div>
        
        <!-- Symbols Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
            {#each symbols.items as item, index}
                <article class="group text-center">
                    <!-- Symbol Number -->
                    <span class="font-display text-6xl text-[var(--color-pearl)] group-hover:text-[var(--color-accent)] transition-colors duration-300">
                        {String(index + 1).padStart(2, '0')}
                    </span>
                    
                    <!-- Image Container -->
                    <div class="my-8 overflow-hidden">
                        <img 
                            src={item.image.src} 
                            alt={item.image.alt} 
                            class="w-48 h-48 object-contain mx-auto img-editorial transform group-hover:scale-110 transition-transform duration-500"
                        >
                    </div>
                    
                    <!-- Content -->
                    <h3 class="font-headline text-2xl text-[var(--color-ink)] mb-2">
                        {item.title}
                    </h3>
                    <p class="font-body text-[var(--color-stone)] italic">
                        {item.description}
                    </p>
                    
                    <!-- Bottom Accent Line -->
                    <div class="mt-6 mx-auto w-12 h-px bg-[var(--color-pearl)] group-hover:w-24 group-hover:bg-[var(--color-accent)] transition-all duration-300"></div>
                </article>
            {/each}
        </div>
        
        <!-- CTA -->
        <div class="mt-20 text-center">
            <a href={symbols.cta.href} class="btn-editorial">
                {symbols.cta.label}
            </a>
        </div>
    </div>
</section>
