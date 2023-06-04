const { expect } = require('chai');
const { carService } = require('./03. Car Service_Resources');

describe("Tests", () => {
    describe("Tests for isItExpensive func", () => {
        it('If input is diffrent than string invalid', () => {
            expect(carService.isItExpensive(undefined)).to.equal('The overall price will be a bit cheaper');
            expect(carService.isItExpensive('Engin')).to.equal('The overall price will be a bit cheaper');
            expect(carService.isItExpensive(1)).to.equal('The overall price will be a bit cheaper');
        })
        it('Test if the input is Engine', () => {
            expect(carService.isItExpensive('Engine')).to.equal('The issue with the car is more severe and it will cost more money');
        })
        it('Test if the input is Transmission', () => {
            expect(carService.isItExpensive('Transmission')).to.equal('The issue with the car is more severe and it will cost more money');
        })
    })
    describe("Tests for discount func", () => {
        it('If first param is not a number trow error', () => {
            expect(() => carService.discount('1', 2)).throw()
            expect(() => carService.discount(undefined, 2)).throw()
            expect(() => carService.discount([], 2)).throw()
        })
        it('If second param is not a number trow error', () => {
            expect(() => carService.discount(1, '')).throw()
            expect(() => carService.discount(1, undefined)).throw()
            expect(() => carService.discount(1, [])).throw()
        })
        it('Test with valid parametar', () => {
            expect(carService.discount(4, 8)).to.equal('Discount applied! You saved 1.2$');
            expect(carService.discount(2, 2)).to.equal('You cannot apply a discount');
            expect(carService.discount(4, 2)).to.equal('Discount applied! You saved 0.3$');
            expect(carService.discount(1, 2)).to.equal('You cannot apply a discount');
        })
    
    });
    describe("Tests for partsToBuy func", () => {
        it('IF the first param is not array throw error', () => {
            expect(() => carService.partsToBuy(undefined, ["blowoff valve", "injectors"])).throw()
            expect(() => carService.partsToBuy('', ["blowoff valve", "injectors"])).throw()
            expect(() => carService.partsToBuy(1, ["blowoff valve", "injectors"])).throw()
            expect(() => carService.partsToBuy({}, ["blowoff valve", "injectors"])).throw()
        })
        it('IF the second param is not array throw error', () => {
            expect(() => carService.partsToBuy([{ part: "blowoff valve", price: 145 }, { part: "coil springs", price: 230 }], undefined)).throw()
            expect(() => carService.partsToBuy([{ part: "blowoff valve", price: 145 }, { part: "coil springs", price: 230 }], '')).throw()
            expect(() => carService.partsToBuy([{ part: "blowoff valve", price: 145 }, { part: "coil springs", price: 230 }], 1)).throw()
            expect(() => carService.partsToBuy([{ part: "blowoff valve", price: 145 }, { part: "coil springs", price: 230 }], {})).throw()
        })
        it('Test with valid parametars', () => {
            expect(carService.partsToBuy([{ part: "blowoff valve", price: 145 }, { part: "coil springs", price: 230 }], ["blowoff valve", "injectors"])).to.equal(145)
            expect(carService.partsToBuy([{ part: "blowoff valv", price: 45 }, { part: "coil springs", price: 230 }], ["blowoff valv", "injectors"])).to.equal(45);
        })
    })
})


