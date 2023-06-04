function lockedProfile() {
    let buttons = Array.from(document.querySelectorAll(".profile button"))
    buttons.forEach(button => {
        button.addEventListener('click', reveal)

        function reveal(event) {

            let parrent = event.target.parentElement;
            let isLock = parrent.querySelectorAll("input[value='lock']")[0].checked;
            let hiddenInfo = parrent.querySelector('div');

            if (!isLock) {

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
    })
}