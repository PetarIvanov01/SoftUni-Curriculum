const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(express.static('public'))
app.use(express.json()); // Parse JSON-encoded bodies
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars');

//Load Home Page
app.get('/', (req, res) => {

    const cats = path.join(__dirname, 'jsonData', 'cats.json');

    fs.readFile(cats, 'utf-8', (err, data) => {
        const catsData = JSON.parse(data);


        res.render('home', { cats: catsData })
    })
})

//Implamant searching
// app.get('/search/:params')

//Load Add Breed Page
app.get('/cats/add-breed', (req, res) => {

    res.render('breed')
})

//Load Add Cat Page
app.get('/cats/add-cat', (req, res) => {

    const cats = path.join(__dirname, 'jsonData', 'breed.json');

    fs.readFile(cats, 'utf-8', (err, data) => {
        const breedData = JSON.parse(data);


        res.render('addCat', { breed: breedData });
    })
})

//Load Edit Cat Page
app.get('/cats/edit/:id', (req, res) => {

    const id = req.params.id;
    const cats = path.join(__dirname, 'jsonData', 'cats.json');
    const breeds = path.join(__dirname, 'jsonData', 'breed.json');

    let catsArray = []

    //Set the right data to the fields
    fs.readFile(cats, { encoding: 'utf-8' }, (err, cat) => {
        fs.readFile(breeds, { encoding: 'utf-8' }, (err, breed) => {

            catsArray = JSON.parse(cat);
            const currentCat = catsArray.filter(cat => cat.id == id)[0];

            res.render('editCat', { cat: currentCat, breed: JSON.parse(breed) })
        })
    })
})

//Edit cat by Id 
app.post('/edit/cat/:id', (req, res) => {
    const id = req.params.id;

    const body = req.body;

    const catData = {
        "image": body.imageHref,
        "name": body.name,
        "breed": body.breed,
        "description": body.description,
        "id": id
    }

    const pathCats = path.join(__dirname, 'jsonData', 'cats.json');

    fs.readFile(pathCats, 'utf-8', (err, data) => {

        let currentData = JSON.parse(data)
        let currentCat = currentData.find(el => el.id == id);
        let index = currentData.indexOf(currentCat);

        currentData[index] = catData;

        fs.writeFile(pathCats, JSON.stringify(currentData), { encoding: 'utf-8' }, (err) => {

            if (err) throw err;

            console.log('JSON data appended to file successfully.');

            res.redirect('/')
        })
    })
})

//Load Shelter Cat by Id
app.get('/cats/shelter/:id', (req, res) => {

    const id = req.params.id;
    const catsPath = path.join(__dirname, 'jsonData', 'cats.json');

    fs.readFile(catsPath, { encoding: 'utf-8' }, (err, data) => {

        const catsArr = JSON.parse(data);
        const currentCat = catsArr.find(cat => cat.id == id);

        res.render('shelter', { cat: currentCat });

    })

})

//Shelter(delete) the cat;
app.post('/shelter/cat/:id', (req, res) => {

    const id = req.params.id
    const catsPath = path.join(__dirname, 'jsonData', 'cats.json');

    fs.readFile(catsPath, { encoding: 'utf-8' }, (err, data) => {

        const catsArr = JSON.parse(data);
        const currentCat = catsArr.find(cat => cat.id == id);
        const index = catsArr.indexOf(currentCat);

        catsArr.splice(index, 1);

        fs.writeFile(catsPath, JSON.stringify(catsArr), { encoding: 'utf-8' }, (err) => {

            if (err) throw err;

            console.log('JSON data appended to file successfully.');

            res.redirect('/')
        })
    })
})

//Add new breed in the JSON;
app.post('/breed', (req, res) => {

    const breedFile = { breed: req.body.breed };
    const pathBreed = path.join(__dirname, 'jsonData', 'breed.json');

    fs.readFile(pathBreed, 'utf-8', (err, data) => {

        let currentData = JSON.parse(data);
        currentData.push(breedFile)

        fs.writeFile(pathBreed, JSON.stringify(currentData), { encoding: 'utf-8' }, (err) => {

            if (err) throw err;

            console.log('JSON data appended to file successfully.');

            res.redirect('/')
        })
    })
});

//Add new Cat in the JSON;
app.post('/add-cat', (req, res) => {

    const body = req.body;

    const catData = {
        "image": body.imageHref,
        "name": body.name,
        "breed": body.breed,
        "description": body.description,
        "id": generateRandomId()
    }

    const pathCats = path.join(__dirname, 'jsonData', 'cats.json');

    fs.readFile(pathCats, 'utf-8', (err, data) => {

        let currentData = JSON.parse(data);
        currentData.push(catData)

        fs.writeFile(pathCats, JSON.stringify(currentData), { encoding: 'utf-8' }, (err) => {

            if (err) throw err;

            console.log('JSON data appended to file successfully.');

            res.redirect('/')
        })
    })

})

//Id Generator;
function generateRandomId() {
    return Math.floor(Math.random() * 101); // Generates a random number between 0 and 100 (inclusive)
}

app.listen(5000, () => console.log('The server run on port 5000....'))