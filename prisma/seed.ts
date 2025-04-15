import { PrismaClient } from '../app/generated/prisma';

const prisma = new PrismaClient();

async function seedQuotaPolicy() {
  await prisma.quota_Policy.createMany({
    data: [
      {
        StartDate: new Date('2025-01-04T08:00:00'), // 8:00 AM
        EndDate: new Date('2025-01-04T18:00:00'),   // 6:00 PM
      },
      {
        StartDate: new Date('2025-07-04T09:00:00'), // 9:00 AM
        EndDate: new Date('2025-07-04T17:00:00'),   // 5:00 PM
      },
      {
        StartDate: new Date('2025-10-04T08:00:00'), // 8:00 AM
        EndDate: new Date('2025-10-04T18:00:00'),   // 6:00 PM
      },
      {
        StartDate: new Date('2025-12-04T09:00:00'), // 9:00 AM
        EndDate: new Date('2025-12-04T17:00:00'),   // 5:00 PM
      },
    ],
  });
  console.log('Quota_Policy seeded');
}

async function seedFixed() {
  await prisma.fixed.createMany({
    data: [
      { FQuotaPolicyID: 1, Quota: 1000 },
      { FQuotaPolicyID: 3, Quota: 2000 },
    ],
  });
  console.log('Fixed seeded');
}

async function seedPercentage() {
  await prisma.percentage.createMany({
    data: [
      { PQuotaPolicyID: 2, Percentage: 0.1 },
      { PQuotaPolicyID: 4, Percentage: 0.2 },
    ],
  });
  console.log('Percentage seeded');
}

async function seedStops() {
  await prisma.stop.createMany({
    data: [
      { StopName: "Sapang Palay Terminal", Location: "14.8139,121.0452" },
      { StopName: "San Jose City Hall", Location: "14.813,121.045" },
      { StopName: "Muzon", Location: "14.8135,121.0455" },
      { StopName: "Gaya-Gaya", Location: "14.8137,121.0457" },
      { StopName: "Grotto", Location: "14.814,121.046" },
      { StopName: "SM City San Jose del Monte", Location: "14.8142,121.0462" },
      { StopName: "SM City Fairview", Location: "14.815,121.0465" },
      { StopName: "Commonwealth/Regalado Avenue", Location: "14.8155,121.0467" },
      { StopName: "Tandang Sora", Location: "14.816,121.047" },
      { StopName: "Central Avenue", Location: "14.8165,121.0472" },
      { StopName: "UP Ayala Techno Hub", Location: "14.817,121.0475" },
      { StopName: "Philcoa", Location: "14.8175,121.0477" },
      { StopName: "PCMC", Location: "14.818,121.048" },
      { StopName: "Lung Center of the Philippines", Location: "14.8185,121.0482" },
      { StopName: "Quezon City Hall Interchange", Location: "14.819,121.0485" },
      { StopName: "EDSA-Quezon Avenue", Location: "14.8195,121.0487" },
      { StopName: "Quezon-Timog Avenue", Location: "14.82,121.049" },
      { StopName: "Fisher Mall/Pantranco", Location: "14.8205,121.0492" },
      { StopName: "Fisher Mall", Location: "14.821,121.0495" },
      { StopName: "Morayta", Location: "14.8215,121.0497" },
      { StopName: "Quiapo", Location: "14.822,121.05" },
      { StopName: "UN Avenue", Location: "14.8225,121.0502" },
      { StopName: "Leveriza", Location: "14.823,121.0505" },
      { StopName: "Gil Puyat/Harrison", Location: "14.8235,121.0507" },
      { StopName: "Shell Residences", Location: "14.824,121.051" },
      { StopName: "Mall of Asia", Location: "14.8245,121.0512" },
      { StopName: "DFA (temporary)", Location: "14.825,121.0515" },
      { StopName: "Ayala Malls Manila Bay (temporary)", Location: "14.8255,121.0517" },
      { StopName: "PITX Arrivals/Transfers", Location: "14.826,121.052" },
    ],
  });
}

