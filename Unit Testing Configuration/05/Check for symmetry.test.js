const { expect } = require('chai');
const isSymmetric = require('./sym');

describe('All tests', () => {
    it('returns true for isSymmetric array', () => {
        expect(isSymmetric([1, 2, 2, 1])).to.be.true;
    })
    it('returns false for not isSymmetric arrat', () => {
        expect(isSymmetric([1, 2, 3, 4])).to.be.false;
    })
    it('returns false for non-array', () => {
        expect(isSymmetric(5)).to.be.false;
    })
    it('returns true for odd symmetric array', () => {
        expect(isSymmetric([1, 3, 3, 1])).to.be.true;
    })
    it('returns true for even strings symmetric array', () => {
        expect(isSymmetric(['a', 'b', 'b', 'a'])).to.be.true;
    })
    it('returns false for non-array string parametar', () => {
        expect(isSymmetric('ivan')).to.be.false
    })
    it('returns false for different types of the parametars', () => {
        expect(isSymmetric([1, 2, 2, '1'])).to.be.false
    })
})

