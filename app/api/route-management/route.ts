import { NextResponse } from 'next/server';
import prisma from '@/client'; // Adjust the import path based on your setup

export async function GET() {
  try {
    const routes = await prisma.route.findMany({
      include: {
        StartStop: true, // Include details of the start stop
        EndStop: true,   // Include details of the end stop
      },
    });

    return NextResponse.json(routes);
  } catch (error) {
    console.error('Error fetching routes:', error);
    return NextResponse.json({ error: 'Failed to fetch routes' }, { status: 500 });
  }
}