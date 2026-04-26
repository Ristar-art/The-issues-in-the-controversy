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
import { json, error } from '@sveltejs/kit';
import { adminDb } from '$lib/firebase/admin';
const pagesRef = adminDb.collection(stryMutAct_9fa48("501") ? "" : (stryCov_9fa48("501"), 'pages'));
export async function GET() {
  if (stryMutAct_9fa48("502")) {
    {}
  } else {
    stryCov_9fa48("502");
    try {
      if (stryMutAct_9fa48("503")) {
        {}
      } else {
        stryCov_9fa48("503");
        const snapshot = await pagesRef.get();
        const pages = snapshot.docs.map(stryMutAct_9fa48("504") ? () => undefined : (stryCov_9fa48("504"), doc => stryMutAct_9fa48("505") ? {} : (stryCov_9fa48("505"), {
          id: doc.id,
          ...doc.data()
        })));
        return json(pages);
      }
    } catch (err) {
      if (stryMutAct_9fa48("506")) {
        {}
      } else {
        stryCov_9fa48("506");
        console.error(stryMutAct_9fa48("507") ? "" : (stryCov_9fa48("507"), 'Failed to read pages:'), err);
        throw error(500, stryMutAct_9fa48("508") ? "" : (stryCov_9fa48("508"), 'Internal server error'));
      }
    }
  }
}
export async function POST({
  request
}) {
  if (stryMutAct_9fa48("509")) {
    {}
  } else {
    stryCov_9fa48("509");
    try {
      if (stryMutAct_9fa48("510")) {
        {}
      } else {
        stryCov_9fa48("510");
        const body = await request.json();
        if (stryMutAct_9fa48("513") ? !body.title && !body.slug : stryMutAct_9fa48("512") ? false : stryMutAct_9fa48("511") ? true : (stryCov_9fa48("511", "512", "513"), (stryMutAct_9fa48("514") ? body.title : (stryCov_9fa48("514"), !body.title)) || (stryMutAct_9fa48("515") ? body.slug : (stryCov_9fa48("515"), !body.slug)))) {
          if (stryMutAct_9fa48("516")) {
            {}
          } else {
            stryCov_9fa48("516");
            throw error(400, stryMutAct_9fa48("517") ? "" : (stryCov_9fa48("517"), 'Title and slug are required'));
          }
        }
        const newPage = stryMutAct_9fa48("518") ? {} : (stryCov_9fa48("518"), {
          attributes: stryMutAct_9fa48("519") ? {} : (stryCov_9fa48("519"), {
            title: body.title,
            slug: body.slug,
            content: stryMutAct_9fa48("520") ? body.content && '' : (stryCov_9fa48("520"), body.content ?? (stryMutAct_9fa48("521") ? "Stryker was here!" : (stryCov_9fa48("521"), ''))),
            componentIds: stryMutAct_9fa48("524") ? body.componentIds && [] : stryMutAct_9fa48("523") ? false : stryMutAct_9fa48("522") ? true : (stryCov_9fa48("522", "523", "524"), body.componentIds || (stryMutAct_9fa48("525") ? ["Stryker was here"] : (stryCov_9fa48("525"), []))),
            blocks: stryMutAct_9fa48("528") ? body.blocks && [{
              type: 'text',
              text: ''
            }] : stryMutAct_9fa48("527") ? false : stryMutAct_9fa48("526") ? true : (stryCov_9fa48("526", "527", "528"), body.blocks || (stryMutAct_9fa48("529") ? [] : (stryCov_9fa48("529"), [stryMutAct_9fa48("530") ? {} : (stryCov_9fa48("530"), {
              type: stryMutAct_9fa48("531") ? "" : (stryCov_9fa48("531"), 'text'),
              text: stryMutAct_9fa48("532") ? "Stryker was here!" : (stryCov_9fa48("532"), '')
            })]))),
            published: stryMutAct_9fa48("533") ? true : (stryCov_9fa48("533"), false),
            featuredImage: stryMutAct_9fa48("536") ? body.featuredImage && null : stryMutAct_9fa48("535") ? false : stryMutAct_9fa48("534") ? true : (stryCov_9fa48("534", "535", "536"), body.featuredImage || null)
          })
        });
        const docRef = await pagesRef.add(newPage);
        return json(stryMutAct_9fa48("537") ? {} : (stryCov_9fa48("537"), {
          id: docRef.id,
          ...newPage
        }));
      }
    } catch (err) {
      if (stryMutAct_9fa48("538")) {
        {}
      } else {
        stryCov_9fa48("538");
        if (stryMutAct_9fa48("540") ? false : stryMutAct_9fa48("539") ? true : (stryCov_9fa48("539", "540"), err.status)) throw err;
        console.error(stryMutAct_9fa48("541") ? "" : (stryCov_9fa48("541"), 'Failed to create page:'), err);
        throw error(500, stryMutAct_9fa48("542") ? "" : (stryCov_9fa48("542"), 'Internal server error'));
      }
    }
  }
}
export async function PUT({
  request
}) {
  if (stryMutAct_9fa48("543")) {
    {}
  } else {
    stryCov_9fa48("543");
    try {
      if (stryMutAct_9fa48("544")) {
        {}
      } else {
        stryCov_9fa48("544");
        const body = await request.json();
        const {
          id,
          ...updates
        } = body;
        if (stryMutAct_9fa48("547") ? false : stryMutAct_9fa48("546") ? true : stryMutAct_9fa48("545") ? id : (stryCov_9fa48("545", "546", "547"), !id)) {
          if (stryMutAct_9fa48("548")) {
            {}
          } else {
            stryCov_9fa48("548");
            throw error(400, stryMutAct_9fa48("549") ? "" : (stryCov_9fa48("549"), 'Invalid request body'));
          }
        }
        const docRef = pagesRef.doc(String(id));
        const doc = await docRef.get();
        if (stryMutAct_9fa48("552") ? false : stryMutAct_9fa48("551") ? true : stryMutAct_9fa48("550") ? doc.exists : (stryCov_9fa48("550", "551", "552"), !doc.exists)) {
          if (stryMutAct_9fa48("553")) {
            {}
          } else {
            stryCov_9fa48("553");
            throw error(404, stryMutAct_9fa48("554") ? "" : (stryCov_9fa48("554"), 'Article not found'));
          }
        }
        const currentData = doc.data();
        const allowedFields = stryMutAct_9fa48("555") ? [] : (stryCov_9fa48("555"), [stryMutAct_9fa48("556") ? "" : (stryCov_9fa48("556"), 'title'), stryMutAct_9fa48("557") ? "" : (stryCov_9fa48("557"), 'slug'), stryMutAct_9fa48("558") ? "" : (stryCov_9fa48("558"), 'content'), stryMutAct_9fa48("559") ? "" : (stryCov_9fa48("559"), 'componentIds'), stryMutAct_9fa48("560") ? "" : (stryCov_9fa48("560"), 'published'), stryMutAct_9fa48("561") ? "" : (stryCov_9fa48("561"), 'blocks'), stryMutAct_9fa48("562") ? "" : (stryCov_9fa48("562"), 'featuredImage')]);
        const attributeUpdates = {};
        for (const field of allowedFields) {
          if (stryMutAct_9fa48("563")) {
            {}
          } else {
            stryCov_9fa48("563");
            if (stryMutAct_9fa48("565") ? false : stryMutAct_9fa48("564") ? true : (stryCov_9fa48("564", "565"), Object.prototype.hasOwnProperty.call(updates, field))) {
              if (stryMutAct_9fa48("566")) {
                {}
              } else {
                stryCov_9fa48("566");
                // featuredImage: null is how the client signals "remove from article
                // (but keep the asset in the gallery)". Persist null directly so the
                // field definitely overwrites whatever was there before.
                attributeUpdates[stryMutAct_9fa48("567") ? `` : (stryCov_9fa48("567"), `attributes.${field}`)] = (stryMutAct_9fa48("570") ? field === 'featuredImage' || !updates[field] : stryMutAct_9fa48("569") ? false : stryMutAct_9fa48("568") ? true : (stryCov_9fa48("568", "569", "570"), (stryMutAct_9fa48("572") ? field !== 'featuredImage' : stryMutAct_9fa48("571") ? true : (stryCov_9fa48("571", "572"), field === (stryMutAct_9fa48("573") ? "" : (stryCov_9fa48("573"), 'featuredImage')))) && (stryMutAct_9fa48("574") ? updates[field] : (stryCov_9fa48("574"), !updates[field])))) ? null : updates[field];
              }
            }
          }
        }
        await docRef.update(attributeUpdates);
        const updated = await docRef.get();
        return json(stryMutAct_9fa48("575") ? {} : (stryCov_9fa48("575"), {
          id: updated.id,
          ...updated.data()
        }));
      }
    } catch (err) {
      if (stryMutAct_9fa48("576")) {
        {}
      } else {
        stryCov_9fa48("576");
        if (stryMutAct_9fa48("578") ? false : stryMutAct_9fa48("577") ? true : (stryCov_9fa48("577", "578"), err.status)) throw err;
        console.error(stryMutAct_9fa48("579") ? "" : (stryCov_9fa48("579"), 'Failed to update page:'), err);
        throw error(500, stryMutAct_9fa48("580") ? "" : (stryCov_9fa48("580"), 'Internal server error'));
      }
    }
  }
}
export async function DELETE({
  url
}) {
  if (stryMutAct_9fa48("581")) {
    {}
  } else {
    stryCov_9fa48("581");
    try {
      if (stryMutAct_9fa48("582")) {
        {}
      } else {
        stryCov_9fa48("582");
        const id = url.searchParams.get(stryMutAct_9fa48("583") ? "" : (stryCov_9fa48("583"), 'id'));
        if (stryMutAct_9fa48("586") ? false : stryMutAct_9fa48("585") ? true : stryMutAct_9fa48("584") ? id : (stryCov_9fa48("584", "585", "586"), !id)) {
          if (stryMutAct_9fa48("587")) {
            {}
          } else {
            stryCov_9fa48("587");
            throw error(400, stryMutAct_9fa48("588") ? "" : (stryCov_9fa48("588"), 'Article ID required'));
          }
        }
        const docRef = pagesRef.doc(String(id));
        const doc = await docRef.get();
        if (stryMutAct_9fa48("591") ? false : stryMutAct_9fa48("590") ? true : stryMutAct_9fa48("589") ? doc.exists : (stryCov_9fa48("589", "590", "591"), !doc.exists)) {
          if (stryMutAct_9fa48("592")) {
            {}
          } else {
            stryCov_9fa48("592");
            throw error(404, stryMutAct_9fa48("593") ? "" : (stryCov_9fa48("593"), 'Article not found'));
          }
        }
        await docRef.delete();
        return json(stryMutAct_9fa48("594") ? {} : (stryCov_9fa48("594"), {
          success: stryMutAct_9fa48("595") ? false : (stryCov_9fa48("595"), true)
        }));
      }
    } catch (err) {
      if (stryMutAct_9fa48("596")) {
        {}
      } else {
        stryCov_9fa48("596");
        if (stryMutAct_9fa48("598") ? false : stryMutAct_9fa48("597") ? true : (stryCov_9fa48("597", "598"), err.status)) throw err;
        console.error(stryMutAct_9fa48("599") ? "" : (stryCov_9fa48("599"), 'Failed to delete page:'), err);
        throw error(500, stryMutAct_9fa48("600") ? "" : (stryCov_9fa48("600"), 'Internal server error'));
      }
    }
  }
}