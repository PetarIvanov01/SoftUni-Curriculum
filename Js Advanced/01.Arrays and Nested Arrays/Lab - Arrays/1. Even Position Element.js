function evenEl(input) {

    return input.filter((el,index) => index % 2 == 0).join(` `)

}
let result = evenEl(['20', '30', '40', '50', '60'])
console.log(result);