import { createReadStream, createWriteStream } from 'node:fs';
import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';
import { callWorkingDirectory } from '../utils/callWorkingDirectory.js';
import { getAbsPath } from '../utils/getAbsPath.js';
import { isPathToDirectoryValid } from '../utils/isPathToDirectoryValid.js';
import { isPathToFileValid } from '../utils/isPathToFileValid.js';

export const cp = async (workingDirectory, data) => {
    try {
        process.chdir(workingDirectory);
        if (!data.match(/^cp "(.*)" "(.*)"$/)?.input) {
            callWorkingDirectory(workingDirectory);
            console.log('Operation failed. Incorrect format. Should use "". Did you mean cp "path_to_file" "path_to_new_directory"?');
            return;
        }

        let dataArray = data
            .split('"')
            .reduce((res, unit, index) => {
                if (index % 2) res.push(unit);
                return res;
            }, []);

        let [pathToFile, pathToNewDirectory]  = dataArray;
        
        if (await isPathToFileValid(pathToFile, workingDirectory)) {
            if (await isPathToDirectoryValid(pathToNewDirectory)) {
                const fileName = pathToFile.split('\\').pop();
                pathToFile = getAbsPath(pathToFile);
                pathToNewDirectory = getAbsPath(pathToNewDirectory);
                const pathToNewFile = path.join(pathToNewDirectory, fileName);
                if ((await readdir(pathToNewDirectory)).includes(fileName)) {
                    callWorkingDirectory(workingDirectory);
                    console.log('Operation failed. File already exist.');
                    return;
                }

                await pipeline(createReadStream(pathToFile), createWriteStream(pathToNewFile, {flags: 'a'}));
                console.log('File was successfully copied!');
                callWorkingDirectory(workingDirectory);
            }
        }
    } catch (error) {
        if (error) {
            console.log('Something went wrong. Try one more time');
            console.error(error.message);
        }
    }
}
