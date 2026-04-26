<script>
    import SearchBar from '$lib/components/SearchBar.svelte';

    const { data } = $props();
    const landing = data.landing ?? {};

    const hero = '/Homescreen.png';

    // ----- Hero content -----
    const heroCta = { label: 'Explore Topics', href: '/topics' };
    const heroCtaSecondary = { label: 'Read the Brief', href: '#topics' };

    // ----- Key Topics -----
    const keyTopicFeature = {
        title: "The Overview of Daniel and Revelation",
        description: "A panoramic view of the prophecies in the book of daniel and revelation.",
        href:"the-overview-of-daniel-and-revelations"
    }
    // const keyTopicSecond = keyTopicsItems[1];
    const keyTopicSecond = {
        title: "Analysis of the Judgment of the kingdoms",
        description: "Understanding the nature of the judgement on Daniel 7 and Revelation 4 -.",
        href:"analysis-of-the-judgment-of-the-kingdoms"
    }
const keyTopicThird ={
    title: "The character of God",
        description: "A deep dive into understanding the kind of person our Father is.",
        href:"the-character-of-god"
}
    // const keyTopicFourth = keyTopicsItems[3];
    const keyTopicFourth ={
        title: "The Gospel of the Kingdom",
        description: "This gospel of the kingdom will be preached in the whole world. Matthew 24:14.",
        href:"the-gospel-of-the-kingdom"
    }

    // ----- Historical Timeline (Progress) -----
    const progressTitle = " What are the Seven Seals in the book of Revelation?";
    const progressEyebrow = 'The state of the Church, the kingdom of Christ';
    const progressDefaults = [
        { era: '1st Seal', title: 'The White Horse', body: 'The church in its infacy, while it was still pure, in the age of the aposltes.', img:"/white horse.jpg" },
        { era: '2nd Seal', title: 'The Red Horse', body: 'The church in the age of compromise, while it was being widley adopted and also being corppted.',img:"/red horse.jpg" },
        { era: '3th Seal', title: 'The Black Horse', body: 'The age where the word of God was being sold by the church.',img:"/black horse.jpg" },
        { era: '4th Seal', title: 'The Pale Horse', body: 'An era where the curch became the sounce of death',img:"/pale horse.jpg" },
        { era: '5th Seal', title: 'The Souls Under The Altar', body: 'The period of the pre-advent judgement begins. The saints of God are vindicated.',img:"/the fith seal.jpg" },
        { era: '6th Seal', title: 'The Apocalitic Events', body: 'The spirit of God and His protection are withdrawn form earth.',img:"/Appocalips.jpg" },
        { era: '7th Seal', title: 'The Seven Trampets', body: 'The Close of Porobation. There is no more grace given.',img:"/seven trampets.jpg" }

    ];
 
    let timelineScroller;
    function scrollTimelineBy(dx) {
        if (timelineScroller) timelineScroller.scrollBy({ left: dx, behavior: 'smooth' });
    }

    // ----- Featured Videos (Visual Argument) -----
    const videos = [
        { title: 'Itrodction to The Series', embedUrl: 'https://www.youtube.com/embed/Xu8IJtZBdqc' },
        { title: 'Foundations', embedUrl: 'https://www.youtube.com/embed/8KA32Gaam7Y' },
        { title: "A Bird's Eye View", embedUrl: 'https://www.youtube.com/embed/WMXqrUp98RY' },
        { title: 'The Kingdom of God', embedUrl: 'https://www.youtube.com/embed/Sj43-YLaFQc' }
    ];
    const featureVideo = videos[0];
    const sideVideos = videos.slice(1, 4);
    let selectedVideo = $state(null);

    function getVideoId(url) {
        if (!url) return null;
        if (url.includes('/embed/')) return url.split('/embed/')[1]?.split('?')[0];
        if (url.includes('youtu.be/')) return url.split('youtu.be/')[1]?.split('?')[0];
        try {
            const parsed = new URL(url);
            return parsed.searchParams.get('v');
        } catch { return null; }
    }
    function getThumbnailUrl(id) { return `https://img.youtube.com/vi/${id}/hqdefault.jpg`; }
    function openModal(video) { selectedVideo = video; }
    function closeModal() { selectedVideo = null; }

    // ----- Key Sections (The Issue / Solution / Our Part) -----
    const keySectionItems =[
        {
            title: "The Issue",
            description: "What are the key areas of satans assault and why it worked.",
        cta :{
            href:"the-issue",
            label:"Read More"
        }
    },
        {
            title:"God's Solution", 
            description:"What is the God's answer to the challenges layed against Him by satan?",
        cta:{
            href:"gods-solution",
            label:"Read More"
        },
    },
        {
            title: "Our Part",
            description:"Understanding our role in the greater plan and how we can contribute positively.",
        cta:{
            href:"our-part",
            label:"Read More"
        },
    },
    
    ]
    const keySectionStyles = [
        { bg: 'bg-[var(--ea-surface-container)]', text: 'text-[var(--ea-primary)]', subtext: 'text-[var(--ea-on-surface-variant)]', border: 'border-l-4 border-[var(--ea-secondary)]', iconColor: 'text-[var(--ea-secondary)]/50', italic: false, linkDark: false },
        { bg: 'bg-[var(--ea-primary-container)] text-white', text: '!text-white', subtext: '!text-white/85', border: '', iconColor: 'text-[var(--ea-primary-fixed)]/40', italic: true, linkDark: true },
        { bg: 'bg-[var(--ea-peach)]', text: 'text-[var(--ea-primary)]', subtext: 'text-[var(--ea-on-secondary-container)]', border: '', iconColor: 'text-[var(--ea-secondary)]/50', italic: false, linkDark: false }
    ];
    const keySectionIcons = [
        'M3.75 3.75l16.5 16.5M12 3v4.5m0 9V21m-8.25-9H3m18 0h-.75',
        'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z',
        'M4.5 12.75l6 6 9-13.5'
    ];

    // ----- Symbols (Deciphering the Code) -----
    const  symbolsItems =[
        
        {title: "A Beast",
        description: "Kingdom/Politica Power" 
        },
        {title: "A Woman",
        description: "A Religious Body" 
        },
        {title: "Earth and Water",
        description: "Geography" 
        },
    ]
        function symbolIcon(item) {
        if (item?.icon) return item.icon;
        const t = (item?.title ?? '').toLowerCase();
        if (t.includes('beast')) return 'pets';
        if (t.includes('woman') || t.includes('women')) return 'woman_2';
        if (t.includes('water') && t.includes('earth')) return 'public';
        if (t.includes('water')) return 'water_drop';
        if (t.includes('earth')) return 'public';
        if (t.includes('wind')) return 'air';
        if (t.includes('horn') || t.includes('king')) return 'crown';
        if (t.includes('fire')) return 'local_fire_department';
        if (t.includes('star')) return 'star';
        return 'auto_awesome';
    }

    // ----- The Truth (Systemic Synthesis) -----
     const truthPoints = [
      "Who and what is God the Father?",
      "What is the identity of Jesus Christ, The Word of God?",
      "Is the Holy Spirit a self existand being like the Father and Jesus Christ?"

    ];

    // ----- Government (Governing the Soul) -----
    // const governmentItems = la nding.government?.items ?? [];
        const governmentItems =  [
            {
                title:"The Legal Law",
                description:"The governance that works from outside to compel behaviour."
            },
            {
                 title:"The Nature Law",
                description:"The governance that works from within to influence behaviour."
            },
            {
                title:"The Politics of the Univers",
                description:"The role of politict in how the masses chose the form of goverment they want to be under."
            }
        ];

    function governmentIcon(item) {
        if (item?.icon) return item.icon;
        const t = (item?.title ?? '').toLowerCase();
        if (t.includes('legal') || t.includes('law') && !t.includes('nature')) return 'gavel';
        if (t.includes('nature')) return 'eco';
        if (t.includes('politic')) return 'how_to_vote';
        if (t.includes('conscience') || t.includes('soul')) return 'psychology';
        if (t.includes('church')) return 'church';
        if (t.includes('state') || t.includes('civic')) return 'account_balance';
        if (t.includes('freedom') || t.includes('liberty')) return 'flag';
        return 'balance';
    }

   
    // ----- SEO -----
    const siteUrl = 'https://the-issues-in-the-controversy.vercel.app';
    const pageUrl = `${siteUrl}/`;
    const imageUrl = `${siteUrl}/_.jpeg`;
