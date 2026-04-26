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
import { json } from '@sveltejs/kit';
import { adminDb } from '$lib/firebase/admin';
export async function GET() {
  if (stryMutAct_9fa48("696")) {
    {}
  } else {
    stryCov_9fa48("696");
    try {
      if (stryMutAct_9fa48("697")) {
        {}
      } else {
        stryCov_9fa48("697");
        const doc = await adminDb.collection(stryMutAct_9fa48("698") ? "" : (stryCov_9fa48("698"), 'landing')).doc(stryMutAct_9fa48("699") ? "" : (stryCov_9fa48("699"), 'config')).get();
        if (stryMutAct_9fa48("702") ? false : stryMutAct_9fa48("701") ? true : stryMutAct_9fa48("700") ? doc.exists : (stryCov_9fa48("700", "701", "702"), !doc.exists)) {
          if (stryMutAct_9fa48("703")) {
            {}
          } else {
            stryCov_9fa48("703");
            return json(stryMutAct_9fa48("704") ? {} : (stryCov_9fa48("704"), {
              error: stryMutAct_9fa48("705") ? "" : (stryCov_9fa48("705"), 'Landing data not found')
            }), stryMutAct_9fa48("706") ? {} : (stryCov_9fa48("706"), {
              status: 404
            }));
          }
        }
        return json(doc.data());
      }
    } catch (err) {
      if (stryMutAct_9fa48("707")) {
        {}
      } else {
        stryCov_9fa48("707");
        console.error(stryMutAct_9fa48("708") ? "" : (stryCov_9fa48("708"), 'Failed to load landing data:'), err);
        return json(stryMutAct_9fa48("709") ? {} : (stryCov_9fa48("709"), {
          error: stryMutAct_9fa48("710") ? "" : (stryCov_9fa48("710"), 'Failed to load landing data')
        }), stryMutAct_9fa48("711") ? {} : (stryCov_9fa48("711"), {
          status: 500
        }));
      }
    }
  }
}