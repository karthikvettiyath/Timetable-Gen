import { Module } from '@nestjs/common';
import { ClassGroupService } from './class-group.service';
import { ClassGroupController } from './class-group.controller';

@Module({
  controllers: [ClassGroupController],
  providers: [ClassGroupService],
})
export class ClassGroupModule {}
