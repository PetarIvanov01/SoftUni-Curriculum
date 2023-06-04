function add(sum) {

    const innerFunc = function (add) {
        sum += add
        return innerFunc

    };

    innerFunc.valueOf= function () {
        return sum
    }

    return innerFunc
}

console.log(Number(add(1)(6)(-3)));