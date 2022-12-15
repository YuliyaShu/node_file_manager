import { callWorkingDirectory } from '../utils/callWorkingDirectory.js';
import { cpus as cpusOs } from 'node:os';

export const cpus = (workingDirectory) => {
    try {
        process.chdir(workingDirectory);
        console.log(`Total amount of CPUS: ${cpusOs().length}`);
        console.table(cpusOs().map(unit => {
            return {
                model: unit.model,
                clockRate: `${unit.speed / 1000} GHz`,
            }
        }));
        callWorkingDirectory(workingDirectory);
    } catch (error) {
        if (error) {
            console.log('Something went wrong. Try one more time');
            console.error(error.message);
        }
    }
}