<script>
  import { onMount } from 'svelte';
  import PagesEditor from './PagesEditor.svelte';

  let articles = [];
  let components = [];
  let loading = true;
  let error = null;

  async function fetchArticles() {
    try {
      const response = await fetch('/api/articles');
      if (!response.ok) throw new Error('Failed to fetch articles');
      articles = await response.json();
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  }

  async function fetchComponents() {
    try {
      const response = await fetch('/api/components');
      if (!response.ok) throw new Error('Failed to fetch components');
      components = await response.json();
    } catch (err) {
      console.error('Failed to fetch components:', err);
    }
  }

  async function refreshData() {
    loading = true;
    await Promise.all([fetchArticles(), fetchComponents()]);
  }

  onMount(refreshData);
</script>

<PagesEditor 
  {articles}
  {components}
  {loading}
  {error}
  on:refresh={refreshData}
/>