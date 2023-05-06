import { render } from "../node_modules/lit-html/lit-html.js"
import page from "../node_modules/page/page.mjs"
import { showCreate } from "./view/create.js"
import { showMyFurniture } from "./view/myFurniter.js"
import { showHome } from "./view/home.js"
import { loginPage } from "./view/login.js"
import { registerPage } from "./view/register.js"
import { getUserData } from "./data/user.js"
import { logout } from "./data/data.js"

const body = document.body

page(midleware)
page('/', showHome);
// page('/details/:id',() => console.log('detials'))
page('/create', showCreate);
page('/my-furniture', showMyFurniture);
// page('/edit/:id',showEdit)
page('/login', loginPage);
page('/register', registerPage);

page.start();
update()

function midleware(ctx, next) {

    ctx.render = (tamplate) => render(tamplate, body);
    ctx.update = update
    next();

}

//Start the application.

function update() {
    const user = getUserData()
    if (user != null) {
        document.getElementById('guest').style.display = 'none'
        document.getElementById('user').style.display = 'inline';
    }
    else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'inline'
    }
}

const logoutBtn = document.getElementById('logoutBtn')
logoutBtn.addEventListener('click', logout.bind(null, update, page));
