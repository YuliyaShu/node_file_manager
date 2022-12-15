import { callWorkingDirectory } from '../utils/callWorkingDirectory.js';
import { userInfo as userInfoOs } from 'node:os';

export const username = (workingDirectory) => {
    try {
        process.chdir(workingDirectory);
        console.log(`System user name is: ${userInfoOs().username}`)
        callWorkingDirectory(workingDirectory);
    } catch (error) {
        if (error) {
            console.log('Something went wrong. Try one more time');
            console.error(error.message);
        }
    }
}