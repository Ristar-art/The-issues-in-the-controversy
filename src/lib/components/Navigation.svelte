<script lang="ts">
    import { onMount } from 'svelte';

    let { landing = false } = $props();
    let isOpen = $state(false);
    let visible = $state(true);
    let isDarkBg = $state(false);
    let lastY = 0;
    const THRESHOLD = 8;

    function toggle() { isOpen = !isOpen; }

    function getLuminance(hex: string) {
        const rgb = hex.replace('#', '').match(/.{2}/g)?.map((x: string) => parseInt(x, 16) / 255) ?? [];
        const [r, g, b] = (rgb as number[]).map((c: number) => c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    }

    function parseRgb(color: string): [number, number, number, number] | null {
        const m = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
        if (!m) return null;
        return [parseInt(m[1]), parseInt(m[2]), parseInt(m[3]), m[4] !== undefined ? parseFloat(m[4]) : 1];
    }

    function rgbToHex(r: number, g: number, b: number) {
        return '#' + [r, g, b].map(x => Math.round(x).toString(16).padStart(2, '0')).join('');
    }

    function effectiveBgAt(x: number, y: number): [number, number, number] | null {
        const stack: [number, number, number, number][] = [];
        let el = document.elementFromPoint(x, y) as HTMLElement | null;
        const navEl = document.querySelector('nav');
        while (el) {
            if (navEl && (el === navEl || navEl.contains(el))) {
                el = el.parentElement;
                continue;
            }
            const c = getComputedStyle(el).backgroundColor;
            const rgba = parseRgb(c);
            if (rgba && rgba[3] > 0) {
                stack.push(rgba);
                if (rgba[3] >= 1) break;
            }
            el = el.parentElement;
        }
        if (!stack.length) {
            const bodyRgba = parseRgb(getComputedStyle(document.body).backgroundColor);
            if (bodyRgba) stack.push(bodyRgba);
        }
        if (!stack.length) return null;
        let [r, g, b] = [255, 255, 255];
        for (let i = stack.length - 1; i >= 0; i--) {
            const [sr, sg, sb, sa] = stack[i];
            r = sr * sa + r * (1 - sa);
            g = sg * sa + g * (1 - sa);
            b = sb * sa + b * (1 - sa);
        }
        return [r, g, b];
    }

    function checkBackground() {
        const navEl = document.querySelector('nav') as HTMLElement | null;
        const rect = navEl?.getBoundingClientRect();
        const sampleY = rect ? rect.bottom + 4 : 30;
        const xs = [window.innerWidth * 0.25, window.innerWidth * 0.5, window.innerWidth * 0.75];
        let darkVotes = 0;
        let total = 0;
        for (const x of xs) {
            const rgb = effectiveBgAt(x, sampleY);
            if (!rgb) continue;
            total++;
            if (getLuminance(rgbToHex(rgb[0], rgb[1], rgb[2])) < 0.5) darkVotes++;
        }
        if (total > 0) isDarkBg = darkVotes * 2 >= total;
    }

    onMount(() => {
        lastY = window.scrollY;
        checkBackground();

        const observer = new MutationObserver(checkBackground);
        observer.observe(document.body, { attributes: true, attributeFilter: ['style', 'class'], subtree: true, childList: true });

        let scrollRaf = 0;
        function onScroll() {
            const y = window.scrollY;
            const dy = y - lastY;
            if (Math.abs(dy) >= THRESHOLD) {
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
            if (!scrollRaf) {
                scrollRaf = requestAnimationFrame(() => {
                    scrollRaf = 0;
                    checkBackground();
                });
            }
        }
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', checkBackground);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', checkBackground);
            observer.disconnect();
        };
    });

    let textClass = $derived(isDarkBg ? 'text-white' : 'text-[var(--ea-primary-container)]');
    let mutedClass = $derived(isDarkBg ? 'text-white/70 hover:text-white' : 'text-[var(--ea-on-surface-variant)] hover:text-[var(--ea-secondary)]');
    let logoClass = $derived(isDarkBg ? 'text-white' : 'text-[var(--ea-primary-container)]');
    let borderClass = $derived(isDarkBg ? 'border-white' : 'border-[var(--ea-primary-container)]');
    let mobileBgClass = $derived(isDarkBg ? 'bg-black/90' : 'bg-[var(--ea-surface)]');
</script>

<nav
    class="fixed top-0 left-0 right-0 z-50 bg-[var(--ea-surface)] transition-transform duration-300 ease-out {visible ? 'translate-y-0' : '-translate-y-full'}"
>
    <div class="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-12 py-5 md:py-6">
        <a href="/" class="font-headline text-2xl md:text-3xl font-bold tracking-tight {logoClass}">
            <img src="/logoimage.jpg" style="width: 4rem; height: auto; ;" >
        </a>

        <div class="hidden md:flex items-center gap-10">
            <a href="/" class="font-headline text-lg {textClass} border-b-2 {borderClass} pb-0.5 tracking-tight">Home</a>
            <a href="/topics" class="font-label text-xs uppercase tracking-[0.28em] font-bold {mutedClass} transition-colors">Topics</a>
            <a href="/about" class="font-label text-xs uppercase tracking-[0.28em] font-bold {mutedClass} transition-colors">About</a>
            <a href="/blog" class="font-label text-xs uppercase tracking-[0.28em] font-bold {mutedClass} transition-colors">Blog</a>
            <a href="/contact" class="font-label text-xs uppercase tracking-[0.28em] font-bold {mutedClass} transition-colors">Contact</a>
        </div>

        <div class="flex items-center gap-4">
            <a href="/topics" class="hidden sm:inline-flex font-label text-xs uppercase tracking-[0.28em] font-bold {textClass} border-b-2 border-[var(--ea-secondary-fixed-dim)] pb-0.5 hover:border-[var(--ea-secondary)] transition-colors">
                Search
            </a>
            <button
                class="md:hidden {textClass}"
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
        <div class="md:hidden border-t border-[var(--ea-outline-variant)]/40 {mobileBgClass}">
            <div class="px-6 py-5 flex flex-col gap-4 font-label text-xs uppercase tracking-[0.25em] {mutedClass}">
                <a href="/" on:click={toggle} class="hover:text-[var(--ea-secondary)]">Timeline</a>
                <a href="#topics" on:click={toggle} class="hover:text-[var(--ea-secondary)]">The Issue</a>
                <a href="/gods-solution" on:click={toggle} class="hover:text-[var(--ea-secondary)]">Solution</a>
                <a href="/our-part" on:click={toggle} class="hover:text-[var(--ea-secondary)]">Our Part</a>
                <a href="/topics" on:click={toggle} class="hover:text-[var(--ea-secondary)]">Watch</a>
            </div>
        </div>
    {/if}
</nav>
