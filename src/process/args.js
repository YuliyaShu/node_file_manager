export const parseArgs = () => {
    const arr = process.argv
        .slice(2)
        .map((item) => item.split('=')[1]);
    return arr[0];
};
