<!-- src/routes/FeaturedVideos.svelte — The Visual Argument -->
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
    const gridVideos = videos.slice(1, 4);
</script>

<section class="px-6 md:px-12 py-24 md:py-32 bg-[var(--ea-primary)] text-white overflow-hidden">
    <div class="mb-16 md:mb-20">
        <p class="ea-eyebrow-muted mb-4">Digital Lectures</p>
        <h2 class="font-headline text-5xl md:text-6xl text-white leading-tight">The Visual Argument</h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
        {#if featureVideo}
            {@const fId = getVideoId(featureVideo.embedUrl)}
            <button
                type="button"
                class="relative group cursor-pointer aspect-video rounded-xl overflow-hidden shadow-2xl w-full"
                onclick={() => openModal(featureVideo)}
                aria-label={`Play ${featureVideo.title}`}
            >
                {#if fId}
                    <img
                        src={getThumbnailUrl(fId)}
                        alt={featureVideo.title}
                        class="w-full h-full object-cover"
                        loading="lazy"
                    />
                {/if}
                <div class="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-all">
                    <span class="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
                        <svg class="w-9 h-9 text-white ml-1" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </span>
                </div>
            </button>
        {/if}

        <div class="space-y-8">
            {#if featureVideo}
                <div class="pb-8 border-b border-white/10">
                    <p class="ea-eyebrow-muted mb-2">Series 01 · EP 04</p>
                    <h3 class="font-headline text-3xl md:text-4xl text-white mb-4 leading-tight">{featureVideo.title}</h3>
                    <p class="font-body text-[var(--ea-on-primary-container)] leading-relaxed">
                        An immersive walkthrough of the evidence — play the exhibit and decide for yourself.
                    </p>
                </div>
            {/if}

            {#if gridVideos.length}
                <ul class="space-y-4">
                    {#each gridVideos as video}
                        {@const vId = getVideoId(video.embedUrl)}
                        <li>
                            <button
                                type="button"
                                class="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors text-left group"
                                onclick={() => openModal(video)}
                            >
                                <span class="relative flex-none w-24 h-16 rounded-md overflow-hidden bg-black/40">
                                    {#if vId}
                                        <img src={getThumbnailUrl(vId)} alt="" class="w-full h-full object-cover" loading="lazy" />
                                    {/if}
                                    <span class="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <svg class="w-5 h-5 text-white ml-0.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </span>
                                </span>
                                <span class="flex-1">
                                    <span class="block font-headline text-lg text-white leading-snug group-hover:text-[var(--ea-primary-fixed)] transition-colors">{video.title}</span>
                                </span>
                            </button>
                        </li>
                    {/each}
                </ul>
            {/if}

            <div class="flex gap-6 pt-2">
                <a href="/topics" class="ea-btn-on-dark">View All Episodes</a>
            </div>
        </div>
    </div>
</section>

{#if selectedVideo}
    <div
        class="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
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
                class="absolute -top-10 right-0 text-white hover:text-[var(--ea-secondary-fixed)] font-label text-xs tracking-[0.25em] uppercase z-10"
                onclick={closeModal}
            >
                Close ✕
            </button>
            <div class="aspect-video bg-black rounded-lg overflow-hidden relative z-10">
                <iframe
                    src={selectedVideo.embedUrl}
                    title={selectedVideo.title}
                    class="w-full h-full"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowfullscreen
                ></iframe>
            </div>
            <h3 class="mt-4 font-headline text-xl text-white relative z-10">{selectedVideo.title}</h3>
        </div>
    </div>
{/if}
