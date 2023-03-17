window.addEventListener("load", solve);

function solve() {

  const [make, model, year, orfCost, selCost] = document.querySelectorAll('fieldset input');
  const fuel = document.querySelector('#fuel');
  const sbmButton = document.querySelector('#publish');
  let profit = 0;

  sbmButton.addEventListener('click', publish);

  function publish(event) {
    event.preventDefault()

    if (make.value === '' || model.value === '' || year.value === '' || orfCost.value === '' || selCost === '' || orfCost.value > selCost.value) {
      return;
    }

    const obj = {
      _make: make.value,
      _model: model.value,
      _year: year.value,
      _orfCost: orfCost.value,
      _selCost: selCost.value,
      _fuel: fuel.value,
    }

    const parrentEl = document.getElementById('table-body');

    const field = createElements('tr', { class: 'row' },
      createElements('td', {}, make.value),
      createElements('td', {}, model.value),
      createElements('td', {}, year.value),
      createElements('td', {}, fuel.value),
      createElements('td', {}, orfCost.value),
      createElements('td', {}, selCost.value),
      createElements('td', {},
        createElements('button', { class: 'action-btn', editClass: 'edit' }, 'Edit'),
        createElements('button', { class: 'action-btn', sellClass: 'sell' }, 'Sell')));

    parrentEl.appendChild(field)
    const editBtn = document.querySelector('.edit');
    const sellBtn = document.querySelector('.sell');

    document.querySelector('form').reset();

    editBtn.addEventListener('click', function () {
      field.remove()
      make.value = obj._make;
      model.value = obj._model;
      year.value = obj._year;
      orfCost.value = obj._orfCost;
      selCost.value = obj._selCost;
      fuel.value = obj._fuel;
    });

    sellBtn.addEventListener('click', function () {
      field.remove();
      let diff = obj._selCost - obj._orfCost;
      profit += diff

      const carsList = document.querySelector('#cars-list');
      const eachClass = createElements('li', { class: 'each-list' },
        createElements('span', {}, obj._make),
        createElements('span', {}, obj._model),
        createElements('span', {}, diff))

      document.getElementById('profit').textContent = diff.toFixed(2);
      carsList.appendChild(eachClass)
    })
  }

  function createElements(type, atrib, ...content) {
    const element = document.createElement(type);

    if (Object.keys(atrib).length !== 0) {
      for (let prop in atrib) {
        element.classList.add(`${atrib[prop]}`);
      };
    };
    for (let el of content) {
      if (typeof el == 'string' || typeof el == 'number') {
        el = document.createTextNode(el);
      };
      element.appendChild(el);
    };
    return element;
  }
}
