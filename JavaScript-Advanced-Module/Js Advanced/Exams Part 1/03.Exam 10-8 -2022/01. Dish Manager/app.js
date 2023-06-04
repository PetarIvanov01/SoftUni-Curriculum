window.addEventListener("load", solve);

function solve() {

  const [firstName, lastName, age] = Array.from(document.querySelectorAll('.inner-wrap input'))

  const gender = document.getElementById('genderSelect');
  const description = document.getElementById('task');

  const sbmBtn = document.getElementById('form-btn');
  const clearBtn = document.getElementById('clear-btn');

  const count = document.getElementById('progress-count');
  let counter = 0;

  sbmBtn.addEventListener('click', submit)

  function submit(event) {

    if (firstName.value === '' || lastName.value === '' || age.value === '' || description.value === '') {
      return;
    };

    const parrentUl = document.getElementById('in-progress');

    const copyData = {
      _firstName: firstName.value,
      _lastName: lastName.value,
      _age: age.value,
      _gender: gender.value,
      _description: description.value
    };

    const editBtn = createElements('button', { class: 'edit-btn' }, 'Edit');
    const completeBtn = createElements('button', { class: 'complete-btn' }, 'Mark as complete');

    const filed = createElements('li', { class: 'each-line' }, createElements('article', {},
      createElements('h4', {}, `${firstName.value} ${lastName.value}`),
      createElements('p', {}, `${gender.value}, ${age.value}`),
      createElements('p', {}, `Dish description: ${description.value}`)));

    filed.appendChild(editBtn);
    filed.appendChild(completeBtn);
    parrentUl.appendChild(filed);

    counter += 1;
    count.textContent = counter;

    document.querySelector('form').reset();

    editBtn.addEventListener('click', edit)
    completeBtn.addEventListener('click', completed.bind(null, filed, editBtn, completeBtn));
    clearBtn.addEventListener('click', clear.bind(null, filed));

    function edit() {

      counter -= 1
      count.textContent = counter;

      filed.remove()

      firstName.value = copyData._firstName;
      lastName.value = copyData._lastName;
      age.value = copyData._age;
      gender.value = copyData._gender;
      description.value = copyData._description;
    }
  }

  function completed(field, editBtn, completeBtn) {
    const finished = document.getElementById('finished');

    finished.appendChild(field);
    counter -= 1
    count.textContent = counter;
    editBtn.remove();
    completeBtn.remove();

  }

  function clear(field) {

    field.remove();

  }

  function createElements(type, atrib, ...content) {

    const element = document.createElement(type);

    if (Object.keys(atrib).length !== 0) {
      for (let prop in atrib) {
        element.classList.add(atrib[prop]);
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
