window.addEventListener('load', solve);

function solve() {

    let firstName = document.getElementById('first-name');
    let lastName = document.getElementById('last-name');
    let checkIn = document.getElementById('date-in');
    let checkOut = document.getElementById('date-out');
    let numberOfGuests = document.getElementById('people-count');

    const btn = document.getElementById('next-btn');

    btn.addEventListener('click', countinue)

    function countinue(event) {
        event.preventDefault()

        if (!firstName.value || !lastName.value || !checkIn.value || !checkOut.value || !numberOfGuests.value) {
            return;
        }

        const copyFirstName = firstName.value;
        const copyLastName = lastName.value;
        const copyChekIn = checkIn.value;
        const copyCheckOut = checkOut.value;
        const copyNumberOfg = numberOfGuests.value;

        btn.disabled = true;

        const ulParrent = document.getElementsByClassName('info-list')[0];
        const li = createElements('li', true, 'reservation-content');
        const article = document.createElement('article');

        const h3 = createElements('h3', false, undefined, `Name: ${firstName.value} ${lastName.value}`);

        const p1 = createElements('p', false, undefined, `From date: ${checkIn.value}`);
        const p2 = createElements('p', false, undefined, `To date: ${checkOut.value}`);
        const p3 = createElements('p', false, undefined, `For ${numberOfGuests.value} people`);

        let btn1 = createElements('button', true, 'edit-btn', 'Edit');
        let btn2 = createElements('button', true, 'continue-btn', 'Continue');

        ulParrent.appendChild(li);
        li.appendChild(article);
        [h3, p1, p2, p3].map(el => article.appendChild(el));
        [btn1, btn2].map(el => li.appendChild(el));

        firstName.value = '';
        lastName.value = '';
        checkIn.value = '';
        checkOut.value = '';
        numberOfGuests.value = '';

        btn1.addEventListener('click', edit);

        function edit(event) {
            li.remove()
            firstName.value = copyFirstName;
            lastName.value = copyLastName;
            checkIn.value = copyChekIn;
            checkOut.value = copyCheckOut
            numberOfGuests.value = copyNumberOfg;
            btn.disabled = false;
        }

        btn2.addEventListener('click', continuE)

        function continuE(event) {

            let list = document.getElementsByClassName('confirm-list')[0];
            list.appendChild(li);

            btn1.removeEventListener('click', edit);
            btn2.removeEventListener('click', continuE);

            btn1.addEventListener('click', confirmed)
            btn2.addEventListener('click', cancel)

            btn1.textContent = 'Confirm';
            btn2.textContent = 'Cancel'
            btn1.classList.replace('edit-btn', 'confirm-btn');
            btn2.classList.replace('continue-btn', 'cancel-btn');

        }

        function confirmed(e) {
            li.remove();
            btn.disabled = false;
            const verif = document.getElementById('verification');
            verif.classList.add('reservation-confirmed');
            verif.textContent = 'Confirmed.';

        }

        function cancel(e) {
            li.remove();
            btn.disabled = false;
            const verif = document.getElementById('verification');
            verif.classList.add('reservation-cancelled');
            verif.textContent = 'Cancelled.';
        }

    }

    function createElements(htmlType, haveClass, classContent, textContent) {
        let el = document.createElement(htmlType);
        if (haveClass && htmlType !== 'button') {
            el.classList.add(classContent);
        }
        else if (htmlType === 'button') {
            el.classList.add(classContent);
            el.textContent = textContent;
        }
        else {
            el.textContent = textContent;
        }
        return el;
    }
}





