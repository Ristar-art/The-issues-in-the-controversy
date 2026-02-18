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

<main class="component-library-page">
  <header class="page-header">
    <div class="header-content">
      <div class="title-section">
        <span class="eyebrow">Admin</span>
        <h1 class="page-title">Component Library</h1>
      </div>
      <a href="/admin/editorial" class="btn-back">
        ← Back to Articles
      </a>
    </div>
  </header>

  <div class="library-content">
    <!-- Custom Components Section -->
    <section class="component-section">
      <div class="section-header">
        <h2 class="section-title">
          <span class="icon">📦</span>
          Custom Components
          <span class="subtitle">Reusable in any article</span>
        </h2>
        <button class="btn-create" onclick={() => createComponent('custom')}>
          + Create Component
        </button>
      </div>
      
      {#if customComponents.length === 0}
        <div class="empty-section">
          <div class="empty-icon">📦</div>
          <h3>No custom components yet</h3>
          <p>Create reusable components that can be inserted into any article using the "/component" command.</p>
        </div>
      {:else}
        <div class="components-grid">
          {#each customComponents as component}
            <div class="component-card custom">
              <div class="card-header">
                <span class="component-icon">📦</span>
                <h3>{component.name}</h3>
              </div>
              {#if component.description}
                <p class="component-description">{component.description}</p>
              {/if}
              <div class="component-preview small">
                {@html component.html}
              </div>
              <div class="card-actions">
                <button class="btn-edit" onclick={() => editComponent(component)}>
                  Edit
                </button>
                <button class="btn-delete" onclick={() => deleteComponent(component)}>
                  Delete
                </button>
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </section>
  </div>
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
  .component-library-page {
    min-height: 100vh;
    background: #f9fafb;
  }

  /* Header */
  .page-header {
    background: white;
    border-bottom: 1px solid #e5e7eb;
    padding: 1rem 1.5rem;
  }

  .header-content {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .title-section {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .eyebrow {
    font-size: 0.625rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #6b7280;
    font-weight: 600;
  }

  .page-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
    color: #111827;
  }

  .btn-back {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    color: #6b7280;
    text-decoration: none;
    border-radius: 0.375rem;
    transition: all 0.2s;
  }

  .btn-back:hover {
    background: #f3f4f6;
    color: #374151;
  }

  /* Library Content */
  .library-content {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem 1.5rem;
  }

  /* Sections */
  .component-section {
    margin-bottom: 3rem;
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .section-title {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 1.25rem;
    font-weight: 600;
    color: #111827;
    margin: 0;
  }

  .section-title .icon {
    font-size: 1.5rem;
  }

  .section-title .subtitle {
    font-size: 0.875rem;
    font-weight: 400;
    color: #6b7280;
    margin-left: 0.5rem;
  }

  /* Special Components */
  .special-components {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 1.5rem;
  }

  /* Component Cards */
  .component-card {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 0.75rem;
    padding: 1.5rem;
    transition: all 0.2s;
  }

  .component-card.active {
    border-color: #0d9488;
  }

  .component-card.empty {
    border-style: dashed;
    background: #fafafa;
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
  }

  .component-icon {
    font-size: 1.5rem;
  }

  .card-header h3 {
    font-size: 1.125rem;
    font-weight: 600;
    margin: 0;
    flex: 1;
  }

  .badge {
    font-size: 0.625rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: 600;
    padding: 0.25rem 0.5rem;
    background: #dbeafe;
    color: #1e40af;
    border-radius: 9999px;
  }

  .component-description {
    color: #6b7280;
    font-size: 0.875rem;
    margin: 0 0 1rem 0;
  }

  .component-preview {
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    overflow: hidden;
    margin-bottom: 1rem;
    max-height: 200px;
    overflow-y: auto;
  }

  .component-preview.small {
    max-height: 150px;
  }

  .component-preview :global(*) {
    max-width: 100%;
  }

  .card-actions {
    display: flex;
    gap: 0.5rem;
  }

  .empty-state {
    text-align: center;
    padding: 2rem;
    color: #6b7280;
  }

  .empty-state p {
    margin-bottom: 1rem;
  }

  /* Custom Components Grid */
  .components-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .empty-section {
    text-align: center;
    padding: 4rem 2rem;
    background: white;
    border-radius: 0.75rem;
    border: 2px dashed #e5e7eb;
  }

  .empty-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  .empty-section h3 {
    font-size: 1.125rem;
    font-weight: 600;
    color: #374151;
    margin: 0 0 0.5rem 0;
  }

  .empty-section p {
    color: #6b7280;
    margin: 0;
  }

  /* Buttons */
  .btn-create {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: #0d9488;
    color: white;
    border: none;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s;
  }

  .btn-create:hover {
    background: #0f766e;
  }

  .btn-edit {
    padding: 0.375rem 0.75rem;
    background: #f3f4f6;
    color: #374151;
    border: none;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-edit:hover {
    background: #e5e7eb;
  }

  .btn-delete {
    padding: 0.375rem 0.75rem;
    background: #fef2f2;
    color: #ef4444;
    border: none;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-delete:hover {
    background: #fee2e2;
  }

  /* Modal */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
  }

  .modal-content {
    background: white;
    border-radius: 0.75rem;
    width: 100%;
    max-width: 1000px;
    max-height: 90vh;
    overflow: hidden;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .components-grid {
      grid-template-columns: 1fr;
    }

    .section-header {
      flex-direction: column;
      gap: 1rem;
      align-items: flex-start;
    }
  }
</style>