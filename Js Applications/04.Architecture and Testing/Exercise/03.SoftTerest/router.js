export function initialize(links) {

    const main = document.querySelector('main');
    const navigation = document.querySelector('nav');
    navigation.addEventListener('click', onNavigate);


    const ctx = {
        showView,
        goto
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
    
    function goto(name) {

        const view = links[name];
        if (typeof view == 'function') {
            view(ctx);
        }
    }
}