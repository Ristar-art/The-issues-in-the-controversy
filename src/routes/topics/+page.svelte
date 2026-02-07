<script>
    import { onMount } from 'svelte';

    let topics = [];
    let loading = true;
    let error = null;
    let searchQuery = '';

    async function fetchTopics() {
        try {
            const response = await fetch('/api/articles');
            if (!response.ok) throw new Error('Failed to fetch topics');
            const allPages = await response.json();
            // Filter for published pages only and sort alphabetically
            topics = allPages
                .filter(page => page.attributes.published)
                .sort((a, b) => a.attributes.title.localeCompare(b.attributes.title));
        } catch (err) {
            error = err.message;
        } finally {
            loading = false;
        }
    }

    // Reactive statement to filter topics based on search query
    $: filteredTopics = searchQuery
        ? topics.filter(topic => 
            topic.attributes.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : topics;

    onMount(fetchTopics);
</script>

<svelte:head>
    <title>Topics - The Issues in the Controversy</title>
    <meta name="description" content="Explore our comprehensive topics on biblical prophecy, Daniel, Revelation, and God's character." />
</svelte:head>

<section class="py-24 bg-[var(--color-cream)]">
    <div class="container mx-auto px-4 max-w-6xl">
        <!-- Section Header -->
        <div class="text-center mb-16">
            <span class="eyebrow">Study Areas</span>
            <h1 class="font-display text-4xl md:text-5xl text-[var(--color-ink)] mb-6">Topics</h1>
            <div class="section-divider section-divider-center"></div>
            <p class="font-body text-[var(--color-stone)] text-lg max-w-2xl mx-auto leading-relaxed">
                Explore our comprehensive collection of topics covering biblical prophecy, the character of God, and spiritual truths.
            </p>
        </div>

        {#if loading}
            <div class="text-center py-16">
                <div class="inline-block animate-spin rounded-full h-8 w-8 border-2 border-[var(--color-accent)] border-t-transparent"></div>
                <p class="mt-4 text-[var(--color-stone)] font-body">Loading topics...</p>
            </div>
        {:else if error}
            <div class="text-center py-16">
                <p class="text-[var(--color-accent)] font-body">Error loading topics: {error}</p>
            </div>
        {:else if topics.length === 0}
            <div class="text-center py-16">
                <p class="text-[var(--color-stone)] font-body">No published topics available at this time.</p>
            </div>
        {:else}
            <!-- Search Filter -->
            <div class="max-w-md mx-auto mb-12">
                <div class="relative">
                    <input
                        type="text"
                        bind:value={searchQuery}
                        placeholder="Search topics..."
                        class="w-full px-4 py-3 pl-12 bg-[var(--color-paper)] border border-[var(--color-pearl)] text-[var(--color-ink)] font-body placeholder:text-[var(--color-warm-gray)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                    />
                    <svg 
                        class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-warm-gray)]" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                    {#if searchQuery}
                        <button
                            on:click={() => searchQuery = ''}
                            class="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-warm-gray)] hover:text-[var(--color-accent)] transition-colors"
                        >
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    {/if}
                </div>
                {#if searchQuery && filteredTopics.length > 0}
                    <p class="mt-2 text-sm text-[var(--color-stone)] font-body text-center">
                        Showing {filteredTopics.length} of {topics.length} topic{topics.length !== 1 ? 's' : ''}
                    </p>
                {/if}
            </div>

            {#if filteredTopics.length === 0}
                <div class="text-center py-16">
                    <p class="text-[var(--color-stone)] font-body mb-2">No topics found matching "{searchQuery}"</p>
                    <button 
                        on:click={() => searchQuery = ''}
                        class="link-editorial text-sm"
                    >
                        Clear search
                    </button>
                </div>
            {:else}
                <!-- Topics Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                    {#each filteredTopics as topic, index}
                        <article class="group">
                            <!-- Topic Number -->
                            <span class="font-display text-5xl text-[var(--color-pearl)] group-hover:text-[var(--color-accent)] transition-colors duration-300">
                                {String(index + 1).padStart(2, '0')}
                            </span>
                            
                            <!-- Content -->
                            <div class="mt-4">
                                <a href="/{topic.attributes.slug}" class="block">
                                    <h2 class="font-headline text-2xl text-[var(--color-ink)] mb-3 group-hover:text-[var(--color-accent)] transition-colors duration-300">
                                        {topic.attributes.title}
                                    </h2>
                                </a>
                                <a href="/{topic.attributes.slug}" class="link-editorial inline-flex items-center text-sm">
                                    Read more
                                    <svg class="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                    </svg>
                                </a>
                            </div>
                            
                            <!-- Bottom Border -->
                            <div class="mt-6 h-px bg-[var(--color-pearl)] group-hover:bg-[var(--color-accent)] transition-colors duration-300"></div>
                        </article>
                    {/each}
                </div>
            {/if}
        {/if}
    </div>
</section>

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
</style>
