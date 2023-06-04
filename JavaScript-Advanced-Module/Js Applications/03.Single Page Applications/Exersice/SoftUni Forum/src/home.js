import { showDetails } from './details.js'

const section = document.querySelector('#homeView');
section.querySelector('div.topic-title').addEventListener('click', showDetails);
section.remove()

const main = document.querySelector('#main')
const form = section.querySelector('form');
const cancelBtn = form.querySelector('.cancel')
const container = section.querySelector('.topic-container')

export async function showHome(event) {

    event && event.preventDefault(); //ev?


    const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts');
    const data = Object.values(await response.json());

    container.replaceChildren(...data.map(createPost))

    main.replaceChildren(section);
}

form.addEventListener('submit', onSubmit)


async function onSubmit(event) {

    event.preventDefault()
    const formData = new FormData(form);

    let name = formData.get('username').trim();
    let topic = formData.get('topicName').trim();
    let text = formData.get('postText').trim();
    
    try {
        if (name == '' || topic == '' || text == '') {
            throw new Error('All fields are required!')

        }
        const res = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, topic, text, dataCreate: new Date() })
        });
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message);
        }

        form.reset()
        showHome();

    }
    catch (err) {
        alert(err.message);
    }


}

cancelBtn.addEventListener('click', (event) => {
    form.reset()
})

function createPost(post) {
    const element = document.createElement('div')
    element.classList.add('topic-name-wrapper')
    element.innerHTML = `
    <div class="topic-name">
        	<a href="/details" class="normal" id="${post._id}">
               <h2> ${post.topic} 10</h2>
            </a>
        <div class="columns">
            <div>
            <p>Date: <time>${post.dataCreate}</time></p>
            <div class="nick-name">
            <p>Username: <span>${post.name}</span></p>
            </div>
        </div>
    </div>`

    return element;

}
