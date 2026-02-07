 <!-- src/lib/components/TheTruth.svelte -->
<script>
    let { truth } = $props();
</script>

<section class="py-24 bg-[var(--color-cream)]">
    <div class="container mx-auto px-4 max-w-6xl">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <!-- Content Column -->
            <div>
                <span class="eyebrow">Core Doctrine</span>
                <h2 class="font-display text-4xl md:text-5xl text-[var(--color-ink)] mb-8">
                    {truth.title}
                </h2>
                
                <!-- Question as Pull Quote -->
                <blockquote class="pull-quote mb-8">
                    {truth.question}
                </blockquote>
                
                <!-- Points List -->
                <ul class="list-numbered mb-10">
                    {#each truth.points as point}
                        <li class="font-body text-[var(--color-graphite)]">
                            {point}
                        </li>
                    {/each}
                </ul>
                
                <!-- CTA -->
                <a href={truth.cta.href} class="btn-editorial btn-editorial-accent">
                    {truth.cta.label}
                </a>
            </div>
            
            <!-- Image Column -->
            <div class="relative">
                <div class="relative overflow-hidden bg-[var(--color-paper)] p-8">
                    <img 
                        src={truth.image.src} 
                        alt={truth.image.alt} 
                        class="w-full h-auto img-editorial"
                    >
                </div>
                <!-- Decorative Frame -->
                <div class="absolute -bottom-4 -right-4 w-full h-full border-2 border-[var(--color-accent)] -z-10"></div>
            </div>
        </div>
    </div>
</section>
