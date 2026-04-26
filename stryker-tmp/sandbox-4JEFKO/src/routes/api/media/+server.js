// @ts-nocheck
function stryNS_9fa48() {
  var g = typeof globalThis === 'object' && globalThis && globalThis.Math === Math && globalThis || new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }
  function retrieveNS() {
    return ns;
  }
  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });
  function cover() {
    var c = cov.static;
    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }
  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();
  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }
      return true;
    }
    return false;
  }
  stryMutAct_9fa48 = isActive;
  return isActive(id);
}
import { json, error } from '@sveltejs/kit';
import { randomUUID } from 'node:crypto';
import { getMediaBucket } from '$lib/firebase/admin';
const MEDIA_TYPES = stryMutAct_9fa48("712") ? {} : (stryCov_9fa48("712"), {
  // Images
  'image/jpeg': stryMutAct_9fa48("713") ? "" : (stryCov_9fa48("713"), 'images'),
  'image/png': stryMutAct_9fa48("714") ? "" : (stryCov_9fa48("714"), 'images'),
  'image/gif': stryMutAct_9fa48("715") ? "" : (stryCov_9fa48("715"), 'images'),
  'image/webp': stryMutAct_9fa48("716") ? "" : (stryCov_9fa48("716"), 'images'),
  'image/avif': stryMutAct_9fa48("717") ? "" : (stryCov_9fa48("717"), 'images'),
  'image/svg+xml': stryMutAct_9fa48("718") ? "" : (stryCov_9fa48("718"), 'images'),
  // Audio
  'audio/mpeg': stryMutAct_9fa48("719") ? "" : (stryCov_9fa48("719"), 'audio'),
  'audio/mp3': stryMutAct_9fa48("720") ? "" : (stryCov_9fa48("720"), 'audio'),
  'audio/wav': stryMutAct_9fa48("721") ? "" : (stryCov_9fa48("721"), 'audio'),
  'audio/ogg': stryMutAct_9fa48("722") ? "" : (stryCov_9fa48("722"), 'audio'),
  'audio/aac': stryMutAct_9fa48("723") ? "" : (stryCov_9fa48("723"), 'audio'),
  'audio/flac': stryMutAct_9fa48("724") ? "" : (stryCov_9fa48("724"), 'audio'),
  // Video
  'video/mp4': stryMutAct_9fa48("725") ? "" : (stryCov_9fa48("725"), 'video'),
  'video/webm': stryMutAct_9fa48("726") ? "" : (stryCov_9fa48("726"), 'video'),
  'video/ogg': stryMutAct_9fa48("727") ? "" : (stryCov_9fa48("727"), 'video'),
  'video/quicktime': stryMutAct_9fa48("728") ? "" : (stryCov_9fa48("728"), 'video')
});
const MAX_SIZES = stryMutAct_9fa48("729") ? {} : (stryCov_9fa48("729"), {
  images: stryMutAct_9fa48("730") ? 10 * 1024 / 1024 : (stryCov_9fa48("730"), (stryMutAct_9fa48("731") ? 10 / 1024 : (stryCov_9fa48("731"), 10 * 1024)) * 1024),
  // 10MB
  audio: stryMutAct_9fa48("732") ? 50 * 1024 / 1024 : (stryCov_9fa48("732"), (stryMutAct_9fa48("733") ? 50 / 1024 : (stryCov_9fa48("733"), 50 * 1024)) * 1024),
  // 50MB
  video: stryMutAct_9fa48("734") ? 200 * 1024 / 1024 : (stryCov_9fa48("734"), (stryMutAct_9fa48("735") ? 200 / 1024 : (stryCov_9fa48("735"), 200 * 1024)) * 1024) // 200MB
});
function getPublicUrl(bucket, filePath, token) {
  if (stryMutAct_9fa48("736")) {
    {}
  } else {
    stryCov_9fa48("736");
    const bucketName = bucket.name;
    const base = stryMutAct_9fa48("737") ? `` : (stryCov_9fa48("737"), `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodeURIComponent(filePath)}?alt=media`);
    return token ? stryMutAct_9fa48("738") ? `` : (stryCov_9fa48("738"), `${base}&token=${token}`) : base;
  }
}

