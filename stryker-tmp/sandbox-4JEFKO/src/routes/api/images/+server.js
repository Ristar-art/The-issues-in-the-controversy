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
import { readdir } from 'fs/promises';
import { join } from 'path';
import { json } from '@sveltejs/kit';
const imageExtensions = stryMutAct_9fa48("672") ? [] : (stryCov_9fa48("672"), [stryMutAct_9fa48("673") ? "" : (stryCov_9fa48("673"), '.jpg'), stryMutAct_9fa48("674") ? "" : (stryCov_9fa48("674"), '.jpeg'), stryMutAct_9fa48("675") ? "" : (stryCov_9fa48("675"), '.png'), stryMutAct_9fa48("676") ? "" : (stryCov_9fa48("676"), '.gif'), stryMutAct_9fa48("677") ? "" : (stryCov_9fa48("677"), '.webp'), stryMutAct_9fa48("678") ? "" : (stryCov_9fa48("678"), '.avif')]);
export async function GET() {
  if (stryMutAct_9fa48("679")) {
    {}
  } else {
    stryCov_9fa48("679");
    try {
      if (stryMutAct_9fa48("680")) {
        {}
      } else {
        stryCov_9fa48("680");
        const files = await readdir(stryMutAct_9fa48("681") ? "" : (stryCov_9fa48("681"), 'static'));
        const images = stryMutAct_9fa48("682") ? files.map(file => ({
          name: file,
          url: `/${file}`
        })) : (stryCov_9fa48("682"), files.filter(stryMutAct_9fa48("683") ? () => undefined : (stryCov_9fa48("683"), file => stryMutAct_9fa48("684") ? imageExtensions.every(ext => file.toLowerCase().endsWith(ext)) : (stryCov_9fa48("684"), imageExtensions.some(stryMutAct_9fa48("685") ? () => undefined : (stryCov_9fa48("685"), ext => stryMutAct_9fa48("687") ? file.toUpperCase().endsWith(ext) : stryMutAct_9fa48("686") ? file.toLowerCase().startsWith(ext) : (stryCov_9fa48("686", "687"), file.toLowerCase().endsWith(ext))))))).map(stryMutAct_9fa48("688") ? () => undefined : (stryCov_9fa48("688"), file => stryMutAct_9fa48("689") ? {} : (stryCov_9fa48("689"), {
          name: file,
          url: stryMutAct_9fa48("690") ? `` : (stryCov_9fa48("690"), `/${file}`)
        }))));
        return json(images);
      }
    } catch (error) {
      if (stryMutAct_9fa48("691")) {
        {}
      } else {
        stryCov_9fa48("691");
        console.error(stryMutAct_9fa48("692") ? "" : (stryCov_9fa48("692"), 'Error listing images:'), error);
        return json(stryMutAct_9fa48("693") ? {} : (stryCov_9fa48("693"), {
          error: stryMutAct_9fa48("694") ? "" : (stryCov_9fa48("694"), 'Failed to list images')
        }), stryMutAct_9fa48("695") ? {} : (stryCov_9fa48("695"), {
          status: 500
        }));
      }
    }
  }
}