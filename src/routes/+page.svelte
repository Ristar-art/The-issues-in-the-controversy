<script>
    import HeroSection from '$routes/HeroSection.svelte';
    import KeySections from '$routes/KeySections.svelte';
    import KeyTopics from '$routes/KeyTopics.svelte';
    import Progress from '$routes/Progress.svelte';
    import Symbols from '$routes/Symbols.svelte';
    import TheTruth from '$routes/TheTruth.svelte';
    import GovernmentSection from '$routes/GovernmentSection.svelte';
    import FooterSection from '$lib/components/FooterSection.svelte';
    import CopyrightBar from '$lib/components/CopyrightBar.svelte';
    import SearchBar from '$lib/components/SearchBar.svelte';
    import FeaturedVideos from './FeaturedVideos.svelte';
    const { data } = $props();
    const { landing } = data;

    // SEO Configuration
    const siteUrl = 'https://the-issues-in-the-controversy.vercel.app'; // Replace with your actual domain
    const pageUrl = `${siteUrl}/`;
    // Temporarily commented out until you create the image
    // const imageUrl = `${siteUrl}/logoimage.jpg`; // Create this image (1200x630px)
    const imageUrl = `${siteUrl}/_.jpeg`; // Set to null until image is ready
</script>

<svelte:head>
    <!-- Primary Meta Tags -->
    <title>Biblical Prophecy Study - Daniel & Revelation</title>
    <meta name="title" content="Biblical Prophecy Study - Daniel & Revelation" />
    <meta name="description" content="Explore biblical prophecies from Daniel and Revelation, understand God's character, and discover divine solutions to spiritual warfare." />
    <meta name="keywords" content="biblical prophecy, book of daniel, book of revelation, character of god, prophetic symbols, kingdom of god, spiritual warfare, biblical studies, christian theology, end times prophecy" />
    <meta name="author" content="The Issues in the Controversy" />
    <meta name="robots" content="index, follow" />
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Content-Language" content="en" />
    
    <!-- Canonical URL -->
    <link rel="canonical" href={pageUrl} />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content={pageUrl} />
    <meta property="og:title" content="Biblical Prophecy Study - Daniel & Revelation" />
    <meta property="og:description" content="Explore biblical prophecies from Daniel and Revelation, understand God's character, and discover divine solutions to spiritual warfare." />
    {#if imageUrl}
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
    {/if}
    <meta property="og:site_name" content="The Issues in the Controversy" />
    <meta property="og:locale" content="en_US" />
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content={pageUrl} />
    <meta property="twitter:title" content="Biblical Prophecy Study - Daniel & Revelation" />
    <meta property="twitter:description" content="Explore biblical prophecies from Daniel and Revelation, understand God's character, and discover divine solutions to spiritual warfare." />
    {#if imageUrl}
        <meta property="twitter:image" content={imageUrl} />
    {/if}
    
    <!-- Additional Meta Tags -->
    <meta name="distribution" content="global" />
    <meta name="rating" content="general" />
    
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="/logoimage.jpg" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    
    <!-- Stylesheets -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css" rel="stylesheet" />
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet" />
    
    <!-- Google Fonts with preload for performance -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
    
    <!-- Structured Data (JSON-LD) -->
    {@html `<script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "The Issues in the Controversy",
        "url": "${siteUrl}",
        "description": "Comprehensive biblical prophecy study covering Daniel, Revelation, God's character, and spiritual warfare",
        "publisher": {
            "@type": "Organization",
            "name": "The Issues in the Controversy"
        },
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": "${siteUrl}/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
        }
    }
    </script>`}
    
    {@html `<script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Biblical Prophecy Study - Daniel & Revelation",
        "description": "Explore biblical prophecies from Daniel and Revelation, understand God's character, and discover divine solutions to spiritual warfare",
        "url": "${pageUrl}",
        "mainEntity": {
            "@type": "Article",
            "headline": "Biblical Prophecy and Spiritual Warfare Study",
            "description": "Comprehensive study covering the Book of Daniel, Revelation, prophetic symbols, and the character of God",
            "about": [
                {
                    "@type": "Thing",
                    "name": "Book of Daniel"
                },
                {
                    "@type": "Thing", 
                    "name": "Book of Revelation"
                },
                {
                    "@type": "Thing",
                    "name": "Biblical Prophecy"
                },
                {
                    "@type": "Thing",
                    "name": "Character of God"
                },
                {
                    "@type": "Thing",
                    "name": "Spiritual Warfare"
                }
            ]
        },
        "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "${pageUrl}"
                }
            ]
        }
    }
    </script>`}
    
    {@html `<script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        "name": "The Issues in the Controversy",
        "url": "${siteUrl}",
        "description": "Educational resource for biblical prophecy and Christian theology studies",
        "educationalCredentialAwarded": "Biblical Knowledge",
        "hasEducationalUse": "Study of Biblical Prophecy and Christian Theology"
    }
    </script>`}
</svelte:head>

<!-- Main content with semantic HTML structure -->
<div class="font-sans">
    <!-- Header with structured navigation -->
    
    <!-- Main content area -->
    <main>
        <!-- Hero section with H1 for SEO -->
        <HeroSection hero={landing.hero} />
        <SearchBar config={landing.searchBar} />
        <KeyTopics keyTopics={landing.keyTopics} />
        <Progress progress={landing.progress} /> 
        <FeaturedVideos featured={landing.featuredVideos} />
        <KeySections keySections={landing.keySections} />
        <Symbols symbols={landing.symbols} />
        <TheTruth truth={landing.truthSection} />
        <GovernmentSection government={landing.government} />
    </main>
    
    <!-- Footer -->
    <footer>
        <FooterSection footer={landing.footer} />
        <CopyrightBar footer={landing.footer} />
    </footer>
</div>

<style global>
    /* Apply the font families globally */
   
</style>