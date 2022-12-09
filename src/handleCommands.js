import { up } from "./os/up.js";
import { callWorkingDirectory } from "./utils/callWorkingDirectory.js";

export const handleCommands = (rl, workingDirectory) => {
    rl.on('line', data => {
        switch (data) {
            case 'up':
                workingDirectory = up(workingDirectory, rl);
                break;
            default:
                callWorkingDirectory(workingDirectory);
                console.log(`Invalid input. Type one of these commands:
                    up`);
        }
    });
} 
