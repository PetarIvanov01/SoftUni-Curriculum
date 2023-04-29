export function initialize(links) {

    const main = document.querySelector('main');
    const navigation = document.querySelector('nav');
    navigation.addEventListener('click', onNavigate);


    const ctx = {
        showView,
        goto,
        updateNav
    };

    return ctx;

    function showView(section) {

        main.replaceChildren(section);

    }

    function onNavigate(event) {
        let target = event.target;

        if (target.tagName == 'IMG') {
            target = target.parentElement;
        }
        if (target.tagName == 'A') {
            event.preventDefault();

            const url = new URL(target.href);
            goto(url.pathname);

        }

    }

    function goto(name,...params) {

        const view = links[name];
        if (typeof view == 'function') {
            view(ctx,...params);
        }
    }

    function updateNav() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            navigation.querySelectorAll('.guest').forEach(el => el.style.display = 'none');
            navigation.querySelectorAll('.user').forEach(el => el.style.display = 'block');
        }
        else {
            navigation.querySelectorAll('.guest').forEach(el => el.style.display = 'block');
            navigation.querySelectorAll('.user').forEach(el => el.style.display = 'none');
        }
    }
}