import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

let isInitialized = false;

if (!getApps().length) {
  try {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (!projectId || !clientEmail || !privateKey) {
      console.warn("Faltan variables de entorno de Firebase Admin. Las funciones del servidor fallarán.");
    } else {
      initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      });
      isInitialized = true;
    }
  } catch (error) {
    console.error('Error inicializando Firebase Admin', error);
  }
} else {
  isInitialized = true;
}

// Exportar de forma segura para no romper el build si faltan credenciales
// Exportar de forma segura para no romper el build si faltan credenciales
export const adminDb = (isInitialized ? getFirestore() : null) as unknown as ReturnType<typeof getFirestore>;
export const adminAuth = (isInitialized ? getAuth() : null) as unknown as ReturnType<typeof getAuth>;
