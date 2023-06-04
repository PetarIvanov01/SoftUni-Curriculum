const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, 'cubics.json');
const cubes = JSON.parse(fs.readFileSync(jsonPath));

async function persist() {
    return new Promise((res, rej) => {
        fs.writeFile(jsonPath, JSON.stringify(cubes), (err) => {
            if (err == null) {
                res();
            }
            else {
                rej(err)
            }
        })
    })
}

async function createCub(data) {

    const cubeModel = {
        id: generateRandomId(),
        name: data.name,
        description: data.description,
        imageUrl: data.imageUrl,
        difficulty: Number(data.difficultyLevel)
    }
    cubes.push(cubeModel);

    await persist()

    return cubeModel.id;

}
function getAllCubes() {

    return cubes;
}
function getById(id) {

    return cubes.find(el => el.id == id);
}
function getBySearch(name, from, to) {

    if (name == '' && from == 0 && to == 0) {
        return cubes;
    }
    else {

        return cubes.filter(el => el.name.toLowerCase() == name.toLowerCase() && el.difficulty >= from && el.difficulty <= to)
    }
}

function generateRandomId() {
    let randomId = Math.floor(10000 + Math.random() * 90000);
    return randomId;
}

module.exports = { getAllCubes, createCub, getById, getBySearch };

