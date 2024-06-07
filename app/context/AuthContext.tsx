'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import axiosInstance from '../axiosInstance';  

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (us: string, pw: string) => Promise<void>;
  logout: () => void;
  token: string | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedToken = localStorage.getItem('token');
      if (savedToken) {
        setToken(savedToken);
        setIsAuthenticated(true);
      }
    }
  }, []);

  const login = async (us: string, pw: string) => {
    try {
      const response = await axios.post(
        'https://dummyjson.com/auth/login',
        {
          username: us,
          password: pw,
          expiresInMins: 30, // optional parameter
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const authToken = response.data.token;
      setToken(authToken);
      setIsAuthenticated(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', authToken);
      }
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

  const logout = () => {
    setToken(null);
    setIsAuthenticated(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, token }}>
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
