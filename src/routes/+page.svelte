<script>
    import HeaderBar from '$lib/components/HeaderBar.svelte';
    import Navigation from '$lib/components/Navigation.svelte';
    import HeroSection from '$lib/components/HeroSection.svelte';
    import KeySections from '$lib/components/KeySections.svelte';
    import KeyTopics from '$lib/components/KeyTopics.svelte';
    import Progress from '$lib/components/Progress.svelte';
    import Symbols from '$lib/components/Symbols.svelte';
    import TheTruth from '$lib/components/TheTruth.svelte';
    import GovernmentSection from '$lib/components/GovernmentSection.svelte';
    import FooterSection from '$lib/components/FooterSection.svelte';
    import CopyrightBar from '$lib/components/CopyrightBar.svelte';

    // SEO Configuration
    const siteUrl = 'https://yoursite.com'; // Replace with your actual domain
    const pageUrl = `${siteUrl}/`;
    const imageUrl = `${siteUrl}/og-image.jpg`; // Create this image (1200x630px)
</script>

<svelte:head>
    <!-- Primary Meta Tags -->
    <title>The Issues in the Controversy - Biblical Prophecy, Daniel & Revelation Study</title>
    <meta name="title" content="The Issues in the Controversy - Biblical Prophecy, Daniel & Revelation Study" />
    <meta name="description" content="Explore biblical prophecies from Daniel and Revelation, understand God's character, and discover the divine solution to spiritual warfare. Comprehensive study of prophetic symbols and the Kingdom of God." />
    <meta name="keywords" content="biblical prophecy, book of daniel, book of revelation, character of god, prophetic symbols, kingdom of god, spiritual warfare, biblical studies, christian theology, end times prophecy" />
    <meta name="author" content="The Issues in the Controversy" />
    <meta name="robots" content="index, follow" />
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- Canonical URL -->
    <link rel="canonical" href={pageUrl} />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content={pageUrl} />
    <meta property="og:title" content="The Issues in the Controversy - Biblical Prophecy Study" />
    <meta property="og:description" content="Explore biblical prophecies from Daniel and Revelation, understand God's character, and discover the divine solution to spiritual warfare." />
    <meta property="og:image" content={imageUrl} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:site_name" content="The Issues in the Controversy" />
    <meta property="og:locale" content="en_US" />
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content={pageUrl} />
    <meta property="twitter:title" content="The Issues in the Controversy - Biblical Prophecy Study" />
    <meta property="twitter:description" content="Explore biblical prophecies from Daniel and Revelation, understand God's character, and discover the divine solution to spiritual warfare." />
    <meta property="twitter:image" content={imageUrl} />
    
    <!-- Additional Meta Tags -->
    <meta name="language" content="English" />
    <meta name="geo.region" content="US" />
    <meta name="distribution" content="global" />
    <meta name="rating" content="general" />
    
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
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
        "name": "The Issues in the Controversy - Biblical Prophecy Study",
        "description": "Explore biblical prophecies from Daniel and Revelation, understand God's character, and discover the divine solution to spiritual warfare",
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
    <header>
        <HeaderBar />
        <Navigation />
    </header>
    
    <!-- Main content area -->
    <main>
        <!-- Hero section with H1 for SEO -->
        <HeroSection />
        
        <!-- Key sections with semantic structure -->
        <KeySections />
        <KeyTopics />
        <Progress />
        <Symbols />
        <TheTruth />
        <GovernmentSection />
    </main>
    
    <!-- Footer -->
    <footer>
        <FooterSection />
        <CopyrightBar />
    </footer>
</div>

<style global>
    /* Apply the font families globally */
    body {
        font-family: 'Open Sans', sans-serif;
    }
    
    h1, h2, h3, h4, h5, h6,
    .font-heading {
        font-family: 'Montserrat', sans-serif;
        font-weight: 600;
    }
    
    /* Your existing styles */
    .teal-dark {
        background-color: #0A5B5B;
        color: white;
    }
    .teal-light {
        background-color: #117777;
        color: white;
    }
    .accent-lime {
        background-color: #C2F970;
    }
    .text-teal {
        color: #0A5B5B;
    }
    .hexagon {
        clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    }
    .circle-accent {
        position: absolute;
        width: 70px;
        height: 70px;
        border-radius: 50%;
    }
</style>