/** Extract first download token from object metadata (may be undefined). */
function getDownloadToken(metadata) {
  if (stryMutAct_9fa48("739")) {
    {}
  } else {
    stryCov_9fa48("739");
    const tokens = stryMutAct_9fa48("741") ? metadata.metadata?.firebaseStorageDownloadTokens : stryMutAct_9fa48("740") ? metadata?.metadata.firebaseStorageDownloadTokens : (stryCov_9fa48("740", "741"), metadata?.metadata?.firebaseStorageDownloadTokens);
    if (stryMutAct_9fa48("744") ? false : stryMutAct_9fa48("743") ? true : stryMutAct_9fa48("742") ? tokens : (stryCov_9fa48("742", "743", "744"), !tokens)) return undefined;
    return String(tokens).split(stryMutAct_9fa48("745") ? "" : (stryCov_9fa48("745"), ','))[0];
  }
}

/** GET — list all media files from Firebase Storage */
export async function GET({
  url
}) {
  if (stryMutAct_9fa48("746")) {
    {}
  } else {
    stryCov_9fa48("746");
    const filterType = url.searchParams.get(stryMutAct_9fa48("747") ? "" : (stryCov_9fa48("747"), 'type')); // 'images' | 'audio' | 'video' | null (all)

    try {
      if (stryMutAct_9fa48("748")) {
        {}
      } else {
        stryCov_9fa48("748");
        const bucket = getMediaBucket();
        const prefixes = filterType ? stryMutAct_9fa48("749") ? [] : (stryCov_9fa48("749"), [filterType]) : stryMutAct_9fa48("750") ? [] : (stryCov_9fa48("750"), [stryMutAct_9fa48("751") ? "" : (stryCov_9fa48("751"), 'images'), stryMutAct_9fa48("752") ? "" : (stryCov_9fa48("752"), 'audio'), stryMutAct_9fa48("753") ? "" : (stryCov_9fa48("753"), 'video')]);
        const allFiles = stryMutAct_9fa48("754") ? ["Stryker was here"] : (stryCov_9fa48("754"), []);
        for (const prefix of prefixes) {
          if (stryMutAct_9fa48("755")) {
            {}
          } else {
            stryCov_9fa48("755");
            let files;
            try {
              if (stryMutAct_9fa48("756")) {
                {}
              } else {
                stryCov_9fa48("756");
                [files] = await bucket.getFiles(stryMutAct_9fa48("757") ? {} : (stryCov_9fa48("757"), {
                  prefix: stryMutAct_9fa48("758") ? `` : (stryCov_9fa48("758"), `${prefix}/`)
                }));
              }
            } catch {
              if (stryMutAct_9fa48("759")) {
                {}
              } else {
                stryCov_9fa48("759");
                // Folder might not exist yet, skip
                continue;
              }
            }
            for (const file of files) {
              if (stryMutAct_9fa48("760")) {
                {}
              } else {
                stryCov_9fa48("760");
                if (stryMutAct_9fa48("763") ? file.name.startsWith('/') : stryMutAct_9fa48("762") ? false : stryMutAct_9fa48("761") ? true : (stryCov_9fa48("761", "762", "763"), file.name.endsWith(stryMutAct_9fa48("764") ? "" : (stryCov_9fa48("764"), '/')))) continue;
                let metadata;
                try {
                  if (stryMutAct_9fa48("765")) {
                    {}
                  } else {
                    stryCov_9fa48("765");
                    [metadata] = await file.getMetadata();
                  }
                } catch {
                  if (stryMutAct_9fa48("766")) {
                    {}
                  } else {
                    stryCov_9fa48("766");
                    continue;
                  }
                }
                let token = getDownloadToken(metadata);
                if (stryMutAct_9fa48("769") ? false : stryMutAct_9fa48("768") ? true : stryMutAct_9fa48("767") ? token : (stryCov_9fa48("767", "768", "769"), !token)) {
                  if (stryMutAct_9fa48("770")) {
                    {}
                  } else {
                    stryCov_9fa48("770");
                    // Backfill a token so legacy uploads become viewable
                    token = randomUUID();
                    try {
                      if (stryMutAct_9fa48("771")) {
                        {}
                      } else {
                        stryCov_9fa48("771");
                        await file.setMetadata(stryMutAct_9fa48("772") ? {} : (stryCov_9fa48("772"), {
                          metadata: stryMutAct_9fa48("773") ? {} : (stryCov_9fa48("773"), {
                            ...(stryMutAct_9fa48("776") ? metadata.metadata && {} : stryMutAct_9fa48("775") ? false : stryMutAct_9fa48("774") ? true : (stryCov_9fa48("774", "775", "776"), metadata.metadata || {})),
                            firebaseStorageDownloadTokens: token
                          })
                        }));
                      }
                    } catch {
                      if (stryMutAct_9fa48("777")) {
                        {}
                      } else {
                        stryCov_9fa48("777");
                        token = undefined;
                      }
                    }
                  }
                }
                allFiles.push(stryMutAct_9fa48("778") ? {} : (stryCov_9fa48("778"), {
                  name: file.name.split(stryMutAct_9fa48("779") ? "" : (stryCov_9fa48("779"), '/')).pop(),
                  path: file.name,
                  url: getPublicUrl(bucket, file.name, token),
                  contentType: stryMutAct_9fa48("782") ? metadata.contentType && 'application/octet-stream' : stryMutAct_9fa48("781") ? false : stryMutAct_9fa48("780") ? true : (stryCov_9fa48("780", "781", "782"), metadata.contentType || (stryMutAct_9fa48("783") ? "" : (stryCov_9fa48("783"), 'application/octet-stream'))),
                  size: Number(stryMutAct_9fa48("786") ? metadata.size && 0 : stryMutAct_9fa48("785") ? false : stryMutAct_9fa48("784") ? true : (stryCov_9fa48("784", "785", "786"), metadata.size || 0)),
                  category: prefix,
                  created: stryMutAct_9fa48("789") ? metadata.timeCreated && new Date().toISOString() : stryMutAct_9fa48("788") ? false : stryMutAct_9fa48("787") ? true : (stryCov_9fa48("787", "788", "789"), metadata.timeCreated || new Date().toISOString()),
                  updated: stryMutAct_9fa48("792") ? (metadata.updated || metadata.timeCreated) && new Date().toISOString() : stryMutAct_9fa48("791") ? false : stryMutAct_9fa48("790") ? true : (stryCov_9fa48("790", "791", "792"), (stryMutAct_9fa48("794") ? metadata.updated && metadata.timeCreated : stryMutAct_9fa48("793") ? false : (stryCov_9fa48("793", "794"), metadata.updated || metadata.timeCreated)) || new Date().toISOString())
                }));
              }
            }
          }
        }
        stryMutAct_9fa48("795") ? allFiles : (stryCov_9fa48("795"), allFiles.sort(stryMutAct_9fa48("796") ? () => undefined : (stryCov_9fa48("796"), (a, b) => stryMutAct_9fa48("797") ? new Date(b.created) + new Date(a.created) : (stryCov_9fa48("797"), new Date(b.created) - new Date(a.created)))));
        return json(allFiles);
      }
    } catch (err) {
      if (stryMutAct_9fa48("798")) {
        {}
      } else {
        stryCov_9fa48("798");
        console.error(stryMutAct_9fa48("799") ? "" : (stryCov_9fa48("799"), 'Failed to list media:'), err);
        throw error(500, stryMutAct_9fa48("800") ? "" : (stryCov_9fa48("800"), 'Failed to list media'));
      }
    }
  }
}

