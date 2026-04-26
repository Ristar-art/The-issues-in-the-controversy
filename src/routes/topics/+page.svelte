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
            topics = allPages
                .filter(page => page.attributes.published)
                .sort((a, b) => a.attributes.title.localeCompare(b.attributes.title));
        } catch (err) {
            error = err.message;
        } finally {
            loading = false;
        }
    }

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

<div class="font-body ea-root">
    <main>
        <!-- ======================================================== -->
        <!-- HEADER                                                     -->
        <!-- ======================================================== -->
        <section class="px-6 md:px-12 pt-24 md:pt-32 pb-12 md:pb-16">
            <div class="max-w-5xl">
                <p class="ea-eyebrow mb-6">Study Areas · Index</p>
                <h1 class="font-headline text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[var(--ea-primary)] leading-[0.95] tracking-tight mb-8">
                    Topics<br /><span class="italic font-light">&amp; Studies</span>
                </h1>
                <p class="font-body text-[var(--ea-on-surface-variant)] text-base md:text-lg max-w-2xl leading-relaxed">
                    A comprehensive collection of studies covering biblical prophecy, the character of God, and the issues at the heart of the great controversy.
                </p>
            </div>
        </section>

        <!-- ======================================================== -->
        <!-- SEARCH + GRID                                              -->
        <!-- ======================================================== -->
        <section class="px-6 md:px-12 pb-24 md:pb-32">
            {#if loading}
                <div class="text-center py-24">
                    <div class="inline-block animate-spin rounded-full h-10 w-10 border-2 border-[var(--ea-secondary)] border-t-transparent"></div>
                    <p class="mt-6 ea-eyebrow">Loading topics</p>
                </div>
            {:else if error}
                <div class="text-center py-24">
                    <p class="font-body text-[var(--ea-secondary)]">Error loading topics: {error}</p>
                </div>
            {:else if topics.length === 0}
                <div class="text-center py-24">
                    <p class="font-body text-[var(--ea-on-surface-variant)]">No published topics available at this time.</p>
                </div>
            {:else}
                <!-- Search -->
                <div class="mb-16 md:mb-20 flex items-end justify-between gap-6 flex-wrap border-b border-[var(--ea-outline-variant)] pb-6">
                    <p class="ea-eyebrow">
                        {searchQuery && filteredTopics.length !== topics.length
                            ? `Showing ${filteredTopics.length} of ${topics.length}`
                            : `${topics.length} ${topics.length === 1 ? 'Study' : 'Studies'}`}
                    </p>
                    <div class="relative w-full md:w-96">
                        <input
                            type="text"
                            bind:value={searchQuery}
                            placeholder="Search topics…"
                            class="w-full pl-10 pr-10 py-3 bg-transparent border-b border-[var(--ea-outline-variant)] focus:border-[var(--ea-primary)] text-[var(--ea-primary)] font-body placeholder:text-[var(--ea-on-surface-variant)]/60 focus:outline-none transition-colors"
                        />
                        <svg
                            class="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--ea-on-surface-variant)]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        {#if searchQuery}
                            <button
                                type="button"
                                on:click={() => (searchQuery = '')}
                                class="absolute right-0 top-1/2 -translate-y-1/2 text-[var(--ea-on-surface-variant)] hover:text-[var(--ea-secondary)] transition-colors"
                                aria-label="Clear search"
                            >
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        {/if}
                    </div>
                </div>

                {#if filteredTopics.length === 0}
                    <div class="text-center py-24">
                        <p class="font-body text-[var(--ea-on-surface-variant)] mb-4">No topics found matching "{searchQuery}"</p>
                        <button type="button" on:click={() => (searchQuery = '')} class="ea-btn-ghost">
                            Clear search
                        </button>
                    </div>
                {:else}
                    <!-- Editorial grid -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-14 md:gap-y-20">
                        {#each filteredTopics as topic, index}
                            <a
                                href="/{topic.attributes.slug}"
                                class="group block border-t border-[var(--ea-outline-variant)] pt-8 md:pt-10 transition-colors hover:border-[var(--ea-primary)]"
                            >
                                <div class="flex items-baseline justify-between gap-6 mb-6">
                                    <span class="font-label text-[10px] uppercase tracking-[0.28em] text-[var(--ea-secondary)] font-bold">
                                        {String(index + 1).padStart(2, '0')} · Study
                                    </span>
                                    <span class="font-label text-[10px] uppercase tracking-[0.28em] text-[var(--ea-on-surface-variant)]/60">
                                        Open
                                    </span>
                                </div>

                                <h2 class="font-headline text-3xl md:text-4xl text-[var(--ea-primary)] leading-tight mb-8 group-hover:text-[var(--ea-secondary)] transition-colors">
                                    {topic.attributes.title}
                                </h2>

                                <span class="inline-flex items-center gap-2 font-label text-[10px] uppercase tracking-[0.28em] text-[var(--ea-secondary)] font-bold border-b-2 border-[var(--ea-secondary-fixed-dim)] pb-1 group-hover:border-[var(--ea-secondary)] transition-colors">
                                    Read Chapter
                                    <svg class="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </span>
                            </a>
                        {/each}
                    </div>
                {/if}
            {/if}
        </section>
    </main>
</div>
