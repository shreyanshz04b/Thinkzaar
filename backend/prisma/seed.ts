import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await argon2.hash('password123');
  
  const user = await prisma.user.upsert({
    where: { email: 'admin@thinkzaar.com' },
    update: {},
    create: {
      email: 'admin@thinkzaar.com',
      username: 'admin',
      passwordHash,
      role: 'ADMIN',
    },
  });

  await prisma.problem.create({
    data: {
      title: 'How to scale local embeddings?',
      slug: 'how-to-scale-local-embeddings',
      description: 'We are using Xenova transformers but need to scale to millions of requests.',
      authorId: user.id,
      status: 'OPEN',
    },
  });

  console.log('Seed completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
