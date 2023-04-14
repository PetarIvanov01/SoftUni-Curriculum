// All data for logout function ^^^
const user = JSON.parse(sessionStorage.getItem('user'));
const logout = document.getElementById('logout');
const addBtn = document.querySelector('.add')

if (!user) {
    logout.style.display = 'none';
}

else {
    document.querySelector("#guest").style.display = "none";
    document.querySelector('.email span').textContent = user.email;
    addBtn.disabled = false
    onLoad()
}

const section = document.querySelector('#home-view');
const formCreate = document.querySelector('#addForm')

formCreate.addEventListener('submit', onCreate)

section.addEventListener('click', onClick);

logout.addEventListener('click', onLogout)

async function onLogout(event) {

    try {
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

        sessionStorage.clear();
        window.location = './index.html';
    }
    catch (err) {
        alert(err.message)
    }
}

function onClick(event) {

    let btnNav = event.target.className;

    if (btnNav == 'load') {
        onLoad(event)

    } else if (btnNav == 'update') {
        onUpdate(event)
    }
    else if (btnNav == 'delete') {
        onDelete(event)
    }

}

async function onLoad() {

    const res = await fetch('http://localhost:3030/data/catches')
    const data = await res.json();

    document.getElementById("catches").replaceChildren(...data.map(createCatch));
}

async function onUpdate(event) {

    let btn = event.target

    const parrent = btn.parentElement
    const [angler, weight, species, location, bait, captureTime] = parrent.querySelectorAll('input');
    const data = {
        angler: angler.value,
        weight: Number(weight.value),
        species: species.value,
        location: location.value,
        bait: bait.value,
        captureTime: Number(captureTime.value)
    }

    try {
        const res = await fetch('http://localhost:3030/data/catches/' + btn.id, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": user.accessToken
            },
            body: JSON.stringify(data)

        })

        if (!res.ok) {
            const error = await res.json()
            throw new Error(error.message)
        }

    } catch (error) {
        alert(error.message)
    }
    onLoad();

}

async function onDelete(event) {

    let btn = event.target

    try {

        const res = await fetch('http://localhost:3030/data/catches/' + btn.id, {
            method: 'DELETE',
            headers: {
                "X-Authorization": user.token
            }
        })

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message);
        }
        onLoad()
    }
    catch (error) {
        alert(error.message)
    }

}

async function onCreate(event) {
    event.preventDefault();

    if (!user) {
        window.location = "./login.html";
        return;
    }
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
        onLoad()
        formCreate.reset()

    } catch (error) {
        alert(error.message);
    }

}
function createCatch(data) {

    const isDisabled = user && data._ownerId === user.id ? false : true;
    const catches = createElement(
        "div",
        { class: "catch" },
        createElement("label", {}, "Angler"),
        createElement("input", {
            type: "text",
            class: "angler",
            value: data.angler,
            disabled: isDisabled,
        }),
        createElement("label", {}, "Weight"),
        createElement("input", {
            type: "text",
            class: "weight",
            value: data.weight,
            disabled: isDisabled,
        }),
        createElement("label", {}, "Species"),
        createElement("input", {
            type: "text",
            class: "species",
            value: data.species,
            disabled: isDisabled,
        }),
        createElement("label", {}, "Location"),
        createElement("input", {
            type: "text",
            class: "location",
            value: data.location,
            disabled: isDisabled,
        }),
        createElement("label", {}, "Bait"),
        createElement("input", {
            type: "text",
            class: "bait",
            value: data.bait,
            disabled: isDisabled,
        }),
        createElement("label", {}, "Capture Time"),
        createElement("input", {
            type: "number",
            class: "captureTime",
            value: data.captureTime,
            disabled: isDisabled,
        }),
        createElement(
            "button",
            { class: "update", id: data._id, disabled: isDisabled },
            "Update"
        ),
        createElement(
            "button",
            { class: "delete", id: data._id, disabled: isDisabled },
            "Delete"
        )
    );
    return catches;
}
function createElement(type, attr, ...content) {
    const element = document.createElement(type);
    for (const item in attr) {
        if (item === "class") {
            element.classList.add(attr[item]);
        } else if (item === "disable") {
            element.disabled = attr[item];
        } else {
            element[item] = attr[item];
        }
    }

    for (let item of content) {
        if (typeof item === "string" || typeof item === "number") {
            item = document.createTextNode(item);
        }
        element.appendChild(item);
    }
    return element;
}