</script>

<svelte:head>
    <title>Biblical Prophecy Study - Daniel & Revelation</title>
    <meta name="title" content="Biblical Prophecy Study - Daniel & Revelation" />
    <meta name="description" content="Explore biblical prophecies from Daniel and Revelation, understand God's character, and discover divine solutions to spiritual warfare." />
    <meta name="keywords" content="biblical prophecy, book of daniel, book of revelation, character of god, prophetic symbols, kingdom of god, spiritual warfare" />
    <meta name="author" content="The Issues in the Controversy" />
    <meta name="robots" content="index, follow" />
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="canonical" href={pageUrl} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={pageUrl} />
    <meta property="og:title" content="Biblical Prophecy Study - Daniel & Revelation" />
    <meta property="og:description" content="Explore biblical prophecies from Daniel and Revelation, understand God's character, and discover divine solutions to spiritual warfare." />
    <meta property="og:image" content={imageUrl} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:site_name" content="The Issues in the Controversy" />
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:title" content="Biblical Prophecy Study - Daniel & Revelation" />
    <meta property="twitter:description" content="Explore biblical prophecies from Daniel and Revelation, understand God's character, and discover divine solutions to spiritual warfare." />
    <meta property="twitter:image" content={imageUrl} />
    <link rel="icon" type="image/x-icon" href="/logoimage.jpg" />
