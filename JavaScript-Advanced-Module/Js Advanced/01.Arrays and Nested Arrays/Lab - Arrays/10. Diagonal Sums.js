function diagonalSums(matrix) {
    
    let mainDiagonalSum = 0;
    let secondaryDiagonalSum = 0;
    for (let i = 0; i < matrix.length; i++) {
        mainDiagonalSum += Number(matrix[i][i]);
        secondaryDiagonalSum += Number(matrix[i][matrix.length - 1 - i]);
    }
    return [mainDiagonalSum, secondaryDiagonalSum].join(` `);
}

let result = diagonalSums([[3, 5, 17],
[-1, 7, 14],
[1, -8, 89]])

console.log(result);