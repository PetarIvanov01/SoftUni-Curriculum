function bigEl(input) {

    let maxNumb = []
    for (const arr of input) {
        maxNumb.push(Math.max(...arr))
    }
    return Math.max(...maxNumb)

}
bigEl([[20, 50, 10],
[8, 33, 145]])