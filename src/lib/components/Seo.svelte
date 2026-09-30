<script>
    import { page } from '$app/stores';
    import {
        SITE_NAME,
        SITE_DESCRIPTION,
        DEFAULT_IMAGE,
        DEFAULT_IMAGE_WIDTH,
        DEFAULT_IMAGE_HEIGHT,
        absolute
    } from '$lib/seo';

    /**
     * Every public page renders exactly one of these. Keeping the head in one
     * component is what stops the tags drifting apart again: a page supplies
     * the two or three things that are actually its own, and the canonical,
     * Open Graph and Twitter blocks are derived from them.
     */
    /** @type {{ title: string, description?: string, keywords?: string, image?: string, imageWidth?: string, imageHeight?: string, type?: string, path?: string, noindex?: boolean, published?: string, modified?: string, jsonld?: unknown }} */
    let {
        // The page-specific part of the title. The site name is appended
        // unless `brand` is false or the title already carries it.
        title,
        description = SITE_DESCRIPTION,
        keywords = '',
        image = DEFAULT_IMAGE,
        // Only declared when they are actually known. Advertising the wrong
        // size makes some scrapers drop the card image altogether.
        imageWidth = undefined,
        imageHeight = undefined,
        type = 'website',
        // Defaults to the URL actually being served, so a page can never
        // canonicalise to the wrong place by forgetting to pass it.
        path = undefined,
        noindex = false,
        published = '',
        modified = '',
        jsonld = null
    } = $props();

    let fullTitle = $derived(title?.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`);
    let url = $derived(absolute(path ?? $page.url.pathname));
    let img = $derived(absolute(image));

    let width = $derived(imageWidth ?? (image === DEFAULT_IMAGE ? DEFAULT_IMAGE_WIDTH : null));
    let height = $derived(imageHeight ?? (image === DEFAULT_IMAGE ? DEFAULT_IMAGE_HEIGHT : null));

    // Descriptions are written as prose elsewhere; a snippet longer than
    // ~160 characters is truncated by search engines anyway.
    let summary = $derived(
        description.length > 300 ? `${description.slice(0, 297).trimEnd()}…` : description
    );

    // A closing script tag inside the JSON-LD payload would end the block
    // early, so every `<` is escaped — still valid JSON to a parser.
    let ld = $derived(jsonld ? JSON.stringify(jsonld).replace(/</g, '\\u003c') : '');
</script>

<svelte:head>
    <title>{fullTitle}</title>
    <meta name="description" content={summary} />
    {#if keywords}<meta name="keywords" content={keywords} />{/if}
    <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
    <link rel="canonical" href={url} />

    <meta property="og:type" content={type} />
    <meta property="og:site_name" content={SITE_NAME} />
    <meta property="og:url" content={url} />
    <meta property="og:title" content={fullTitle} />
    <meta property="og:description" content={summary} />
    <meta property="og:image" content={img} />
    {#if width}<meta property="og:image:width" content={width} />{/if}
    {#if height}<meta property="og:image:height" content={height} />{/if}
    <meta property="og:locale" content="en_US" />
    {#if type === 'article' && published}
        <meta property="article:published_time" content={published} />
    {/if}
    {#if type === 'article' && modified}
        <meta property="article:modified_time" content={modified} />
    {/if}

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={fullTitle} />
    <meta name="twitter:description" content={summary} />
    <meta name="twitter:image" content={img} />

    {#if ld}
        {@html `<script type="application/ld+json">${ld}<\/script>`}
    {/if}
</svelte:head>
