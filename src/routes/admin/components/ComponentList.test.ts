import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import ComponentList from './ComponentList.svelte';

describe('ComponentList Component', () => {
  let mockProps: any;

  beforeEach(() => {
    mockProps = {
      components: [
        { id: 'comp1', name: 'Header Component' },
        { id: 'comp2', name: 'Footer Component' },
        { id: 'comp3', name: 'Main Content' }
      ],
      selectedId: 'comp2',
      addComponent: vi.fn(),
      onSelect: vi.fn()
    };
  });

  describe('Header Rendering', () => {
    it('should render the header title', () => {
      render(ComponentList, { props: mockProps });
      expect(screen.getByText('Components')).toBeInTheDocument();
    });

    it('should render the add button', () => {
      render(ComponentList, { props: mockProps });
      expect(screen.getByText('+ Add')).toBeInTheDocument();
    });

    it('should have correct styling for header', () => {
      const { container } = render(ComponentList, { props: mockProps });
      const header = container.querySelector('.flex.items-center.justify-between');
      expect(header).toBeInTheDocument();
      if (header) {
        expect(header.className).toContain('mb-4');
      }
    });

    it('should have correct styling for add button', () => {
      render(ComponentList, { props: mockProps });
      const addButton = screen.getByText('+ Add');
      expect(addButton.className).toContain('px-2');
      expect(addButton.className).toContain('py-1');
      expect(addButton.className).toContain('text-sm');
      expect(addButton.className).toContain('bg-teal-600');
      expect(addButton.className).toContain('text-white');
      expect(addButton.className).toContain('rounded');
    });
  });

  describe('Add Button Functionality', () => {
    it('should call addComponent when add button is clicked', async () => {
      render(ComponentList, { props: mockProps });
      const addButton = screen.getByText('+ Add');

      await fireEvent.click(addButton);

      expect(mockProps.addComponent).toHaveBeenCalled();
    });

    it('should have clickable add button with clear text', () => {
      render(ComponentList, { props: mockProps });
      const button = screen.getByRole('button', { name: /Add/i });
      expect(button).toBeInTheDocument();
    });
  });

  describe('Component List Rendering', () => {
    it('should render all components in the list', () => {
      render(ComponentList, { props: mockProps });
      expect(screen.getByText('Header Component (comp1)')).toBeInTheDocument();
      expect(screen.getByText('Footer Component (comp2)')).toBeInTheDocument();
      expect(screen.getByText('Main Content (comp3)')).toBeInTheDocument();
    });

    it('should render components as a list', () => {
      const { container } = render(ComponentList, { props: mockProps });
      const ul = container.querySelector('ul');
      expect(ul).toBeInTheDocument();
      if (ul) {
        expect(ul.className).toContain('space-y-1');
      }
    });

    it('should render each component as a list item', () => {
      const { container } = render(ComponentList, { props: mockProps });
      const listItems = container.querySelectorAll('li');
      expect(listItems).toHaveLength(3);
    });

    it('should render components as buttons', () => {
      render(ComponentList, { props: mockProps });
      const buttons = screen.getAllByRole('button');
      // 4 buttons: 3 components + 1 add button
      expect(buttons).toHaveLength(4);
    });
  });

  describe('Component Selection', () => {
    it('should highlight the selected component', () => {
      render(ComponentList, { props: mockProps });
      const selectedButton = screen.getByText('Footer Component (comp2)');
      expect(selectedButton.className).toContain('bg-teal-100');
    });

    it('should not highlight non-selected components', () => {
      render(ComponentList, { props: mockProps });
      const nonSelectedButton = screen.getByText('Header Component (comp1)');
      expect(nonSelectedButton.className).not.toContain('bg-teal-100');
    });

    it('should call onSelect with correct id when component is clicked', async () => {
      render(ComponentList, { props: mockProps });
      const componentButton = screen.getByText('Header Component (comp1)');

      await fireEvent.click(componentButton);

      expect(mockProps.onSelect).toHaveBeenCalledWith('comp1');
    });

    it('should call onSelect when selected component is clicked', async () => {
      render(ComponentList, { props: mockProps });
      const selectedButton = screen.getByText('Footer Component (comp2)');

      await fireEvent.click(selectedButton);

      expect(mockProps.onSelect).toHaveBeenCalledWith('comp2');
    });
  });

  describe('Component Button Styling', () => {
    it('should have correct base styling for component buttons', () => {
      render(ComponentList, { props: mockProps });
      const buttons = screen.getAllByRole('button').filter(btn => btn.textContent !== '+ Add');

      buttons.forEach(button => {
        expect(button.className).toContain('w-full');
        expect(button.className).toContain('text-left');
        expect(button.className).toContain('px-2');
        expect(button.className).toContain('py-1');
        expect(button.className).toContain('rounded');
      });
    });

    it('should apply selected styling only to selected component', () => {
      render(ComponentList, { props: mockProps });
      const selectedButton = screen.getByText('Footer Component (comp2)');
      const otherButtons = screen.getAllByRole('button').filter(btn =>
        btn.textContent !== '+ Add' && btn !== selectedButton
      );

      expect(selectedButton.className).toContain('bg-teal-100');
      otherButtons.forEach(button => {
        expect(button.className).not.toContain('bg-teal-100');
      });
    });
  });

  describe('Empty State', () => {
    it('should render empty list when no components', () => {
      mockProps.components = [];
      render(ComponentList, { props: mockProps });

      const listItems = screen.queryAllByRole('button').filter(btn => btn.textContent !== '+ Add');
      expect(listItems).toHaveLength(0);
    });

    it('should still render header and add button when no components', () => {
      mockProps.components = [];
      render(ComponentList, { props: mockProps });

      expect(screen.getByText('Components')).toBeInTheDocument();
      expect(screen.getByText('+ Add')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle null selectedId', () => {
      mockProps.selectedId = null;
      render(ComponentList, { props: mockProps });

      const buttons = screen.getAllByRole('button').filter(btn => btn.textContent !== '+ Add');
      buttons.forEach(button => {
        expect(button.className).not.toContain('bg-teal-100');
      });
    });

    it('should handle undefined selectedId', () => {
      mockProps.selectedId = undefined;
      render(ComponentList, { props: mockProps });

      const buttons = screen.getAllByRole('button').filter(btn => btn.textContent !== '+ Add');
      buttons.forEach(button => {
        expect(button.className).not.toContain('bg-teal-100');
      });
    });

    it('should handle components with missing name', () => {
      mockProps.components = [
        { id: 'comp1' },
        { id: 'comp2', name: 'Test' }
      ];
      render(ComponentList, { props: mockProps });

      expect(screen.getByText('(comp1)')).toBeInTheDocument();
      expect(screen.getByText('Test (comp2)')).toBeInTheDocument();
    });

    it('should handle components with missing id', () => {
      mockProps.components = [
        { name: 'Test' },
        { id: 'comp2', name: 'Test2' }
      ];
      render(ComponentList, { props: mockProps });

      expect(screen.getByText('Test ()')).toBeInTheDocument();
      expect(screen.getByText('Test2 (comp2)')).toBeInTheDocument();
    });

    it('should handle single component', () => {
      mockProps.components = [{ id: 'single', name: 'Single Component' }];
      render(ComponentList, { props: mockProps });

      expect(screen.getByText('Single Component (single)')).toBeInTheDocument();
      const listItems = screen.getAllByRole('button').filter(btn => btn.textContent !== '+ Add');
      expect(listItems).toHaveLength(1);
    });

    it('should handle large number of components', () => {
      mockProps.components = Array.from({ length: 20 }, (_, i) => ({
        id: `comp${i}`,
        name: `Component ${i}`
      }));
      render(ComponentList, { props: mockProps });

      const buttons = screen.getAllByRole('button').filter(btn => btn.textContent !== '+ Add');
      expect(buttons).toHaveLength(20);
    });
  });

  describe('Accessibility', () => {
    it('should have semantic list structure', () => {
      const { container } = render(ComponentList, { props: mockProps });
      const ul = container.querySelector('ul');
      expect(ul).toBeInTheDocument();
      if (ul) {
        expect(ul.tagName).toBe('UL');
      }
    });

    it('should have clickable buttons for all components', () => {
      render(ComponentList, { props: mockProps });
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(1); // At least add button + components
    });

    it('should have descriptive button text', () => {
      render(ComponentList, { props: mockProps });
      expect(screen.getByText('Header Component (comp1)')).toBeInTheDocument();
      expect(screen.getByText('Footer Component (comp2)')).toBeInTheDocument();
    });
  });
});