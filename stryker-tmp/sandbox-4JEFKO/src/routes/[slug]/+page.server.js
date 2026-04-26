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
  if (stryMutAct_9fa48("315")) {
    {}
  } else {
    stryCov_9fa48("315");
    // Find page by slug
    const pagesSnapshot = await adminDb.collection(stryMutAct_9fa48("316") ? "" : (stryCov_9fa48("316"), 'pages')).where(stryMutAct_9fa48("317") ? "" : (stryCov_9fa48("317"), 'attributes.slug'), stryMutAct_9fa48("318") ? "" : (stryCov_9fa48("318"), '=='), params.slug).limit(1).get();
    if (stryMutAct_9fa48("320") ? false : stryMutAct_9fa48("319") ? true : (stryCov_9fa48("319", "320"), pagesSnapshot.empty)) {
      if (stryMutAct_9fa48("321")) {
        {}
      } else {
        stryCov_9fa48("321");
        throw error(404, stryMutAct_9fa48("322") ? "" : (stryCov_9fa48("322"), 'Article not found'));
      }
    }
    const pageDoc = pagesSnapshot.docs[0];
    const page = stryMutAct_9fa48("323") ? {} : (stryCov_9fa48("323"), {
      id: pageDoc.id,
      ...pageDoc.data()
    });
    if (stryMutAct_9fa48("326") ? false : stryMutAct_9fa48("325") ? true : stryMutAct_9fa48("324") ? page.attributes.published : (stryCov_9fa48("324", "325", "326"), !page.attributes.published)) {
      if (stryMutAct_9fa48("327")) {
        {}
      } else {
        stryCov_9fa48("327");
        throw error(404, stryMutAct_9fa48("328") ? "" : (stryCov_9fa48("328"), 'Article not found'));
      }
    }
    let content = page.attributes.content;

    // Load components if needed
    let components = stryMutAct_9fa48("329") ? ["Stryker was here"] : (stryCov_9fa48("329"), []);
    const needsComponents = stryMutAct_9fa48("332") ? !content && page.attributes.blocks && page.attributes.blocks.length > 0 && page.attributes.componentIds && page.attributes.componentIds.length > 0 : stryMutAct_9fa48("331") ? false : stryMutAct_9fa48("330") ? true : (stryCov_9fa48("330", "331", "332"), (stryMutAct_9fa48("334") ? !content && page.attributes.blocks || page.attributes.blocks.length > 0 : stryMutAct_9fa48("333") ? false : (stryCov_9fa48("333", "334"), (stryMutAct_9fa48("336") ? !content || page.attributes.blocks : stryMutAct_9fa48("335") ? true : (stryCov_9fa48("335", "336"), (stryMutAct_9fa48("337") ? content : (stryCov_9fa48("337"), !content)) && page.attributes.blocks)) && (stryMutAct_9fa48("340") ? page.attributes.blocks.length <= 0 : stryMutAct_9fa48("339") ? page.attributes.blocks.length >= 0 : stryMutAct_9fa48("338") ? true : (stryCov_9fa48("338", "339", "340"), page.attributes.blocks.length > 0)))) || (stryMutAct_9fa48("342") ? page.attributes.componentIds || page.attributes.componentIds.length > 0 : stryMutAct_9fa48("341") ? false : (stryCov_9fa48("341", "342"), page.attributes.componentIds && (stryMutAct_9fa48("345") ? page.attributes.componentIds.length <= 0 : stryMutAct_9fa48("344") ? page.attributes.componentIds.length >= 0 : stryMutAct_9fa48("343") ? true : (stryCov_9fa48("343", "344", "345"), page.attributes.componentIds.length > 0)))));
    if (stryMutAct_9fa48("347") ? false : stryMutAct_9fa48("346") ? true : (stryCov_9fa48("346", "347"), needsComponents)) {
      if (stryMutAct_9fa48("348")) {
        {}
      } else {
        stryCov_9fa48("348");
        const componentsSnapshot = await adminDb.collection(stryMutAct_9fa48("349") ? "" : (stryCov_9fa48("349"), 'components')).get();
        components = componentsSnapshot.docs.map(stryMutAct_9fa48("350") ? () => undefined : (stryCov_9fa48("350"), doc => stryMutAct_9fa48("351") ? {} : (stryCov_9fa48("351"), {
          id: doc.id,
          ...doc.data()
        })));
      }
    }

    // If content is empty, build it from blocks
    if (stryMutAct_9fa48("354") ? !content && page.attributes.blocks || page.attributes.blocks.length > 0 : stryMutAct_9fa48("353") ? false : stryMutAct_9fa48("352") ? true : (stryCov_9fa48("352", "353", "354"), (stryMutAct_9fa48("356") ? !content || page.attributes.blocks : stryMutAct_9fa48("355") ? true : (stryCov_9fa48("355", "356"), (stryMutAct_9fa48("357") ? content : (stryCov_9fa48("357"), !content)) && page.attributes.blocks)) && (stryMutAct_9fa48("360") ? page.attributes.blocks.length <= 0 : stryMutAct_9fa48("359") ? page.attributes.blocks.length >= 0 : stryMutAct_9fa48("358") ? true : (stryCov_9fa48("358", "359", "360"), page.attributes.blocks.length > 0)))) {
      if (stryMutAct_9fa48("361")) {
        {}
      } else {
        stryCov_9fa48("361");
        content = blocksToHtml(page.attributes.blocks, components);
      }
    }

    // If componentIds exist, assemble content from components instead
    if (stryMutAct_9fa48("364") ? page.attributes.componentIds || page.attributes.componentIds.length > 0 : stryMutAct_9fa48("363") ? false : stryMutAct_9fa48("362") ? true : (stryCov_9fa48("362", "363", "364"), page.attributes.componentIds && (stryMutAct_9fa48("367") ? page.attributes.componentIds.length <= 0 : stryMutAct_9fa48("366") ? page.attributes.componentIds.length >= 0 : stryMutAct_9fa48("365") ? true : (stryCov_9fa48("365", "366", "367"), page.attributes.componentIds.length > 0)))) {
      if (stryMutAct_9fa48("368")) {
        {}
      } else {
        stryCov_9fa48("368");
        const pageComponents = stryMutAct_9fa48("369") ? page.attributes.componentIds.map(id => components.find(c => c.id === id)) : (stryCov_9fa48("369"), page.attributes.componentIds.map(stryMutAct_9fa48("370") ? () => undefined : (stryCov_9fa48("370"), id => components.find(stryMutAct_9fa48("371") ? () => undefined : (stryCov_9fa48("371"), c => stryMutAct_9fa48("374") ? c.id !== id : stryMutAct_9fa48("373") ? false : stryMutAct_9fa48("372") ? true : (stryCov_9fa48("372", "373", "374"), c.id === id))))).filter(Boolean));
        content = pageComponents.map(stryMutAct_9fa48("375") ? () => undefined : (stryCov_9fa48("375"), c => c.html)).join(stryMutAct_9fa48("376") ? "Stryker was here!" : (stryCov_9fa48("376"), ''));
      }
    }
    return stryMutAct_9fa48("377") ? {} : (stryCov_9fa48("377"), {
      article: stryMutAct_9fa48("378") ? {} : (stryCov_9fa48("378"), {
        id: page.id,
        ...page.attributes,
        content
      })
    });
  }
}