function solve() {

  let input = document.getElementById('text').value;
  let typeCase = document.getElementById('naming-convention').value;

  function result(input, typeCase) {
    let result = ''
debugger
    if (typeCase === `Camel Case` && input.length !== 0) {
      
      for (let index = 0; index < input.length; index++) {

        let letter = input[index].toLowerCase();

        if (letter === ' ') {
          result += (input[index+=1]).toUpperCase()
          continue;
        }

        result += letter
      }
    }

    else if (typeCase === 'Pascal Case' && input.length !== 0) {

      result += input[0].toUpperCase()

      for (let i = 1; i < input.length; i++) {
        let letter = input[i].toLowerCase();

        if (letter === ' ') {
          result += (input[i+=1]).toUpperCase()
          continue;
        }
        result += letter
      }

    }
    else {
      result += 'Error!'
    }
    document.getElementById('result').textContent = result;
  }
  result(input, typeCase)
}