const { expect } = require('chai');
const lookupChar = require('./charLookup');


describe('Test for lookupChar function', () => {

    //incorect parametars
    it('returns undefined if the first parametar is not a string', () => {
        expect(lookupChar(1, 1)).to.be.undefined;
        expect(lookupChar([], 1)).to.be.undefined;
        expect(lookupChar({}, 1)).to.be.undefined;
    })
    it('returns undefined if the second parametar is not a number', () => {
        expect(lookupChar('ivan', 's')).to.be.undefined;
        expect(lookupChar('ivan', [])).to.be.undefined;
        expect(lookupChar('ivan', {})).to.be.undefined;
    })
    it('returns "Incorrect index" if the second parametar is biiger than string length', () => {
        expect(lookupChar('ivan', 10)).to.equal('Incorrect index')
    })
    it('returns "Incorrect index" if the second parametar is lower than 0', () => {
        expect(lookupChar('ivan', -1)).to.equal('Incorrect index');
    })
    it('returns "Incorrect index" if the second parametar is decimal', () => {
        expect(lookupChar('ivan', 0.5)).to.be.undefined;
    })

    //corect parametars
    it('returns undefined if the first parametar is not a number', () => {
        expect(lookupChar('ivan', 2)).to.equal('a');
    })
    
})




