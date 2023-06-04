import { showCreate } from "./create.js"
import { showUpdate } from "./update.js"
import { showCatalog } from "./catalog.js";
import { render } from "./util.js";

const root = document.body;


const ctx = {
    update,
}

update()
function update() {
    render([showCatalog(ctx), showCreate(ctx), showUpdate(ctx)],root)
}