import { NextRequest } from 'next/server';

interface User {
  userId: string;
  role?: string;
  email?: string;
}

interface AuthResult {
  user: User | null;
  error: string | null;
  status: number;
}

function extractTokenFromCookie(cookie: string | undefined): string | null {
  if (!cookie) return null;
  const jwtMatch = cookie.match(/(?:^|;\s*)jwt=([^;]+)/);
  const tokenMatch = cookie.match(/(?:^|;\s*)token=([^;]+)/);
  return jwtMatch?.[1] || tokenMatch?.[1] || null;
}

export async function authenticateRequest(request: NextRequest | Request): Promise<AuthResult> {
  try {
    const cookie = request.headers.get('cookie');
    const token = extractTokenFromCookie(cookie || '');

    if (!token) {
      return {
        user: null,
        error: 'Authentication required',
        status: 401,
      };
    }

    const verifyUrl = `${process.env.NEXT_PUBLIC_Backend_BaseURL}/api/VerifyToken`;
    
    const res = await fetch(verifyUrl, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` },
    });

    if (!res.ok) {
      return {
        user: null,
        error: 'Invalid or expired token',
        status: 401,
      };
    }

    const data = await res.json();

    if (!data.valid) {
      return {
        user: null,
        error: 'Invalid token',
        status: 401,
      };
    }

    return {
      user: {
        userId: data.user?.userId || data.user?.id || 'unknown',
        role: data.user?.role,
        email: data.user?.email,
      },
      error: null,
      status: 200,
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return {
      user: null,
      error: 'Authentication failed',
      status: 500,
    };
  }
}
