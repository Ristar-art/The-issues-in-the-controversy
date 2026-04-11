/**
 * Client-side image compression to WebP.
 *
 * Returns the original File unchanged when conversion is unnecessary:
 *   - not an image
 *   - already in an efficient format (webp, avif)
 *   - svg (vector) or gif (possibly animated) — conversion would lose data
 *   - file is below `minSizeBytes` (marginal gain not worth the CPU)
 *   - the encoded WebP is not smaller than the original
 *
 * @param {File} file
 * @param {{ quality?: number, minSizeBytes?: number }} [options]
 * @returns {Promise<File>}
 */
export async function compressImageToWebp(file, options = {}) {
  const quality = options.quality ?? 0.85;
  const minSizeBytes = options.minSizeBytes ?? 150 * 1024;

  // Only run in the browser.
  if (typeof window === 'undefined' || typeof document === 'undefined') return file;

  if (!file || !file.type || !file.type.startsWith('image/')) return file;

  const skip = new Set([
    'image/webp',
    'image/avif',
    'image/svg+xml',
    'image/gif',
  ]);
  if (skip.has(file.type)) return file;

  if (file.size < minSizeBytes) return file;

  /** @type {ImageBitmap | HTMLImageElement | null} */
  let source = null;
  try {
    if (typeof createImageBitmap === 'function') {
      source = await createImageBitmap(file);
    } else {
      source = await loadViaImgElement(file);
    }
  } catch {
    try {
      source = await loadViaImgElement(file);
    } catch {
      return file;
    }
  }

  const width = source.width;
  const height = source.height;
  if (!width || !height) return file;

  /** @type {OffscreenCanvas | HTMLCanvasElement} */
  let canvas;
  if (typeof OffscreenCanvas !== 'undefined') {
    canvas = new OffscreenCanvas(width, height);
  } else {
    const c = document.createElement('canvas');
    c.width = width;
    c.height = height;
    canvas = c;
  }

  const ctx = /** @type {CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D | null} */ (
    canvas.getContext('2d')
  );
  if (!ctx) return file;

  ctx.drawImage(/** @type {CanvasImageSource} */ (source), 0, 0);
  if ('close' in source && typeof source.close === 'function') source.close();

  /** @type {Blob | null} */
  let blob = null;
  try {
    if ('convertToBlob' in canvas) {
      blob = await canvas.convertToBlob({ type: 'image/webp', quality });
    } else {
      blob = await new Promise((resolve) => {
        /** @type {HTMLCanvasElement} */ (canvas).toBlob(
          (b) => resolve(b),
          'image/webp',
          quality
        );
      });
    }
  } catch {
    return file;
  }

  if (!blob || blob.size >= file.size) return file;

  const newName = file.name.replace(/\.[^.]+$/, '') + '.webp';
  return new File([blob], newName, {
    type: 'image/webp',
    lastModified: Date.now(),
  });
}

/**
 * @param {File} file
 * @returns {Promise<HTMLImageElement>}
 */
function loadViaImgElement(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = (e) => {
      URL.revokeObjectURL(url);
      reject(e);
    };
    img.src = url;
  });
}
