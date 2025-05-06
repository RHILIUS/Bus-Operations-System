import { NextResponse } from 'next/server';
import prisma from '@/client'; 

export async function GET() {
  try {
    const stops = await prisma.stop.findMany({
      include: {
        routesAsStart: true,   // Gets all routes where this stop is the start
        routesAsEnd: true,     // Gets all routes where this stop is the end
        RouteStops: true       // Gets all route-stop associations
      }
    });

    console.log('Stops from database:', stops);

    return NextResponse.json(stops);
  } catch (error) {
    console.error('Error fetching stops:', error);
    return NextResponse.json({ error: 'Failed to fetch stops' }, { status: 500 });
  }
}
