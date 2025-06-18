'use client';
import { Button } from '@mantine/core';

import { useRouter } from 'next/navigation';

const LoginButton = () => {
  const router = useRouter();

  const handleLogout = () => {
     router.push('/login');
  }
  return (
    <Button onClick={handleLogout} variant="small">
      Login
    </Button>
  )
}

export default LoginButton