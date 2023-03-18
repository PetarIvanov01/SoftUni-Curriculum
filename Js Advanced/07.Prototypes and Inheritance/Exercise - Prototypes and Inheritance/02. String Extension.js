(function solve() {
    String.prototype.ensureStart = function (str) {
        if (!this.startsWith(str)) {
            return str.concat(this)
        }
        return this.toString()
    }
    String.prototype.ensureEnd = function (str) {
        if (!this.endsWith(str)) {
            return this.concat(str)
        }
        return this.toString()
    }
    String.prototype.isEmpty = function () {
        return this.length === 0 ? true : false
    }
    String.prototype.truncate = function (n) {
        if (n < 3) {
            return '.'.repeat(n);
        }
        if (this.toString().length <= n) {
            return this.toString()
        }
        else {
            let index = this.toString().substring(0, n - 2).lastIndexOf(' ');
            if (index !== -1) {
                return this.toString().substring(0, index) + '...';
            }
            return this.toString().substring(0, n - 3) + '...';
        }
    }
    String.format = function (str, ...params) {

        for (let i = 0; i < params.length; i++) {
            str = str.replace(`{${[i]}}`, params[i])
        }
        return str

    }
})()
let str = 'my string';
str = str.ensureStart('my');
console.log(str);
str = str.ensureStart('hello ');
console.log(str);
str = str.truncate(16);
console.log(str);
str = str.truncate(14);
console.log(str);
str = str.truncate(8);
console.log(str);
str = str.truncate(4);
console.log(str);
str = str.truncate(2);
console.log(str);
str = String.format('The {0} {1} fox', 'quick', 'brown');
str = String.format('jumps {0} {1}', 'dog');