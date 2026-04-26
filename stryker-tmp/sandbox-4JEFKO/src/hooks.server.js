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
import { adminAuth } from '$lib/firebase/admin';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({
  event,
  resolve
}) {
  if (stryMutAct_9fa48("0")) {
    {}
  } else {
    stryCov_9fa48("0");
    const session = event.cookies.get(stryMutAct_9fa48("1") ? "" : (stryCov_9fa48("1"), 'session'));
    if (stryMutAct_9fa48("3") ? false : stryMutAct_9fa48("2") ? true : (stryCov_9fa48("2", "3"), session)) {
      if (stryMutAct_9fa48("4")) {
        {}
      } else {
        stryCov_9fa48("4");
        try {
          if (stryMutAct_9fa48("5")) {
            {}
          } else {
            stryCov_9fa48("5");
            const decoded = await adminAuth.verifyIdToken(session);
            event.locals.user = stryMutAct_9fa48("6") ? {} : (stryCov_9fa48("6"), {
              uid: decoded.uid,
              email: decoded.email
            });
          }
        } catch {
          if (stryMutAct_9fa48("7")) {
            {}
          } else {
            stryCov_9fa48("7");
            // Invalid or expired token — clear the cookie
            event.cookies.delete(stryMutAct_9fa48("8") ? "" : (stryCov_9fa48("8"), 'session'), stryMutAct_9fa48("9") ? {} : (stryCov_9fa48("9"), {
              path: stryMutAct_9fa48("10") ? "" : (stryCov_9fa48("10"), '/')
            }));
          }
        }
      }
    }
    return resolve(event);
  }
}