import { EOL as EOLmarker } from 'node:os';
import { callWorkingDirectory } from '../utils/callWorkingDirectory.js';

export const EOL = (workingDirectory) => {
    try {
        process.chdir(workingDirectory);
        console.log(JSON.stringify(EOLmarker));
        callWorkingDirectory(workingDirectory);
    } catch (error) {
        if (error) {
            console.log('Something went wrong. Try one more time');
            console.error(error.message);
        }
    }
}
