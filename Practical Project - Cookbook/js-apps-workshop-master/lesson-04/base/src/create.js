const form = document.querySelector('#create-recipe');
form.addEventListener('submit', requestRecipe)

const recipeSection = document.querySelector('.create')

export function renderCreateRecipe() {

    recipeSection.style.display = 'block';

}

async function requestRecipe(event) {
    event.preventDefault();

    const user = sessionStorage.getItem('user');
    const token = JSON.parse(user).accessToken;
    try {
        let formData = new FormData(form);

        const input = {

            'name': formData.get('name'),
            'img': formData.get('img'),
            'ingredients': formData.get('ingredients').split('\n'),
            'steps': formData.get('steps').split('\n'),

        }
        const url = new URL(input.img)

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
        alert('Recipe is created!')

    }
    catch (err) {
        
        alert(err.message);
    }

}