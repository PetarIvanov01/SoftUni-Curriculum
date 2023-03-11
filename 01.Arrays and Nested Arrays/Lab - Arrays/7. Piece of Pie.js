function pieceOfPie(pieFlavors, start, end) {

    let result = pieFlavors.slice(pieFlavors.indexOf(start), pieFlavors.indexOf(end) + 1)
    return result;

}
pieceOfPie(['Pumpkin Pie',
    'Key Lime Pie',
    'Cherry Pie',
    'Lemon Meringue Pie',
    'Sugar Cream Pie'],
    'Key Lime Pie',
    'Lemon Meringue Pie')