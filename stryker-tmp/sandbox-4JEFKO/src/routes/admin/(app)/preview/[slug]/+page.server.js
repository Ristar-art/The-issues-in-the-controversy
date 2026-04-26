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
import { error } from '@sveltejs/kit';
import { adminDb } from '$lib/firebase/admin';
import { blocksToHtml } from '$lib/utils/blocks-to-html';
export async function load({
  params
}) {
  if (stryMutAct_9fa48("435")) {
    {}
  } else {
    stryCov_9fa48("435");
    // Find page by slug (preview shows unpublished too)
    const pagesSnapshot = await adminDb.collection(stryMutAct_9fa48("436") ? "" : (stryCov_9fa48("436"), 'pages')).where(stryMutAct_9fa48("437") ? "" : (stryCov_9fa48("437"), 'attributes.slug'), stryMutAct_9fa48("438") ? "" : (stryCov_9fa48("438"), '=='), params.slug).limit(1).get();
    if (stryMutAct_9fa48("440") ? false : stryMutAct_9fa48("439") ? true : (stryCov_9fa48("439", "440"), pagesSnapshot.empty)) {
      if (stryMutAct_9fa48("441")) {
        {}
      } else {
        stryCov_9fa48("441");
        throw error(404, stryMutAct_9fa48("442") ? "" : (stryCov_9fa48("442"), 'Article not found'));
      }
    }
    const pageDoc = pagesSnapshot.docs[0];
    const page = stryMutAct_9fa48("443") ? {} : (stryCov_9fa48("443"), {
      id: pageDoc.id,
      ...pageDoc.data()
    });
    let content = page.attributes.content;

    // Load components if needed
    let components = stryMutAct_9fa48("444") ? ["Stryker was here"] : (stryCov_9fa48("444"), []);
    const needsComponents = stryMutAct_9fa48("447") ? !content && page.attributes.blocks && page.attributes.blocks.length > 0 && page.attributes.componentIds && page.attributes.componentIds.length > 0 : stryMutAct_9fa48("446") ? false : stryMutAct_9fa48("445") ? true : (stryCov_9fa48("445", "446", "447"), (stryMutAct_9fa48("449") ? !content && page.attributes.blocks || page.attributes.blocks.length > 0 : stryMutAct_9fa48("448") ? false : (stryCov_9fa48("448", "449"), (stryMutAct_9fa48("451") ? !content || page.attributes.blocks : stryMutAct_9fa48("450") ? true : (stryCov_9fa48("450", "451"), (stryMutAct_9fa48("452") ? content : (stryCov_9fa48("452"), !content)) && page.attributes.blocks)) && (stryMutAct_9fa48("455") ? page.attributes.blocks.length <= 0 : stryMutAct_9fa48("454") ? page.attributes.blocks.length >= 0 : stryMutAct_9fa48("453") ? true : (stryCov_9fa48("453", "454", "455"), page.attributes.blocks.length > 0)))) || (stryMutAct_9fa48("457") ? page.attributes.componentIds || page.attributes.componentIds.length > 0 : stryMutAct_9fa48("456") ? false : (stryCov_9fa48("456", "457"), page.attributes.componentIds && (stryMutAct_9fa48("460") ? page.attributes.componentIds.length <= 0 : stryMutAct_9fa48("459") ? page.attributes.componentIds.length >= 0 : stryMutAct_9fa48("458") ? true : (stryCov_9fa48("458", "459", "460"), page.attributes.componentIds.length > 0)))));
    if (stryMutAct_9fa48("462") ? false : stryMutAct_9fa48("461") ? true : (stryCov_9fa48("461", "462"), needsComponents)) {
      if (stryMutAct_9fa48("463")) {
        {}
      } else {
        stryCov_9fa48("463");
        const componentsSnapshot = await adminDb.collection(stryMutAct_9fa48("464") ? "" : (stryCov_9fa48("464"), 'components')).get();
        components = componentsSnapshot.docs.map(stryMutAct_9fa48("465") ? () => undefined : (stryCov_9fa48("465"), doc => stryMutAct_9fa48("466") ? {} : (stryCov_9fa48("466"), {
          id: doc.id,
          ...doc.data()
        })));
      }
    }

    // If content is empty, build it from blocks
    if (stryMutAct_9fa48("469") ? !content && page.attributes.blocks || page.attributes.blocks.length > 0 : stryMutAct_9fa48("468") ? false : stryMutAct_9fa48("467") ? true : (stryCov_9fa48("467", "468", "469"), (stryMutAct_9fa48("471") ? !content || page.attributes.blocks : stryMutAct_9fa48("470") ? true : (stryCov_9fa48("470", "471"), (stryMutAct_9fa48("472") ? content : (stryCov_9fa48("472"), !content)) && page.attributes.blocks)) && (stryMutAct_9fa48("475") ? page.attributes.blocks.length <= 0 : stryMutAct_9fa48("474") ? page.attributes.blocks.length >= 0 : stryMutAct_9fa48("473") ? true : (stryCov_9fa48("473", "474", "475"), page.attributes.blocks.length > 0)))) {
      if (stryMutAct_9fa48("476")) {
        {}
      } else {
        stryCov_9fa48("476");
        content = blocksToHtml(page.attributes.blocks, components);
      }
    }

    // If componentIds exist, assemble content from components instead
    if (stryMutAct_9fa48("479") ? page.attributes.componentIds || page.attributes.componentIds.length > 0 : stryMutAct_9fa48("478") ? false : stryMutAct_9fa48("477") ? true : (stryCov_9fa48("477", "478", "479"), page.attributes.componentIds && (stryMutAct_9fa48("482") ? page.attributes.componentIds.length <= 0 : stryMutAct_9fa48("481") ? page.attributes.componentIds.length >= 0 : stryMutAct_9fa48("480") ? true : (stryCov_9fa48("480", "481", "482"), page.attributes.componentIds.length > 0)))) {
      if (stryMutAct_9fa48("483")) {
        {}
      } else {
        stryCov_9fa48("483");
        const pageComponents = stryMutAct_9fa48("484") ? page.attributes.componentIds.map(id => components.find(c => c.id === id)) : (stryCov_9fa48("484"), page.attributes.componentIds.map(stryMutAct_9fa48("485") ? () => undefined : (stryCov_9fa48("485"), id => components.find(stryMutAct_9fa48("486") ? () => undefined : (stryCov_9fa48("486"), c => stryMutAct_9fa48("489") ? c.id !== id : stryMutAct_9fa48("488") ? false : stryMutAct_9fa48("487") ? true : (stryCov_9fa48("487", "488", "489"), c.id === id))))).filter(Boolean));
        content = pageComponents.map(stryMutAct_9fa48("490") ? () => undefined : (stryCov_9fa48("490"), c => c.html)).join(stryMutAct_9fa48("491") ? "Stryker was here!" : (stryCov_9fa48("491"), ''));
      }
    }
    return stryMutAct_9fa48("492") ? {} : (stryCov_9fa48("492"), {
      article: stryMutAct_9fa48("493") ? {} : (stryCov_9fa48("493"), {
        id: page.id,
        ...page.attributes,
        content
      })
    });
  }
}