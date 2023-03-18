const { expect } = require('chai');
const { createCalculator } = require('./07. Add  Subtract');

describe('Test', () => {
    it('should contained the functions add(), subtract() and get() as properties', () => {
        expect(createCalculator()).to.haveOwnProperty('add').that.is.an('function');
        expect(createCalculator()).to.haveOwnProperty('subtract').that.is.an('function');
        expect(createCalculator()).to.haveOwnProperty('get').that.is.an('function');
    })
    it('function add should take a parameter that can be parsed as a number', () => {
        let param = 5;
        let result = createCalculator().add(param);
        expect(createCalculator().get(result)).to.be.an('number');
    })
    it('function add should take a parameter that can be parsed as a number if its a string', () => {
        let param = '5';
        let result = createCalculator().add(param);
        expect(createCalculator().get(result)).to.be.an('number');
    })
    it('function subtract should take a parameter that can be parsed as a number if its a string', () => {
        let param = 5;
        let result = createCalculator().subtract(param);
        expect(createCalculator().get(result)).to.be.an('number');
    })
    it('function subtract should take a parameter that can be parsed as a number if its a string', () => {
        let param = '5';
        let result = createCalculator().subtract(param);
        expect(createCalculator().get(result)).to.be.an('number');
    })
    it('sum of the subtract function with string', () => {

        let result = createCalculator();
        result.subtract(5);
        expect(result.get()).to.be.equal(-5);

    })
    it('sum of the subtract function with string', () => {

        let result = createCalculator();
        result.subtract('5');
        expect(result.get()).to.be.equal(-5);

    })
    it('sum of the add function with number', () => {

        let result = createCalculator();
        result.add('5');
        expect(result.get()).to.be.equal(5);

    })
    it('sum of the add function string parsed to number', () => {

        let result = createCalculator();
        result.add(5);
        expect(result.get()).to.be.equal(5);

    })
    it('should return NaN if it use string that cant be parsed as a number', () => {

        let result = createCalculator();
        result.add('s');
        expect(result.get()).to.be.NaN;

    })
    it('should return NaN if it use string that cant be parsed as a number', () => {

        let result = createCalculator();
        result.subtract('s');
        expect(result.get()).to.be.NaN;

    })
    it('should return 0 if call only the get function', () => {

        let result = createCalculator();
        expect(result.get()).to.be.equal(0);

    })
})
