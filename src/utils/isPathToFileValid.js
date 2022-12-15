import { getAbsPath } from "./getAbsPath.js";
import { stat } from 'node:fs/promises';
import { callWorkingDirectory } from "../utils/callWorkingDirectory.js";

export const isPathToFileValid = async (pathToFile, workingDirectory) => {
    try{
        if (pathToFile === '') {
            callWorkingDirectory(workingDirectory);
            console.log('Operation failed. Insert path to file in format "path_to_file"');
            return;
        }
        pathToFile = getAbsPath(pathToFile);
        return await stat(pathToFile)
            .then(stats => {
                if (!stats.isFile()) {
                    callWorkingDirectory(workingDirectory);
                    console.log('Operation failed. Insert a path to the file instead of path to folder');
                    return false;
                } else {
                    return true;
                }
            })
            .catch(() => {
                console.log('Operation failed. No such file. Don\'t forget to add an extension.');
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