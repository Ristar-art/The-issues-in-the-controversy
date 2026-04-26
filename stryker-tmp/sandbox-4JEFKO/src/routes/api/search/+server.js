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
function getComponentContent(component) {
  if (stryMutAct_9fa48("863")) {
    {}
  } else {
    stryCov_9fa48("863");
    if (stryMutAct_9fa48("866") ? component.section || component.section.blocks : stryMutAct_9fa48("865") ? false : stryMutAct_9fa48("864") ? true : (stryCov_9fa48("864", "865", "866"), component.section && component.section.blocks)) {
      if (stryMutAct_9fa48("867")) {
        {}
      } else {
        stryCov_9fa48("867");
        return stryMutAct_9fa48("868") ? component.section.blocks.map(block => block.text).join(' ') : (stryCov_9fa48("868"), component.section.blocks.filter(stryMutAct_9fa48("869") ? () => undefined : (stryCov_9fa48("869"), block => block.text)).map(stryMutAct_9fa48("870") ? () => undefined : (stryCov_9fa48("870"), block => block.text)).join(stryMutAct_9fa48("871") ? "" : (stryCov_9fa48("871"), ' ')));
      }
    }
    return stryMutAct_9fa48("872") ? "Stryker was here!" : (stryCov_9fa48("872"), '');
  }
}
export async function GET({
  url
}) {
  if (stryMutAct_9fa48("873")) {
    {}
  } else {
    stryCov_9fa48("873");
    const query = url.searchParams.get(stryMutAct_9fa48("874") ? "" : (stryCov_9fa48("874"), 'q'));
    if (stryMutAct_9fa48("877") ? false : stryMutAct_9fa48("876") ? true : stryMutAct_9fa48("875") ? query : (stryCov_9fa48("875", "876", "877"), !query)) {
      if (stryMutAct_9fa48("878")) {
        {}
      } else {
        stryCov_9fa48("878");
        return json(stryMutAct_9fa48("879") ? {} : (stryCov_9fa48("879"), {
          error: stryMutAct_9fa48("880") ? "" : (stryCov_9fa48("880"), 'Search query is required')
        }), stryMutAct_9fa48("881") ? {} : (stryCov_9fa48("881"), {
          status: 400
        }));
      }
    }
    const searchTerm = stryMutAct_9fa48("882") ? query.toUpperCase() : (stryCov_9fa48("882"), query.toLowerCase());
    try {
      if (stryMutAct_9fa48("883")) {
        {}
      } else {
        stryCov_9fa48("883");
        // Fetch all published pages
        const pagesSnapshot = await adminDb.collection(stryMutAct_9fa48("884") ? "" : (stryCov_9fa48("884"), 'pages')).get();
        const pages = pagesSnapshot.docs.map(stryMutAct_9fa48("885") ? () => undefined : (stryCov_9fa48("885"), doc => stryMutAct_9fa48("886") ? {} : (stryCov_9fa48("886"), {
          id: doc.id,
          ...doc.data()
        })));

        // Fetch all components for content matching
        const componentsSnapshot = await adminDb.collection(stryMutAct_9fa48("887") ? "" : (stryCov_9fa48("887"), 'components')).get();
        const components = componentsSnapshot.docs.map(stryMutAct_9fa48("888") ? () => undefined : (stryCov_9fa48("888"), doc => stryMutAct_9fa48("889") ? {} : (stryCov_9fa48("889"), {
          id: doc.id,
          ...doc.data()
        })));
        const results = stryMutAct_9fa48("890") ? pages.map(page => {
          const componentText = (page.attributes.componentIds || []).map(id => components.find(c => c.id === id)).filter(Boolean).map(c => getComponentContent(c)).join(' ');
          const fullContent = (page.attributes.content || '') + ' ' + componentText;
          return {
            id: page.id,
            type: 'page',
            attributes: {
              title: page.attributes.title,
              slug: page.attributes.slug,
              content: fullContent.substring(0, 200) + (fullContent.length > 200 ? '...' : ''),
              publishedAt: page.attributes.published ? new Date().toISOString() : null
            }
          };
        }) : (stryCov_9fa48("890"), pages.filter(page => {
          if (stryMutAct_9fa48("891")) {
            {}
          } else {
            stryCov_9fa48("891");
            if (stryMutAct_9fa48("894") ? false : stryMutAct_9fa48("893") ? true : stryMutAct_9fa48("892") ? page.attributes.published : (stryCov_9fa48("892", "893", "894"), !page.attributes.published)) return stryMutAct_9fa48("895") ? true : (stryCov_9fa48("895"), false);
            const titleMatch = stryMutAct_9fa48("896") ? (page.attributes.title || '').toUpperCase().includes(searchTerm) : (stryCov_9fa48("896"), (stryMutAct_9fa48("899") ? page.attributes.title && '' : stryMutAct_9fa48("898") ? false : stryMutAct_9fa48("897") ? true : (stryCov_9fa48("897", "898", "899"), page.attributes.title || (stryMutAct_9fa48("900") ? "Stryker was here!" : (stryCov_9fa48("900"), '')))).toLowerCase().includes(searchTerm));
            const contentMatch = stryMutAct_9fa48("901") ? (page.attributes.content || '').toUpperCase().includes(searchTerm) : (stryCov_9fa48("901"), (stryMutAct_9fa48("904") ? page.attributes.content && '' : stryMutAct_9fa48("903") ? false : stryMutAct_9fa48("902") ? true : (stryCov_9fa48("902", "903", "904"), page.attributes.content || (stryMutAct_9fa48("905") ? "Stryker was here!" : (stryCov_9fa48("905"), '')))).toLowerCase().includes(searchTerm));

            // Check component content
            let componentContentMatch = stryMutAct_9fa48("906") ? true : (stryCov_9fa48("906"), false);
            if (stryMutAct_9fa48("909") ? page.attributes.componentIds || page.attributes.componentIds.length > 0 : stryMutAct_9fa48("908") ? false : stryMutAct_9fa48("907") ? true : (stryCov_9fa48("907", "908", "909"), page.attributes.componentIds && (stryMutAct_9fa48("912") ? page.attributes.componentIds.length <= 0 : stryMutAct_9fa48("911") ? page.attributes.componentIds.length >= 0 : stryMutAct_9fa48("910") ? true : (stryCov_9fa48("910", "911", "912"), page.attributes.componentIds.length > 0)))) {
              if (stryMutAct_9fa48("913")) {
                {}
              } else {
                stryCov_9fa48("913");
                const pageComponents = stryMutAct_9fa48("914") ? components : (stryCov_9fa48("914"), components.filter(stryMutAct_9fa48("915") ? () => undefined : (stryCov_9fa48("915"), c => page.attributes.componentIds.includes(c.id))));
                const componentText = pageComponents.map(stryMutAct_9fa48("916") ? () => undefined : (stryCov_9fa48("916"), c => getComponentContent(c))).join(stryMutAct_9fa48("917") ? "" : (stryCov_9fa48("917"), ' '));
                componentContentMatch = stryMutAct_9fa48("918") ? componentText.toUpperCase().includes(searchTerm) : (stryCov_9fa48("918"), componentText.toLowerCase().includes(searchTerm));
              }
            }
            return stryMutAct_9fa48("921") ? (titleMatch || contentMatch) && componentContentMatch : stryMutAct_9fa48("920") ? false : stryMutAct_9fa48("919") ? true : (stryCov_9fa48("919", "920", "921"), (stryMutAct_9fa48("923") ? titleMatch && contentMatch : stryMutAct_9fa48("922") ? false : (stryCov_9fa48("922", "923"), titleMatch || contentMatch)) || componentContentMatch);
          }
        }).map(page => {
          if (stryMutAct_9fa48("924")) {
            {}
          } else {
            stryCov_9fa48("924");
            const componentText = stryMutAct_9fa48("925") ? (page.attributes.componentIds || []).map(id => components.find(c => c.id === id)).map(c => getComponentContent(c)).join(' ') : (stryCov_9fa48("925"), (stryMutAct_9fa48("928") ? page.attributes.componentIds && [] : stryMutAct_9fa48("927") ? false : stryMutAct_9fa48("926") ? true : (stryCov_9fa48("926", "927", "928"), page.attributes.componentIds || (stryMutAct_9fa48("929") ? ["Stryker was here"] : (stryCov_9fa48("929"), [])))).map(stryMutAct_9fa48("930") ? () => undefined : (stryCov_9fa48("930"), id => components.find(stryMutAct_9fa48("931") ? () => undefined : (stryCov_9fa48("931"), c => stryMutAct_9fa48("934") ? c.id !== id : stryMutAct_9fa48("933") ? false : stryMutAct_9fa48("932") ? true : (stryCov_9fa48("932", "933", "934"), c.id === id))))).filter(Boolean).map(stryMutAct_9fa48("935") ? () => undefined : (stryCov_9fa48("935"), c => getComponentContent(c))).join(stryMutAct_9fa48("936") ? "" : (stryCov_9fa48("936"), ' ')));
            const fullContent = (stryMutAct_9fa48("939") ? page.attributes.content && '' : stryMutAct_9fa48("938") ? false : stryMutAct_9fa48("937") ? true : (stryCov_9fa48("937", "938", "939"), page.attributes.content || (stryMutAct_9fa48("940") ? "Stryker was here!" : (stryCov_9fa48("940"), '')))) + (stryMutAct_9fa48("941") ? "" : (stryCov_9fa48("941"), ' ')) + componentText;
            return stryMutAct_9fa48("942") ? {} : (stryCov_9fa48("942"), {
              id: page.id,
              type: stryMutAct_9fa48("943") ? "" : (stryCov_9fa48("943"), 'page'),
              attributes: stryMutAct_9fa48("944") ? {} : (stryCov_9fa48("944"), {
                title: page.attributes.title,
                slug: page.attributes.slug,
                content: stryMutAct_9fa48("945") ? fullContent.substring(0, 200) - (fullContent.length > 200 ? '...' : '') : (stryCov_9fa48("945"), (stryMutAct_9fa48("946") ? fullContent : (stryCov_9fa48("946"), fullContent.substring(0, 200))) + ((stryMutAct_9fa48("950") ? fullContent.length <= 200 : stryMutAct_9fa48("949") ? fullContent.length >= 200 : stryMutAct_9fa48("948") ? false : stryMutAct_9fa48("947") ? true : (stryCov_9fa48("947", "948", "949", "950"), fullContent.length > 200)) ? stryMutAct_9fa48("951") ? "" : (stryCov_9fa48("951"), '...') : stryMutAct_9fa48("952") ? "Stryker was here!" : (stryCov_9fa48("952"), ''))),
                publishedAt: page.attributes.published ? new Date().toISOString() : null
              })
            });
          }
        }));
        return json(results);
      }
    } catch (err) {
      if (stryMutAct_9fa48("953")) {
        {}
      } else {
        stryCov_9fa48("953");
        console.error(stryMutAct_9fa48("954") ? "" : (stryCov_9fa48("954"), 'Error searching pages:'), err);
        return json(stryMutAct_9fa48("955") ? {} : (stryCov_9fa48("955"), {
          error: stryMutAct_9fa48("956") ? "" : (stryCov_9fa48("956"), 'Search failed')
        }), stryMutAct_9fa48("957") ? {} : (stryCov_9fa48("957"), {
          status: 500
        }));
      }
    }
  }
}