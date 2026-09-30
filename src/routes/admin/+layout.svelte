<script lang='ts'>
    let {children} = $props();
</script>

<svelte:head>
    <!-- The admin app is behind auth, but a stray link should never put it
         in an index either; the pages set no title of their own. -->
    <title>Admin · The Endgame of Heaven</title>
    <meta name="robots" content="noindex, nofollow" />
</svelte:head>

{@render children()}
