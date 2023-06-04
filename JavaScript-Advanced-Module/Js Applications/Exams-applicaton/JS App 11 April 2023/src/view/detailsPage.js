import { deleteData, getCount, getCountForUser, getDetails, goingTo } from "../data/data.js"
import { getUserData } from "../data/user.js"
import { html, until } from "../packs.js"

export function showDetails(ctx) {

    const id = ctx.params.id
    update(id, ctx, onClick.bind(null, ctx, id))

    function update(id, ctx, onClick) {

        ctx.render(detailCatalog(getItem(id, ctx, onClick)))

    }
    ctx.update = update;


    async function onClick(ctx, id) {

        const alert = confirm('Are you sure you want to delete it!')
        if (alert) {
            await deleteData(id);
            ctx.page.redirect('/catalog')
        }
    };

}

const detailCatalog = (promise) => html`
<section id="details">
    ${until(promise, html`<p>Loading..</p>`)}
</section>`


async function getItem(id, ctx, onClick) {

    const user = getUserData();
    const item = await getDetails(id);
    let totalCount;
    let didUserGo;

    totalCount = await getCount(id)
    didUserGo = await getCountForUser(id, user.id);
    const isOwner = user && item._ownerId == user.id

    async function goTo(event) {
        
        await goingTo({ id });
        totalCount = await getCount(id)
        didUserGo = await getCountForUser(id, user.id);

        ctx.render(detailCatalog(getItem(id, ctx, {})))
    }

    return createDetail(item, isOwner, user, id, onClick, totalCount, goTo, didUserGo)
}

const createDetail = (item, isOwner, user, id, onClick, totalCount, goTo, didUserGo) => html`
<div id="details-wrapper">
<img id="details-img" src=${item.imageUrl} alt="example1" />
 <p id="details-title">${item.name}</p>
  <p id="details-category">
Category: <span id="categories">${item.category}</span>
</p>
<p id="details-date">
Date:<span id="date">${item.date}</span></p>
<div id="info-wrapper">
<div id="details-description">
<span>${item.description}</span>
</div>

</div>

<h3>Going: <span id="go">${totalCount}</span> times.</h3>

<!--Edit and Delete are only for creator-->
<div id="action-buttons">
${isOwner ? html`<a href="/details/edit/${id}" id="edit-btn">Edit</a>
<a href="javascript:void(0)" @click=${onClick} id="delete-btn">Delete</a>` : null}
<!--Bonus - Only for logged-in users ( not authors )-->
${didUserGo ? null : (isOwner ? null : (user ? html`<a @click=${goTo} href="javascript:void(0)" id="go-btn">Going</a>` : null))}
</div>
</div>`

