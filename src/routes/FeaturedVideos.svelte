<script>
    let { featured } = $props();
    let selectedVideo = $state(null);

    function getVideoId(url) {
        if (!url) return null;
        if (url.includes('/embed/')) return url.split('/embed/')[1]?.split('?')[0];
        if (url.includes('youtu.be/')) return url.split('youtu.be/')[1]?.split('?')[0];
        try {
            const parsed = new URL(url);
            return parsed.searchParams.get('v');
        } catch { return null; }
    }

    function getThumbnailUrl(id) {
        return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
    }

    function openModal(video) { selectedVideo = video; }
    function closeModal() { selectedVideo = null; }

    const videos = featured?.videos ?? [];
    const featureVideo = videos[0];
    const gridVideos = videos.slice(1, 5);
</script>

<section class="py-24 md:py-32 bg-[var(--c-bg)] border-t border-[var(--c-border)]">
    <div class="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">

        <!-- Header -->
        <div class="text-center max-w-2xl mx-auto mb-16">
            <p class="eyebrow-dim mb-4">The Visual Argument · Chapter VII</p>
            <h2 class="font-display text-3xl md:text-5xl text-[var(--c-fg)] mb-6">
                {featured?.title ?? 'Seeing Is Believing'}
            </h2>
            <p class="font-body text-[var(--c-fg-muted)] leading-relaxed">
                {featured?.subtitle ?? 'A filmed record of the evidence. Play the exhibits. Decide for yourself.'}
            </p>
        </div>

        <!-- Feature video -->
        {#if featureVideo}
            {@const fId = getVideoId(featureVideo.embedUrl)}
            <button
                type="button"
                class="group relative w-full aspect-video bg-[var(--c-surface)] overflow-hidden mb-6 block border border-[var(--c-border)]"
                onclick={() => openModal(featureVideo)}
                aria-label={`Play ${featureVideo.title}`}
            >
                {#if fId}
                    <img
                        src={getThumbnailUrl(fId)}
                        alt={featureVideo.title}
                        class="absolute inset-0 w-full h-full object-cover img-dark group-hover:scale-[1.02] transition-transform duration-700"
                        loading="lazy"
                    />
                {/if}
                <div class="absolute inset-0 bg-gradient-to-t from-[var(--c-void)] via-transparent to-transparent"></div>

                <!-- Play button -->
                <span class="absolute inset-0 flex items-center justify-center">
                    <span class="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[var(--c-teal-strong)] flex items-center justify-center shadow-[0_0_60px_rgba(45,212,191,0.4)] group-hover:bg-[var(--c-teal)] transition-colors">
                        <svg class="w-7 h-7 text-[var(--c-void)] ml-1" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </span>
                </span>

                <!-- Bottom caption strip -->
                <div class="absolute bottom-0 left-0 right-0 bg-[var(--c-void)]/85 backdrop-blur-sm px-6 md:px-10 py-5 border-t border-[var(--c-border)] text-left">
                    <p class="eyebrow-dim mb-2">Feature Transmission · Runtime 00:42:18</p>
                    <h3 class="font-display text-xl md:text-2xl text-[var(--c-fg)] uppercase tracking-tight">
                        {featureVideo.title}
                    </h3>
                </div>
            </button>
        {/if}

        <!-- Secondary videos -->
        {#if gridVideos.length}
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                {#each gridVideos as video}
                    {@const vId = getVideoId(video.embedUrl)}
                    <button
                        type="button"
                        class="group text-left"
                        onclick={() => openModal(video)}
                    >
                        <div class="relative aspect-video overflow-hidden bg-[var(--c-surface)] border border-[var(--c-border)] mb-3">
                            {#if vId}
                                <img
                                    src={getThumbnailUrl(vId)}
                                    alt={video.title}
                                    class="absolute inset-0 w-full h-full object-cover img-dark group-hover:scale-105 transition-transform duration-500"
                                    loading="lazy"
                                />
                            {/if}
                            <div class="absolute inset-0 bg-gradient-to-t from-[var(--c-void)]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <span class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <span class="w-10 h-10 rounded-full bg-[var(--c-teal-strong)] flex items-center justify-center">
                                    <svg class="w-4 h-4 text-[var(--c-void)] ml-0.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </span>
                            </span>
                        </div>
                        <h4 class="font-headline text-sm md:text-base text-[var(--c-fg)] group-hover:text-[var(--c-teal)] transition-colors leading-snug">
                            {video.title}
                        </h4>
                    </button>
                {/each}
            </div>
        {/if}
    </div>
</section>

<!-- Modal -->
{#if selectedVideo}
    <div
        class="fixed inset-0 bg-[var(--c-void)]/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-label={selectedVideo.title}
    >
        <button
            type="button"
            class="absolute inset-0 w-full h-full cursor-default"
            aria-label="Close modal"
            onclick={closeModal}
        ></button>
        <div class="relative max-w-5xl w-full">
            <button
                type="button"
                class="absolute -top-10 right-0 text-[var(--c-fg)] hover:text-[var(--c-teal)] font-mono-editorial text-xs tracking-[0.25em] uppercase z-10"
                onclick={closeModal}
            >
                Close ✕
            </button>
            <div class="aspect-video bg-black border border-[var(--c-border)] relative z-10">
                <iframe
                    src={selectedVideo.embedUrl}
                    title={selectedVideo.title}
                    class="w-full h-full"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowfullscreen
                ></iframe>
            </div>
            <h3 class="mt-4 font-display text-xl text-[var(--c-fg)] relative z-10">
                {selectedVideo.title}
            </h3>
        </div>
    </div>
{/if}
