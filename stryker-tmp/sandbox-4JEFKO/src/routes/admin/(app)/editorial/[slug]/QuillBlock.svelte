<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import type QuillType from 'quill';

  interface Props {
    content: string;
    placeholder?: string;
    toolbarOptions?: any[][];
    onTextChange: (html: string) => void;
    onKeyDown?: (event: KeyboardEvent) => void;
    onSlashTyped?: (rect: DOMRect) => void;
    blockIndex: number;
  }

  let {
    content,
    placeholder = '',
    toolbarOptions,
    onTextChange,
    onKeyDown,
    onSlashTyped,
    blockIndex
  }: Props = $props();

  const defaultToolbar = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ header: [1, 2, 3, 4, false] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ['link', 'image'],
    ['clean']
  ];

  let editorContainer: HTMLDivElement;
  let quill: QuillType | null = null;
  let isFocused = false;
  let settingContentProgrammatically = false;

  onMount(async () => {
    const { default: Quill } = await import('quill');
    await import('quill/dist/quill.snow.css');

    quill = new Quill(editorContainer, {
      theme: 'snow',
      placeholder,
      modules: {
        toolbar: toolbarOptions ?? defaultToolbar,
        keyboard: {
          bindings: {
            // Disable Quill's default Enter behavior so we can handle it ourselves
            enter: {
              key: 'Enter',
              handler() {
                // Let our keydown handler deal with it
                return true;
              }
            }
          }
        }
      }
    });

    // Set initial content without triggering onTextChange
    if (content) {
      settingContentProgrammatically = true;
      quill.root.innerHTML = content;
      // Allow MutationObserver to flush before clearing the flag
      requestAnimationFrame(() => { settingContentProgrammatically = false; });
    }

    // Listen for text changes — only propagate user-initiated changes
    quill.on('text-change', (_delta: any, _oldDelta: any, source: string) => {
      if (!quill || settingContentProgrammatically) return;
      // Only propagate changes made by the user, not programmatic API/silent updates
      if (source !== 'user') return;

      const html = quill.root.innerHTML;
      // Quill produces <p><br></p> for empty content
      const normalizedHtml = html === '<p><br></p>' ? '' : html;
      onTextChange(normalizedHtml);

      // Check for slash command
      if (onSlashTyped) {
        const text = quill.getText();
        if (text.endsWith('/\n') || text.endsWith('/')) {
          const selection = quill.getSelection();
          if (selection) {
            const bounds = quill.getBounds(selection.index);
            if (bounds) {
              const editorRect = editorContainer.getBoundingClientRect();
              const rect = new DOMRect(
                editorRect.left + bounds.left,
                editorRect.top + bounds.top + bounds.height + 5,
                0,
                0
              );
              onSlashTyped(rect);
            }
          }
        }
      }
    });

    // Track focus state
    quill.root.addEventListener('focus', () => {
      isFocused = true;
    });

    quill.root.addEventListener('blur', () => {
      isFocused = false;
    });

    // Forward keydown events
    quill.root.addEventListener('keydown', handleEditorKeyDown);
  });

  onDestroy(() => {
    if (quill) {
      quill.root.removeEventListener('keydown', handleEditorKeyDown);
      // Quill doesn't have a destroy method in v2 — cleanup is handled by removing the DOM
      quill = null;
    }
  });

  function handleEditorKeyDown(event: KeyboardEvent) {
    // Ctrl/Cmd+S to save
    if (event.key === 's' && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      onKeyDown?.(event);
      return;
    }

    // Enter to create new block (without shift)
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      onKeyDown?.(event);
      return;
    }

    // Backspace on empty content to delete block
    if (event.key === 'Backspace' && quill) {
      const text = quill.getText().trim();
      if (text === '') {
        event.preventDefault();
        onKeyDown?.(event);
        return;
      }
    }

    // Escape
    if (event.key === 'Escape') {
      onKeyDown?.(event);
      return;
    }

    // Slash for commands
    if (event.key === '/') {
      // Let Quill handle the input, the text-change handler will detect it
    }
  }

  // Update content from outside when not focused (preserves cursor during auto-save)
  $effect(() => {
    if (quill && !isFocused && content !== undefined) {
      const currentHtml = quill.root.innerHTML;
      const normalizedCurrent = currentHtml === '<p><br></p>' ? '' : currentHtml;
      if (normalizedCurrent !== content) {
        settingContentProgrammatically = true;
        quill.root.innerHTML = content || '';
        requestAnimationFrame(() => { settingContentProgrammatically = false; });
      }
    }
  });

  export function focus() {
    quill?.focus();
  }
</script>

<div
  class="quill-block"
  data-block-index={blockIndex}
>
  <div bind:this={editorContainer}></div>
</div>

<style>
  .quill-block {
    margin-bottom: 0.5rem;
  }

  .quill-block :global(.ql-toolbar) {
    border: none !important;
    border-bottom: 1px solid #e5e7eb !important;
    padding: 4px 0 !important;
    opacity: 0;
    transition: opacity 0.2s;
  }

  .quill-block:focus-within :global(.ql-toolbar) {
    opacity: 1;
  }

  .quill-block :global(.ql-container) {
    border: none !important;
    font-size: inherit;
    font-family: inherit;
  }

  .quill-block :global(.ql-editor) {
    padding: 4px 0 !important;
    min-height: 1.5em;
    line-height: 1.6;
  }

  .quill-block :global(.ql-editor.ql-blank::before) {
    color: #9ca3af;
    font-style: normal;
    left: 0;
  }

  .quill-block :global(.ql-editor p) {
    margin-bottom: 0;
  }
</style>
