import { parentPort, workerData } from 'worker_threads';

interface WorkerInput {
    faculties: any[];
    rooms: any[];
    subjects: any[];
    classGroups: any[];
    timeSlots: any[];
}

const { faculties, rooms, subjects, classGroups, timeSlots } = workerData as WorkerInput;

// Pre-process: Map Subject ID to eligible Faculty IDs
const subjectFacultyMap: Record<string, string[]> = {};
subjects.forEach(sub => {
    // Find faculties who have this subject in their subjects list
    const eligible = faculties.filter(f => f.subjects.some((s: any) => s.id === sub.id)).map(f => f.id);
    subjectFacultyMap[sub.id] = eligible.length > 0 ? eligible : faculties.map(f => f.id); // Fallback to all if none specialized
});

function getRandomFacultyForSubject(subjectId: string) {
    const eligibleIds = subjectFacultyMap[subjectId];
    return eligibleIds[Math.floor(Math.random() * eligibleIds.length)];
}

function generateTimetable() {
    const populationSize = 50;
    const generations = 100;
    let population: any[][] = initializePopulation(populationSize);

    for (let g = 0; g < generations; g++) {
        population = population.sort((a, b) => calculateFitness(a) - calculateFitness(b));
        if (calculateFitness(population[0]) === 0) break;

        const nextGen: any[][] = population.slice(0, populationSize / 2);
        while (nextGen.length < populationSize) {
            const p1 = nextGen[Math.floor(Math.random() * nextGen.length)];
            const p2 = nextGen[Math.floor(Math.random() * nextGen.length)];
            nextGen.push(mutate(crossover(p1, p2)));
        }
        population = nextGen;
    }

    return population[0];
}

function initializePopulation(size: number) {
    const population: any[][] = [];
    for (let i = 0; i < size; i++) {
        const chromosome: any[] = [];
        for (const group of classGroups) {
            for (const subject of subjects) {
                for (let h = 0; h < subject.contactHours; h++) {
                    chromosome.push({
                        classGroupId: group.id,
                        subjectId: subject.id,
                        facultyId: getRandomFacultyForSubject(subject.id), // Use smart selection
                        roomId: rooms[Math.floor(Math.random() * rooms.length)].id,
                        timeslotId: timeSlots[Math.floor(Math.random() * timeSlots.length)].id,
                    });
                }
            }
        }
        population.push(chromosome);
    }
    return population;
}

function calculateFitness(chromosome: any[]) {
    let penalty = 0;
    const facultySlots = new Set();
    const roomSlots = new Set();
    const groupSlots = new Set();

    for (const gene of chromosome) {
        const fKey = `${gene.facultyId}-${gene.timeslotId}`;
        const rKey = `${gene.roomId}-${gene.timeslotId}`;
        const gKey = `${gene.classGroupId}-${gene.timeslotId}`;

        if (facultySlots.has(fKey)) penalty += 1000; // Increase penalty for clashes
        if (roomSlots.has(rKey)) penalty += 1000;
        if (groupSlots.has(gKey)) penalty += 1000;

        facultySlots.add(fKey);
        roomSlots.add(rKey);
        groupSlots.add(gKey);
    }

    return penalty;
}

function crossover(p1: any[], p2: any[]) {
    const midpoint = Math.floor(p1.length / 2);
    return [...p1.slice(0, midpoint), ...p2.slice(midpoint)];
}

function mutate(chromosome: any[]) {
    const newChromosome = JSON.parse(JSON.stringify(chromosome));
    if (Math.random() > 0.1) return newChromosome;

    const idx = Math.floor(Math.random() * newChromosome.length);
    const gene = newChromosome[idx];
    const mutationType = Math.floor(Math.random() * 3);

    if (mutationType === 0) {
        // Mutate Faculty: Must still be valid for the subject
        gene.facultyId = getRandomFacultyForSubject(gene.subjectId);
    } else if (mutationType === 1) {
        gene.roomId = rooms[Math.floor(Math.random() * rooms.length)].id;
    } else {
        gene.timeslotId = timeSlots[Math.floor(Math.random() * timeSlots.length)].id;
    }
    return newChromosome;
}

const result = generateTimetable();
if (parentPort) {
    parentPort.postMessage(result);
}
