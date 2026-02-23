import { FacultyService } from './faculty.service';
import { CreateFacultyDto } from './dto/create-faculty.dto';
import { UpdateFacultyDto } from './dto/update-faculty.dto';
export declare class FacultyController {
    private readonly facultyService;
    constructor(facultyService: FacultyService);
    create(createFacultyDto: CreateFacultyDto): import(".prisma/client").Prisma.Prisma__FacultyClient<{
        subjects: {
            name: string;
            id: string;
            code: string;
            contactHours: number;
            requiresLab: boolean;
        }[];
    } & {
        name: string;
        email: string;
        weeklyWorkload: number;
        unavailableSlots: string | null;
        id: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        subjects: {
            name: string;
            id: string;
            code: string;
            contactHours: number;
            requiresLab: boolean;
        }[];
    } & {
        name: string;
        email: string;
        weeklyWorkload: number;
        unavailableSlots: string | null;
        id: string;
    })[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__FacultyClient<{
        name: string;
        email: string;
        weeklyWorkload: number;
        unavailableSlots: string | null;
        id: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, updateFacultyDto: UpdateFacultyDto): import(".prisma/client").Prisma.Prisma__FacultyClient<{
        name: string;
        email: string;
        weeklyWorkload: number;
        unavailableSlots: string | null;
        id: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__FacultyClient<{
        name: string;
        email: string;
        weeklyWorkload: number;
        unavailableSlots: string | null;
        id: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
