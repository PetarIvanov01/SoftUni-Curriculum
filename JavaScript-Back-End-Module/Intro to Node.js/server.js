const http = require('http');
const port = 5000;
const { homePage } = require('./handlers/home');
const { errorPage } = require('./handlers/error');
const { createPage, createCat } = require('./handlers/create');
const { breedPage, createBreed } = require('./handlers/addBreed');
const { editPage, editCat } = require('./handlers/edit');

const router = {
    '/': { 'GET': homePage },
    '/cats/add-cat': { 'GET': createPage, 'POST': createCat },
    '/cats/add-breed': { 'GET': breedPage, 'POST': createBreed }
}

http.createServer((req, res) => {

    const { pathname } = new URL(req.url, `http://${req.headers.host}`);
    const match = router[pathname];

    if (pathname.includes('/cats/edit')) {
        const id = pathname.substring('/cats/edit/'.length);
        if (req.method === 'GET') {
            editPage(req, res, id);
        }
        else if (req.method === 'POST') {
            editCat(req, res, id)
        }
    }

    else if (typeof match == 'object' && req.method == 'GET') {

        router[pathname]['GET'](req, res)

    }
    else if (typeof match == 'object' && req.method == 'POST') {

        router[pathname]['POST'](req, res)

    }
    else if (typeof match != 'object' && !req.method) {
        errorPage(req, res)
    }
    else{
        res.end()
    }

}).listen(port)
console.log(`The server is started on port ${port}!`);

