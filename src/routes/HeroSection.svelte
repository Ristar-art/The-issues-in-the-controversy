<script>
    let { hero } = $props();
</script>

<section class="relative overflow-hidden min-h-[calc(100vh-64px)] flex items-center">
    <!-- Background image -->
    <img
        src={hero}
        alt=""
        aria-hidden="true"
        class="absolute inset-0 w-full h-full object-cover img-dark"
    />

    <!-- Gradient/vignette overlay -->
    <div class="absolute inset-0 hero-vignette"></div>
    <div class="absolute inset-0 bg-gradient-to-b from-[var(--c-void)]/30 via-transparent to-[var(--c-void)]"></div>

    <div class="relative w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-24 md:py-32">
        <div class="max-w-3xl">
            <!-- Eyebrow -->
            <p class="eyebrow-dark mb-6">
                <span class="text-[var(--c-fg-dim)]">Archive 001 —</span>
                A Masterclass in Prophecy
            </p>

            <!-- Main Headline -->
            <h1 class="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[var(--c-fg)] leading-[1.02] mb-8">
                The Endgame<br />of Heaven
            </h1>

            <!-- Subheadline -->
            <p class="font-body text-base md:text-lg text-[var(--c-fg-muted)] max-w-xl mb-10 leading-relaxed">
                An investigative journey into the cosmic conflict that precedes time and shadows the final movement of human history.
            </p>

            <!-- CTAs -->
            <div class="flex flex-wrap gap-4">
                <a href="/topics" class="btn-dark">
                    Open Archive
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                </a>
                <a href="#topics" class="btn-dark-outline">
                    Read the Brief
                </a>
            </div>
        </div>
    </div>

    <!-- Bottom meta bar -->
    <div class="absolute bottom-0 left-0 right-0 border-t border-[var(--c-border)]/60 bg-[var(--c-void)]/40 backdrop-blur-sm">
        <div class="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-4 flex items-center justify-between font-mono-editorial text-xs text-[var(--c-fg-dim)] uppercase tracking-[0.2em]">
            <span>Ch. I — Prologue</span>
            <span class="hidden md:inline">Scroll to Decrypt ↓</span>
            <span>EST. Eternity</span>
        </div>
    </div>
</section>
