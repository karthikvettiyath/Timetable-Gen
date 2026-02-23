import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
export declare class RoomController {
    private readonly roomService;
    constructor(roomService: RoomService);
    create(createRoomDto: CreateRoomDto): import(".prisma/client").Prisma.Prisma__RoomClient<{
        name: string;
        id: string;
        capacity: number;
        isLab: boolean;
        hasProjector: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        name: string;
        id: string;
        capacity: number;
        isLab: boolean;
        hasProjector: boolean;
    }[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__RoomClient<{
        name: string;
        id: string;
        capacity: number;
        isLab: boolean;
        hasProjector: boolean;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, updateRoomDto: UpdateRoomDto): import(".prisma/client").Prisma.Prisma__RoomClient<{
        name: string;
        id: string;
        capacity: number;
        isLab: boolean;
        hasProjector: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__RoomClient<{
        name: string;
        id: string;
        capacity: number;
        isLab: boolean;
        hasProjector: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
