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
    const siteUrl = 'https://the-issues-in-the-controversy.vercel.app'; // Replace with your actual domain
    const pageUrl = `${siteUrl}/`;
    // Temporarily commented out until you create the image
    // const imageUrl = `${siteUrl}/og-image.jpg`; // Create this image (1200x630px)
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
    <header>
        <HeaderBar />
        <Navigation />
    </header>
    
    <!-- Main content area -->
    <main>
        <!-- Hero section with H1 for SEO -->
        <HeroSection />
        
        <!-- SEO Content Section for Word Count -->
        <section class="py-12 bg-white">
            <div class="container mx-auto px-4">
                <div class="max-w-4xl mx-auto">
                    <h2 class="text-2xl font-bold text-teal mb-6">Understanding the Great Controversy Between Good and Evil</h2>
                    <div class="prose prose-lg text-gray-600 space-y-4">
                        <p>
                            Throughout history, humanity has witnessed the unfolding of what Scripture calls the great controversy - an epic conflict between the forces of good and evil, truth and deception, God's kingdom and Satan's rebellion. This controversy touches every aspect of human existence and shapes the very fabric of our spiritual reality.
                        </p>
                        <p>
                            The biblical books of Daniel and Revelation provide us with prophetic insights into this cosmic conflict, revealing how God's character stands in stark contrast to Satan's accusations and deceptions. These prophecies are not merely historical accounts, but living testimonies that speak directly to our contemporary challenges and spiritual battles.
                        </p>
                        <p>
                            In the book of Daniel, we discover a panoramic view of world history from ancient Babylon to the establishment of God's eternal kingdom. The prophetic visions reveal how earthly powers rise and fall, while God's sovereignty remains constant throughout the ages. Each prophetic symbol - from the great statue in Nebuchadnezzar's dream to the beasts emerging from the sea - carries profound meaning for understanding our place in the timeline of prophecy.
                        </p>
                        <p>
                            The book of Revelation continues this prophetic narrative, unveiling the final chapters of the great controversy. Through symbolic language and divine imagery, John's vision reveals how God will ultimately vindicate His character and establish His kingdom of righteousness. The prophecies speak of both judgment and mercy, showing how God's justice and love work together in perfect harmony.
                        </p>
                        <p>
                            Central to understanding these prophecies is recognizing the character of God as revealed through His interactions with humanity. Unlike the harsh, vindictive deity portrayed by Satan's accusations, Scripture reveals a God of infinite love, mercy, and justice. His government operates on principles of freedom, service, and self-sacrificing love - principles that stand in direct opposition to Satan's kingdom of force, selfishness, and rebellion.
                        </p>
                        <p>
                            The prophetic symbols found throughout Daniel and Revelation serve as a divine language, communicating spiritual truths through earthly imagery. Understanding these symbols - whether beasts representing kingdoms, women symbolizing religious bodies, or geographical features representing populated areas - unlocks the deeper meaning of prophetic messages and their application to our lives.
                        </p>
                        <p>
                            As we study the trajectory of God's kingdom over the past 2000 years, we can trace His hand in history, working through human events to accomplish His purposes. From the establishment of the early Christian church to the great religious awakenings throughout history, God has been preparing His people for the final culmination of the controversy.
                        </p>
                        <p>
                            The gospel of the kingdom represents God's ultimate solution to the sin problem. It encompasses not just personal salvation, but the restoration of God's original plan for humanity and the universe. This gospel reveals how God's government of love will ultimately triumph over Satan's kingdom of force and selfishness.
                        </p>
                        <p>
                            Understanding our part in this great controversy is crucial for every believer. We are not merely spectators in this cosmic conflict, but active participants called to represent God's character to a watching universe. Our choices, our witness, and our faithfulness contribute to the vindication of God's character and the advancement of His kingdom.
                        </p>
                        <p>
                            The study of biblical prophecy is not an academic exercise, but a practical guide for navigating the challenges of our time. As we understand the issues at stake in the great controversy, we are better equipped to make decisions that align with God's will and purpose for our lives. This knowledge empowers us to stand firm in faith, knowing that God's ultimate victory is assured.
                        </p>
                    </div>
                </div>
            </div>
        </section>
        
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