import simpleRestProvider from 'ra-data-simple-rest';
import { fetchUtils } from 'react-admin';
//import resource from '../tenants';
//import { resolve } from 'path';

const httpClient = (url: string, options: fetchUtils.Options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json'});
    }

    //options.method = 'GET';

    return fetchUtils.fetchJson(url, options);
}

//const serverUrl = `${window.location.protocol}///${window.location.hostname}:${window.location.port}`
const serverUrl = `${window.location.protocol}///${window.location.hostname}:8080`
const restProvider = simpleRestProvider(serverUrl, httpClient);

/* const restProvider = new Proxy(rProvider, {
    get: (target, name, self) =>
        name === 'then'
            ? self
            : (resource: string, params: any) =>
                new Promise(resolve =>
                    setTimeout(
                        () =>
                        resolve(
                            rProvider[name as string](resource, params)
                        )
                    )
                ),
}); */

export default restProvider;