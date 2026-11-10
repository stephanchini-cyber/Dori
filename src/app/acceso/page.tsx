"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, LockKeyhole } from "lucide-react";
import { Header, Footer } from "@/components/site";
export default function Access() {
  const [register, setRegister] = useState(false);
  return (
    <>
      <Header />
      <main className="access-layout">
        <div className="access-image">
          <img src="/photos/forest.jpg" alt="Copas de árboles en el bosque" />
          <div>
            <span className="eyebrow light">BIENVENIDO A TU RINCÓN</span>
            <h1>
              Hay miradas que
              <br />
              merecen compartirse.
            </h1>
          </div>
        </div>
        <section className="access-form">
          <span className="eyebrow">UNA COMUNIDAD CERCANA</span>
          <h2>
            {register
              ? "Todo empieza con una invitación."
              : "Qué bueno volver a verte."}
          </h2>
          <p>Un rincón para compartir naturaleza.</p>
          <div className="filter-bar">
            <button
              className={`filter ${!register ? "active" : ""}`}
              onClick={() => setRegister(false)}
            >
              Iniciar sesión
            </button>
            <button
              className={`filter ${register ? "active" : ""}`}
              onClick={() => setRegister(true)}
            >
              Con invitación
            </button>
          </div>
          <div className="inline-note">
            <LockKeyhole size={20} />
            <p>
              Acceso todavía no disponible. Esta pantalla es un prototipo; la
              autenticación segura y las invitaciones se conectarán con
              Supabase.
            </p>
          </div>
          <fieldset disabled>
            <label>
              Correo electrónico
              <input
                type="email"
                placeholder="tu@correo.com"
                autoComplete="email"
              />
            </label>
            <label>
              Contraseña
              <input
                type="password"
                placeholder="Tu contraseña"
                autoComplete={register ? "new-password" : "current-password"}
              />
            </label>
            {register && (
              <label>
                Código de invitación
                <input placeholder="Tu invitación personal" />
              </label>
            )}
            <button className="button dark">
              {register
                ? "Crear cuenta — próximamente"
                : "Entrar — próximamente"}
            </button>
          </fieldset>
          <Link className="text-link" href="/demo/inicio">
            Recorrer la demostración <ArrowUpRight size={17} />
          </Link>
          <p className="small-print">
            La demostración solo contiene datos ficticios y fotografías de
            muestra. No crea una sesión.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
