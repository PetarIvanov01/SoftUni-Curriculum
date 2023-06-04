function attachEvents() {

    document.getElementById('submit').addEventListener('click', postMessage);
    document.getElementById('refresh').addEventListener('click', refreshData);
    
    const ulr = 'http://localhost:3030/jsonstore/messenger';
    
    const textArea = document.getElementById('messages');

    async function refreshData(e) {

        const response = await fetch(ulr);

        const data = await response.json();

        textArea.value = Object.values(data).map(mess => `${mess.author}: ${mess.content}`).join('\n');

    }
    async function postMessage(e) {

        const authorInput = document.querySelector('[name="author"]').value;
        const contentInput = document.querySelector('[name="content"]').value;

        const data = {

            'author': authorInput,
            'content': contentInput,

        }

        const response = await fetch(ulr, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
    }
}

attachEvents();