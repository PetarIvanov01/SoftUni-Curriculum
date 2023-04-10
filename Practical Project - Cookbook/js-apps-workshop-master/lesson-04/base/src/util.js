const homeSection = document.querySelector('.home');

export function createRecipe(recipe) {


    let article = document.createElement('article');
    article.classList.add('preview');

    article.addEventListener('click', descriptionRecipe.bind(null, recipe))

    article.innerHTML = `
                <div class="title">
                    <h2>${recipe.name}</h2>
                </div>
                <div class="small">
                    <img src ="${recipe.img}">
                </div>
                      `;

    return article;
}

function addDesc(data) {

    try {
        let article = '';
        const contnet = document.createElement('article')

        const currentId = data._ownerId;
        const user = sessionStorage.getItem('user')

        article += `
    <h2>${data.name}</h2>
            <div class="band">
                <div class="thumb">
                    <img src="${data.img}">
                </div>
                <div class="ingredients">
                    <h3>Ingredients:</h3>
                    <ul>
                    ${data.ingredients.map(e => `<li>${e}</li>`).join('')}
                    </ul>
                </div>
            </div>
            <div class="description">
                <h3>Preparation:</h3>
                ${data.steps.map(e => `<p>${e}</p>`).join('')}
            </div>
            `
        if (user) {

            const ownerId = JSON.parse(user)._id

            if (currentId == ownerId) {
                article += `<button id="edit-button" data-recipe-id="${data._id}">Edit</button>
            <button id="delete-button" data-recipe-id="${data._id}">Delete</button>`;
            }
        }

        contnet.innerHTML = article

        return contnet
    }
    catch (err) {
        alert(err.message)
    }
}


async function descriptionRecipe(recipe) {

    const res = await fetch(`http://localhost:3030/data/recipes/${recipe._id}`);
    const data = await res.json();


    homeSection.replaceChildren(addDesc(data));

}

// const userId = sessionStorage.getItem('userId');
//     if (userId != null && recipe._ownerId == userId) {
//         result.appendChild(e('div', { className: 'controls' },
//             e('button', { onClick: () => showEdit(recipe._id) }, '\u270E Edit'),
//             e('button', { onClick: onDelete }, '\u2716 Delete'),
//         ));
//     }