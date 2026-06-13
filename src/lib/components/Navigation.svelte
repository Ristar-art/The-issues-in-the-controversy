<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from '$app/stores';

    let { landing = false } = $props();
    let isOpen = $state(false);
    let visible = $state(true);
    let scrolled = $state(false);
    let theme = $state<'dark' | 'light'>('dark');
    let lastY = 0;
    const THRESHOLD = 8;

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/topics', label: 'Topics' },
        { href: '/about', label: 'About' },
        { href: '/blog', label: 'Blog' },
        { href: '/contact', label: 'Contact' }
    ];

    let pathname = $derived($page.url.pathname);
    function isActive(href: string) {
        if (href === '/') return pathname === '/';
        return pathname === href || pathname.startsWith(href + '/');
    }

    function toggle() { isOpen = !isOpen; }

    function toggleTheme() {
        theme = theme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-doc-theme', theme);
        try { localStorage.setItem('doc-theme', theme); } catch (e) { /* ignore */ }
    }

    onMount(() => {
        theme = document.documentElement.getAttribute('data-doc-theme') === 'light' ? 'light' : 'dark';
        lastY = window.scrollY;
        scrolled = lastY > 12;

        let scrollRaf = 0;
        function onScroll() {
            const y = window.scrollY;
            const dy = y - lastY;
            if (Math.abs(dy) >= THRESHOLD) {
                if (y <= 0) visible = true;
                else if (dy < 0) visible = true;
                else { visible = false; isOpen = false; }
                lastY = y;
            }
            if (!scrollRaf) {
                scrollRaf = requestAnimationFrame(() => {
                    scrollRaf = 0;
                    scrolled = window.scrollY > 12;
                });
            }
        }
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    });
</script>

<nav
    class="doc-nav"
    class:doc-nav--hero={landing && !scrolled}
    class:doc-nav--hidden={!visible}
