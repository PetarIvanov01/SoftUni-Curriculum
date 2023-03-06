const { expect } = require('chai');
const isOddOrEven = require('./evenOrOdd');

describe('Test for odd and even', () => {
    it('return even if the string is with even length', () => {
        expect(isOddOrEven('Hi')).to.be.equal('even')
    })
    it('return odd if the string is with odd length', () => {
        expect(isOddOrEven('Hello')).to.be.equal('odd')
    })
    it('return undefined if the parametar is undefined', () => {
        expect(isOddOrEven()).to.be.undefined
    })
    it('return even if the string has empty string for parametar', () => {
        expect(isOddOrEven('')).to.be.equal('even')
    })
    it('return undefined if the parametar is other than string', () => {
        expect(isOddOrEven(5)).to.be.undefined
        expect(isOddOrEven([])).to.be.undefined
        expect(isOddOrEven({})).to.be.undefined
    })
})






