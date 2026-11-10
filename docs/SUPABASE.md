# Integración pendiente con Supabase

El prototipo no autentica, no guarda contenido y no consulta datos privados. Las rutas `/demo/*` son públicas y contienen únicamente fixtures. El cliente SSR es infraestructura sin consumidores; `requireAuthorizedMember()` rechaza siempre el acceso. Añadir variables no habilita la comunidad.

## Orden de implementación

1. Crear el proyecto de Supabase, conectar URL y clave publicable por variables de entorno. No exponer claves privilegiadas al navegador.
2. Definir migraciones para perfiles, membresías, invitaciones, publicaciones, favoritos y moderación. Tipar el cliente desde el esquema real.
3. Aplicar RLS antes de conectar las consultas: acceso solo para membresías activas; escritura del autor; cambios de estado y selección editorial reservados a moderación. Separar permisos de lectura pública y privada.
4. Implementar invitaciones de un solo uso: guardar únicamente el hash del token; comprobar vencimiento y correo; consumir la invitación de forma atómica en servidor junto con la activación de membresía. Evitar autorregistro abierto.
5. Implementar autenticación SSR con verificación `auth.getUser()`, renovación de cookies en el límite de petición y control de membresía en cada lectura y mutación del servidor. Añadir límites de intentos y mensajes que no revelen cuentas. El cliente SSR con escritura de cookies debe usarse en Route Handlers o Server Actions; preparar un adaptador de lectura para Server Components.
6. Crear bucket privado. Validar tamaño, firma y tipo real del archivo en servidor; eliminar EXIF y GPS; usar claves no adivinables y políticas de almacenamiento por usuario. Generar URLs firmadas breves solo después de autorizar cada petición.
7. Implementar publicación y favoritos reales, validación en servidor y controles contra abuso. No reutilizar acciones locales del demo como persistencia o autorización.
8. Publicar en portada únicamente derivados sin metadatos de publicaciones con consentimiento explícito vigente, moderación aprobada y selección editorial. Mantener un modelo público independiente; permitir revocar consentimiento y retirar derivados y cachés.
9. Implementar denuncias, suspensión y moderación. Definir retención, eliminación de cuenta y eliminación de archivos.
10. Probar con usuarios diferentes: anónimo, invitado, miembro, suspendido y moderador. Verificar accesos directos, invitación repetida, tokens vencidos, aislamiento por usuario, almacenamiento y retirada pública. Solo entonces habilitar rutas privadas y sustituir el rechazo de `requireAuthorizedMember`.

No se incluyen mapas, IA, notificaciones, mensajería ni monetización en esta etapa. No solicitar coordenadas precisas por defecto.
