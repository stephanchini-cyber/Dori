"use client";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Leaf,
  Camera,
  Sprout,
  MoveDown,
} from "lucide-react";
import { Header, Footer, PhotoCard, PhotoDialog } from "@/components/site";
import { publicPhotos, type Photo } from "@/lib/demo";
export default function Home() {
  const [selected, setSelected] = useState<Photo | null>(null);
  return (
    <>
      <Header />
      <main>
        <section className="hero">
          <img
            className="hero-photo"
            src="/photos/mountain.jpg"
            alt="Un bosque de coníferas al pie de una montaña"
          />
          <div className="hero-shade" />
          <div className="hero-content">
            <span className="eyebrow light">
              <span className="little-line" /> MIRAR. SENTIR. COMPARTIR.
            </span>
            <h1>
              La naturaleza tiene
              <br />
              historias.
              <br />
              <em>Compartamos las nuestras.</em>
            </h1>
            <p>
              Un rincón para compartir naturaleza.
              <br />
              Fotografías, encuentros y miradas que nos acercan.
            </p>
            <Link href="/demo/explorar" className="button cream">
              Explorar las fotografías <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="hero-bottom">
            <span>UNA COMUNIDAD QUE CRECE CON CADA MIRADA</span>
            <a href="#miradas" aria-label="Ver fotografías destacadas">
              <MoveDown size={21} />
            </a>
            <span className="hero-caption">01 / EL ARTE DE OBSERVAR</span>
          </div>
        </section>
        <section className="intro-strip">
          <Leaf size={19} />
          <p>Para quienes encuentran algo extraordinario en lo cotidiano.</p>
          <span>BIENVENIDO A DORI</span>
        </section>
        <section className="section gallery-section" id="miradas">
          <div className="section-heading">
            <div>
              <span className="eyebrow">UN INSTANTE, MUCHAS HISTORIAS</span>
              <h2>
                Miradas que nos inspiran<span className="sage">.</span>
              </h2>
            </div>
            <Link className="text-link" href="/demo/explorar">
              Ver la galería <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="featured-grid">
            {publicPhotos.slice(0, 3).map((photo) => (
              <PhotoCard key={photo.id} photo={photo} onSelect={setSelected} />
            ))}
          </div>
          <p className="gallery-note">
            Selección editorial de demostración. Solo las fotografías elegidas
            expresamente se muestran en esta portada.
          </p>
        </section>
        <section className="community section" id="comunidad">
          <div className="community-image">
            <img
              src="/photos/bird.jpg"
              alt="Un ave descansando sobre una rama"
              loading="lazy"
            />
            <span className="photo-label">
              LA MAGIA ESTÁ EN LOS PEQUEÑOS ENCUENTROS
            </span>
          </div>
          <div className="community-copy">
            <span className="eyebrow">MÁS QUE FOTOGRAFÍAS</span>
            <h2>
              Un lugar para mirar
              <br />
              con otros ojos.
            </h2>
            <p>
              Dori nace de algo sencillo: las ganas de compartir eso que nos
              emociona cuando salimos a observar la naturaleza.
            </p>
            <p>
              Un espacio cercano, entre familia, amigos y personas curiosas. Sin
              prisa, sin competir. Con respeto por cada especie y cada historia.
            </p>
            <div className="community-values">
              <span>
                <Camera size={19} /> Miradas auténticas
              </span>
              <span>
                <Sprout size={19} /> Naturaleza con respeto
              </span>
            </div>
            <Link className="text-link" href="/demo/inicio">
              Conocer la comunidad <ArrowRight size={18} />
            </Link>
          </div>
        </section>
        <section className="join">
          <Leaf size={27} strokeWidth={1.2} />
          <span className="eyebrow">LAS BUENAS HISTORIAS SE COMPARTEN</span>
          <h2>Tu próxima mirada tiene un lugar aquí.</h2>
          <p>Una comunidad pequeña. Un mundo por descubrir.</p>
          <Link href="/acceso" className="button dark">
            Acceso a miembros <ArrowUpRight size={17} />
          </Link>
          <span className="join-note">
            Una comunidad privada, por invitación.
          </span>
        </section>
      </main>
      <Footer />
      <PhotoDialog photo={selected} onClose={() => setSelected(null)} />
    </>
  );
}
