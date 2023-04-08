import { logout,checked } from "./auth.js";
import { renderRecipe } from "./render.js";

window.addEventListener('load', () =>

    fetch('http://localhost:3030/data/recipes?select=_id%2Cname%2Cimg')
        .then(res => res.json())
        .then(data => {
            document.getElementById('logoutBtn').addEventListener('click', logout)
            checked()
            renderRecipe(Object.values(data))
        })
)




