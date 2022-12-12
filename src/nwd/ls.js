import { readdir } from 'node:fs/promises';

export const ls = async (workingDirectory) => {
    const dirContent = await readdir(workingDirectory, {withFileTypes: true});
    const listOfDirs = [];
    const listOfFiles = [];
    dirContent.forEach((unit) => {
        if (unit.isDirectory()) {
            unit.type = 'directory';
            listOfDirs.push(unit);
        } else {
            unit.type = 'file'
            listOfFiles.push(unit);
        };
    } )
    const resultList = listOfDirs.concat(listOfFiles);
    console.table(resultList);
}
