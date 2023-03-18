const { expect } = require('chai');
const { motorcycleRider } = require('./Motorcycle Rider');

describe("Tests MotorCylcle Func", () => {
    describe("Tests for licenseRestriction func", () => {
        it("If the category is 'AM' return the string:", () => {
            expect(motorcycleRider.licenseRestriction('AM')).equal('Mopeds with a maximum design speed of 45 km. per hour, engine volume is no more than 50 cubic centimeters, and the minimum age is 16.')
        });
        //
        it("If the category is 'A1' return the string:", () => {
            expect(motorcycleRider.licenseRestriction('A1')).equal('Motorcycles with engine volume is no more than 125 cubic centimeters, maximum power of 11KW. and the minimum age is 16.')
        });
        //
        it("If the category is 'A2' return the string:", () => {
            expect(motorcycleRider.licenseRestriction('A2')).equal('Motorcycles with maximum power of 35KW. and the minimum age is 18.')
        });
        //
        it("If the category is 'A' return the string:", () => {
            expect(motorcycleRider.licenseRestriction('A')).equal('No motorcycle restrictions, and the minimum age is 24.')
        });
        //
        it("If the value of string type is diff then 'AM,A1,A2,A' trow Error", () => {
            expect(() => motorcycleRider.licenseRestriction('B')).to.throw('Invalid Information!');
        })
    });
    describe("Tests for motorcycleShowroom func", () => {
        it('Test for invalid parametars', () => {
            expect(() => motorcycleRider.motorcycleShowroom(1, 's')).to.throw('Invalid Information!');
        })
        it('If the first param length is 0 trow error', () => {
            expect(() => motorcycleRider.motorcycleShowroom([])).to.throw('Invalid Information!');
        })
        it('If the second param is less than 50 trow error', () => {
            expect(() => motorcycleRider.motorcycleShowroom([1, 2, 3], 49)).to.throw('Invalid Information!');
        })
        it('should return the number of available bikes', () => {
            const engineVolume = [125, 250, 600, 750, 1000];
            const maximumEngineVolume = 500;

            const availableBikes = motorcycleRider.motorcycleShowroom(engineVolume, maximumEngineVolume);

            expect(availableBikes).to.be.equal(`There are 2 available motorcycles matching your criteria!`);
        })
        it('should throw an error when given invalid input', () => {
            const engineVolume = "125";
            const maximumEngineVolume = "500";

            expect(() => motorcycleRider.motorcycleShowroom(engineVolume, maximumEngineVolume)).to.throw('Invalid Information!');
        });
    })
    describe("Tests for otherSpendings func", () => {
        it('if the first parametar is not an array throw error', () => {
            expect(() => motorcycleRider.otherSpendings(1, [1, 2, 3], true)).to.throw('Invalid Information!');
            expect(() => motorcycleRider.otherSpendings(undefined, [1, 2, 3], true)).to.throw('Invalid Information!');
            expect(() => motorcycleRider.otherSpendings('', [1, 2, 3], true)).to.throw('Invalid Information!');
        })
        it('if the second parametar is not an array throw error', () => {
            expect(() => motorcycleRider.otherSpendings([1, 2, 3], '', true)).to.throw('Invalid Information!');
            expect(() => motorcycleRider.otherSpendings([1, 2, 3], undefined, true)).to.throw('Invalid Information!');
            expect(() => motorcycleRider.otherSpendings([1, 2, 3], 1, true)).to.throw('Invalid Information!');

        })
        it('if the third parametar is not boolean throw error', () => {
            expect(() => motorcycleRider.otherSpendings([1, 2, 3], [1, 2, 3], '')).to.throw('Invalid Information!');
            expect(() => motorcycleRider.otherSpendings([1, 2, 3], [1, 2, 3], undefined)).to.throw('Invalid Information!');
            expect(() => motorcycleRider.otherSpendings([1, 2, 3], [1, 2, 3], 1)).to.throw('Invalid Information!');

        })
        it('Test the total price with valid parametars without discount', () => {
            let equipment = ['helmet', 'jacked'];
            let consumables = ['engine oil', 'oil filter'];
            let discount = false;

            const totalPrice = motorcycleRider.otherSpendings(equipment, consumables, discount);
            expect(totalPrice).to.equal(`You spend $600.00 for equipment and consumables!`)
        })
        it('Test for total price with valid parametars with discount', () => {
            let equipment = ['helmet', 'jacked'];
            let consumables = ['engine oil', 'oil filter'];
            let discount = true;

            const totalPrice = motorcycleRider.otherSpendings(equipment, consumables, discount);
            expect(totalPrice).to.equal(`You spend $540.00 for equipment and consumables with 10% discount!`)
        })
    })
});
