function biggerHalf(input) {

    let result = input.sort((a, b) => a - b).slice(input.length/2)
    return result

}
biggerHalf([3, 19, 14, 7, 2, 19, 6])