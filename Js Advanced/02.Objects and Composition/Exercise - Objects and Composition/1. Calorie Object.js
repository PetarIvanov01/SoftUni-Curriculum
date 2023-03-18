function calorieObject(input) {

    let object = {}

    for (let i = 0; i < input.length; i += 2) {

        let product = input[i];
        let calorie = Number(input[i + 1]);

        object[product] = calorie;

    }
    return object;

}
calorieObject(['Yoghurt', '48', 'Rise', '138',

    'Apple', '52'])