import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { VoteType } from '@prisma/client';

@Injectable()
export class VotingService {
  constructor(private prisma: PrismaService) {}

  async vote(userId: string, entityId: string, type: 'problem' | 'solution', voteType: VoteType) {
    const data: any = { userId, type: voteType };
    if (type === 'problem') data.problemId = entityId;
    else data.solutionId = entityId;

    const existingVote = await this.prisma.db.vote.findFirst({
      where: {
        userId,
        problemId: type === 'problem' ? entityId : undefined,
        solutionId: type === 'solution' ? entityId : undefined,
      },
    });

    if (existingVote) {
      if (existingVote.type === voteType) {
        // Remove vote if same type clicked again
        return this.prisma.db.vote.delete({ where: { id: existingVote.id } });
      } else {
        // Change vote type
        return this.prisma.db.vote.update({
          where: { id: existingVote.id },
          data: { type: voteType },
        });
      }
    }

    return this.prisma.db.vote.create({ data });
  }
}
