function cardGame(face, suit) {

  let validFace = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

  let suits = {

    S: '\u2660',
    H: '\u2665',
    D: '\u2666',
    C: '\u2663',

  }

  if (!validFace.includes(face) || !suits[suit]) {
    throw new Error('Error')
  }

  return {
    face,
    suit: suits[suit],
    toString() {
      return this.face + this.suit
    }
  }
}
let card1 = cardGame('2', 'C')
console.log(card1.toString());