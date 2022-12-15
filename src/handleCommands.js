import { callWorkingDirectory } from "./utils/callWorkingDirectory.js";
import { up } from "./nwd/up.js";
import { cd } from './nwd/cd.js';
import { ls } from "./nwd/ls.js";
import { cat } from "./fs/cat.js";
import { add } from "./fs/add.js";
import { rn } from "./fs/rn.js";
import { cp } from "./fs/cp.js";
import { mv } from "./fs/mv.js";
import { rm } from "./fs/rm.js";
import { os } from "./os/os.js";
import { hash } from "./hash/hash.js";
import { compress } from "./compress/compress.js";

export const handleCommands = (rl, workingDirectory) => {
    try {
        rl.on('line', async data => {
            switch (data) {
                case '.exit':
                    break;

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

                case data.match(/^add/)?.input:
                    add(workingDirectory, data);
                    break;

                case data.match(/^rn/)?.input:
                    rn(workingDirectory, data);
                    break;

                case data.match(/^cp/)?.input:
                    cp(workingDirectory, data);
                    break;

                case data.match(/^mv/)?.input:
                    mv(workingDirectory, data);
                    break;

                case data.match(/^rm/)?.input:
                    rm(workingDirectory, data);
                    break;

                case 'os --EOL':
                case 'os --cpus':
                case 'os --homedir':
                case 'os --username':
                case 'os --architecture':
                    os(workingDirectory, data);
                    break;

                case data.match(/^hash/)?.input:
                    hash(workingDirectory, data);
                    break;

                case data.match(/^compress/)?.input:
                    compress(workingDirectory, data);
                    break;

                default:
                    callWorkingDirectory(workingDirectory);
                    console.log(`Invalid input. Type one of these commands:
                        up
                        cd "path_to_directory"
                        ls
                        cat "path_to_file"
                        add "new_file_name.extension"
                        rn "path_to_file" "new_filename"
                        cp "path_to_file" "path_to_new_directory"
                        mv "path_to_file" "path_to_new_directory"
                        rm "path_to_file"
                        os --EOL
                        os --cpus
                        os --homedir
                        os --username
                        os --architecture
                        compress "path_to_file" "path_to_compressed_file"
                        .exit`);
            }
        });
    } catch (error) {
        if (error) {
            console.log('Something went wrong. Try one more time');
            console.error(error.message);
        }
    }
} 
