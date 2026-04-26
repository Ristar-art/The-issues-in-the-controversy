<!-- src/routes/KeyTopics.svelte — Foundational Overviews -->
<script>
    let { keyTopics } = $props();
    const items = keyTopics?.items ?? [];
    const feature = items[0];
    const second = items[1];
    const third = items[2];
    const fourth = items[3];
</script>

<section class="px-6 md:px-12 py-20 md:py-32" id="topics">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
        <!-- Feature card (2-col) -->
        {#if feature}
            <a
                href={`/${feature.href ?? 'topics'}`}
                class="md:col-span-2 bg-[var(--ea-surface-low)] hover:bg-[var(--ea-surface-high)] p-8 md:p-16 rounded-xl flex flex-col justify-between group transition-colors"
            >
                <div>
                    <svg class="w-14 h-14 text-[var(--ea-primary)] mb-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.4" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                    </svg>
                    <h2 class="font-headline text-4xl md:text-5xl text-[var(--ea-primary)] mb-6 leading-tight">{feature.title}</h2>
                    <p class="font-body text-[var(--ea-on-surface-variant)] max-w-md leading-relaxed">{feature.description}</p>
                </div>
                <div class="pt-10">
                    <span class="font-label text-[10px] uppercase tracking-[0.28em] text-[var(--ea-secondary)] font-bold group-hover:underline">Deep Dive</span>
                </div>
            </a>
        {/if}

        <!-- Dark primary card -->
        {#if second}
            <a
                href={`/${second.href ?? 'topics'}`}
                class="bg-[var(--ea-primary)] hover:bg-[var(--ea-primary-container)] p-10 md:p-12 rounded-xl flex flex-col justify-end text-white transition-colors group"
            >
                <h3 class="font-headline text-3xl mb-4 text-white leading-tight">{second.title}</h3>
                <p class="font-body text-[var(--ea-on-primary-container)] text-sm leading-relaxed mb-6">{second.description}</p>
                <svg class="w-8 h-8 text-[var(--ea-primary-fixed-dim)] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.4" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
            </a>
        {/if}

        <!-- Surface-container card with secondary accent -->
        {#if third}
            <a
                href={`/${third.href ?? 'topics'}`}
                class="bg-[var(--ea-surface-container)] hover:bg-[var(--ea-surface-high)] p-10 md:p-12 rounded-xl flex flex-col justify-end border-b-4 border-[var(--ea-secondary)] transition-colors group"
            >
                <h3 class="font-headline text-3xl text-[var(--ea-primary)] mb-4 leading-tight">{third.title}</h3>
                <p class="font-body text-[var(--ea-on-surface-variant)] text-sm leading-relaxed mb-6">{third.description}</p>
                <svg class="w-8 h-8 text-[var(--ea-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.4" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                </svg>
            </a>
        {/if}

        <!-- Optional 4th card across full width if present -->
        {#if fourth}
            <a
                href={`/${fourth.href ?? 'topics'}`}
                class="md:col-span-4 bg-[var(--ea-surface-lowest)] ea-card-lift p-8 md:p-12 rounded-xl flex flex-col md:flex-row md:items-end gap-6 md:gap-12 group"
            >
                <div class="md:flex-1">
                    <p class="ea-eyebrow mb-3">Foundational Overview · 04</p>
                    <h3 class="font-headline text-3xl md:text-4xl text-[var(--ea-primary)] leading-tight mb-3">{fourth.title}</h3>
                    <p class="font-body text-[var(--ea-on-surface-variant)] leading-relaxed max-w-2xl">{fourth.description}</p>
                </div>
                <span class="font-label text-[10px] uppercase tracking-[0.28em] text-[var(--ea-secondary)] font-bold border-b-2 border-[var(--ea-secondary-fixed-dim)] pb-1 group-hover:border-[var(--ea-secondary)]">Open Chapter</span>
            </a>
        {/if}
    </div>
</section>
