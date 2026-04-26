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
  fetch,
  params
}) {
  if (stryMutAct_9fa48("395")) {
    {}
  } else {
    stryCov_9fa48("395");
    const {
      slug
    } = params;
    try {
      if (stryMutAct_9fa48("396")) {
        {}
      } else {
        stryCov_9fa48("396");
        // Load the article
        const articleRes = await fetch(stryMutAct_9fa48("397") ? "" : (stryCov_9fa48("397"), '/api/articles'));
        if (stryMutAct_9fa48("400") ? false : stryMutAct_9fa48("399") ? true : stryMutAct_9fa48("398") ? articleRes.ok : (stryCov_9fa48("398", "399", "400"), !articleRes.ok)) {
          if (stryMutAct_9fa48("401")) {
            {}
          } else {
            stryCov_9fa48("401");
            throw new Error(stryMutAct_9fa48("402") ? "" : (stryCov_9fa48("402"), 'Failed to load articles'));
          }
        }
        const articles = await articleRes.json();
        const article = articles.find(/** @param {any} a */stryMutAct_9fa48("403") ? () => undefined : (stryCov_9fa48("403"), a => stryMutAct_9fa48("406") ? a.attributes?.slug !== slug : stryMutAct_9fa48("405") ? false : stryMutAct_9fa48("404") ? true : (stryCov_9fa48("404", "405", "406"), (stryMutAct_9fa48("407") ? a.attributes.slug : (stryCov_9fa48("407"), a.attributes?.slug)) === slug)));
        if (stryMutAct_9fa48("410") ? false : stryMutAct_9fa48("409") ? true : stryMutAct_9fa48("408") ? article : (stryCov_9fa48("408", "409", "410"), !article)) {
          if (stryMutAct_9fa48("411")) {
            {}
          } else {
            stryCov_9fa48("411");
            return stryMutAct_9fa48("412") ? {} : (stryCov_9fa48("412"), {
              status: 404,
              error: new Error(stryMutAct_9fa48("413") ? "" : (stryCov_9fa48("413"), 'Article not found'))
            });
          }
        }

        // Load all available components
        const componentsRes = await fetch(stryMutAct_9fa48("414") ? "" : (stryCov_9fa48("414"), '/api/components'));
        const allComponents = componentsRes.ok ? await componentsRes.json() : stryMutAct_9fa48("415") ? ["Stryker was here"] : (stryCov_9fa48("415"), []);

        // Get custom components for the component block picker
        const customComponents = stryMutAct_9fa48("416") ? allComponents : (stryCov_9fa48("416"), allComponents.filter(/** @param {any} c */stryMutAct_9fa48("417") ? () => undefined : (stryCov_9fa48("417"), c => stryMutAct_9fa48("420") ? c.category !== 'custom' : stryMutAct_9fa48("419") ? false : stryMutAct_9fa48("418") ? true : (stryCov_9fa48("418", "419", "420"), c.category === (stryMutAct_9fa48("421") ? "" : (stryCov_9fa48("421"), 'custom'))))));

        // Initialize article blocks if not present
        if (stryMutAct_9fa48("424") ? false : stryMutAct_9fa48("423") ? true : stryMutAct_9fa48("422") ? article.attributes.blocks : (stryCov_9fa48("422", "423", "424"), !article.attributes.blocks)) {
          if (stryMutAct_9fa48("425")) {
            {}
          } else {
            stryCov_9fa48("425");
            article.attributes.blocks = stryMutAct_9fa48("426") ? [] : (stryCov_9fa48("426"), [stryMutAct_9fa48("427") ? {} : (stryCov_9fa48("427"), {
              type: stryMutAct_9fa48("428") ? "" : (stryCov_9fa48("428"), 'text'),
              text: stryMutAct_9fa48("429") ? "Stryker was here!" : (stryCov_9fa48("429"), '')
            })]);
          }
        }
        return stryMutAct_9fa48("430") ? {} : (stryCov_9fa48("430"), {
          article,
          customComponents,
          allComponents
        });
      }
    } catch (err) {
      if (stryMutAct_9fa48("431")) {
        {}
      } else {
        stryCov_9fa48("431");
        console.error(stryMutAct_9fa48("432") ? "" : (stryCov_9fa48("432"), 'Error loading editorial page:'), err);
        return stryMutAct_9fa48("433") ? {} : (stryCov_9fa48("433"), {
          status: 500,
          error: new Error(stryMutAct_9fa48("434") ? "" : (stryCov_9fa48("434"), 'Failed to load page'))
        });
      }
    }
  }
}