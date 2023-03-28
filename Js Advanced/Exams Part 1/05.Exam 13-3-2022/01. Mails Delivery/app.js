function solve() {

    const recipientName = document.querySelector('#recipientName');
    const title = document.querySelector('#title');
    const message = document.querySelector('#message');

    const addBtn = document.querySelector('#add');
    const resetBtn = document.querySelector('#reset');

    const ulParrent = document.querySelector('#list');

    addBtn.addEventListener('click', addToList)
    function addToList(e) {

        e.preventDefault();

        if (recipientName.value == '' || title.value == '' || message.value == '') {
            return;
        };

        let li = createElements('li', {},
            createElements('h4', {}, `Title: ${title.value}`),
            createElements('h4', {}, `Recipient Name: ${recipientName.value}`),
            createElements('span', {}, message.value),
            createElements('div', { 'id': 'list-action' },
                createElements('button', { 'type': 'submit', 'id': 'send' }, 'Send'),
                createElements('button', { 'type': 'submit', 'id': 'delete' }, 'Delete')
            ));
        ulParrent.appendChild(li)


    }
    //Get the information from the form.
    //If any of the fields are empty return.

    //On click "Add to the List" create li in ul in div "class" ="list-mails".
    //Clear the inputs
    //On click "Reset" clear the information from the form.

    //On click "Send" the information must be sent to the sent mails and the li must be deleted from the list of mails.

    //On click "Delete".

    function createElements(type, atrib, ...content) {

        const element = document.createElement(type);
        if (Object.keys(atrib).length !== 0) {
            for (let prop in atrib) {
                if (prop == 'class') {
                    element.classList.add(atrib[prop]);
                }
                else {
                    element[prop] = atrib[prop]
                }
                console.log(atrib[prop] + ' ' + prop);
            };
        };
        for (let el of content) {
            if (typeof el == 'string' || typeof el == 'number') {

                el = document.createTextNode(el);

            };
            element.appendChild(el);
        };
        return element;
    }
}
solve()