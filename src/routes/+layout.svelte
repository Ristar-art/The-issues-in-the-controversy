<script lang='ts'>
    import HeaderBar from '$lib/components/HeaderBar.svelte';
    import Navigation from '$lib/components/Navigation.svelte';
    import { page } from '$app/stores';
    import "../app.css"
     let {children} = $props();

    let isAdmin = $derived($page.url.pathname.startsWith('/admin'));
</script>

<svelte:head>
    <!-- Editorial Google Fonts (global) -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Source+Sans+Pro:wght@300;400;600;700&display=swap" rel="stylesheet">
</svelte:head>

<main>
    {#if !isAdmin}
    <header>
        <HeaderBar />
        <Navigation />
    </header>
    {/if}
    
    {@render children()}
</main>