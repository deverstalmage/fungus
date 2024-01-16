import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Devers',
    fungi: {
      create: [
        {
          fungusId: 1,
        },
        {
          fungusId: 2,
        },
        {
          fungusId: 11,
        },
        {
          fungusId: 10,
        },
        {
          fungusId: 12,
        },
        {
          fungusId: 1,
        },
      ],
    },
    items: {
      create: [
        {
          itemId: 1,
        },
        {
          itemId: 5,
        }
      ],
    },
    gardenPlots: {
      create: [
        {}
      ]
    }
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });