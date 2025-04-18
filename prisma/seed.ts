import { PrismaClient } from '../app/generated/prisma';
import { generateFormattedID } from '../lib/idGenerator'

const prisma = new PrismaClient();

async function seedQuotaPolicy() {
  const quotaPolicyData = [
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
  ];

  // Generate formatted IDs and seed data
  for (let i = 0; i < quotaPolicyData.length; i++) {
    const quotaPolicyID = await generateFormattedID('quota_Policy', 'QuotaPolicyID', 'QTA')
    await prisma.quota_Policy.create({
      data: {
        QuotaPolicyID: quotaPolicyID,
        StartDate: quotaPolicyData[i].StartDate,
        EndDate: quotaPolicyData[i].EndDate,
      }
    });
  }

  console.log('Quota_Policy seeded');
}

async function seedFixed() {
  const quotaPolicies = await prisma.quota_Policy.findMany(); // Fetch all QuotaPolicy records

  const fixedData = [
    { FQuotaPolicyID: quotaPolicies[0].QuotaPolicyID, Quota: 1000 },
    { FQuotaPolicyID: quotaPolicies[2].QuotaPolicyID, Quota: 2000 },
  ];

  // Generate formatted IDs and seed data for Fixed
  for (let i = 0; i < fixedData.length; i++) {
    await prisma.fixed.create({
      data: {
        FQuotaPolicyID: fixedData[i].FQuotaPolicyID,
        Quota: fixedData[i].Quota,
      }
    });
  }

  console.log('Fixed seeded');
}

async function seedPercentage() {
  const quotaPolicies = await prisma.quota_Policy.findMany(); // Fetch all QuotaPolicy records

  const percentageData = [
    { PQuotaPolicyID: quotaPolicies[1].QuotaPolicyID, Percentage: 0.1 },
    { PQuotaPolicyID: quotaPolicies[3].QuotaPolicyID, Percentage: 0.2 },
  ];

  // Generate formatted IDs and seed data for Percentage
  for (let i = 0; i < percentageData.length; i++) {
    await prisma.percentage.create({
      data: {
        PQuotaPolicyID: percentageData[i].PQuotaPolicyID,
        Percentage: percentageData[i].Percentage,
      }
    });
  }

  console.log('Percentage seeded');
}

async function seedStops() {
  const stopData = [
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
  ];

  // Generate formatted IDs for each stop and seed data
  for (let i = 0; i < stopData.length; i++) {
    const stopID = await generateFormattedID('stop', 'StopID', 'STP')
    await prisma.stop.create({
      data: {
        StopID: stopID,
        StopName: stopData[i].StopName,
        Location: stopData[i].Location,
      }
    });
  }

  console.log('Stops seeded');
}