/** POST — upload a file to Firebase Storage */
export async function POST({
  request
}) {
  if (stryMutAct_9fa48("801")) {
    {}
  } else {
    stryCov_9fa48("801");
    try {
      if (stryMutAct_9fa48("802")) {
        {}
      } else {
        stryCov_9fa48("802");
        const formData = await request.formData();
        const file = formData.get(stryMutAct_9fa48("803") ? "" : (stryCov_9fa48("803"), 'file'));
        if (stryMutAct_9fa48("806") ? !file && typeof file === 'string' : stryMutAct_9fa48("805") ? false : stryMutAct_9fa48("804") ? true : (stryCov_9fa48("804", "805", "806"), (stryMutAct_9fa48("807") ? file : (stryCov_9fa48("807"), !file)) || (stryMutAct_9fa48("809") ? typeof file !== 'string' : stryMutAct_9fa48("808") ? false : (stryCov_9fa48("808", "809"), typeof file === (stryMutAct_9fa48("810") ? "" : (stryCov_9fa48("810"), 'string')))))) {
          if (stryMutAct_9fa48("811")) {
            {}
          } else {
            stryCov_9fa48("811");
            throw error(400, stryMutAct_9fa48("812") ? "" : (stryCov_9fa48("812"), 'No file provided'));
          }
        }
        const contentType = file.type;
        const folder = MEDIA_TYPES[contentType];
        if (stryMutAct_9fa48("815") ? false : stryMutAct_9fa48("814") ? true : stryMutAct_9fa48("813") ? folder : (stryCov_9fa48("813", "814", "815"), !folder)) {
          if (stryMutAct_9fa48("816")) {
            {}
          } else {
            stryCov_9fa48("816");
            throw error(400, stryMutAct_9fa48("817") ? `` : (stryCov_9fa48("817"), `Unsupported file type: ${contentType}`));
          }
        }
        const maxSize = MAX_SIZES[folder];
        if (stryMutAct_9fa48("821") ? file.size <= maxSize : stryMutAct_9fa48("820") ? file.size >= maxSize : stryMutAct_9fa48("819") ? false : stryMutAct_9fa48("818") ? true : (stryCov_9fa48("818", "819", "820", "821"), file.size > maxSize)) {
          if (stryMutAct_9fa48("822")) {
            {}
          } else {
            stryCov_9fa48("822");
            const limitMB = Math.round(stryMutAct_9fa48("823") ? maxSize / 1024 * 1024 : (stryCov_9fa48("823"), (stryMutAct_9fa48("824") ? maxSize * 1024 : (stryCov_9fa48("824"), maxSize / 1024)) / 1024));
            throw error(400, stryMutAct_9fa48("825") ? `` : (stryCov_9fa48("825"), `File too large. Max ${limitMB}MB for ${folder}.`));
          }
        }
        const timestamp = Date.now();
        const safeName = file.name.replace(stryMutAct_9fa48("826") ? /[a-zA-Z0-9._-]/g : (stryCov_9fa48("826"), /[^a-zA-Z0-9._-]/g), stryMutAct_9fa48("827") ? "" : (stryCov_9fa48("827"), '_'));
        const filePath = stryMutAct_9fa48("828") ? `` : (stryCov_9fa48("828"), `${folder}/${timestamp}_${safeName}`);
        const bucket = getMediaBucket();
        const bucketFile = bucket.file(filePath);
        const buffer = Buffer.from(await file.arrayBuffer());
        const downloadToken = randomUUID();
        await bucketFile.save(buffer, stryMutAct_9fa48("829") ? {} : (stryCov_9fa48("829"), {
          metadata: stryMutAct_9fa48("830") ? {} : (stryCov_9fa48("830"), {
            contentType,
            metadata: stryMutAct_9fa48("831") ? {} : (stryCov_9fa48("831"), {
              firebaseStorageDownloadTokens: downloadToken
            })
          })
        }));
        const [metadata] = await bucketFile.getMetadata();
        return json(stryMutAct_9fa48("832") ? {} : (stryCov_9fa48("832"), {
          name: safeName,
          path: filePath,
          url: getPublicUrl(bucket, filePath, downloadToken),
          contentType,
          size: Number(stryMutAct_9fa48("835") ? metadata.size && file.size : stryMutAct_9fa48("834") ? false : stryMutAct_9fa48("833") ? true : (stryCov_9fa48("833", "834", "835"), metadata.size || file.size)),
          category: folder,
          created: stryMutAct_9fa48("838") ? metadata.timeCreated && new Date().toISOString() : stryMutAct_9fa48("837") ? false : stryMutAct_9fa48("836") ? true : (stryCov_9fa48("836", "837", "838"), metadata.timeCreated || new Date().toISOString())
        }));
      }
    } catch (err) {
      if (stryMutAct_9fa48("839")) {
        {}
      } else {
        stryCov_9fa48("839");
        if (stryMutAct_9fa48("841") ? false : stryMutAct_9fa48("840") ? true : (stryCov_9fa48("840", "841"), err.status)) throw err;
        console.error(stryMutAct_9fa48("842") ? "" : (stryCov_9fa48("842"), 'Failed to upload media:'), err);
        throw error(500, stryMutAct_9fa48("843") ? "" : (stryCov_9fa48("843"), 'Failed to upload media'));
      }
    }
  }
}

