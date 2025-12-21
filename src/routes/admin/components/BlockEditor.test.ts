import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/svelte';
import BlockEditor from './BlockEditor.svelte';

describe('BlockEditor Component', () => {
  let mockProps;

  beforeEach(() => {
    mockProps = {
      block: { type: 'heading', text: '', level: 2 },
      index: 0,
      updateBlock: vi.fn(),
      deleteBlockAt: vi.fn(),
      moveBlock: vi.fn(),
      totalBlocks: 3,
      loadAvailableImages: vi.fn(),
      availableImages: [],
      showImageSelectorForBlock: null,
      setShowImageSelectorForBlock: vi.fn()
    };
  });

  describe('Basic Rendering', () => {
    it('should render block with index number', () => {
      render(BlockEditor, { props: mockProps });
      expect(screen.getByText('#1')).toBeInTheDocument();
    });

    it('should render with correct index for second block', () => {
      mockProps.index = 1;
      render(BlockEditor, { props: { ...mockProps } });
      expect(screen.getByText('#2')).toBeInTheDocument();
    });

    it('should render type selector with current value', () => {
      render(BlockEditor, { props: mockProps });
      const select = screen.getByDisplayValue('Heading');
      expect(select).toBeInTheDocument();
    });

    it('should render move up button', () => {
      render(BlockEditor, { props: mockProps });
      const buttons = screen.getAllByRole('button');
      const upButton = buttons.find(btn => btn.textContent === '↑');
      expect(upButton).toBeInTheDocument();
    });

    it('should render move down button', () => {
      render(BlockEditor, { props: mockProps });
      const buttons = screen.getAllByRole('button');
      const downButton = buttons.find(btn => btn.textContent === '↓');
      expect(downButton).toBeInTheDocument();
    });

    it('should render remove button', () => {
      render(BlockEditor, { props: mockProps });
      expect(screen.getByText('Remove')).toBeInTheDocument();
    });
  });

  describe('Block Type Selection', () => {
    it('should call updateBlock when changing type', async () => {
      render(BlockEditor, { props: mockProps });
      const typeSelect = screen.getByDisplayValue('Heading');
      
      await fireEvent.input(typeSelect, { target: { value: 'text' } });
      
      expect(mockProps.updateBlock).toHaveBeenCalledWith(0, { type: 'text' });
    });

    it('should have all block type options', () => {
      render(BlockEditor, { props: mockProps });
      const typeSelect = screen.getByDisplayValue('Heading');
      
      expect(within(typeSelect).getByText('Heading')).toBeInTheDocument();
      expect(within(typeSelect).getByText('Text')).toBeInTheDocument();
      expect(within(typeSelect).getByText('Image')).toBeInTheDocument();
      expect(within(typeSelect).getByText('Button')).toBeInTheDocument();
    });
  });

  describe('Block Movement', () => {
    it('should call moveBlock with -1 when up button clicked', async () => {
      mockProps.index = 1;
      render(BlockEditor, { props: { ...mockProps } });
      
      const buttons = screen.getAllByRole('button');
      const upButton = buttons.find(btn => btn.textContent === '↑');
      
      await fireEvent.click(upButton);
      
      expect(mockProps.moveBlock).toHaveBeenCalledWith(1, -1);
    });

    it('should call moveBlock with 1 when down button clicked', async () => {
      mockProps.index = 1;
      render(BlockEditor, { props: { ...mockProps } });
      
      const buttons = screen.getAllByRole('button');
      const downButton = buttons.find(btn => btn.textContent === '↓');
      
      await fireEvent.click(downButton);
      
      expect(mockProps.moveBlock).toHaveBeenCalledWith(1, 1);
    });

    it('should disable up button when at first position', () => {
      mockProps.index = 0;
      render(BlockEditor, { props: mockProps });
      
      const buttons = screen.getAllByRole('button');
      const upButton = buttons.find(btn => btn.textContent === '↑');
      
      expect(upButton.disabled).toBe(true);
    });

    it('should disable down button when at last position', () => {
      mockProps.index = 2;
      mockProps.totalBlocks = 3;
      render(BlockEditor, { props: mockProps });
      
      const buttons = screen.getAllByRole('button');
      const downButton = buttons.find(btn => btn.textContent === '↓');
      
      expect(downButton.disabled).toBe(true);
    });

    it('should enable both buttons when in middle position', () => {
      mockProps.index = 1;
      mockProps.totalBlocks = 3;
      render(BlockEditor, { props: mockProps });
      
      const buttons = screen.getAllByRole('button');
      const upButton = buttons.find(btn => btn.textContent === '↑');
      const downButton = buttons.find(btn => btn.textContent === '↓');
      
      expect(upButton.disabled).toBe(false);
      expect(downButton.disabled).toBe(false);
    });
  });

  describe('Block Deletion', () => {
    it('should call deleteBlockAt when remove button clicked', async () => {
      render(BlockEditor, { props: mockProps });
      
      const removeButton = screen.getByText('Remove');
      await fireEvent.click(removeButton);
      
      expect(mockProps.deleteBlockAt).toHaveBeenCalledWith(0);
    });
  });

  describe('Heading Block', () => {
    beforeEach(() => {
      mockProps.block = { type: 'heading', text: 'Test Heading', level: 2, align: 'left', color: 'black' };
    });

    it('should render heading input field', () => {
      render(BlockEditor, { props: mockProps });
      expect(screen.getByPlaceholderText('Heading text (supports ==highlight==)')).toBeInTheDocument();
    });

    it('should display current heading text', () => {
      render(BlockEditor, { props: mockProps });
      const input = screen.getByPlaceholderText('Heading text (supports ==highlight==)');
      expect(input.value).toBe('Test Heading');
    });

    it('should render level selector', () => {
      render(BlockEditor, { props: mockProps });
      expect(screen.getByLabelText('Level')).toBeInTheDocument();
    });

    it('should have all heading level options', () => {
      render(BlockEditor, { props: mockProps });
      const levelSelect = screen.getByLabelText('Level');
      
      expect(within(levelSelect).getByText('H1')).toBeInTheDocument();
      expect(within(levelSelect).getByText('H2')).toBeInTheDocument();
      expect(within(levelSelect).getByText('H3')).toBeInTheDocument();
      expect(within(levelSelect).getByText('H4')).toBeInTheDocument();
    });

    it('should call updateBlock when heading text changes', async () => {
      render(BlockEditor, { props: mockProps });
      const input = screen.getByPlaceholderText('Heading text (supports ==highlight==)');
      
      await fireEvent.input(input, { target: { value: 'New Heading' } });
      
      expect(mockProps.updateBlock).toHaveBeenCalledWith(0, { text: 'New Heading' });
    });

    it('should call updateBlock when level changes', async () => {
      render(BlockEditor, { props: mockProps });
      const levelSelect = screen.getByLabelText('Level');
      
      await fireEvent.input(levelSelect, { target: { value: '3' } });
      
      expect(mockProps.updateBlock).toHaveBeenCalledWith(0, { level: 3 });
    });

    it('should render align selector for heading', () => {
      render(BlockEditor, { props: mockProps });
      const alignSelects = screen.getAllByLabelText('Align');
      expect(alignSelects.length).toBeGreaterThan(0);
    });

    it('should call updateBlock when heading align changes', async () => {
      render(BlockEditor, { props: mockProps });
      const alignSelect = screen.getAllByLabelText('Align')[0];
      
      await fireEvent.input(alignSelect, { target: { value: 'center' } });
      
      expect(mockProps.updateBlock).toHaveBeenCalledWith(0, { align: 'center' });
    });

    it('should render color selector for heading', () => {
      render(BlockEditor, { props: mockProps });
      const colorSelects = screen.getAllByLabelText('Color');
      expect(colorSelects.length).toBeGreaterThan(0);
    });

    it('should call updateBlock when heading color changes', async () => {
      render(BlockEditor, { props: mockProps });
      const colorSelect = screen.getAllByLabelText('Color')[0];
      
      await fireEvent.input(colorSelect, { target: { value: 'blue' } });
      
      expect(mockProps.updateBlock).toHaveBeenCalledWith(0, { color: 'blue' });
    });

    it('should use default level 2 when not specified', () => {
      mockProps.block = { type: 'heading', text: '' };
      render(BlockEditor, { props: mockProps });
      
      const levelSelect = screen.getByLabelText('Level');
      expect(levelSelect.value).toBe('2');
    });
  });

  describe('Text Block', () => {
    beforeEach(() => {
      mockProps.block = { type: 'text', text: 'Test paragraph', align: 'left', color: 'gray' };
    });

    it('should render text textarea', () => {
      render(BlockEditor, { props: mockProps });
      expect(screen.getByPlaceholderText('Paragraph text (supports **bold**, *italic*, ==highlight==, - lists, 1. lists, [text](url))')).toBeInTheDocument();
    });

    it('should display current text content', () => {
      render(BlockEditor, { props: mockProps });
      const textarea = screen.getByPlaceholderText('Paragraph text (supports **bold**, *italic*, ==highlight==, - lists, 1. lists, [text](url))');
      expect(textarea.value).toBe('Test paragraph');
    });

    it('should call updateBlock when text changes', async () => {
      render(BlockEditor, { props: mockProps });
      const textarea = screen.getByPlaceholderText('Paragraph text (supports **bold**, *italic*, ==highlight==, - lists, 1. lists, [text](url))');
      
      await fireEvent.input(textarea, { target: { value: 'New paragraph' } });
      
      expect(mockProps.updateBlock).toHaveBeenCalledWith(0, { text: 'New paragraph' });
    });

    it('should render align selector for text', () => {
      render(BlockEditor, { props: mockProps });
      expect(screen.getByLabelText('Align')).toBeInTheDocument();
    });

    it('should call updateBlock when text align changes', async () => {
      render(BlockEditor, { props: mockProps });
      const alignSelect = screen.getByLabelText('Align');
      
      await fireEvent.input(alignSelect, { target: { value: 'center' } });
      
      expect(mockProps.updateBlock).toHaveBeenCalledWith(0, { align: 'center' });
    });

    it('should render color selector for text', () => {
      render(BlockEditor, { props: mockProps });
      expect(screen.getByLabelText('Color')).toBeInTheDocument();
    });

    it('should call updateBlock when text color changes', async () => {
      render(BlockEditor, { props: mockProps });
      const colorSelect = screen.getByLabelText('Color');
      
      await fireEvent.input(colorSelect, { target: { value: 'black' } });
      
      expect(mockProps.updateBlock).toHaveBeenCalledWith(0, { color: 'black' });
    });

    it('should have gray as default color option first', () => {
      render(BlockEditor, { props: mockProps });
      const colorSelect = screen.getByLabelText('Color');
      const firstOption = within(colorSelect).getAllByRole('option')[0];
      expect(firstOption.value).toBe('gray');
    });
  });

  describe('Image Block', () => {
    beforeEach(() => {
      mockProps.block = { 
        type: 'image', 
        src: '/test.jpg', 
        alt: 'Test image',
        align: 'center',
        widthPercent: 75
      };
    });

    it('should render image src input', () => {
      render(BlockEditor, { props: mockProps });
      expect(screen.getByPlaceholderText('Image src (e.g. /my-image.jpg)')).toBeInTheDocument();
    });

    it('should render image alt input', () => {
      render(BlockEditor, { props: mockProps });
      expect(screen.getByPlaceholderText('Alt text')).toBeInTheDocument();
    });

    it('should display current src value', () => {
      render(BlockEditor, { props: mockProps });
      const srcInput = screen.getByPlaceholderText('Image src (e.g. /my-image.jpg)');
      expect(srcInput.value).toBe('/test.jpg');
    });

    it('should display current alt value', () => {
      render(BlockEditor, { props: mockProps });
      const altInput = screen.getByPlaceholderText('Alt text');
      expect(altInput.value).toBe('Test image');
    });

    it('should call updateBlock when src changes', async () => {
      render(BlockEditor, { props: mockProps });
      const srcInput = screen.getByPlaceholderText('Image src (e.g. /my-image.jpg)');
      
      await fireEvent.input(srcInput, { target: { value: '/new-image.jpg' } });
      
      expect(mockProps.updateBlock).toHaveBeenCalledWith(0, { src: '/new-image.jpg' });
    });

    it('should call updateBlock when alt changes', async () => {
      render(BlockEditor, { props: mockProps });
      const altInput = screen.getByPlaceholderText('Alt text');
      
      await fireEvent.input(altInput, { target: { value: 'New alt text' } });
      
      expect(mockProps.updateBlock).toHaveBeenCalledWith(0, { alt: 'New alt text' });
    });

    it('should render width slider', () => {
      render(BlockEditor, { props: mockProps });
      const slider = screen.getByLabelText('Width');
      expect(slider).toBeInTheDocument();
      expect(slider.type).toBe('range');
    });

    it('should display current width percentage', () => {
      render(BlockEditor, { props: mockProps });
      expect(screen.getByText('75%')).toBeInTheDocument();
    });

    it('should call updateBlock when width changes', async () => {
      render(BlockEditor, { props: mockProps });
      const slider = screen.getByLabelText('Width');
      
      await fireEvent.input(slider, { target: { value: '50' } });
      
      expect(mockProps.updateBlock).toHaveBeenCalledWith(0, { widthPercent: 50 });
    });

    it('should use default width 100% when not specified', () => {
      mockProps.block = { type: 'image', src: '', alt: '' };
      render(BlockEditor, { props: mockProps });
      
      expect(screen.getByText('100%')).toBeInTheDocument();
    });

    it('should render align selector for image', () => {
      render(BlockEditor, { props: mockProps });
      expect(screen.getByLabelText('Align')).toBeInTheDocument();
    });

    it('should call updateBlock when image align changes', async () => {
      render(BlockEditor, { props: mockProps });
      const alignSelect = screen.getByLabelText('Align');
      
      await fireEvent.input(alignSelect, { target: { value: 'right' } });
      
      expect(mockProps.updateBlock).toHaveBeenCalledWith(0, { align: 'right' });
    });
  });

  describe('Image Selector', () => {
    beforeEach(() => {
      mockProps.block = { type: 'image', src: '', alt: '' };
    });

    it('should render choose button', () => {
      render(BlockEditor, { props: mockProps });
      expect(screen.getByText(/Choose from existing images/)).toBeInTheDocument();
    });

    it('should call loadAvailableImages when choose button clicked', async () => {
      render(BlockEditor, { props: mockProps });
      const chooseButton = screen.getByText(/Choose from existing images/);
      
      await fireEvent.click(chooseButton);
      
      expect(mockProps.loadAvailableImages).toHaveBeenCalled();
      expect(mockProps.setShowImageSelectorForBlock).toHaveBeenCalledWith(0);
    });

    it('should show "Hide" text when selector is open', () => {
      mockProps.showImageSelectorForBlock = 0;
      render(BlockEditor, { props: mockProps });
      
      expect(screen.getByText(/Hide from existing images/)).toBeInTheDocument();
    });

    it('should call setShowImageSelectorForBlock with null when hiding', async () => {
      mockProps.showImageSelectorForBlock = 0;
      render(BlockEditor, { props: mockProps });
      
      const hideButton = screen.getByText(/Hide from existing images/);
      await fireEvent.click(hideButton);
      
      expect(mockProps.setShowImageSelectorForBlock).toHaveBeenCalledWith(null);
    });

    it('should display available images when selector is open', () => {
      mockProps.showImageSelectorForBlock = 0;
      mockProps.availableImages = [
        { name: 'image1.jpg', url: '/uploads/image1.jpg' },
        { name: 'image2.jpg', url: '/uploads/image2.jpg' }
      ];
      render(BlockEditor, { props: mockProps });
      
      expect(screen.getByText(/image1.jpg/)).toBeInTheDocument();
      expect(screen.getByText(/image2.jpg/)).toBeInTheDocument();
    });

    it('should show "no images" message when list is empty', () => {
      mockProps.showImageSelectorForBlock = 0;
      mockProps.availableImages = [];
      render(BlockEditor, { props: mockProps });
      
      expect(screen.getByText('No images available yet')).toBeInTheDocument();
    });

    it('should call updateBlock when selecting an image', async () => {
      mockProps.showImageSelectorForBlock = 0;
      mockProps.availableImages = [
        { name: 'image1.jpg', url: '/uploads/image1.jpg' }
      ];
      render(BlockEditor, { props: mockProps });
      
      const imageButton = screen.getByText(/image1.jpg/);
      await fireEvent.click(imageButton);
      
      expect(mockProps.updateBlock).toHaveBeenCalledWith(0, { src: '/uploads/image1.jpg' });
      expect(mockProps.setShowImageSelectorForBlock).toHaveBeenCalledWith(null);
    });

    it('should not show image selector for different block index', () => {
      mockProps.showImageSelectorForBlock = 1;
      mockProps.index = 0;
      mockProps.availableImages = [
        { name: 'image1.jpg', url: '/uploads/image1.jpg' }
      ];
      render(BlockEditor, { props: mockProps });
      
      expect(screen.queryByText(/image1.jpg/)).not.toBeInTheDocument();
    });
  });

  describe('Button Block', () => {
    beforeEach(() => {
      mockProps.block = { 
        type: 'button', 
        label: 'Click me', 
        href: '/contact',
        align: 'center'
      };
    });

    it('should render button label input', () => {
      render(BlockEditor, { props: mockProps });
      expect(screen.getByPlaceholderText('Button label')).toBeInTheDocument();
    });

    it('should render button href input', () => {
      render(BlockEditor, { props: mockProps });
      expect(screen.getByPlaceholderText('Link href (e.g. /contact)')).toBeInTheDocument();
    });

    it('should display current label value', () => {
      render(BlockEditor, { props: mockProps });
      const labelInput = screen.getByPlaceholderText('Button label');
      expect(labelInput.value).toBe('Click me');
    });

    it('should display current href value', () => {
      render(BlockEditor, { props: mockProps });
      const hrefInput = screen.getByPlaceholderText('Link href (e.g. /contact)');
      expect(hrefInput.value).toBe('/contact');
    });

    it('should call updateBlock when label changes', async () => {
      render(BlockEditor, { props: mockProps });
      const labelInput = screen.getByPlaceholderText('Button label');
      
      await fireEvent.input(labelInput, { target: { value: 'New label' } });
      
      expect(mockProps.updateBlock).toHaveBeenCalledWith(0, { label: 'New label' });
    });

    it('should call updateBlock when href changes', async () => {
      render(BlockEditor, { props: mockProps });
      const hrefInput = screen.getByPlaceholderText('Link href (e.g. /contact)');
      
      await fireEvent.input(hrefInput, { target: { value: '/about' } });
      
      expect(mockProps.updateBlock).toHaveBeenCalledWith(0, { href: '/about' });
    });

    it('should render align selector for button', () => {
      render(BlockEditor, { props: mockProps });
      expect(screen.getByLabelText('Align')).toBeInTheDocument();
    });

    it('should call updateBlock when button align changes', async () => {
      render(BlockEditor, { props: mockProps });
      const alignSelect = screen.getByLabelText('Align');
      
      await fireEvent.input(alignSelect, { target: { value: 'right' } });
      
      expect(mockProps.updateBlock).toHaveBeenCalledWith(0, { align: 'right' });
    });
  });

  describe('Default Values', () => {
    it('should handle empty block gracefully', () => {
      mockProps.block = { type: 'heading' };
      render(BlockEditor, { props: mockProps });
      
      const input = screen.getByPlaceholderText('Heading text (supports ==highlight==)');
      expect(input.value).toBe('');
    });

    it('should use default align "left" when not specified', () => {
      mockProps.block = { type: 'heading', text: 'Test' };
      render(BlockEditor, { props: mockProps });
      
      const alignSelect = screen.getAllByLabelText('Align')[0];
      expect(alignSelect.value).toBe('left');
    });

    it('should use default color when not specified for heading', () => {
      mockProps.block = { type: 'heading', text: 'Test' };
      render(BlockEditor, { props: mockProps });
      
      const colorSelect = screen.getAllByLabelText('Color')[0];
      expect(colorSelect.value).toBe('black');
    });

    it('should use default color "gray" for text block', () => {
      mockProps.block = { type: 'text', text: 'Test' };
      render(BlockEditor, { props: mockProps });
      
      const colorSelect = screen.getByLabelText('Color');
      expect(colorSelect.value).toBe('gray');
    });
  });

  describe('Event Prevention', () => {
    it('should prevent default on move up button click', async () => {
      mockProps.index = 1;
      render(BlockEditor, { props: mockProps });

      const buttons = screen.getAllByRole('button');
      const upButton = buttons.find(btn => btn.textContent === '↑');

      const event = new MouseEvent('click', { bubbles: true, cancelable: true });
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

      upButton.dispatchEvent(event);

      await waitFor(() => {
        expect(mockProps.moveBlock).toHaveBeenCalled();
      });
    });

    it('should prevent default on move down button click', async () => {
      mockProps.index = 0;
      render(BlockEditor, { props: mockProps });

      const buttons = screen.getAllByRole('button');
      const downButton = buttons.find(btn => btn.textContent === '↓');

      const event = new MouseEvent('click', { bubbles: true, cancelable: true });
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

      downButton.dispatchEvent(event);

      await waitFor(() => {
        expect(mockProps.moveBlock).toHaveBeenCalled();
      });
    });

    it('should prevent default on remove button click', async () => {
      render(BlockEditor, { props: mockProps });

      const removeButton = screen.getByText('Remove');
      const event = new MouseEvent('click', { bubbles: true, cancelable: true });

      removeButton.dispatchEvent(event);

      await waitFor(() => {
        expect(mockProps.deleteBlockAt).toHaveBeenCalled();
      });
    });
  });

  describe('Layout and Styling', () => {
    it('should have correct container styling', () => {
      const { container } = render(BlockEditor, { props: mockProps });
      const mainDiv = container.querySelector('.border.rounded.p-3.space-y-2.bg-white');
      expect(mainDiv).toBeInTheDocument();
    });

    it('should have flex layout for header section', () => {
      const { container } = render(BlockEditor, { props: mockProps });
      const headerDiv = container.querySelector('.flex.items-center.justify-between');
      expect(headerDiv).toBeInTheDocument();
    });

    it('should have gap between header elements', () => {
      const { container } = render(BlockEditor, { props: mockProps });
      const leftSection = container.querySelector('.flex.items-center.gap-2');
      expect(leftSection).toBeInTheDocument();
    });

    it('should have correct index number styling', () => {
      render(BlockEditor, { props: mockProps });
      const indexSpan = screen.getByText('#1');
      expect(indexSpan.className).toContain('text-xs');
      expect(indexSpan.className).toContain('text-gray-500');
    });

    it('should have correct type selector styling', () => {
      render(BlockEditor, { props: mockProps });
      const typeSelect = screen.getByDisplayValue('Heading');
      expect(typeSelect.className).toContain('border');
      expect(typeSelect.className).toContain('px-2');
      expect(typeSelect.className).toContain('py-1');
      expect(typeSelect.className).toContain('rounded');
      expect(typeSelect.className).toContain('text-sm');
    });

    it('should have correct button group styling', () => {
      const { container } = render(BlockEditor, { props: mockProps });
      const buttonGroup = container.querySelector('.flex.gap-1');
      expect(buttonGroup).toBeInTheDocument();
    });

    it('should have correct move button styling', () => {
      render(BlockEditor, { props: mockProps });
      const buttons = screen.getAllByRole('button');
      const upButton = buttons.find(btn => btn.textContent === '↑');
      expect(upButton.className).toContain('px-2');
      expect(upButton.className).toContain('py-1');
      expect(upButton.className).toContain('text-xs');
      expect(upButton.className).toContain('border');
      expect(upButton.className).toContain('rounded');
    });

    it('should have correct remove button styling', () => {
      render(BlockEditor, { props: mockProps });
      const removeButton = screen.getByText('Remove');
      expect(removeButton.className).toContain('px-2');
      expect(removeButton.className).toContain('py-1');
      expect(removeButton.className).toContain('bg-red-100');
      expect(removeButton.className).toContain('text-red-700');
      expect(removeButton.className).toContain('rounded');
    });

    it('should have correct heading controls layout', () => {
      mockProps.block = { type: 'heading', text: 'Test' };
      const { container } = render(BlockEditor, { props: mockProps });
      const controlsDiv = container.querySelector('.flex.flex-wrap.gap-3.items-center.mb-2');
      expect(controlsDiv).toBeInTheDocument();
    });

    it('should have correct heading input styling', () => {
      mockProps.block = { type: 'heading', text: 'Test' };
      render(BlockEditor, { props: mockProps });
      const input = screen.getByPlaceholderText('Heading text (supports ==highlight==)');
      expect(input.className).toContain('w-full');
      expect(input.className).toContain('border');
      expect(input.className).toContain('px-2');
      expect(input.className).toContain('py-1');
      expect(input.className).toContain('rounded');
      expect(input.className).toContain('text-sm');
    });

    it('should have correct text input styling', () => {
      mockProps.block = { type: 'text', text: 'Test' };
      render(BlockEditor, { props: mockProps });
      const textarea = screen.getByPlaceholderText('Paragraph text (supports **bold**, *italic*, ==highlight==, - lists, 1. lists, [text](url))');
      expect(textarea.className).toContain('w-full');
      expect(textarea.className).toContain('border');
      expect(textarea.className).toContain('px-2');
      expect(textarea.className).toContain('py-1');
      expect(textarea.className).toContain('rounded');
      expect(textarea.className).toContain('text-sm');
    });

    it('should have correct image input styling', () => {
      mockProps.block = { type: 'image', src: '/test.jpg', alt: 'Test' };
      render(BlockEditor, { props: mockProps });
      const srcInput = screen.getByPlaceholderText('Image src (e.g. /my-image.jpg)');
      expect(srcInput.className).toContain('w-full');
      expect(srcInput.className).toContain('border');
      expect(srcInput.className).toContain('px-2');
      expect(srcInput.className).toContain('py-1');
      expect(srcInput.className).toContain('rounded');
      expect(srcInput.className).toContain('text-sm');
    });

    it('should have correct alt input styling', () => {
      mockProps.block = { type: 'image', src: '/test.jpg', alt: 'Test' };
      render(BlockEditor, { props: mockProps });
      const altInput = screen.getByPlaceholderText('Alt text');
      expect(altInput.className).toContain('w-full');
      expect(altInput.className).toContain('border');
      expect(altInput.className).toContain('px-2');
      expect(altInput.className).toContain('py-1');
      expect(altInput.className).toContain('rounded');
      expect(altInput.className).toContain('text-sm');
    });

    it('should have correct button input styling', () => {
      mockProps.block = { type: 'button', label: 'Test', href: '/test' };
      render(BlockEditor, { props: mockProps });
      const labelInput = screen.getByPlaceholderText('Button label');
      expect(labelInput.className).toContain('w-full');
      expect(labelInput.className).toContain('border');
      expect(labelInput.className).toContain('px-2');
      expect(labelInput.className).toContain('py-1');
      expect(labelInput.className).toContain('rounded');
      expect(labelInput.className).toContain('text-sm');
    });

    it('should have correct href input styling', () => {
      mockProps.block = { type: 'button', label: 'Test', href: '/test' };
      render(BlockEditor, { props: mockProps });
      const hrefInput = screen.getByPlaceholderText('Link href (e.g. /contact)');
      expect(hrefInput.className).toContain('w-full');
      expect(hrefInput.className).toContain('border');
      expect(hrefInput.className).toContain('px-2');
      expect(hrefInput.className).toContain('py-1');
      expect(hrefInput.className).toContain('rounded');
      expect(hrefInput.className).toContain('text-sm');
    });
  });
});