async function seedRoutes() {
  // Fetch the first and last stop from the Stop table
  const stops = await prisma.stop.findMany({
    orderBy: {
      StopID: 'asc',  // Assumes StopID is incremental and the first entry will be the lowest
    },
  });

  if (stops.length < 2) {
    throw new Error('Not enough stops to create a route.');
  }

  const startStopID = stops[0].StopID; // First Stop (StartStop)
  const endStopID = stops[stops.length - 1].StopID; // Last Stop (EndStop)

  // Seeding the Route table
  await prisma.route.createMany({
    data: [
      {
        StartStopID: startStopID,
        EndStopID: endStopID,
        RouteName: 'Sapang Palay to PITX',  
      },
      {
        StartStopID: endStopID, //Reverse the order for the return trip
        EndStopID: startStopID, // Reverse the order for the return trip
        RouteName: 'PITX to Sapang Palay', 
      }
    ],
  });

  console.log('Routes seeded successfully');
}

async function seedRouteStops() {
  // Fetch all routes and stops
  const routes = await prisma.route.findMany();
  const stops = await prisma.stop.findMany();

  if (routes.length === 0 || stops.length === 0) {
    throw new Error('No routes or stops found.');
  }

  // Get the stops for the Sapang Palay to PITX route in the correct order
  const sapangPalayToPITXStops = stops.slice(0, stops.length); // Assuming stops are ordered correctly in the database

  // Route 1: Sapang Palay to PITX (normal order)
  const route1 = routes[0]; // Sapang Palay to PITX route
  let stopOrder = 1;
  for (const stop of sapangPalayToPITXStops) {
    await prisma.routeStop.create({
      data: {
        RouteID: route1.RouteID,
        StopID: stop.StopID,
        StopOrder: stopOrder,
      },
    });
    stopOrder++;
  }

  // Route 2: PITX to Sapang Palay (reversed order)
  const route2 = routes[1]; // PITX to Sapang Palay route
  stopOrder = 1;
  for (let i = sapangPalayToPITXStops.length - 1; i >= 0; i--) {
    const stop = sapangPalayToPITXStops[i];
    await prisma.routeStop.create({
      data: {
        RouteID: route2.RouteID,
        StopID: stop.StopID,
        StopOrder: stopOrder,
      },
    });
    stopOrder++;
  }

  console.log('RouteStops seeded successfully for both routes');
}

async function seedBusAssignments() {
  await prisma.busAssignment.createMany({
    data: [
      {
        BusID: 101,
        AssignmentDate: new Date('2025-04-15'),
        Battery: true,
        Lights: true,
        Oil: true,
        Water: true,
        Break: true,
        Air: true,
        Gas: true,
        Engine: true,
        TireCondition: true,
        Self: true,
      },
      {
        BusID: 102,
        AssignmentDate: new Date('2025-04-16'),
        Battery: false,
        Lights: true,
        Oil: true,
        Water: false,
        Break: true,
        Air: true,
        Gas: true,
        Engine: true,
        TireCondition: false,
        Self: true,
      },
    ],
  });
}

async function seedRegularBusAssignments() {
  await prisma.regularBusAssignment.createMany({
    data: [
      {
        RegularBusAssignmentID: 1, 
        DriverID: 501,             // Assuming DriverID is from API
        ConductorID: 601,          // Assuming ConductorID is from API
        QuotaPolicyID: 1,          
        Change: 0.05,
        TripRevenue: 1200.50,
      },
      {
        RegularBusAssignmentID: 2, 
        DriverID: 502,             // Assuming DriverID is from API
        ConductorID: 602,          // Assuming ConductorID is from API
        QuotaPolicyID: 2,          
        Change: 0.07,
        TripRevenue: 1300.75,
      },
    ],
  });
}

async function seedBusRouteAssignments() {
  await prisma.busRouteAssignment.createMany({
    data: [
      {
        BusAssignmentID: 1, 
        RouteID: 1,          
      },
      {
        BusAssignmentID: 2, 
        RouteID: 2,          
      },
    ],
  });
}

async function main() {
  await seedQuotaPolicy();
  await seedFixed();
  await seedPercentage();
  await seedStops();
  await seedRoutes();
  await seedRouteStops();
  await seedBusAssignments();
  await seedRegularBusAssignments();
  await seedBusRouteAssignments();
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
