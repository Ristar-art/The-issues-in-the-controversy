<!-- src/routes/TheTruth.svelte — Truth About God full-bleed CTA -->
<script>
    let { truth } = $props();
</script>

<section class="relative overflow-hidden py-28 md:py-40 border-t border-[var(--c-border)]">
    {#if truth?.image?.src}
        <img
            src={truth.image.src}
            alt=""
            aria-hidden="true"
            class="absolute inset-0 w-full h-full object-cover img-dark opacity-50"
        />
    {/if}
    <div class="absolute inset-0 bg-gradient-to-b from-[var(--c-void)] via-[var(--c-void)]/85 to-[var(--c-void)]"></div>
    <div class="absolute inset-0" style="background: radial-gradient(ellipse at center, rgba(13,148,136,0.12) 0%, transparent 60%);"></div>

    <div class="relative max-w-3xl mx-auto px-6 md:px-12 text-center">
        <p class="eyebrow-dim mb-6">Decision Point</p>
        <h2 class="font-display text-3xl md:text-5xl lg:text-6xl text-[var(--c-fg)] uppercase tracking-tight leading-tight mb-8">
            {truth?.title ?? 'The Truth About God'}
        </h2>

        {#if truth?.question}
            <p class="font-body text-lg md:text-xl text-[var(--c-fg-muted)] italic leading-relaxed mb-10 max-w-2xl mx-auto">
                {truth.question}
            </p>
        {/if}

        {#if truth?.points?.length}
            <ul class="grid gap-3 mb-12 max-w-xl mx-auto text-left">
                {#each truth.points as point, i}
                    <li class="flex items-start gap-4 font-body text-[var(--c-fg-muted)] leading-relaxed">
                        <span class="font-mono-editorial text-xs text-[var(--c-teal)] mt-1.5 tracking-[0.2em]">
                            0{i + 1}
                        </span>
                        <span>{point}</span>
                    </li>
                {/each}
            </ul>
        {/if}

        {#if truth?.cta?.href}
            <a href={truth.cta.href} class="btn-dark">
                {truth.cta.label ?? 'Recover the Signal'}
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
            </a>
        {/if}
    </div>
</section>
