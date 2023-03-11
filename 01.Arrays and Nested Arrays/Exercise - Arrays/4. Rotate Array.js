function rotateArr(input,rotations) {

    for (let i = 0; i < rotations; i++) {
        
        input.unshift(input.pop())

    }

    return input.join(` `)

}
rotateArr(['1',
'2',
'3',
'4'],
2)