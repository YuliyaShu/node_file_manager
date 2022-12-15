import { callWorkingDirectory } from '../utils/callWorkingDirectory.js';
import { getAbsPath } from '../utils/getAbsPath.js';
import { isPathToFileValid } from '../utils/isPathToFileValid.js';
import { rm as remove} from 'node:fs/promises';

export const rm = async (workingDirectory, data) => {
    try {
        process.chdir(workingDirectory);
        if (!data.match(/^rm "(.*)"$/)?.input) {
            callWorkingDirectory(workingDirectory);
            console.log('Operation failed. Incorrect format. Should use "". Did you mean rm "path_to_file"?');
            return;
        }
        let pathToFile = data.slice(4, -1);
        if (await isPathToFileValid(pathToFile, workingDirectory)) {
            pathToFile = getAbsPath(pathToFile);
            await remove(pathToFile);
            console.log('File was successfully deleted!');
            callWorkingDirectory(workingDirectory);
            }
    } catch (error) {
        if (error) {
            console.log('Something went wrong. Try one more time');
            console.error(error.message);
        }
    }
}
