import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Req } from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { CreateProblemDto, UpdateProblemDto } from './dto/problem.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('problems')
export class ProblemsController {
  constructor(private readonly problemsService: ProblemsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Req() req: any, @Body() createProblemDto: CreateProblemDto) {
    return this.problemsService.create(req.user.sub, createProblemDto);
  }

  @Get()
  findAll(@Query('cursor') cursor?: string, @Query('limit') limit?: string) {
    return this.problemsService.findAll(cursor, limit ? parseInt(limit) : 10);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.problemsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Req() req: any, @Body() updateProblemDto: UpdateProblemDto) {
    return this.problemsService.update(id, req.user.sub, updateProblemDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @Req() req: any) {
    return this.problemsService.remove(id, req.user.sub);
  }
}
