const { html, nav } = require("../util");
const { IncomingForm } = require('formidable')
const fs = require("fs")
const path = require("path");

const breadsPath = path.join(__dirname, 'data', 'breeds.json');
const catsPath = path.join(__dirname, 'data', 'cats.json');

function createPage(req, res) {

    let existingData = []
    fs.readFile(breadsPath, 'utf-8', (err, data) => {
        existingData = JSON.parse(data)
    });

    const cssPath = path.join(__dirname, "..", "content", "styles", "site.css");

    fs.readFile(cssPath, (err, data) => {
        res.write(html(`<body>
    <header>
        ${nav}
        <h1>Cat Shelter</h1>
    </header>
    <main>
        <form action="/cats/add-cat" method="POST" class="cat-form" enctype="multipart/form-data">
            <h2>Add Cat</h2>
            <label for="name">Name</label>
            <input name="name" type="text" id="name">
            <label for="description">Description</label>
            <textarea name="description" id="description"></textarea>
            <label for="image">Image</label>
            <input name="upload" type="file" id="image">
            <label for="group">Breed</label>
            <select name="breed" id="group">
            ${existingData.map(el => `<option value="${el.breed}">${el.breed}</option>`)}
            </select>
            <button type="submit">Add Cat</button>
        </form>
    </main>
</body>`,
            `<style>${data}</style>
            <link href="https://use.fontawesome.com/releases/v5.0.7/css/all.css" rel="stylesheet">`, `Cat Shelter`));


        res.end();
    })

}

function createCat(req, res) {

    const form = new IncomingForm()

    form.parse(req, (err, field) => {

        let item = {
            id: getRandomInt(1000, 9999),
            name: field.name,
            description: field.description,
            img: field.upload,
            breed: field.breed
        }

        fs.readFile(catsPath, 'utf-8', (err, data) => {
            if (err) {
                console.error('Error reading JSON file:', err);
                return;
            }

            let jsonData = JSON.parse(data);
            jsonData.push(item);

            fs.writeFile(catsPath, JSON.stringify(jsonData), { encoding: 'utf-8' }, (err) => {
                if (err) {
                    console.error('Error writing to JSON file:', err);
                } else {
                    console.log('Data saved to JSON file.');
                }
            });
        });
    })

    res.writeHead(302, { 'Location': '/' });
    res.end()
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
module.exports = { createPage, createCat }

