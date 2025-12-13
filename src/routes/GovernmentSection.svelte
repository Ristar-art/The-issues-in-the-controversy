 <!-- src/lib/components/GovernmentSection.svelte -->
<script>
    let { government } = $props();
</script>

<section class="py-16 bg-white">
    <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-teal mb-12">{government.title}</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            {#each government.items as item}
                <div class="bg-white  overflow-hidden">
                    <img src={item.image.src} alt={item.image.alt} class="w-full h-48 object-cover">
                    <div class="p-6">
                        <h3 class="text-xl font-bold mb-3 text-teal">{item.title}</h3>
                        <p class="text-gray-600">{item.description}</p>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>
