'use client';

import { ReactNode } from 'react';
import Head from 'next/head';
import './globals.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Header from './components/Header';

interface LayoutProps {
  children: ReactNode;
}


const ThemedBody = ({ children }: { children: ReactNode }) => {
  const { theme } = useTheme();
  const { isAuthenticated } = useAuth();

  return (
    <body className={theme === 'light' ? 'bg-white text-black' : 'bg-black text-white'}>
      {isAuthenticated && <Header />}
      {children}
    </body>
  );
};

const RootLayout = ({ children }: LayoutProps) => {
  return (
    <html lang="en">
    
      <AuthProvider>

        <ThemeProvider>

          <ThemedBody>

            {children}

          </ThemedBody>
        </ThemeProvider>
      </AuthProvider>
    </html>
  );
};

export default RootLayout;
