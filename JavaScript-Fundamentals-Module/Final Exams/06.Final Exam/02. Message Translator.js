function solve(input) {

    let count = Number(input.shift());
    let reg = /!(?<send>[A-Z][a-z]{2,})!:\[(?<message>[A-z]{8,})\]/g;
    let arr = [];

    for (let i = 0; i < count; i++) {

        let match = reg.exec(input[i]);

        if (match !== null) {

            let text = match.groups.message;
            let comand = match.groups.send;

            for (const letter of text) {
                let asciValue = letter.charCodeAt(0);
                arr.push(`${asciValue}`);
            }
            console.log(`${comand}: ${arr.join(' ')}`);
        }
        else {
            console.log('The message is invalid');
        };
    }
}
solve(["3",
    "go:[outside]",
    "!drive!:YourCarToACarWash",
    "!Watch!:[LordofTheRings]"])
