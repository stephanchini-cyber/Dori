import { notFound } from "next/navigation";
import { DemoApp } from "@/components/demo-app";
export function generateStaticParams() {
  return ["inicio", "explorar", "perfil", "publicar"].map((view) => ({ view }));
}
export default async function Page({
  params,
}: {
  params: Promise<{ view: string }>;
}) {
  const { view } = await params;
  if (!["inicio", "explorar", "perfil", "publicar"].includes(view)) notFound();
  return <DemoApp view={view} />;
}
