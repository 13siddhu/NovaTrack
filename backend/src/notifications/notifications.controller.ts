import { Controller, Get, Patch, Post, Param, UseGuards, Request, Headers, UnauthorizedException } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Notifications')
@ApiBearerAuth()
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all notifications for user' })
  findAll(@Request() req: any) {
    return this.notificationsService.findAll(req.user.userId);
  }

  @Patch(':id/read')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Mark notification as read' })
  markAsRead(@Request() req: any, @Param('id') id: string) {
    return this.notificationsService.markAsRead(req.user.userId, id);
  }

  @Post('cron')
  @ApiOperation({ summary: 'Trigger daily notifications (Vercel Cron)' })
  async triggerCron(@Headers('authorization') authHeader: string) {
    const cronSecret = process.env.CRON_SECRET;
    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      throw new UnauthorizedException('Invalid cron secret');
    }
    await this.notificationsService.triggerDailyNotifications();
    return { success: true, message: 'Cron executed successfully' };
  }
}
