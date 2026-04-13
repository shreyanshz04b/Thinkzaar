import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProblemDto, UpdateProblemDto } from './dto/problem.dto';

@Injectable()
export class ProblemsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateProblemDto) {
    return this.prisma.db.problem.create({
      data: {
        ...dto,
        authorId: userId,
        slug: dto.title.toLowerCase().replace(/ /g, '-'), // Basic slugify
      },
    });
  }

  async findAll(cursor?: string, limit = 10) {
    return this.prisma.db.problem.findMany({
      take: limit,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { createdAt: 'desc' },
      include: { author: { select: { username: true } } },
    });
  }

  async findOne(id: string) {
    const problem = await this.prisma.db.problem.findUnique({
      where: { id },
      include: { author: { select: { username: true } }, solutions: true },
    });
    if (!problem) throw new NotFoundException('Problem not found');
    return problem;
  }

  async update(id: string, userId: string, dto: UpdateProblemDto) {
    const problem = await this.prisma.db.problem.findUnique({ where: { id } });
    if (!problem || problem.authorId !== userId) {
      throw new NotFoundException('Problem not found or unauthorized');
    }
    return this.prisma.db.problem.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string, userId: string) {
    const problem = await this.prisma.db.problem.findUnique({ where: { id } });
    if (!problem || problem.authorId !== userId) {
      throw new NotFoundException('Problem not found or unauthorized');
    }
    return this.prisma.db.problem.delete({ where: { id } });
  }
}
