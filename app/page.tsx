// app/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import { authStore } from '@/lib/auth-store';

export default function Home() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Wait a bit for Token_Generation to run
    const timer = setTimeout(() => {
      setIsInitialized(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      const { accessToken } = authStore.get();
      
      if (accessToken) {
        redirect('/dashboard');
      } else {
        redirect('/login');
      }
    }
  }, [isInitialized]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh' 
    }}>
      <div>Loading...</div>
    </div>
  );
}