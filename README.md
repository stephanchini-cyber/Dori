# Dori

Un rincón para compartir naturaleza. Prototipo editorial responsive de una comunidad de fotografía, construido con Next.js App Router, TypeScript y Tailwind CSS 4.

## Ejecutar localmente

Requisitos: Node.js 24 LTS y npm 11. No se necesitan cuentas, servicios externos ni variables de entorno para el demo.

```bash
npm ci
npm run dev
```

Abrir el puerto 3000 en el navegador local. Para producción local:

```bash
npm run build
npm start
```

En el entorno de nube se verificó npm usando `--cache /tmp/dori-npm-cache` porque la caché predeterminada no era escribible. No se necesitan instalaciones globales.

## Pantallas

- `/`: portada pública con selección explícita de fotografías de demostración.
- `/demo/inicio`: feed con acciones sociales locales sin persistencia.
- `/demo/explorar`: filtros por categoría y detalle de fotografía.
- `/demo/perfil`: perfil ficticio con publicaciones y favoritos de ejemplo.
- `/demo/publicar`: formulario local sin envío de archivos ni persistencia.
- `/acceso`: inicio de sesión y registro por invitación deshabilitados.
- `/privacidad`: decisiones de privacidad del prototipo.

No hay autenticación simulada, sesiones, publicaciones reales ni datos privados. Las personas, textos y conteos son ficticios. Las fotografías son muestras provisionales; ver [fuentes y restricciones](public/photos/SOURCES.md). Reemplazar las muestras de animales por material propio o con licencia documentada antes de publicar.

## Verificación

```bash
npm run typecheck
npm run build
# Con el servidor iniciado en otra terminal:
npm run test:smoke
```

La prueba de navegador usa Chromium del sistema (`/usr/bin/chromium` en la nube). En otra máquina, ejecutar `npx playwright install chromium` o definir `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`. Comprueba navegación, imágenes, filtros, modal, favoritos, formulario, acceso deshabilitado y ausencia de desbordamiento móvil.

## Estructura

`src/app` contiene las rutas; `src/components` los componentes reutilizables y las interfaces; `src/lib/demo.ts` mantiene fixtures y selección pública; `src/lib/domain.ts` define contratos preliminares; `src/lib/supabase` prepara el cliente de servidor y un guard de acceso que rechaza todas las peticiones hasta la integración real.

[Lista de integración con Supabase](docs/SUPABASE.md): autenticación SSR, invitaciones atómicas de un solo uso, membresías, RLS, almacenamiento privado, eliminación de metadatos, moderación y consentimiento editorial. Copiar `.env.example` a `.env.local` solo cuando comience esa integración. Configurar variables no habilita acceso por sí solo.

Usar el checkout existente en cada tarea de nube; no crear worktrees salvo solicitud explícita. Las dependencias y el build pueden conservarse en el snapshot; el servidor debe reiniciarse en cada instancia. No se realizaron commits como parte de la configuración.
