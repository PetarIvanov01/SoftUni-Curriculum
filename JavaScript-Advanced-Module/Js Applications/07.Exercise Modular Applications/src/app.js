import page from "../node_modules/page/page.mjs";
import { catalogController } from "./controllers/page/catalog.js";
import { createController } from "./controllers/page/create.js";
import { detailsController } from "./controllers/page/details.js";
import { homeController } from "./controllers/page/home.js";
import { myTeamController } from "./controllers/page/myTeams.js";
import { loginController } from "./controllers/authViews/login.js";
import { registerController } from "./controllers/authViews/register.js";
import { attachRender } from "./middlewares/middleware.js";
import { logoutController } from "./controllers/authViews/logout.js";
import { showNavigation } from "./middlewares/navigation.js";
import { teamMembers } from "./middlewares/team.js";
import { editController } from "./controllers/page/edit.js";


page(attachRender);
page(showNavigation);
page(teamMembers);

page('/', homeController);

page('/catalog', catalogController);

page('/details/:id', detailsController);

page('/edit/:id', editController);

page('/own/teams', myTeamController);

page('/create', createController);

page('/auth/login', loginController);

page('/auth/register', registerController);

page('/auth/logout', logoutController);


page.start();