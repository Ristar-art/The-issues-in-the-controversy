<script>
    let { footer } = $props();
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
                <a href={social.href} class="doc-footer__social-btn" aria-label={social.icon}>
                    <i class={`fab fa-${social.icon}`}></i>
                </a>
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
    .doc-footer__copyright {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem; letter-spacing: 0.3em; text-transform: uppercase;
        color: var(--doc-dim);
        margin-top: 0.75rem;
        text-align: center;
    }
</style>
