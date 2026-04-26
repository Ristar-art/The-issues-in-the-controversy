<!-- src/routes/TheTruth.svelte — Systemic Synthesis -->
<script>
    let { truth } = $props();
    const baseTitle = truth?.title ?? 'The truth about God';
</script>

<section class="py-28 md:py-40 bg-[var(--ea-surface-highest)] flex flex-col items-center text-center px-6 md:px-12">
    <span class="inline-block bg-[var(--ea-secondary)]/10 text-[var(--ea-secondary)] px-4 py-1 rounded-full font-label text-[10px] uppercase tracking-[0.3em] mb-8">
        Systemic Synthesis
    </span>

    <h2 class="font-headline text-5xl md:text-6xl lg:text-7xl text-[var(--ea-primary)] mb-10 max-w-4xl leading-[1.05]">
        The ultimate controversy is not about the end of the world, but about the
        <span class="italic font-light">character of its Creator.</span>
    </h2>

    {#if truth?.question}
        <p class="font-body italic text-lg md:text-xl text-[var(--ea-on-surface-variant)] max-w-2xl mb-10 leading-relaxed">
            {truth.question}
        </p>
    {/if}

    {#if truth?.points?.length}
        <ul class="grid gap-3 mb-12 max-w-xl mx-auto text-left">
            {#each truth.points as point, i}
                <li class="flex items-start gap-4 font-body text-[var(--ea-on-surface-variant)] leading-relaxed">
                    <span class="font-label text-xs text-[var(--ea-secondary)] mt-1 tracking-[0.2em] font-bold">0{i + 1}</span>
                    <span>{point}</span>
                </li>
            {/each}
        </ul>
    {/if}

    {#if truth?.cta?.href}
        <a href={`/${truth.cta.href}`} class="ea-btn-primary shadow-xl">
            {truth.cta.label ?? 'The Verdict'}
        </a>
    {:else}
        <a href="#" class="ea-btn-primary shadow-xl">The Verdict</a>
    {/if}

    <p class="sr-only">{baseTitle}</p>
</section>
