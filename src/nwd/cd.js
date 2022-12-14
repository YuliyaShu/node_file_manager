import { stat } from 'node:fs/promises';
import { callWorkingDirectory } from "../utils/callWorkingDirectory.js";
import path from 'path';

export const cd = async (workingDirectory, data) => {
    try {
        if (!data.match(/^cd "(.*)"$/)?.input) {
            callWorkingDirectory(workingDirectory);
            console.log('Operation failed. Incorrect format. Should use "". Did you mean cd "path_to_directory"?');
            return workingDirectory;
        }
        let pathToDirectory = data.slice(4, -1);
        if (pathToDirectory === '') {
            callWorkingDirectory(workingDirectory);
            console.log('Operation failed. Insert path to directory. Did you mean cd "path_to_directory"?');
            return workingDirectory;
        }
        if (!path.isAbsolute(pathToDirectory)) {
            const absPathToDirectory = path.resolve(pathToDirectory);
            pathToDirectory = absPathToDirectory;
        }
        return await stat(pathToDirectory)
            .then(stats => {
                if (!stats.isDirectory()) {
                    callWorkingDirectory(workingDirectory);
                    console.log('Operation failed. Can not go to the file. Insert a path to the directory');
                    return workingDirectory;
                }
                callWorkingDirectory(pathToDirectory);
                return pathToDirectory;
            })
            .catch(() => {
                console.log('Operation failed. No such directory.');
                callWorkingDirectory(workingDirectory);
                return workingDirectory;
            });
    } catch (error) {
        if (error) {
            console.log('Something went wrong. Try one more time');
        }
    }
}
