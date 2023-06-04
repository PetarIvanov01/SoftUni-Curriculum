const { expect } = require('chai');
const { movieTheater } = require('./Movie Theater _Resources');

describe("Tests", () => {
    describe("Tests for ageRestrictions func", () => {
        it('Test if the string is G', () => {
            expect(movieTheater.ageRestrictions('G')).to.equal('All ages admitted to watch the movie');
        })
        it('Test if the string is PG', () => {
            expect(movieTheater.ageRestrictions('PG')).to.equal('Parental guidance suggested! Some material may not be suitable for pre-teenagers');
        })
        it('Test if the string is R', () => {
            expect(movieTheater.ageRestrictions('R')).to.equal('Restricted! Under 17 requires accompanying parent or adult guardian');
        })
        it('Test if the string is NC-17', () => {
            expect(movieTheater.ageRestrictions('NC-17')).to.equal('No one under 17 admitted to watch the movie');
        })
        it('Test if the string is diffrent then G,PG,R,NC-17', () => {
            expect(movieTheater.ageRestrictions('A')).to.equal('There are no age restrictions for this movie');
        })
    });
    describe("Tests for moneySpent func", () => {
        it('Test if the ticket is invalid input', () => {
            expect(() => movieTheater.moneySpent('5', ['Nachos'], ['Soda'])).throw();
            expect(() => movieTheater.moneySpent({}, ['Nachos'], ['Soda'])).throw()
            expect(() => movieTheater.moneySpent([], ['Nachos'], ['Soda'])).throw()
        })
        it('Test if the food is not an array', () => {
            expect(() => movieTheater.moneySpent(5, 'Nachos', ['Soda'])).throw()
            expect(() => movieTheater.moneySpent(5, 2, ['Soda'])).throw()
            expect(() => movieTheater.moneySpent(5, undefined, ['Soda'])).throw()
        })
        it('Test if the drinks is not an array', () => {
            expect(() => movieTheater.moneySpent(5, ['Nachos'], 'Soda')).throw();
            expect(() => movieTheater.moneySpent(5, ['Nachos'], undefined)).throw();
            expect(() => movieTheater.moneySpent(5, ['Nachos'], 2)).throw();

        })
        it('Test if the total cost is bigger then 50 and have discount 20 %', () => {
            expect(movieTheater.moneySpent(3, ['Nachos', 'Popcorn'], ['Water', 'Soda'])).to.equal('The total cost for the purchase with applied discount is 47.60');
            expect(movieTheater.moneySpent(4, ['Nachos'], ['Water', 'Soda'])).to.equal('The total cost for the purchase with applied discount is 56.00');
        })
        it('Test if the total cost is lower then 50', () => {
            expect(movieTheater.moneySpent(1, ['Nachos'], ['Water'])).to.equal('The total cost for the purchase is 22.50');
            expect(movieTheater.moneySpent(2, ['Popcorn'], ['Water'])).to.equal('The total cost for the purchase is 36.00');
        })
    });
    describe("Tests for reservation func", () => {
        it('Test if the first param is not an array', () => {
            expect(() => movieTheater.reservation('', 5)).throw()
            expect(() => movieTheater.reservation(undefined, 5)).throw()
            expect(() => movieTheater.reservation({}, 5)).throw()
        })
        it('Test if the second param is not a number', () => {
            expect(() => movieTheater.reservation([], [])).throw()
            expect(() => movieTheater.reservation([], undefined)).throw()
            expect(() => movieTheater.reservation([], '5')).throw()
        })
        it('Test with valid parametars', () => {
            expect(movieTheater.reservation([{ rowNumber: 1, freeSeats: 7 }, { rowNumber: 2, freeSeats: 5 }], 4)).to.equal(2);
            expect(movieTheater.reservation([{ rowNumber: 1, freeSeats: 7 }], 4)).to.equal(1);
            expect(movieTheater.reservation([{ rowNumber: 1, freeSeats: 7 }, { rowNumber: 2, freeSeats: 5 }, { rowNumber: 3, freeSeats: 10 }], 5)).to.equal(3);
        })
    });
});