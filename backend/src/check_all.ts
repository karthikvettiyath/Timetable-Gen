import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Checking all prerequisite data...');
    try {
        const faculties = await prisma.faculty.count();
        const subjects = await prisma.subject.count();
        const rooms = await prisma.room.count();
        const classGroups = await prisma.classGroup.count();
        const timeSlots = await prisma.timeSlot.count();

        console.log(`Faculties: ${faculties}`);
        console.log(`Subjects: ${subjects}`);
        console.log(`Rooms: ${rooms}`);
        console.log(`ClassGroups: ${classGroups}`);
        console.log(`TimeSlots: ${timeSlots}`);

        if (faculties === 0 || subjects === 0 || rooms === 0 || classGroups === 0 || timeSlots === 0) {
            console.error("\nCRITICAL: One or more required tables are empty! Generator will return nothing.");
        } else {
            console.log("\nAll prerequisites met.");

            // Check if subjects are actually assigned to faculties
            const facultiesWithSubjects = await prisma.faculty.count({
                where: { subjects: { some: {} } }
            });
            console.log(`Faculties with assigned subjects: ${facultiesWithSubjects}`);
            if (facultiesWithSubjects === 0) console.warn("WARNING: No faculties have subjects assigned. Smart generator might struggle or fallback to random.");
        }

    } catch (e) {
        console.error('DB Error:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
