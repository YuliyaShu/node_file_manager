import { callWorkingDirectory } from '../utils/callWorkingDirectory.js';
import { homedir as homedirOs } from 'node:os';

export const homedir = (workingDirectory) => {
    try {
        process.chdir(workingDirectory);
        console.log(`Your home directory is: ${homedirOs()}`);
        callWorkingDirectory(workingDirectory);
    } catch (error) {
        if (error) {
            console.log('Something went wrong. Try one more time');
            console.error(error.message);
        }
    }
}