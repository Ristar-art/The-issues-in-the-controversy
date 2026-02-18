<script lang="ts">
  import { onDestroy, tick } from 'svelte';
  import { goto } from '$app/navigation';
  import NotionEditor from './NotionEditor.svelte';

  // Define TypeScript interfaces
  interface Block {
    type: 'heading' | 'text' | 'image' | 'button' | 'layout' | 'component';
    text?: string;
    level?: number;
    color?: string;
    align?: 'left' | 'center' | 'right';
    src?: string;
    alt?: string;
    widthPercent?: number;
    label?: string;
    href?: string;
    layout?: 'linear' | 'grid';
    columns?: number;
    blocks?: Block[];
    componentId?: string;
  }

  interface Component {
    id: string;
    name: string;
    html: string;
    category: 'custom';
    description?: string;
  }

  interface Article {
    id: number;
    attributes: {
      title: string;
      slug: string;
      content?: string;
      blocks?: Block[];
      published: boolean;
    };
  }

  interface PageData {
    article: Article;
    customComponents: Component[];
    allComponents: Component[];
  }

  // Props from load function
  let { data }: { data: PageData } = $props();
  
  // Article data
  let article: Article = $state(data.article);
  let customComponents: Component[] = $state(data.customComponents ?? []);
  let allComponents: Component[] = $state(data.allComponents ?? []);
  
  // Editor state
  let blocks: Block[] = $state(data.article.attributes.blocks ?? [{ type: 'text', text: '' }]);
  let saveStatus = $state<'saved' | 'saving' | 'unsaved'>('saved');

  // Auto-save timer
  let autoSaveTimeout: ReturnType<typeof setTimeout> | null = null;

  function updateBlocks(newBlocks: Block[]) {
    blocks = newBlocks;
    saveStatus = 'unsaved';

    // Clear any existing auto-save timeout
    if (autoSaveTimeout) {
      clearTimeout(autoSaveTimeout);
    }

    // Set new auto-save timeout for 3 seconds
    autoSaveTimeout = setTimeout(() => {
      if (saveStatus === 'unsaved') {
        saveArticle();
      }
    }, 3000);
  }

  // Cleanup timeout on component destroy
  onDestroy(() => {
    if (autoSaveTimeout) {
      clearTimeout(autoSaveTimeout);
    }
  });

  async function saveArticle(): Promise<void> {
    // Save current focus and cursor position before save
    const activeElement = document.activeElement as HTMLElement | null;
    const blockIndex = activeElement?.dataset?.blockIndex;
    const selection = window.getSelection();
    let anchorOffset = selection?.anchorOffset ?? 0;
    let focusOffset = selection?.focusOffset ?? 0;

    try {
      saveStatus = 'saving';
      await tick();

      const res: Response = await fetch('/api/articles', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: article.id,
          blocks: blocks
        })
      });

      if (!res.ok) {
        throw new Error('Failed to save article');
      }

      saveStatus = 'saved';
    } catch (err: any) {
      alert(`Error saving article: ${err.message}`);
      saveStatus = 'unsaved';
    }

    // Restore focus and cursor position after save
    await tick();

    if (blockIndex !== undefined) {
      const element = document.querySelector(`[data-block-index="${blockIndex}"]`) as HTMLElement;
      if (element) {
        element.focus();

        // Restore cursor position
        const sel = window.getSelection();
        if (sel && element.firstChild) {
          const range = document.createRange();
          const textNode = element.firstChild;
          const maxOffset = textNode.textContent?.length ?? 0;
          const safeOffset = Math.min(anchorOffset, maxOffset);

          range.setStart(textNode, safeOffset);
          range.setEnd(textNode, safeOffset);
          sel.removeAllRanges();
          sel.addRange(range);
        }
      }
    }
  }

  async function togglePublish(): Promise<void> {
    try {
      const res: Response = await fetch('/api/articles', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: article.id,
          published: !article.attributes.published
        })
      });

      if (!res.ok) {
        throw new Error('Failed to update article');
      }

      const updatedArticle = await res.json();
      article = updatedArticle;
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  }
</script>

