 import { describe, it, expect, vi, beforeEach, afterEach, type MockedFunction } from 'vitest';
 import { render, screen, fireEvent, waitFor } from '@testing-library/svelte';
 import SectionSettings from './SectionSettings.svelte';

 interface SectionSettingsType {
   background: string;
   backgroundImage: string;
   width: string;
   padding: string;
 }

 interface SelectedType {
   id: string;
 }

 interface AvailableImage {
   name: string;
   url: string;
 }

 interface SectionSettingsProps {
   sectionSettings: Partial<SectionSettingsType>;
   updateSectionStyle: (style: Partial<SectionSettingsType>) => void;
   selected: SelectedType | null | undefined;
   loadAvailableImages: () => void;
   availableImages: AvailableImage[];
   showImageSelectorFor: string | null;
   setShowImageSelectorFor: (id: string | null) => void;
 }

// Mock fetch for image upload
(global.fetch as any) = vi.fn();

describe('SectionSettings Component', () => {
  let mockProps: SectionSettingsProps;
  let updateSectionStyleMock: any;
  let loadAvailableImagesMock: any;
  let setShowImageSelectorForMock: any;

  beforeEach(() => {
    updateSectionStyleMock = vi.fn();
    loadAvailableImagesMock = vi.fn();
    setShowImageSelectorForMock = vi.fn();

    mockProps = {
      sectionSettings: {
        background: 'white',
        backgroundImage: '',
        width: 'boxed',
        padding: 'normal'
      },
      updateSectionStyle: updateSectionStyleMock,
      selected: { id: 'test-section' },
      loadAvailableImages: loadAvailableImagesMock,
      availableImages: [],
      showImageSelectorFor: null,
      setShowImageSelectorFor: setShowImageSelectorForMock
    };

    // Reset fetch mock
    (global.fetch as any).mockClear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('should render the section settings title', () => {
      render(SectionSettings, { props: mockProps });
      expect(screen.getByText('Section layout (visual)')).toBeInTheDocument();
    });

    it('should render all setting labels', () => {
      render(SectionSettings, { props: mockProps });
      expect(screen.getByText('Background')).toBeInTheDocument();
      expect(screen.getByText('Width')).toBeInTheDocument();
      expect(screen.getByText('Padding')).toBeInTheDocument();
    });

    it('should render background select with correct options', () => {
      render(SectionSettings, { props: mockProps });
      const select = screen.getByLabelText('Background') as HTMLSelectElement;
      expect(select).toBeInTheDocument();
      expect(select.value).toBe('white');

      const options = screen.getAllByRole('option', { hidden: true }) as HTMLOptionElement[];
      const backgroundOptions = options.filter(option =>
        ['white', 'gray', 'teal', 'image'].includes(option.value)
      );
      expect(backgroundOptions).toHaveLength(4);
    });

    it('should render width select with correct options', () => {
      render(SectionSettings, { props: mockProps });
      const select = screen.getByLabelText('Width') as HTMLSelectElement;
      expect(select).toBeInTheDocument();
      expect(select.value).toBe('boxed');

      expect(screen.getByRole('option', { name: 'Boxed', hidden: true })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Full width', hidden: true })).toBeInTheDocument();
    });

    it('should render padding select with correct options', () => {
      render(SectionSettings, { props: mockProps });
      const select = screen.getByLabelText('Padding') as HTMLSelectElement;
      expect(select).toBeInTheDocument();
      expect(select.value).toBe('normal');

      expect(screen.getByRole('option', { name: 'Normal', hidden: true })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Large', hidden: true })).toBeInTheDocument();
    });
  });

  describe('Background Selection', () => {
    it('should call updateSectionStyle when background is changed', async () => {
      render(SectionSettings, { props: mockProps });
      const select = screen.getByLabelText('Background');

      await fireEvent.input(select, { target: { value: 'gray' } });
      expect(updateSectionStyleMock).toHaveBeenCalledWith({ background: 'gray' });
    });

    it('should show background image input when image background is selected', async () => {
      mockProps.sectionSettings.background = 'image';
      render(SectionSettings, { props: mockProps });

      expect(screen.getByPlaceholderText('Background image URL')).toBeInTheDocument();
    });

    it('should not show background image input when non-image background is selected', () => {
      render(SectionSettings, { props: mockProps });

      expect(screen.queryByPlaceholderText('Background image URL')).not.toBeInTheDocument();
    });

    it('should call updateSectionStyle when background image URL is changed', async () => {
      mockProps.sectionSettings.background = 'image';
      render(SectionSettings, { props: mockProps });

      const input = screen.getByPlaceholderText('Background image URL');
      await fireEvent.input(input, { target: { value: 'https://example.com/image.jpg' } });

      expect(updateSectionStyleMock).toHaveBeenCalledWith({ backgroundImage: 'https://example.com/image.jpg' });
    });
  });

  describe('Image Upload', () => {
    beforeEach(() => {
      mockProps.sectionSettings.background = 'image';
    });

    it('should render file upload input', () => {
      render(SectionSettings, { props: mockProps });
      const fileInput = screen.getByLabelText('Upload new image:') as HTMLInputElement;
      expect(fileInput).toBeInTheDocument();
      expect(fileInput.type).toBe('file');
      expect(fileInput.accept).toBe('image/*');
    });

    it('should handle successful image upload', async () => {
      const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      const mockResponse = { ok: true, json: vi.fn().mockResolvedValue({ url: 'uploaded-image.jpg' }) };

      (global.fetch as any).mockResolvedValue(mockResponse);

      render(SectionSettings, { props: mockProps });
      const fileInput = screen.getByLabelText('Upload new image:');

      await fireEvent.change(fileInput, { target: { files: [mockFile] } });

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('/api/upload-image', {
          method: 'POST',
          body: expect.any(FormData)
        });
      });

      expect(updateSectionStyleMock).toHaveBeenCalledWith({ backgroundImage: 'uploaded-image.jpg' });
    });

    it('should handle failed image upload', async () => {
      const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      const mockResponse = { ok: false, json: vi.fn().mockResolvedValue({ error: 'Upload failed' }) };

      (global.fetch as any).mockResolvedValue(mockResponse);
      const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

      render(SectionSettings, { props: mockProps });
      const fileInput = screen.getByLabelText('Upload new image:');

      await fireEvent.change(fileInput, { target: { files: [mockFile] } });

      await waitFor(() => {
        expect(alertMock).toHaveBeenCalledWith('Upload failed: Upload failed');
      });

      alertMock.mockRestore();
    });

    it('should handle upload error', async () => {
      const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });

      (global.fetch as any).mockRejectedValue(new Error('Network error'));
      const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

      render(SectionSettings, { props: mockProps });
      const fileInput = screen.getByLabelText('Upload new image:');

      await fireEvent.change(fileInput, { target: { files: [mockFile] } });

      await waitFor(() => {
        expect(alertMock).toHaveBeenCalledWith('Upload error: Network error');
      });

      alertMock.mockRestore();
    });

    it('should not upload when no file is selected', async () => {
      render(SectionSettings, { props: mockProps });
      const fileInput = screen.getByLabelText('Upload new image:');

      await fireEvent.change(fileInput, { target: { files: [] } });

      expect(global.fetch).not.toHaveBeenCalled();
    });
  });

  describe('Image Selector', () => {
    beforeEach(() => {
      mockProps.sectionSettings.background = 'image';
    });

    it('should render choose from existing images button', () => {
      render(SectionSettings, { props: mockProps });
      expect(screen.getByRole('button', { name: 'Choose from existing images' })).toBeInTheDocument();
    });

    it('should show "Choose" when image selector is not shown', () => {
      render(SectionSettings, { props: mockProps });
      expect(screen.getByRole('button', { name: 'Choose from existing images' })).toBeInTheDocument();
    });

    it('should show "Hide" when image selector is shown for current section', () => {
      mockProps.showImageSelectorFor = 'test-section';
      render(SectionSettings, { props: mockProps });
      expect(screen.getByRole('button', { name: 'Hide from existing images' })).toBeInTheDocument();
    });

    it('should call loadAvailableImages and setShowImageSelectorFor when button is clicked and selector is hidden', async () => {
      render(SectionSettings, { props: mockProps });
      const button = screen.getByRole('button', { name: 'Choose from existing images' });

      await fireEvent.click(button);

      expect(loadAvailableImagesMock).toHaveBeenCalled();
      expect(setShowImageSelectorForMock).toHaveBeenCalledWith('test-section');
    });

    it('should call setShowImageSelectorFor with null when button is clicked and selector is shown', async () => {
      mockProps.showImageSelectorFor = 'test-section';
      render(SectionSettings, { props: mockProps });
      const button = screen.getByRole('button', { name: 'Hide from existing images' });

      await fireEvent.click(button);

      expect(setShowImageSelectorForMock).toHaveBeenCalledWith(null);
    });

    it('should show image selector when showImageSelectorFor matches selected id', () => {
      mockProps.showImageSelectorFor = 'test-section';
      render(SectionSettings, { props: mockProps });

      expect(screen.getByText('No images available yet')).toBeInTheDocument();
    });

    it('should not show image selector when showImageSelectorFor does not match selected id', () => {
      mockProps.showImageSelectorFor = 'other-section';
      render(SectionSettings, { props: mockProps });

      expect(screen.queryByText('No images available yet')).not.toBeInTheDocument();
    });

    it('should render available images when present', () => {
      mockProps.showImageSelectorFor = 'test-section';
      mockProps.availableImages = [
        { name: 'image1.jpg', url: '/images/image1.jpg' },
        { name: 'image2.jpg', url: '/images/image2.jpg' }
      ];
      render(SectionSettings, { props: mockProps });

      expect(screen.getByText('📷 image1.jpg')).toBeInTheDocument();
      expect(screen.getByText('📷 image2.jpg')).toBeInTheDocument();
    });

    it('should call updateSectionStyle and hide selector when image is selected', async () => {
      mockProps.showImageSelectorFor = 'test-section';
      mockProps.availableImages = [
        { name: 'image1.jpg', url: '/images/image1.jpg' }
      ];
      render(SectionSettings, { props: mockProps });

      const imageButton = screen.getByRole('button', { name: '📷 image1.jpg' });
      await fireEvent.click(imageButton);

      expect(updateSectionStyleMock).toHaveBeenCalledWith({ backgroundImage: '/images/image1.jpg' });
      expect(setShowImageSelectorForMock).toHaveBeenCalledWith(null);
    });
  });

  describe('Width Selection', () => {
    it('should call updateSectionStyle when width is changed', async () => {
      render(SectionSettings, { props: mockProps });
      const select = screen.getByLabelText('Width');

      await fireEvent.input(select, { target: { value: 'full' } });
      expect(updateSectionStyleMock).toHaveBeenCalledWith({ width: 'full' });
    });
  });

  describe('Padding Selection', () => {
    it('should call updateSectionStyle when padding is changed', async () => {
      render(SectionSettings, { props: mockProps });
      const select = screen.getByLabelText('Padding');

      await fireEvent.input(select, { target: { value: 'large' } });
      expect(updateSectionStyleMock).toHaveBeenCalledWith({ padding: 'large' });
    });
  });

  describe('Styling and Layout', () => {
    it('should have correct container styling', () => {
      const { container } = render(SectionSettings, { props: mockProps });
      const mainDiv = container.querySelector('.pt-4.border-t.mt-4');
      expect(mainDiv).toBeInTheDocument();
    });

    it('should have correct title styling', () => {
      render(SectionSettings, { props: mockProps });
      const title = screen.getByText('Section layout (visual)');
      expect(title.className).toContain('font-semibold');
    });

    it('should have correct select styling', () => {
      render(SectionSettings, { props: mockProps });
      const selects = screen.getAllByRole('combobox');
      selects.forEach(select => {
        expect(select.className).toContain('border');
        expect(select.className).toContain('px-2');
        expect(select.className).toContain('py-1');
        expect(select.className).toContain('rounded');
        expect(select.className).toContain('text-xs');
      });
    });

    it('should have correct input styling for background image', () => {
      mockProps.sectionSettings.background = 'image';
      render(SectionSettings, { props: mockProps });
      const input = screen.getByPlaceholderText('Background image URL');
      expect(input.className).toContain('w-full');
      expect(input.className).toContain('border');
      expect(input.className).toContain('px-2');
      expect(input.className).toContain('py-1');
      expect(input.className).toContain('rounded');
      expect(input.className).toContain('text-xs');
    });
  });

  describe('Accessibility', () => {
    it('should have proper labels for all form controls', () => {
      render(SectionSettings, { props: mockProps });

      expect(screen.getByLabelText('Background')).toBeInTheDocument();
      expect(screen.getByLabelText('Width')).toBeInTheDocument();
      expect(screen.getByLabelText('Padding')).toBeInTheDocument();
    });

    it('should have proper label for background image input when visible', () => {
      mockProps.sectionSettings.background = 'image';
      render(SectionSettings, { props: mockProps });

      expect(screen.getByLabelText('Background image URL')).toBeInTheDocument();
    });

    it('should have proper label for file upload input', () => {
      mockProps.sectionSettings.background = 'image';
      render(SectionSettings, { props: mockProps });

      expect(screen.getByLabelText('Upload new image:')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty availableImages array', () => {
      mockProps.sectionSettings.background = 'image';
      mockProps.showImageSelectorFor = 'test-section';
      mockProps.availableImages = [];
      render(SectionSettings, { props: mockProps });

      expect(screen.getByText('No images available yet')).toBeInTheDocument();
    });

    it('should handle undefined selected prop gracefully', () => {
      mockProps.selected = undefined;
      expect(() => render(SectionSettings, { props: mockProps })).not.toThrow();
    });

    it('should handle null selected prop gracefully', () => {
      mockProps.selected = null;
      expect(() => render(SectionSettings, { props: mockProps })).not.toThrow();
    });

    it('should handle missing sectionSettings properties', () => {
      mockProps.sectionSettings = {};
      expect(() => render(SectionSettings, { props: mockProps })).not.toThrow();
    });
  });
});