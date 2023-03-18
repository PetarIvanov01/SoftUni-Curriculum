function aggregateEl(input) {

    let sumOfAll = () => input.reduce((a, b) => a + b)
    console.log(sumOfAll());
    let sumOfInverse = () => {
        let result = 0
        for (let i = 0; i < input.length; i++) {
            result += 1/input[i] 
        }
        return result
    }
    console.log(sumOfInverse());
    let concat = () => input.reduce((a, b) => a.toString() + b.toString())
    console.log(concat());
    
}
aggregateEl([1, 2, 3])