(function solve() {
    Array.prototype.last = function () {
        return this[this.length - 1];
    }
    Array.prototype.skip = function (n) {
        return this.slice(n)
    }
    Array.prototype.take = function (n) {
        return this.slice(0, n);
    }
    Array.prototype.sum = function () {

    }
    Array.prototype.average = function () {

    }

})()

let myArr = [1, 2, 3];
console.log(myArr.take(1));