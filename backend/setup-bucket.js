require('dotenv/config');
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  try {
    await prisma.$executeRawUnsafe(`INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio', 'portfolio', true) ON CONFLICT (id) DO NOTHING;`);
    console.log('Bucket created successfully!');
  } catch (e) {
    console.error('Error creating bucket:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
