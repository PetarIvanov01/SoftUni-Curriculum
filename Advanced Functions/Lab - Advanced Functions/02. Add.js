function solution(initialValue) {

    return function (a) {
        a += initialValue;
        return a;
    };

}

let add5 = solution(5);
console.log(add5(2));
console.log(add5(3));