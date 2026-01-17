<script>
    import { onMount } from 'svelte';

    let topics = [];
    let loading = true;
    let error = null;

    async function fetchTopics() {
        try {
            const response = await fetch('/api/articles');
            if (!response.ok) throw new Error('Failed to fetch topics');
            const allPages = await response.json();
            // Filter for published pages only
            topics = allPages.filter(page => page.attributes.published);
        } catch (err) {
            error = err.message;
        } finally {
            loading = false;
        }
    }

    onMount(fetchTopics);
</script>

<svelte:head>
    <title>Topics - The Issues in the Controversy</title>
    <meta name="description" content="Explore our comprehensive topics on biblical prophecy, Daniel, Revelation, and God's character." />
</svelte:head>

<div class="min-h-screen bg-gray-50 py-12">
    <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
            <h1 class="text-4xl font-bold text-teal mb-8 text-center">Topics</h1>
            <p class="text-lg text-gray-600 mb-12 text-center">
                Explore our comprehensive collection of topics covering biblical prophecy, the character of God, and spiritual truths.
            </p>

            {#if loading}
                <div class="text-center py-12">
                    <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal"></div>
                    <p class="mt-4 text-gray-600">Loading topics...</p>
                </div>
            {:else if error}
                <div class="text-center py-12">
                    <p class="text-red-600">Error loading topics: {error}</p>
                </div>
            {:else if topics.length === 0}
                <div class="text-center py-12">
                    <p class="text-gray-600">No published topics available at this time.</p>
                </div>
            {:else}
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {#each topics as topic}
                        <div class=" ">
                            <div class="p-6">
                                <a
                                href="/{topic.attributes.slug}"
                                class="inline-flex items-center "
                                >
                                <h2 class="text-xl  text-gray-800 mb-3 line-clamp-2 text-teal hover:text-teal-dark font-medium transition-colors duration-200">
                                    {topic.attributes.title}
                                </h2>
                                </a>
                                <!-- <p class="text-gray-600 mb-4 text-sm line-clamp-3">
                                    {topic.attributes.content ? topic.attributes.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...' : 'Click to read this topic'}
                                </p> -->
                                <!-- <a
                                    href="/{topic.attributes.slug}"
                                    class="inline-flex items-center text-teal hover:text-teal-dark font-medium transition-colors duration-200"
                                >
                                    Read More
                                    <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                                    </svg>
                                </a> -->
                            </div>
                        </div>
                    {/each}
                </div>
            {/if}
        </div>
    </div>
</div>

<style>
    .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    .line-clamp-3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    .text-teal {
        color: #14b8a6;
    }
    .text-teal-dark {
        color: #0d9488;
    }
</style>