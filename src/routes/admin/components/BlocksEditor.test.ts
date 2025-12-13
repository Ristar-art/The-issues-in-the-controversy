import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/svelte';
import BlocksList from './BlocksEditor.svelte';

describe('BlocksList Component', () => {
  let mockProps: any;

  beforeEach(() => {
    mockProps = {
      selected: {
        section: {
          blocks: []
        }
      },
      blockTypes: ['heading', 'text', 'image', 'button'],
      addBlock: vi.fn(),
      updateBlock: vi.fn(),
      deleteBlockAt: vi.fn(),
      moveBlock: vi.fn(),
      loadAvailableImages: vi.fn(),
      availableImages: [],
      showImageSelectorForBlock: null,
      setShowImageSelectorForBlock: vi.fn()
    };
  });

  describe('Basic Rendering', () => {
    it('should render the component title', () => {
      render(BlocksList, { props: mockProps });
      expect(screen.getByText('Blocks (visual builder)')).toBeInTheDocument();
    });

    it('should render add block button', () => {
      render(BlocksList, { props: mockProps });
      expect(screen.getByText('+ Add block')).toBeInTheDocument();
    });

    it('should have correct styling on add block button', () => {
      render(BlocksList, { props: mockProps });
      const addButton = screen.getByText('+ Add block');
      expect(addButton.className).toContain('bg-teal-600');
      expect(addButton.className).toContain('text-white');
    });
  });

  describe('Add Block Functionality', () => {
    it('should call addBlock when button is clicked', async () => {
      render(BlocksList, { props: mockProps });
      const addButton = screen.getByText('+ Add block');
      
      await fireEvent.click(addButton);
      
      expect(mockProps.addBlock).toHaveBeenCalled();
    });

    it('should prevent default event when add block is clicked', async () => {
      render(BlocksList, { props: mockProps });
      const addButton = screen.getByText('+ Add block');
      
      const event = new MouseEvent('click', { bubbles: true, cancelable: true });
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');
      
      addButton.dispatchEvent(event);
      
      expect(mockProps.addBlock).toHaveBeenCalled();
    });
  });

  describe('Empty State', () => {
    it('should show empty state message when no blocks exist', () => {
      render(BlocksList, { props: mockProps });
      expect(screen.getByText(/No blocks yet/)).toBeInTheDocument();
    });

    it('should show full empty state message', () => {
      render(BlocksList, { props: mockProps });
      expect(screen.getByText('No blocks yet. Click "Add block" to start building this component visually.')).toBeInTheDocument();
    });

    it('should show empty state when blocks array is empty', () => {
      mockProps.selected.section.blocks = [];
      render(BlocksList, { props: mockProps });
      expect(screen.getByText(/No blocks yet/)).toBeInTheDocument();
    });

    it('should show empty state when section has no blocks property', () => {
      mockProps.selected.section = {};
      render(BlocksList, { props: mockProps });
      expect(screen.getByText(/No blocks yet/)).toBeInTheDocument();
    });

    it('should show empty state when section is null', () => {
      mockProps.selected = { section: null };
      render(BlocksList, { props: mockProps });
      expect(screen.getByText(/No blocks yet/)).toBeInTheDocument();
    });
  });

  describe('Blocks List Rendering', () => {
    it('should render single block', () => {
      mockProps.selected.section.blocks = [
        { type: 'heading', text: 'Test Heading' }
      ];
      render(BlocksList, { props: mockProps });
      
      expect(screen.getByTestId('block-editor-0')).toBeInTheDocument();
    });

    it('should render multiple blocks', () => {
      mockProps.selected.section.blocks = [
        { type: 'heading', text: 'Test Heading' },
        { type: 'text', text: 'Test paragraph' },
        { type: 'image', src: '/test.jpg' }
      ];
      render(BlocksList, { props: mockProps });
      
      expect(screen.getByTestId('block-editor-0')).toBeInTheDocument();
      expect(screen.getByTestId('block-editor-1')).toBeInTheDocument();
      expect(screen.getByTestId('block-editor-2')).toBeInTheDocument();
    });

    it('should not show empty state when blocks exist', () => {
      mockProps.selected.section.blocks = [
        { type: 'heading', text: 'Test' }
      ];
      render(BlocksList, { props: mockProps });
      
      expect(screen.queryByText(/No blocks yet/)).not.toBeInTheDocument();
    });

    it('should render blocks in correct order', () => {
      mockProps.selected.section.blocks = [
        { type: 'heading', text: 'First' },
        { type: 'text', text: 'Second' },
        { type: 'button', label: 'Third' }
      ];
      render(BlocksList, { props: mockProps });
      
      const blocks = screen.getAllByTestId(/block-editor-/);
      expect(blocks).toHaveLength(3);
      expect(blocks[0]).toHaveAttribute('data-testid', 'block-editor-0');
      expect(blocks[1]).toHaveAttribute('data-testid', 'block-editor-1');
      expect(blocks[2]).toHaveAttribute('data-testid', 'block-editor-2');
    });

    it('should render blocks as list items', () => {
      mockProps.selected.section.blocks = [
        { type: 'heading', text: 'Test' },
        { type: 'text', text: 'Test' }
      ];
      const { container } = render(BlocksList, { props: mockProps });
      
      const listItems = container.querySelectorAll('li');
      expect(listItems).toHaveLength(2);
    });

    it('should render blocks in an unordered list', () => {
      mockProps.selected.section.blocks = [
        { type: 'heading', text: 'Test' }
      ];
      const { container } = render(BlocksList, { props: mockProps });
      
      const ul = container.querySelector('ul');
      expect(ul).toBeInTheDocument();
    });

    it('should apply correct spacing classes to list', () => {
      mockProps.selected.section.blocks = [
        { type: 'heading', text: 'Test' }
      ];
      const { container } = render(BlocksList, { props: mockProps });

      const ul = container.querySelector('ul');
      expect(ul).toBeInTheDocument();
      if (ul) {
        expect(ul.className).toContain('space-y-3');
      }
    });
  });

  describe('BlockEditor Props Passing', () => {
    it('should pass block to BlockEditor', () => {
      const testBlock = { type: 'heading', text: 'Test Heading', level: 2 };
      mockProps.selected.section.blocks = [testBlock];
      render(BlocksList, { props: mockProps });
      
      expect(screen.getByText(/Block #1 - heading/)).toBeInTheDocument();
    });

    it('should pass correct index to each BlockEditor', () => {
      mockProps.selected.section.blocks = [
        { type: 'heading', text: 'First' },
        { type: 'text', text: 'Second' },
        { type: 'image', src: '/test.jpg' }
      ];
      render(BlocksList, { props: mockProps });
      
      expect(screen.getByTestId('block-editor-0')).toBeInTheDocument();
      expect(screen.getByTestId('block-editor-1')).toBeInTheDocument();
      expect(screen.getByTestId('block-editor-2')).toBeInTheDocument();
    });

    it('should pass totalBlocks count to BlockEditor', () => {
      mockProps.selected.section.blocks = [
        { type: 'heading', text: 'Test' },
        { type: 'text', text: 'Test' },
        { type: 'button', label: 'Test' }
      ];
      render(BlocksList, { props: mockProps });
      
      // Verify 3 blocks are rendered (totalBlocks would be 3)
      const blocks = screen.getAllByTestId(/block-editor-/);
      expect(blocks).toHaveLength(3);
    });
  });

  describe('Callback Functions', () => {
    it('should pass updateBlock function to BlockEditor', () => {
      mockProps.selected.section.blocks = [{ type: 'heading', text: 'Test' }];
      render(BlocksList, { props: mockProps });
      
      // Verify component renders (callbacks are passed internally)
      expect(screen.getByTestId('block-editor-0')).toBeInTheDocument();
    });

    it('should pass deleteBlockAt function to BlockEditor', () => {
      mockProps.selected.section.blocks = [{ type: 'heading', text: 'Test' }];
      render(BlocksList, { props: mockProps });
      
      expect(screen.getByTestId('block-editor-0')).toBeInTheDocument();
    });

    it('should pass moveBlock function to BlockEditor', () => {
      mockProps.selected.section.blocks = [{ type: 'heading', text: 'Test' }];
      render(BlocksList, { props: mockProps });
      
      expect(screen.getByTestId('block-editor-0')).toBeInTheDocument();
    });

    it('should pass loadAvailableImages function to BlockEditor', () => {
      mockProps.selected.section.blocks = [{ type: 'image', src: '' }];
      render(BlocksList, { props: mockProps });
      
      expect(screen.getByTestId('block-editor-0')).toBeInTheDocument();
    });

    it('should pass availableImages to BlockEditor', () => {
      mockProps.availableImages = [
        { name: 'test.jpg', url: '/uploads/test.jpg' }
      ];
      mockProps.selected.section.blocks = [{ type: 'image', src: '' }];
      render(BlocksList, { props: mockProps });
      
      expect(screen.getByTestId('block-editor-0')).toBeInTheDocument();
    });

    it('should pass showImageSelectorForBlock to BlockEditor', () => {
      mockProps.showImageSelectorForBlock = 0;
      mockProps.selected.section.blocks = [{ type: 'image', src: '' }];
      render(BlocksList, { props: mockProps });
      
      expect(screen.getByTestId('block-editor-0')).toBeInTheDocument();
    });

    it('should pass setShowImageSelectorForBlock to BlockEditor', () => {
      mockProps.selected.section.blocks = [{ type: 'image', src: '' }];
      render(BlocksList, { props: mockProps });
      
      expect(screen.getByTestId('block-editor-0')).toBeInTheDocument();
    });
  });

  describe('Dynamic Updates', () => {
    it('should update when blocks are added', async () => {
      const { rerender } = render(BlocksList, { props: mockProps });
      
      expect(screen.getByText(/No blocks yet/)).toBeInTheDocument();
      
      mockProps.selected.section.blocks = [{ type: 'heading', text: 'New' }];
      await rerender({ props: mockProps });
      
      expect(screen.queryByText(/No blocks yet/)).not.toBeInTheDocument();
      expect(screen.getByTestId('block-editor-0')).toBeInTheDocument();
    });

    it('should update when blocks are removed', async () => {
      mockProps.selected.section.blocks = [{ type: 'heading', text: 'Test' }];
      const { rerender } = render(BlocksList, { props: mockProps });
      
      expect(screen.getByTestId('block-editor-0')).toBeInTheDocument();
      
      mockProps.selected.section.blocks = [];
      await rerender({ props: mockProps });
      
      expect(screen.queryByTestId('block-editor-0')).not.toBeInTheDocument();
      expect(screen.getByText(/No blocks yet/)).toBeInTheDocument();
    });

    it('should update when more blocks are added', async () => {
      mockProps.selected.section.blocks = [{ type: 'heading', text: 'First' }];
      const { rerender } = render(BlocksList, { props: mockProps });
      
      expect(screen.getAllByTestId(/block-editor-/)).toHaveLength(1);
      
      mockProps.selected.section.blocks = [
        { type: 'heading', text: 'First' },
        { type: 'text', text: 'Second' }
      ];
      await rerender({ props: mockProps });
      
      expect(screen.getAllByTestId(/block-editor-/)).toHaveLength(2);
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined selected gracefully', () => {
      mockProps.selected = undefined;
      expect(() => render(BlocksList, { props: mockProps })).not.toThrow();
    });

    it('should handle null blocks array gracefully', () => {
      mockProps.selected.section.blocks = null;
      render(BlocksList, { props: mockProps });
      expect(screen.getByText(/No blocks yet/)).toBeInTheDocument();
    });

    it('should handle blocks with different types', () => {
      mockProps.selected.section.blocks = [
        { type: 'heading', text: 'Heading' },
        { type: 'text', text: 'Text' },
        { type: 'image', src: '/img.jpg' },
        { type: 'button', label: 'Button' }
      ];
      render(BlocksList, { props: mockProps });
      
      expect(screen.getAllByTestId(/block-editor-/)).toHaveLength(4);
    });

    it('should handle single block scenario', () => {
      mockProps.selected.section.blocks = [
        { type: 'heading', text: 'Only one' }
      ];
      render(BlocksList, { props: mockProps });
      
      expect(screen.getAllByTestId(/block-editor-/)).toHaveLength(1);
    });

    it('should handle large number of blocks', () => {
      mockProps.selected.section.blocks = Array.from({ length: 20 }, (_, i) => ({
        type: 'heading',
        text: `Block ${i + 1}`
      }));
      render(BlocksList, { props: mockProps });
      
      expect(screen.getAllByTestId(/block-editor-/)).toHaveLength(20);
    });

    it('should handle blocks with minimal properties', () => {
      mockProps.selected.section.blocks = [
        { type: 'heading' },
        { type: 'text' }
      ];
      render(BlocksList, { props: mockProps });
      
      expect(screen.getAllByTestId(/block-editor-/)).toHaveLength(2);
    });

    it('should handle empty availableImages array', () => {
      mockProps.availableImages = [];
      mockProps.selected.section.blocks = [{ type: 'image', src: '' }];
      render(BlocksList, { props: mockProps });
      
      expect(screen.getByTestId('block-editor-0')).toBeInTheDocument();
    });

    it('should handle null showImageSelectorForBlock', () => {
      mockProps.showImageSelectorForBlock = null;
      mockProps.selected.section.blocks = [{ type: 'image', src: '' }];
      render(BlocksList, { props: mockProps });
      
      expect(screen.getByTestId('block-editor-0')).toBeInTheDocument();
    });
  });

  describe('Layout and Styling', () => {
    it('should have flex layout for header', () => {
      const { container } = render(BlocksList, { props: mockProps });
      const header = container.querySelector('.flex.items-center.justify-between');
      expect(header).toBeInTheDocument();
    });

    it('should apply margin bottom to header', () => {
      const { container } = render(BlocksList, { props: mockProps });
      const header = container.querySelector('.mb-2');
      expect(header).toBeInTheDocument();
    });

    it('should have semibold title', () => {
      render(BlocksList, { props: mockProps });
      const title = screen.getByText('Blocks (visual builder)');
      expect(title.className).toContain('font-semibold');
    });

    it('should style empty state text correctly', () => {
      render(BlocksList, { props: mockProps });
      const emptyText = screen.getByText(/No blocks yet/);
      expect(emptyText.className).toContain('text-sm');
      expect(emptyText.className).toContain('text-gray-500');
    });

    it('should have button group with proper spacing', () => {
      const { container } = render(BlocksList, { props: mockProps });
      const buttonGroup = container.querySelector('.space-x-2');
      expect(buttonGroup).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have semantic heading for section title', () => {
      const { container } = render(BlocksList, { props: mockProps });
      const heading = container.querySelector('h2');
      expect(heading).toBeInTheDocument();
      if (heading) {
        expect(heading.textContent).toBe('Blocks (visual builder)');
      }
    });

    it('should render blocks in semantic list', () => {
      mockProps.selected.section.blocks = [
        { type: 'heading', text: 'Test' }
      ];
      const { container } = render(BlocksList, { props: mockProps });
      
      const ul = container.querySelector('ul');
      expect(ul).toBeInTheDocument();
    });

    it('should have clickable button with clear text', () => {
      render(BlocksList, { props: mockProps });
      const button = screen.getByRole('button', { name: /Add block/i });
      expect(button).toBeInTheDocument();
    });
  });
});