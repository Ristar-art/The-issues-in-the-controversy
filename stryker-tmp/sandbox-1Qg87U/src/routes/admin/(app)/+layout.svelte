<script>
    import AdminHeader from '$lib/components/AdminHeader.svelte';
    let {children} = $props();
</script>

<AdminHeader />

{@render children()}
