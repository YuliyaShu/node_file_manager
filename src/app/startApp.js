export const startApp = (username, workingDirectory) => {
    try {
        console.log(`Welcome to the File Manager, ${username}!`);
        console.log(`You are currently in ${workingDirectory}`);
    } catch (error) {
        if (error) {
            console.log('Something went wrong. Try one more time');
        }
    }
}
