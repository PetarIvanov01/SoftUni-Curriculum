function sumNumbers(n1,n2) {

    let firstNum = Number(n1);
    let secondNum = Number(n2);

    let result = 0;

    for (let i = firstNum; i <= secondNum; i++) {
        result += i
    }
    return result

}
sumNumbers('-8', '20')