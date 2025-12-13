<script lang='ts'>
    import HeaderBar from '$lib/components/HeaderBar.svelte';
    import Navigation from '$lib/components/Navigation.svelte';
    import { page } from '$app/stores';
    import "../app.css"
     let {children} = $props();

    let isAdmin = $derived($page.url.pathname.startsWith('/admin'));
</script>

<main>
    {#if !isAdmin}
    <header>
        <HeaderBar />
        <Navigation />
    </header>
    {/if}
    
    {@render children()}
</main>