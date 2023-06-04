function solve() {
    let generateButton = document.querySelectorAll('button')[0];
    let buyButton = document.querySelectorAll('button')[1];
  
    let input = document.querySelectorAll('textarea')[0];
    let output = document.querySelectorAll('textarea')[1];
  
    let table = document.getElementsByClassName('table')[0];
  
    generateButton.addEventListener('click', generate);
  
    function generate(event) {
      let products = JSON.parse(input.value);
      let tbody = document.createElement('tbody')
  
      for (const { img, name, price, decFactor } of products) {
  
        let catalog =
          createElements('tr', {},
            createElements('td', {},
              createElements('img', { 'src': img })),
            createElements('td', {}, name),
            createElements('td', {}, price),
            createElements('td', {}, decFactor),
            createElements('td', {},
              createElements('input', { 'type': 'checkbox' }))
          );
  
        tbody.appendChild(catalog);
      }
      table.appendChild(tbody)
  
    }
  
    buyButton.addEventListener('click', buy);
  
    let money = 0;
    let boughtProducts = [];
    let decFactorArr = [];
  
    function buy(event) {
      let rows = document.querySelectorAll('tbody tr');
  
      for (let i = 1; i < rows.length; i++) {
        let elements = rows[i].children;
        let product = elements[1].textContent;
        let price = Number(elements[2].textContent);
        let decFactor = Number(elements[3].textContent);
        let isCheck = elements[4].children[0].checked;
  
        if (isCheck) {
          boughtProducts.push(product);
          money += Number(price);
          decFactorArr.push(decFactor);
        }
      }
  
      let averageDecFactor = decFactorArr.reduce((a, b) => a + b) / decFactorArr.length;
  
      output.value += `Bought furniture: ${boughtProducts.join(', ')}\nTotal price: ${money.toFixed(2)}\nAverage decoration factor: ${averageDecFactor}`;
    }
  
    function createElements(type, atrib, ...content) {
  
      const element = document.createElement(type);
  
      if (Object.keys(atrib).length !== 0) {
        for (let prop in atrib) {
          element[prop] = atrib[prop];
        }
      }
  
      for (let el of content) {
        if (typeof el == 'string' || typeof el == 'number') {
          el = document.createTextNode(el)
        }
        element.appendChild(el)
      }
      return element;
  
    }
  }
  
  