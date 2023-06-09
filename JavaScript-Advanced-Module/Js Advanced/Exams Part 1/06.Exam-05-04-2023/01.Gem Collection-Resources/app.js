window.addEventListener("load", solve);

function solve() {

    const addButton = document.querySelector('.button-section input');
    const form = document.querySelector('form');

    const [preview, collection] = Array.from(document.querySelectorAll('#side-wrapper div ul'));
    const fields = Array.from(document.querySelectorAll('.inner-wrap input'));
    const field5 = document.querySelector('.inner-wrap select');

    let saveBtn;
    let editBtn;
    let cancelBtn;

    addButton.addEventListener('click', (event) => {
        event.preventDefault();
        let copyFields;

        const [field1, field2, field3, field4] = fields
        copyFields = {
            field1: field1.value,
            field2: field2.value,
            field3: field3.value,
            field4: field4.value,
            field5: field5.value
        }

        if (fields.some(el => el.value == '') || field5.value == '') {
            return;
        }


        addButton.disabled = true;
        let li = document.createElement('li')
        li.setAttribute('class', 'gem-info')
        li.innerHTML = `
        <article>
            <h4>${field1.value}</h4>
            <p>Color: ${field2.value}</p>
            <p>Carats: ${field3.value}</p>
            <p>Price: ${field4.value}$</p>
            <p>Type: ${field5.value}</p>
        </article>
        <button class="save-btn">Save to Collection</button>
        <button class="edit-btn">Edit Information</button>
        <button class="cancel-btn">Cancel</button>`

        preview.appendChild(li)

        form.reset();
        // Get a reference to the buttons
        saveBtn = document.querySelector('.save-btn');
        editBtn = document.querySelector('.edit-btn');
        cancelBtn = document.querySelector('.cancel-btn');

        // Add click event listener to the "Save to Collection" button
        saveBtn.addEventListener('click', saveFunc.bind(null, copyFields));

        // Add click event listener to the "Edit Information" button
        editBtn.addEventListener('click', editFunc.bind(null, copyFields));

        // Add click event listener to the "Cancel" button
        cancelBtn.addEventListener('click', cancelFunc);
    })

    function saveFunc(data) {
        let li = document.createElement('li')
        li.innerHTML += `
        <p class="collection-item">${data.field1} - Color: ${data.field2}/ Carats: ${data.field3}/ Price: ${data.field4}$/ Type: ${data.field5}</p>`
        collection.appendChild(li);

        addButton.disabled = false
        preview.innerHTML = '';
    }
    function editFunc(data) {
        const childrens = Array.from(form.querySelector('div .inner-wrap').children);
        childrens.forEach((ch, i) => ch.value = Object.values(data)[i]);

        addButton.disabled = false
        preview.innerHTML = '';
    }
    function cancelFunc(event) {
        preview.innerHTML = '';
        addButton.disabled = false;
    }

}
