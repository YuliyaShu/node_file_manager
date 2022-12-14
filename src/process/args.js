export const parseArgs = () => {
    try {
        const arr = process.argv
            .slice(2)
            .map((item) => item.split('=')[1]);
        return arr[0];
    } catch (error) {
        if (error) {
            console.log('Something went wrong. Try one more time');
            console.error(error.message);
        }
    }
};
