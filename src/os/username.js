import { callWorkingDirectory } from '../utils/callWorkingDirectory.js';

export const username = (workingDirectory) => {
    try {
        process.chdir(workingDirectory);
        callWorkingDirectory(workingDirectory);
    } catch (error) {
        if (error) {
            console.log('Something went wrong. Try one more time');
            console.error(error.message);
        }
    }
}