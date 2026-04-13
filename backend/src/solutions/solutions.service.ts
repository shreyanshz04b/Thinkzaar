import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSolutionDto } from './dto/solution.dto';

@Injectable()
export class SolutionsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, problemId: string, dto: CreateSolutionDto) {
    const problem = await this.prisma.db.problem.findUnique({ where: { id: problemId } });
    if (!problem) throw new NotFoundException('Problem not found');

    return this.prisma.db.solution.create({
      data: {
        ...dto,
        authorId: userId,
        problemId: problemId,
      },
    });
  }

  async findByProblem(problemId: string) {
    return this.prisma.db.solution.findMany({
      where: { problemId },
      include: { author: { select: { username: true } } },
      orderBy: { voteScore: 'desc' },
    });
  }
}
