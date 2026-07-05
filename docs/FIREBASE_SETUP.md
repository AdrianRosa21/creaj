# Configuración Manual de Firebase para UEDS

Para que el entorno de desarrollo y producción de UEDS funcione correctamente, debes configurar tu proyecto de Firebase. Sigue estos pasos cuidadosamente.

## 1. Crear el Proyecto de Firebase

1. Ve a la [Consola de Firebase](https://console.firebase.google.com/).
2. Haz clic en **Crear un proyecto**.
3. Nombra el proyecto (por ejemplo, `ueds-demo`) y sigue los pasos para crearlo. Puedes desactivar Google Analytics si no es necesario.

## 2. Configurar Firebase Authentication

1. En el panel izquierdo, ve a **Compilación > Authentication**.
2. Haz clic en **Comenzar**.
3. Ve a la pestaña **Sign-in method** (Método de inicio de sesión).
4. Habilita el proveedor de **Correo electrónico/Contraseña** (sin habilitar el inicio de sesión sin contraseña a menos que se requiera).
5. Habilita el proveedor de **Google**. Al hacerlo, deberás proporcionar un correo electrónico de asistencia al proyecto.

## 3. Configurar Cloud Firestore

1. En el panel izquierdo, ve a **Compilación > Base de datos de Firestore**.
2. Haz clic en **Crear base de datos**.
3. Selecciona una ubicación (por ejemplo, `us-central1` o la más cercana a tus usuarios).
4. Elige comenzar en **Modo de producción**.
5. Ve a la pestaña **Reglas** y actualiza las reglas básicas de seguridad (estas se iterarán más adelante con el rol de admin):
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         // Permitir lectura a usuarios autenticados temporalmente
         allow read: if request.auth != null;
         allow write: if false; // Solo escribir desde el Admin SDK o reglas específicas
       }
     }
   }
   ```

## 4. Obtener las variables para `.env.local`

### Firebase Client (Frontend)

1. Ve a **Configuración del proyecto** (el ícono de engranaje en la parte superior izquierda).
2. En la pestaña **General**, baja hasta "Tus apps" y haz clic en el ícono de **Web** (`</>`).
3. Registra el nombre de la app (ej. `ueds-web`).
4. Firebase te mostrará un objeto `firebaseConfig`.
5. Copia esos valores en tu archivo `.env.local`:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY="TU_API_KEY"
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="tu-proyecto.firebaseapp.com"
   NEXT_PUBLIC_FIREBASE_PROJECT_ID="tu-proyecto"
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="tu-proyecto.firebasestorage.app"
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="SENDER_ID"
   NEXT_PUBLIC_FIREBASE_APP_ID="APP_ID"
   ```

### Firebase Admin SDK (Backend / API)

1. Sigue en **Configuración del proyecto**, pero ve a la pestaña **Cuentas de servicio**.
2. Asegúrate de estar en "Firebase Admin SDK" (con Node.js seleccionado).
3. Haz clic en **Generar nueva clave privada**.
4. Descarga el archivo JSON.
5. Copia los valores correspondientes al archivo `.env.local`:
   ```env
   FIREBASE_PROJECT_ID="tu-proyecto"
   FIREBASE_CLIENT_EMAIL="firebase-adminsdk-xxx@tu-proyecto.iam.gserviceaccount.com"
   # IMPORTANTE: Reemplaza los saltos de línea reales en la clave privada con "\n" literal
   # Debe ser una sola línea larga en el archivo .env
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvg...\n-----END PRIVATE KEY-----\n"
   ```

## 5. Configurar Variables de Entorno en Vercel

Cuando despliegues la aplicación a producción:

1. Ve a tu proyecto en Vercel.
2. Ve a **Settings > Environment Variables**.
3. Añade todas las variables definidas en tu `.env.local`.
4. Nota importante: Al pegar la `FIREBASE_PRIVATE_KEY` en Vercel, asegúrate de mantenerla envuelta entre comillas o con el formato correcto de saltos de línea.

## 6. Crear el primer Usuario Administrador

El sistema valida a los administradores (los que entregan puntos en el stand) mediante Custom Claims. Como aún no hay UI para dar el rol, debes hacerlo la primera vez mediante un script o temporalmente usando Firebase Admin SDK.

1. Regístrate en la app desde la vista de creación de cuenta o Google, y copia tu `UID` desde la consola de Authentication.
2. En tu código servidor (ej. un endpoint o script temporal), ejecuta:
   ```typescript
   import { getAuth } from 'firebase-admin/auth';
   await getAuth().setCustomUserClaims("TU_UID_AQUI", { admin: true });
   ```
3. Vuelve a iniciar sesión (cierra sesión y entra) para refrescar tu token con el claim `admin`.
