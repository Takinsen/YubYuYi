'use client';
import { Button } from '@mantine/core';
import { useAuth } from '@/providers/AuthContext';
import logout from '@/api/auth/logout';

import { useRouter } from 'next/navigation';

const LogoutButton = () => {
  const { clientLogout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    const res = await logout();
    console.log(res)
    if (res.success) {
      clientLogout();
       router.push('/');
    }
    
  }
  return (
    <Button onClick={handleLogout} variant="small">
      Logout
    </Button>
  )
}

export default LogoutButton