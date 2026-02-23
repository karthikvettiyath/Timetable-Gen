"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Start seeding...');
    try {
        const math = await prisma.subject.create({
            data: {
                name: 'Applied Mathematics',
                code: 'MATH101',
                contactHours: 4,
                requiresLab: false,
            },
        });
        console.log('Created Subject:', math);
        const faculty = await prisma.faculty.create({
            data: {
                name: 'Dr. Smith',
                email: `smith_${Date.now()}@test.com`,
                weeklyWorkload: 12,
                unavailableSlots: 'Mon 9-10',
                subjects: {
                    connect: { id: math.id }
                }
            },
            include: { subjects: true }
        });
        console.log('Created Faculty with relation:', faculty);
        const room = await prisma.room.create({
            data: {
                name: 'Hall A',
                capacity: 60,
                isLab: false,
            },
        });
        console.log('Created Room:', room);
    }
    catch (e) {
        console.error(e);
    }
    finally {
        await prisma.$disconnect();
    }
}
main();
//# sourceMappingURL=seed_test.js.map