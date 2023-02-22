function solve() {
  let generateButton = document.querySelectorAll('button')[0];
  let buyButton = document.querySelectorAll('button')[1];

  let input = document.querySelectorAll('textarea')[0];
  let output = document.querySelectorAll('textarea')[1];

  let table = document.getElementsByClassName('table')[0];

  generateButton.addEventListener('click', generate);

  function generate(event) {
    let products = JSON.parse(input.value);
    let tbody = document.createElement('tbody');

    for (const furniture of products) {
      let tr = document.createElement('tr');

      let tdImg = document.createElement('td');
      tdImg.innerHTML = `<img src=${furniture.img}>`;
      tr.appendChild(tdImg);

      let tdProduct = document.createElement('td');
      let p1 = document.createElement('p');
      p1.textContent = furniture.name;
      tdProduct.appendChild(p1);
      tr.appendChild(tdProduct);

      let tdPrice = document.createElement('td');
      let p2 = document.createElement('p');
      p2.textContent = furniture.price;
      tdPrice.appendChild(p2);
      tr.appendChild(tdPrice);

      let tdDec = document.createElement('td');
      let p3 = document.createElement('p');
      p3.textContent = furniture.decFactor;
      tdDec.appendChild(p3);
      tr.appendChild(tdDec);

      let tdCheckbox = document.createElement('td');
      let input = document.createElement('input');
      input.setAttribute('type', 'checkbox');
      tdCheckbox.appendChild(input);
      tr.appendChild(tdCheckbox);

      tbody.appendChild(tr);
    }

    table.appendChild(tbody);
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
}