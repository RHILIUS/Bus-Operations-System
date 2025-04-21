import { NextResponse } from 'next/server';
import prisma from '@/client'; // Importing the Prisma client instance to interact with the database

export async function GET() {
  try {
    const assignments = await prisma.regularBusAssignment.findMany({
        include: {
            BusAssignment: {
                select: {
                    BusID: true,
                }
            },
        }
    });
    console.log('Assignments from database:', assignments); // Debugging

    return NextResponse.json(assignments);
  } catch (error) {
    console.error('Error fetching bus route assignments:', error);
    return NextResponse.json({ error: 'Failed to fetch assignments' }, { status: 500 });
  }
}