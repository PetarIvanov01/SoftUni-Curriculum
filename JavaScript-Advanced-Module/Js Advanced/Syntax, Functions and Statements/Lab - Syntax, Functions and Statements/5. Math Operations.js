function mathOperations(n1, n2, operator) {

    let plus = (a, b) => a + b;
    let mines = (a, b) => a - b;
    let multiple = (a, b) => a * b;
    let divide = (a, b) => a / b;
    let mod = (a, b) => a % b;
    let power = (a, b) => a ** b;

    let result;
    switch (operator) {
        case `+`: result = plus(n1, n2);
            break;
        case `-`: result = mines(n1, n2);
            break;
        case `*`: result = multiple(n1, n2);
            break;
        case `/`: result = divide(n1, n2);
            break;
        case `%`: result = mod(n1, n2);
            break;
        case `**`: result = power(n1, n2);
            break;
    }
    console.log(result);
}
mathOperations(5, 6, `+`)