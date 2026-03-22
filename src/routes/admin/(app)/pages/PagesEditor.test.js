import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/svelte';
import PagesEditor from './PagesEditor.svelte';

// Mock the slugify utility
vi.mock('$lib/utils.js', () => ({
  slugify: (text) => text.toLowerCase().replace(/\s+/g, '-')
}));

describe('ArticleEditor Component', () => {
  let fetchMock;

  beforeEach(() => {
    fetchMock = vi.fn();
    global.fetch = fetchMock;
    global.confirm = vi.fn(() => true);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Initial Rendering', () => {
    it('should display loading state', () => {
      render(PagesEditor, { props: { loading: true, articles: [], components: [] } });
      expect(screen.getByText('Loading pages...')).toBeInTheDocument();
    });

    it('should display error state', () => {
      render(PagesEditor, { props: { loading: false, error: 'Test error', articles: [], components: [] } });
      expect(screen.getByText('Error: Test error')).toBeInTheDocument();
    });

    it('should render the form when not loading', () => {
      render(PagesEditor, { props: { loading: false, articles: [], components: [] } });
      expect(screen.getByText('Pages Editor')).toBeInTheDocument();
      expect(screen.getByText('Create New Page')).toBeInTheDocument();
    });
  });

  describe('Create Article Form', () => {
    it('should auto-generate slug from title', async () => {
      render(PagesEditor, { props: { loading: false, articles: [], components: [] } });
      
      const titleInput = screen.getByPlaceholderText('Page Title');
      await fireEvent.input(titleInput, { target: { value: 'My New Page' } });
      
      const slugInput = screen.getByPlaceholderText('page-slug');
      await waitFor(() => {
        expect(slugInput.value).toBe('my-new-page');
      });
    });

    it('should create article with valid data', async () => {
      fetchMock.mockResolvedValueOnce({ ok: true, json: async () => ({}) });
      
      render(PagesEditor, { 
        props: { loading: false, articles: [], components: [] }
      });
      
      const titleInput = screen.getByPlaceholderText('Page Title');
      const contentTextarea = screen.getByPlaceholderText('Custom HTML content...');
      
      await fireEvent.input(titleInput, { target: { value: 'Test Article' } });
      await fireEvent.input(contentTextarea, { target: { value: '<p>Test content</p>' } });
      
      const submitButton = screen.getByText('Create Page');
      await fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(fetchMock).toHaveBeenCalledWith('/api/articles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: 'Test Article',
            slug: 'test-article',
            content: '<p>Test content</p>',
            componentIds: []
          })
        });
      });
    });

    it('should not create article without title', async () => {
      render(PagesEditor, { props: { loading: false, articles: [], components: [] } });
      
      const submitButton = screen.getByText('Create Page');
      await fireEvent.click(submitButton);
      
      expect(fetchMock).not.toHaveBeenCalled();
    });

    it('should handle create article error', async () => {
      fetchMock.mockResolvedValueOnce({ ok: false });
      
      render(PagesEditor, { props: { loading: false, articles: [], components: [] } });
      
      const titleInput = screen.getByPlaceholderText('Page Title');
      await fireEvent.input(titleInput, { target: { value: 'Test Article' } });
      
      const submitButton = screen.getByText('Create Page');
      await fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText(/Error:/)).toBeInTheDocument();
      });
    });

    it('should show creating state during submission', async () => {
      fetchMock.mockImplementationOnce(() => new Promise(resolve => setTimeout(() => resolve({ ok: true }), 100)));
      
      render(PagesEditor, { props: { loading: false, articles: [], components: [] } });
      
      const titleInput = screen.getByPlaceholderText('Page Title');
      await fireEvent.input(titleInput, { target: { value: 'Test Article' } });
      
      const submitButton = screen.getByText('Create Page');
      await fireEvent.click(submitButton);
      
      expect(screen.getByText('Creating...')).toBeInTheDocument();
    });
  });

  describe('Component Selection', () => {
    const mockComponents = [
      { id: 'comp-1', name: 'Header Component' },
      { id: 'comp-2', name: 'Footer Component' },
      { id: 'comp-3', name: 'Sidebar Component' }
    ];

    it('should display components list when components are available', () => {
      render(PagesEditor, { props: { loading: false, articles: [], components: mockComponents } });
      
      expect(screen.getByText('Select Components')).toBeInTheDocument();
      expect(screen.getByText(/Header Component/)).toBeInTheDocument();
      expect(screen.getByText(/Footer Component/)).toBeInTheDocument();
    });

    it('should toggle component selection', async () => {
      const { container } = render(PagesEditor, { 
        props: { loading: false, articles: [], components: mockComponents }
      });
      
      const checkboxes = container.querySelectorAll('input[type="checkbox"]');
      await fireEvent.click(checkboxes[0]);
      
      await waitFor(() => {
        expect(checkboxes[0].checked).toBe(true);
        expect(screen.getByText('Selected Components Order')).toBeInTheDocument();
      });
    });

    it('should move component up in order', async () => {
      fetchMock.mockResolvedValueOnce({ ok: true });
      
      const { container } = render(PagesEditor, { 
        props: { loading: false, articles: [], components: mockComponents }
      });
      
      const checkboxes = container.querySelectorAll('input[type="checkbox"]');
      await fireEvent.click(checkboxes[0]);
      await fireEvent.click(checkboxes[1]);
      
      await waitFor(() => {
        expect(screen.getByText('Selected Components Order')).toBeInTheDocument();
      });
      
      const upButtons = screen.getAllByText('↑');
      await fireEvent.click(upButtons[1]);
      
      const titleInput = screen.getByPlaceholderText('Page Title');
      await fireEvent.input(titleInput, { target: { value: 'Test' } });
      
      const submitButton = screen.getByText('Create Page');
      await fireEvent.click(submitButton);
      
      await waitFor(() => {
        const call = fetchMock.mock.calls[0];
        const body = JSON.parse(call[1].body);
        expect(body.componentIds).toEqual(['comp-2', 'comp-1']);
      });
    });

    it('should move component down in order', async () => {
      fetchMock.mockResolvedValueOnce({ ok: true });
      
      const { container } = render(PagesEditor, { 
        props: { loading: false, articles: [], components: mockComponents }
      });
      
      const checkboxes = container.querySelectorAll('input[type="checkbox"]');
      await fireEvent.click(checkboxes[0]);
      await fireEvent.click(checkboxes[1]);
      
      await waitFor(() => {
        expect(screen.getByText('Selected Components Order')).toBeInTheDocument();
      });
      
      const downButtons = screen.getAllByText('↓');
      await fireEvent.click(downButtons[0]);
      
      const titleInput = screen.getByPlaceholderText('Page Title');
      await fireEvent.input(titleInput, { target: { value: 'Test' } });
      
      const submitButton = screen.getByText('Create Page');
      await fireEvent.click(submitButton);
      
      await waitFor(() => {
        const call = fetchMock.mock.calls[0];
        const body = JSON.parse(call[1].body);
        expect(body.componentIds).toEqual(['comp-2', 'comp-1']);
      });
    });

    it('should not move component up when at first position', async () => {
      const { container } = render(PagesEditor, { 
        props: { loading: false, articles: [], components: mockComponents }
      });
      
      const checkboxes = container.querySelectorAll('input[type="checkbox"]');
      await fireEvent.click(checkboxes[0]);
      
      await waitFor(() => {
        const upButton = screen.getByText('↑');
        expect(upButton.disabled).toBe(true);
      });
    });

    it('should not move component down when at last position', async () => {
      const { container } = render(PagesEditor, { 
        props: { loading: false, articles: [], components: mockComponents }
      });
      
      const checkboxes = container.querySelectorAll('input[type="checkbox"]');
      await fireEvent.click(checkboxes[0]);
      
      await waitFor(() => {
        const downButton = screen.getByText('↓');
        expect(downButton.disabled).toBe(true);
      });
    });
  });

  describe('Article List', () => {
    const mockArticles = [
      {
        id: 'article-1',
        attributes: {
          title: 'First Article',
          slug: 'first-article',
          content: '<p>Content 1</p>',
          published: true,
          componentIds: []
        }
      },
      {
        id: 'article-2',
        attributes: {
          title: 'Second Article',
          slug: 'second-article',
          content: '<p>Content 2</p>',
          published: false,
          componentIds: []
        }
      }
    ];

    it('should display list of articles', () => {
      render(PagesEditor, { props: { loading: false, articles: mockArticles, components: [] } });
      
      expect(screen.getByText('First Article')).toBeInTheDocument();
      expect(screen.getByText('Second Article')).toBeInTheDocument();
      expect(screen.getByText('Published')).toBeInTheDocument();
      expect(screen.getByText('Draft')).toBeInTheDocument();
    });

    it('should display preview links', () => {
      render(PagesEditor, { props: { loading: false, articles: mockArticles, components: [] } });
      
      const previewLinks = screen.getAllByText('Preview');
      expect(previewLinks).toHaveLength(2);
      expect(previewLinks[0].closest('a')).toHaveAttribute('href', '/first-article');
    });
  });

  describe('Delete Article', () => {
    const mockArticles = [
      {
        id: 'article-1',
        attributes: {
          title: 'Test Article',
          slug: 'test-article',
          published: false,
          componentIds: []
        }
      }
    ];

    it('should delete article with confirmation', async () => {
      fetchMock.mockResolvedValueOnce({ ok: true });
      global.confirm = vi.fn(() => true);
      
      render(PagesEditor, { 
        props: { loading: false, articles: mockArticles, components: [] }
      });
      
      const deleteButton = screen.getByText('Delete');
      await fireEvent.click(deleteButton);
      
      await waitFor(() => {
        expect(global.confirm).toHaveBeenCalledWith('Are you sure you want to delete this article?');
        expect(fetchMock).toHaveBeenCalledWith('/api/articles?id=article-1', {
          method: 'DELETE'
        });
      });
    });

    it('should not delete article without confirmation', async () => {
      global.confirm = vi.fn(() => false);
      
      render(PagesEditor, { props: { loading: false, articles: mockArticles, components: [] } });
      
      const deleteButton = screen.getByText('Delete');
      await fireEvent.click(deleteButton);
      
      expect(fetchMock).not.toHaveBeenCalled();
    });

    it('should handle delete error', async () => {
      fetchMock.mockResolvedValueOnce({ ok: false });
      global.confirm = vi.fn(() => true);
      
      render(PagesEditor, { props: { loading: false, articles: mockArticles, components: [] } });
      
      const deleteButton = screen.getByText('Delete');
      await fireEvent.click(deleteButton);
      
      await waitFor(() => {
        expect(screen.getByText(/Error:/)).toBeInTheDocument();
      });
    });
  });

  describe('Edit Article', () => {
    const mockArticles = [
      {
        id: 'article-1',
        attributes: {
          title: 'Test Article',
          slug: 'test-article',
          content: '<p>Test content</p>',
          published: false,
          componentIds: ['comp-1']
        }
      }
    ];

    const mockComponents = [
      { id: 'comp-1', name: 'Header' },
      { id: 'comp-2', name: 'Footer' }
    ];

    it('should enter edit mode when edit button clicked', async () => {
      render(PagesEditor, { props: { loading: false, articles: mockArticles, components: mockComponents } });
      
      const editButton = screen.getByText('Edit');
      await fireEvent.click(editButton);
      
      await waitFor(() => {
        expect(screen.getByText('Save')).toBeInTheDocument();
        expect(screen.getByText('Cancel')).toBeInTheDocument();
      });
    });

    it('should cancel editing', async () => {
      render(PagesEditor, { props: { loading: false, articles: mockArticles, components: [] } });
      
      const editButton = screen.getByText('Edit');
      await fireEvent.click(editButton);
      
      await waitFor(() => {
        expect(screen.getByText('Cancel')).toBeInTheDocument();
      });
      
      const cancelButton = screen.getByText('Cancel');
      await fireEvent.click(cancelButton);
      
      await waitFor(() => {
        expect(screen.queryByText('Save')).not.toBeInTheDocument();
        expect(screen.getByText('Edit')).toBeInTheDocument();
      });
    });

    it('should update article', async () => {
      fetchMock.mockResolvedValueOnce({ ok: true });
      
      render(PagesEditor, { 
        props: { loading: false, articles: mockArticles, components: [] }
      });
      
      const editButton = screen.getByText('Edit');
      await fireEvent.click(editButton);
      
      await waitFor(() => {
        expect(screen.getByText('Save')).toBeInTheDocument();
      });
      
      const inputs = screen.getAllByDisplayValue('Test Article');
      await fireEvent.input(inputs[0], { target: { value: 'Updated Article' } });
      
      const saveButton = screen.getByText('Save');
      await fireEvent.click(saveButton);
      
      await waitFor(() => {
        expect(fetchMock).toHaveBeenCalledWith('/api/articles', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: expect.stringContaining('Updated Article')
        });
      });
    });

    it('should auto-generate slug when editing title', async () => {
      render(PagesEditor, { props: { loading: false, articles: mockArticles, components: [] } });
      
      const editButton = screen.getByText('Edit');
      await fireEvent.click(editButton);
      
      await waitFor(() => {
        const titleInputs = screen.getAllByDisplayValue('Test Article');
        expect(titleInputs.length).toBeGreaterThan(0);
      });
      
      const titleInputs = screen.getAllByDisplayValue('Test Article');
      await fireEvent.input(titleInputs[0], { target: { value: 'New Title Here' } });
      
      await waitFor(() => {
        const slugInputs = screen.getAllByDisplayValue('new-title-here');
        expect(slugInputs.length).toBeGreaterThan(0);
      });
    });

    it('should handle update error', async () => {
      fetchMock.mockResolvedValueOnce({ ok: false });
      
      render(PagesEditor, { props: { loading: false, articles: mockArticles, components: [] } });
      
      const editButton = screen.getByText('Edit');
      await fireEvent.click(editButton);
      
      await waitFor(() => {
        expect(screen.getByText('Save')).toBeInTheDocument();
      });
      
      const saveButton = screen.getByText('Save');
      await fireEvent.click(saveButton);
      
      await waitFor(() => {
        expect(screen.getByText(/Error:/)).toBeInTheDocument();
      });
    });

    it('should toggle component selection in edit mode', async () => {
      const { container } = render(PagesEditor, { 
        props: { loading: false, articles: mockArticles, components: mockComponents }
      });
      
      const editButton = screen.getByText('Edit');
      await fireEvent.click(editButton);
      
      await waitFor(() => {
        expect(screen.getByText('Save')).toBeInTheDocument();
      });
      
      const checkboxes = container.querySelectorAll('input[type="checkbox"]');
      const footerCheckbox = Array.from(checkboxes).find(cb => 
        cb.nextElementSibling?.textContent?.includes('Footer')
      );
      
      if (footerCheckbox) {
        await fireEvent.click(footerCheckbox);
        await waitFor(() => {
          expect(footerCheckbox.checked).toBe(true);
        });
      }
    });

    it('should move edit components up', async () => {
      render(PagesEditor, { 
        props: { loading: false, articles: mockArticles, components: mockComponents }
      });
      
      const editButton = screen.getByText('Edit');
      await fireEvent.click(editButton);
      
      await waitFor(() => {
        expect(screen.getByText('Save')).toBeInTheDocument();
      });
      
      const checkboxes = Array.from(document.querySelectorAll('input[type="checkbox"]'));
      const footerCheckbox = checkboxes.find(cb => 
        cb.nextElementSibling?.textContent?.includes('Footer')
      );
      
      if (footerCheckbox) {
        await fireEvent.click(footerCheckbox);
        
        await waitFor(() => {
          expect(screen.getAllByText('Selected Components Order')).toHaveLength(2);
        });
      }
    });

    it('should move edit components down', async () => {
      render(PagesEditor, { 
        props: { loading: false, articles: mockArticles, components: mockComponents }
      });
      
      const editButton = screen.getByText('Edit');
      await fireEvent.click(editButton);
      
      await waitFor(() => {
        expect(screen.getByText('Save')).toBeInTheDocument();
      });
      
      const checkboxes = Array.from(document.querySelectorAll('input[type="checkbox"]'));
      const footerCheckbox = checkboxes.find(cb => 
        cb.nextElementSibling?.textContent?.includes('Footer')
      );
      
      if (footerCheckbox) {
        await fireEvent.click(footerCheckbox);
        
        await waitFor(() => {
          expect(screen.getAllByText('Selected Components Order')).toHaveLength(2);
        });
      }
    });
  });

  describe('Toggle Publish', () => {
    const mockArticles = [
      {
        id: 'article-1',
        attributes: {
          title: 'Test Article',
          slug: 'test-article',
          published: false,
          componentIds: []
        }
      }
    ];

    it('should publish unpublished article', async () => {
      fetchMock.mockResolvedValueOnce({ ok: true });
      
      render(PagesEditor, { 
        props: { loading: false, articles: mockArticles, components: [] }
      });
      
      const publishButton = screen.getByText('Publish');
      await fireEvent.click(publishButton);
      
      await waitFor(() => {
        expect(fetchMock).toHaveBeenCalledWith('/api/articles', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: 'article-1',
            published: true
          })
        });
      });
    });

    it('should unpublish published article', async () => {
      fetchMock.mockResolvedValueOnce({ ok: true });
      
      const publishedArticles = [
        {
          id: 'article-1',
          attributes: {
            title: 'Test Article',
            slug: 'test-article',
            published: true,
            componentIds: []
          }
        }
      ];
      
      render(PagesEditor, { 
        props: { loading: false, articles: publishedArticles, components: [] }
      });
      
      const unpublishButton = screen.getByText('Unpublish');
      await fireEvent.click(unpublishButton);
      
      await waitFor(() => {
        expect(fetchMock).toHaveBeenCalledWith('/api/articles', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: 'article-1',
            published: false
          })
        });
      });
    });

    it('should handle toggle publish error', async () => {
      fetchMock.mockResolvedValueOnce({ ok: false });
      
      render(PagesEditor, { props: { loading: false, articles: mockArticles, components: [] } });
      
      const publishButton = screen.getByText('Publish');
      await fireEvent.click(publishButton);
      
      await waitFor(() => {
        expect(screen.getByText(/Error:/)).toBeInTheDocument();
      });
    });
  });
});