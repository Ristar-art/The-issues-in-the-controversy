<!--  src/lib/components/Progress.svelte -->
<script>
    let { progress } = $props();
</script>

<section class="py-24 bg-[var(--color-cream)]">
    <div class="container mx-auto px-4 max-w-6xl">
        <!-- Section Header -->
        <div class="mb-16 max-w-3xl">
            <span class="eyebrow">Historical Timeline</span>
            <h2 class="font-display text-4xl md:text-5xl text-[var(--color-ink)] mb-6">{progress.title}</h2>
            <div class="section-divider"></div>
        </div>
        
        <!-- Timeline Images -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            {#each progress.images as image, index}
                <figure class="group">
                    <div class="overflow-hidden bg-[var(--color-paper)]">
                        <img 
                            src={image.src} 
                            alt={image.alt} 
                            class="w-full h-80 object-cover img-editorial transform group-hover:scale-105 transition-transform duration-700"
                        >
                    </div>
                    <figcaption class="mt-4 flex items-center">
                        <span class="font-display text-3xl text-[var(--color-pearl)] mr-4">
                            {String(index + 1).padStart(2, '0')}
                        </span>
                        <span class="font-body text-sm text-[var(--color-warm-gray)] uppercase tracking-wider">
                            Timeline Phase {index + 1}
                        </span>
                    </figcaption>
                </figure>
            {/each}
        </div>
        
        <!-- CTA -->
        <!-- <div class="mt-16 text-center">
            <a href={progress.cta.href} class="btn-editorial">
                {progress.cta.label}
            </a>
        </div> -->
    </div>
</section>
