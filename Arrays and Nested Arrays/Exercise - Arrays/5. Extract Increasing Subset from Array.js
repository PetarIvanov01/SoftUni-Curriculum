function extractArr(input) {

    let biggestNumb = input[0]
    let result = [biggestNumb]

    for (let i = 1; i < input.length; i++) {
        let currentNumb = Number(input[i])
        
        if (biggestNumb <= currentNumb) {
            result.push(currentNumb)
            biggestNumb = currentNumb
        }
        
    }
    return result

}
extractArr([1, 3, 8, 4, 10, 12, 3, 2, 24])