import { callWorkingDirectory } from '../utils/callWorkingDirectory.js';
import { arch as archOs } from 'node:os';

export const architecture = (workingDirectory) => {
    try {
        process.chdir(workingDirectory);
        console.log(`CPU architecture for which Node.js binary has compiled: ${archOs()}`);
        callWorkingDirectory(workingDirectory);
    } catch (error) {
        if (error) {
            console.log('Something went wrong. Try one more time');
            console.error(error.message);
        }
    }
}