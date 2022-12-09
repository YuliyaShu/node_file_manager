import { parseArgs }  from './cli/args.js';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { closeApp } from './app/closeApp.js';
import { startApp } from './app/startApp.js';
import os from 'node:os';
import { handleCommands } from './handleCommands.js';

const workingDirectory = os.homedir(); 
const username = parseArgs() || 'Guest';
startApp(username, workingDirectory);

export const rl = readline.createInterface({ input, output });
handleCommands(rl, workingDirectory);
closeApp(username, rl);
