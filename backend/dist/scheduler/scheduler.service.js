"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulerService = void 0;
const common_1 = require("@nestjs/common");
const worker_threads_1 = require("worker_threads");
const path = __importStar(require("path"));
const prisma_service_1 = require("../prisma/prisma.service");
let SchedulerService = class SchedulerService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async generate() {
        const faculties = await this.prisma.faculty.findMany({ include: { subjects: true } });
        const rooms = await this.prisma.room.findMany();
        const subjects = await this.prisma.subject.findMany();
        const classGroups = await this.prisma.classGroup.findMany();
        const timeSlots = await this.prisma.timeSlot.findMany();
        return new Promise((resolve, reject) => {
            const workerPath = path.join(__dirname, 'worker.js');
            const worker = new worker_threads_1.Worker(workerPath, {
                workerData: { faculties, rooms, subjects, classGroups, timeSlots },
            });
            worker.on('message', async (schedule) => {
                try {
                    await this.prisma.scheduleEntry.deleteMany();
                    await this.prisma.scheduleEntry.createMany({ data: schedule });
                    resolve({ success: true, count: schedule.length });
                }
                catch (error) {
                    reject(error);
                }
            });
            worker.on('error', reject);
            worker.on('exit', (code) => {
                if (code !== 0)
                    reject(new Error(`Worker stopped with exit code ${code}`));
            });
        });
    }
    findAll() {
        return this.prisma.scheduleEntry.findMany({
            include: {
                faculty: true,
                room: true,
                subject: true,
                classGroup: true,
                timeslot: true,
            },
        });
    }
};
exports.SchedulerService = SchedulerService;
exports.SchedulerService = SchedulerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SchedulerService);
//# sourceMappingURL=scheduler.service.js.map