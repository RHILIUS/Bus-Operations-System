'use client';

import { useEffect } from 'react';
import { authStore } from '@/lib/auth-store';

export default function Token_Generation() {
  useEffect(() => {
    async function initializeAuth() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_Backend_BaseURL}/api/auth/refresh`,
          {
            method: 'POST',
            credentials: 'include', // Sends the refreshToken cookie
          }
        );

        if (response.ok) {
          const data = await response.json();
          
          // Store accessToken in memory
          authStore.setAccessToken(data.accessToken);
          
          // Optionally store role if returned
          if (data.role) {
            authStore.setRole(data.role);
          }
          
          console.log('Access token initialized successfully');
        } else {
          console.log('No active session - user needs to login');
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error);
      }
    }

    initializeAuth();
  }, []);

  // This component doesn't render anything visible
  return null;
}