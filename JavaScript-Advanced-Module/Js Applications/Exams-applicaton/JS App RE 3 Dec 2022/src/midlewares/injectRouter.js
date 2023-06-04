import { getUserData } from "../data/user.js";
import { render } from "../midlewares/depen.js"

const main = document.getElementById('views')

//inject router
export function renderPages(ctx, next) {

    ctx.render = (content) => render(content, main)

    next();

}
//inject user data

export function userData(ctx, next) {

    ctx.user = getUserData();
    next();

}

//inject navigation 

export function navigation(ctx, next) {

    ctx.navigation = () => {

        if (ctx.user) {
            document.querySelector('.user').style.display = 'block'
            document.querySelector('.guest').style.display = 'none'
        }

        else {
            document.querySelector('.user').style.display = 'none'
            document.querySelector('.guest').style.display = 'block'
        }

    }

    ctx.navigation();
    next();

}