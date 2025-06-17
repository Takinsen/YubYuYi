import Info from "@/features/Farmer/Info/Info";

export default async function InfoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <Info id={id} />;
}