import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import path from 'node:path';
import { callWorkingDirectory } from '../utils/callWorkingDirectory.js';

export const cat = async (workingDirectory, data) => {
    try {
        process.chdir(workingDirectory);
        if (!data.match(/^cat "(.*)"$/)?.input) {
            callWorkingDirectory(workingDirectory);
            console.log('Operation failed. Incorrect format. Should use "". Did you mean cat "path_to_file"?');
            return;
        }
        let pathToFile = data.slice(5, -1);
        if (pathToFile === '') {
            callWorkingDirectory(workingDirectory);
            console.log('Operation failed. Insert path to file. Did you mean cat "path_to_file"?');
            return;
        }
        if (!path.isAbsolute(pathToFile)) {
            const absPathToFile = path.resolve(pathToFile);
            pathToFile = absPathToFile;
        }
        
        await stat(pathToFile)
        .then(stats => {
            if (stats.isFile()) {
                const source = createReadStream(pathToFile, { encoding: 'utf8' });
                source.on('data', function (chunk) {
                    console.log(chunk);
                });
            } else {
                console.log('Operation failed. No such file.');
            }
        })
        .catch((error) => {
            if (error) console.log('Operation failed. No such file.');
        });
        callWorkingDirectory(workingDirectory);
    } catch (error) {
        if (error) {
            console.log('Something went wrong. Try one more time');
        }
    }
}
