window.addEventListener("load", solve);

function solve() {

  const [firstName, lastName, age, storyTitle] = Array.from(document.querySelectorAll('.inner-wrap input'));

  const genre = document.getElementById('genre');
  const storyField = document.getElementById('story');

  const btnPublish = document.getElementById('form-btn');
  const previewList = document.getElementById('preview-list');

  const main = document.getElementById('main');

  btnPublish.addEventListener('click', publish)

  function publish(event) {

    if (firstName.value.trim() !== '' && lastName.value.trim() !== '' && age.value.trim() !== '' && storyTitle.value.trim() !== '' && storyField.value.trim() !== '') {

      btnPublish.disabled = true;

      const btnSave = createElements('button', { class: 'save-btn' }, 'Save Story');
      const btnEdit = createElements('button', { class: 'edit-btn' }, 'Edit Story');
      const btnDelet = createElements('button', { class: 'delete-btn' }, 'Delete Story')

      const field = createElements('li', { class: 'style-info' }
        , createElements('article', {}
          , createElements('h4', {}, `Name: ${firstName.value} ${lastName.value}`,)
          , createElements('p', {}, `Age: ${age.value}`)
          , createElements('p', {}, `Title: ${storyTitle.value}`)
          , createElements('p', {}, `Genre: ${genre.value}`)
          , createElements('p', {}, storyField.value)),
        btnSave,
        btnEdit,
        btnDelet);

      previewList.appendChild(field)

      let copyData = {
        fName: firstName.value,
        lName: lastName.value,
        cAge: age.value,
        cTitle: storyTitle.value,
        cGenre: genre.value,
        cStory: storyField.value
      }

      document.querySelector('form').reset();

      btnEdit.addEventListener('click', edit);
      btnSave.addEventListener('click', save);
      btnDelet.addEventListener('click', deleted.bind(null, field));

      function edit(e) {
        field.remove();

        firstName.value = copyData.fName;
        lastName.value = copyData.lName;
        age.value = copyData.cAge;
        storyTitle.value = copyData.cTitle;
        genre.value = copyData.cGenre;
        storyField.value = copyData.cStory;

        btnPublish.disabled = false;
      }
    }

    return;
  }

  function deleted(field) {

    btnPublish.disabled = false;
    field.remove()

  }

  function save() {

    main.replaceChildren();
    const h1 = createElements('h1', {}, 'Your scary story is saved!');
    main.appendChild(h1);

  }

  function createElements(type, atrib, ...content) {

    const element = document.createElement(type);

    if (Object.keys(atrib).length !== 0) {
      for (let prop in atrib) {
        element.classList.add(atrib[prop]);
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
