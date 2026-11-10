import "server-only";
/** Fail closed until membership checks and RLS have been implemented and tested.
 * Do not replace with a client-side flag, cookie or demo state.
 */
export async function requireAuthorizedMember(): Promise<never> {
  throw new Error(
    "Acceso privado deshabilitado: pendiente de autenticación, membresía autorizada y políticas RLS.",
  );
}
