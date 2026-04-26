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
export async function compressImageToWebp(file, options = {}) {
  if (stryMutAct_9fa48("190")) {
    {}
  } else {
    stryCov_9fa48("190");
    const quality = stryMutAct_9fa48("191") ? options.quality && 0.85 : (stryCov_9fa48("191"), options.quality ?? 0.85);
    const minSizeBytes = stryMutAct_9fa48("192") ? options.minSizeBytes && 150 * 1024 : (stryCov_9fa48("192"), options.minSizeBytes ?? (stryMutAct_9fa48("193") ? 150 / 1024 : (stryCov_9fa48("193"), 150 * 1024)));

    // Only run in the browser.
    if (stryMutAct_9fa48("196") ? typeof window === 'undefined' && typeof document === 'undefined' : stryMutAct_9fa48("195") ? false : stryMutAct_9fa48("194") ? true : (stryCov_9fa48("194", "195", "196"), (stryMutAct_9fa48("198") ? typeof window !== 'undefined' : stryMutAct_9fa48("197") ? false : (stryCov_9fa48("197", "198"), typeof window === (stryMutAct_9fa48("199") ? "" : (stryCov_9fa48("199"), 'undefined')))) || (stryMutAct_9fa48("201") ? typeof document !== 'undefined' : stryMutAct_9fa48("200") ? false : (stryCov_9fa48("200", "201"), typeof document === (stryMutAct_9fa48("202") ? "" : (stryCov_9fa48("202"), 'undefined')))))) return file;
    if (stryMutAct_9fa48("205") ? (!file || !file.type) && !file.type.startsWith('image/') : stryMutAct_9fa48("204") ? false : stryMutAct_9fa48("203") ? true : (stryCov_9fa48("203", "204", "205"), (stryMutAct_9fa48("207") ? !file && !file.type : stryMutAct_9fa48("206") ? false : (stryCov_9fa48("206", "207"), (stryMutAct_9fa48("208") ? file : (stryCov_9fa48("208"), !file)) || (stryMutAct_9fa48("209") ? file.type : (stryCov_9fa48("209"), !file.type)))) || (stryMutAct_9fa48("210") ? file.type.startsWith('image/') : (stryCov_9fa48("210"), !(stryMutAct_9fa48("211") ? file.type.endsWith('image/') : (stryCov_9fa48("211"), file.type.startsWith(stryMutAct_9fa48("212") ? "" : (stryCov_9fa48("212"), 'image/')))))))) return file;
    const skip = new Set(stryMutAct_9fa48("213") ? [] : (stryCov_9fa48("213"), [stryMutAct_9fa48("214") ? "" : (stryCov_9fa48("214"), 'image/webp'), stryMutAct_9fa48("215") ? "" : (stryCov_9fa48("215"), 'image/avif'), stryMutAct_9fa48("216") ? "" : (stryCov_9fa48("216"), 'image/svg+xml'), stryMutAct_9fa48("217") ? "" : (stryCov_9fa48("217"), 'image/gif')]));
    if (stryMutAct_9fa48("219") ? false : stryMutAct_9fa48("218") ? true : (stryCov_9fa48("218", "219"), skip.has(file.type))) return file;
    if (stryMutAct_9fa48("223") ? file.size >= minSizeBytes : stryMutAct_9fa48("222") ? file.size <= minSizeBytes : stryMutAct_9fa48("221") ? false : stryMutAct_9fa48("220") ? true : (stryCov_9fa48("220", "221", "222", "223"), file.size < minSizeBytes)) return file;

    /** @type {ImageBitmap | HTMLImageElement | null} */
    let source = null;
    try {
      if (stryMutAct_9fa48("224")) {
        {}
      } else {
        stryCov_9fa48("224");
        if (stryMutAct_9fa48("227") ? typeof createImageBitmap !== 'function' : stryMutAct_9fa48("226") ? false : stryMutAct_9fa48("225") ? true : (stryCov_9fa48("225", "226", "227"), typeof createImageBitmap === (stryMutAct_9fa48("228") ? "" : (stryCov_9fa48("228"), 'function')))) {
          if (stryMutAct_9fa48("229")) {
            {}
          } else {
            stryCov_9fa48("229");
            source = await createImageBitmap(file);
          }
        } else {
          if (stryMutAct_9fa48("230")) {
            {}
          } else {
            stryCov_9fa48("230");
            source = await loadViaImgElement(file);
          }
        }
      }
    } catch {
      if (stryMutAct_9fa48("231")) {
        {}
      } else {
        stryCov_9fa48("231");
        try {
          if (stryMutAct_9fa48("232")) {
            {}
          } else {
            stryCov_9fa48("232");
            source = await loadViaImgElement(file);
          }
        } catch {
          if (stryMutAct_9fa48("233")) {
            {}
          } else {
            stryCov_9fa48("233");
            return file;
          }
        }
      }
    }
    const width = source.width;
    const height = source.height;
    if (stryMutAct_9fa48("236") ? !width && !height : stryMutAct_9fa48("235") ? false : stryMutAct_9fa48("234") ? true : (stryCov_9fa48("234", "235", "236"), (stryMutAct_9fa48("237") ? width : (stryCov_9fa48("237"), !width)) || (stryMutAct_9fa48("238") ? height : (stryCov_9fa48("238"), !height)))) return file;

    /** @type {OffscreenCanvas | HTMLCanvasElement} */
    let canvas;
    if (stryMutAct_9fa48("241") ? typeof OffscreenCanvas === 'undefined' : stryMutAct_9fa48("240") ? false : stryMutAct_9fa48("239") ? true : (stryCov_9fa48("239", "240", "241"), typeof OffscreenCanvas !== (stryMutAct_9fa48("242") ? "" : (stryCov_9fa48("242"), 'undefined')))) {
      if (stryMutAct_9fa48("243")) {
        {}
      } else {
        stryCov_9fa48("243");
        canvas = new OffscreenCanvas(width, height);
      }
    } else {
      if (stryMutAct_9fa48("244")) {
        {}
      } else {
        stryCov_9fa48("244");
        const c = document.createElement(stryMutAct_9fa48("245") ? "" : (stryCov_9fa48("245"), 'canvas'));
        c.width = width;
        c.height = height;
        canvas = c;
      }
    }
    const ctx = /** @type {CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D | null} */
    canvas.getContext(stryMutAct_9fa48("246") ? "" : (stryCov_9fa48("246"), '2d'));
    if (stryMutAct_9fa48("249") ? false : stryMutAct_9fa48("248") ? true : stryMutAct_9fa48("247") ? ctx : (stryCov_9fa48("247", "248", "249"), !ctx)) return file;
    ctx.drawImage(/** @type {CanvasImageSource} */source, 0, 0);
    if (stryMutAct_9fa48("252") ? 'close' in source || typeof source.close === 'function' : stryMutAct_9fa48("251") ? false : stryMutAct_9fa48("250") ? true : (stryCov_9fa48("250", "251", "252"), (stryMutAct_9fa48("253") ? "" : (stryCov_9fa48("253"), 'close')) in source && (stryMutAct_9fa48("255") ? typeof source.close !== 'function' : stryMutAct_9fa48("254") ? true : (stryCov_9fa48("254", "255"), typeof source.close === (stryMutAct_9fa48("256") ? "" : (stryCov_9fa48("256"), 'function')))))) source.close();

    /** @type {Blob | null} */
    let blob = null;
    try {
      if (stryMutAct_9fa48("257")) {
        {}
      } else {
        stryCov_9fa48("257");
        if (stryMutAct_9fa48("259") ? false : stryMutAct_9fa48("258") ? true : (stryCov_9fa48("258", "259"), (stryMutAct_9fa48("260") ? "" : (stryCov_9fa48("260"), 'convertToBlob')) in canvas)) {
          if (stryMutAct_9fa48("261")) {
            {}
          } else {
            stryCov_9fa48("261");
            blob = await canvas.convertToBlob(stryMutAct_9fa48("262") ? {} : (stryCov_9fa48("262"), {
              type: stryMutAct_9fa48("263") ? "" : (stryCov_9fa48("263"), 'image/webp'),
              quality
            }));
          }
        } else {
          if (stryMutAct_9fa48("264")) {
            {}
          } else {
            stryCov_9fa48("264");
            blob = await new Promise(resolve => {
              if (stryMutAct_9fa48("265")) {
                {}
              } else {
                stryCov_9fa48("265");
                /** @type {HTMLCanvasElement} */canvas.toBlob(stryMutAct_9fa48("266") ? () => undefined : (stryCov_9fa48("266"), b => resolve(b)), stryMutAct_9fa48("267") ? "" : (stryCov_9fa48("267"), 'image/webp'), quality);
              }
            });
          }
        }
      }
    } catch {
      if (stryMutAct_9fa48("268")) {
        {}
      } else {
        stryCov_9fa48("268");
        return file;
      }
    }
    if (stryMutAct_9fa48("271") ? !blob && blob.size >= file.size : stryMutAct_9fa48("270") ? false : stryMutAct_9fa48("269") ? true : (stryCov_9fa48("269", "270", "271"), (stryMutAct_9fa48("272") ? blob : (stryCov_9fa48("272"), !blob)) || (stryMutAct_9fa48("275") ? blob.size < file.size : stryMutAct_9fa48("274") ? blob.size > file.size : stryMutAct_9fa48("273") ? false : (stryCov_9fa48("273", "274", "275"), blob.size >= file.size)))) return file;
    const newName = file.name.replace(stryMutAct_9fa48("278") ? /\.[.]+$/ : stryMutAct_9fa48("277") ? /\.[^.]$/ : stryMutAct_9fa48("276") ? /\.[^.]+/ : (stryCov_9fa48("276", "277", "278"), /\.[^.]+$/), stryMutAct_9fa48("279") ? "Stryker was here!" : (stryCov_9fa48("279"), '')) + (stryMutAct_9fa48("280") ? "" : (stryCov_9fa48("280"), '.webp'));
    return new File(stryMutAct_9fa48("281") ? [] : (stryCov_9fa48("281"), [blob]), newName, stryMutAct_9fa48("282") ? {} : (stryCov_9fa48("282"), {
      type: stryMutAct_9fa48("283") ? "" : (stryCov_9fa48("283"), 'image/webp'),
      lastModified: Date.now()
    }));
  }
}

/**
 * @param {File} file
 * @returns {Promise<HTMLImageElement>}
 */
function loadViaImgElement(file) {
  if (stryMutAct_9fa48("284")) {
    {}
  } else {
    stryCov_9fa48("284");
    return new Promise((resolve, reject) => {
      if (stryMutAct_9fa48("285")) {
        {}
      } else {
        stryCov_9fa48("285");
        const url = URL.createObjectURL(file);
        const img = new Image();
        img.onload = () => {
          if (stryMutAct_9fa48("286")) {
            {}
          } else {
            stryCov_9fa48("286");
            URL.revokeObjectURL(url);
            resolve(img);
          }
        };
        img.onerror = e => {
          if (stryMutAct_9fa48("287")) {
            {}
          } else {
            stryCov_9fa48("287");
            URL.revokeObjectURL(url);
            reject(e);
          }
        };
        img.src = url;
      }
    });
  }
}