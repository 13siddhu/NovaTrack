import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Resend } from 'resend';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);
  private readonly resend: Resend;

  constructor(private prisma: PrismaService) {
    this.resend = new Resend(process.env.RESEND_API_KEY || 're_test_key');
  }

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
      include: {
        user: true, // Fetch user to get email address
      },
    });

    for (const app of applicationsToFollowUp) {
      const message = `Reminder: Follow up with ${app.companyName} for the ${app.jobRole} position today.`;
      
      // 1. Create In-App Notification
      await this.prisma.notification.create({
        data: {
          userId: app.userId,
          message,
        },
      });

      // 2. Send Email via Resend
      if (process.env.RESEND_API_KEY && app.user.email) {
        try {
          await this.resend.emails.send({
            from: 'NovaTrack Reminders <onboarding@resend.dev>',
            to: app.user.email,
            subject: `Action Required: Follow up with ${app.companyName}`,
            html: `
              <h2>NovaTrack Reminder</h2>
              <p>Hi there,</p>
              <p>This is a friendly reminder that you have a scheduled follow-up today:</p>
              <ul>
                <li><strong>Company:</strong> ${app.companyName}</li>
                <li><strong>Role:</strong> ${app.jobRole}</li>
                <li><strong>Status:</strong> ${app.status}</li>
              </ul>
              <p>Good luck!</p>
              <br/>
              <p><small>Sent automatically from your NovaTrack Dashboard.</small></p>
            `,
          });
          this.logger.log(`Sent email reminder to ${app.user.email}`);
        } catch (error) {
          this.logger.error(`Failed to send email to ${app.user.email}:`, error);
        }
      }

      this.logger.log(`Created notification for user ${app.userId} regarding ${app.companyName}`);
    }
  }
}
