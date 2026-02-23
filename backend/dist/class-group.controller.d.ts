import { ClassGroupService } from './class-group.service';
import { CreateClassGroupDto } from './dto/create-class-group.dto';
import { UpdateClassGroupDto } from './dto/update-class-group.dto';
export declare class ClassGroupController {
    private readonly classGroupService;
    constructor(classGroupService: ClassGroupService);
    create(createClassGroupDto: CreateClassGroupDto): import(".prisma/client").Prisma.Prisma__ClassGroupClient<{
        name: string;
        id: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        name: string;
        id: string;
    }[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__ClassGroupClient<{
        name: string;
        id: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, updateClassGroupDto: UpdateClassGroupDto): import(".prisma/client").Prisma.Prisma__ClassGroupClient<{
        name: string;
        id: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__ClassGroupClient<{
        name: string;
        id: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
