const { expect } = require('chai');
const rgbToHexColor = require('./06. RGB to Hex');

describe('RGB Tests', () => {
    it('converts black', () => {
        expect(rgbToHexColor(0, 0, 0)).to.equal('#000000');
    })
    it('converts white', () => {
        expect(rgbToHexColor(255, 255, 255)).to.equal('#FFFFFF');
    })
    it('returns same colour', () => {
        expect(rgbToHexColor(255, 158, 170)).to.equal('#FF9EAA');
    })
    it('returns undefined for diffrent types', () => {
        expect(rgbToHexColor('0', '0', '0')).to.undefined;
        expect(rgbToHexColor(0, '0', '0')).to.undefined;
        expect(rgbToHexColor(0, 0, '0')).to.undefined;
    })
    it('returns undefined for diffrent types', () => {
        expect(rgbToHexColor('255', '255', '255')).to.undefined;
        expect(rgbToHexColor(255, '255', '255')).to.undefined;
        expect(rgbToHexColor(255, '255', 255)).to.undefined;
    })
    it('returns undefined for out of ranges', () => {
        expect(rgbToHexColor(256, 256, 256)).to.undefined;
    })
    it('returns undefined for out of ranges', () => {
        expect(rgbToHexColor(-1, -1, -1)).to.undefined;
    })

})

