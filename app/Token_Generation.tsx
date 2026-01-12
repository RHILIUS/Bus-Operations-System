'use client';

import { useEffect } from 'react';
import { authStore } from '@/lib/auth-store';

export default function Token_Generation() {
  useEffect(() => {
    async function refreshToken() {
      try {
        const response = await fetch('/api/auth/refresh', {
          method: 'POST',
          credentials: 'include',
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.accessToken) {
            authStore.setAccessToken(data.accessToken);
            // Optionally set role if returned
            if (data.role) {
              authStore.setRole(data.role);
            }
          }
        } else {
          console.log('No active session - user needs to login');
        }
      } catch (error) {
        console.error('Token refresh failed:', error);
      } finally {
        // ✅ CRITICAL: Always mark as initialized, even if refresh failed
        // This ensures the app doesn't hang waiting for initialization
        authStore.markInitialized();
      }
    }
    
    refreshToken();
  }, []);
  
  return null;
}