<script>
    let { footer } = $props();

    // Brand glyphs are inlined rather than drawn from an icon font: the markup
    // here used `fab fa-*` classes, but Font Awesome is not loaded anywhere in
    // the project, so those rendered as empty circles.
    const SOCIAL_ICONS = {
        facebook: {
            label: 'Facebook',
            path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'
        },
        instagram: {
            label: 'Instagram',
            path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z'
        },
        tiktok: {
            label: 'TikTok',
            path: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z'
        }
    };

    // Saved content may still carry the old Font Awesome spellings.
    /** @type {Record<string, string>} */
    const ICON_ALIASES = {
        'facebook-f': 'facebook',
        'facebook-square': 'facebook',
        'tik-tok': 'tiktok'
    };

    /** @param {string | undefined} name */
    function iconFor(name) {
        const key = (name ?? '').toLowerCase();
        return /** @type {Record<string, { label: string; path: string }>} */ (SOCIAL_ICONS)[
            ICON_ALIASES[key] ?? key
        ];
    }
</script>

<div class="doc-footer">
    <div class="doc-footer__logo">
        <img src="/logoimage.jpg" alt="The Issues in the Controversy" />
    </div>

    {#if footer.tagline}
        <p class="doc-footer__tagline">{footer.tagline}</p>
    {/if}

    <div class="doc-footer__links">
        {#each footer.quickLinks ?? [] as link}
            <a href={link.href} class="doc-footer__link">{link.label}</a>
        {/each}
    </div>

    {#if footer.socialLinks?.length}
        <div class="doc-footer__social">
            {#each footer.socialLinks as social}
                {@const icon = iconFor(social.icon)}
                <!-- An unrecognised name is skipped rather than rendered as an
                     empty circle, which is how the icon-font version failed. -->
                {#if icon}
                    <a href={social.href} class="doc-footer__social-btn" aria-label={icon.label}>
                        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d={icon.path} />
                        </svg>
                    </a>
                {/if}
            {/each}
        </div>
    {/if}

    <div class="doc-footer__copyright">
        {footer.copyright ?? '© The Controversy Editorial. All Rights Reserved.'}
    </div>
</div>

<style>
    .doc-footer {
        width: 100%;
        background: var(--doc-bg-2);
        border-top: 1px solid var(--doc-line);
        padding: clamp(3rem, 8vw, 5rem) 1.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.75rem;
    }
    .doc-footer__logo img {
        width: 3.6rem; height: auto; border-radius: 4px;
        filter: contrast(1.05);
    }
    .doc-footer__tagline {
        font-family: 'Newsreader', Georgia, serif;
        font-style: italic;
        font-size: 1.05rem;
        color: var(--doc-muted);
        text-align: center;
        max-width: 32rem;
        margin: 0;
        line-height: 1.6;
    }
    .doc-footer__links {
        display: flex; flex-wrap: wrap; justify-content: center;
        gap: clamp(1.25rem, 4vw, 2.25rem);
    }
    .doc-footer__link {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.6875rem; letter-spacing: 0.24em; text-transform: uppercase;
        color: var(--doc-muted); text-decoration: none;
        transition: color 0.3s ease;
    }
    .doc-footer__link:hover { color: var(--doc-ember-soft); }
    .doc-footer__social { display: flex; gap: 0.75rem; }
    .doc-footer__social-btn {
        width: 2.4rem; height: 2.4rem; border-radius: 999px;
        border: 1px solid var(--doc-line);
        display: inline-flex; align-items: center; justify-content: center;
        color: var(--doc-muted);
        transition: border-color 0.3s ease, color 0.3s ease;
    }
    .doc-footer__social-btn:hover { border-color: var(--doc-ember); color: var(--doc-ember-soft); }
    .doc-footer__social-btn svg { width: 1.05rem; height: 1.05rem; display: block; }
    .doc-footer__copyright {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem; letter-spacing: 0.3em; text-transform: uppercase;
        color: var(--doc-dim);
        margin-top: 0.75rem;
        text-align: center;
    }
</style>
