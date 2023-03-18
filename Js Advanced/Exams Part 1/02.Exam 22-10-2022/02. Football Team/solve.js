class footballTeam {
    constructor(clubName, country) {
        this.clubName = clubName;
        this.country = country;
        this.invPlayers = [];
    }

    newAdditions(footballPlayers) {

        let result = `You successfully invite`;

        for (const player of footballPlayers) {

            let [name, age, playerValue] = player.split('/');
            age = Number(age);
            playerValue = Number(playerValue);

            if (!this.invPlayers.some(e => e.name === name)) {
                this.invPlayers.push({
                    name,
                    age,
                    playerValue,
                })
                result += ` ${name},`
            }
            else {
                let currPlayer = this.invPlayers.find(e => e.name === name);
                if (currPlayer.playerValue < playerValue) {
                    currPlayer.playerValue = playerValue;
                }
            }
        }
        return result.substring(0, result.length - 1) + '.'
    }
    signContract(selectedPlayer) {
        let [name, offer] = selectedPlayer.split('/')
        offer = Number(offer)

        if (!this.invPlayers.some(e => e.name === name)) {
            throw new Error(`${name} is not invited to the selection list!`)
        }

        let player = this.invPlayers.find(p => p.name === name);

        if (player.playerValue > offer) {
            let priceDifference = player.playerValue - offer;
            throw new Error(`The manager's offer is not enough to sign a contract with ${name}, ${priceDifference} million more are needed to sign the contract!`)
        }

        player.playerValue = 'Bought';

        return `Congratulations! You sign a contract with ${player.name} for ${offer} million dollars.`
    }
    ageLimit(name, limAge) {
        limAge = Number(limAge);

        if (!this.invPlayers.some(e => e.name === name)) {
            throw new Error(`${name} is not invited to the selection list!`)
        }

        let player = this.invPlayers.find(p => p.name === name);
        let ageDiff = player.age - limAge;
        
        if (player.age >= limAge) {
            return `${name} is above age limit!`
        }
        if (Math.abs(ageDiff) < 5) {
            return `${name} will sign a contract for ${Math.abs(ageDiff)} years with ${this.clubName} in ${this.country}!`
        }
        else if (Math.abs(ageDiff) > 5) {
            return `${name} will sign a full 5 years contract for ${this.clubName} in ${this.country}!`
        }
    }
    transferWindowResult() {

        let result = 'Players list:\n';
        for (let player of this.invPlayers) {
            result += `Player ${player.name}-${player.playerValue}\n`
        }
        return result.trim()
    }

}
let fTeam = new footballTeam("Barcelona", "Spain");
console.log(fTeam.newAdditions(["Kylian Mbappé/23/160", "Lionel Messi/35/50", "Pau Torres/25/52"]));
console.log(fTeam.signContract("Kylian Mbappé/240"));
console.log(fTeam.ageLimit("Kylian Mbappé", 30));
console.log(fTeam.transferWindowResult());




