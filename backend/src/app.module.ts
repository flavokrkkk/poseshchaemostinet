import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { UniversityModule } from "./university/university.module";
import { GroupModule } from "./group/group.module";
import { UserModule } from "./user/user.module";
import { InviteModule } from "./invite/invite.module";
import { AttendanceModule } from "./attendance/attendance.module";
import { LessonModule } from "./lesson/lesson.module";
import { ScheduleModule } from "./schedule/schedule.module";
import { EventModule } from './event/event.module';
import { NewsModule } from './news/news.module';
import { TemplateLessonModule } from './template-lesson/template-lesson.module';
import { FileModule } from './file/file.module';
import { AchievementModule } from './achievement/achievement.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UniversityModule,
    GroupModule,
    UserModule,
    InviteModule,
    ScheduleModule,
    LessonModule,
    AttendanceModule,
    EventModule,
    NewsModule,
    TemplateLessonModule,
    FileModule,
    AchievementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
