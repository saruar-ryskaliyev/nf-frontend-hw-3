// app/layout.tsx
import { ReactNode } from 'react';
import './globals.css';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Head from 'next/head';


interface LayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