async function seedRoutes() {
  // Fetch all stops sorted by StopID
  const stops = await prisma.stop.findMany({
    orderBy: {
      StopID: 'asc',
    },
  });

  if (stops.length < 2) {
    throw new Error('Not enough stops to create routes.');
  }

  const startStopID = stops[0].StopID;
  const endStopID = stops[stops.length - 1].StopID;

  // Generate RouteID and create route: Sapang Palay to PITX
  const routeID1 = await generateFormattedID('route', 'RouteID', 'RT');
  await prisma.route.create({
    data: {
      RouteID: routeID1,
      StartStopID: startStopID,
      EndStopID: endStopID,
      RouteName: 'Sapang Palay to PITX',
    },
  });

  // Generate RouteID and create route: PITX to Sapang Palay
  const routeID2 = await generateFormattedID('route', 'RouteID', 'RT');
  await prisma.route.create({
    data: {
      RouteID: routeID2,
      StartStopID: endStopID,
      EndStopID: startStopID,
      RouteName: 'PITX to Sapang Palay',
    },
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

  // Seeding the RouteStops for the first route (Sapang Palay to PITX)
  for (const stop of sapangPalayToPITXStops) {
    const routeStopID = await generateFormattedID('routeStop', 'RouteStopID', 'RTS', 4);  // Generate the RouteStopID
    await prisma.routeStop.create({
      data: {
        RouteStopID: routeStopID, // Generated RouteStopID
        RouteID: route1.RouteID,  // Foreign key to the Route table
        StopID: stop.StopID,      // Foreign key to the Stop table
        StopOrder: stopOrder,     // Sequential order of stops
      },
    });
    stopOrder++;
  }

  // Route 2: PITX to Sapang Palay (reverse order)
  const route2 = routes[1]; // PITX to Sapang Palay route (assuming it's the second route)
  stopOrder = 1;

  // Seeding the RouteStops for the second route (PITX to Sapang Palay)
  for (let i = sapangPalayToPITXStops.length - 1; i >= 0; i--) {
    const stop = sapangPalayToPITXStops[i];
    const routeStopID = await generateFormattedID('routeStop', 'RouteStopID', 'RTS', 4);  // Generate the RouteStopID
    await prisma.routeStop.create({
      data: {
        RouteStopID: routeStopID,  // Generated RouteStopID
        RouteID: route2.RouteID,   // Foreign key to the Route table
        StopID: stop.StopID,       // Foreign key to the Stop table
        StopOrder: stopOrder,      // Sequential order of stops (in reverse order)
      },
    });
    stopOrder++;
  }

  console.log('RouteStops seeded successfully');
}

async function seedBusAssignments() {
  // Generate bus assignment IDs
  const busAssignmentID1 = await generateFormattedID('busAssignment', 'BusAssignmentID', 'BA');
  
  // Create each bus assignment one by one to avoid duplicate IDs
  await prisma.busAssignment.create({
    data: {
      BusAssignmentID: busAssignmentID1,
      BusID: "BUS-0001",
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
  });

  const busAssignmentID2 = await generateFormattedID('busAssignment', 'BusAssignmentID', 'BA');
  await prisma.busAssignment.create({
    data: {
      BusAssignmentID: busAssignmentID2,
      BusID: "BUS-0002",
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
  });

  console.log('Bus assignments seeded');
}

async function seedRegularBusAssignments() {

  const [busAssignments, quotaPolicies] = await Promise.all([
    prisma.busAssignment.findMany({
      orderBy: { AssignmentDate: 'asc' },  // Order by AssignmentDate or another field
      take: 2,  // Assuming you need the first two BusAssignments
    }),
    prisma.quota_Policy.findMany({
      orderBy: { StartDate: 'asc' },  // Order by StartDate or another field
      take: 2,  // Assuming you need the first two QuotaPolicies
    }),
  ]);

  if (busAssignments.length < 2 || quotaPolicies.length < 2) {
    throw new Error('Not enough BusAssignments or QuotaPolicies to create RegularBusAssignments.');
  }

  await prisma.regularBusAssignment.createMany({
    data: [
      {
        RegularBusAssignmentID: busAssignments[0].BusAssignmentID,  // Foreign key from BusAssignments
        DriverID: "DRV-0001",             // Assuming DriverID is from API
        ConductorID: "CDT-0001",          // Assuming ConductorID is from API
        QuotaPolicyID: quotaPolicies[0].QuotaPolicyID,          
        Change: 0.05,
        TripRevenue: 1200.50,
      },
      {
        RegularBusAssignmentID: busAssignments[1].BusAssignmentID,  // Foreign key from BusAssignments
        DriverID: "DRV-0002",             // Assuming DriverID is from API
        ConductorID: "CDT-0001",          // Assuming ConductorID is from API
        QuotaPolicyID: quotaPolicies[1].QuotaPolicyID,          
        Change: 0.07,
        TripRevenue: 1300.75,
      },
    ],
  });

  console.log('Regular bus assignments seeded');
}

async function seedBusRouteAssignments() {
  // Fetch existing BusAssignments and Routes to use their IDs as foreign keys
  const [busAssignments, routes] = await Promise.all([
    prisma.busAssignment.findMany({
      orderBy: { AssignmentDate: 'asc' },  // Ordering by AssignmentDate or another relevant field
      take: 2,  // Assuming you need the first two BusAssignments
    }),
    prisma.route.findMany({
      orderBy: { RouteID: 'asc' },  // Ordering by RouteID
      take: 2,  // Assuming you need the first two Routes
    }),
  ]);

  if (busAssignments.length < 2 || routes.length < 2) {
    throw new Error('Not enough BusAssignments or Routes to create BusRouteAssignments.');
  }

  // Create the first BusRouteAssignment
  await prisma.busRouteAssignment.create({
    data: {
      BusRouteAssignmentID: await generateFormattedID('busRouteAssignment', 'BusRouteAssignmentID', 'BRA', 4),  // Generate ID for first entry
      BusAssignmentID: busAssignments[0].BusAssignmentID,  // Foreign key from BusAssignments
      RouteID: routes[0].RouteID,  // Foreign key from Routes
    },
  });

  // Create the second BusRouteAssignment
  await prisma.busRouteAssignment.create({
    data: {
      BusRouteAssignmentID: await generateFormattedID('busRouteAssignment', 'BusRouteAssignmentID', 'BRA', 4),  // Generate ID for second entry
      BusAssignmentID: busAssignments[1].BusAssignmentID,  // Foreign key from BusAssignments
      RouteID: routes[1].RouteID,  // Foreign key from Routes
    },
  });

  console.log('Bus route assignments seeded');
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
