import React from 'react'
import ShippingInfo from '@/features/Distributer/Transport/ShippingInfo/ShippingInfo';

export default async function ShippingPage({ params }: { params: Promise<{ id: string }> }){
  const { id } = await params;
  return <ShippingInfo id={id} />
}
