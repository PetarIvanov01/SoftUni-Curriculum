const { expect } = require('chai');
const sum = require('./04. Sum of Numbers');

describe('Tests for sum function', () => {
    it('returned sum of the numbers', () => {
        const arr = [1, 2, 3];
        const result = sum(arr);
        expect(result).to.be.equal(6);
    })
    it('should return NaN if the array contains non-number values', () => {
        const arr = ['a', 1, 'b', 2];
        const result = sum(arr);
        expect(result).to.be.NaN;
    });
    it('should return 0 if the array is empty', () => {
        const arr = [];
        const result = sum(arr);
        expect(result).to.equal(0);
    });
})
