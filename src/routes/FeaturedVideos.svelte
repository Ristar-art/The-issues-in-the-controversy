<script>
    let { featured } = $props();
    let selectedVideo = $state(null);

    function getVideoId(url) {
        if (!url) return null;

        // Embed URLs (your actual data format)
        if (url.includes('/embed/')) {
            return url.split('/embed/')[1]?.split('?')[0];
        }

        // Short links
        if (url.includes('youtu.be/')) {
            return url.split('youtu.be/')[1]?.split('?')[0];
        }

        // watch?v= links
        try {
            const parsed = new URL(url);
            return parsed.searchParams.get('v');
        } catch {
            return null;
        }
    }

    function getThumbnailUrl(id) {
        return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
    }

    function openModal(video) {
        selectedVideo = video;
    }

    function closeModal() {
        selectedVideo = null;
    }
</script>

<section class="py-24 bg-white">
    <div class="container mx-auto px-4 max-w-6xl">

        <!-- Header -->
        <div class="mb-16 max-w-3xl">
            <span class="eyebrow">Multimedia</span>
            <h2 class="font-display text-4xl md:text-5xl text-[var(--color-ink)] mb-6">
                {featured.title}
            </h2>
            <div class="section-divider"></div>
        </div>

        <!-- Videos -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {#each featured.videos as video, index}
                {@const videoId = getVideoId(video.embedUrl)}

                <article
                    class="group cursor-pointer"
                    on:click={() => openModal(video)}
                >
                    <div class="relative aspect-video overflow-hidden bg-[var(--color-charcoal)] mb-4">

                        <!-- Thumbnail -->
                        {#if videoId}
                            <img
                                src={getThumbnailUrl(videoId)}
                                alt={video.title}
                                loading="lazy"
                                class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                on:load={(e) => {
                                    e.currentTarget
                                        .parentElement
                                        .querySelector('.thumbnail-fallback')
                                        ?.classList.add('hidden');
                                }}
                                on:error={(e) => {
                                    e.currentTarget.remove();
                                }}
                            />
                        {/if}

                        <!-- Fallback (visible by default) -->
                        <div
                            class="thumbnail-fallback absolute inset-0 bg-gradient-to-br from-[var(--color-charcoal)] to-[var(--color-ink)] flex items-center justify-center"
                        >
                            <svg
                                class="w-16 h-16 text-[var(--color-warm-gray)] opacity-40"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.5 7.2v5.6l4-2.8-4-2.8z"
                                />
                            </svg>
                        </div>

                        <!-- Hover overlay -->
                        <!-- Soft hover tint -->
<div
    class="absolute inset-0 pointer-events-none
           bg-gradient-to-t from-black/40 via-black/10 to-black/0
           opacity-0 group-hover:opacity-100
           transition-opacity duration-300"
></div>

<!-- Play button layer -->
<div
    class="absolute inset-0 flex items-center justify-center
           pointer-events-none"
>
    <div
        class="w-16 h-16 rounded-full bg-white/90
               flex items-center justify-center
               opacity-0 group-hover:opacity-100
               scale-75 group-hover:scale-100
               transition-all duration-300"
    >
        <svg
            class="w-6 h-6 text-black ml-1"
            viewBox="0 0 20 20"
            fill="currentColor"
        >
            <path
                d="M6.3 5.8a.5.5 0 01.8-.4l7.1 4.2a.5.5 0 010 .8l-7.1 4.2a.5.5 0 01-.8-.4V5.8z"
            />
        </svg>
    </div>
</div>


                        <!-- Index -->
                        <!-- <div
                            class="absolute top-4 left-4 text-2xl font-display text-[var(--color-paper)] bg-[var(--color-ink)] bg-opacity-60 px-3 py-1"
                        >
                            {String(index + 1).padStart(2, '0')}
                        </div> -->
                    </div>

                    <h3
                        class="font-headline text-lg text-[var(--color-ink)] group-hover:text-[var(--color-accent)] transition-colors"
                    >
                        {video.title}
                    </h3>
                    <p class="text-sm text-[var(--color-warm-gray)] mt-1">
                        Watch now
                    </p>
                </article>
            {/each}
        </div>
    </div>
</section>

<!-- Modal -->
{#if selectedVideo}
    <div
        class="fixed inset-0 bg-[var(--color-ink)] bg-opacity-95 z-50 flex items-center justify-center"
        on:click={closeModal}
    >
        <div
            class="relative max-w-5xl w-full mx-4"
            on:click|stopPropagation
        >
            <button
                class="absolute -top-12 right-0 text-[var(--color-paper)] hover:text-[var(--color-accent)]"
                on:click={closeModal}
            >
                ✕
            </button>

            <div class="aspect-video bg-black">
                <iframe
                    src={selectedVideo.embedUrl}
                    title={selectedVideo.title}
                    class="w-full h-full"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowfullscreen
                ></iframe>
            </div>

            <h3 class="mt-4 text-xl text-[var(--color-paper)]">
                {selectedVideo.title}
            </h3>
        </div>
    </div>
{/if}
