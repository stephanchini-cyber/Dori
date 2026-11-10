"use client";
import Link from "next/link";
import { useState } from "react";
import {
  Camera,
  Compass,
  Home,
  UserRound,
  Plus,
  Bookmark,
  Upload,
  ArrowUpRight,
  Check,
  LockKeyhole,
} from "lucide-react";
import {
  Header,
  Footer,
  DemoNotice,
  PhotoCard,
  PhotoDialog,
  LikeButton,
} from "./site";
import { photos, categories, type Category, type Photo } from "@/lib/demo";
export function DemoApp({ view }: { view: string }) {
  const [category, setCategory] = useState<Category>("Todas");
  const [selected, setSelected] = useState<Photo | null>(null);
  const [tab, setTab] = useState("publicaciones");
  const [favorites, setFavorites] = useState<string[]>([]);
  const navigation = [
    { id: "inicio", name: "Inicio", icon: Home },
    { id: "explorar", name: "Explorar", icon: Compass },
    { id: "perfil", name: "Perfil", icon: UserRound },
    { id: "publicar", name: "Publicar", icon: Plus },
  ];
  const visible = photos.filter(
    (p) => category === "Todas" || p.category === category,
  );
  return (
    <>
      <Header />
      <DemoNotice />
      <div className="app-shell">
        <aside className="sidebar">
          <span className="eyebrow">TU RINCÓN NATURAL</span>
          <nav aria-label="Comunidad de demostración">
            {navigation.map(({ id, name, icon: Icon }) => (
              <Link
                key={id}
                href={`/demo/${id}`}
                className={view === id ? "selected" : ""}
              >
                <Icon size={20} />
                {name}
              </Link>
            ))}
          </nav>
          <div className="sidebar-note">
            <SproutIcon />
            <p>Observar también es una forma de cuidar.</p>
            <span>Comparte con respeto.</span>
          </div>
        </aside>
        <main className="app-main">
          {view === "inicio" && (
            <>
              <span className="eyebrow">EL DIARIO DE LA COMUNIDAD</span>
              <h1>Un nuevo día para observar.</h1>
              <p className="page-lead">
                Pequeños encuentros, compartidos con grandes miradas.
              </p>
              <div className="feed">
                {photos.map((p) => (
                  <article key={p.id} className="post">
                    <div className="post-author">
                      <span className="avatar small">{p.initials}</span>
                      <div>
                        <strong>{p.author}</strong>
                        <span>Miembro de demostración · {p.category}</span>
                      </div>
                      <span className="post-demo">DEMO</span>
                    </div>
                    <button
                      className="post-photo"
                      onClick={() => setSelected(p)}
                      aria-label={`Ver ${p.title}`}
                    >
                      <img src={p.image} alt={p.species} />
                    </button>
                    <div className="post-body">
                      <div className="post-actions">
                        <LikeButton count={p.likes} />
                        <button
                          className="social"
                          aria-label={
                            favorites.includes(p.id)
                              ? "Quitar de favoritos de demostración"
                              : "Guardar en favoritos de demostración"
                          }
                          aria-pressed={favorites.includes(p.id)}
                          onClick={() =>
                            setFavorites(
                              favorites.includes(p.id)
                                ? favorites.filter((id) => id !== p.id)
                                : [...favorites, p.id],
                            )
                          }
                        >
                          <Bookmark
                            size={19}
                            fill={
                              favorites.includes(p.id) ? "currentColor" : "none"
                            }
                          />
                        </button>
                      </div>
                      <span className="eyebrow">{p.species}</span>
                      <h2>{p.title}</h2>
                      <p>{p.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
          {view === "explorar" && (
            <>
              <span className="eyebrow">
                LA NATURALEZA, DESDE OTRAS MIRADAS
              </span>
              <h1>Siempre hay algo por descubrir.</h1>
              <p className="page-lead">
                Detente un momento. Deja que la curiosidad te guíe.
              </p>
              <div
                className="filter-bar"
                role="group"
                aria-label="Filtrar por categoría"
              >
                {categories.map((c) => (
                  <button
                    key={c}
                    aria-pressed={category === c}
                    className={category === c ? "filter active" : "filter"}
                    onClick={() => setCategory(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <p className="result-count" aria-live="polite">
                {visible.length} fotografías de demostración
              </p>
              <div className="explore-grid">
                {visible.map((p) => (
                  <PhotoCard key={p.id} photo={p} onSelect={setSelected} />
                ))}
              </div>
            </>
          )}
          {view === "perfil" && (
            <>
              <div className="profile-cover" />
              <div className="profile-header">
                <span className="avatar large">CM</span>
                <div>
                  <span className="eyebrow">PERFIL DE DEMOSTRACIÓN</span>
                  <h1>Clara Méndez</h1>
                  <p>
                    Aprendiendo a mirar más despacio. Aves, caminatas y una
                    cámara siempre cerca.
                  </p>
                  <span className="muted">
                    2 publicaciones · Amante de la naturaleza
                  </span>
                </div>
              </div>
              <div
                className="filter-bar"
                role="tablist"
                aria-label="Contenido del perfil"
              >
                <button
                  role="tab"
                  aria-selected={tab === "publicaciones"}
                  className={`filter ${tab === "publicaciones" ? "active" : ""}`}
                  onClick={() => setTab("publicaciones")}
                >
                  Publicaciones
                </button>
                <button
                  role="tab"
                  aria-selected={tab === "favoritos"}
                  className={`filter ${tab === "favoritos" ? "active" : ""}`}
                  onClick={() => setTab("favoritos")}
                >
                  Favoritos de ejemplo
                </button>
              </div>
              <div className="explore-grid" role="tabpanel">
                {(tab === "publicaciones"
                  ? photos.filter((p) => p.initials === "CM")
                  : photos.filter((p) => p.initials !== "CM")
                ).map((p) => (
                  <PhotoCard key={p.id} photo={p} onSelect={setSelected} />
                ))}
              </div>
            </>
          )}
          {view === "publicar" && <PublishForm />}
        </main>
      </div>
      <Footer />
      <PhotoDialog photo={selected} onClose={() => setSelected(null)} />
    </>
  );
}
function SproutIcon() {
  return <Camera size={23} strokeWidth={1.3} />;
}
function PublishForm() {
  const [file, setFile] = useState<string | null>(null);
  const [status, setStatus] = useState("");
  return (
    <>
      <span className="eyebrow">CADA ENCUENTRO TIENE UNA HISTORIA</span>
      <h1>Comparte tu mirada.</h1>
      <p className="page-lead">
        Prueba el formulario. No se enviarán ni guardarán fotografías.
      </p>
      <form
        className="publish-form"
        onSubmit={(e) => {
          e.preventDefault();
          setStatus(
            "Vista previa completada. La publicación real estará disponible cuando se configure el acceso seguro.",
          );
        }}
      >
        <label className="upload-zone">
          <Upload size={30} strokeWidth={1.3} />
          <strong>{file ?? "Elige una fotografía"}</strong>
          <span>JPEG, PNG o WebP · Hasta 10 MB · Solo vista local</span>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              if (
                f.size > 10 * 1024 * 1024 ||
                !["image/jpeg", "image/png", "image/webp"].includes(f.type)
              ) {
                setStatus("Elige una imagen JPEG, PNG o WebP de hasta 10 MB.");
                e.target.value = "";
                setFile(null);
                return;
              }
              setFile(f.name);
              setStatus("");
            }}
          />
        </label>
        <label>
          Título
          <input
            name="title"
            required
            maxLength={120}
            placeholder="Un instante que merece una historia"
          />
        </label>
        <div className="form-row">
          <label htmlFor="photo-category">
            Categoría
            <select id="photo-category" name="category" required>
              <option value="">Selecciona una categoría</option>
              {categories
                .filter((c) => c !== "Todas")
                .map((c) => (
                  <option key={c}>{c}</option>
                ))}
            </select>
          </label>
          <label>
            Especie
            <input name="species" placeholder="Si la conoces" maxLength={100} />
          </label>
        </div>
        <label>
          Descripción
          <textarea
            name="description"
            rows={4}
            maxLength={2000}
            placeholder="¿Qué hizo especial este encuentro?"
          />
        </label>
        <label className="check-label">
          <input type="checkbox" name="consent" />
          <span>
            Permitir que esta fotografía sea considerada para la portada
            pública. Es opcional y requerirá selección editorial.
          </span>
        </label>
        <div className="inline-note">
          <LockKeyhole size={17} />
          <span>
            No solicitamos ubicaciones precisas. Este formulario no publica
            contenido.
          </span>
        </div>
        <button className="button dark" type="submit">
          Revisar demostración <Check size={18} />
        </button>
        <p role="status">{status}</p>
      </form>
    </>
  );
}
