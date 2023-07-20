import { editTeamReq, getTeamDetails } from "../../service/api-cals.js";
import { html, until } from "../../util.js"

export function editController(ctx) {
    update(null);

    function update(errorMsg) {
        ctx.render(template(onSubmit, errorMsg, getDetails(ctx)));
    }

    async function onSubmit(event) {
        try {
            event.preventDefault();
            const formData = new FormData(event.target);
            const { name, logoUrl, description } = Object.fromEntries(formData);

            if (name.trim() == '' || logoUrl.trim() == '' || description.trim() == '') {
                throw new Error('All fields are required!');
            }
            await editTeamReq(ctx.params.id, { name, logoUrl, description });

            ctx.page.redirect(`/details/${ctx.params.id}`);

        } catch (error) {
            return update(error.message);
        }
    }
}

const template = (onSubmit, error, promise) => html`
 <section id="edit">
                <article class="narrow">
                    <header class="pad-med">
                        <h1>Edit Team</h1>
                    </header>
                    <form id="edit-form" @submit=${onSubmit} class="main-form pad-large">
                    ${error ? html`<div class="error">${error}</div>` : ''}
                    ${until(promise, html`<h1>Loading...</h1>`)}
                    </form>
                </article>
            </section>
`

const loadEditDetails = (item) => html`
                        <label>Team name: <input type="text" name="name" .value=${item.name} ></label>
                        <label>Logo URL: <input type="text" name="logoUrl" .value=${item.logoUrl} ></label>
                        <label>Description: <textarea name="description" .value=${item.description} ></textarea></label>
                        <input class="action cta" type="submit" value="Save Changes">
`
async function getDetails(ctx) {
    try {
        const teamId = ctx.params.id;
        const teamDetails = await getTeamDetails(teamId);

        return loadEditDetails(teamDetails);
    } catch (error) {
        console.error(error.message)
    }
}