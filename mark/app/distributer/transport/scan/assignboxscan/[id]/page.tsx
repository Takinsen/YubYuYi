import React from 'react'
import AssignBoxScan from '@/features/Distributer/Transport/Scan/AssignBoxScan/AssignBoxScan';
export default async function AssignBoxPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <AssignBoxScan shippingId={id} />;
}
