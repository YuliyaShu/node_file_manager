export const closeApp = async (username, rl) => {
    const thanksAndClose = () => {
        console.log(`Thank you for using File Manager, ${username}, goodbye!`);
        rl.close();
    };
    rl.on('SIGINT', () => thanksAndClose());
    rl.on('line', (data) => {
    if (data === '.exit') {
        thanksAndClose();
    }
    });
}
