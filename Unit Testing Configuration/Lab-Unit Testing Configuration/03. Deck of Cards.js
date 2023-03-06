function createDesk(arr) {

    let result = [];

    for (const card of arr) {
        let suit = card.substring(card.length - 1,)
        let face = card.substring(0, card.length - 1)
        try {
            result.push(cardGame(face, suit))
        }
        catch (error) {
            console.log(`Invalid card: ${face + suit}`);
            return
        }
    }

    console.log(result.join(' '));

    function cardGame(face, suit) {

        let validFace = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

        let suits = {

            S: '\u2660',
            H: '\u2665',
            D: '\u2666',
            C: '\u2663',

        }

        if (!validFace.includes(face) || !suits[suit]) {
            throw new Error('Error');
        }

        return face + suits[suit];

    }
}
createDesk(['AS', '10D', 'KH', '2C']);
createDesk(['5S', '3D', 'QD', '1C']);