>
    <div class="doc-nav__inner">
        <a href="/" class="doc-nav__logo" aria-label="Home">
            <img src="/logoimage.jpg" alt="The Issues in the Controversy" />
        </a>

        <div class="doc-nav__links">
            {#each navLinks as link}
                <a
                    href={link.href}
                    class={link.href === '/' ? 'doc-nav__home' : 'doc-nav__link'}
                    class:is-active={isActive(link.href)}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                >
                    {link.label}
                </a>
            {/each}
        </div>

        <div class="doc-nav__actions">
            <a href="/topics" class="doc-nav__search">Search</a>
            <button
                class="doc-nav__theme"
                on:click={toggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
            >
                {#if theme === 'dark'}
                    <!-- sun -->
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                        <circle cx="12" cy="12" r="4" stroke-width="1.6" />
                        <path stroke-linecap="round" stroke-width="1.6" d="M12 2v2.5M12 19.5V22M4.22 4.22l1.77 1.77M18.01 18.01l1.77 1.77M2 12h2.5M19.5 12H22M4.22 19.78l1.77-1.77M18.01 5.99l1.77-1.77" />
                    </svg>
                {:else}
                    <!-- moon -->
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                    </svg>
                {/if}
            </button>
            <button
                class="doc-nav__burger"
                on:click={toggle}
                aria-label="Toggle menu"
                aria-expanded={isOpen}
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
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
        <div class="doc-nav__mobile">
            {#each navLinks as link}
                <a
                    href={link.href}
                    on:click={toggle}
                    class:is-active={isActive(link.href)}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                >
                    {link.label}
                </a>
            {/each}
        </div>
    {/if}
</nav>

<style>
    .doc-nav {
        position: fixed;
        top: 0; left: 0; right: 0;
        z-index: 50;
        border-bottom: 1px solid var(--doc-line);
        background: var(--doc-nav-bg);
        backdrop-filter: blur(14px) saturate(1.1);
        -webkit-backdrop-filter: blur(14px) saturate(1.1);
        transition: transform 0.4s ease, background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease;
    }
    /* Transparent cinematic veil — only over the landing hero at the top */
    .doc-nav--hero {
        background: linear-gradient(to bottom, var(--doc-nav-veil), transparent);
        backdrop-filter: none;
        -webkit-backdrop-filter: none;
        border-bottom-color: transparent;
    }
    .doc-nav--hidden { transform: translateY(-100%); }

    .doc-nav__inner {
        max-width: 80rem;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.9rem clamp(1.5rem, 5vw, 3.5rem);
    }

    .doc-nav__logo { display: inline-flex; align-items: center; }
    .doc-nav__logo img {
        width: 3.4rem; height: auto; border-radius: 4px;
        filter: contrast(1.05);
    }

    .doc-nav__links { display: none; align-items: center; gap: clamp(1.5rem, 3vw, 2.75rem); }
    @media (min-width: 900px) { .doc-nav__links { display: flex; } }

    .doc-nav__home {
        font-family: 'Newsreader', Georgia, serif;
        font-size: 1.25rem;
        color: var(--doc-ink);
        text-decoration: none;
        border-bottom: 1px solid transparent;
        padding-bottom: 2px;
        line-height: 1;
        transition: color 0.3s ease, border-color 0.3s ease;
    }
    .doc-nav__home:hover { color: var(--doc-ember-soft); }

    .doc-nav__link {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.6875rem;
        font-weight: 500;
        letter-spacing: 0.26em;
        text-transform: uppercase;
        color: var(--doc-muted);
        text-decoration: none;
        border-bottom: 1px solid transparent;
        padding-bottom: 2px;
        line-height: 1;
        transition: color 0.3s ease, border-color 0.3s ease;
    }
    .doc-nav__link:hover { color: var(--doc-ember-soft); }

    /* Active-route indicator — applies to whichever link matches the path */
    .doc-nav__home.is-active,
    .doc-nav__link.is-active {
        color: var(--doc-ink);
        border-bottom-color: var(--doc-ember);
    }
    .doc-nav__link.is-active { color: var(--doc-ember-soft); }

    .doc-nav__actions { display: flex; align-items: center; gap: 1.25rem; }
    .doc-nav__search {
        display: none;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.6875rem;
        font-weight: 500;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        color: var(--doc-ink);
        text-decoration: none;
        border: 1px solid var(--doc-line);
        padding: 0.55rem 1rem;
        border-radius: 2px;
        transition: border-color 0.3s ease, color 0.3s ease;
    }
    @media (min-width: 640px) { .doc-nav__search { display: inline-flex; } }
    .doc-nav__search:hover { border-color: var(--doc-ember); color: var(--doc-ember-soft); }

    .doc-nav__theme {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2.4rem;
        height: 2.4rem;
        border: 1px solid var(--doc-line);
        border-radius: 999px;
        background: none;
        cursor: pointer;
        color: var(--doc-ink);
        transition: border-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
    }
    .doc-nav__theme:hover { border-color: var(--doc-ember); color: var(--doc-ember-soft); transform: rotate(-12deg); }
    .doc-nav__theme svg { width: 1.15rem; height: 1.15rem; }

    .doc-nav__burger {
        display: inline-flex;
        background: none; border: none; cursor: pointer;
        color: var(--doc-ink);
        padding: 0.25rem;
    }
    .doc-nav__burger svg { width: 1.6rem; height: 1.6rem; }
    @media (min-width: 900px) { .doc-nav__burger { display: none; } }

    .doc-nav__mobile {
        background: var(--doc-nav-mobile-bg);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        border-top: 1px solid var(--doc-line);
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        padding: 1rem clamp(1.5rem, 5vw, 3.5rem) 1.5rem;
    }
    .doc-nav__mobile a {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.75rem;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        color: var(--doc-muted);
        text-decoration: none;
        padding: 0.6rem 0;
        border-bottom: 1px solid var(--doc-line-soft);
        transition: color 0.3s ease;
    }
    .doc-nav__mobile a:hover { color: var(--doc-ember-soft); }
    .doc-nav__mobile a.is-active { color: var(--doc-ember); }
</style>
