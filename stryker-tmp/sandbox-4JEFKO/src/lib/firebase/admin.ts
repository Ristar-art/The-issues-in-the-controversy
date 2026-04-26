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
import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { getStorage } from 'firebase-admin/storage';
// import { dev } from '$app/environment';
import { FIREBASE_ADMIN_SERVICE_KEY } from '$env/static/private';
const serviceAccount = JSON.parse(FIREBASE_ADMIN_SERVICE_KEY);
const storageBucketName = stryMutAct_9fa48("11") ? `` : (stryCov_9fa48("11"), `${serviceAccount.project_id}.firebasestorage.app`);
function createAdminApp() {
  if (stryMutAct_9fa48("12")) {
    {}
  } else {
    stryCov_9fa48("12");
    if (stryMutAct_9fa48("14") ? false : stryMutAct_9fa48("13") ? true : (stryCov_9fa48("13", "14"), getApps().length)) return getApps()[0];

    // if (dev) {
    // 	process.env['FIRESTORE_EMULATOR_HOST'] = 'localhost:8080';
    // 	process.env['FIREBASE_AUTH_EMULATOR_HOST'] = 'localhost:9099';
    // 	process.env['FIREBASE_STORAGE_EMULATOR_HOST'] = 'localhost:9199';
    // }

    return initializeApp(stryMutAct_9fa48("15") ? {} : (stryCov_9fa48("15"), {
      credential: cert(serviceAccount),
      projectId: serviceAccount.project_id,
      storageBucket: storageBucketName
    }));
  }
}
const adminApp = createAdminApp();
const firestore = getFirestore(adminApp);
try {
  if (stryMutAct_9fa48("16")) {
    {}
  } else {
    stryCov_9fa48("16");
    firestore.settings(stryMutAct_9fa48("17") ? {} : (stryCov_9fa48("17"), {
      ignoreUndefinedProperties: stryMutAct_9fa48("18") ? false : (stryCov_9fa48("18"), true)
    }));
  }
} catch {
  // settings() throws if already initialized (e.g. during HMR); safe to ignore
}
export const adminDb = firestore;
export const adminAuth = getAuth(adminApp);
export const adminStorage = getStorage(adminApp);
export function getMediaBucket() {
  if (stryMutAct_9fa48("19")) {
    {}
  } else {
    stryCov_9fa48("19");
    return adminStorage.bucket(storageBucketName);
  }
}
export default adminApp;