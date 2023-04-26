let host = 'http://localhost:3030/';

async function request(method, url, data) {

    const option = {
        method,
        headers: {},
    }

    if (data != undefined) {
        option.headers['Content-Type'] = 'application/json';
        option.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(host + url, option);

        if (response.ok != true) {
            const err = await response.json()
            throw new Error(err.message);
        }
        if (response.status == 204) {
            return;
        }


        return response.json()

    }
    catch (err) {
        alert(err.message);
        throw err
    }


}

const get = request.bind(null, 'get')
const post = request.bind(null, 'post')
const put = request.bind(null, 'put')
const del = request.bind(null, 'delete')

export {
    get,
    post,
    put,
    del as deleted
}