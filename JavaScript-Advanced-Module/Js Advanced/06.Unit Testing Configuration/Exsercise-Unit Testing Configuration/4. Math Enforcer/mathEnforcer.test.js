const { expect } = require('chai');
const mathEnforcer = require('./mathEnforcer');


describe('Test for mathEnforcer function', () => {

    describe('Test for addFive function', () => {
        //incorect param
        it('return undefined if the param is not a number', () => {
            expect(mathEnforcer.addFive([])).to.be.undefined;
            expect(mathEnforcer.addFive({})).to.be.undefined;
            expect(mathEnforcer.addFive('5')).to.be.undefined;
        })
        //corect param
        it('return sum with 5 if the param is positive number', () => {
            expect(mathEnforcer.addFive(5)).to.be.equal(10);
        })
        it('return sum with 5 if the param is negativ number', () => {
            expect(mathEnforcer.addFive(-5)).to.be.equal(0);
        })
        it('return sum with 5 if the param is decimal number', () => {
            expect(mathEnforcer.addFive(1.5)).to.be.equal(6.5);
        })
    })
    describe('Test for subtractTen function', () => {

        //incorect param
        it('return undefined if the param is not a number', () => {
            expect(mathEnforcer.subtractTen([])).to.be.undefined;
            expect(mathEnforcer.subtractTen({})).to.be.undefined;
            expect(mathEnforcer.subtractTen('5')).to.be.undefined;
        })
        //corect param
        it('return sum with 5 if the param is positive number', () => {
            expect(mathEnforcer.subtractTen(10)).to.be.equal(0);
        })
        it('return sum with 5 if the param is negativ number', () => {
            expect(mathEnforcer.subtractTen(-5)).to.be.equal(-15);
        })
        it('return sum with 5 if the param is decimal number', () => {
            expect(mathEnforcer.subtractTen(-1.5)).to.be.equal(-11.5);
        })
    })
    describe('Test for sum function', () => {

        it('return undefined if the first param is not a number', () => {
            expect(mathEnforcer.sum([],5)).to.be.undefined;
            expect(mathEnforcer.sum({},2)).to.be.undefined;
            expect(mathEnforcer.sum('5',2)).to.be.undefined;
        })
        it('return undefined if the second param is not a number', () => {
            expect(mathEnforcer.sum(5,[])).to.be.undefined;
            expect(mathEnforcer.sum(2,{})).to.be.undefined;
            expect(mathEnforcer.sum(2,'5')).to.be.undefined;
        })
        it('return sum if both params is numbers', () => {
            expect(mathEnforcer.sum(2,2)).to.be.equal(4);
        })
        it('return sum if both params is decimal numbers', () => {
            expect(mathEnforcer.sum(2.2,2.2)).to.be.equal(4.4);
        })
    })
})




