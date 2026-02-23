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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const worker_threads_1 = require("worker_threads");
const path = __importStar(require("path"));
const prisma = new client_1.PrismaClient();
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
        const workerPath = path.resolve(__dirname, '../dist/scheduler/worker.js');
        console.log("Worker Path:", workerPath);
        const worker = new worker_threads_1.Worker(workerPath, {
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
    }
    catch (e) {
        console.error('Script Error:', e);
        await prisma.$disconnect();
        process.exit(1);
    }
}
main();
//# sourceMappingURL=test_gen.js.map