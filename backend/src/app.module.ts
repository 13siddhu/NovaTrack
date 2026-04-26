import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { JobApplicationsModule } from './job-applications/job-applications.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [PrismaModule, AuthModule, JobApplicationsModule, NotificationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
