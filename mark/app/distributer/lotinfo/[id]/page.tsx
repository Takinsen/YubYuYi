import React from 'react'
import LotInfo from '@/features/Distributer/LotInfo/LotInfo'

export default async function LotInfoPage({ params }: { params: Promise<{ id: string }> }){
  const { id } = await params;
  return <LotInfo id={id} />
}

