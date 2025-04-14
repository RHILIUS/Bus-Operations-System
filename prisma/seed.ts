import { PrismaClient } from '../app/generated/prisma';

const prisma = new PrismaClient();


async function main() {
  await prisma.quota_Policy.createMany({
    data: [
      {
        StartDate: new Date('2025-01-01'),
        EndDate: new Date('2025-06-30'),
      },
      {
        StartDate: new Date('2025-07-01'),
        EndDate: new Date('2025-12-31'),
      },
    ],
  });

}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
