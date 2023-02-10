function carFactory(car) {

    let carObj = {
        model: car.model
    }
    if (car.power <= 90) {
        carObj['engine'] = {
            power: 90,
            volume: 1800,
        }
    }
    else if (car.power <= 120) {
        carObj['engine'] = {
            power: 120,
            volume: 2400,
        }
    }
    else if (car.power <= 200) {
        carObj['engine'] = {
            power: 200,
            volume: 3500,
        }
    }
    carObj['carriage'] = {
        type: car.carriage,
        color: car.color,
    }
    if (car.wheels % 2 == 0) {

        car.wheelsize--
        

    }
    carObj['wheels'] = [car.wheelsize,car.wheelsize,car.wheelsize,car.wheelsize]

    return carObj

}
let result = carFactory
    ({
        model: 'VW Golf II',

        power: 90,

        color: 'blue',

        carriage: 'hatchback',

        wheelsize: 14
    })
    console.log(result);