import { readdir, rename } from 'node:fs/promises';
import path from 'node:path';
import { callWorkingDirectory } from '../utils/callWorkingDirectory.js';
import { getAbsPath } from '../utils/getAbsPath.js';
import { isPathToFileValid } from '../utils/isPathToFileValid.js';

export const rn = async (workingDirectory, data) => {
    try {
        process.chdir(workingDirectory);
        if (!data.match(/^rn "(.*)" "(.*)"$/)?.input) {
            callWorkingDirectory(workingDirectory);
            console.log('Operation failed. Incorrect format. Should use "". Did you mean rn "path_to_file" "new_filename"?');
            return;
        }
        let dataArray = data
            .split('"')
            .reduce((res, unit, index) => {
                if (index % 2) res.push(unit);
                return res;
            }, []);

        let [pathToFile, newFileName]  = dataArray;
        if (newFileName === '' || newFileName.includes('.')) {
            callWorkingDirectory(workingDirectory);
            console.log('Operation failed. Insert file name without extension. Did you mean rn "path_to_file" "new_filename"?');
            return;
        }

        if (await isPathToFileValid(pathToFile, workingDirectory)) {
            pathToFile = getAbsPath(pathToFile);
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
            await rename(pathToFile, pathToNewFile);
            console.log('File was successfully renamed!');
            callWorkingDirectory(workingDirectory);
        }        
    } catch (error) {
        if (error) {
            console.log('Something went wrong. Try one more time');
            console.error(error.message);
        }
    }
}
