import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import ComponentEditor from './ComponentEditor.svelte';

describe('ComponentEditor Component', () => {
  let mockProps: any;

  beforeEach(() => {
    mockProps = {
      selected: {
        id: 'test-component',
        name: 'Test Component',
        html: '<div>Test HTML</div>'
      },
      updateSelected: vi.fn(),
      applyBlocksToHtml: vi.fn()
    };
  });

  describe('Conditional Rendering', () => {
    it('should render the component when selected is provided', () => {
      render(ComponentEditor, { props: mockProps });
      expect(screen.getByText('ID')).toBeInTheDocument();
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('HTML')).toBeInTheDocument();
    });
  });

  describe('ID Field', () => {
    it('should display the selected id', () => {
      render(ComponentEditor, { props: mockProps });
      const idInput = screen.getByLabelText('ID') as HTMLInputElement;
      expect(idInput.value).toBe('test-component');
    });

    it('should call updateSelected when id input changes', async () => {
      render(ComponentEditor, { props: mockProps });
      const idInput = screen.getByLabelText('ID');

      await fireEvent.input(idInput, { target: { value: 'new-id' } });

      expect(mockProps.updateSelected).toHaveBeenCalledWith('id', 'new-id');
    });

    it('should have correct styling for id input', () => {
      render(ComponentEditor, { props: mockProps });
      const idInput = screen.getByLabelText('ID');
      expect(idInput.className).toContain('w-full');
      expect(idInput.className).toContain('border');
      expect(idInput.className).toContain('px-2');
      expect(idInput.className).toContain('py-1');
      expect(idInput.className).toContain('rounded');
    });
  });

  describe('Name Field', () => {
    it('should display the selected name', () => {
      render(ComponentEditor, { props: mockProps });
      const nameInput = screen.getByLabelText('Name') as HTMLInputElement;
      expect(nameInput.value).toBe('Test Component');
    });

    it('should call updateSelected when name input changes', async () => {
      render(ComponentEditor, { props: mockProps });
      const nameInput = screen.getByLabelText('Name');

      await fireEvent.input(nameInput, { target: { value: 'New Name' } });

      expect(mockProps.updateSelected).toHaveBeenCalledWith('name', 'New Name');
    });

    it('should have correct styling for name input', () => {
      render(ComponentEditor, { props: mockProps });
      const nameInput = screen.getByLabelText('Name');
      expect(nameInput.className).toContain('w-full');
      expect(nameInput.className).toContain('border');
    });
  });

  describe('HTML Field', () => {
    it('should display the selected html', () => {
      render(ComponentEditor, { props: mockProps });
      const htmlTextarea = screen.getByLabelText('HTML') as HTMLTextAreaElement;
      expect(htmlTextarea.value).toBe('<div>Test HTML</div>');
    });

    it('should call updateSelected when html textarea changes', async () => {
      render(ComponentEditor, { props: mockProps });
      const htmlTextarea = screen.getByLabelText('HTML');

      await fireEvent.input(htmlTextarea, { target: { value: '<p>New HTML</p>' } });

      expect(mockProps.updateSelected).toHaveBeenCalledWith('html', '<p>New HTML</p>');
    });

    it('should have correct styling for html textarea', () => {
      render(ComponentEditor, { props: mockProps });
      const htmlTextarea = screen.getByLabelText('HTML');
      expect(htmlTextarea.className).toContain('w-full');
      expect(htmlTextarea.className).toContain('border');
      expect(htmlTextarea.className).toContain('font-mono');
      expect(htmlTextarea.className).toContain('h-48');
    });

    it('should be a textarea element', () => {
      render(ComponentEditor, { props: mockProps });
      const htmlTextarea = screen.getByLabelText('HTML');
      expect(htmlTextarea.tagName).toBe('TEXTAREA');
    });
  });

  describe('Auto Generation Notice', () => {
    it('should display auto generation notice', () => {
      render(ComponentEditor, { props: mockProps });
      expect(screen.getByText('(HTML is automatically generated from the blocks below)')).toBeInTheDocument();
    });
  });

  describe('Layout and Styling', () => {
    it('should have proper spacing between form fields', () => {
      const { container } = render(ComponentEditor, { props: mockProps });
      const mainDiv = container.querySelector('.space-y-4');
      expect(mainDiv).toBeInTheDocument();
    });

    it('should have proper label styling', () => {
      const { container } = render(ComponentEditor, { props: mockProps });
      const labels = container.querySelectorAll('label');
      labels.forEach(label => {
        expect(label.className).toContain('block');
        expect(label.className).toContain('text-sm');
        expect(label.className).toContain('font-medium');
        expect(label.className).toContain('mb-1');
      });
    });

    it('should have notice container with proper styling', () => {
      const { container } = render(ComponentEditor, { props: mockProps });
      const noticeContainer = container.querySelector('.mt-2.text-sm');
      expect(noticeContainer).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should associate labels with inputs', () => {
      render(ComponentEditor, { props: mockProps });

      const idInput = screen.getByLabelText('ID');
      const nameInput = screen.getByLabelText('Name');
      const htmlTextarea = screen.getByLabelText('HTML');

      expect(idInput).toHaveAttribute('id', 'component-id');
      expect(nameInput).toHaveAttribute('id', 'component-name');
      expect(htmlTextarea).toHaveAttribute('id', 'component-html');
    });

    it('should have semantic form structure', () => {
      render(ComponentEditor, { props: mockProps });
      expect(screen.getByRole('textbox', { name: 'ID' })).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: 'Name' })).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: 'HTML' })).toBeInTheDocument();
    });


  });

  describe('Edge Cases', () => {
    it('should handle empty selected object', () => {
      mockProps.selected = {};
      render(ComponentEditor, { props: mockProps });

      const idInput = screen.getByLabelText('ID') as HTMLInputElement;
      const nameInput = screen.getByLabelText('Name') as HTMLInputElement;
      const htmlTextarea = screen.getByLabelText('HTML') as HTMLTextAreaElement;

      expect(idInput.value).toBe('');
      expect(nameInput.value).toBe('');
      expect(htmlTextarea.value).toBe('');
    });

    it('should handle selected with undefined properties', () => {
      mockProps.selected = { id: undefined, name: undefined, html: undefined };
      render(ComponentEditor, { props: mockProps });

      const idInput = screen.getByLabelText('ID') as HTMLInputElement;
      const nameInput = screen.getByLabelText('Name') as HTMLInputElement;
      const htmlTextarea = screen.getByLabelText('HTML') as HTMLTextAreaElement;

      expect(idInput.value).toBe('');
      expect(nameInput.value).toBe('');
      expect(htmlTextarea.value).toBe('');
    });

    it('should handle selected with null properties', () => {
      mockProps.selected = { id: null, name: null, html: null };
      render(ComponentEditor, { props: mockProps });

      const idInput = screen.getByLabelText('ID') as HTMLInputElement;
      const nameInput = screen.getByLabelText('Name') as HTMLInputElement;
      const htmlTextarea = screen.getByLabelText('HTML') as HTMLTextAreaElement;

      expect(idInput.value).toBe('');
      expect(nameInput.value).toBe('');
      expect(htmlTextarea.value).toBe('');
    });
  });
});