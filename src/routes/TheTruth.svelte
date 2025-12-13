 <!-- src/lib/components/TheTruth.svelte -->
<script>
    let { truth } = $props();
</script>

<section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4">
        <div class="flex flex-wrap items-center">
            <div class="w-full lg:w-1/2 mb-12 lg:mb-0">
                <h2 class="text-3xl font-bold text-teal mb-6">{truth.title}</h2>
                <p class="text-gray-600 mb-8">{truth.question}</p>
                
                <div class="space-y-4">
                    {#each truth.points as point}
                        <div class="flex items-center">
                            <div class="bg-green-100 p-2 rounded-full mr-3">
                                <i class="fas fa-check text-green-600"></i>
                            </div>
                            <span>{point}</span>
                        </div>
                    {/each}
                    <a href={truth.cta.href} class="btn">{truth.cta.label}</a>

                </div>
                
            </div>
            <div class="w-auto h-22rem lg:w-1/2">
                <img src={truth.image.src} alt={truth.image.alt} class="w-auto h-16rem">
            </div>
        </div>
    </div>
</section>
