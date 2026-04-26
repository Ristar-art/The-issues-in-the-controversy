<script>
  import VisualComponentBuilder from './VisualComponentBuilder.svelte';

  /** @type {import('./$types').PageData} */
  let { data } = $props();

  let components = $state(data.components || []);
  let customComponents = $state(data.customComponents || []);

  let editingComponent = $state(null);
  let showEditor = $state(false);

  function createComponent(category = 'custom') {
    const newComponent = {
      id: `component-${Date.now()}`,
      name: 'New Component',
      html: '',
      category: category,
      description: '',
      blocks: []
    };
    editingComponent = newComponent;
    showEditor = true;
  }

  function editComponent(component) {
    editingComponent = { ...component };
    showEditor = true;
  }

  async function saveComponent(updatedComponent) {
    try {
      const res = await fetch('/api/components', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedComponent)
      });

      if (!res.ok) throw new Error('Failed to save component');

      // Refresh components
      const refreshRes = await fetch('/api/components');
      if (refreshRes.ok) {
        const allComponents = await refreshRes.json();
        components = allComponents;
        customComponents = allComponents.filter(c => c.category === 'custom');
      }

      showEditor = false;
      editingComponent = null;
    } catch (err) {
      alert(`Error saving component: ${err.message}`);
    }
  }

  async function deleteComponent(component) {
    if (!confirm(`Delete "${component.name}"? This cannot be undone.`)) return;

    try {
      const res = await fetch('/api/components', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: component.id })
      });

      if (!res.ok) throw new Error('Failed to delete component');

      // Refresh components
      const refreshRes = await fetch('/api/components');
      if (refreshRes.ok) {
        const allComponents = await refreshRes.json();
        components = allComponents;
        customComponents = allComponents.filter(c => c.category === 'custom');
      }
    } catch (err) {
      alert(`Error deleting component: ${err.message}`);
    }
  }

  function closeEditor() {
    showEditor = false;
    editingComponent = null;
  }
</script>

<main class="container-editorial py-16">
  <header class="mb-12">
    <div class="header-row">
      <div>
        <span class="eyebrow">Content Management</span>
        <h1 class="font-display text-4xl md:text-5xl mb-4">Component Library</h1>
        <div class="section-divider"></div>
      </div>
      <button class="btn-editorial back-btn" onclick={() => history.back()}>
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m15 18-6-6 6-6"/>
        </svg>
        Back to Article
      </button>
    </div>
  </header>

  <section>
    <div class="section-header">
      <div>
        <h2 class="font-headline text-2xl mb-1">Custom Components</h2>
        <p class="text-sm text-stone font-body">Reusable blocks available in any article via the "/component" command.</p>
      </div>
      <button class="btn-editorial btn-editorial-accent" onclick={() => createComponent('custom')}>
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" x2="12" y1="5" y2="19"/>
          <line x1="5" x2="19" y1="12" y2="12"/>
        </svg>
        Create Component
      </button>
    </div>

    {#if customComponents.length === 0}
      <div class="empty-state card-editorial">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="empty-icon">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
          <line x1="12" x2="12" y1="22.08" y2="12"/>
        </svg>
        <h3 class="font-headline text-xl mb-2">No Components Yet</h3>
        <p class="text-sm text-stone font-body">Create reusable components that can be inserted into any article.</p>
      </div>
    {:else}
      <div class="components-grid">
        {#each customComponents as component}
          <article class="card-editorial component-card">
            <div class="card-body">
              <h3 class="font-headline text-xl mb-2">{component.name}</h3>
              {#if component.description}
                <p class="text-sm text-stone font-body mb-4">{component.description}</p>
              {/if}
              <div class="component-preview">
                {@html component.html}
              </div>
            </div>
            <div class="card-actions">
              <button
                class="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold uppercase tracking-wider border border-accent text-accent hover:bg-accent hover:text-paper transition-all"
                onclick={() => editComponent(component)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 20h9"/>
                  <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                </svg>
                Edit
              </button>
              <button
                class="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold uppercase tracking-wider border border-red-700 text-red-700 hover:bg-red-700 hover:text-white transition-all"
                onclick={() => deleteComponent(component)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 6h18"/>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                </svg>
                Delete
              </button>
            </div>
          </article>
        {/each}
      </div>
    {/if}
  </section>
</main>

<!-- Component Editor Modal -->
{#if showEditor && editingComponent}
  <div class="modal-overlay" onclick={closeEditor}>
    <div class="modal-content" onclick={(e) => e.stopPropagation()}>
      <VisualComponentBuilder
        component={editingComponent}
        onSave={saveComponent}
        onCancel={closeEditor}
      />
    </div>
  </div>
{/if}

<style>
  .text-stone {
    color: var(--color-stone);
  }
  .text-accent {
    color: var(--color-accent);
  }
  .border-accent {
    border-color: var(--color-accent);
  }
  .hover\:bg-accent:hover {
    background-color: var(--color-accent);
  }
  .hover\:text-paper:hover {
    color: var(--color-paper);
  }
  .border-red-700 {
    border-color: #b91c1c;
  }
  .text-red-700 {
    color: #b91c1c;
  }
  .hover\:bg-red-700:hover {
    background-color: #b91c1c;
    color: #fef3c7;
  }

  .header-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 2rem;
    flex-wrap: wrap;
  }

  .back-btn {
    gap: 0.5rem;
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 2rem;
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--color-pearl);
    flex-wrap: wrap;
  }

  .section-header .btn-editorial {
    gap: 0.5rem;
  }

  .components-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.5rem;
  }

  .component-card {
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .card-body {
    padding: 2rem 2rem 1rem;
    flex: 1;
  }

  .component-preview {
    border-top: 1px solid var(--color-pearl);
    margin: 1rem -2rem 0;
    padding: 1.25rem 2rem;
    max-height: 180px;
    overflow: hidden;
    background-color: var(--color-cream);
    position: relative;
  }

  .component-preview::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 60%, var(--color-cream));
    pointer-events: none;
  }

  .component-preview :global(*) {
    max-width: 100%;
  }

  .card-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    padding: 1.25rem 2rem 2rem;
    border-top: 1px solid var(--color-pearl);
  }

  .empty-state {
    text-align: center;
    padding: 4rem 2rem;
  }

  .empty-icon {
    color: var(--color-silver);
    margin: 0 auto 1.5rem;
    display: block;
  }

  /* Modal */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(26, 26, 26, 0.6);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    backdrop-filter: blur(2px);
  }

  .modal-content {
    background: var(--color-paper);
    width: 100%;
    max-width: 1000px;
    max-height: 90vh;
    overflow: hidden;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  }

  @media (max-width: 768px) {
    .components-grid {
      grid-template-columns: 1fr;
    }

    .header-row,
    .section-header {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
