import { PrismaClient } from './app/generated/prisma';

let prisma = new PrismaClient();

export default prisma;

// CODE ABOVE IS USED TO ONLY CREATE A SINGLE INSTANCE OF PRISMA CLIENT
// AND PREVENTS MULTIPLE INSTANCES FROM BEING CREATED

//REUSE THIS CODE IN OTHER FILES