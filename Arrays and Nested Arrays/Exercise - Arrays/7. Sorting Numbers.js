function sortNumb(input) {

    let result = []
    input.sort((a, b) => a - b)

    while (input.length !== 0) {

        let smallest = input.shift()
        let biggest = input.pop()

        result.push(smallest, biggest)

    }

    return result;

}
sortNumb([1, 65, 3, 52, 48, 63, 31, -3, 18, 56])