</svelte:head>

<div class="font-body ea-root">
    <main>

        <!-- ======================================================== -->
        <!-- HERO — The Endgame of Heaven                               -->
        <!-- ======================================================== -->
        <section class="relative">
            <div class="relative overflow-hidden min-h-[560px] md:min-h-[720px] lg:h-screen lg:max-h-[1000px] flex items-center">
                <img src={hero} alt="" aria-hidden="true" class="absolute inset-0 w-full h-full object-cover" />
                <div class="absolute inset-0 bg-gradient-to-tr from-[var(--ea-primary)]/85 via-[var(--ea-primary)]/40 to-transparent"></div>
                <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--ea-primary)]/50"></div>

                <div class="relative z-10 w-full px-6 md:px-12 lg:px-16 py-16 md:py-24 max-w-4xl">
                    <p class="ea-eyebrow-light mb-6">What does The Bible Says About The End Times?</p>
                    <h1 class="font-headline !text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight mb-8">
                        The Endgame
of <br />of <span class="italic font-light">Heaven</span>
                    </h1>
                    <p class="font-body !text-[var(--ea-primary-fixed)] text-base md:text-lg max-w-xl leading-relaxed mb-10 fl">
I beheld till the thrones were cast down, and the Ancient of days did sit, whose garment was white as snow, and the hair of his head like the pure wool: his throne was like the fiery flame, and his wheels as burning fire.

A fiery stream issued and came forth from before him: thousand thousands ministered unto him, and ten thousand times ten thousand stood before him: the judgment was set, and the books were opened.  <span class="italic font-light">Daniel 7:9-10</span>                   
                  </p>
