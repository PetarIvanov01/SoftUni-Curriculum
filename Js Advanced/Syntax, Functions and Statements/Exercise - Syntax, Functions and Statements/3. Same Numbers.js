function sameNumbers(input) {

    let isTheSame = true;
    input = input.toString()
    let digitToCompare = input[0]
    let sum = 0

    for (const digit of input) {
        if (digitToCompare !== digit) {
            isTheSame = false

        }
        sum += Number(digit)
    }
    console.log(`${isTheSame}\n${sum}`);
}
sameNumbers(1234)