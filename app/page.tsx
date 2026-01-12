"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authStore } from '@/lib/auth-store';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Wait for auth initialization to complete
    authStore.onInitialized(() => {
      const { accessToken } = authStore.get();
      
      if (accessToken) {
        // User has valid token - go to dashboard
        router.push('/bus-assignment');
      } else {
        // No token - go to login
        router.push('/login');
      }
    });
  }, [router]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      flexDirection: 'column',
      gap: '20px',
      backgroundColor: '#f5f5f5'
    }}>
      {/* Loading Spinner */}
      <div 
        className="spinner" 
        style={{
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #961c1e',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          animation: 'spin 1s linear infinite'
        }}
      />
      
      {/* Loading Text */}
      <div style={{
        fontSize: '18px',
        color: '#333',
        fontWeight: 500
      }}>
        Initializing...
      </div>
      
      {/* Spinner Animation */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}