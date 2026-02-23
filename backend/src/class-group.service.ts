import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CreateClassGroupDto } from './dto/create-class-group.dto';
import { UpdateClassGroupDto } from './dto/update-class-group.dto';

@Injectable()
export class ClassGroupService {
  constructor(private prisma: PrismaService) { }

  create(createClassGroupDto: CreateClassGroupDto) {
    return this.prisma.classGroup.create({ data: createClassGroupDto });
  }

  findAll() {
    return this.prisma.classGroup.findMany();
  }

  findOne(id: string) {
    return this.prisma.classGroup.findUnique({ where: { id } });
  }

  update(id: string, updateClassGroupDto: UpdateClassGroupDto) {
    return this.prisma.classGroup.update({
      where: { id },
      data: updateClassGroupDto,
    });
  }

  remove(id: string) {
    return this.prisma.classGroup.delete({ where: { id } });
  }
}
