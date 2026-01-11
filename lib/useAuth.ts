import { useEffect, useState } from 'react';
import { authStore } from './auth-store';

export function useAuth() {
  const [authState, setAuthState] = useState(authStore.get());

  useEffect(() => {
    // Subscribe to auth changes
    const unsubscribe = authStore.subscribe(() => {
      setAuthState(authStore.get());
    });

    // Cleanup subscription
    return unsubscribe;
  }, []);

  return {
    accessToken: authState.accessToken,
    role: authState.role,
    isAuthenticated: !!authState.accessToken,
    tokenVersion: authState.tokenVersion,
  };
}