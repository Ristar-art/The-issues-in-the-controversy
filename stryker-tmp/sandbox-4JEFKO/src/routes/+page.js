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
export async function load({
  fetch
}) {
  if (stryMutAct_9fa48("306")) {
    {}
  } else {
    stryCov_9fa48("306");
    const res = await fetch(stryMutAct_9fa48("307") ? "" : (stryCov_9fa48("307"), '/api/landing'));
    if (stryMutAct_9fa48("310") ? false : stryMutAct_9fa48("309") ? true : stryMutAct_9fa48("308") ? res.ok : (stryCov_9fa48("308", "309", "310"), !res.ok)) {
      if (stryMutAct_9fa48("311")) {
        {}
      } else {
        stryCov_9fa48("311");
        console.error(stryMutAct_9fa48("312") ? "" : (stryCov_9fa48("312"), 'Failed to load landing data'), res.status);
        return stryMutAct_9fa48("313") ? {} : (stryCov_9fa48("313"), {
          landing: null
        });
      }
    }
    const landing = await res.json();
    return stryMutAct_9fa48("314") ? {} : (stryCov_9fa48("314"), {
      landing
    });
  }
}