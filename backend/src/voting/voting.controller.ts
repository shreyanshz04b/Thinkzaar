import { Controller, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { VotingService } from './voting.service';
import { VoteType } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('vote')
export class VotingController {
  constructor(private readonly votingService: VotingService) {}

  @Post('problem/:id')
  @UseGuards(JwtAuthGuard)
  voteProblem(@Param('id') id: string, @Req() req: any, @Body('type') type: VoteType) {
    return this.votingService.vote(req.user.sub, id, 'problem', type);
  }

  @Post('solution/:id')
  @UseGuards(JwtAuthGuard)
  voteSolution(@Param('id') id: string, @Req() req: any, @Body('type') type: VoteType) {
    return this.votingService.vote(req.user.sub, id, 'solution', type);
  }
}
