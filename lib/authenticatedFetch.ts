const Backend_BaseURL = process.env.NEXT_PUBLIC_Backend_BaseURL;

export async function authenticatedFetch(url: string, options: RequestInit = {}) {
  let response = await fetch(url, {
    ...options,
    credentials: 'include', // Always include cookies
  });
  
  // If 401, token expired - try to refresh
  if (response.status === 401) {
    const refreshResponse = await fetch(`${Backend_BaseURL}/api/Refresh-Token`, {
      method: 'POST',
      credentials: 'include',
    });
    
    if (refreshResponse.ok) {
      // Tokens refreshed, retry original request
      response = await fetch(url, {
        ...options,
        credentials: 'include',
      });
    } else {
      // Refresh failed, redirect to login
      window.location.href = '/login';
      throw new Error('Session expired');
    }
  }
  
  return response;
}
