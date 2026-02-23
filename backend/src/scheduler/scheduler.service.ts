import { Injectable } from '@nestjs/common';
import { Worker } from 'worker_threads';
import * as path from 'path';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SchedulerService {
    constructor(private prisma: PrismaService) { }

    async generate() {
        const faculties = await this.prisma.faculty.findMany({ include: { subjects: true } });
        const rooms = await this.prisma.room.findMany();
        const subjects = await this.prisma.subject.findMany();
        const classGroups = await this.prisma.classGroup.findMany();
        const timeSlots = await this.prisma.timeSlot.findMany();

        return new Promise((resolve, reject) => {
            // Note: we use .js because NestJS compiles TS to JS in the dist folder
            const workerPath = path.join(__dirname, 'worker.js');
            const worker = new Worker(workerPath, {
                workerData: { faculties, rooms, subjects, classGroups, timeSlots },
            });

            worker.on('message', async (schedule) => {
                try {
                    await this.prisma.scheduleEntry.deleteMany();
                    await this.prisma.scheduleEntry.createMany({ data: schedule });
                    resolve({ success: true, count: schedule.length });
                } catch (error) {
                    reject(error);
                }
            });

            worker.on('error', reject);
            worker.on('exit', (code) => {
                if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
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
}
