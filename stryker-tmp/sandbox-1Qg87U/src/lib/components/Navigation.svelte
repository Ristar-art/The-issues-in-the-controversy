<script>
    import { onMount } from 'svelte';

    let { landing = false } = $props();
    let isOpen = $state(false);
    let visible = $state(true);
    let lastY = 0;
    const THRESHOLD = 8;

    function toggle() { isOpen = !isOpen; }

    onMount(() => {
        lastY = window.scrollY;
        function onScroll() {
            const y = window.scrollY;
            const dy = y - lastY;
            if (Math.abs(dy) < THRESHOLD) return;
            if (y <= 0) {
                visible = true;
            } else if (dy < 0) {
                visible = true;
            } else {
                visible = false;
                isOpen = false;
            }
            lastY = y;
        }
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    });
</script>

<nav
    class="fixed top-0 left-0 right-0 z-50 bg-transparent transition-transform duration-300 ease-out {visible ? 'translate-y-0' : '-translate-y-full'}"
>
    <div class="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-12 py-5 md:py-6">
        <a href="/" class="font-headline text-2xl md:text-3xl font-bold tracking-tight text-[var(--ea-primary-container)]">
            The Controversy
        </a>

        <div class="hidden md:flex items-center gap-10">
            <a href="/" class="font-headline text-lg text-[var(--ea-primary-container)] border-b-2 border-[var(--ea-primary-container)] pb-0.5 tracking-tight">Timeline</a>
            <a href="#topics" class="font-label text-[10px] uppercase tracking-[0.28em] font-bold text-[var(--ea-on-surface-variant)] hover:text-[var(--ea-secondary)] transition-colors">The Issue</a>
            <a href="/gods-solution" class="font-label text-[10px] uppercase tracking-[0.28em] font-bold text-[var(--ea-on-surface-variant)] hover:text-[var(--ea-secondary)] transition-colors">Solution</a>
            <a href="/our-part" class="font-label text-[10px] uppercase tracking-[0.28em] font-bold text-[var(--ea-on-surface-variant)] hover:text-[var(--ea-secondary)] transition-colors">Our Part</a>
            <a href="/topics" class="font-label text-[10px] uppercase tracking-[0.28em] font-bold text-[var(--ea-on-surface-variant)] hover:text-[var(--ea-secondary)] transition-colors">Watch</a>
        </div>

        <div class="flex items-center gap-4">
            <a href="/topics" class="hidden sm:inline-flex font-label text-[10px] uppercase tracking-[0.28em] font-bold text-[var(--ea-primary)] border-b-2 border-[var(--ea-secondary-fixed-dim)] pb-0.5 hover:border-[var(--ea-secondary)] transition-colors">
                Search
            </a>
            <button
                class="md:hidden p-2 text-[var(--ea-primary)]"
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
        <div class="md:hidden border-t border-[var(--ea-outline-variant)]/40 bg-[var(--ea-surface)]">
            <div class="px-6 py-5 flex flex-col gap-4 font-label text-xs uppercase tracking-[0.25em] text-[var(--ea-on-surface-variant)]">
                <a href="/" on:click={toggle} class="hover:text-[var(--ea-secondary)]">Timeline</a>
                <a href="#topics" on:click={toggle} class="hover:text-[var(--ea-secondary)]">The Issue</a>
                <a href="/gods-solution" on:click={toggle} class="hover:text-[var(--ea-secondary)]">Solution</a>
                <a href="/our-part" on:click={toggle} class="hover:text-[var(--ea-secondary)]">Our Part</a>
                <a href="/topics" on:click={toggle} class="hover:text-[var(--ea-secondary)]">Watch</a>
            </div>
        </div>
    {/if}
</nav>
