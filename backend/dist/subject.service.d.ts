import { PrismaService } from './prisma/prisma.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
export declare class SubjectService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createSubjectDto: CreateSubjectDto): import(".prisma/client").Prisma.Prisma__SubjectClient<{
        name: string;
        id: string;
        code: string;
        contactHours: number;
        requiresLab: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        name: string;
        id: string;
        code: string;
        contactHours: number;
        requiresLab: boolean;
    }[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__SubjectClient<{
        name: string;
        id: string;
        code: string;
        contactHours: number;
        requiresLab: boolean;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, updateSubjectDto: UpdateSubjectDto): import(".prisma/client").Prisma.Prisma__SubjectClient<{
        name: string;
        id: string;
        code: string;
        contactHours: number;
        requiresLab: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__SubjectClient<{
        name: string;
        id: string;
        code: string;
        contactHours: number;
        requiresLab: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
