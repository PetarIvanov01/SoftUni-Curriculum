import { approveByOwner, becomeMembReq, createTeamReq, getTeamDetails } from "../../service/api-cals.js";
import { html } from "../../util.js"

export function createController(ctx) {

    update(null);

    function update(errorMsg) {
        ctx.render(template(onSubmit, errorMsg));
    }

    async function onSubmit(event) {
        try {
            event.preventDefault();
            const formData = new FormData(event.target);
            const { name, logoUrl, description } = Object.fromEntries(formData);

            if (name.trim() == '' || logoUrl.trim() == '' || description.trim() == '') {
                throw new Error('All fields are required!');
            }
            const item = await createTeamReq({ name, logoUrl, description });
            //TODO validation
            const ownerownerMemb = await becomeMembReq(item._id);
            ownerownerMemb.status = 'member';
            await approveByOwner(ownerownerMemb._id, ownerownerMemb);

            ctx.page.redirect(`/details/${item._id}`);

        } catch (error) {
            return update(error.message);
        }

    }
}

const template = (onSubmit, error) => html`
<section id="create">
<article class="narrow">
    <header class="pad-med">
        <h1>New Team</h1>
    </header>
    <form id="create-form" @submit=${onSubmit} class="main-form pad-large">
    ${error ? html`<div class="error">${error}</div>` : ''} 
        <label>Team name: <input type="text" name="name"></label>
        <label>Logo URL: <input type="text" name="logoUrl"></label>
        <label>Description: <textarea name="description"></textarea></label>
        <input class="action cta" type="submit" value="Create Team">
    </form>
</article>
</section>`