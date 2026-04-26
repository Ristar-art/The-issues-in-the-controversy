<!-- src/routes/HeroSection.svelte — Editorial Architect hero -->
<script>
    let { hero } = $props();
</script>

<section class="relative">
    <div class="relative mx-4 md:mx-8 lg:mx-12 mt-6 md:mt-8 rounded-xl overflow-hidden min-h-[560px] md:min-h-[720px] lg:h-[calc(100vh-120px)] lg:max-h-[900px] flex items-center">
        <img
            src={hero}
            alt=""
            aria-hidden="true"
            class="absolute inset-0 w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-tr from-[var(--ea-primary)]/85 via-[var(--ea-primary)]/40 to-transparent"></div>
        <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--ea-primary)]/50"></div>

        <div class="relative z-10 w-full px-6 md:px-12 lg:px-16 py-16 md:py-24 max-w-4xl">
            <p class="ea-eyebrow-light mb-6">A Masterclass in Prophecy</p>
            <h1 class="font-headline text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight mb-8">
                The Endgame <br />of <span class="italic font-light">Heaven</span>
            </h1>
            <p class="font-body text-[var(--ea-primary-fixed)] text-base md:text-lg max-w-xl leading-relaxed mb-10">
                An investigative journey into the cosmic conflict that precedes time and shadows the final movement of human history.
            </p>
            <div class="flex flex-wrap gap-4">
                <a href="/topics" class="ea-btn-primary">
                    Explore Topics
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                </a>
                <a href="#topics" class="ea-btn-on-dark">
                    Read the Brief
                </a>
            </div>
        </div>
    </div>
</section>
