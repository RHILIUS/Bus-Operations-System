import { authStore } from '@/lib/auth-store';

const Backend_BaseURL = process.env.NEXT_PUBLIC_Backend_BaseURL;

export async function authenticatedFetch(url: string, options: RequestInit = {}) {
  // Get accessToken from memory
  const { accessToken } = authStore.get();
  
  // Add Authorization header with accessToken
  const headers = new Headers(options.headers);
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }
  
  let response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include', // Still send cookies (for refreshToken)
  });
  
  // If 401, token expired - try to refresh
  if (response.status === 401) {
    const refreshResponse = await fetch(`${Backend_BaseURL}/api/Refresh-Token`, {
      method: 'POST',
      credentials: 'include', // Send refreshToken cookie
    });
    
    if (refreshResponse.ok) {
      const data = await refreshResponse.json();
      
      // Store new accessToken in memory
      if (data.accessToken) {
        authStore.setAccessToken(data.accessToken);
        
        // Retry original request with new token
        headers.set('Authorization', `Bearer ${data.accessToken}`);
        response = await fetch(url, {
          ...options,
          headers,
          credentials: 'include',
        });
      }
    } else {
      // Refresh failed, clear auth and redirect to login
      authStore.clear();
      window.location.href = '/login';
      throw new Error('Session expired');
    }
  }
  
  return response;
}
