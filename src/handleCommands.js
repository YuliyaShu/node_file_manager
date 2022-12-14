import { up } from "./nwd/up.js";
import { cd } from './nwd/cd.js';
import { ls } from "./nwd/ls.js";
import { cat } from "./fs/cat.js";
import { callWorkingDirectory } from "./utils/callWorkingDirectory.js";

export const handleCommands = (rl, workingDirectory) => {
    rl.on('line', async data => {
        switch (data) {
            case 'up':
                workingDirectory = up(workingDirectory);
                break;

            case data.match(/^cd/)?.input:
                workingDirectory = await cd(workingDirectory, data);
                break;

            case 'ls':
                await ls(workingDirectory);
                break;

            case data.match(/^cat/)?.input:
                cat(workingDirectory, data);
                break;

            default:
                callWorkingDirectory(workingDirectory);
                console.log(`Invalid input. Type one of these commands:
                    up
                    cd "path_to_directory"
                    ls
                    cat "path_to_file"`);
        }
    });
} 
