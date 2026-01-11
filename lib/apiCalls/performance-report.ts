import { PERFORMANCE_REPORT_URL } from '@/lib/urls';

const Backend_BaseURL = process.env.NEXT_PUBLIC_Backend_BaseURL;

if (!Backend_BaseURL) {
  throw new Error("NEXT_PUBLIC_Backend_BaseURL is not defined");
}

export async function fetchPerformanceDetails(): Promise<any> {
  const response = await fetch(PERFORMANCE_REPORT_URL, { credentials: 'include' });
  if (!response.ok) {
    throw new Error(`Failed to fetch assignment details: ${response.statusText}`);
  }
  return response.json();
}