<main class="notion-editor-page">
  <!-- Floating Header -->
  <header class="floating-header">
    <div class="header-content">
      <div class="title-section">
        <span class="eyebrow">Article Editor</span>
        <h1 class="page-title">{article.attributes.title}</h1>
        <p class="slug">/{article.attributes.slug}</p>
      </div>
      
      <div class="actions-section">
        <!-- Component Library Link -->
        <a href="/admin/components" class="btn-library">
          📦 Component Library
        </a>

        <!-- Save Status Indicator -->
        <div class="save-status">
          {#if saveStatus === 'saving'}
            <span class="status saving">Saving...</span>
          {:else if saveStatus === 'saved'}
            <span class="status saved">Saved</span>
          {:else}
            <span class="status unsaved">Unsaved</span>
          {/if}
        </div>

        <!-- Publish Toggle -->
        <span class="publish-badge {article.attributes.published ? 'published' : 'draft'}">
          {article.attributes.published ? 'Published' : 'Draft'}
        </span>
        
        <button
          onclick={togglePublish}
          class="btn-publish {article.attributes.published ? 'unpublish' : 'publish'}"
        >
          {article.attributes.published ? 'Unpublish' : 'Publish'}
        </button>
        
        <button 
          class="btn-save"
          onclick={saveArticle}
        >
          Save Article
        </button>
      </div>
    </div>
  </header>

  <!-- Main Editor Area -->
  <div class="editor-container">
    <div class="editor-wrapper">
      <!-- Notion-Style Editor -->
      <div class="notion-editor-container">
        <NotionEditor 
          {blocks}
          availableComponents={customComponents}
          onUpdate={updateBlocks}
          onSave={saveArticle}
        />
      </div>
    </div>
  </div>

  <!-- Keyboard Shortcuts Help -->
  <div class="shortcuts-help">
    <div class="shortcut">
      <kbd>Ctrl</kbd> + <kbd>S</kbd>
      <span>Save</span>
    </div>
    <div class="shortcut">
      <kbd>/</kbd>
      <span>Commands</span>
    </div>
    <div class="shortcut">
      <kbd>Enter</kbd>
      <span>New block</span>
    </div>
    <div class="shortcut">
      <kbd>/component</kbd>
      <span>Add Component</span>
    </div>
  </div>
</main>

<style>
  .notion-editor-page {
    min-height: 100vh;
    background: #ffffff;
    position: relative;
  }

  /* Floating Header */
  .floating-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid #e5e7eb;
    padding: 0.75rem 1.5rem;
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
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0;
    color: #111827;
  }

  .slug {
    font-size: 0.75rem;
    color: #9ca3af;
    margin: 0;
  }

  .actions-section {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .btn-library {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: #f3f4f6;
    color: #374151;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.2s;
  }

  .btn-library:hover {
    background: #e5e7eb;
  }

  .save-status {
    font-size: 0.75rem;
  }

  .status {
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
  }

  .status.saved {
    background: #dcfce7;
    color: #166534;
  }

  .status.saving {
    background: #dbeafe;
    color: #1e40af;
  }

  .status.unsaved {
    background: #fef3c7;
    color: #92400e;
  }

  .publish-badge {
    font-size: 0.625rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: 600;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
  }

  .publish-badge.published {
    background: #dcfce7;
    color: #166534;
  }

  .publish-badge.draft {
    background: #fef3c7;
    color: #92400e;
  }

  .btn-publish {
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    font-weight: 500;
    border: 1px solid;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-publish.publish {
    background: white;
    color: #059669;
    border-color: #059669;
  }

  .btn-publish.publish:hover {
    background: #059669;
    color: white;
  }

  .btn-publish.unpublish {
    background: white;
    color: #ea580c;
    border-color: #ea580c;
  }

  .btn-publish.unpublish:hover {
    background: #ea580c;
    color: white;
  }

  .btn-save {
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

  .btn-save:hover {
    background: #0f766e;
  }

  /* Auto-applied Components */
  .auto-component {
    border: 1px solid #e5e7eb;
    background: #fafafa;
  }

  .auto-component-label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem;
    background: #f3f4f6;
    border-bottom: 1px solid #e5e7eb;
    font-size: 0.75rem;
    font-weight: 600;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .auto-component.missing .auto-component-label {
    background: #fef3c7;
    color: #92400e;
  }

  .edit-link {
    color: #0d9488;
    text-decoration: none;
    font-weight: 500;
  }

  .edit-link:hover {
    text-decoration: underline;
  }

  .component-content {
    padding: 0;
  }

  .component-content :global(*) {
    max-width: 100%;
  }

  /* Editor Container */
  .editor-container {
    padding: 2rem;
    margin-top: 80px;
  }

  .editor-wrapper {
    max-width: 900px;
    margin: 0 auto;
  }

  .notion-editor-container {
    background: white;
    min-height: 40vh;
  }

  /* Keyboard Shortcuts */
  .shortcuts-help {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    display: flex;
    gap: 1rem;
    padding: 0.75rem 1rem;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    font-size: 0.75rem;
    color: #6b7280;
    z-index: 50;
  }

  .shortcut {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .shortcut kbd {
    background: #f3f4f6;
    padding: 0.125rem 0.375rem;
    border-radius: 0.25rem;
    border: 1px solid #d1d5db;
    font-family: monospace;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .editor-container {
      padding: 1rem;
    }

    .shortcuts-help {
      display: none;
    }

    .header-content {
      flex-direction: column;
      gap: 1rem;
      align-items: flex-start;
    }

    .actions-section {
      width: 100%;
      flex-wrap: wrap;
      justify-content: flex-start;
      gap: 0.5rem;
    }

    .btn-library {
      font-size: 0.75rem;
      padding: 0.375rem 0.75rem;
    }
  }
</style>