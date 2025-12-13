<script>
    let { featured } = $props();
</script>

<section class="relative overflow-hidden  py-16">
    <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-bold text-teal mb-8 text-center">{featured.title}</h2>
        <div class="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-8">
            {#each featured.videos as video}
                <div class="aspect-w-16 aspect-h-9">
                    <iframe 
                        src={video.embedUrl}
                        title={video.title}
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        referrerpolicy="strict-origin-when-cross-origin" 
                        allowfullscreen>
                    </iframe>
                </div>
            {/each}
        </div>
    </div>
</section>
