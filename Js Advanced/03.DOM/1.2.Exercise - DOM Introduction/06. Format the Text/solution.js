function solve() {

  let input = document.getElementById('input')
  let arrOfSentence = input.value.split('.').filter(s => s !== '')
  let resultDiv = document.getElementById('output');

  while (arrOfSentence.length > 0) {
    
    let text = arrOfSentence.splice(0,3).join('. ')
    let p = document.createElement('p')
    p.textContent = text + '.'
    resultDiv.appendChild(p)
  }
}