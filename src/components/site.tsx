"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Feather,
  Menu,
  X,
  ArrowRight,
  Heart,
  LockKeyhole,
} from "lucide-react";
import type { Photo } from "@/lib/demo";
export function Logo() {
  return (
    <Link href="/" className="logo" aria-label="Dori, inicio">
      <Feather size={28} strokeWidth={1.2} />
      <span>
        dori<span className="logo-dot">.</span>
      </span>
    </Link>
  );
}
export function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  return (
    <header className="header">
      <div className="header-inner">
        <Logo />
        <button
          className="menu-toggle"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav
          className={open ? "navigation open" : "navigation"}
          aria-label="Navegación principal"
        >
          <Link
            className={path === "/" ? "active" : ""}
            href="/"
            onClick={() => setOpen(false)}
          >
            Inicio
          </Link>
          <Link
            className={path.includes("explorar") ? "active" : ""}
            href="/demo/explorar"
            onClick={() => setOpen(false)}
          >
            Explorar
          </Link>
          <Link href="/#comunidad" onClick={() => setOpen(false)}>
            La comunidad
          </Link>
          <span className="nav-divider" />
          <Link
            href="/acceso"
            className="member-link"
            onClick={() => setOpen(false)}
          >
            Acceso a miembros <ArrowUpRight size={15} />
          </Link>
        </nav>
      </div>
    </header>
  );
}
export function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div>
          <Logo />
          <p>Un rincón para compartir naturaleza.</p>
        </div>
        <div className="footer-links">
          <Link href="/#comunidad">Nuestra comunidad</Link>
          <Link href="/acceso">Acceso a miembros</Link>
          <Link href="/privacidad">Privacidad y cuidado</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} Dori. Hecho con calma y curiosidad.
        </span>
        <span>Naturaleza cerca. Siempre.</span>
      </div>
    </footer>
  );
}
export function PhotoCard({
  photo,
  onSelect,
}: {
  photo: Photo;
  onSelect?: (photo: Photo) => void;
}) {
  return (
    <article className="photo-card">
      <button
        className="photo-image"
        onClick={() => onSelect?.(photo)}
        aria-label={`Ver ${photo.title}`}
      >
        <img
          src={photo.image}
          alt={`${photo.species}: ${photo.title}`}
          loading="lazy"
        />
        <span className="image-category">{photo.category}</span>
        <span className="image-arrow">
          <ArrowUpRight size={20} />
        </span>
      </button>
      <div className="photo-caption">
        <div>
          <h3>{photo.title}</h3>
          <p>
            {photo.author} <span>· {photo.species}</span>
          </p>
        </div>
      </div>
    </article>
  );
}
export function PhotoDialog({
  photo,
  onClose,
}: {
  photo: Photo | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!photo) return;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.querySelector<HTMLButtonElement>(".close-modal")?.focus();
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
      if (event.key === "Tab") {
        event.preventDefault();
        document.querySelector<HTMLButtonElement>(".close-modal")?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, [photo, onClose]);
  if (!photo) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <section
        className="photo-dialog"
        role="dialog"
        aria-modal="true"
        aria-label={photo.title}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="close-modal"
          aria-label="Cerrar fotografía"
          onClick={onClose}
        >
          <X />
        </button>
        <img src={photo.image} alt={photo.species} />
        <div>
          <span className="eyebrow">Fotografía de demostración</span>
          <h2>{photo.title}</h2>
          <p>{photo.description}</p>
          <p className="muted">
            {photo.author} · {photo.species}
          </p>
        </div>
      </section>
    </div>
  );
}
export function DemoNotice() {
  return (
    <div className="demo-notice">
      <LockKeyhole size={16} />
      <span>
        Vista de demostración · Personas y publicaciones ficticias. Sin acceso a
        contenido privado.
      </span>
      <Link href="/acceso">
        Sobre el acceso <ArrowRight size={14} />
      </Link>
    </div>
  );
}
export function LikeButton({ count }: { count: number }) {
  const [liked, setLiked] = useState(false);
  return (
    <button
      className={liked ? "social liked" : "social"}
      aria-pressed={liked}
      onClick={() => setLiked(!liked)}
    >
      <Heart size={18} fill={liked ? "currentColor" : "none"} />
      {count + (liked ? 1 : 0)}
      <span className="sr-only"> Me gusta de demostración</span>
    </button>
  );
}
