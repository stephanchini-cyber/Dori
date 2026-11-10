# Entorno de nube

La máquina actual se preparó con Node.js 24 y npm 11. No requiere credenciales para la demostración. Las dependencias están instaladas y el servidor de producción se inicia con `npm start` desde `/workspace/Dori` después del build.

El guardado de los campos `install_script` y `start_skill` mediante la herramienta de configuración devolvió `INVALID_ARGUMENT`; su persistencia no está confirmada. Estos archivos conservan las instrucciones para revisión, pero no sustituyen el registro en la configuración del entorno ni acreditan publicación de un snapshot.

## Instalación reproducible

Contenido preparado para `install_script`: [environment-install.sh](environment-install.sh). Se probó el flujo con `npm ci`, typecheck y build.

## Instrucciones preparadas para start_skill

Usar el checkout existente `/workspace/Dori`. Cada tarea ya está aislada; no crear worktrees salvo solicitud explícita. Requiere Node.js 24 y npm 11. Si faltan dependencias, ejecutar `npm ci --cache /tmp/dori-npm-cache --no-audit --no-fund`. Ejecutar `npm run build` si falta `.next/BUILD_ID` o cambió el código; luego `npm start`. Los procesos no sobreviven a la restauración del snapshot y deben reiniciarse en cada instancia.

Validar peticiones reales al puerto 3000 y ejecutar `npm run test:smoke`. Usa Chromium en `/usr/bin/chromium` o `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`. No mostrar enlaces de preview de localhost durante onboarding.

No habilitar acceso privado hasta implementar y probar `SUPABASE.md`. Los datos del demo son ficticios. Sustituir las fotografías provisionales por material propio o con licencia verificada antes de publicar el sitio. No hacer commits sin autorización.
