# Cuentas conmigo

App para que quienes dan talleres a personas mayores cobren sus cuotas con CoDi (vía Pey). Hecha con Expo (React Native).

## Pruébala en el navegador

Abre [cuentasconmigo.tuentyfaiv.com/app](https://cuentasconmigo.tuentyfaiv.com/app) en el celular o la computadora y entra con la cuenta de tallerista que el equipo te comparta. No necesitas instalar nada. Los cobros son reales: MXN 1 cada uno, se pagan desde la app de tu banco con CoDi y no se reembolsan.

## Pruébala con Expo Go

Mientras la app está en revisión en App Store y Play Store:

1. Pide a quien administra el proyecto que te invite a la organización `cuentas-conmigo` en [expo.dev](https://expo.dev), y acepta la invitación desde tu correo.
2. Instala **Expo Go** desde App Store o Google Play e inicia sesión con esa misma cuenta de Expo. Expo Go solo abre las vistas previas del proyecto para miembros de la organización.
3. En [expo.dev/accounts/cuentas-conmigo/projects/cuentasconmigo](https://expo.dev/accounts/cuentas-conmigo/projects/cuentasconmigo), entra a **Updates**, abre la actualización más reciente de la rama `preview`, toca **Preview** y escanea el código QR. En iPhone, escanéalo con la app Cámara.
4. Entra con la cuenta de tallerista que el equipo te comparta. Los pagos son reales: MXN 1 cada uno y no se reembolsan.

## Desarrollo

Necesitas [Bun](https://bun.sh/) 1.4 o superior, y Xcode o Android Studio, o Expo Go en un teléfono conectado a la misma red Wi-Fi.

```bash
bun install
cp .env.example .env.local   # llena EXPO_PUBLIC_API_URL; si lo dejas vacío, la app usa datos de ejemplo en memoria
bun run start                # presiona i (iOS) o a (Android), o escanea el QR con Expo Go
```

Revisiones: `bun run check` (TypeScript), `bun run lint` (Biome), `bun run test` (Vitest).

Agrega librerías con `bunx expo install <paquete>` para que las versiones coincidan con el SDK de Expo.

## Publicación

- Vista previa para Expo Go: `EXPO_NO_DOTENV=1 EXPO_GO_PREVIEW=1 EXPO_PUBLIC_API_URL=https://d331njsh1bdk0b.cloudfront.net bunx eas-cli update --channel preview --environment preview --message "<qué cambió>"`. `EXPO_GO_PREVIEW=1` hace que la versión coincida con Expo Go, y `EXPO_NO_DOTENV=1` evita que `.env.local` entre al paquete.
- Builds para las tiendas: `bunx eas-cli build --profile production -p ios` o `-p android`, y luego `bunx eas-cli submit -p ios` o `-p android`.
- Ficha de App Store: `bunx eas-cli metadata:push`, con los textos de `store.config.js`; ese archivo indica qué variables de entorno necesita.
- Sitio y app web en [cuentasconmigo.tuentyfaiv.com](https://cuentasconmigo.tuentyfaiv.com): `bun run export:web` arma la app en `site/public/app`, y `cd site && bunx wrangler deploy` publica todo en Cloudflare. La app queda en `/app`, y las páginas de ayuda, privacidad, términos y seguridad quedan en la raíz.
