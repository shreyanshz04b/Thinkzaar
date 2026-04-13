import { Injectable, OnModuleInit } from '@nestjs/common';
import { pipeline } from '@xenova/transformers';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AiService implements OnModuleInit {
  private extractor: any;

  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    this.extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
  }

  async generateEmbedding(text: string): Promise<number[]> {
    const output = await this.extractor(text, { pooling: 'mean', normalize: true });
    return Array.from(output.data);
  }

  async rankSolutions(problemId: string) {
    const problem = await this.prisma.db.problem.findUnique({
      where: { id: problemId },
      include: { aiEmbedding: true },
    });

    if (!problem || !problem.aiEmbedding) return;

    const solutions = await this.prisma.db.solution.findMany({
      where: { problemId },
      include: { aiEmbedding: true },
    });

    // Simple cosine similarity or similar logic can be implemented here
    // For now, we'll just return solutions sorted by some logic
    return solutions;
  }
}
