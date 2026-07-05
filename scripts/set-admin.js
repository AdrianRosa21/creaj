/* eslint-disable @typescript-eslint/no-require-imports */
const admin = require("firebase-admin");

const serviceAccountBase64 = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

if (!serviceAccountBase64) {
  console.error("Error: FIREBASE_SERVICE_ACCOUNT_KEY no está definido en el entorno.");
  console.error("Ejecuta: node --env-file=.env.local scripts/set-admin.js <email>");
  process.exit(1);
}

const serviceAccount = JSON.parse(Buffer.from(serviceAccountBase64, 'base64').toString('utf8'));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const email = process.argv[2];

if (!email) {
  console.error("Uso: node --env-file=.env.local scripts/set-admin.js <correo-del-usuario>");
  process.exit(1);
}

async function setAdmin() {
  try {
    const user = await admin.auth().getUserByEmail(email);
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });
    console.log(`✅ Claim 'admin: true' otorgado a ${email} (UID: ${user.uid})`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error al otorgar permisos:", error.message);
    process.exit(1);
  }
}

setAdmin();
