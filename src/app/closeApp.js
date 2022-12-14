export const closeApp = async (username, rl) => {
    try {
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
    } catch (error) {
        if (error) {
            console.log('Something went wrong. Try one more time');
        }
    }
}
