let host = 'http://localhost:3030/'
async function request(method, path, data, auth) {

    try {
        const options = {
            method,
            headers: {}
        };

        if (data != undefined) {
            options.headers['Content-Type'] = 'application/json';
            options.body = JSON.stringify(data);
        }
        if (auth != undefined) {
            options.headers["X-Authorization"] = auth.accessToken
        }

        const response = await fetch(host + path, options);

        let result = await response.json();

        if (response.ok == false) {
            const error = result;
            throw error;
        }

        if (method == 'post' && auth == undefined) {

            sessionStorage.setItem('user', JSON.stringify(result));
            
        }

        return result;
    }
    catch (error) {

        alert(error.message)
        throw error;

    }

}

export const get = request.bind(null, 'get');
export const post = request.bind(null, 'post');
export const del = request.bind(null, 'delete');
export const put = request.bind(null, 'put');



