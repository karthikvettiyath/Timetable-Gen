import { SchedulerService } from './scheduler.service';
export declare class SchedulerController {
    private readonly schedulerService;
    constructor(schedulerService: SchedulerService);
    generate(): Promise<unknown>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        faculty: {
            name: string;
            email: string;
            weeklyWorkload: number;
            unavailableSlots: string | null;
            id: string;
        };
        room: {
            name: string;
            id: string;
            capacity: number;
            isLab: boolean;
            hasProjector: boolean;
        };
        subject: {
            name: string;
            id: string;
            code: string;
            contactHours: number;
            requiresLab: boolean;
        };
        classGroup: {
            name: string;
            id: string;
        };
        timeslot: {
            id: string;
            dayOfWeek: number;
            startTime: string;
            endTime: string;
        };
    } & {
        id: string;
        classGroupId: string;
        subjectId: string;
        facultyId: string;
        roomId: string;
        timeslotId: string;
    })[]>;
}
