import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ProblemsModule } from './problems/problems.module';
import { SolutionsModule } from './solutions/solutions.module';
import { VotingModule } from './voting/voting.module';
import { RedisModule } from './redis/redis.module';
import { AiModule } from './ai/ai.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 100,
    }]),
    PrismaModule,
    RedisModule,
    AiModule,
    ChatModule,
    AuthModule,
    ProblemsModule,
    SolutionsModule,
    VotingModule,
  ],
})
export class AppModule {}
