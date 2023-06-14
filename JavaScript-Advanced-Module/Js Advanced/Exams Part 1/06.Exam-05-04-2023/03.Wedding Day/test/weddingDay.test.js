const { describe } = require('mocha');
const { expect } = require('chai');
const { pickVenue, otherSpendings, tableDistribution } = require('../weddingDay')

// •	PickVenue (capacity, pricePerGuest, location)

describe("Tests for WeddingDay file", function () {

    describe("Testing the first func", function () {
        it("Testing the first param to throw", function () {
            expect(() => pickVenue('',1,'Varna'))
        });
    });
    describe("Testing the second func", function () {
        it("TODO …", function () {
            // TODO: …
        });
    });
    describe("Testing the third func", function () {
        it("TODO …", function () {
            // TODO: …
        });
    });
});
