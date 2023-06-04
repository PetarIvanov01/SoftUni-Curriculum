const { html, nav } = require("../util");
const fs = require("fs")
const path = require("path");

let existingData = []

const filePath = path.join(__dirname, 'data', 'cats.json');
const cssPath = path.join(__dirname, "..", "content", "styles", "site.css");

function homePage(req, res) {

    res.writeHead(200, { 'Content-Type': 'text/html' })
   
    let existingData = []
    fs.readFile(filePath, 'utf-8', (err, data) => {

        existingData = JSON.parse(data);

        fs.readFile(cssPath, (err, css) => {

            res.write(html(`
            <body>
            <header>
                    ${nav}
                <h1>Cat Shelter</h1>
                <form action="/search">
                    <input type="text">
                    <button type="button">Search</button>
                </form>
            </header>
           
            <main>
                <section class="cats">
                    <ul>
                    ${existingData.map(el => `<li>
                        <img src=${el.img} alt="Black Cat">
                        <h3>${el.name}</h3>
                        <p><span>Breed: </span>${el.breed}</p>
                        <p><span>Description: </span>${el.description}</p>
                        <ul class="buttons">
                            <li class="btn edit"> <a href="/cats/edit/${el.id}">Change Info</a></li>
                            <li class="btn delete"> <a href="">New Home</a></li>
                        </ul>
                    </li>`
            )}
                    </ul>
                </section>
            </main>
        </body>`,
                `<link href="https://use.fontawesome.com/releases/v5.0.7/css/all.css" rel="stylesheet">
                <link rel="shortcut icon" type="image/png" href="/content/images/pawprint.ico" />
                <style>${css}</style>
                `,
                `Cat Shelter`));

            res.end();
        })

    })
}
module.exports = { homePage }