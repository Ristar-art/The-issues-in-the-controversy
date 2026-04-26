<script lang="ts">
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
  let htmlMode = $state(false);
  let htmlSource = $state('');

  function sanitizeQuillHtml(html: string): string {
    if (!html) return '';
    html = html.replace(/<span\s+class="ql-ui"[^>]*><\/span>/g, '');
    html = html.replace(/(<li[^>]*)\s+data-list="[^"]*"/g, '$1');
    html = html.replace(/\s+contenteditable="false"/g, '');
    html = html.replace(
      /<div\s+class="ql-code-block-container"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/g,
      (_: string, inner: string) => {
        const lines: string[] = [];
        const lineRegex = /<div\s+class="ql-code-block"[^>]*>([\s\S]*?)<\/div>/g;
        let match;
        while ((match = lineRegex.exec(inner)) !== null) {
          lines.push(match[1]);
        }
        return `<pre><code>${lines.join('\n')}</code></pre>`;
      }
    );
    return html;
  }

  function blocksToHtml(blks: Block[]): string {
    if (!blks || !Array.isArray(blks)) return '';
    return blks.map(block => {
      switch (block.type) {
        case 'heading': {
          const level = block.level || 2;
          const tag = `h${level}`;
          return `<${tag}>${block.text || ''}</${tag}>`;
        }
        case 'text':
          return sanitizeQuillHtml(block.text || '');
        case 'image':
          if (block.src) {
            const style = block.widthPercent ? ` style="width:${block.widthPercent}%"` : '';
            return `<figure${style}><img src="${block.src}" alt="${block.alt || ''}" style="max-width:100%" /></figure>`;
          }
          return '';
        case 'button':
          if (block.href) {
            return `<a href="${block.href}" class="button">${block.label || 'Button'}</a>`;
          }
          return '';
        case 'component': {
          if (block.componentId) {
            const component = allComponents.find(c => c.id === block.componentId);
            if (component) {
              return component.html;
            }
          }
          return '';
        }
        case 'layout':
          if (block.blocks) {
            const cols = block.columns || 2;
            const inner = blocksToHtml(block.blocks);
            return `<div style="display:grid;grid-template-columns:repeat(${cols},1fr);gap:1rem">${inner}</div>`;
          }
          return '';
        default:
          return sanitizeQuillHtml(block.text || '');
      }
    }).join('\n');
  }

  function toggleHtmlMode() {
    if (!htmlMode) {
      // Switching TO html mode: convert blocks to HTML
      htmlSource = blocksToHtml(blocks);
    } else {
      // Switching BACK to block mode: put HTML into a single text block
      blocks = [{ type: 'text', text: htmlSource }];
      saveStatus = 'unsaved';
    }
    htmlMode = !htmlMode;
  }

  function updateHtmlSource(e: Event) {
    htmlSource = (e.target as HTMLTextAreaElement).value;
    saveStatus = 'unsaved';
  }

  function updateBlocks(newBlocks: Block[]) {
    blocks = newBlocks;
    saveStatus = 'unsaved';
  }

  async function saveArticle(): Promise<void> {
    try {
      saveStatus = 'saving';

      // If in HTML mode, sync htmlSource into blocks before saving
      const blocksToSave = htmlMode
        ? [{ type: 'text' as const, text: htmlSource }]
        : blocks;

      const res: Response = await fetch('/api/articles', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: article.id,
          blocks: blocksToSave
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

<main class="editorial-editor-page">
  <!-- Editorial Sticky Header -->
  <header class="editorial-header">
    <div class="container-editorial editorial-header-inner">
      <div class="title-section">
        <span class="eyebrow">Article Editor</span>
        <h1 class="font-display page-title">{article.attributes.title}</h1>
        <p class="slug font-body">/{article.attributes.slug}</p>
      </div>

      <div class="actions-section">
        <!-- Save Status Indicator -->
        <div class="save-status" aria-live="polite">
          {#if saveStatus === 'saving'}
            <span class="status saving">Saving…</span>
          {:else if saveStatus === 'saved'}
            <span class="status saved">Saved</span>
          {:else}
            <span class="status unsaved">Unsaved</span>
          {/if}
        </div>

        <!-- Publish Badge -->
        <span class="publish-badge {article.attributes.published ? 'published' : 'draft'}">
          {article.attributes.published ? 'Published' : 'Draft'}
        </span>

        <div class="action-divider" aria-hidden="true"></div>

        <!-- HTML Mode Toggle -->
        <button
          type="button"
          onclick={toggleHtmlMode}
          class="btn-editorial btn-sm {htmlMode ? 'is-active' : ''}"
        >
          {htmlMode ? 'Block Editor' : 'HTML Mode'}
        </button>

        <!-- Preview Link -->
        <a
          href="/admin/preview/{article.attributes.slug}"
          class="btn-editorial btn-sm"
          target="_blank"
          rel="noopener"
        >
          Preview
        </a>

        <!-- Component Library Link -->
        <a href="/admin/components" class="btn-editorial btn-sm">
          Component Library
        </a>

        <!-- Publish Toggle -->
        <button
          type="button"
          onclick={togglePublish}
          class="btn-editorial btn-sm"
        >
          {article.attributes.published ? 'Unpublish' : 'Publish'}
        </button>

        <!-- Save Button -->
        <button
          type="button"
          class="btn-editorial btn-editorial-accent btn-sm"
          onclick={saveArticle}
        >
          Save Article
        </button>
      </div>
    </div>
  </header>

  <!-- Main Editor Area -->
  <div class="container-editorial editor-container">
    <div class="editor-wrapper">
      {#if htmlMode}
        <!-- HTML Source Editor -->
        <section class="html-editor card-editorial">
          <div class="html-editor-header">
            <span class="eyebrow html-editor-label">&lt;/&gt; HTML Source</span>
          </div>
          <textarea
            class="html-editor-textarea font-body"
            value={htmlSource}
            oninput={updateHtmlSource}
            spellcheck="false"
          ></textarea>
        </section>
      {:else}
        <!-- Notion-Style Editor -->
        <section class="notion-editor-container card-editorial">
          <NotionEditor
            {blocks}
            availableComponents={customComponents}
            onUpdate={updateBlocks}
            onSave={saveArticle}
          />
        </section>
      {/if}
    </div>
  </div>

  <!-- Keyboard Shortcuts Help -->
  <aside class="shortcuts-help" aria-label="Keyboard shortcuts">
    <span class="eyebrow shortcuts-title">Shortcuts</span>
    <div class="shortcut">
      <kbd>Ctrl</kbd><kbd>S</kbd>
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
  </aside>
</main>

<style>
  .editorial-editor-page {
    min-height: 100vh;
    background-color: var(--color-cream);
    position: relative;
  }

  /* Editorial Sticky Header */
  .editorial-header {
    position: sticky;
    top: 0;
    z-index: 100;
    background-color: rgba(255, 255, 255, 0.96);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--color-pearl);
  }

  .editorial-header-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
  }

  .title-section {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    min-width: 0;
  }

  .title-section :global(.eyebrow) {
    margin-bottom: 0.25rem;
  }

  .page-title {
    font-size: 1.5rem;
    margin: 0;
    color: var(--color-ink);
    line-height: 1.2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 38ch;
  }

  .slug {
    font-size: 0.8rem;
    color: var(--color-stone);
    margin: 0;
    letter-spacing: 0.02em;
  }

  .actions-section {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
    justify-content: flex-end;
  }

  /* Small-sized editorial buttons for header density */
  :global(.btn-editorial.btn-sm) {
    padding: 0.55rem 1.1rem;
    font-size: 0.7rem;
    letter-spacing: 0.12em;
    text-decoration: none;
  }

  :global(.btn-editorial.btn-sm.is-active) {
    background-color: var(--color-ink);
    color: var(--color-paper);
  }

  .action-divider {
    width: 1px;
    height: 22px;
    background-color: var(--color-pearl);
  }

  /* Save status pill */
  .save-status {
    display: inline-flex;
    align-items: center;
  }

  .status {
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    padding: 0.35rem 0.85rem;
    border: 1px solid var(--color-pearl);
    color: var(--color-stone);
    background-color: var(--color-paper);
  }

  .status.saved {
    border-color: var(--color-pearl);
    color: var(--color-graphite);
  }

  .status.saving {
    border-color: var(--color-accent);
    color: var(--color-accent);
  }

  .status.unsaved {
    border-color: var(--color-ink);
    color: var(--color-ink);
  }

  /* Publish badge — editorial eyebrow style */
  .publish-badge {
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    padding: 0.35rem 0.85rem;
    border: 1px solid transparent;
  }

  .publish-badge.published {
    background-color: var(--color-ink);
    color: var(--color-paper);
    border-color: var(--color-ink);
  }

  .publish-badge.draft {
    background-color: transparent;
    color: var(--color-stone);
    border-color: var(--color-pearl);
  }

  /* Editor Container */
  .editor-container {
    padding-top: 3rem;
    padding-bottom: 4rem;
  }

  .editor-wrapper {
    max-width: 900px;
    margin: 0 auto;
  }

  .notion-editor-container {
    background-color: var(--color-paper);
    min-height: 60vh;
    padding: 3rem 3.5rem;
  }

  /* Remove card hover lift on the large editor surface — it's distracting while typing. */
  :global(.editor-wrapper .card-editorial:hover) {
    transform: none;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  }

  /* HTML Editor — editorial dark surface */
  .html-editor {
    overflow: hidden;
    background-color: var(--color-ink);
  }

  .html-editor-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.5rem;
    background-color: var(--color-charcoal);
    border-bottom: 1px solid var(--color-graphite);
  }

  .html-editor-label {
    color: var(--color-cream) !important;
    margin-bottom: 0 !important;
    font-family: 'Source Sans Pro', monospace;
  }

  .html-editor-textarea {
    width: 100%;
    min-height: 60vh;
    padding: 2rem 2.5rem;
    background-color: var(--color-ink);
    color: var(--color-pearl);
    border: none;
    outline: none;
    resize: vertical;
    font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace;
    font-size: 0.875rem;
    line-height: 1.8;
    tab-size: 2;
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  .html-editor-textarea::selection {
    background-color: var(--color-graphite);
  }

  /* Keyboard Shortcuts Help — editorial floating card */
  .shortcuts-help {
    position: fixed;
    bottom: 1.5rem;
    right: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    padding: 1rem 1.25rem;
    background-color: var(--color-paper);
    border: 1px solid var(--color-pearl);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
    font-size: 0.75rem;
    color: var(--color-stone);
    z-index: 50;
    max-width: 220px;
  }

  .shortcuts-title {
    margin-bottom: 0 !important;
    font-size: 0.625rem;
  }

  .shortcut {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: 'Source Sans Pro', sans-serif;
    color: var(--color-graphite);
  }

  .shortcut kbd {
    background-color: var(--color-cream);
    padding: 0.2rem 0.45rem;
    border: 1px solid var(--color-pearl);
    font-family: 'SF Mono', monospace;
    font-size: 0.7rem;
    color: var(--color-ink);
    min-width: 1.25rem;
    text-align: center;
  }

  .shortcut kbd + kbd {
    margin-left: 0.2rem;
  }

  /* Responsive */
  @media (max-width: 900px) {
    .editorial-header-inner {
      flex-direction: column;
      align-items: flex-start;
      gap: 1.25rem;
      padding-top: 1rem;
      padding-bottom: 1rem;
    }

    .actions-section {
      width: 100%;
      justify-content: flex-start;
      gap: 0.5rem;
    }

    .action-divider {
      display: none;
    }

    .page-title {
      font-size: 1.25rem;
      white-space: normal;
      max-width: 100%;
    }

    .notion-editor-container {
      padding: 2rem 1.5rem;
    }

    .editor-container {
      padding-top: 2rem;
      padding-bottom: 3rem;
    }

    .shortcuts-help {
      display: none;
    }
  }
</style>