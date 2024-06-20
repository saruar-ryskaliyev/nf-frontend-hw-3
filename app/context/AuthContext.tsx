'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import nookies from 'nookies';

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (em: string, pw: string) => Promise<void>;
  register: (em: string, un: string, pw: string) => Promise<void>;
  logout: () => void;
  token: string | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const savedToken = nookies.get(null).token;
    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (em: string, pw: string) => {
    try {
      const response = await axios.post(
        'https://spotify-backend-r80g.onrender.com/api/auth/login',
        {
          email: em,
          password: pw
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const authToken = response.data.accessToken;
      setToken(authToken);
      setIsAuthenticated(true);
      nookies.set(null, 'accessToken', authToken, { maxAge: 7 * 24 * 60 * 60, path: '/' });
      router.push('/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error response:', error.response);
      } else {
        console.error('Unexpected error:', error);
      }
      throw error;
    }
  };

  const register = async (em: string, un: string, pw: string) => {
    try {
      await axios.post(
        'https://spotify-backend-r80g.onrender.com/api/auth/register',
        {
          email: em,
          username: un,
          password: pw
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      router.push('/login');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error response:', error.response);
      } else {
        console.error('Unexpected error:', error);
      }
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setIsAuthenticated(false);
    nookies.destroy(null, 'accessToken');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
