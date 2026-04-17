<script>
    import { page } from '$app/stores';
    let isOpen = $state(false);
    function toggle() { isOpen = !isOpen; }
</script>

<nav class="bg-[var(--c-void)]/85 backdrop-blur-md border-b border-[var(--c-border)] text-[var(--c-fg)]">
    <div class="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-12 lg:px-24 py-4">
        <a href="/" class="flex items-center gap-3">
            <img src="/logoimage.jpg" alt="The Controversy" class="h-9 w-9 rounded-full object-cover ring-1 ring-[var(--c-border-strong)]">
            <span class="font-display text-base text-[var(--c-fg)] tracking-wide">The Controversy</span>
        </a>

        <div class="hidden md:flex items-center gap-8 font-mono-editorial text-xs uppercase tracking-[0.2em] text-[var(--c-fg-muted)]">
            <a href="/" class="hover:text-[var(--c-teal)] transition-colors">Home</a>
            <a href="/topics" class="hover:text-[var(--c-teal)] transition-colors">Topics</a>
            <a href="#topics" class="hover:text-[var(--c-teal)] transition-colors">Archive</a>
        </div>

        <div class="flex items-center gap-3">
            <a href="/topics" class="hidden sm:inline-flex btn-dark" style="padding: 0.625rem 1.25rem;">
                Enter Archive
            </a>
            <button
                class="md:hidden p-2 text-[var(--c-fg)]"
                on:click={toggle}
                aria-label="Toggle menu"
                aria-expanded={isOpen}
            >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {#if isOpen}
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
                    {:else}
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16" />
                    {/if}
                </svg>
            </button>
        </div>
    </div>

    {#if isOpen}
        <div class="md:hidden border-t border-[var(--c-border)] bg-[var(--c-void)]">
            <div class="px-6 py-4 flex flex-col gap-4 font-mono-editorial text-xs uppercase tracking-[0.2em] text-[var(--c-fg-muted)]">
                <a href="/" class="hover:text-[var(--c-teal)]" on:click={toggle}>Home</a>
                <a href="/topics" class="hover:text-[var(--c-teal)]" on:click={toggle}>Topics</a>
                <a href="#topics" class="hover:text-[var(--c-teal)]" on:click={toggle}>Archive</a>
            </div>
        </div>
    {/if}
</nav>
