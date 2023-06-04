function magicMatrices(input) {

    let sumOfRow = input[0].reduce((a, b) => a + b, 0);

    for (let i = 0; i < input.length; i++) {

        let currentCol = 0
        let currentRow = 0

        for (let j = 0; j < input.length; j++) {

            currentRow += input[i][j]
            currentCol += input[j][i]

        }

        if (currentRow !== sumOfRow || currentCol !== sumOfRow) {
            return false
        }

    }
    return true

}
let result = magicMatrices([[4, 5, 6],
[6, 5, 1],
[5, 5, 5]])
console.log(result);
