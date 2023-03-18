function smallNumb(input) {

    let firstSmall = input.splice(input.indexOf(Math.min(...input)),1)
    let secondSmall = input.splice(input.indexOf(Math.min(...input)),1)
    
    console.log(firstSmall.join(``));
    console.log(secondSmall.join(``));

}
smallNumb([30, 15, 50, 5])