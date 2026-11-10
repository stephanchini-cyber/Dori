import { Header, Footer } from "@/components/site";
export default function Privacy() {
  return (
    <>
      <Header />
      <main className="section privacy">
        <span className="eyebrow">CUIDAR LO QUE COMPARTIMOS</span>
        <h1>Privacidad y naturaleza.</h1>
        <p>
          Dori está en su primera etapa. Todas las personas y publicaciones de
          la comunidad son ejemplos; el inicio de sesión, el registro y la
          publicación real están deshabilitados.
        </p>
        <h2>Tu fotografía, tu decisión.</h2>
        <p>
          La futura comunidad será privada. Mostrar una fotografía en la portada
          pública requerirá consentimiento explícito de su autor y selección
          editorial. Nunca se publicará automáticamente el contenido de la
          comunidad.
        </p>
        <h2>Observar sin exponer.</h2>
        <p>
          No mostramos ubicaciones precisas de avistamientos. La futura subida
          de archivos deberá eliminar metadatos de localización antes de
          almacenar las imágenes.
        </p>
        <h2>Un espacio por invitación.</h2>
        <p>
          El acceso real requerirá autenticación en servidor, invitaciones de un
          solo uso, políticas de seguridad por usuario, almacenamiento privado y
          herramientas de moderación.
        </p>
      </main>
      <Footer />
    </>
  );
}
