const { describe, } = require("mocha")
const { expect } = require("chai")

const lottery = require("../Lottery")

describe("Tests …", function () {

    describe("Test the buyLotteryTicket funtcion", function () {
        it("Test for invalid input", function () {
            expect(() => lottery.buyLotteryTicket(2, 2, false)).to.throw(Error, "Unable to buy lottery ticket!")
        })
        it("return the correct message for valid input", function () {

            expect(lottery.buyLotteryTicket(10, 5, true)).to.equal("You bought 5 tickets for 50$.");
        })
        it("Test for invalid input", function () {
            expect(() => lottery.buyLotteryTicket("", 2, true)).to.throw(Error, "Invalid input!")
            expect(() => lottery.buyLotteryTicket(2, "", true)).to.throw(Error, "Invalid input!")
            expect(() => lottery.buyLotteryTicket(2, 2, "")).to.throw(Error, "Invalid input!")
        });
    })

    describe("Test the checkTicket funtcion", function () {
        it("return the correct message for 3 winning numbers", function () {
            const ticketNumbers = [1, 2, 3, 4, 5, 6];
            const luckyNumbers = [1, 2, 3, 10, 11, 12];

            const result = lottery.checkTicket(ticketNumbers, luckyNumbers);

            expect(result).to.equal("Congratulations you win, check your reward!");
        });

        it("return the correct message for 6 winning numbers", function () {
            const ticketNumbers = [1, 2, 3, 4, 5, 6];
            const luckyNumbers = [1, 2, 3, 4, 5, 6];

            const result = lottery.checkTicket(ticketNumbers, luckyNumbers);

            expect(result).to.equal("You win the JACKPOT!!!");
        });

        it("throw an error for invalid input with incorrect array lengths", function () {
            const ticketNumbers = [1, 2, 3, 4, 5, 6];
            const luckyNumbers = [1, 2, 3, 4, 5];

            expect(() => lottery.checkTicket(ticketNumbers, luckyNumbers)).to.throw();
        });
        it("throw an error for invalid input with incorrect array lengths", function () {
            const ticketNumbers = [1, 2, 3, 4, 5];
            const luckyNumbers = [1, 2, 3, 4, 5, 6];

            expect(() => lottery.checkTicket(ticketNumbers, luckyNumbers)).to.throw();
        });

        it("should throw an error for invalid input with non-array parameters", function () {
            const ticketNumbers = "";
            const luckyNumbers = [1, 2, 3, 4, 5, 6];

            expect(() => lottery.checkTicket(ticketNumbers, luckyNumbers)).to.throw('Invalid input!');
        });
        it("should throw an error for invalid input with non-array parameters", function () {
            const ticketNumbers = [1, 2, 3, 4, 5, 6];
            const luckyNumbers = "";

            expect(() => lottery.checkTicket(ticketNumbers, luckyNumbers)).to.throw();
        });
        it("should throw an error for invalid input with non-array parameters", function () {
            const ticketNumbers = "";
            const luckyNumbers = "";

            expect(() => lottery.checkTicket(ticketNumbers, luckyNumbers)).to.throw('Invalid input!');
        });
        it("should throw an error for invalid input with non-array parameters", function () {
            const ticketNumbers = {};
            const luckyNumbers = [1, 2, 4, 5, 6, 7];

            expect(() => lottery.checkTicket(ticketNumbers, luckyNumbers)).to.throw('Invalid input!');
        });
        it("should throw an error for invalid input with non-array parameters", function () {
            const ticketNumbers = undefined;
            const luckyNumbers = [1, 2, 4, 5, 6, 7];

            expect(() => lottery.checkTicket(ticketNumbers, luckyNumbers)).to.throw('Invalid input!');
        });
    })
    describe("Test the secondChance funtcion", function () {

        it("return Error for invalid input", function () {
            expect(() => lottery.secondChance("", [1])).to.throw()
            expect(() => lottery.secondChance(1, "")).to.throw()
        });

        it("return the correct message for a winning ticketID", function () {
            const ticketID = 13;
            const secondChanceWinningIDs = [12, 13, 14];

            const result = lottery.secondChance(ticketID, secondChanceWinningIDs);

            expect(result).to.equal("You win our second chance prize!");
        });

        it("return the correct message for a non-winning ticketID", function () {
            const ticketID = 13;
            const secondChanceWinningIDs = [14, 15, 12];

            const result = lottery.secondChance(ticketID, secondChanceWinningIDs);

            expect(result).to.equal("Sorry, your ticket didn\'t win!")
        });
    })
})
