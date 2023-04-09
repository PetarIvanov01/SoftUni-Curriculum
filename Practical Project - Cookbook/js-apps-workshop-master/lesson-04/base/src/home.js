
export async function renderHome(path) {

    let element = document.querySelector(path);
    element.style.display = 'block';

    const res = await fetch('http://localhost:3030/data/recipes?select=_id%2Cname%2Cimg')
    const data = await res.json()

    // document.getElementById('logoutBtn').addEventListener('click', logout)
    // checked()d
    renderRecipe(Object.values(data))

}

function renderRecipe(data) {
    const main = document.querySelector('main');

    main.innerHTML = '';

    data.forEach(el => main.appendChild(createRecipe(el, main)));
}
function createRecipe(recipe, main) {

    let article = document.createElement('article')
    article.classList.add('preview');

    article.addEventListener('click', (e) => {

        let url = `http://localhost:3030/data/recipes/${recipe._id}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                main.innerHTML = ''
                main.appendChild(addDesc(data))
            })

    });

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
    let article = document.createElement('article');
    article.innerHTML = `
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

    return article
}