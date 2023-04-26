import { showCatalog } from "./pages/catalog.js";
import { showCreate } from "./pages/create.js";
import { showDetails } from "./pages/details.js";
import { showHome } from "./pages/home.js";
import { showLogin } from "./pages/login.js";
import { showRegister } from "./pages/register.js";
import { initialize } from "./router.js";

const links = {
    '/': showHome,
    '/register': showRegister,
    '/login': showLogin,
    '/create': showCreate,
    '/details': showDetails,
    '/catalog': showCatalog,
    // '/logout':logout,
}

const views = document.querySelector('#views');
views.remove();

const router = initialize(links);

router.goto('/');
//Start with Home Page.





