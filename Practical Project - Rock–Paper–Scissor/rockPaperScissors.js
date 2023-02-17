function rockPaperScissors(playerTurn) {

    const rock = 'Rock';
    const paper = 'Paper';
    const scissors = 'Scissors';

    if (playerTurn === 'r' || playerTurn === 'Rock') {

        playerTurn = rock;
        console.log(`You choose ${playerTurn}`);
    }
    else if (playerTurn === 'p' || playerTurn === 'Paper') {

        playerTurn = paper;
        console.log(`You choose ${playerTurn}`);
    }
    else if (playerTurn === 's' || playerTurn === 'Scissors') {

        playerTurn = scissors;
        console.log(`You choose ${playerTurn}`);
    }
    else {

        console.log('Invalid input! Try again...');
        return;

    }



    let computerRandomNumber = Math.floor(Math.random() * 3) + 1;
    let computerMove;

    switch (computerRandomNumber) {
        case 1: computerMove = rock;
            break;
        case 2: computerMove = paper
            break;
        case 3: computerMove = scissors
            break;
    }
    console.log(`The computer chooses ${computerMove}`);

    if ((playerTurn === rock && computerMove === scissors) || (playerTurn === scissors && computerMove === paper) || (playerTurn === paper && computerMove === rock)) {
        console.log('You win!');
    }
    else if ((playerTurn === scissors && computerMove === rock) || (playerTurn === paper && computerMove === scissors) || (playerTurn === rock && computerMove === paper)) {
        console.log('You lose!');
    }
    else {
        console.log('Draw!');
    }
}
rockPaperScissors('Paper')






