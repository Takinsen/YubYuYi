import React from 'react'
import AssignDurianScan from '@/features/Distributer/Scan/AssignDurianScan/AssignDurianScan';
export default async function AssignDurianPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <AssignDurianScan lotId={id} />;
}
