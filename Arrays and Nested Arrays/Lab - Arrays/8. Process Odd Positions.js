function oddPositions(input) {

    return input.filter((el,index) => index % 2 !== 0).map(el => el * 2).reverse()
    
}
oddPositions([10, 15, 20, 25])