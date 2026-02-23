import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding...');

    try {
        // 1. Create a Subject
        const math = await prisma.subject.create({
            data: {
                name: 'Applied Mathematics',
                code: 'MATH101',
                contactHours: 4,
                requiresLab: false,
            },
        });
        console.log('Created Subject:', math);

        // 2. Create a Faculty linked to Subject
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
            include: { subjects: true } // Verify relation
        });
        console.log('Created Faculty with relation:', faculty);

        // 3. Create a Room
        const room = await prisma.room.create({
            data: {
                name: 'Hall A',
                capacity: 60,
                isLab: false,
            },
        });
        console.log('Created Room:', room);

    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
