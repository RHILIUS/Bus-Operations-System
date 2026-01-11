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
          
          // Check if refresh was successful
          if (data.success && data.accessToken) {
            // Store accessToken in memory
            authStore.setAccessToken(data.accessToken);
            
            console.log('Access token initialized successfully');
          } else {
            console.log('Token refresh failed:', data.message);
          }
        } else {
          console.log('No active session - user needs to login');
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error);
      }
    }

    initializeAuth();
  }, []);

  return null;
}