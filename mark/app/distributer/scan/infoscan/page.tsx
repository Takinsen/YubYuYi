import { Suspense } from 'react'

import InfoScan from '@/features/Distributer/Scan/InfoScan/InfoScan'

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InfoScan />
    </Suspense>
  )
}