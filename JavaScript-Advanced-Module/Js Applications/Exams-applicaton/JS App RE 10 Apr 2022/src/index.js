import page from '../node_modules/page/page.mjs';
import { logout } from './data/products.js';
import { middleware } from './util.js';
import { createPage } from './views/createPage.js';
import { detailsPage } from './views/detailsPage.js';
import { editPage } from './views/editPage.js';
import { homePage } from './views/homePage.js';
import { loginPage } from './views/loginPage.js';
import { myPostPage } from './views/myPostPage.js';
import { registerPage } from './views/registerPage.js';

page(middleware);
page('/', homePage);
page('/my-post', myPostPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/login', loginPage);
page('/register', registerPage);

page.start();

document.querySelector('#logout').addEventListener('click', () => {

    logout();
    page.redirect('/');
})