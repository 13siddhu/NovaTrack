import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { UpdateJobApplicationDto } from './dto/update-job-application.dto';

@Injectable()
export class JobApplicationsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, data: CreateJobApplicationDto) {
    return this.prisma.jobApplication.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.jobApplication.findMany({
      where: { userId },
      orderBy: { appliedDate: 'desc' },
    });
  }

  async findOne(userId: string, id: string) {
    const app = await this.prisma.jobApplication.findFirst({
      where: { id, userId },
    });
    if (!app) throw new NotFoundException('Job application not found');
    return app;
  }

  async update(userId: string, id: string, data: UpdateJobApplicationDto) {
    await this.findOne(userId, id); // check existence
    return this.prisma.jobApplication.update({
      where: { id },
      data,
    });
  }

  async remove(userId: string, id: string) {
    await this.findOne(userId, id); // check existence
    return this.prisma.jobApplication.delete({
      where: { id },
    });
  }

  async getAnalytics(userId: string) {
    const total = await this.prisma.jobApplication.count({ where: { userId } });
    const interviews = await this.prisma.jobApplication.count({ where: { userId, status: 'Interview' } });
    const rejected = await this.prisma.jobApplication.count({ where: { userId, status: 'Rejected' } });
    const offers = await this.prisma.jobApplication.count({ where: { userId, status: 'Offer' } });

    // Group by month
    const applications = await this.prisma.jobApplication.findMany({
      where: { userId },
      select: { appliedDate: true, status: true },
    });

    const statusBreakdown = [
      { name: 'Applied', value: total - interviews - rejected - offers },
      { name: 'Interview', value: interviews },
      { name: 'Rejected', value: rejected },
      { name: 'Offer', value: offers },
    ];

    return { total, interviews, rejected, offers, statusBreakdown, applications };
  }
}
