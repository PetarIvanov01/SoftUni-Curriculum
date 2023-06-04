const { html, nav } = require("../util");
const { IncomingForm } = require('formidable')
const fs = require("fs")
const path = require("path");

const cssPath = path.join(__dirname, "..", "content", "styles", "site.css");
const catsPath = path.join(__dirname, 'data', 'cats.json');

function editPage(req, res, id) {

    let existingData = []
    fs.readFile(catsPath, 'utf-8', (err, data) => {

        existingData = JSON.parse(data);
        const currentCat = getCurrentCat(existingData, id)

        fs.readFile(cssPath, (err, css) => {

            res.write(
                html(`<body>
        <header>
           ${nav}
            <h1>Cat Shelter</h1>
        </header>
        <main>
            <form action="/cats/edit/${id}" method="POST" class="cat-form" enctype="multipart/form-data">
                <h2>Edit Cat</h2>
                <label for="name">Name</label>
                <input type="text" id="name" value=${currentCat.name}>
                <label for="description">Description</label>
                <textarea id="description">${currentCat.description}</textarea>
                <label for="image">Image</label>
                <input type="file" id="image" value=${currentCat.img}>
                <label for="group">Breed</label>
                <select id="group">
                ${currentCat.breed ? `<option value=${currentCat.breed}>${currentCat.breed}</option>` : `<option value=""></option>`}
                    
                </select>
                <button>Edit Cat</button>
            </form>
        </main>
    </body>
    `, `
    <link href="https://use.fontawesome.com/releases/v5.0.7/css/all.css" rel="stylesheet">
    <style>${css}</style>`, 'Cat Shelter')
            )
            res.end()
        })
    });
}

function editCat(req, res, id) {
    let existingData = [];
    const form = new IncomingForm();

    form.parse(req, (err, fields) => {

        console.log(fields);
        let editedCat = {
            id,
            name: fields.name,
            description: fields.description,
            img: fields.upload,
            breed: fields.breed
        };

        fs.readFile(catsPath, 'utf-8', (err, data) => {
            if (err) {
                console.error('Error reading JSON file:', err);
                return;
            }
            existingData = JSON.parse(data);
            const currentCatIndex = existingData.findIndex(cat => cat.id == id);


            existingData[currentCatIndex] = editedCat;

            fs.writeFile(catsPath, JSON.stringify(existingData), 'utf-8', err => {
                if (err) {
                    console.error('Error writing to JSON file:', err);
                } else {
                    console.log('Data saved to JSON file.');
                }
            });
        });
    });

    res.writeHead(302, { 'Location': '/' });
    res.end();

}


function getCurrentCat(data, id) {

    return data.filter(cat => cat.id == id)[0]

}

module.exports = { editPage, editCat }