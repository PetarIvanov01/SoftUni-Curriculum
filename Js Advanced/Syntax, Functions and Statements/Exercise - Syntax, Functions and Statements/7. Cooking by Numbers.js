function cookingByNumbers(number, ...other) {


    let chop = () => console.log(number = number / 2);
    let dice = () => console.log(number = Math.sqrt(number));
    let spice = () => console.log(number = number + 1);
    let bake = () => console.log(number = number * 3);
    let fillet = () => console.log(number = number * 0.80);

    for (const command of other) {
        switch (command) {
            case `chop`: chop()
                break;
            case `dice`: dice()
                break;
            case `spice`: spice()
                break;
            case `bake`: bake()
                break;
            case `fillet`: fillet()
                break;
        }
    }




}
cookingByNumbers('32', 'chop', 'chop', 'chop', 'chop', 'chop')