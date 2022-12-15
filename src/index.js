import { parseArgs }  from './process/args.js';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { closeApp } from './app/closeApp.js';
import { startApp } from './app/startApp.js';
import os from 'node:os';
import { handleCommands } from './handleCommands.js';

try{
    const workingDirectory = os.homedir(); 
    const username = parseArgs() || 'Guest';
    startApp(username, workingDirectory);

    const rl = readline.createInterface({ input, output });
    handleCommands(rl, workingDirectory);
    closeApp(username, rl);
} catch (error) {
    if (error) {
        console.log('Something went wrong. Try one more time');
        console.error(error.message);
    }
}
