import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { FacultyModule } from './faculty.module';
import { RoomModule } from './room.module';
import { SubjectModule } from './subject.module';
import { ClassGroupModule } from './class-group.module';
import { TimeSlotModule } from './time-slot.module';
import { SchedulerModule } from './scheduler/scheduler.module';

@Module({
  imports: [PrismaModule, FacultyModule, RoomModule, SubjectModule, ClassGroupModule, TimeSlotModule, SchedulerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
