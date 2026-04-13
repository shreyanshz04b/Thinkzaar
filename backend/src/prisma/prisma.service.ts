import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

let clientInstance: PrismaClient | null = null;

function createPrismaClient(): PrismaClient {
  const pool = new pg.Pool({
    connectionString: process.env['DATABASE_URL'],
  });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0]);
}

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);
  readonly client: PrismaClient;

  constructor() {
    if (!clientInstance) {
      clientInstance = createPrismaClient();
    }
    this.client = clientInstance;
  }

  async onModuleInit(): Promise<void> {
    await this.client.$connect();
    this.logger.log('Database connected');
  }

  async onModuleDestroy(): Promise<void> {
    await this.client.$disconnect();
    this.logger.log('Database disconnected');
  }

  get db(): PrismaClient {
    return this.client;
  }
}
