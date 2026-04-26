<script>
    let { footer } = $props();
</script>

<div class="w-full py-16 px-6 md:px-12 mt-16 md:mt-24 bg-[var(--ea-surface-low)] border-t border-[var(--ea-outline-variant)]/30 flex flex-col items-center gap-8">
    <div class="font-headline text-xl font-bold text-[var(--ea-primary-container)]">
            <img src="/logoimage.jpg" style="width: 4rem; height: auto; ;" >
    </div>

    {#if footer.tagline}
        <p class="font-body text-sm text-[var(--ea-on-surface-variant)] text-center max-w-md">{footer.tagline}</p>
    {/if}

    <div class="flex flex-wrap justify-center gap-6 md:gap-8">
        {#each footer.quickLinks ?? [] as link}
            <a
                href={link.href}
                class="font-label text-xs tracking-[0.25em] uppercase text-[var(--ea-on-surface-variant)] hover:text-[var(--ea-primary)] transition-colors opacity-80 hover:opacity-100"
            >
                {link.label}
            </a>
        {/each}
    </div>

    {#if footer.socialLinks?.length}
        <div class="flex gap-3">
            {#each footer.socialLinks as social}
                <a
                    href={social.href}
                    class="w-9 h-9 border border-[var(--ea-outline-variant)] flex items-center justify-center text-[var(--ea-on-surface-variant)] hover:border-[var(--ea-primary)] hover:text-[var(--ea-primary)] transition-colors rounded-full"
                    aria-label={social.icon}
                >
                    <i class={`fab fa-${social.icon}`}></i>
                </a>
            {/each}
        </div>
    {/if}

    <div class="font-label text-[10px] tracking-[0.3em] uppercase text-[var(--ea-on-surface-variant)] mt-4">
        {footer.copyright ?? '© The Controversy Editorial. All Rights Reserved.'}
    </div>
</div>

 <!-- ======================================================== -->
    <!-- FOOTER                                                     -->
    <!-- ======================================================== -->
    <!-- <footer>
        <div class="w-full py-16 px-6 md:px-12 mt-16 md:mt-24 bg-[var(--ea-surface-low)] border-t border-[var(--ea-outline-variant)]/30 flex flex-col items-center gap-8">
            <div class="font-headline text-xl font-bold text-[var(--ea-primary-container)]">The Controversy</div>

            {#if footer.tagline}
                <p class="font-body text-sm text-[var(--ea-on-surface-variant)] text-center max-w-md">{footer.tagline}</p>
            {/if}

            <div class="flex flex-wrap justify-center gap-6 md:gap-8">
                {#each footer.quickLinks ?? [] as link}
                    <a href={link.href} class="font-label text-xs tracking-[0.25em] uppercase text-[var(--ea-on-surface-variant)] hover:text-[var(--ea-primary)] transition-colors opacity-80 hover:opacity-100">
                        {link.label}
                    </a>
                {/each}
            </div>

            {#if footer.socialLinks?.length}
                <div class="flex gap-3">
                    {#each footer.socialLinks as social}
                        <a href={social.href} class="w-9 h-9 border border-[var(--ea-outline-variant)] flex items-center justify-center text-[var(--ea-on-surface-variant)] hover:border-[var(--ea-primary)] hover:text-[var(--ea-primary)] transition-colors rounded-full" aria-label={social.icon}>
                            <i class={`fab fa-${social.icon}`}></i>
                        </a>
                    {/each}
                </div>
            {/if}

            <div class="font-label text-[10px] tracking-[0.3em] uppercase text-[var(--ea-on-surface-variant)] mt-4">
                {footer.copyright ?? '© The Controversy Editorial. All Rights Reserved.'}
            </div>
        </div>

        {#if footer.credit}
            <div class="bg-[var(--ea-surface-low)] border-t border-[var(--ea-outline-variant)]/30 text-center py-3 font-label text-[10px] uppercase tracking-[0.3em] text-[var(--ea-on-surface-variant)]">
                <p>{footer.credit}</p>
            </div>
        {/if}
    </footer> -->