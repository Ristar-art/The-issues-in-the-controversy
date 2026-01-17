<!--  src/lib/components/Progress.svelte -->
<script>
    let { progress } = $props();
</script>

<section class="py-16 ">
    <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-teal mb-12">{progress.title}</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            {#each progress.images as image}
                <div class="bg-white rounded-lg overflow-hidden shadow-md">
                    <img src={image.src} alt={image.alt} class="w-full h-64 object-cover">
                </div>
            {/each}
        </div>
        
        <!-- <div class="text-center mt-10">
            <button class="btn">{progress.cta.label}</button>
        </div> -->
    </div>
</section>
