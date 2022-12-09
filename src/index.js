import { parseArgs }  from './cli/args.js';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { closeApp } from './app/closeApp.js';
import { startApp } from './app/startApp.js';
import os from 'node:os';

const startingWorkingDirectory = os.homedir(); 
const username = parseArgs() || 'Guest';
startApp(username, startingWorkingDirectory);

export const rl = readline.createInterface({ input, output });
closeApp(username, rl);