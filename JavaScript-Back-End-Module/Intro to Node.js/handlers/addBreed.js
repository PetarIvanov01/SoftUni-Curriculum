const { html, nav } = require("../util");
const fs = require("fs")
const path = require("path");
const { IncomingForm } = require('formidable');


function breedPage(req, res) {
    let existingData = [];
    res.writeHead(200, { 'Content-Type': 'text/html' })

    const cssPath = path.join(__dirname, "..", "content", "styles", "site.css");

    fs.readFile(cssPath, (err, data) => {

        res.write(html(`
        <body>
            <header>
            ${nav}
                <h1>Cat Shelter</h1>
            </header>
            <main>
                <form action="/cats/add-breed" method="POST" class="cat-form">
                    <h2>Add Cat Breed</h2>
                    <label for="breed-name">Breed Name</label>
                    <input name="breed" type="text" id="breed-name">
                    <button type="submit">Add Breed</button>
                </form>
            </main>
        </body>`, `<style>${data}</style>
        <link href="https://use.fontawesome.com/releases/v5.0.7/css/all.css" rel="stylesheet">`, 'Cat Shelter'))

        res.end()
    })

}
function createBreed(req, res) {

    const filePath = path.join(__dirname, 'data', 'breeds.json');
    const fileContent = fs.readFileSync(filePath);

    existingData = JSON.parse(fileContent);

    const form = new IncomingForm();

    form.parse(req, (err, field) => {

        let item = {
            breed: field.breed
        };
        existingData.push(item)
        const breedJson = JSON.stringify(existingData);

        fs.writeFile(filePath, breedJson, 'utf8', (err) => {
            if (err) {
                console.error('Error writing to JSON file:', err);
            } else {
                console.log('Data saved to JSON file.');
            }
        })
    })
    res.writeHead(302, { 'Location': '/' });
    res.end()
}
module.exports = { breedPage, createBreed }

