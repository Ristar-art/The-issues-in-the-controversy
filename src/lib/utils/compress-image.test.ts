import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { compressImageToWebp } from './compress-image';

describe('compress-image', () => {
	describe('compressImageToWebp', () => {
		let originalWindow;
		let originalDocument;

		beforeEach(() => {
			originalWindow = global.window;
			originalDocument = global.document;
		});

		afterEach(() => {
			global.window = originalWindow;
			global.document = originalDocument;
			vi.clearAllMocks();
		});

		it('should return file unchanged in non-browser environment when window is undefined', async () => {
			global.window = undefined;
			global.document = undefined;
			const file = new File([''], 'test.png', { type: 'image/png' });
			const result = await compressImageToWebp(file);
			expect(result).toBe(file);
		});

		it('should return file unchanged in non-browser environment when document is undefined', async () => {
			global.window = { undefined: false };
			global.document = undefined;
			const file = new File([''], 'test.png', { type: 'image/png' });
			const result = await compressImageToWebp(file);
			expect(result).toBe(file);
		});

		it('should return file unchanged if file is null', async () => {
			global.window = { undefined: false };
			global.document = { createElement: vi.fn() };
			const result = await compressImageToWebp(null as any);
			expect(result).toBe(null);
		});

		it('should return file unchanged if file is undefined', async () => {
			global.window = { undefined: false };
			global.document = { createElement: vi.fn() };
			const result = await compressImageToWebp(undefined);
			expect(result).toBe(undefined);
		});

		it('should return file unchanged if not an image', async () => {
			global.window = { undefined: false };
			global.document = { createElement: vi.fn() };
			const file = new File(['content'], 'test.txt', { type: 'text/plain' });
			const result = await compressImageToWebp(file);
			expect(result).toBe(file);
		});

		it('should return file unchanged if file type is empty', async () => {
			global.window = { undefined: false };
			global.document = { createElement: vi.fn() };
			const file = new File(['content'], 'test', { type: '' });
			const result = await compressImageToWebp(file);
			expect(result).toBe(file);
		});

		it('should return file unchanged if no type property', async () => {
			global.window = { undefined: false };
			global.document = { createElement: vi.fn() };
			const file = new File(['content'], 'test');
			const result = await compressImageToWebp(file);
			expect(result).toBe(file);
		});

		it('should return file unchanged if not a valid image type', async () => {
			global.window = { undefined: false };
			global.document = { createElement: vi.fn() };
			const file = new File([''], 'test.jpg', { type: 'image/jpeg' });
			const result = await compressImageToWebp(file);
			expect(result).toBe(file);
		});

		it('should return webp file unchanged', async () => {
			global.window = { undefined: false };
			global.document = { createElement: vi.fn() };
			const file = new File([''], 'test.webp', { type: 'image/webp' });
			const result = await compressImageToWebp(file);
			expect(result).toBe(file);
		});

		it('should return avif file unchanged', async () => {
			global.window = { undefined: false };
			global.document = { createElement: vi.fn() };
			const file = new File([''], 'test.avif', { type: 'image/avif' });
			const result = await compressImageToWebp(file);
			expect(result).toBe(file);
		});

		it('should return svg file unchanged', async () => {
			global.window = { undefined: false };
			global.document = { createElement: vi.fn() };
			const file = new File([''], 'test.svg', { type: 'image/svg+xml' });
			const result = await compressImageToWebp(file);
			expect(result).toBe(file);
		});

		it('should return gif file unchanged', async () => {
			global.window = { undefined: false };
			global.document = { createElement: vi.fn() };
			const file = new File([''], 'test.gif', { type: 'image/gif' });
			const result = await compressImageToWebp(file);
			expect(result).toBe(file);
		});

		it('should return file unchanged if below default minSizeBytes', async () => {
			global.window = { undefined: false };
			global.document = { createElement: vi.fn() };
			const file = new File(['small'], 'test.png', { type: 'image/png' });
			Object.defineProperty(file, 'size', { value: 1000 });
			const result = await compressImageToWebp(file);
			expect(result).toBe(file);
		});

		it('should return file unchanged if below custom minSizeBytes', async () => {
			global.window = { undefined: false };
			global.document = { createElement: vi.fn() };
			const file = new File(['small'], 'test.png', { type: 'image/png' });
			Object.defineProperty(file, 'size', { value: 50 * 1024 });
			const result = await compressImageToWebp(file, { minSizeBytes: 100 * 1024 });
			expect(result).toBe(file);
		});
	});
});