import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Preview from './Preview.svelte';

describe('Preview Component', () => {
  let mockProps: any;

  beforeEach(() => {
    mockProps = {
      selected: {
        html: '<div class="test-content">Test HTML Content</div>'
      }
    };
  });

  describe('Basic Rendering', () => {
    it('should render the preview title', () => {
      render(Preview, { props: mockProps });
      expect(screen.getByText('Preview')).toBeInTheDocument();
    });

    it('should render the HTML content', () => {
      render(Preview, { props: mockProps });
      expect(screen.getByText('Test HTML Content')).toBeInTheDocument();
    });

    it('should render HTML elements correctly', () => {
      render(Preview, { props: mockProps });
      const testDiv = screen.getByText('Test HTML Content');
      expect(testDiv.className).toBe('test-content');
    });
  });

  describe('Styling and Layout', () => {
    it('should have correct container styling', () => {
      const { container } = render(Preview, { props: mockProps });
      const mainDiv = container.querySelector('.mt-6.border-t.pt-4');
      expect(mainDiv).toBeInTheDocument();
    });

    it('should have correct title styling', () => {
      render(Preview, { props: mockProps });
      const title = screen.getByText('Preview');
      expect(title.className).toContain('font-semibold');
      expect(title.className).toContain('mb-2');
    });

    it('should have correct preview container styling', () => {
      const { container } = render(Preview, { props: mockProps });
      const previewDiv = container.querySelector('.border.p-4');
      expect(previewDiv).toBeInTheDocument();
    });

    it('should have semantic heading', () => {
      const { container } = render(Preview, { props: mockProps });
      const heading = container.querySelector('h2');
      expect(heading).toBeInTheDocument();
      expect(heading.textContent).toBe('Preview');
    });
  });

  describe('HTML Content Rendering', () => {
    it('should render simple HTML tags', () => {
      mockProps.selected.html = '<p>Simple paragraph</p>';
      render(Preview, { props: mockProps });
      expect(screen.getByText('Simple paragraph')).toBeInTheDocument();
    });

    it('should render complex HTML structures', () => {
      mockProps.selected.html = '<div><h1>Title</h1><p>Content</p></div>';
      render(Preview, { props: mockProps });
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('should render HTML with attributes', () => {
      mockProps.selected.html = '<a href="/test" class="link">Link</a>';
      render(Preview, { props: mockProps });
      const link = screen.getByText('Link');
      expect(link.tagName).toBe('A');
      expect(link.getAttribute('href')).toBe('/test');
      expect(link.className).toBe('link');
    });

    it('should render multiple elements', () => {
      mockProps.selected.html = '<span>First</span><span>Second</span>';
      render(Preview, { props: mockProps });
      expect(screen.getByText('First')).toBeInTheDocument();
      expect(screen.getByText('Second')).toBeInTheDocument();
    });

    it('should handle empty HTML content', () => {
      mockProps.selected.html = '';
      const { container } = render(Preview, { props: mockProps });
      const previewDiv = container.querySelector('.border.p-4');
      expect(previewDiv).toBeInTheDocument();
      if (previewDiv) {
        expect(previewDiv.textContent).toBe('');
      }
    });

    it('should handle HTML with only whitespace', () => {
      mockProps.selected.html = '   ';
      const { container } = render(Preview, { props: mockProps });
      const previewDiv = container.querySelector('.border.p-4');
      expect(previewDiv).toBeInTheDocument();
      if (previewDiv && previewDiv.textContent) {
        expect(previewDiv.textContent.trim()).toBe('');
      }
    });
  });

  describe('Edge Cases', () => {
    it('should handle null selected prop gracefully', () => {
      mockProps.selected = null;
      expect(() => render(Preview, { props: mockProps })).not.toThrow();
    });

    it('should handle undefined selected prop gracefully', () => {
      mockProps.selected = undefined;
      expect(() => render(Preview, { props: mockProps })).not.toThrow();
    });

    it('should handle selected with null html', () => {
      mockProps.selected.html = null;
      const { container } = render(Preview, { props: mockProps });
      const previewDiv = container.querySelector('.border.p-4');
      expect(previewDiv).toBeInTheDocument();
      if (previewDiv) {
        expect(previewDiv.textContent).toBe('null');
      }
    });

    it('should handle selected with undefined html', () => {
      mockProps.selected.html = undefined;
      const { container } = render(Preview, { props: mockProps });
      const previewDiv = container.querySelector('.border.p-4');
      expect(previewDiv).toBeInTheDocument();
      if (previewDiv) {
        expect(previewDiv.textContent).toBe('undefined');
      }
    });

    it('should handle selected without html property', () => {
      mockProps.selected = {};
      const { container } = render(Preview, { props: mockProps });
      const previewDiv = container.querySelector('.border.p-4');
      expect(previewDiv).toBeInTheDocument();
      if (previewDiv) {
        expect(previewDiv.textContent).toBe('undefined');
      }
    });

    it('should handle HTML with nested elements', () => {
      mockProps.selected.html = '<div><ul><li>Item 1</li><li>Item 2</li></ul></div>';
      render(Preview, { props: mockProps });
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    it('should handle HTML with inline styles', () => {
      mockProps.selected.html = '<span style="color: red;">Red text</span>';
      render(Preview, { props: mockProps });
      const span = screen.getByText('Red text');
      expect(span.getAttribute('style')).toBe('color: red;');
    });
  });

  describe('Accessibility', () => {
    it('should have semantic heading structure', () => {
      const { container } = render(Preview, { props: mockProps });
      const heading = container.querySelector('h2');
      expect(heading).toBeInTheDocument();
      if (heading) {
        expect(heading.textContent).toBe('Preview');
      }
    });

    it('should render content in a contained area', () => {
      const { container } = render(Preview, { props: mockProps });
      const previewDiv = container.querySelector('.border.p-4');
      expect(previewDiv).toBeInTheDocument();
      if (previewDiv) {
        expect(previewDiv.children).toHaveLength(1);
      }
    });
  });

  describe('Content Safety', () => {
    it('should render HTML content as provided', () => {
      mockProps.selected.html = '<strong>Bold text</strong>';
      render(Preview, { props: mockProps });
      const boldElement = screen.getByText('Bold text');
      expect(boldElement.tagName).toBe('STRONG');
    });

    it('should handle self-closing tags', () => {
      mockProps.selected.html = '<img src="test.jpg" alt="test" />';
      render(Preview, { props: mockProps });
      const img = document.querySelector('img');
      expect(img).toBeInTheDocument();
      if (img) {
        expect(img.getAttribute('src')).toBe('test.jpg');
        expect(img.getAttribute('alt')).toBe('test');
      }
    });
  });
});