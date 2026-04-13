import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { SolutionsService } from './solutions.service';
import { CreateSolutionDto } from './dto/solution.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('problems/:problemId/solutions')
export class SolutionsController {
  constructor(private readonly solutionsService: SolutionsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Param('problemId') problemId: string,
    @Req() req: any,
    @Body() createSolutionDto: CreateSolutionDto,
  ) {
    return this.solutionsService.create(req.user.sub, problemId, createSolutionDto);
  }

  @Get()
  findAll(@Param('problemId') problemId: string) {
    return this.solutionsService.findByProblem(problemId);
  }
}
