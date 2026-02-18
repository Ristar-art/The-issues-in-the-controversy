import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/svelte';
import '@testing-library/jest-dom/vitest';
import Page from './+page.svelte';

// Mock fetch for API calls
global.fetch = vi.fn();

describe('Highlight Basic Functionality', () => {
  beforeEach(() => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue([])
    } as any);
  });

  it('should render highlight button in text block', async () => {
    const mockData: any = {
      components: [
        {
          id: 'comp1',
          name: 'Test Component',
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

    render(Page, { props: { data: mockData } });

    await waitFor(() => {
      expect(screen.getByText('Components Editor')).toBeInTheDocument();
    });

    // Check for highlight button
    const highlightButton = screen.getByTitle('Highlight text');
    expect(highlightButton).toBeTruthy();
  });

  it('should show color palette when highlight button is clicked', async () => {
    const mockData: any = {
      components: [
        {
          id: 'comp1',
          name: 'Test Component',
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

    render(Page, { props: { data: mockData } });

    await waitFor(() => {
      expect(screen.getByText('Components Editor')).toBeInTheDocument();
    });

    const highlightButton = screen.getByTitle('Highlight text');
    await fireEvent.click(highlightButton);

    // Check if color palette elements appear
    await waitFor(() => {
      expect(screen.getByText('Highlight Colors')).toBeTruthy();
      expect(screen.getByText('Remove Color')).toBeTruthy();
      expect(screen.getByText('Custom Color')).toBeTruthy();
    });
  });

  it('should have color palette with 39 colors', async () => {
    const mockData: any = {
      components: [
        {
          id: 'comp1',
          name: 'Test Component',
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

    render(Page, { props: { data: mockData } });

    await waitFor(() => {
      expect(screen.getByText('Components Editor')).toBeInTheDocument();
    });

    const highlightButton = screen.getByTitle('Highlight text');
    await fireEvent.click(highlightButton);

    await waitFor(() => {
      // Check for some specific colors to verify palette
      expect(screen.getByTitle('Yellow')).toBeTruthy();
      expect(screen.getByTitle('Red')).toBeTruthy();
      expect(screen.getByTitle('Cyan')).toBeTruthy();
      expect(screen.getByTitle('Lime')).toBeTruthy();
      expect(screen.getByTitle('Purple')).toBeTruthy();
      expect(screen.getByTitle('Orange')).toBeTruthy();
    });
  });
});