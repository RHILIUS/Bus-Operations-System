import { NextResponse } from 'next/server';
import prisma from '@/client'; // Importing the Prisma client instance to interact with the database

export async function GET() {
  try {
    const assignments = await prisma.regularBusAssignment.findMany({
        include: {
            BusAssignment: {
                include: {
                  Route: true,
                }
            },
            quotaPolicy: {
              include: {
                Fixed: true,
                Percentage: true,
              },
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


export async function POST(request: Request) {
  try {
    console.log('POST request received'); // Debugging

    const data = await request.json();
    console.log('Data received in API:', data); // Debugging

    // Step 1: Query the latest BusAssignmentID
    console.log('Querying the latest BusAssignmentID...'); // Debugging
    const latestAssignment = await prisma.busAssignment.findFirst({
      orderBy: {
        BusAssignmentID: 'desc', // Sort by BusAssignmentID in descending order
      },
    });

    console.log('Latest BusAssignment:', latestAssignment); // Debugging

    // Step 2: Extract the numeric part and increment it
    let newIdNumber = 1; // Default to 1 if no records exist
    if (latestAssignment) {
      const latestId = latestAssignment.BusAssignmentID; // e.g., "BA-0001"
      console.log('Latest BusAssignmentID:', latestId); // Debugging

      const numericPart = parseInt(latestId.split('-')[1], 10); // Extract "0001" and convert to number
      console.log('Extracted numeric part:', numericPart); // Debugging

      newIdNumber = numericPart + 1; // Increment the number
      console.log('New numeric part:', newIdNumber); // Debugging
    }

    // Step 3: Format the new BusAssignmentID
    const newBusAssignmentID = `BA-${newIdNumber.toString().padStart(4, '0')}`; // e.g., "BA-0002"
    console.log('Generated new BusAssignmentID:', newBusAssignmentID); // Debugging

    console.log('Querying the latest QuotaPolicyID...'); // Debugging
    const latestQuotaPolicy = await prisma.quota_Policy.findFirst({
      orderBy: {
        QuotaPolicyID: 'desc', // Sort by QuotaPolicyID in descending order
      },
    });

    console.log('Latest QuotaPolicy:', latestQuotaPolicy); // Debugging

    // Step 5: Extract the numeric part and increment it
    let newQuotaPolicyNumber = 1; // Default to 1 if no records exist
    if (latestQuotaPolicy) {
      const latestQuotaPolicyId = latestQuotaPolicy.QuotaPolicyID; // e.g., "QP-0001"
      console.log('Latest QuotaPolicyID:', latestQuotaPolicyId); // Debugging

      const numericPart = parseInt(latestQuotaPolicyId.split('-')[1], 10); // Extract "0001" and convert to number
      console.log('Extracted numeric part for QuotaPolicy:', numericPart); // Debugging

      newQuotaPolicyNumber = numericPart + 1; // Increment the number
      console.log('New numeric part for QuotaPolicy:', newQuotaPolicyNumber); // Debugging
    }

    // Step 6: Format the new QuotaPolicyID
    const newQuotaPolicyID = `QTA-${newQuotaPolicyNumber.toString().padStart(4, '0')}`; // e.g., "QP-0002"
    console.log('Generated new QuotaPolicyID:', newQuotaPolicyID); // Debugging

    // Step 7: Create a new QuotaPolicy
    console.log('Creating new QuotaPolicy...'); // Debugging
    const newQuotaPolicy = await prisma.quota_Policy.create({
      data: {
        QuotaPolicyID: newQuotaPolicyID, // Use the newly generated QuotaPolicyID
        StartDate: new Date(),
        EndDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // Example: 1 year validity
        ...(data.QuotaPolicy.type === 'Fixed'
          ? { Fixed: { create: { Quota: parseFloat(data.QuotaPolicy.value) } } }
          : { Percentage: { create: { Percentage: parseFloat(data.QuotaPolicy.value) / 100 } } }),
      },
    });

    console.log('New QuotaPolicy created:', newQuotaPolicy); // Debugging

    // Step 5: Create the new BusAssignment record along with RegularBusAssignment
    console.log('Creating new BusAssignment record...'); // Debugging
    const newAssignment = await prisma.busAssignment.create({
      data: {
        BusAssignmentID: newBusAssignmentID,
        BusID: data.BusID,
        RouteID: data.RouteID,
        AssignmentDate: new Date(data.AssignmentDate),
        Battery: data.Battery,
        Lights: data.Lights,
        Oil: data.Oil,
        Water: data.Water,
        Break: data.Break,
        Air: data.Air,
        Gas: data.Gas,
        Engine: data.Engine,
        TireCondition: data.TireCondition,
        Self: data.Self,
        RegularBusAssignment: {
          create: {
            DriverID: data.DriverID,
            ConductorID: data.ConductorID,
            QuotaPolicyID: newQuotaPolicy.QuotaPolicyID, // Link the newly created QuotaPolicy
            Change: data.Change,
            TripRevenue: data.TripRevenue,
          },
        },
      },
      include: {
        RegularBusAssignment: {
          include: {
            quotaPolicy: {
              include: {
                Fixed: true,
                Percentage: true,
              },
            },
          },
        },
      },
    });

    console.log('New BusAssignment created in database:', newAssignment); // Debugging
    return NextResponse.json(newAssignment);
  } catch (error) {
    console.error('Error creating BusAssignment:', error); // Debugging
    return NextResponse.json({ error: 'Failed to create BusAssignment' }, { status: 500 });
  }
}