// @ts-nocheck
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

/** GET — list all media files from Firebase Storage */
export async function GET({ url }) {
  const filterType = url.searchParams.get('type'); // 'images' | 'audio' | 'video' | null (all)

  try {
    const bucket = getMediaBucket();
    const prefixes = filterType ? [filterType] : ['images', 'audio', 'video'];
    const allFiles = [];

    for (const prefix of prefixes) {
      let files;
      try {
        [files] = await bucket.getFiles({ prefix: `${prefix}/` });
      } catch {
        // Folder might not exist yet, skip
        continue;
      }

      for (const file of files) {
        if (file.name.endsWith('/')) continue;

        let metadata;
        try {
          [metadata] = await file.getMetadata();
        } catch {
          continue;
        }

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

        allFiles.push({
          name: file.name.split('/').pop(),
          path: file.name,
          url: getPublicUrl(bucket, file.name, token),
          contentType: metadata.contentType || 'application/octet-stream',
          size: Number(metadata.size || 0),
          category: prefix,
          created: metadata.timeCreated || new Date().toISOString(),
          updated: metadata.updated || metadata.timeCreated || new Date().toISOString(),
        });
      }
    }

    allFiles.sort((a, b) => new Date(b.created) - new Date(a.created));

    return json(allFiles);
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
