import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(private prisma: PrismaService) {}

  async findAll(userId: string) {
    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async markAsRead(userId: string, id: string) {
    return this.prisma.notification.update({
      where: { id, userId },
      data: { isRead: true },
    });
  }

  // This will be called by Vercel Cron via an API endpoint
  async triggerDailyNotifications() {
    this.logger.debug('Running daily check for job application follow-ups...');
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const applicationsToFollowUp = await this.prisma.jobApplication.findMany({
      where: {
        nextFollowUp: {
          gte: today,
          lt: tomorrow,
        },
      },
    });

    for (const app of applicationsToFollowUp) {
      await this.prisma.notification.create({
        data: {
          userId: app.userId,
          message: `Reminder: Follow up with \${app.companyName} for the \${app.jobRole} position today.`,
        },
      });
      this.logger.log(`Created notification for user \${app.userId} regarding \${app.companyName}`);
    }
  }
}
