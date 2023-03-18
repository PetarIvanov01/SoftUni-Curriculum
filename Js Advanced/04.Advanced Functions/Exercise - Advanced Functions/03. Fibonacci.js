/*First solve
function getFibonator() {
    let prev = 0;
    let curr = 1;
    let temp;

    return function innerCalc() {

        temp = prev + curr
        prev = curr
        curr = temp
        return prev

    }}*/
    
/* let fib = getFibonator();
 console.log(fib()); // 1
 console.log(fib()); // 1
 console.log(fib()); // 2
 console.log(fib()); // 3
 console.log(fib()); // 5
 console.log(fib()); // 8
 console.log(fib()); // 13 */

// Second solve
function getFibonator() {
    return (function innerFunc() {
        const temp = this.prev + this.curr
        this.prev = this.curr
        this.curr = temp

        return this.curr
    }).bind({
        prev: 1,
        curr: 0
    });
}

let fib = getFibonator();
console.log(fib()); // 1
console.log(fib()); // 1
console.log(fib()); // 2
console.log(fib()); // 3
console.log(fib()); // 5
console.log(fib()); // 8
console.log(fib()); // 13
