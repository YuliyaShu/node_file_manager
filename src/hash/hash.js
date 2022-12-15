import { callWorkingDirectory } from '../utils/callWorkingDirectory.js';
import { getAbsPath } from '../utils/getAbsPath.js';
import { isPathToFileValid } from '../utils/isPathToFileValid.js';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

export const hash = async (workingDirectory, data) => {
    try {
        process.chdir(workingDirectory);
        if (!data.match(/^hash "(.*)"$/)?.input) {
            callWorkingDirectory(workingDirectory);
            console.log('Operation failed. Incorrect format. Should use "". Did you mean hash "path_to_file"?');
            return;
        }
        let pathToFile = data.slice(6, -1);
        if (await isPathToFileValid(pathToFile, workingDirectory)) {
            pathToFile = getAbsPath(pathToFile);
            const hash = createHash('sha256');
            const fileContent = await readFile(pathToFile);
            hash.update(fileContent);
            console.log(`Hash is ${hash.digest('hex')}`);
            callWorkingDirectory(workingDirectory);
        }
    } catch (error) {
        if (error) {
            console.log('Something went wrong. Try one more time');
            console.error(error.message);
        }
    }
}
