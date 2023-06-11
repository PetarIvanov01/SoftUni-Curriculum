import page from '../node_modules/page/page.mjs'
import { logout } from './api/auth.js';
import { setUser, withRenderMiddleware } from './util/middleware.js';
import { catalogControler } from './views/catalog.js';
import { createControler } from './views/create.js';
import { detailsControler } from './views/details.js';
import { editControler } from './views/edit.js';
import { homeControler, } from './views/home.js';
import { loginControler } from './views/login.js';
import { registerControler } from './views/register.js';


page(setUser);
page(withRenderMiddleware);

page('/', homeControler);
page('/catalog', catalogControler);
page('/create', createControler);
page('/details/:id', detailsControler);
page('/edit/:id', editControler);
page('/login', loginControler);
page('/logout', async (ctx) => {
    await logout(ctx)
})
page('/register', registerControler);

page.start();

