import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { getStorage } from 'firebase-admin/storage';
import { dev } from '$app/environment';
import { FIREBASE_ADMIN_SERVICE_KEY } from '$env/static/private';

const serviceAccount = JSON.parse(FIREBASE_ADMIN_SERVICE_KEY);
const storageBucketName = `${serviceAccount.project_id}.firebasestorage.app`;

function createAdminApp() {
	if (getApps().length) return getApps()[0];

	if (dev) {
		process.env['FIRESTORE_EMULATOR_HOST'] = 'localhost:8080';
		process.env['FIREBASE_AUTH_EMULATOR_HOST'] = 'localhost:9099';
		process.env['FIREBASE_STORAGE_EMULATOR_HOST'] = 'localhost:9199';
	}

	return initializeApp({
		credential: cert(serviceAccount),
		projectId: serviceAccount.project_id,
		storageBucket: storageBucketName
	});
}

const adminApp = createAdminApp();

export const adminDb = getFirestore(adminApp);
export const adminAuth = getAuth(adminApp);
export const adminStorage = getStorage(adminApp);

export function getMediaBucket() {
	return adminStorage.bucket(storageBucketName);
}

export default adminApp;
