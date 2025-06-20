'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Home from '@/features/Guest/Home/Home';

function HomeWithParams() {
  const params = useSearchParams();
  const id = params.get('id');

  return <Home id={id ?? ''} />;
}

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeWithParams />
    </Suspense>
  );
}
