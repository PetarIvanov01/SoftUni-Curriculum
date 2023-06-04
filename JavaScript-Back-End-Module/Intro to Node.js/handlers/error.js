const { html } = require("../util");

function errorPage(request, response) {

    response.write('Error...')

    response.end();
}
module.exports = {errorPage}