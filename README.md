# Unidad Extractora de Sacarosa (UEDS) - Demo

Este proyecto es un entorno interactivo y plataforma web diseñada para ferias y exhibiciones. Su objetivo es demostrar visualmente el proceso de extracción de sacarosa de la caña de azúcar (mediante un modelo 3D) e incentivar a los asistentes con un **Sistema de Recompensas y Lealtad**.

## Características Principales

- **App de Usuario**: Registro/login de usuarios con Google o Correo/Contraseña (Firebase Auth). Dashboard para ver su saldo de puntos, historial y catálogo de premios.
- **Flujo de Entregas**: El usuario entrega "cañas virtuales" (o físicas en el stand) y el administrador le abona puntos al instante mediante un sistema con bonos por cantidad.
- **Canje de Puntos**: Los usuarios pueden reservar premios de su catálogo y generar un "Pase de Canje" que muestran físicamente en el stand para retirar el premio.
- **Centro de Control (Admin Panel)**: Rutas protegidas (`/admin`) exclusivas para el equipo, permitiéndoles validar canjes, sumar puntos e inyectar el catálogo inicial, todo protegido mediante Custom Claims de Firebase y procesado atómicamente por Server Actions.
- **Visualizador 3D**: (Pendiente de integración). Espacio reservado para renderizar un archivo `.glb` del motor extractor en `@react-three/fiber`.

## Tecnologías

- **Framework**: [Next.js 14+ (App Router)](https://nextjs.org/)
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/)
- **Componentes**: [shadcn/ui](https://ui.shadcn.com/) (Radix UI + Lucide Icons)
- **Base de Datos & Auth**: [Firebase](https://firebase.google.com/) (Firestore, Auth, Admin SDK)
- **Despliegue Recomendado**: [Vercel](https://vercel.com/)

---

## Configuración del Entorno Local

### 1. Prerrequisitos
- Node.js 18+
- Una cuenta en Firebase Console.

### 2. Configurar Firebase
1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com/).
2. **Habilita Authentication**:
   - Activa el proveedor de Correo Electrónico / Contraseña.
   - Activa el proveedor de Google.
3. **Habilita Firestore Database**:
   - Iníciala en modo producción.
   - Reemplaza las reglas de seguridad copiando el contenido completo del archivo `firestore.rules` provisto en este repositorio.
4. **Obtén las credenciales web**:
   - Registra una aplicación web en el proyecto.
   - Copia la configuración generada (`apiKey`, `authDomain`, `projectId`, etc.).
5. **Genera una Service Account Key (Para Server Actions)**:
   - Ve a `Project Settings > Service Accounts`.
   - Haz clic en `Generate new private key`.
   - Descarga el JSON. Vas a necesitar este JSON codificado en Base64.
     Puedes codificarlo en Linux/Mac usando: `base64 -i service-account.json | tr -d '\n'` o usando cualquier herramienta online segura.

### 3. Variables de Entorno
Clona el archivo `.env.example` y renómbralo a `.env.local`:
```bash
cp .env.example .env.local
```

Rellena las variables con la información obtenida de Firebase en el paso anterior:
```env
# Client Firebase Keys
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu-proyecto
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef

# Server Firebase Admin Key (Base64 codificado)
FIREBASE_SERVICE_ACCOUNT_KEY=ewogICJ0eXBlI...
```

### 4. Instalación y Ejecución
```bash
npm install
npm run dev
```
La aplicación estará disponible en `http://localhost:3000`.

---

## Configurando al Primer Administrador

El sistema usa **Custom Claims** de Firebase para la máxima seguridad. Nadie puede acceder a `/admin` a menos que posea este token. Para otorgarte acceso:

1. Inicia la aplicación y **regístrate como un usuario normal** (Ej: `admin@miempresa.com`).
2. Detén el servidor y ejecuta el script administrador pasando tu correo:
```bash
node --env-file=.env.local scripts/set-admin.js admin@miempresa.com
```
3. Verás un mensaje de éxito. Vuelve a hacer login (o cierra sesión y entra de nuevo) para que se refresque tu token, ¡y listo! Podrás navegar a `/admin`.

---

## Instrucciones para Carga Semilla

Para evitar ingresar premios uno a uno durante el desarrollo, puedes cargar la data semilla con un clic:
1. Asegúrate de ser administrador e ingresa a `/admin/premios`.
2. Haz clic en el botón **"Cargar Datos Semilla"**.
3. Revisa en tu Firebase Firestore, en la colección `rewards`, que todo el catálogo se ha generado.

---

## Despliegue en Vercel

1. Haz push de tu código a un repositorio en GitHub.
2. Ingresa a [Vercel](https://vercel.com/) e importa tu repositorio.
3. En la sección **Environment Variables**, asegúrate de copiar y pegar todas las variables de tu archivo `.env.local` (Especialmente `FIREBASE_SERVICE_ACCOUNT_KEY`).
4. Haz clic en **Deploy**.
5. **¡IMPORTANTE!**: Vercel te dará una URL (ej: `ueds-app.vercel.app`). Debes ir a la consola de Firebase -> **Authentication** -> **Settings** -> **Authorized Domains** y **agregar tu dominio de Vercel**. Si no haces esto, el login con Google no funcionará en producción.

---

## Futuro: Integración del Modelo 3D

El prompt 04 detalla que aún no debemos inyectar un modelo 3D pesado. Cuando el equipo de modelado 3D provea el archivo `maquina-extractora.glb`, se deberá seguir este proceso:

1. Colocar el archivo en `public/models/maquina-extractora.glb`.
2. Instalar las dependencias de R3F: `npm install three @react-three/fiber @react-three/drei`.
3. Crear un componente `<Scene />` en `src/components/` que utilice `useGLTF` para cargar el modelo.
4. Integrarlo visualmente en `src/app/proyecto/page.tsx` para permitir al usuario interactuar y rotar la máquina.

---

**Desarrollado con ♥ por el equipo UEDS para ferias y exhibiciones tecnológicas.**
