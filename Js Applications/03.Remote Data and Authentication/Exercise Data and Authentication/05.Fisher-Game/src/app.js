// All data for logout function ^^^
const user = JSON.parse(sessionStorage.getItem('user'));
const logout = document.getElementById('logout');
const addBtn = document.querySelector('.add')

navigationButtons()
function navigationButtons() {

    if (!user) {
        logout.style.display = 'none';
        addBtn.disabled = true
    }

    else {
        logout.style.display = 'inline';
        document.getElementById('login').style.display = 'none';
        document.getElementById('register').style.display = 'none';

        document.querySelector('.email span').textContent = user.email;
        addBtn.disabled = false
    }
}

logout.addEventListener('click', onLogout)

async function onLogout(event) {

    try {
        console.log(user.token);

        const res = await fetch('http://localhost:3030/users/logout', {
            method: 'GET',
            headers: {
                "X-Authorization": user.token
            }
        })

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message);
        }

        sessionStorage.removeItem('user');
        window.location = './index.html';
    }
    catch (err) {
        alert(err.message)
    }
}
/*-------//--------*/

const section = document.querySelector('#home-view');
const formCreate = document.querySelector('#addForm')
formCreate.addEventListener('submit', onCreate)
section.addEventListener('click', onClick);


function onClick(event) {

    let btnNav = event.target.className;

    if (btnNav == 'load') {
        onLoad()

    } else if (btnNav == 'update') {
        onUpdate()
    }
    else if (btnNav == 'delete') {
        onDelete()
    }

}

async function onLoad() {

    const mainCatch = document.querySelector('#catches');
    const res = await fetch('http://localhost:3030/data/catches')
    const data = await res.json();
    
    mainCatch.innerHTML = '';

    Object.values(data).map(el => mainCatch.appendChild(createCatch(el)));

    const updateBtn = document.querySelectorAll('.update');
    const deleteBtn = document.querySelectorAll('.delete');

    Array.from(updateBtn).forEach(btn => {
        if (btn.dataset.id !== user.id) {
            btn.disabled = true
        }
    })
    Array.from(deleteBtn).forEach(btn => {
        if (btn.dataset.id !== user.id) {
            btn.disabled = true
        }
    })
}
function onUpdate() {

}
function onDelete() {

}
async function onCreate(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget)

    const data = {
        "angler": formData.get('angler'),
        "weight": formData.get('weight'),
        "species": formData.get('species'),
        "location": formData.get('location'),
        "bait": formData.get('bait'),
        "captureTime": formData.get('captureTime')
    }

    try {
        if (Object.values(data).some(el => el == '')) {
            throw new Error('All fields are required')
        }
        const res = await fetch('http://localhost:3030/data/catches', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": user.token
            },
            body: JSON.stringify(data)

        });
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message);
        }
        formCreate.reset()

    } catch (error) {
        alert(error.message);
    }

}

function createCatch(el) {

    let div = document.createElement('div');

    div.className = 'catch';
    div.innerHTML = `
        <label>Angler</label>
        <input type="text" class="angler" value="${el.angler}">
        <label>Weight</label>
        <input type="text" class="weight" value="${el.weight}">
        <label>Species</label>
        <input type="text" class="species" value="${el.species}">
        <label>Location</label>
        <input type="text" class="location" value="${el.location}">
        <label>Bait</label>
        <input type="text" class="bait" value="${el.bait}">
        <label>Capture Time</label>
        <input type="number" class="captureTime" value="${el.captureTime}">
        <button class="update" data-id="${el._ownerId}">Update</button>
        <button class="delete" data-id="${el._ownerId}">Delete</button>
        `

    return div
}