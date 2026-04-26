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
import { adminAuth } from '$lib/firebase/admin';
export async function POST({
  request,
  cookies
}) {
  if (stryMutAct_9fa48("958")) {
    {}
  } else {
    stryCov_9fa48("958");
    try {
      if (stryMutAct_9fa48("959")) {
        {}
      } else {
        stryCov_9fa48("959");
        const {
          idToken
        } = await request.json();
        if (stryMutAct_9fa48("962") ? false : stryMutAct_9fa48("961") ? true : stryMutAct_9fa48("960") ? idToken : (stryCov_9fa48("960", "961", "962"), !idToken)) {
          if (stryMutAct_9fa48("963")) {
            {}
          } else {
            stryCov_9fa48("963");
            return json(stryMutAct_9fa48("964") ? {} : (stryCov_9fa48("964"), {
              error: stryMutAct_9fa48("965") ? "" : (stryCov_9fa48("965"), 'ID token is required')
            }), stryMutAct_9fa48("966") ? {} : (stryCov_9fa48("966"), {
              status: 400
            }));
          }
        }

        // Verify the token is valid (works with both emulator and production)
        await adminAuth.verifyIdToken(idToken);
        cookies.set(stryMutAct_9fa48("967") ? "" : (stryCov_9fa48("967"), 'session'), idToken, stryMutAct_9fa48("968") ? {} : (stryCov_9fa48("968"), {
          path: stryMutAct_9fa48("969") ? "" : (stryCov_9fa48("969"), '/'),
          httpOnly: stryMutAct_9fa48("970") ? false : (stryCov_9fa48("970"), true),
          secure: stryMutAct_9fa48("971") ? false : (stryCov_9fa48("971"), true),
          sameSite: stryMutAct_9fa48("972") ? "" : (stryCov_9fa48("972"), 'lax'),
          maxAge: stryMutAct_9fa48("973") ? 60 * 60 * 24 / 5 : (stryCov_9fa48("973"), (stryMutAct_9fa48("974") ? 60 * 60 / 24 : (stryCov_9fa48("974"), (stryMutAct_9fa48("975") ? 60 / 60 : (stryCov_9fa48("975"), 60 * 60)) * 24)) * 5) // 5 days
        }));
        return json(stryMutAct_9fa48("976") ? {} : (stryCov_9fa48("976"), {
          success: stryMutAct_9fa48("977") ? false : (stryCov_9fa48("977"), true)
        }));
      }
    } catch (err) {
      if (stryMutAct_9fa48("978")) {
        {}
      } else {
        stryCov_9fa48("978");
        console.error(stryMutAct_9fa48("979") ? "" : (stryCov_9fa48("979"), 'Failed to create session:'), err);
        return json(stryMutAct_9fa48("980") ? {} : (stryCov_9fa48("980"), {
          error: stryMutAct_9fa48("981") ? "" : (stryCov_9fa48("981"), 'Invalid credentials')
        }), stryMutAct_9fa48("982") ? {} : (stryCov_9fa48("982"), {
          status: 401
        }));
      }
    }
  }
}
export async function DELETE({
  cookies
}) {
  if (stryMutAct_9fa48("983")) {
    {}
  } else {
    stryCov_9fa48("983");
    cookies.delete(stryMutAct_9fa48("984") ? "" : (stryCov_9fa48("984"), 'session'), stryMutAct_9fa48("985") ? {} : (stryCov_9fa48("985"), {
      path: stryMutAct_9fa48("986") ? "" : (stryCov_9fa48("986"), '/')
    }));
    return json(stryMutAct_9fa48("987") ? {} : (stryCov_9fa48("987"), {
      success: stryMutAct_9fa48("988") ? false : (stryCov_9fa48("988"), true)
    }));
  }
}