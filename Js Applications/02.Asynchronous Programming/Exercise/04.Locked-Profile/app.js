function lockedProfile() {

    const main = document.getElementById('main');

    async function createPeoples() {

        const response = await fetch('http://localhost:3030/jsonstore/advanced/profiles');
        const data = await response.json();

        for (const [id, obj] of Object.entries(data)) {

            let personData = Object.entries(obj);
            let username = personData[1].pop();
            let email = personData[2].pop();
            let age = personData[3].pop();

            let parentDiv = createEl('div', '', { 'class': 'profile' });

            let imgInDiv = createEl('img', '', { 'class': 'userIcon' });
            imgInDiv.src = './iconProfile2.png';

            let labelLock = createEl('label', 'Lock',);
            let inputLocked = createEl('input', '', { 'type': 'radio', 'name': 'user1Locked', 'value': "lock" });
            inputLocked.setAttribute('checked', '')

            let labelUnlock = createEl('label', 'Unlock');
            let inputUsername = createEl('input', '', { 'type': 'radio', 'name': 'user1Locked', 'value': "unlock" });

            parentDiv.appendChild(imgInDiv);
            parentDiv.appendChild(labelLock);
            parentDiv.appendChild(inputLocked);
            parentDiv.appendChild(labelUnlock);
            parentDiv.appendChild(inputUsername);

            let br = createEl('br');
            let hr = createEl('hr');
            let labelAboveHr = createEl('label', 'Username');
            let inputUsernameAboveHr = createEl('input', '', { 'type': 'text', 'name': 'user1Username', });
            inputUsernameAboveHr.setAttribute('value', `${username}`)
            inputUsernameAboveHr.setAttribute('disabled', '')
            inputUsernameAboveHr.setAttribute('readonly', '')

            parentDiv.appendChild(br)
            parentDiv.appendChild(hr);
            parentDiv.appendChild(labelAboveHr);
            parentDiv.appendChild(inputUsernameAboveHr);

            let divAboveHr = createEl('div', '', { 'id': "user1HiddenFields" });
            divAboveHr.style.display = 'none';

            parentDiv.appendChild(divAboveHr);

            let hrInDiv = createEl('hr');
            let labelEmailInDiv = createEl('lable', 'Email:');

            let inputInDiv = createEl('input', '', { 'type': "email", 'name': 'user1Email' });
            inputInDiv.setAttribute('value', `${email}`)
            inputInDiv.setAttribute('disabled', '')
            inputInDiv.setAttribute('readonly', '')

            let lableAgeInDiv = createEl('label', 'Age:');
            let inputAgeInDiv = createEl('input', '', { 'type': "text", 'name': 'user1Email' });
            inputAgeInDiv.setAttribute('value', `${age}`)
            inputAgeInDiv.setAttribute('disabled', '')
            inputAgeInDiv.setAttribute('readonly', '')

            let btn = createEl('button', 'Show more');

            divAboveHr.appendChild(hrInDiv);
            divAboveHr.appendChild(labelEmailInDiv);
            divAboveHr.appendChild(inputInDiv);
            divAboveHr.appendChild(lableAgeInDiv);
            divAboveHr.appendChild(inputAgeInDiv);

            parentDiv.appendChild(divAboveHr);

            parentDiv.appendChild(btn);

            main.appendChild(parentDiv);

            btn.addEventListener('click', toggle.bind(null, inputLocked, divAboveHr, btn));
        }
    }
    createPeoples();

    function toggle(isLock, hiddenInfo, button) {

        if (!isLock.checked) {
            if (button.textContent === 'Hide it') {
                hiddenInfo.style.display = 'none';
                button.textContent = 'Show more'
            }
            else {
                hiddenInfo.style.display = 'block';
                button.textContent = 'Hide it'
            }
        }
    }

    function createEl(type, content, atr) {
        let el = document.createElement(type);
        if (content) {
            el.textContent = content;
        }
        for (let prop in atr) {
            el[prop] = atr[prop];

            if (atr.hasOwnProperty('class')) {
                el.classList.add(atr[prop]);
            }
        }
        return el
    }

}

