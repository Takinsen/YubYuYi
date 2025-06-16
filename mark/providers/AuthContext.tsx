'use client';
// context/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getRedirectPath } from '@/utils/roleRoutes';

interface AuthContextType {
  user: any; // Accept any shape of user object
  setUser: (user: any) => void;
  clientLogout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('user');
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      if (user?.role) {
        router.push(getRedirectPath(user.role));
      }
      localStorage.setItem('user', JSON.stringify(user));
    } 
  }, [user]);

  const clientLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, clientLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
