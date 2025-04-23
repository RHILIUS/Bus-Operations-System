export async function fetchDrivers() {
    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/drivers`;
  
    const res = await fetch(url, {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
      },
    });
  
    if (!res.ok) {
      throw new Error(`Failed to fetch drivers: ${res.statusText}`);
    }
  
    return await res.json();
  }
  