import path from 'path';

export const getAbsPath = (relativePath) => {
    try {
        if (!path.isAbsolute(relativePath)) {
            return path.resolve(relativePath);
        } else {
            return relativePath;
        }
    } catch (error) {
        if (error) {
            console.log('Something went wrong. Try one more time');
            console.error(error.message);
        }
    }
}
