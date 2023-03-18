function circleArea(param) {
    
    let area;
    let typOfArgument = typeof param
    if (typOfArgument === `number`) {
        area = (param**2) * Math.PI
        console.log(area.toFixed(2));
    }
    else{
        console.log(`We can not calculate the circle area, because we receive a ${typOfArgument}.`);
    }
}
circleArea(`5`)