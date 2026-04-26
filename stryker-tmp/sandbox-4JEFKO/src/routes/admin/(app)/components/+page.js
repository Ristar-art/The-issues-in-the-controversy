/** @type {import('./$types').PageLoad} */
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
  if (stryMutAct_9fa48("379")) {
    {}
  } else {
    stryCov_9fa48("379");
    try {
      if (stryMutAct_9fa48("380")) {
        {}
      } else {
        stryCov_9fa48("380");
        // Load all components
        const componentsRes = await fetch(stryMutAct_9fa48("381") ? "" : (stryCov_9fa48("381"), '/api/components'));
        const components = componentsRes.ok ? await componentsRes.json() : stryMutAct_9fa48("382") ? ["Stryker was here"] : (stryCov_9fa48("382"), []);

        // Get custom components
        const customComponents = stryMutAct_9fa48("383") ? components : (stryCov_9fa48("383"), components.filter(/** @param {any} c */stryMutAct_9fa48("384") ? () => undefined : (stryCov_9fa48("384"), c => stryMutAct_9fa48("387") ? c.category !== 'custom' : stryMutAct_9fa48("386") ? false : stryMutAct_9fa48("385") ? true : (stryCov_9fa48("385", "386", "387"), c.category === (stryMutAct_9fa48("388") ? "" : (stryCov_9fa48("388"), 'custom'))))));
        return stryMutAct_9fa48("389") ? {} : (stryCov_9fa48("389"), {
          components,
          customComponents
        });
      }
    } catch (err) {
      if (stryMutAct_9fa48("390")) {
        {}
      } else {
        stryCov_9fa48("390");
        console.error(stryMutAct_9fa48("391") ? "" : (stryCov_9fa48("391"), 'Error loading components:'), err);
        return stryMutAct_9fa48("392") ? {} : (stryCov_9fa48("392"), {
          components: stryMutAct_9fa48("393") ? ["Stryker was here"] : (stryCov_9fa48("393"), []),
          customComponents: stryMutAct_9fa48("394") ? ["Stryker was here"] : (stryCov_9fa48("394"), [])
        });
      }
    }
  }
}