/** DELETE — remove a file from Firebase Storage */
export async function DELETE({
  request
}) {
  if (stryMutAct_9fa48("844")) {
    {}
  } else {
    stryCov_9fa48("844");
    try {
      if (stryMutAct_9fa48("845")) {
        {}
      } else {
        stryCov_9fa48("845");
        const {
          path
        } = await request.json();
        if (stryMutAct_9fa48("848") ? false : stryMutAct_9fa48("847") ? true : stryMutAct_9fa48("846") ? path : (stryCov_9fa48("846", "847", "848"), !path)) {
          if (stryMutAct_9fa48("849")) {
            {}
          } else {
            stryCov_9fa48("849");
            throw error(400, stryMutAct_9fa48("850") ? "" : (stryCov_9fa48("850"), 'File path is required'));
          }
        }
        const file = getMediaBucket().file(path);
        const [exists] = await file.exists();
        if (stryMutAct_9fa48("853") ? false : stryMutAct_9fa48("852") ? true : stryMutAct_9fa48("851") ? exists : (stryCov_9fa48("851", "852", "853"), !exists)) {
          if (stryMutAct_9fa48("854")) {
            {}
          } else {
            stryCov_9fa48("854");
            throw error(404, stryMutAct_9fa48("855") ? "" : (stryCov_9fa48("855"), 'File not found'));
          }
        }
        await file.delete();
        return json(stryMutAct_9fa48("856") ? {} : (stryCov_9fa48("856"), {
          success: stryMutAct_9fa48("857") ? false : (stryCov_9fa48("857"), true)
        }));
      }
    } catch (err) {
      if (stryMutAct_9fa48("858")) {
        {}
      } else {
        stryCov_9fa48("858");
        if (stryMutAct_9fa48("860") ? false : stryMutAct_9fa48("859") ? true : (stryCov_9fa48("859", "860"), err.status)) throw err;
        console.error(stryMutAct_9fa48("861") ? "" : (stryCov_9fa48("861"), 'Failed to delete media:'), err);
        throw error(500, stryMutAct_9fa48("862") ? "" : (stryCov_9fa48("862"), 'Failed to delete media'));
      }
    }
  }
}