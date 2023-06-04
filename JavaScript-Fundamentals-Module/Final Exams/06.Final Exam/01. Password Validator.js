function solve(input) {

    let password = input.shift();

    let command = input.shift()

    while (command !== 'Complete') {

        let data = command.split(' ')
        if (data[1] === 'Upper' || data[1] === 'Lower') {
            data[0] += ` ${data[1]}`
        }

        switch (data[0]) {
            case 'Make Upper':
                upper(Number(data[2]))
                break;
            case 'Make Lower':
                lower(Number(data[2]))
                break
            case 'Insert':
                insert(Number(data[1]), data[2])
                break
            case 'Replace':
                replace(data[1], Number(data[2]))
                break
            case 'Validation':
                validation()
                break;
        }

        command = input.shift();
    }

    function upper(index) {
        let letter = password[index].toUpperCase()
        let firstPart = password.substring(0, index)
        let secondPart = password.substring(index + 1,)
        password = firstPart + letter + secondPart;
        console.log(password);
    }
    function lower(index) {
        let letter = password[index].toLowerCase()
        let firstPart = password.substring(0, index)
        let secondPart = password.substring(index + 1,)
        password = firstPart + letter + secondPart;
        console.log(password);
    }
    function insert(index, char) {
        if (password.length > index && index !== -1) {
            let firstPart = password.substring(0, index)
            let secondPart = password.substring(index,)
            password = firstPart + char + secondPart
            console.log(password);
        }
    }
    function replace(char, value) {
        if (password.includes(char)) {
            let asciValue = char.charCodeAt(0);
            let sum = asciValue + value;
            let symbol = String.fromCharCode(sum)
            password = password.split(char).join(symbol)
            console.log(password);
        }
    }
    function validation() {

        // Check if password is at least 8 characters long
        if (password.length < 8) {
            console.log("Password must be at least 8 characters long!");
        }

        // Check if password consists only of letters, digits, and underscore
        if (!/^[a-zA-Z0-9_]+$/.test(password)) {
            console.log("Password must consist only of letters, digits and _!");
        }

        // Check if password has at least one uppercase letter
        if (!/[A-Z]/.test(password)) {
            console.log("Password must consist at least one uppercase letter!");
        }

        // Check if password has at least one lowercase letter
        if (!/[a-z]/.test(password)) {
            console.log("Password must consist at least one lowercase letter!");
        }

        // Check if password has at least one digit
        if (!/\d/.test(password)) {
            console.log("Password must consist at least one digit!");
        }
    }

}
solve(['123456789',
    'Insert 3 R',
    'Replace 5 15',
    'Validation',
    'Make Lower 3',
    'Complete'])

