<!--  src/lib/components/Symbols.svelte -->
<script>
    let { symbols } = $props();
</script>

<section class="py-16 bg-white">
    <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center text-teal mb-2">{symbols.titleLine1}</h2>
        <h2 class="text-3xl font-bold text-center text-teal mb-12">{symbols.titleLine2}</h2>
        
        <div class="flex flex-wrap justify-center">
            {#each symbols.items as item}
                <div class="w-full md:w-1/3 px-4 mb-8">
                    <div class="teal-dark rounded-lg overflow-hidden text-center">
                        <img src={item.image.src} alt={item.image.alt} class="w-full h-64 object-cover">
                        <div class="p-4">
                            <h3 class="text-xl font-bold mb-1">{item.title}</h3>
                            <p class="text-gray-300 mb-4">{item.description}</p>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
        <div class="text-center mt-10">
            <button class="btn">{symbols.cta.label}</button>
        </div>
    </div>
</section>
