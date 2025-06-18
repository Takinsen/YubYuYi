'use client';

import { useSearchParams } from 'next/navigation';
import Home from '@/features/Guest/Home/Home';

export default function HomePage() {
  const params = useSearchParams();
  const id = params.get('id');

  if (!id) return <Home id={''} />;

  return <Home id={id} />;
}