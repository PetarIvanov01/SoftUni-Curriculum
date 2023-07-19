import { getAllMembers, getAllTeams } from "../../service/api-cals.js";
import { html, until } from "../../util.js"

export function catalogController(ctx) {
    const user = ctx.user || undefined;
    ctx.render(template(user, getTeams(ctx)));
}

const template = (user, promise) => html`
 <section id="browse">

    <article class="pad-med">
        <h1>Team Browser</h1>
    </article>
    ${user ? html`<article class="layout narrow">
        <div class="pad-small"><a href="/create" class="action cta">Create Team</a></div>
    </article>
    `: ''}

    ${until(promise, html`<h1>Loading...</h1>`)}
</section>`

const teamTemplate = (team) => html`
<article class="layout">
        <img src="${team.logoUrl}" class="team-logo left-col">
        <div class="tm-preview">
            <h2>${team.name}</h2>
            <p>${team.description}</p>
            <span class="details">${team.members.length} Members</span>
            <div><a href="/details/${team._id}" class="action">See details</a></div>
        </div>
    </article>
`

async function getTeams(ctx) {

    // const [items, members] = await Promise.all([getAllTeams(), getAllMembers()]);
    // items.map(t => t.members = members.filter(m => m.teamId == t._id));

    return ctx.teamMembers.map(teamTemplate);
}