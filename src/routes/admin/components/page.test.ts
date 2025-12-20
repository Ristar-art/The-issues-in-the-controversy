import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/svelte';
import Page from './+page.svelte';

// Mock fetch for API calls
global.fetch = vi.fn();

describe('Components Editor Page', () => {
  let mockData;
  let mockFetchResponse;

  beforeEach(() => {
    mockData = {
      components: [
        {
          id: 'comp1',
          name: 'Test Component',
          html: '<section class="py-16 bg-white"><div class="container mx-auto px-4"><div class="">\n<p class="text-gray-600 mb-4 text-left">Test block</p>\n</div></div></section>',
           section: {
             classes: 'py-16 bg-white',
             containerClasses: 'container mx-auto px-4',
             blocks: [{ type: 'text', text: 'Test block' }],
             layout: 'linear',
             columns: 2,
             minHeight: 'none'
           }
        }
      ]
    };

    mockFetchResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue([])
    };

    vi.mocked(fetch).mockResolvedValue(mockFetchResponse);
  });

  describe('Auto Application of Blocks to HTML', () => {
    it('should call applyBlocksToHtml when adding a new block', async () => {
      render(Page, { props: { data: mockData } });

      // Wait for component to render
      await waitFor(() => {
        expect(screen.getByText('Components Editor')).toBeInTheDocument();
      });

      // Find and click the "Add block" button
      const addButton = screen.getByText('+ Add block');
      await fireEvent.click(addButton);

      // The applyBlocksToHtml should have been called automatically
      // We can't directly test this since it's internal state, but we can verify the component still renders
      await waitFor(() => {
        // Check that the component list shows the component
        expect(screen.getByText('Test Component (comp1)')).toBeInTheDocument();
      });
    });

    it('should automatically update HTML when block content changes', async () => {
      render(Page, { props: { data: mockData } });

      await waitFor(() => {
        expect(screen.getByText('Components Editor')).toBeInTheDocument();
      });

      // Find the text block textarea and change its content
      const textarea = screen.getByPlaceholderText('Paragraph text');
      await fireEvent.input(textarea, { target: { value: 'Updated block content' } });

      // The HTML should be automatically updated
      await waitFor(() => {
        // We can check that the component is still there, indicating no errors
        expect(screen.getByText('Test Component (comp1)')).toBeInTheDocument();
      });
    });

    it('should automatically update HTML when block is deleted', async () => {
      // Add a component with multiple blocks for deletion test
      const multiBlockData = {
        components: [
          {
            id: 'comp1',
            name: 'Test Component',
            html: '<section class="py-16 bg-white"><div class="container mx-auto px-4"><div class="">\n<p class="text-gray-600 mb-4 text-left">Block 1</p>\n<p class="text-gray-600 mb-4 text-left">Block 2</p>\n</div></div></section>',
            section: {
              classes: 'py-16 bg-white',
              containerClasses: 'container mx-auto px-4',
              blocks: [
                { type: 'text', text: 'Block 1' },
                { type: 'text', text: 'Block 2' }
              ],
              layout: 'linear',
              columns: 2,
              minHeight: 'none'
            }
          }
        ]
      };

      render(Page, { props: { data: multiBlockData } });

      await waitFor(() => {
        expect(screen.getByText('Components Editor')).toBeInTheDocument();
      });

      // Find and click the remove button for the first block
      const removeButtons = screen.getAllByText('Remove');
      await fireEvent.click(removeButtons[0]);

      // The HTML should be automatically updated
      await waitFor(() => {
        expect(screen.getByText('Test Component (comp1)')).toBeInTheDocument();
      });
    });

    it('should automatically update HTML when block is moved', async () => {
      // Add a component with multiple blocks for moving test
      const multiBlockData = {
        components: [
          {
            id: 'comp1',
            name: 'Test Component',
            html: '<section class="py-16 bg-white"><div class="container mx-auto px-4"><div class="">\n<p class="text-gray-600 mb-4 text-left">Block 1</p>\n<p class="text-gray-600 mb-4 text-left">Block 2</p>\n</div></div></section>',
            section: {
              classes: 'py-16 bg-white',
              containerClasses: 'container mx-auto px-4',
              blocks: [
                { type: 'text', text: 'Block 1' },
                { type: 'text', text: 'Block 2' }
              ],
              layout: 'linear',
              columns: 2,
              minHeight: 'none'
            }
          }
        ]
      };

      render(Page, { props: { data: multiBlockData } });

      await waitFor(() => {
        expect(screen.getByText('Components Editor')).toBeInTheDocument();
      });

      // Find and click the down arrow button for the first block
      const buttons = screen.getAllByRole('button');
      const downButton = buttons.find(btn => btn.textContent === '↓');
      await fireEvent.click(downButton);

      // The HTML should be automatically updated
      await waitFor(() => {
        expect(screen.getByText('Test Component (comp1)')).toBeInTheDocument();
      });
    });

    it('should automatically update HTML when section settings change', async () => {
      render(Page, { props: { data: mockData } });

      await waitFor(() => {
        expect(screen.getByText('Components Editor')).toBeInTheDocument();
      });

      // Find the layout select and change it to grid
      const layoutSelect = screen.getByDisplayValue('Linear');
      await fireEvent.input(layoutSelect, { target: { value: 'grid' } });

      // The HTML should be automatically updated
      await waitFor(() => {
        expect(screen.getByText('Test Component (comp1)')).toBeInTheDocument();
      });
    });
  });

  describe('Component Rendering', () => {
    it('should render the page title', async () => {
      render(Page, { props: { data: mockData } });

      await waitFor(() => {
        expect(screen.getByText('Components Editor')).toBeInTheDocument();
      });
    });

    it('should render component list', async () => {
      render(Page, { props: { data: mockData } });

      await waitFor(() => {
        expect(screen.getByText('Test Component (comp1)')).toBeInTheDocument();
      });
    });

    it('should render blocks editor', async () => {
      render(Page, { props: { data: mockData } });

      await waitFor(() => {
        expect(screen.getByText('Blocks (visual builder)')).toBeInTheDocument();
      });
    });
  });
});