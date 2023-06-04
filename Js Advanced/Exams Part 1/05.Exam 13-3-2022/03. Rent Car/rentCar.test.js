const { expect } = require('chai');
const { rentCar } = require('./rentCar');

describe('Test', () => {
    describe("Tests for searchCar func", () => {
        it('If the fisrt param is not array trow', () => {
            expect(() => rentCar.searchCar({}, 'BWM')).to.throw();
            expect(() => rentCar.searchCar(5, 'BWM')).to.throw();
            expect(() => rentCar.searchCar('', 'BWM')).to.throw();
        })
        it('If the second param is not a string trow', () => {
            expect(() => rentCar.searchCar(['BMW,Volkswagen'], 5)).to.throw();
            expect(() => rentCar.searchCar(['BMW,Volkswagen'], undefined)).to.throw();
            expect(() => rentCar.searchCar(['BMW,Volkswagen'], {})).to.throw();

        })
        it('Test if the input is Transmission', () => {
            expect(rentCar.searchCar(["Volkswagen", "BMW", "Audi"], 'BMW')).equal('There is 1 car of model BMW in the catalog!');
        })
        it('If there are no such models in the catalog trow', () => {
            expect(() => rentCar.searchCar(["Volkswagen", "BMW", "Audi"], 'BM')).to.throw();
        })
    })
    describe("Tests for calculatePriceOfCar func", () => {

        it('If first param is not a string throw error', () => {
            expect(() => rentCar.calculatePriceOfCar(5, 4)).throw()
            expect(() => rentCar.calculatePriceOfCar(undefined, 4)).throw()
            expect(() => rentCar.calculatePriceOfCar([], 4)).throw()
        })
        it('If second param is not a  intiger number throw error', () => {
            expect(() => rentCar.calculatePriceOfCar('BMW', 4.1)).throw()
            expect(() => rentCar.calculatePriceOfCar('BMW', 'sad')).throw()
            expect(() => rentCar.calculatePriceOfCar('BMW', undefined)).throw()
        })
        it('If catalog don\'t inculde the car throw ', () => {
            expect(() => rentCar.calculatePriceOfCar('BWs', 5)).throw();
        })
        it('Test if the catalog include the car', () => {
            expect(rentCar.calculatePriceOfCar('BMW', 5)).to.equal('You choose BMW and it will cost $225!')
        })
    });
    describe("Tests for checkBudget func", () => {
        it('IF the first param is not int number throw', () => {
            expect(() => rentCar.checkBudget('as', 1, 1)).throw()
            expect(() => rentCar.checkBudget([], 1, 1)).throw()
            expect(() => rentCar.checkBudget(1.1, 1, 1)).throw()
        })
        it('IF the second param is not int number throw', () => {
            expect(() => rentCar.checkBudget(1, 1.1, 1)).throw()
            expect(() => rentCar.checkBudget(1, [], 1)).throw()
            expect(() => rentCar.checkBudget(1, 'as', 1)).throw()
        })
        it('IF the third param is not int number throw', () => {
            expect(() => rentCar.checkBudget(1, 1, 1.1)).throw()
            expect(() => rentCar.checkBudget(1, 1, [])).throw()
            expect(() => rentCar.checkBudget(1, 1, 'as')).throw()
        })
        it('Test if the budget is bigger than cost', () => {
            expect(rentCar.checkBudget(1, 2, 1)).to.equal('You need a bigger budget!');
            expect(rentCar.checkBudget(1, 3, 2)).to.equal('You need a bigger budget!');
        })
        it('Test if the cost is bigger than budget', () => {
            expect(rentCar.checkBudget(1, 3, 3)).to.equal('You rent a car!');
            expect(rentCar.checkBudget(1, 1, 1)).to.equal('You rent a car!');
        })
    })
})