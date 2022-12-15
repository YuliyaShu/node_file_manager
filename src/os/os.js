import { architecture } from "./architecture.js";
import { cpus } from "./cpus.js";
import { EOL } from "./EOL.js";
import { homedir } from "./homedir.js";
import { username } from "./username.js";

export const os = (workingDirectory, data) => {
    try {
        process.chdir(workingDirectory);
        const command = data.slice(5);

        switch (command) {
            case 'EOL':
                EOL(workingDirectory);
                break;

            case 'cpus':
                cpus(workingDirectory);
                break;

            case 'homedir':
                homedir(workingDirectory);
                break;

            case 'username':
                username(workingDirectory);
                break;

            case 'architecture':
                architecture(workingDirectory);
                break;

            default:
                break;
        }
    } catch (error) {
        if (error) {
            console.log('Something went wrong. Try one more time');
            console.error(error.message);
        }
    }
}
