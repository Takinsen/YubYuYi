import React from 'react'
import Info from '@/features/Distributer/Info/Info'
export default async function InfoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <Info id={id} />;
}
