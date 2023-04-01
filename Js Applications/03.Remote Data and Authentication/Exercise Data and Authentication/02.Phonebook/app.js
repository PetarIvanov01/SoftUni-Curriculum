function attachEvents() {

    document.getElementById('btnCreate').addEventListener('click', submit)
    document.getElementById('btnLoad').addEventListener('click', refresh)

    let name = document.getElementById('person')
    let phone = document.getElementById('phone')
    const phonebook = document.getElementById('phonebook');

    async function refresh(event) {
        let response = await fetch('http://localhost:3030/jsonstore/phonebook');
        let data = await response.json();

        for (const el of Object.values(data)) {
            let id = el._id;
            let li = document.createElement('li')

            let button = document.createElement('button');
            button.addEventListener('click', deleted.bind(null, id))
            button.innerText = 'Delete';

            li.textContent = `${el.person}: ${el.phone}`;
            li.appendChild(button)

            phonebook.appendChild(li);
        }

    }
    async function submit(event) {
        let data = {
            "person": name.value,
            "phone": phone.value
        }
        phone.value = ''
        name.value = ''
        await fetch('http://localhost:3030/jsonstore/phonebook', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }
    async function deleted(id, event) {

        let response = await fetch(`http://localhost:3030/jsonstore/phonebook/${id}`, {
            method: 'Delete',
        })
        let data = await response.json()

        event.target.parentElement.remove()
    }
}

attachEvents();