import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CreateTimeSlotDto } from './dto/create-time-slot.dto';
import { UpdateTimeSlotDto } from './dto/update-time-slot.dto';

@Injectable()
export class TimeSlotService {
  constructor(private prisma: PrismaService) { }

  create(createTimeSlotDto: CreateTimeSlotDto) {
    return this.prisma.timeSlot.create({ data: createTimeSlotDto });
  }

  findAll() {
    return this.prisma.timeSlot.findMany();
  }

  findOne(id: string) {
    return this.prisma.timeSlot.findUnique({ where: { id } });
  }

  update(id: string, updateTimeSlotDto: UpdateTimeSlotDto) {
    return this.prisma.timeSlot.update({
      where: { id },
      data: updateTimeSlotDto,
    });
  }

  remove(id: string) {
    return this.prisma.timeSlot.delete({ where: { id } });
  }
}
