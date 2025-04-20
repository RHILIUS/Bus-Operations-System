export async function fetchBuses() {
    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/buses`;
  
    const res = await fetch(url, {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
      },
    });
  
    if (!res.ok) {
      throw new Error(`Failed to fetch buses: ${res.statusText}`);
    }
  
    return await res.json();
  }
  