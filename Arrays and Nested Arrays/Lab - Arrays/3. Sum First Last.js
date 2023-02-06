function sumFirstLast(input) {

    let firstEl = Number(input.shift());
    let lastEl = Number(input.pop());

    return firstEl + lastEl;

}
let result = sumFirstLast(['10', '20', '30', `40`, `50`])
console.log(result);