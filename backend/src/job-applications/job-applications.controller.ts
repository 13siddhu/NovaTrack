import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { JobApplicationsService } from './job-applications.service';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { UpdateJobApplicationDto } from './dto/update-job-application.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Job Applications')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('job-applications')
export class JobApplicationsController {
  constructor(private readonly jobApplicationsService: JobApplicationsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new job application' })
  create(@Request() req: any, @Body() createJobApplicationDto: CreateJobApplicationDto) {
    return this.jobApplicationsService.create(req.user.userId, createJobApplicationDto);
  }

  @Get('analytics')
  @ApiOperation({ summary: 'Get application analytics for dashboard' })
  getAnalytics(@Request() req: any) {
    return this.jobApplicationsService.getAnalytics(req.user.userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all job applications for user' })
  findAll(@Request() req: any) {
    return this.jobApplicationsService.findAll(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific job application' })
  findOne(@Request() req: any, @Param('id') id: string) {
    return this.jobApplicationsService.findOne(req.user.userId, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a job application' })
  update(@Request() req: any, @Param('id') id: string, @Body() updateJobApplicationDto: UpdateJobApplicationDto) {
    return this.jobApplicationsService.update(req.user.userId, id, updateJobApplicationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a job application' })
  remove(@Request() req: any, @Param('id') id: string) {
    return this.jobApplicationsService.remove(req.user.userId, id);
  }
}
