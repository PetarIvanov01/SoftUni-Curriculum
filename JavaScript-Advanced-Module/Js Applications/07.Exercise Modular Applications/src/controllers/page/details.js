import { approveByOwner, becomeMembReq, cancelMembReq, getAllTeamMembers, getTeamDetails } from "../../service/api-cals.js";
import { html, until } from "../../util.js"

let context;
export function detailsController(ctx) {

    context = ctx;
    ctx.render(template(getDetails()));

}

const template = (promise) => html`
 <section id="team-home">
                
                    ${until(promise, html`<h1>Loading...</h1>`)}
                
            </section>`


const detailsTemplate = (item) => html`
            <article class="layout">
                    <img src="${item.logoUrl}" class="team-logo left-col">
                    <div class="tm-preview">
                        <h2>${item.name}</h2>
                        <p>Gotta catch 'em all!</p>
                        <span class="details">${item.memberCount.length} Members</span>
                        <!-- Edit and Join -->
                        <div>
                            ${item.user ?
        html` ${item.owner ? html`<a href="/edit/${item._id}" class="action">Edit team</a>` : notAMember(item)}
                            `: ''}
                        </div>
                    </div>
                    <!-- Change  -->
                    <div class="pad-large">
                        <h3>Members</h3>
                        <ul class="tm-members">
                            ${item.user ?
        html`${item.owner ? item.memberCount.map(loadMemebrsForOwner) : item.memberCount.map(loadMembersForGuest)}`
        : item.memberCount.map(loadMembersForGuest)}
                        </ul>
                    </div>

                    ${item.user ? html`${item.owner ? html`<div class="pad-large">
                        <h3>Membership Requests</h3>
                        <ul class="tm-members">
                            ${item.pendindMemb.map(loadMembershipRequest)}
                        </ul>
                    </div>`: ''}` : ''}
                    
            </article>

`

async function getDetails() {
    try {
        const id = context.params.id;
        const details = await getTeamDetails(id);
        const teamMembers = await getAllTeamMembers(id);

        if (context.user) {
            details.owner = context.user.id == details._ownerId;
        }

        details.user = context.user || undefined;
        details.team = teamMembers;

        const memberCount = details.team.filter(el => el.status == 'member');
        const pendindMemb = details.team.filter(el => el.status == 'pending');

        details.memberCount = memberCount;
        details.pendindMemb = pendindMemb;

        return detailsTemplate(details);

    } catch (error) {
        throw error;
    }
}

function loadMembersForGuest(member) {
    return html`<li>${member.user.username}</li>`;
}

function loadMemebrsForOwner(member) {
    if (member.user._id == context.user.id) {
        return
    }
    return html`<li>${member.user.username}<a @click=${onCancelReq.bind(null, member)} href="#" class="tm-control action">Remove from team</a></li>`;
}

function loadMembershipRequest(member) {
    if (member.user._id == context.user.id) {
        return
    }
    return html`
    <li>
        ${member.user.username}<a @click=${onApprove.bind(null, member)} href="#" class="tm-control action">Approve</a>
        <a href="#" @click=${onCancelReq.bind(null, member)} class="tm-control action">Decline</a>
    </li>`
}

function notAMember(team) {

    const user = team.team.find(el => el._ownerId == context.user.id);

    if (!user) {
        return html`<a @click=${onJoin.bind(null, team)} href="#" class="action">Join team</a>`
    }
    else if (user && user.status == 'pending') {
        return html`Membership pending. <a @click=${onCancelReq.bind(null, user)} href="#">Cancel request</a>`
    }
    else if (user && user.status == 'member') {
        return html`<a @click=${onCancelReq.bind(null, user)} href="#" class="action invert">Leave team</a>`
    }
}

async function onJoin(team, event) {
    event.preventDefault();
    try {
        await becomeMembReq(team._id);
        context.page.redirect(`/details/${team._id}`)

    } catch (error) {

    }
}

async function onCancelReq(user, event) {
    event.preventDefault();
    try {
        await cancelMembReq(user._id)
        context.page.redirect(`/details/${context.params.id}`)

    } catch (error) {

    }
}

async function onApprove(member, event) {
    try {
        event.preventDefault();
        member.status = 'member';
        await approveByOwner(member._id, member);
        context.page.redirect(`/details/${context.params.id}`)

    } catch (error) {
        throw error
    }

}