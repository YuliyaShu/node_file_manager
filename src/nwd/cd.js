import { getAbsPath } from "../utils/getAbsPath.js"; 
import { callWorkingDirectory } from "../utils/callWorkingDirectory.js";
import { isPathToDirectoryValid } from '../utils/isPathToDirectoryValid.js';

export const cd = async (workingDirectory, data) => {
    try {
        process.chdir(workingDirectory);
        if (!data.match(/^cd "(.*)"$/)?.input) {
            callWorkingDirectory(workingDirectory);
            console.log('Operation failed. Incorrect format. Should use "". Did you mean cd "path_to_directory"?');
            return workingDirectory;
        }
        let pathToDirectory = data.slice(4, -1);
        if (await isPathToDirectoryValid(pathToDirectory, workingDirectory)) {
            pathToDirectory = getAbsPath(pathToDirectory);
            callWorkingDirectory(pathToDirectory);
            return pathToDirectory;
        } else {
            return workingDirectory;
        }
    } catch (error) {
        if (error) {
            console.log('Something went wrong. Try one more time');
            console.error(error.message);
        }
    }
       
}
