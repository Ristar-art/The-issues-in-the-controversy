<script lang='ts'>
    import HeaderBar from '$lib/components/HeaderBar.svelte';
    import Navigation from '$lib/components/Navigation.svelte';
    import "../app.css"
     let {children} = $props();
</script>

<main>
    <header>
        <HeaderBar />
        <Navigation />
    </header>
    
    {@render children()}
</main>