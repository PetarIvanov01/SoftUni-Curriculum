const { expect } = require('chai');
const { chooseYourCar } = require('./solve');

describe("Tests", () => {
    describe("Test for choosingType Func", () => {

        it('Test for car over or equal 2010 year', () => {
            expect(chooseYourCar.choosingType('Sedan', 'Red', 2010)).to.equal('This Red Sedan meets the requirements, that you have.')
        })
        it('Test for car under 2010 year', () => {
            expect(chooseYourCar.choosingType('Sedan', 'Red', 2009)).to.equal('This Sedan is too old for you, especially with that Red color.')
        })
        it('Test if the type of car is diffrent than Sedan to trow Error', () => {
            expect(() => chooseYourCar.choosingType('Seda', 'Red', 2009)).throw()
        })
        it('Test if the year is under 1900 to trow Error', () => {
            expect(() => chooseYourCar.choosingType('Sedan', 'Red', 1899)).throw()
        })
        it('Test if the year is under 2022 to trow Error', () => {
            expect(() => chooseYourCar.choosingType('Sedan', 'Red', 2023)).throw()
        })

    })
    describe("Test for brandName Func", () => {
        it('Test the index does it remove the elements', () => {
            expect(chooseYourCar.brandName(['Bwm', 'Pegout', 'Ferari'], 2)).to.equal('Bwm, Pegout')
        })
        it('Test if the first param is a number to trow Error', () => {
            expect(() => chooseYourCar.brandName(1, 2)).throw();
            expect(() => chooseYourCar.brandName('', 2)).throw();
        })
        it('Test if the first param is a object to trow Error', () => {
            expect(() => chooseYourCar.brandName({}, 2)).throw();
        })
        it('Test if the second param is string to trow Error', () => {
            expect(() => chooseYourCar.brandName(['BWm', 'Pegout'], '2')).throw();
        })
        it('Test if the second param is decimal Number', () => {
            expect(() => chooseYourCar.brandName(['BWm', 'Pegout'], 2.1)).throw();
            expect(chooseYourCar.brandName(['bmw'], 0)).to.equal('')
        })
        it('Test if the second param is negativ', () => {
            expect(() => chooseYourCar.brandName(['BWm', 'Pegout'], -1)).throw();
        })
        it('Test if the second param is bigger than array length', () => {
            expect(() => chooseYourCar.brandName(['BWm', 'Pegout'], 4)).throw()
        })

    })
    describe("Test for CarFuelConsumption Func", () => {
        it('Test if first and second parmas are not a number to trow error', () => {
            expect(() => chooseYourCar.carFuelConsumption('100', '7')).throw();
            expect(() => chooseYourCar.carFuelConsumption('100', 7)).throw();
            expect(() => chooseYourCar.carFuelConsumption(100, '7')).throw();
            expect(() => chooseYourCar.carFuelConsumption(0, 7)).throw();
        })
        it('Test if first and second params are negativ number', () => {
            expect(() => chooseYourCar.carFuelConsumption(-100, 7)).throw();
            expect(() => chooseYourCar.carFuelConsumption(100, -7)).throw();
            expect(() => chooseYourCar.carFuelConsumption(100, 0)).throw();
        })
        it('Test if the litter per km is under or equel to 7', () => {
            expect(chooseYourCar.carFuelConsumption(100, 7)).to.equal('The car is efficient enough, it burns 7.00 liters/100 km.')
            expect(chooseYourCar.carFuelConsumption(50, 3)).to.equal('The car is efficient enough, it burns 6.00 liters/100 km.');
        })
        it('Test if the litter per km is over 7', () => {
            expect(chooseYourCar.carFuelConsumption(100, 8)).to.equal('The car burns too much fuel - 8.00 liters!')
            expect(chooseYourCar.carFuelConsumption(50, 5)).to.equal('The car burns too much fuel - 10.00 liters!');
        })
        it('Test if the first param is NaN', () => {
            expect(chooseYourCar.carFuelConsumption(NaN, 8)).to.equal('The car burns too much fuel - NaN liters!')
        })
        it('Test if the second param is NaN', () => {
            expect(chooseYourCar.carFuelConsumption(100, NaN)).to.equal('The car burns too much fuel - NaN liters!')
        })
    })
});