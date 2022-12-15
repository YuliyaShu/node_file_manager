import { writeFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { callWorkingDirectory } from '../utils/callWorkingDirectory.js';

export const add = async (workingDirectory, data) => {
    try {
        process.chdir(workingDirectory);
        if (!data.match(/^add "(.*)"$/)?.input) {
            callWorkingDirectory(workingDirectory);
            console.log('Operation failed. Incorrect format. Should use "". Did you mean add "new_file_name.extension"?');
            return;
        }
        let newFileName = data.slice(5, -1);
        if (newFileName === '' || !newFileName.includes('.')) {
            callWorkingDirectory(workingDirectory);
            console.log('Operation failed. Insert file name with extension. Did you mean add "new_file_name.extension"?');
            return;
        }

        const pathToFile = path.join(workingDirectory, newFileName);
        const files = await readdir(workingDirectory); 
        if (files.includes(newFileName)) {
            console.log('File is already exist');
        } else {
            await writeFile(pathToFile, '');
            console.log('File was successfully created!');
        }
        callWorkingDirectory(workingDirectory);
    } catch (error) {
        if (error) {
            console.log('Something went wrong. Try one more time');
            console.error(error.message);
        }
    }
}
