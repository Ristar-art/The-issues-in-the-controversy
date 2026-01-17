<!-- src/lib/components/KeyTopics.svelte -->
<script>
    let { keyTopics } = $props();
</script>

<section class="py-16 bg-white">
    <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold  text-teal mb-12">{keyTopics.title}</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {#each keyTopics.items as topic}
                <div class="border border-gray-200 rounded-lg p-6 transition">
                    <h3 class="text-xl font-bold mb-3">{topic.title}</h3>
                    <p class="text-gray-600 mb-4">{topic.description}</p>
                    <a href={topic.href} class="text-teal font-medium hover:underline">Read more <i class="fas fa-arrow-right ml-1"></i></a>
                </div>
            {/each}
        </div>
    </div>
</section>
