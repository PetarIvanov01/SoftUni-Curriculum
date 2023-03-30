window.addEventListener('load', () =>

    fetch('http://localhost:3030/data/recipes?select=_id%2Cname%2Cimg')
        .then(res => res.json())
        .then(data => {
            document.getElementById('logoutBtn').addEventListener('click', logout)
            checked()
            renderRecipe(Object.values(data))
        })
)

function logout() {
    const token = sessionStorage.getItem('accesToken');

    fetch('http://localhost:3030/users/logout', {
        headers: {
            "X-Authorization": token
        }
    })
    sessionStorage.removeItem('accesToken');
    window.location = 'http://127.0.0.1:5500/Practical%20Project%20-%20Cookbook/js-apps-workshop-master/lesson-03/base/index.html'
}
function checked() {

    const token = sessionStorage.getItem('accesToken');

    if (token != null) {
        document.getElementById('user').style.display = 'inline-block';
    }
    else {
        document.getElementById('guest').style.display = 'inline-block';
    }

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