"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Connecting to DB...');
    try {
        const count = await prisma.faculty.count();
        console.log(`Faculty count: ${count}`);
        const subjects = await prisma.subject.count();
        console.log(`Subject count: ${subjects}`);
        const allFaculties = await prisma.faculty.findMany({
            include: { subjects: true }
        });
        console.log('Faculties in DB:', JSON.stringify(allFaculties, null, 2));
    }
    catch (e) {
        console.error('DB Error:', e);
    }
    finally {
        await prisma.$disconnect();
    }
}
main();
//# sourceMappingURL=check_db.js.map