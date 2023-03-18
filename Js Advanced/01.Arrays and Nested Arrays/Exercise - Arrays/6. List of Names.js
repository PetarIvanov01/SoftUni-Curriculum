function listOfNames(input) {

    let sorted = input.sort((a, b) => a.localeCompare(b))
    let number = 1

    sorted.forEach(name => {
        console.log(`${number}.${name}`);
        number++
    });
}
listOfNames(["John",

    "Bob",

    "Christina",

    "Ema"])