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

     it('should render components as a select dropdown', () => {
       const { container } = render(ComponentList, { props: mockProps });
       const select = container.querySelector('select');
       expect(select).toBeInTheDocument();
       if (select) {
         expect(select.className).toContain('w-full');
         expect(select.className).toContain('px-2');
         expect(select.className).toContain('py-1');
         expect(select.className).toContain('border');
         expect(select.className).toContain('rounded');
       }
     });

     it('should render each component as a select option', () => {
       const { container } = render(ComponentList, { props: mockProps });
       const options = container.querySelectorAll('option');
       expect(options).toHaveLength(3);
     });

     it('should render components as a select element with add button', () => {
       render(ComponentList, { props: mockProps });
       const select = screen.getByRole('combobox');
       expect(select).toBeInTheDocument();
       const buttons = screen.getAllByRole('button');
       // 1 button: add button only
       expect(buttons).toHaveLength(1);
     });
   });

   describe('Component Selection', () => {
     it('should select the correct component in dropdown', () => {
       render(ComponentList, { props: mockProps });
       const select = screen.getByRole('combobox') as HTMLSelectElement;
       expect(select.value).toBe('comp2');
     });

     it('should not select non-selected components', () => {
       render(ComponentList, { props: mockProps });
       const select = screen.getByRole('combobox') as HTMLSelectElement;
       expect(select.value).toBe('comp2'); // Only one can be selected
     });

     it('should call onSelect with correct id when component is selected', async () => {
       render(ComponentList, { props: mockProps });
       const select = screen.getByRole('combobox') as HTMLSelectElement;

       await fireEvent.change(select, { target: { value: 'comp1' } });

       expect(mockProps.onSelect).toHaveBeenCalledWith('comp1');
     });

     it('should call onSelect when selected component is changed', async () => {
       render(ComponentList, { props: mockProps });
       const select = screen.getByRole('combobox') as HTMLSelectElement;

       await fireEvent.change(select, { target: { value: 'comp3' } });

       expect(mockProps.onSelect).toHaveBeenCalledWith('comp3');
     });
   });

   describe('Component Select Styling', () => {
     it('should have correct base styling for component select', () => {
       const { container } = render(ComponentList, { props: mockProps });
       const select = container.querySelector('select');

       if (select) {
         expect(select.className).toContain('w-full');
         expect(select.className).toContain('px-2');
         expect(select.className).toContain('py-1');
         expect(select.className).toContain('border');
         expect(select.className).toContain('rounded');
       }
     });

     it('should have correct selected value', () => {
       render(ComponentList, { props: mockProps });
       const select = screen.getByRole('combobox') as HTMLSelectElement;

       expect(select.value).toBe('comp2');
     });
   });

   describe('Empty State', () => {
     it('should render empty select when no components', () => {
       mockProps.components = [];
       const { container } = render(ComponentList, { props: mockProps });

       const options = container.querySelectorAll('option');
       expect(options).toHaveLength(0);
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

       const select = screen.getByRole('combobox') as HTMLSelectElement;
       expect(select.value).toBe('');
     });

     it('should handle undefined selectedId', () => {
       mockProps.selectedId = undefined;
       render(ComponentList, { props: mockProps });

       const select = screen.getByRole('combobox') as HTMLSelectElement;
       expect(select.value).toBe('');
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
       const { container } = render(ComponentList, { props: mockProps });

       expect(screen.getByText('Single Component (single)')).toBeInTheDocument();
       const options = container.querySelectorAll('option');
       expect(options).toHaveLength(1);
     });

     it('should handle large number of components', () => {
       mockProps.components = Array.from({ length: 20 }, (_, i) => ({
         id: `comp${i}`,
         name: `Component ${i}`
       }));
       const { container } = render(ComponentList, { props: mockProps });

       const options = container.querySelectorAll('option');
       expect(options).toHaveLength(20);
     });
   });

   describe('Accessibility', () => {
     it('should have semantic select structure', () => {
       const { container } = render(ComponentList, { props: mockProps });
       const select = container.querySelector('select');
       expect(select).toBeInTheDocument();
       if (select) {
         expect(select.tagName).toBe('SELECT');
       }
     });

     it('should have select element and add button', () => {
       render(ComponentList, { props: mockProps });
       const select = screen.getByRole('combobox');
       expect(select).toBeInTheDocument();
       const buttons = screen.getAllByRole('button');
       expect(buttons.length).toBe(1); // Only add button
     });

     it('should have descriptive option text', () => {
       render(ComponentList, { props: mockProps });
       expect(screen.getByText('Header Component (comp1)')).toBeInTheDocument();
       expect(screen.getByText('Footer Component (comp2)')).toBeInTheDocument();
     });
   });
});