import { createReadStream } from 'node:fs';
import { callWorkingDirectory } from '../utils/callWorkingDirectory.js';
import { getAbsPath } from '../utils/getAbsPath.js';
import { isPathToFileValid } from '../utils/isPathToFileValid.js';

export const cat = async (workingDirectory, data) => {
    try {
        process.chdir(workingDirectory);
        if (!data.match(/^cat "(.*)"$/)?.input) {
            callWorkingDirectory(workingDirectory);
            console.log('Operation failed. Incorrect format. Should use "". Did you mean cat "path_to_file"?');
            return;
        }
        let pathToFile = data.slice(5, -1);
        if (await isPathToFileValid(pathToFile, workingDirectory)) {
            pathToFile = getAbsPath(pathToFile);
            const source = createReadStream(pathToFile, { encoding: 'utf8' });
                source.on('data', function (chunk) {
                    console.log(chunk);
                });
            callWorkingDirectory(workingDirectory);
            }
    } catch (error) {
        if (error) {
            console.log('Something went wrong. Try one more time');
            console.error(error.message);
        }
    }
}
