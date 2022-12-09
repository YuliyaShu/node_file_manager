export const handleCommands = (rl, workingDirectory) => {
    rl.on('line', data => {
        console.log(`You are currently in ${workingDirectory}`);
        switch (data) {
            
            case 'com':
                console.log('🚀 ~ handleCommands ~ data', data);
                break;
            default:
                console.log(`Invalid input. Type one of this commands:
                ddd
                ddd`);
        }
    });
} 
