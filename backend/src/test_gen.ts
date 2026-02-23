import { PrismaClient } from '@prisma/client';
import { Worker } from 'worker_threads';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
    try {
        console.log("Fetching data...");
        const faculties = await prisma.faculty.findMany({ include: { subjects: true } });
        const rooms = await prisma.room.findMany();
        const subjects = await prisma.subject.findMany();
        const classGroups = await prisma.classGroup.findMany();
        const timeSlots = await prisma.timeSlot.findMany();

        console.log(`Data fetched: F${faculties.length} R${rooms.length} S${subjects.length} C${classGroups.length} T${timeSlots.length}`);

        console.log("Starting worker...");
        // Adjust path to point to the COMPILED worker in dist
        const workerPath = path.resolve(__dirname, '../dist/scheduler/worker.js');
        console.log("Worker Path:", workerPath);

        const worker = new Worker(workerPath, {
            workerData: { faculties, rooms, subjects, classGroups, timeSlots },
        });

        worker.on('message', (schedule) => {
            console.log("SUCCESS: Worker returned schedule.");
            console.log(`Generated ${schedule.length} entries.`);
            if (schedule.length > 0) {
                console.log("Sample:", schedule[0]);
            }
            process.exit(0);
        });

        worker.on('error', (err) => {
            console.error("WORKER ERROR:", err);
            process.exit(1);
        });

        worker.on('exit', (code) => {
            if (code !== 0) {
                console.error(`Worker stopped with exit code ${code}`);
                process.exit(1);
            }
        });

    } catch (e) {
        console.error('Script Error:', e);
        await prisma.$disconnect();
        process.exit(1);
    }
}

main();
