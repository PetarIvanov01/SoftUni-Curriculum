function solve(input) {

    let result = []
    for (const digit of input) {
        if (digit < 0) {
            result.unshift(digit)
        }
        else {
            result.push(digit)
        }
    }
    //result.forEach(el => console.log(el));
    console.log(result.join('\n'));

}
solve([7, -2, 8, 9])