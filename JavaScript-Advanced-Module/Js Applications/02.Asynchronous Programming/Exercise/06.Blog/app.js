function attachEvents() {
    const loadPostsBtn = document.querySelector("#btnLoadPosts");
    const viewPostBtn = document.querySelector("#btnViewPost");
    const postsSelect = document.querySelector("#posts");
    const postTitle = document.querySelector("#post-title");
    const postBody = document.querySelector("#post-body");
    const postComments = document.querySelector("#post-comments");


    try {

        loadPostsBtn.addEventListener("click", loadPosts);
        viewPostBtn.addEventListener("click", viewPost);

        async function loadPosts() {

            const res = await fetch("http://localhost:3030/jsonstore/blog/posts");

            if (!res.ok) {
                throw new Error('Failed response');
            }
            const data = await res.json();

            Object.values(data).map(el => postsSelect.appendChild(createEL('option', el.id, el.title)))

        }

        async function viewPost() {

            const postId = postsSelect.value;
            const commentsRes = await fetch("http://localhost:3030/jsonstore/blog/comments");

            if (!commentsRes.ok) {
                throw new Error('Failed response');
            }

            const commentsData = await commentsRes.json();

            postComments.innerHTML = "";

            for (const comment of Object.values(commentsData)) {

                if (comment.postId === postId) {

                    let id = comment.id
                    let li = createEL('li', undefined, comment.text);
                    li.setAttribute('id', id)
                    postComments.appendChild(li);

                }

            }

            const postRes = await fetch(`http://localhost:3030/jsonstore/blog/posts/${postId}`);

            if (!postRes.ok) {
                throw new Error('Failed response');
            }

            const postData = await postRes.json();

            postTitle.textContent = postData.title;
            postBody.textContent = postData.body;

        }
    }
    catch (error) {

        console.log(error.message);

    }

    function createEL(type, value, content) {

        let element = document.createElement(type)

        if (value != undefined) {

            element.setAttribute('value', value);

        }
        element.textContent = content;
        return element
    }

}

attachEvents();