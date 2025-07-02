"use client"
import { createContext, ReactNode, use, useEffect, useState } from 'react'

const AuthContext = createContext<AuthContextType>({} as AuthContextType)
interface AuthContextType {
  user: FormatUser | null;
  setUser: (user: FormatUser | null) => void;
}

export interface FormatUser {
  name: string;
  email: string;
  password: string;
  token: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<FormatUser | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, []);
  const values: AuthContextType = {
    user,
    setUser,
  }
  return (
    <AuthContext value={values}>
      {children}
    </AuthContext>
  )
}
export const useAuth = () => {
  const context = use(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return context
} 