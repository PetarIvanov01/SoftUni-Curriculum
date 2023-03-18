function stringLength(p1,p2,p3) {
    
    let firstString = p1.toString();
    let secondString = p2.toString();
    let thirdString = p3.toString();

    let sumOfLength = firstString.length + secondString.length + thirdString.length
    let average = Math.floor(sumOfLength / 3)

    console.log(sumOfLength);
    console.log(average);
    
}
stringLength('chocolate', 'ice cream', 'cake')