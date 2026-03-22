/**
 * Seed Firestore with existing local JSON data.
 *
 * Usage:
 *   node scripts/seed-firestore.js              # seeds production Firestore (needs FIREBASE_ADMIN_SERVICE_KEY env var)
 *   node scripts/seed-firestore.js --emulator   # seeds the local emulator
 */

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const useEmulator = process.argv.includes('--emulator');

// Load .env file manually since this runs outside SvelteKit
const envPath = resolve(__dirname, '..', '.env');
const envContent = readFileSync(envPath, 'utf8');
const match = envContent.match(/^FIREBASE_ADMIN_SERVICE_KEY=(.+)$/m);
if (!match) {
  console.error('❌ FIREBASE_ADMIN_SERVICE_KEY not found in .env');
  process.exit(1);
}
const serviceAccount = JSON.parse(match[1]);

if (useEmulator) {
  process.env['FIRESTORE_EMULATOR_HOST'] = 'localhost:8080';
  console.log(`🔧 Using Firestore emulator at localhost:8080 (project: ${serviceAccount.project_id})`);
  initializeApp({ credential: cert(serviceAccount), projectId: serviceAccount.project_id });
} else {
  initializeApp({ credential: cert(serviceAccount) });
  console.log(`🔥 Using production Firestore (project: ${serviceAccount.project_id})`);
}

const db = getFirestore();

function loadJson(relativePath) {
  const fullPath = resolve(__dirname, '..', relativePath);
  return JSON.parse(readFileSync(fullPath, 'utf8'));
}

async function seedLanding() {
  const landing = loadJson('src/lib/data/landing.json');
  await db.collection('landing').doc('config').set(landing);
  console.log('✅ Seeded landing/config');
}

async function seedPages() {
  const pages = loadJson('src/lib/data/pages.json');
  const batch = db.batch();

  for (const page of pages) {
    // Use the existing numeric id as the doc ID
    const docRef = db.collection('pages').doc(String(page.id));
    batch.set(docRef, { attributes: page.attributes });
  }

  await batch.commit();
  console.log(`✅ Seeded ${pages.length} pages`);
}

async function seedComponents() {
  const components = loadJson('src/lib/data/components.json');
  const batch = db.batch();

  for (const component of components) {
    const { id, ...data } = component;
    const docRef = db.collection('components').doc(String(id));
    batch.set(docRef, data);
  }

  await batch.commit();
  console.log(`✅ Seeded ${components.length} components`);
}

async function main() {
  try {
    await seedLanding();
    await seedPages();
    await seedComponents();
    console.log('\n🎉 Seeding complete!');
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
}

main();
