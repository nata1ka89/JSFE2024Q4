import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        const apiUrl = process.env.API_URL;
        const apiKey = process.env.API_KEY;
        if (!apiUrl || !apiKey) {
            throw new Error('apiUrl or apiKey is undefined');
        }
        super(apiUrl, {
            apiKey,
        });
    }
}

export default AppLoader;
