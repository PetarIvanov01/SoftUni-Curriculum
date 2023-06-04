function solution() {

    let str = ''

    return {

        append: (s) => str += s,
        removeEnd: (n) => str = str.substring(0, str.length - n),
        removeStart: (n) => str = str.substring(n),
        print: () => console.log(str)
    
    }

}
console.log(solution);
let firstZeroTest = solution();
firstZeroTest.append('hello');
firstZeroTest.append('again');
firstZeroTest.removeStart(3);
firstZeroTest.removeEnd(4);
firstZeroTest.print();
