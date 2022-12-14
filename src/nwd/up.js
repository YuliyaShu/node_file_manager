import { callWorkingDirectory } from "../utils/callWorkingDirectory.js";

export const up = (workingDirectory) => {
    try {
        const arrOfDirs = workingDirectory.toString().split('\\');
        const newWorkingDirectory = (() => {
            switch (arrOfDirs.length) {
                case 2:
                    return arrOfDirs[0] + '\\';
                case 1:
                    return arrOfDirs[0];
                default:
                    return arrOfDirs.slice(0, -1).join('\\');
            }
        })();
        callWorkingDirectory(newWorkingDirectory);
        return newWorkingDirectory;
    } catch (error) {
        if (error) {
            console.log('Something went wrong. Try one more time');
            console.error(error.message);
        }
    }
}
