// Cross-check helpers:
// npm run start -- --username=Reviewer
// rm "test.js"
// decompress "test.br" "test.js"
// hash "test.js"

import { createReadStream, createWriteStream } from 'node:fs';
import { readdir, rm } from 'node:fs/promises';
import { pipeline } from 'node:stream/promises';
import { callWorkingDirectory } from '../utils/callWorkingDirectory.js';
import { getAbsPath } from '../utils/getAbsPath.js';
import { isPathToFileValid } from '../utils/isPathToFileValid.js';
import { createBrotliDecompress } from 'node:zlib';

export const decompress = async (workingDirectory, data) => {
    try {
        process.chdir(workingDirectory);
        if (!data.match(/^decompress "(.*)" "(.*)"$/)?.input) {
            callWorkingDirectory(workingDirectory);
            console.log('Operation failed. Incorrect format. Should use "". Did you mean decompress "path_to_compressed_file.br" "path_to_file"?');
            return;
        }

        let dataArray = data
            .split('"')
            .reduce((res, unit, index) => {
                if (index % 2) res.push(unit);
                return res;
            }, []);

        let [pathToCompressedFile, pathToFile]  = dataArray;
        
        if (await isPathToFileValid(pathToCompressedFile, workingDirectory)) {
            pathToFile = getAbsPath(pathToFile);
            pathToCompressedFile = getAbsPath(pathToCompressedFile);
            let pathToFileArr = pathToFile.split('\\');
            const fileName = pathToFileArr.pop();
            const pathToFolderWithFile = pathToFileArr.join('/');
            if ((await readdir(pathToFolderWithFile)).includes(fileName)) {
                callWorkingDirectory(workingDirectory);
                console.log('Operation failed. File already exists.');
                return;
            }
            const decompressIt = createBrotliDecompress();
            await pipeline(createReadStream(pathToCompressedFile), decompressIt, createWriteStream(pathToFile, {flags: 'a'}));
            console.log('File was successfully decompressed!');
            callWorkingDirectory(workingDirectory);
        }
    } catch (error) {
        if (error) {
            console.log('Something went wrong. Try one more time');
            console.error(error.message);
        }
    }
}
