export const categories = [
  "Todas",
  "Aves",
  "Mamíferos",
  "Insectos",
  "Paisajes",
] as const;
export type Category = (typeof categories)[number];
export type Photo = {
  id: string;
  title: string;
  species: string;
  category: Category;
  image: string;
  author: string;
  initials: string;
  description: string;
  featuredConsent: boolean;
  likes: number;
};
// Fixtures only. Public curation is explicit and independent from future private data.
export const photos: Photo[] = [
  {
    id: "01",
    title: "Una pausa entre las ramas",
    species: "Abejaruco",
    category: "Aves",
    image: "/photos/bird.jpg",
    author: "Clara Méndez",
    initials: "CM",
    description:
      "A veces, la mejor parte de una caminata es detenerse. Un pequeño encuentro que hizo especial la mañana.",
    featuredConsent: true,
    likes: 24,
  },
  {
    id: "02",
    title: "Habitante del bosque",
    species: "Zorro rojo",
    category: "Mamíferos",
    image: "/photos/fox.jpg",
    author: "Tomás Silva",
    initials: "TS",
    description:
      "Una mirada curiosa, unos segundos de silencio y el privilegio de observar desde lejos.",
    featuredConsent: true,
    likes: 18,
  },
  {
    id: "03",
    title: "La belleza de lo pequeño",
    species: "Mariposa",
    category: "Insectos",
    image: "/photos/butterfly.jpg",
    author: "Lucía Ramos",
    initials: "LR",
    description:
      "Entre hojas y luz descubrimos un mundo que suele pasar desapercibido.",
    featuredConsent: true,
    likes: 32,
  },
  {
    id: "04",
    title: "Donde el bosque respira",
    species: "Bosque",
    category: "Paisajes",
    image: "/photos/forest.jpg",
    author: "Clara Méndez",
    initials: "CM",
    description:
      "La naturaleza también se cuenta en los espacios que habitan los animales.",
    featuredConsent: true,
    likes: 21,
  },
];
export const publicPhotos = photos.filter((photo) => photo.featuredConsent);
