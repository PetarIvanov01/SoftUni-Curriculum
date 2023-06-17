window.addEventListener('load', solve);

function solve() {

    const nextButton = document.querySelector('#next-btn');
    const form = document.querySelector('form');
    const img = document.querySelector('#complete-img');
    const compText = document.querySelector('#complete-text')

    const partInfo = document.querySelector('.info-list');
    const confirmOrder = document.querySelector('.confirm-list');

    const fields = Array.from(document.querySelectorAll('form input'));
    const field5 = document.querySelector('#condition');

    let contBtn;
    let editBtn;

    nextButton.addEventListener('click', (event) => {

            event.preventDefault();

            if (fields.some(el => el.value.trim() == '') || field5.value.trim() == '' || fields[1].value < 1980 || fields[1].value > 2023) {
                    return;
            }
            img.style.visibility = 'hidden';
            compText.textContent = '';
            nextButton.disabled = true;

            let copyFields;

            const [field1, field2, field3, field4] = fields;

            copyFields = {
                    carModel: field1.value,
                    carYear: field2.value,
                    partName: field3.value,
                    partNumb: field4.value,
                    condition: field5.value
            }

            partInfo.innerHTML = `<li class="part-content">
                    <article>
                            <p>Car Model: ${copyFields.carModel}</p>
                            <p>Car Year: ${copyFields.carYear}</p>
                            <p>Part Name: ${copyFields.partName}</p>
                            <p>Part Number: ${copyFields.partNumb}</p>
                            <p>Condition: ${copyFields.condition}</p>
                    </article>
                    <button class="edit-btn">Edit</button>
                    <button class="continue-btn">Continue</button>
            </li>`

            form.reset()

            contBtn = document.querySelector('.continue-btn');
            editBtn = document.querySelector('.edit-btn');

            contBtn.addEventListener('click', contFunc.bind(null, copyFields));

            editBtn.addEventListener('click', editFunc.bind(null, copyFields));

    })
    function contFunc(data) {
            partInfo.innerHTML = '';

            confirmOrder.innerHTML = `<li class="part-content">
                   <article>
                           <p>Car Model: ${data.carModel}</p>
                           <p>Car Year: ${data.carYear}</p>
                           <p>Part Name: ${data.partName}</p>
                           <p>Part Number: ${data.partNumb}</p>
                           <p>Condition: ${data.condition}</p>
                   </article>
                   <button class="confirm-btn">Confirm</button>
                   <button class="cancel-btn">Cancel</button>
           </li>`

            const confirmBtn = document.querySelector('.confirm-btn');
            const cancelBtn = document.querySelector('.cancel-btn');

            confirmBtn.addEventListener('click', (event) => {
                    confirmOrder.innerHTML = '';
                    nextButton.disabled = false;
                    img.style.visibility = 'visible';
                    compText.textContent = 'Part is Ordered!';
            })
            cancelBtn.addEventListener('click', (event) => {
                    confirmOrder.innerHTML = '';
                    nextButton.disabled = false;
            })
    }

    function editFunc(data) {
            nextButton.disabled = false
            partInfo.innerHTML = '';

            const childrens = Array.from(form.querySelectorAll('input, select'));
            childrens.forEach((ch, i) => ch.value = Object.values(data)[i]);
    }

};