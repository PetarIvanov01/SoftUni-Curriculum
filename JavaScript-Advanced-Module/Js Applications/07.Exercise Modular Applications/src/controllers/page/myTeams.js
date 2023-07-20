import { html, until } from "../../util.js"
export function myTeamController(ctx) {

    ctx.render(template(getMyTeams(ctx)));


}

const template = (promise) => html`
<section id="my-teams">

<article class="pad-med">
    <h1>My Teams</h1>
</article>

${until(promise, html`<h1>Loading...</h1>`)}


</section>
`

const teamTemplate = (item) => html`

            <article class="layout">
                    <img src="${item.logoUrl}" class="team-logo left-col">
                    <div class="tm-preview">
                        <h2>${item.name}</h2>
                        <p>${item.description}</p>
                        <span class="details">${item.members.length} Members</span>
                        <div><a href="/details/${item._id}" class="action">See details</a></div>
                    </div>
             </article>
`
const noTeams = () => html` 
<article class="layout narrow">
                <div class="pad-med">
                    <p>You are not a member of any team yet.</p>
                    <p><a href="/catalog">Browse all teams</a> to join one, or use the button bellow to cerate your own
                        team.</p>
                </div>
                <div class=""><a href="/create" class="action cta">Create Team</a></div>
            </article>
`
function getMyTeams(ctx) {
    try {
        const teams = ctx.teamMembers;
        const user = ctx.user.id;

        const myTeams = teams.filter(team => team.members.find(el => el._ownerId == user));

        return myTeams.length ? myTeams.map(teamTemplate) : noTeams();

    } catch (error) {
        console.error(error);
    }
}