<script>
    let { featured } = $props();
    let selectedVideo = $state(null);

    function getVideoId(embedUrl) {
        return embedUrl.split('/')[4].split('?')[0];
    }

    function getThumbnailUrl(videoId) {
        return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }

    function openModal(video) {
        selectedVideo = video;
    }

    function closeModal() {
        selectedVideo = null;
    }
</script>

<section class="relative overflow-hidden py-16">
    <div class="container mx-auto px-4">
        <h2 class="text-3xl  font-bold text-teal mb-8">{featured.title}</h2>
        <div class="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-8">
            {#each featured.videos as video}
                {@const videoId = getVideoId(video.embedUrl)}
                {@const thumbnailUrl = getThumbnailUrl(videoId)}
                <div class="relative aspect-video cursor-pointer group" onclick={() => openModal(video)}>
                    <img src={thumbnailUrl} alt={video.title} class="w-full h-full object-cover rounded-lg">
                    <div class="absolute inset-0 bg-black bg-opacity-0 flex items-center justify-center group-hover:bg-opacity-50 transition-opacity duration-300">
                        <div class="bg-white bg-opacity-90 rounded-full p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <svg class="w-8 h-8 text-teal" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"></path>
                            </svg>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>

{#if selectedVideo}
    <div class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onclick={closeModal}>
        <div class="relative max-w-4xl w-full mx-4" onclick={(e) => e.stopPropagation()}>
            <button class="absolute -top-12 right-0 text-white text-2xl" onclick={closeModal}>&times;</button>
            <div class="aspect-video">
                <iframe
                    src={selectedVideo.embedUrl}
                    title={selectedVideo.title}
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                    class="w-full h-full rounded-lg">
                </iframe>
            </div>
        </div>
    </div>
{/if}
