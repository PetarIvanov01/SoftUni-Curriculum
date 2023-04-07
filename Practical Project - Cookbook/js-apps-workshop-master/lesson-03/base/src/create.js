const form = document.querySelector('form');
form.addEventListener('submit', createRecipe)

async function createRecipe(event) {
    event.preventDefault();

    const token = sessionStorage.getItem('accesToken');
    let formData = new FormData(form);

    const input = {

        'name': formData.get('name'),
        'img': formData.get('img'),
        'ingredients': formData.get('ingredients').split('\n'),
        'steps': formData.get('steps').split('\n'),

    }

    await fetch('http://localhost:3030/data/recipes', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        },
        body: JSON.stringify({
            "name": input.name,
            "img": input.img,
            "ingredients": input.ingredients,
            "steps": input.steps
        })
    })

    window.location = 'http://127.0.0.1:5500/Practical%20Project%20-%20Cookbook/js-apps-workshop-master/lesson-03/base/index.html';

}