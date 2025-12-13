 <!-- src/lib/components/KeySections.svelte -->
<script>
    let { keySections } = $props();
</script>

<section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center text-teal mb-12">{keySections.title}</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {#each keySections.items as section}
                <div class=" p-6 rounded-lg ">
                    <h3 class="text-xl font-bold mb-4">{section.title}</h3>
                    <p class="text-gray-600 mb-4">{section.description}</p>
                    <a href={section.cta.href} class="btn">{section.cta.label}</a>
                </div>
            {/each}
        </div>
    </div>
</section>
