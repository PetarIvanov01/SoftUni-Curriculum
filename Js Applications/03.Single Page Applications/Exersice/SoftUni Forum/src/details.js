const section = document.querySelector('#detailsView');
const main = document.querySelector('#main')
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit)

const postElement = {
    title: document.getElementById('details-title'),
    username: document.getElementById('details-username'),
    time: document.getElementById('details-time'),
    content: document.getElementById('details-content'),
}
const commentsList = document.getElementById('user-comment');
section.remove()

let postId;

export function showDetails(event) {

    let target = event.target

    if (target.tagName == 'H2') {
        target = target.parentElement;

    }

    if (target.tagName == 'A') {

        event.preventDefault();
        const postId = target.id

        showPost(postId);

    }

}

async function showPost(postId) {

    const [res, commentsRes] = await Promise.all([
        fetch('http://localhost:3030/jsonstore/collections/myboard/posts/' + postId),
        fetch('http://localhost:3030/jsonstore/collections/myboard/comments')
    ]);
    const [post, comments] = await Promise.all([
        res.json(),
        commentsRes.json()
    ]);

    commentsList.replaceChildren(...Object.values(comments)
        .filter(c => c.postId == postId)
        .map(createCommentElement))

    form.id = postId;
    postElement.title.textContent = post.topic
    postElement.username.textContent = post.name
    postElement.time.textContent = post.dataCreate
    postElement.content.textContent = post.text

    main.replaceChildren(section);
}
async function onSubmit(event) {

    event.preventDefault()
    const formData = new FormData(form);

    const username = formData.get('username').trim();
    const content = formData.get('postText').trim();
    const postId = form.id;

    try {
        if (username == '' || content == '') {

            throw new Error('All fields are required!')

        }

        const res = await fetch(' http://localhost:3030/jsonstore/collections/myboard/comments', {
            method: 'post',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ username, content, postId, dataCreate: new Date() })

        })

        if (!res.ok) {
            const err = await res.json()
            throw new Error(err.message);
        }

        form.reset();
        showPost(postId);

    }
    catch (err) {
        alert(err.message)
    }
}

function createCommentElement(comment) {

    const element = document.createElement('div');
    element.className = 'topic-name-wrapper'
    element.innerHTML = `
    <div class="topic-name-wrapper">
            <div class="topic-name">
               <p><strong>${comment.username}</strong> commented on <time>${comment.dataCreate}</time></p>
                    <div class="post-content">
                        <p>${comment.content}</p>
                    </div>
            </div>
    </div>
    `

    return element;
}