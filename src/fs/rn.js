import { readdir, stat, rename } from 'node:fs/promises';
import path from 'node:path';
import { callWorkingDirectory } from '../utils/callWorkingDirectory.js';

export const rn = async (workingDirectory, data) => {
    try {
        process.chdir(workingDirectory);
        if (!data.match(/^rn "(.*)" "(.*)"$/)?.input) {
            callWorkingDirectory(workingDirectory);
            console.log('Operation failed. Incorrect format. Should use "". Did you mean rn "path_to_file" "new_filename"?');
            return;
        }
        let dataArray = data.split('"');
        let pathToFile = dataArray[1];
        let newFileName = dataArray[3];
        
        if (pathToFile === '') {
            callWorkingDirectory(workingDirectory);
            console.log('Operation failed. Insert path to file. Did you mean rn "path_to_file" "new_filename"?');
            return;
        }
        if (!path.isAbsolute(pathToFile)) {
            const absPathToFile = path.resolve(pathToFile);
            pathToFile = absPathToFile;
        }

        if (newFileName === '' || newFileName.includes('.')) {
            callWorkingDirectory(workingDirectory);
            console.log('Operation failed. Insert file name without extension. Did you mean rn "path_to_file" "new_filename"?');
            return;
        }

        let pathToFolderArr = pathToFile.split('\\');
        const fileName = pathToFolderArr.pop();
        const pathToFolder = pathToFolderArr.join('/');
        
        const extension = '.' + fileName.split('.')[1];
        if (extension === '.undefined') {
            console.log('Operation failed. Check an extension of your file');
            return;
        }
        newFileName = newFileName + extension;
        const pathToNewFile = path.join(pathToFolder, newFileName);
        const files = await readdir(pathToFolder); 
        if (files.includes(newFileName)) {
            console.log('File is already exist. Choose another new filename');
            return;
        }
        await stat(pathToFile)
        .then(async stats => {
            if (stats.isFile()) {
                await rename(pathToFile, pathToNewFile);
                console.log('File was successfully renamed!');
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
            console.error(error.message);
        }
    }
}
