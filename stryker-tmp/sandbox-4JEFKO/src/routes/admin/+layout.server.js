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
import { redirect } from '@sveltejs/kit';
export function load({
  locals
}) {
  if (stryMutAct_9fa48("494")) {
    {}
  } else {
    stryCov_9fa48("494");
    if (stryMutAct_9fa48("497") ? false : stryMutAct_9fa48("496") ? true : stryMutAct_9fa48("495") ? locals.user : (stryCov_9fa48("495", "496", "497"), !locals.user)) {
      if (stryMutAct_9fa48("498")) {
        {}
      } else {
        stryCov_9fa48("498");
        throw redirect(302, stryMutAct_9fa48("499") ? "" : (stryCov_9fa48("499"), '/login'));
      }
    }
    return stryMutAct_9fa48("500") ? {} : (stryCov_9fa48("500"), {
      user: locals.user
    });
  }
}