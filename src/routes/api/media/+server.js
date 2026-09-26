import { json, error } from '@sveltejs/kit';
import { randomUUID } from 'node:crypto';
import { getMediaBucket } from '$lib/firebase/admin';

const MEDIA_TYPES = {
  // Images
  'image/jpeg': 'images',
  'image/png': 'images',
  'image/gif': 'images',
  'image/webp': 'images',
  'image/avif': 'images',
  'image/svg+xml': 'images',
  // Audio
  'audio/mpeg': 'audio',
  'audio/mp3': 'audio',
  'audio/wav': 'audio',
  'audio/ogg': 'audio',
  'audio/aac': 'audio',
  'audio/flac': 'audio',
  // Video
  'video/mp4': 'video',
  'video/webm': 'video',
  'video/ogg': 'video',
  'video/quicktime': 'video',
};

const MAX_SIZES = {
  images: 10 * 1024 * 1024,   // 10MB
  audio: 50 * 1024 * 1024,    // 50MB
  video: 200 * 1024 * 1024,   // 200MB
};

function getPublicUrl(bucket, filePath, token) {
  const bucketName = bucket.name;
  const base = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodeURIComponent(filePath)}?alt=media`;
  return token ? `${base}&token=${token}` : base;
}

/** Extract first download token from object metadata (may be undefined). */
function getDownloadToken(metadata) {
  const tokens = metadata?.metadata?.firebaseStorageDownloadTokens;
  if (!tokens) return undefined;
  return String(tokens).split(',')[0];
}

const CATEGORIES = ['images', 'audio', 'video'];
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 100;

/**
 * @param {string | null} value
 * @param {number} fallback
 */
function readInt(value, fallback) {
  const n = Number.parseInt(value ?? '', 10);
  return Number.isFinite(n) ? n : fallback;
}

/** @param {string | undefined} iso */
function timeOf(iso) {
  const t = Date.parse(iso ?? '');
  return Number.isNaN(t) ? 0 : t;
}

/**
 * GET — one page of media files, newest first.
 *
 * Storage lists objects lexicographically, not by date, and the gallery orders
 * newest-first across all three folders — so serving page N still means knowing
 * every object's date. What pagination buys is the per-object work: `getFiles`
 * already returns each object's full metadata in the list response (one request
 * per 1000 objects), so the expensive part is the token backfill *write*, and
 * that now runs only for the files on the page being returned rather than for
 * the whole bucket on every load.
 *
 * Query: ?type=images|audio|video &q=<name filter> &page=<1-based> &limit=<n>
 */
export async function GET({ url }) {
  const filterType = url.searchParams.get('type'); // null = all
  const query = (url.searchParams.get('q') || '').trim().toLowerCase();
  const limit = Math.min(Math.max(readInt(url.searchParams.get('limit'), DEFAULT_LIMIT), 1), MAX_LIMIT);
  const requestedPage = Math.max(readInt(url.searchParams.get('page'), 1), 1);

  try {
    const bucket = getMediaBucket();

    // Every folder is listed even when one is filtered for, so the toolbar's
    // per-category counts stay accurate while a filter is applied.
    const listed = [];
    for (const category of CATEGORIES) {
      let files;
      try {
        [files] = await bucket.getFiles({ prefix: `${category}/` });
      } catch {
        // Folder might not exist yet, skip
        continue;
      }
      for (const file of files) {
        if (file.name.endsWith('/')) continue;
        listed.push({ file, category, metadata: file.metadata || {} });
      }
    }

    /** @type {Record<string, number>} */
    const counts = { all: listed.length, images: 0, audio: 0, video: 0 };
    for (const entry of listed) counts[entry.category]++;

    // Filter and search run server-side: paginating a client-side search would
    // only ever search the page already on screen.
    let matches = listed;
    if (filterType && CATEGORIES.includes(filterType)) {
      matches = matches.filter((entry) => entry.category === filterType);
    }
    if (query) {
      matches = matches.filter((entry) =>
        (entry.file.name.split('/').pop() || '').toLowerCase().includes(query)
      );
    }

    matches.sort((a, b) => timeOf(b.metadata.timeCreated) - timeOf(a.metadata.timeCreated));

    const total = matches.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    // Clamped rather than 404'd: deleting the last file on the last page would
    // otherwise strand the client on a page that no longer exists.
    const currentPage = Math.min(requestedPage, totalPages);
    const start = (currentPage - 1) * limit;
    const pageEntries = matches.slice(start, start + limit);

    const files = await Promise.all(
      pageEntries.map(async ({ file, category, metadata }) => {
        let token = getDownloadToken(metadata);
        if (!token) {
          // Backfill a token so legacy uploads become viewable
          token = randomUUID();
          try {
            await file.setMetadata({
              metadata: {
                ...(metadata.metadata || {}),
                firebaseStorageDownloadTokens: token,
              },
            });
          } catch {
            token = undefined;
          }
        }

        return {
          name: file.name.split('/').pop(),
          path: file.name,
          url: getPublicUrl(bucket, file.name, token),
          contentType: metadata.contentType || 'application/octet-stream',
          size: Number(metadata.size || 0),
          category,
          created: metadata.timeCreated || new Date().toISOString(),
          updated: metadata.updated || metadata.timeCreated || new Date().toISOString(),
        };
      })
    );

    return json({ files, page: currentPage, limit, total, totalPages, counts });
  } catch (err) {
    console.error('Failed to list media:', err);
    throw error(500, 'Failed to list media');
  }
}

/** POST — upload a file to Firebase Storage */
export async function POST({ request }) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || typeof file === 'string') {
      throw error(400, 'No file provided');
    }

    const contentType = file.type;
    const folder = MEDIA_TYPES[contentType];

    if (!folder) {
      throw error(400, `Unsupported file type: ${contentType}`);
    }

    const maxSize = MAX_SIZES[folder];
    if (file.size > maxSize) {
      const limitMB = Math.round(maxSize / 1024 / 1024);
      throw error(400, `File too large. Max ${limitMB}MB for ${folder}.`);
    }

    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const filePath = `${folder}/${timestamp}_${safeName}`;

    const bucket = getMediaBucket();
    const bucketFile = bucket.file(filePath);
    const buffer = Buffer.from(await file.arrayBuffer());
    const downloadToken = randomUUID();

    await bucketFile.save(buffer, {
      metadata: {
        contentType,
        metadata: {
          firebaseStorageDownloadTokens: downloadToken,
        },
      },
    });

    const [metadata] = await bucketFile.getMetadata();

    return json({
      name: safeName,
      path: filePath,
      url: getPublicUrl(bucket, filePath, downloadToken),
      contentType,
      size: Number(metadata.size || file.size),
      category: folder,
      created: metadata.timeCreated || new Date().toISOString(),
    });
  } catch (err) {
    if (err.status) throw err;
    console.error('Failed to upload media:', err);
    throw error(500, 'Failed to upload media');
  }
}

/** DELETE — remove a file from Firebase Storage */
export async function DELETE({ request }) {
  try {
    const { path } = await request.json();

    if (!path) {
      throw error(400, 'File path is required');
    }

    const file = getMediaBucket().file(path);
    const [exists] = await file.exists();

    if (!exists) {
      throw error(404, 'File not found');
    }

    await file.delete();
    return json({ success: true });
  } catch (err) {
    if (err.status) throw err;
    console.error('Failed to delete media:', err);
    throw error(500, 'Failed to delete media');
  }
}
