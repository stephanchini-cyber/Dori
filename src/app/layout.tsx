import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Dori — Un rincón para compartir naturaleza",
  description:
    "Una comunidad para mirar con calma, compartir fotografías y acercarnos a la naturaleza.",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
