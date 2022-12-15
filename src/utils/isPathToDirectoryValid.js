import { getAbsPath } from "./getAbsPath.js";
import { stat } from 'node:fs/promises';
import { callWorkingDirectory } from "../utils/callWorkingDirectory.js";

export const isPathToDirectoryValid = async (pathToDirectory, workingDirectory) => {
    try{
        if (pathToDirectory === '') {
            callWorkingDirectory(workingDirectory);
            console.log('Operation failed. Insert path to directory in format "path_to_directory".');
            return false;
        }
        pathToDirectory = getAbsPath(pathToDirectory);
        return await stat(pathToDirectory)
            .then(stats => {
                if (!stats.isDirectory()) {
                    callWorkingDirectory(workingDirectory);
                    console.log('Operation failed. Insert a path to the directory instead of path to file');
                    return false;
                } else {
                    return true;
                }
            })
            .catch(() => {
                console.log('Operation failed. No such directory.');
                callWorkingDirectory(workingDirectory);
                return false;
            });
            
    } catch (error) {
        if (error) {
            console.log('Something went wrong. Try one more time');
            console.error(error.message);
        }
    }
}
