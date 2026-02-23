import { TimeSlotService } from './time-slot.service';
import { CreateTimeSlotDto } from './dto/create-time-slot.dto';
import { UpdateTimeSlotDto } from './dto/update-time-slot.dto';
export declare class TimeSlotController {
    private readonly timeSlotService;
    constructor(timeSlotService: TimeSlotService);
    create(createTimeSlotDto: CreateTimeSlotDto): import(".prisma/client").Prisma.Prisma__TimeSlotClient<{
        id: string;
        dayOfWeek: number;
        startTime: string;
        endTime: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        dayOfWeek: number;
        startTime: string;
        endTime: string;
    }[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__TimeSlotClient<{
        id: string;
        dayOfWeek: number;
        startTime: string;
        endTime: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, updateTimeSlotDto: UpdateTimeSlotDto): import(".prisma/client").Prisma.Prisma__TimeSlotClient<{
        id: string;
        dayOfWeek: number;
        startTime: string;
        endTime: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__TimeSlotClient<{
        id: string;
        dayOfWeek: number;
        startTime: string;
        endTime: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