<div class="flex flex-wrap gap-4">
                        <a href={heroCta.href} class="ea-btn-primary">
                            {heroCta.label}
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                            </svg>
                        </a>
                        <a href={heroCtaSecondary.href} class="ea-btn-on-dark">{heroCtaSecondary.label}</a>
                    </div>
                </div>
                
            </div>
            
        </section>

        <!-- ======================================================== -->
        <!-- SEARCH BAR (kept as component)                             -->
        <!-- ======================================================== -->
        {#if landing.searchBar}
            <SearchBar config={landing.searchBar} />
        {/if}

        <!-- ======================================================== -->
        <!-- KEY TOPICS — Foundational Overviews                        -->
        <!-- ======================================================== -->
        <section id="topics" class="px-6 md:px-12 py-20 md:py-32">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
                <!-- Feature card (2-col) -->
                {#if keyTopicFeature}
                    <a href={`/${keyTopicFeature.href ?? 'topics'}`} class="md:col-span-2 bg-[var(--ea-surface-low)] hover:bg-[var(--ea-surface-high)] p-8 md:p-16 rounded-xl flex flex-col justify-between group transition-colors">
                        <div>
                            <svg class="w-14 h-14 text-[var(--ea-primary)] mb-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.4" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                            </svg>
                            <h2 class="font-headline text-4xl md:text-5xl text-[var(--ea-primary)] mb-6 leading-tight">{keyTopicFeature.title}</h2>
                            <p class="font-body text-[var(--ea-on-surface-variant)] max-w-md leading-relaxed">{keyTopicFeature.description}</p>
                        </div>
                        <div class="pt-10">
                            <span class="font-label text-[10px] uppercase tracking-[0.28em] text-[var(--ea-secondary)] font-bold group-hover:underline">Deep Dive</span>
                        </div>
                    </a>
                {/if}

                <!-- Dark primary card -->
                {#if keyTopicSecond}
                    <a href={`/${keyTopicSecond.href ?? 'topics'}`} class="bg-[var(--ea-primary)] hover:bg-[var(--ea-primary-container)] p-10 md:p-12 rounded-xl flex flex-col justify-end text-white transition-colors group">
                        <h3 class="font-headline text-3xl mb-4 !text-white leading-tight">{keyTopicSecond.title}</h3>
                        <p class="font-body !text-white/80 text-sm leading-relaxed mb-6">{keyTopicSecond.description}</p>
                        <svg class="w-8 h-8 text-[var(--ea-primary-fixed-dim)] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.4" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                        </svg>
                    </a>
                {/if}

                <!-- Surface card with secondary accent -->
                {#if keyTopicThird}
                    <a href={`/${keyTopicThird.href ?? 'topics'}`} class="bg-[var(--ea-surface-container)] hover:bg-[var(--ea-surface-high)] p-10 md:p-12 rounded-xl flex flex-col justify-end border-b-4 border-[var(--ea-secondary)] transition-colors group">
                        <h3 class="font-headline text-3xl text-[var(--ea-primary)] mb-4 leading-tight">{keyTopicThird.title}</h3>
                        <p class="font-body text-[var(--ea-on-surface-variant)] text-sm leading-relaxed mb-6">{keyTopicThird.description}</p>
                        <svg class="w-8 h-8 text-[var(--ea-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.4" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                        </svg>
                    </a>
                {/if}

                <!-- Full-width 4th card -->
                {#if keyTopicFourth}
                    <a href={`/${keyTopicFourth.href ?? 'topics'}`} class="md:col-span-4 bg-[var(--ea-surface-lowest)] ea-card-lift p-8 md:p-12 rounded-xl flex flex-col md:flex-row md:items-end gap-6 md:gap-12 group">
                        <div class="md:flex-1">
                            <p class="ea-eyebrow mb-3">Foundational Overview · 04</p>
                            <h3 class="font-headline text-3xl md:text-4xl text-[var(--ea-primary)] leading-tight mb-3">{keyTopicFourth.title}</h3>
                            <p class="font-body text-[var(--ea-on-surface-variant)] leading-relaxed max-w-2xl">{keyTopicFourth.description}</p>
                        </div>
                        <span class="font-label text-[10px] uppercase tracking-[0.28em] text-[var(--ea-secondary)] font-bold border-b-2 border-[var(--ea-secondary-fixed-dim)] pb-1 group-hover:border-[var(--ea-secondary)]">Open Chapter</span>
                    </a>
                {/if}
            </div>
        </section>

        <!-- ======================================================== -->
        <!-- HISTORICAL TIMELINE (Progress)                             -->
        <!-- ======================================================== -->
        <section class="py-20 md:py-24 bg-[var(--ea-surface-low)]">
            <div class="px-6 md:px-12 mb-12 md:mb-16 flex items-end justify-between gap-4 flex-wrap">
                <div>
                    <h2 class="font-headline text-4xl md:text-5xl text-[var(--ea-primary)] mb-2 leading-tight">{progressTitle}</h2>
                    <p class="ea-eyebrow">{progressEyebrow}</p>
                </div>
                <div class="flex gap-4">
                    <button type="button" class="w-12 h-12 rounded-full border border-[var(--ea-outline-variant)] flex items-center justify-center hover:bg-[var(--ea-surface)] transition-colors" aria-label="Scroll timeline left" onclick={() => scrollTimelineBy(-420)}>
                        <svg class="w-5 h-5 text-[var(--ea-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button type="button" class="w-12 h-12 rounded-full border border-[var(--ea-outline-variant)] flex items-center justify-center hover:bg-[var(--ea-surface)] transition-colors" aria-label="Scroll timeline right" onclick={() => scrollTimelineBy(420)}>
                        <svg class="w-5 h-5 text-[var(--ea-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            <div bind:this={timelineScroller} class="hscroll no-scrollbar flex gap-6 md:gap-8 px-6 md:px-12 pb-8">
                {#each progressDefaults as e}
                    <article class="snap-start flex-none w-[300px] md:w-[400px] bg-[var(--ea-surface-lowest)] p-6 md:p-8 shadow-sm rounded-md group">
                        {#if e.img}
                            <div class="h-56 md:h-64 overflow-hidden mb-6 rounded-lg">
                                <img src={e.img}  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                            </div>
                        {/if}
                        <div class="flex items-center gap-4 mb-4">
                            <span class="ea-chip">{e.era}</span>
                            <span class="h-px flex-1 bg-[var(--ea-outline-variant)]/50"></span>
                        </div>
                        <h4 class="font-headline text-2xl md:text-3xl text-[var(--ea-primary)] mb-4 leading-tight">{e.title}</h4>
                        <p class="font-body text-[var(--ea-on-surface-variant)] text-sm leading-relaxed">{e.body}</p>
                    </article>
                {/each}
            </div>
        </section>

        <!-- ======================================================== -->
        <!-- VISUAL ARGUMENT (Featured Videos)                          -->
        <!-- ======================================================== -->
        <section class="px-6 md:px-12 py-24 md:py-32 bg-[var(--ea-primary)] text-white overflow-hidden">
            <div class="mb-16 md:mb-20">
                <p class="ea-eyebrow-muted mb-4">Digital Lectures</p>
                <h2 class="font-headline text-5xl md:text-6xl !text-white leading-tight">Revelation Made Clear</h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
                {#if featureVideo}
                    {@const fId = getVideoId(featureVideo.embedUrl)}
                    <button type="button" class="relative group cursor-pointer aspect-video rounded-xl overflow-hidden shadow-2xl w-full" onclick={() => openModal(featureVideo)} aria-label={`Play ${featureVideo.title}`}>
                        {#if fId}
                            <img src={getThumbnailUrl(fId)} alt={featureVideo.title} class="w-full h-full object-cover" loading="lazy" />
                        {/if}
                        <div class="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-all">
                            <span class="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
                                <svg class="w-9 h-9 text-white ml-1" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </span>
                        </div>
                    </button>
                {/if}

                <div class="space-y-8">
                    {#if featureVideo}
                        <div class="pb-8 border-b border-white/10">
                            <p class="ea-eyebrow-muted mb-2">Series 01 · EP 04</p>
                            <h3 class="font-headline text-3xl md:text-4xl text-white mb-4 leading-tight">{featureVideo.title}</h3>
                            <p class="font-body !text-white leading-relaxed">
                                An immersive walkthrough of the Endgame of Heaven — Revelation made Clear.
                            </p>
                        </div>
                    {/if}

                    {#if sideVideos.length}
                        <ul class="space-y-4">
                            {#each sideVideos as video}
                                {@const vId = getVideoId(video.embedUrl)}
                                <li>
                                    <button type="button" class="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors text-left group" onclick={() => openModal(video)}>
                                        <span class="relative flex-none w-24 h-16 rounded-md overflow-hidden bg-black/40">
                                            {#if vId}
                                                <img src={getThumbnailUrl(vId)} alt="" class="w-full h-full object-cover" loading="lazy" />
                                            {/if}
                                            <span class="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <svg class="w-5 h-5 text-white ml-0.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                            </span>
                                        </span>
                                        <span class="flex-1">
                                            <span class="block font-headline text-lg text-white leading-snug group-hover:text-[var(--ea-primary-fixed)] transition-colors">{video.title}</span>
                                        </span>
                                    </button>
                                </li>
                            {/each}
                        </ul>
                    {/if}

                    <div class="flex gap-6 pt-2">
                        <a href="/topics" class="ea-btn-on-dark">View All Episodes</a>
                    </div>
                </div>
            </div>
        </section>

        <!-- ======================================================== -->
        <!-- KEY SECTIONS (The Framework — Issue / Solution / Our Part)  -->
        <!-- ======================================================== -->
        <section class="px-6 md:px-12 py-24 md:py-32 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {#each keySectionItems.slice(0, 3) as section, index}
                {@const s = keySectionStyles[index] ?? keySectionStyles[0]}
                <article class="{s.bg} {s.border} p-10 md:p-16 rounded-xl flex flex-col justify-between min-h-[480px] md:h-[600px]">
                    <div>
                        {#if s.italic}
                            {@const words = (section.title ?? '').split(' ')}
                            {@const last = words.slice(-1)[0] ?? ''}
                            {@const head = words.slice(0, -1).join(' ')}
                            <h2 class="font-headline text-4xl md:text-5xl {s.text} mb-8 leading-none">
                                {head}<br /><span class="italic font-light">{last}</span>
                            </h2>
                        {:else}
                            <h2 class="font-headline text-4xl md:text-5xl {s.text} mb-8 leading-none">{section.title}</h2>
                        {/if}
                        <p class="font-body {s.subtext} text-base md:text-lg leading-relaxed">{section.description}</p>
                    </div>
                    <div class="flex items-end justify-between mt-10">
                        {#if section.cta?.href}
                            <a href={`/${section.cta.href}`} class="font-label text-[10px] uppercase tracking-[0.28em] font-bold pb-1 border-b-2 transition-colors {s.linkDark ? 'text-white border-white/40 hover:border-white' : 'text-[var(--ea-secondary)] border-[var(--ea-secondary-fixed-dim)] hover:border-[var(--ea-secondary)]'}">
                                {section.cta.label ?? 'Read more'}
                            </a>
                        {/if}
                        <svg class="w-14 h-14 {s.iconColor}" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.2" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d={keySectionIcons[index] ?? keySectionIcons[0]} />
                        </svg>
                    </div>
                </article>
            {/each}
        </section>

        <!-- ======================================================== -->
        <!-- DECIPHERING THE CODE (Symbols)                             -->
        <!-- ======================================================== -->
        <section class="px-6 md:px-12 py-24 md:py-32 bg-[var(--ea-surface)]">
            <div class="max-w-4xl mx-auto">
                <div class="text-center mb-20 md:mb-24">
                    <h2 class="font-headline text-5xl md:text-6xl text-[var(--ea-primary)] mb-6 leading-tight">Prhophetic Symbols and their Meaning
</h2>
                    <p class="font-body text-[var(--ea-on-surface-variant)]">Unlocking the prophetic lexicon through textual evidence.

</p>
                </div>

                <div class="space-y-8">
                    {#each symbolsItems as item}
                        <div class="flex items-start gap-8 md:gap-12 p-6 md:p-8 hover:bg-[var(--ea-surface-low)] transition-colors rounded-xl">
                            <span class="material-symbols-outlined text-[var(--ea-primary)] mt-1 flex-none" style="font-size: 2.25rem; font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;" aria-hidden="true">
                                {symbolIcon(item)}
                            </span>
                            <div>
                                <h4 class="font-headline text-2xl md:text-3xl text-[var(--ea-primary)] mb-2 leading-tight">{item.title}</h4>
                                <p class="font-body text-[var(--ea-on-surface-variant)] leading-relaxed">{item.description}</p>
                            </div>
                        </div>
                    {/each}
                </div>

                    <div class="text-center mt-16">
                        <a href="prhophetic-symbols-and-their-meaning" class="ea-btn-ghost">View More</a>
                    </div>
            </div>
        </section>

        <!-- ======================================================== -->
        <!-- THE TRUTH (Systemic Synthesis)                             -->
        <!-- ======================================================== -->
        <section class="py-28 md:py-40 bg-[var(--ea-surface-highest)] flex flex-col items-center text-center px-6 md:px-12">
            <!-- <span class="inline-block bg-[var(--ea-secondary)]/10 text-[var(--ea-secondary)] px-4 py-1 rounded-full font-label text-[10px] uppercase tracking-[0.3em] mb-8">
                Systemic Synthesis
            </span> -->
            <h2 class="font-headline text-5xl md:text-6xl lg:text-7xl text-[var(--ea-primary)] mb-10 max-w-4xl leading-[1.05]">
 What is The truth about God?
                <!-- <span class="italic font-light">and His character?.</span> -->
            </h2>

                <p class="font-body italic text-lg md:text-xl text-[var(--ea-on-surface-variant)] max-w-2xl mb-10 leading-relaxed">Is God a trinity?</p>
            

            {#if truthPoints.length}
                <ul class="grid gap-3 mb-12 max-w-xl mx-auto text-left">
                    {#each truthPoints as point, i}
                        <li class="flex items-start gap-4 font-body text-[var(--ea-on-surface-variant)] leading-relaxed">
                            <span class="font-label text-xs text-[var(--ea-secondary)] mt-1 tracking-[0.2em] font-bold">0{i + 1}</span>
                            <span>{point}</span>
                        </li>
                    {/each}
                </ul>
            {/if}

            <a href= "the-truth-about-god" class="ea-btn-primary shadow-xl">
Read More            </a>
        </section>

        <!-- ======================================================== -->
        <!-- GOVERNING THE SOUL (Government)                            -->
        <!-- ======================================================== -->
        <section class="px-6 md:px-12 py-20 md:py-24 bg-[var(--ea-tertiary)] text-white">
            <div class="mb-12 md:mb-16 max-w-3xl">
                <h2 class="font-headline text-3xl md:text-4xl !text-white leading-tight">Types of Governments</h2>
                <div class="h-1 w-20 bg-[var(--ea-secondary)] mt-4"></div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                {#each governmentItems as item}
                    <article class="bg-[var(--ea-tertiary-container)] p-10 md:p-12 rounded-lg border border-white/5 flex flex-col">
                        <span class="material-symbols-outlined text-[var(--ea-secondary-fixed)] mb-6 flex-none" style="font-size: 2.25rem; font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;" aria-hidden="true">
                            {governmentIcon(item)}
                        </span>
                        <h3 class="font-headline text-2xl md:text-3xl !text-white mb-4 leading-tight">{item.title}</h3>
                        <p class="font-body !text-white/75 text-sm leading-relaxed">{item.description}</p>
                    </article>
                {/each}
            </div>
        </section>

    </main>

   

    <!-- ======================================================== -->
    <!-- VIDEO MODAL                                                -->
    <!-- ======================================================== -->
    {#if selectedVideo}
        <div class="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={selectedVideo.title}>
            <button type="button" class="absolute inset-0 w-full h-full cursor-default" aria-label="Close modal" onclick={closeModal}></button>
            <div class="relative max-w-5xl w-full">
                <button type="button" class="absolute -top-10 right-0 text-white hover:text-[var(--ea-secondary-fixed)] font-label text-xs tracking-[0.25em] uppercase z-10" onclick={closeModal}>
                    Close ✕
                </button>
                <div class="aspect-video bg-black rounded-lg overflow-hidden relative z-10">
                    <iframe src={selectedVideo.embedUrl} title={selectedVideo.title} class="w-full h-full" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>
                </div>
                <h3 class="mt-4 font-headline text-xl !text-white relative z-10">{selectedVideo.title}</h3>
            </div>
        </div>
    {/if}
</div>
