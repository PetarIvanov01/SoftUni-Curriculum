class CarDealership {
    constructor(name) {
        this.name = name;
        this.availableCars = [];
        this.soldCars = [];
        this.totalIncome = 0;
    }

    addCar(model, horsepower, price, mileage) {
        if (model === '' || horsepower < 0 || price < 0 || mileage < 0) {
            throw new Error('Invalid input!');
        }
        let newCar = { model, horsepower, price, mileage };
        this.availableCars.push(newCar);

        return `New car added: ${model} - ${horsepower} HP - ${mileage.toFixed(2)} km - ${price.toFixed(2)}$`;



    }
    sellCar(model, desiredMileage) {

        let car = this.availableCars.find(el => el.model === model);

        if (car === undefined) {
            throw new Error(`${model} was not found!`);
        };
        let diffrence = Math.abs(car.mileage - desiredMileage);
        if (car.mileage <= desiredMileage) {
            car.price = car.price;
        }
        else if (diffrence <= 40000) {
            car.price = car.price * 0.95;
        }
        else {
            car.price = car.price * 0.90;
        }
        let soldCar = { model: car.model, horsepower: car.horsepower, soldPrice: car.price }
        this.soldCars.push(soldCar);
        this.availableCars.splice(this.availableCars.indexOf(car), 1);

        return `${model} was sold for ${car.price.toFixed(2)}$`;

    }
    currentCar() {
        let output = '-Available cars:\n';
        if (this.availableCars.length === 0) {
            return `There are no available cars`
        }
        for (const car of this.availableCars) {
            output += `---${car.model} - ${car.horsepower} HP - ${car.mileage.toFixed(2)} km - ${car.price.toFixed(2)}$\n`
        }
        return output.trim();

    }
    salesReport(criteria) {

    }

}
let dealership = new CarDealership('SoftAuto');
dealership.addCar('Toyota Corolla', 100, 3500, 190000);
dealership.addCar('Mercedes C63', 300, 29000, 187000);
dealership.addCar('Audi A3', 120, 4900, 240000);
dealership.sellCar('Toyota Corolla', 230000);
dealership.sellCar('Mercedes C63', 110000);
console.log(dealership.salesReport('horsepower'));



