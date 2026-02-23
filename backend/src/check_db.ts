import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Connecting to DB...');
    try {
        // Create a dummy record to ensure table exists
        const count = await prisma.faculty.count();
        console.log(`Faculty count: ${count}`);

        const subjects = await prisma.subject.count();
        console.log(`Subject count: ${subjects}`);

        // List all faculties with subjects to verify relation
        const allFaculties = await prisma.faculty.findMany({
            include: { subjects: true }
        });
        console.log('Faculties in DB:', JSON.stringify(allFaculties, null, 2));

    } catch (e) {
        console.error('DB Error:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
