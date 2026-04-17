<!-- src/routes/Symbols.svelte — Decoding the Ancient Symbols -->
<script>
    let { symbols } = $props();
    const items = symbols?.items ?? [];
    const title = `${symbols?.titleLine1 ?? 'Decoding The'} ${symbols?.titleLine2 ?? 'Ancient Symbols'}`.trim();
</script>

<section class="py-24 md:py-32 bg-[var(--c-bg)] border-t border-[var(--c-border)]">
    <div class="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <!-- Visual column -->
            <div class="lg:col-span-5 order-2 lg:order-1">
                <div class="relative aspect-square bg-[var(--c-surface)] border border-[var(--c-border)] overflow-hidden">
                    <!-- Geometric symbol stack -->
                    <div class="absolute inset-0 flex items-center justify-center">
                        <div class="relative w-2/3 h-2/3">
                            <!-- Triangle -->
                            <svg class="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 text-[var(--c-teal)]" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                <polygon points="50,15 90,85 10,85" />
                            </svg>
                            <!-- Circle -->
                            <svg class="absolute top-10 right-0 w-28 h-28 text-[var(--c-fg-muted)]" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                <circle cx="50" cy="50" r="42" />
                            </svg>
                            <!-- Hex -->
                            <svg class="absolute bottom-0 left-4 w-32 h-32 text-[var(--c-teal-dim)]" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                <polygon points="50,10 88,32 88,68 50,90 12,68 12,32" />
                            </svg>
                        </div>
                    </div>
                    <!-- Overlay blur block -->
                    <div class="absolute bottom-0 right-0 w-2/5 h-2/5 bg-[var(--c-teal-dim)]/10 backdrop-blur-sm border-l border-t border-[var(--c-border)]"></div>
                    <!-- Accent rail -->
                    <div class="absolute left-0 top-0 bottom-0 w-1 bg-[var(--c-teal)]"></div>
                </div>
            </div>

            <!-- Content column -->
            <div class="lg:col-span-7 order-1 lg:order-2">
                <p class="eyebrow-dim mb-4">Cryptographic Analysis</p>
                <h2 class="font-display text-3xl md:text-4xl lg:text-5xl text-[var(--c-fg)] uppercase tracking-tight mb-6 leading-tight">
                    {title}
                </h2>
                <p class="font-body text-[var(--c-fg-muted)] leading-relaxed mb-8">
                    {symbols?.description ?? 'Throughout history, the great conflict has been hidden in plain sight. From the architecture of cathedrals to the logos of modern corporations, the war for the soul of man is encoded in a universal symbolic language.'}
                </p>

                <ul class="space-y-4 mb-10">
                    {#each items as item}
                        <li class="flex items-start gap-4 group">
                            <span class="mt-3 flex-none w-1.5 h-1.5 rounded-full bg-[var(--c-teal)]"></span>
                            <div>
                                <h4 class="font-display text-base md:text-lg text-[var(--c-fg)] uppercase tracking-wider mb-1">
                                    {item.title}
                                </h4>
                                {#if item.description}
                                    <p class="font-body text-sm text-[var(--c-fg-muted)] italic">
                                        {item.description}
                                    </p>
                                {/if}
                            </div>
                        </li>
                    {/each}
                </ul>

                {#if symbols?.cta?.href}
                    <a href={symbols.cta.href} class="btn-dark-outline">
                        {symbols.cta.label ?? 'Decode the Archive'}
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                        </svg>
                    </a>
                {/if}
            </div>
        </div>
    </div>
</section>
