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
const componentsRef = adminDb.collection(stryMutAct_9fa48("601") ? "" : (stryCov_9fa48("601"), 'components'));
export async function GET() {
  if (stryMutAct_9fa48("602")) {
    {}
  } else {
    stryCov_9fa48("602");
    try {
      if (stryMutAct_9fa48("603")) {
        {}
      } else {
        stryCov_9fa48("603");
        const snapshot = await componentsRef.get();
        const components = snapshot.docs.map(stryMutAct_9fa48("604") ? () => undefined : (stryCov_9fa48("604"), doc => stryMutAct_9fa48("605") ? {} : (stryCov_9fa48("605"), {
          id: doc.id,
          ...doc.data()
        })));
        return json(components);
      }
    } catch (err) {
      if (stryMutAct_9fa48("606")) {
        {}
      } else {
        stryCov_9fa48("606");
        console.error(stryMutAct_9fa48("607") ? "" : (stryCov_9fa48("607"), 'Failed to read components:'), err);
        return json(stryMutAct_9fa48("608") ? {} : (stryCov_9fa48("608"), {
          error: stryMutAct_9fa48("609") ? "" : (stryCov_9fa48("609"), 'Failed to read components')
        }), stryMutAct_9fa48("610") ? {} : (stryCov_9fa48("610"), {
          status: 500
        }));
      }
    }
  }
}
export async function POST({
  request
}) {
  if (stryMutAct_9fa48("611")) {
    {}
  } else {
    stryCov_9fa48("611");
    try {
      if (stryMutAct_9fa48("612")) {
        {}
      } else {
        stryCov_9fa48("612");
        const body = await request.json();

        // Handle single component upsert
        if (stryMutAct_9fa48("615") ? body && typeof body === 'object' && !Array.isArray(body) || body.id : stryMutAct_9fa48("614") ? false : stryMutAct_9fa48("613") ? true : (stryCov_9fa48("613", "614", "615"), (stryMutAct_9fa48("617") ? body && typeof body === 'object' || !Array.isArray(body) : stryMutAct_9fa48("616") ? true : (stryCov_9fa48("616", "617"), (stryMutAct_9fa48("619") ? body || typeof body === 'object' : stryMutAct_9fa48("618") ? true : (stryCov_9fa48("618", "619"), body && (stryMutAct_9fa48("621") ? typeof body !== 'object' : stryMutAct_9fa48("620") ? true : (stryCov_9fa48("620", "621"), typeof body === (stryMutAct_9fa48("622") ? "" : (stryCov_9fa48("622"), 'object')))))) && (stryMutAct_9fa48("623") ? Array.isArray(body) : (stryCov_9fa48("623"), !Array.isArray(body))))) && body.id)) {
          if (stryMutAct_9fa48("624")) {
            {}
          } else {
            stryCov_9fa48("624");
            const docRef = componentsRef.doc(String(body.id));
            const {
              id,
              ...data
            } = body;
            await docRef.set(data, stryMutAct_9fa48("625") ? {} : (stryCov_9fa48("625"), {
              merge: stryMutAct_9fa48("626") ? false : (stryCov_9fa48("626"), true)
            }));
            return json(stryMutAct_9fa48("627") ? {} : (stryCov_9fa48("627"), {
              ok: stryMutAct_9fa48("628") ? false : (stryCov_9fa48("628"), true)
            }));
          }
        }

        // Handle full array update (legacy support)
        if (stryMutAct_9fa48("630") ? false : stryMutAct_9fa48("629") ? true : (stryCov_9fa48("629", "630"), Array.isArray(body))) {
          if (stryMutAct_9fa48("631")) {
            {}
          } else {
            stryCov_9fa48("631");
            const batch = adminDb.batch();
            // Delete all existing
            const existing = await componentsRef.get();
            existing.docs.forEach(stryMutAct_9fa48("632") ? () => undefined : (stryCov_9fa48("632"), doc => batch.delete(doc.ref)));
            // Write new ones
            for (const component of body) {
              if (stryMutAct_9fa48("633")) {
                {}
              } else {
                stryCov_9fa48("633");
                const {
                  id,
                  ...data
                } = component;
                const docRef = componentsRef.doc(String(stryMutAct_9fa48("636") ? id && componentsRef.doc().id : stryMutAct_9fa48("635") ? false : stryMutAct_9fa48("634") ? true : (stryCov_9fa48("634", "635", "636"), id || componentsRef.doc().id)));
                batch.set(docRef, data);
              }
            }
            await batch.commit();
            return json(stryMutAct_9fa48("637") ? {} : (stryCov_9fa48("637"), {
              ok: stryMutAct_9fa48("638") ? false : (stryCov_9fa48("638"), true)
            }));
          }
        }
        return json(stryMutAct_9fa48("639") ? {} : (stryCov_9fa48("639"), {
          error: stryMutAct_9fa48("640") ? "" : (stryCov_9fa48("640"), 'Invalid request body')
        }), stryMutAct_9fa48("641") ? {} : (stryCov_9fa48("641"), {
          status: 400
        }));
      }
    } catch (err) {
      if (stryMutAct_9fa48("642")) {
        {}
      } else {
        stryCov_9fa48("642");
        console.error(stryMutAct_9fa48("643") ? "" : (stryCov_9fa48("643"), 'Failed to write component:'), err);
        return json(stryMutAct_9fa48("644") ? {} : (stryCov_9fa48("644"), {
          error: stryMutAct_9fa48("645") ? "" : (stryCov_9fa48("645"), 'Failed to write component')
        }), stryMutAct_9fa48("646") ? {} : (stryCov_9fa48("646"), {
          status: 500
        }));
      }
    }
  }
}
export async function DELETE({
  request
}) {
  if (stryMutAct_9fa48("647")) {
    {}
  } else {
    stryCov_9fa48("647");
    try {
      if (stryMutAct_9fa48("648")) {
        {}
      } else {
        stryCov_9fa48("648");
        const body = await request.json();
        if (stryMutAct_9fa48("651") ? !body && !body.id : stryMutAct_9fa48("650") ? false : stryMutAct_9fa48("649") ? true : (stryCov_9fa48("649", "650", "651"), (stryMutAct_9fa48("652") ? body : (stryCov_9fa48("652"), !body)) || (stryMutAct_9fa48("653") ? body.id : (stryCov_9fa48("653"), !body.id)))) {
          if (stryMutAct_9fa48("654")) {
            {}
          } else {
            stryCov_9fa48("654");
            return json(stryMutAct_9fa48("655") ? {} : (stryCov_9fa48("655"), {
              error: stryMutAct_9fa48("656") ? "" : (stryCov_9fa48("656"), 'Component ID is required')
            }), stryMutAct_9fa48("657") ? {} : (stryCov_9fa48("657"), {
              status: 400
            }));
          }
        }
        const docRef = componentsRef.doc(String(body.id));
        const doc = await docRef.get();
        if (stryMutAct_9fa48("660") ? false : stryMutAct_9fa48("659") ? true : stryMutAct_9fa48("658") ? doc.exists : (stryCov_9fa48("658", "659", "660"), !doc.exists)) {
          if (stryMutAct_9fa48("661")) {
            {}
          } else {
            stryCov_9fa48("661");
            return json(stryMutAct_9fa48("662") ? {} : (stryCov_9fa48("662"), {
              error: stryMutAct_9fa48("663") ? "" : (stryCov_9fa48("663"), 'Component not found')
            }), stryMutAct_9fa48("664") ? {} : (stryCov_9fa48("664"), {
              status: 404
            }));
          }
        }
        await docRef.delete();
        return json(stryMutAct_9fa48("665") ? {} : (stryCov_9fa48("665"), {
          ok: stryMutAct_9fa48("666") ? false : (stryCov_9fa48("666"), true)
        }));
      }
    } catch (err) {
      if (stryMutAct_9fa48("667")) {
        {}
      } else {
        stryCov_9fa48("667");
        console.error(stryMutAct_9fa48("668") ? "" : (stryCov_9fa48("668"), 'Failed to delete component:'), err);
        return json(stryMutAct_9fa48("669") ? {} : (stryCov_9fa48("669"), {
          error: stryMutAct_9fa48("670") ? "" : (stryCov_9fa48("670"), 'Failed to delete component')
        }), stryMutAct_9fa48("671") ? {} : (stryCov_9fa48("671"), {
          status: 500
        }));
      }
    }
  }
}