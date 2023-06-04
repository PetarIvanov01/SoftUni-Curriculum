function solution() {

    const elements = {
        protein: 0,
        carbohydrate: 0,
        fat: 0,
        flavour: 0,
    }

    const recipes = {
        apple: {
            carbohydrate: 1,
            flavour: 2,
        },
        lemonade: {
            carbohydrate: 10,
            flavour: 20,
        },
        burger: {
            carbohydrate: 5,
            fat: 7,
            flavour: 3,
        },
        eggs: {
            protein: 5,
            fat: 1,
            flavour: 1,
        },
        turkey: {
            protein: 10,
            carbohydrate: 10,
            flavour: 10,
            fat: 10,
        },
    }
    const commands = {
        restock,
        prepare,
        report,
    }

    return manager;

    function manager(line) {
        let [command, type, qty] = line.split(' ');
        const fn = commands[command]
        return fn(type, qty)
    }

    function prepare(recipe, qty) {

        let requared = Object.entries(recipes[recipe]).map(el => [el[0], el[1] * Number(qty)]);

        for (const [key, value] of requared) {
            if (elements[key] < value) {
                return `Error: not enough ${key} in stock`
            }
            elements[key] -= value
            
        }
        return 'Success'
    }

    function restock(type, qty) {
        elements[type] += Number(qty);
        return 'Success'
    }

    function report() {
        return `protein=${elements.protein} carbohydrate=${elements.carbohydrate} fat=${elements.fat} flavour=${elements.flavour}`
    }


}
let manager = solution();
console.log(manager("restock carbohydrate 10")); // Success
console.log(manager("restock flavour 10"));
console.log(manager("prepare apple 1"));
console.log(manager("restock fat 10"));
console.log(manager("prepare burger 1"));
console.log(manager("report"));