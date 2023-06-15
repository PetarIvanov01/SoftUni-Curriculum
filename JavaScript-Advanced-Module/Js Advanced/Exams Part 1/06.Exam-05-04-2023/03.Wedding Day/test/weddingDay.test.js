const { describe } = require('mocha');
const { expect } = require('chai');

// const { pickVenue, otherSpendings, tableDistribution } = require('../weddingDay')
const weddingDay = require('../weddingDay')

describe("Tests for WeddingDay file", function () {

    describe("Testing the first func", function () {
        it("Testing the first param to throw", function () {
            expect(() => weddingDay.pickVenue('', 1, 'Varna')).to.throw()
        });
        it("Testing the second param to throw", function () {
            expect(() => weddingDay.pickVenue(1, '', 'Varna')).to.throw()
        });
        it("Testing the third param to throw", function () {
            expect(() => weddingDay.pickVenue(1, 1, '')).to.throw()
        });
        it("should return the correct message when given the venue details", function () {
            expect(weddingDay.pickVenue(150, 120, 'Varna')).to.equal('This venue meets the requirements, with capacity of 150 guests and 120$ cover.')
        });
        it("should return the correct message when given the venue details", function () {
            expect(weddingDay.pickVenue(149, 119, 'Varna')).to.equal('This venue does not meet your requirements!')
        });
    });

    describe("Testing the second func", function () {
        it('should throw an error when the first argument is empty', () => {
            expect(() => weddingDay.otherSpendings('', [], true)).to.throw();
        });
        it('should throw an error when the second argument is empty', () => {
            expect(() => weddingDay.otherSpendings([], '', true)).to.throw();
        });
        it('should throw an error when the third argument is empty', () => {
            expect(() => weddingDay.otherSpendings([], [], '')).to.throw();
        });
        it("should return the correct message with discount when the third argument is true", function () {
            expect(weddingDay.otherSpendings(['flowers'], ['pictures'], true)).to.equal("You spend 1020$ for wedding decoration and photography with 15% discount!")
        });
        it("should return the correct message with discount when the third argument is false", function () {
            expect(weddingDay.otherSpendings(['flowers'], ['pictures'], false)).to.equal("You spend 1200$ for wedding decoration and photography!")
        });
    });

    describe("Testing the third func", function () {
        it('should throw an error when the first argument is empty', () => {
            expect(() => weddingDay.tableDistribution('', 1)).to.throw();
        });
        it('should throw an error when the second argument is empty', () => {
            expect(() => weddingDay.tableDistribution(1, '')).to.throw();
        });
        it('should throw an error when the first argument is a negative number', () => {
            expect(() => weddingDay.tableDistribution(-1, 1)).to.throw();
        });
        it('should throw an error when the second argument is a negative number', () => {
            expect(() => weddingDay.tableDistribution(1, -1)).to.throw();
        });
        it("should distribute guests into tables correctly when the number of guests is divisible by the number of tables", function () {
            expect(weddingDay.tableDistribution(13, 2)).to.equal('You have 2 tables with 7 guests on table.')
        });
        it("should provide a message for joining tables when the number of guests is not divisible by the number of tables", function () {
            expect(weddingDay.tableDistribution(12, 3)).to.equal("There is only 4 people on every table, you can join some tables.")
        });
    });
});
