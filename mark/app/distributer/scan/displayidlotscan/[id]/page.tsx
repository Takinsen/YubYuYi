import React from 'react'
import DisplayIdLotScan from '@/features/Distributer/Scan/DisplayIdLotScan/DisplayIdLotScan'

export default async function DisplayIdLotScanPage ({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <DisplayIdLotScan lotId={id}/>
  
}

