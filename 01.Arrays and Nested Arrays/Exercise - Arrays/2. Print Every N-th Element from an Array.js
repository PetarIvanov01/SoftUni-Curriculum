function nthElement(input,step) {

    let arr = []
    for (let i = 0; i < input.length; i+=step) {
        arr.push(input[i])
    }

    return arr

}
nthElement(['5',

'20',

'31',

'4',

'20'],

2)