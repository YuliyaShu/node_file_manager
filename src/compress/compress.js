import { createReadStream, createWriteStream } from 'node:fs';
import { readdir, rm } from 'node:fs/promises';
import { pipeline } from 'node:stream/promises';
import { callWorkingDirectory } from '../utils/callWorkingDirectory.js';
import { getAbsPath } from '../utils/getAbsPath.js';
import { isPathToFileValid } from '../utils/isPathToFileValid.js';

export const compress = async (workingDirectory, data) => {
    try {
        process.chdir(workingDirectory);
        if (!data.match(/^compress "(.*)" "(.*)"$/)?.input) {
            callWorkingDirectory(workingDirectory);
            console.log('Operation failed. Incorrect format. Should use "". Did you mean compress "path_to_file" "path_to_compressed_file.br"?');
            return;
        }

        let dataArray = data
            .split('"')
            .reduce((res, unit, index) => {
                if (index % 2) res.push(unit);
                return res;
            }, []);

        let [pathToFile, pathToCompressedFile]  = dataArray;
        
        if (await isPathToFileValid(pathToFile, workingDirectory)) {
            pathToFile = getAbsPath(pathToFile);
            pathToCompressedFile = getAbsPath(pathToCompressedFile);
            let pathToCompressedFileArr = pathToCompressedFile.split('\\');
            const compressedFileName = pathToCompressedFileArr.pop();
            const pathToFolderWithCompressedFile = pathToCompressedFileArr.join('/');
            if (!compressedFileName.includes('.br')) {
                console.log('Operation failed. Incorrect format. Use .br extension for path_to_compressed_file.');
                callWorkingDirectory(workingDirectory);
                return;
            }
            if ((await readdir(pathToFolderWithCompressedFile)).includes(compressedFileName)) {
                callWorkingDirectory(workingDirectory);
                console.log('Operation failed. Archive already exists.');
                return;
            }
            await pipeline(createReadStream(pathToFile), createWriteStream(pathToCompressedFile, {flags: 'a'}));
            console.log('File was successfully compressed!');
            callWorkingDirectory(workingDirectory);
        }
    } catch (error) {
        if (error) {
            console.log('Something went wrong. Try one more time');
            console.error(error.message);
        }
    }
}
