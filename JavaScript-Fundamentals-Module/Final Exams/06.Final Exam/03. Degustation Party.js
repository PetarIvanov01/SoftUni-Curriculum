function solve(input) {

    let commadn = input.shift();
    let collection = {};
    let unlikedMeals = 0;
    
    while (commadn !== 'Stop') {

        let data = commadn.split('-');

        switch (data[0]) {
            case 'Like': like(data[1], data[2]);
                break;
            case 'Dislike': dislike(data[1], data[2]);
                break;
        }
        commadn = input.shift();
    }
    for (const key in collection) {
        console.log(`${key}: ${collection[key].join(', ')}`);
    }
    console.log(`Unliked meals: ${unlikedMeals}`);
    function like(guest, meal) {
        if (!collection.hasOwnProperty(guest)) {
            collection[guest] = [];
        };
        if (!collection[guest].includes(meal)) {
            collection[guest].push(meal)
        }
    }
    function dislike(guest, meal) {

        if (!collection.hasOwnProperty(guest)) {
            console.log(`${guest} is not at the party.`);
        }
        else {
            if (!collection[guest].includes(meal)) {
                console.log(`${guest} doesn't have the ${meal} in his/her collection.`);
            }
            else {
                unlikedMeals++;
                let index = collection[guest].indexOf(meal);
                collection[guest].splice(index, 1);
                console.log(`${guest} doesn't like the ${meal}.`);
            }
        }
    }

}
solve(["Like-Krisi-shrimps",
    "Dislike-Vili-carp",
    "Dislike-Krisi-salad",
    "Stop"])
