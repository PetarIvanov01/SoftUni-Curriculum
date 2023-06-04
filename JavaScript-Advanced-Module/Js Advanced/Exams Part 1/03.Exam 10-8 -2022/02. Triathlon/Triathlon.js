class Triathlon {
    constructor(competitionName, participants, listOfFinalLists) {
        this.compName = competitionName;
        this.participants = {};
        this.listOfFinalLists = []
    }
    addParticipant(participantName, participantGender) {
        if (!this.participants.hasOwnProperty(participantName)) {
            this.participants[participantName] = participantGender;
            return `A new participant has been added - ${participantName}`;
        }
        return `${participantName} has already been added to the list`
    }
    completeness(participantName, condition) {
        if (!this.participants.hasOwnProperty(participantName)) {
            throw new Error(`${participantName} is not in the current participants list`)
        }
        if (condition < 30) {
            throw new Error(`${participantName} is not well prepared and cannot finish any discipline`)
        }

        let countOfDisciplines = condition / 30;
        countOfDisciplines = countOfDisciplines.toFixed(0);
        countOfDisciplines = Number(countOfDisciplines);

        if (countOfDisciplines === 1 || countOfDisciplines === 2) {

            return `${participantName} could only complete ${countOfDisciplines} of the disciplines`;

        }

        let finalistGen = this.participants[participantName];
        delete this.participants.participantName;
        this.listOfFinalLists.push({ participantName, finalistGen });

        return `Congratulations, ${participantName} finished the whole competition`;

    }
    rewarding(participantName) {
        if (this.listOfFinalLists.some(e => e.participantName === participantName)) {

            return `${participantName} was rewarded with a trophy for his performance`

        }
        return `${participantName} is not in the current finalists list`
    }
    showRecord(criteria) {
        if (this.listOfFinalLists.length === 0) {
            return 'There are no finalists in this competition'
        }
        let maleWinners = this.listOfFinalLists.filter(p => p.finalistGen === 'male');
        let femaleWinners = this.listOfFinalLists.filter(p => p.finalistGen === 'female');

        if (criteria === 'male') {
            if (maleWinners.length === 0) {
                return `There are no ${criteria}'s that finished the competition`;
            }
            return `${maleWinners[0].participantName} is the first ${criteria} that finished the ${this.compName} triathlon`
        }
        else if (criteria === 'female') {
            if (femaleWinners.length === 0) {
                return `There are no ${criteria}'s that finished the competition`;
            }
            return `${femaleWinners[0].participantName} is the first ${criteria} that finished the ${this.compName} triathlon`

        }
        else if (criteria === 'all') {
            let result = `List of all ${this.compName} finalists:\n`
            let sorted = this.listOfFinalLists.sort((a, b) => a.participantName - b.participantName);

            for (let player of sorted) {
                result += `${player.participantName}\n`
            }
            return result.trim()
        }
    }
}
// const Triathlon = result;
const contest = new Triathlon("Dynamos");
console.log(contest.addParticipant("Peter", "male"))//, "A new participant has been added - Peter");
console.log(contest.addParticipant("Sasha", "female"))//, "A new participant has been added - Sasha");
console.log(contest.completeness("Peter", 100))//, "Congratulations, Peter finished the whole competition");
console.log(contest.completeness("Sasha", 90))//, "Congratulations, Sasha finished the whole competition");
console.log(contest.rewarding("Peter"))//, "Peter was rewarded with a trophy for his performance");
console.log(contest.rewarding("Sasha"))//, "Sasha was rewarded with a trophy for his performance");
console.log(contest.showRecord("all"))//, "List of all Dynamos finalists:\nPeter\nSasha");





