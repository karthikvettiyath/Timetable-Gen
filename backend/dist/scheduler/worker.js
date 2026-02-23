"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const worker_threads_1 = require("worker_threads");
const { faculties, rooms, subjects, classGroups, timeSlots } = worker_threads_1.workerData;
const subjectFacultyMap = {};
subjects.forEach(sub => {
    const eligible = faculties.filter(f => f.subjects.some((s) => s.id === sub.id)).map(f => f.id);
    subjectFacultyMap[sub.id] = eligible.length > 0 ? eligible : faculties.map(f => f.id);
});
function getRandomFacultyForSubject(subjectId) {
    const eligibleIds = subjectFacultyMap[subjectId];
    return eligibleIds[Math.floor(Math.random() * eligibleIds.length)];
}
function generateTimetable() {
    const populationSize = 50;
    const generations = 100;
    let population = initializePopulation(populationSize);
    for (let g = 0; g < generations; g++) {
        population = population.sort((a, b) => calculateFitness(a) - calculateFitness(b));
        if (calculateFitness(population[0]) === 0)
            break;
        const nextGen = population.slice(0, populationSize / 2);
        while (nextGen.length < populationSize) {
            const p1 = nextGen[Math.floor(Math.random() * nextGen.length)];
            const p2 = nextGen[Math.floor(Math.random() * nextGen.length)];
            nextGen.push(mutate(crossover(p1, p2)));
        }
        population = nextGen;
    }
    return population[0];
}
function initializePopulation(size) {
    const population = [];
    for (let i = 0; i < size; i++) {
        const chromosome = [];
        for (const group of classGroups) {
            for (const subject of subjects) {
                for (let h = 0; h < subject.contactHours; h++) {
                    chromosome.push({
                        classGroupId: group.id,
                        subjectId: subject.id,
                        facultyId: getRandomFacultyForSubject(subject.id),
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
function calculateFitness(chromosome) {
    let penalty = 0;
    const facultySlots = new Set();
    const roomSlots = new Set();
    const groupSlots = new Set();
    for (const gene of chromosome) {
        const fKey = `${gene.facultyId}-${gene.timeslotId}`;
        const rKey = `${gene.roomId}-${gene.timeslotId}`;
        const gKey = `${gene.classGroupId}-${gene.timeslotId}`;
        if (facultySlots.has(fKey))
            penalty += 1000;
        if (roomSlots.has(rKey))
            penalty += 1000;
        if (groupSlots.has(gKey))
            penalty += 1000;
        facultySlots.add(fKey);
        roomSlots.add(rKey);
        groupSlots.add(gKey);
    }
    return penalty;
}
function crossover(p1, p2) {
    const midpoint = Math.floor(p1.length / 2);
    return [...p1.slice(0, midpoint), ...p2.slice(midpoint)];
}
function mutate(chromosome) {
    const newChromosome = JSON.parse(JSON.stringify(chromosome));
    if (Math.random() > 0.1)
        return newChromosome;
    const idx = Math.floor(Math.random() * newChromosome.length);
    const gene = newChromosome[idx];
    const mutationType = Math.floor(Math.random() * 3);
    if (mutationType === 0) {
        gene.facultyId = getRandomFacultyForSubject(gene.subjectId);
    }
    else if (mutationType === 1) {
        gene.roomId = rooms[Math.floor(Math.random() * rooms.length)].id;
    }
    else {
        gene.timeslotId = timeSlots[Math.floor(Math.random() * timeSlots.length)].id;
    }
    return newChromosome;
}
const result = generateTimetable();
if (worker_threads_1.parentPort) {
    worker_threads_1.parentPort.postMessage(result);
}
//# sourceMappingURL=worker.js.map