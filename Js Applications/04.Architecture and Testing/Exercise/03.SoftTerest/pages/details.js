import { deleteIdea, getDetails } from "../data/data.js";

const section = document.getElementById('detailsPage');


export async function showDetails(context, id) {

    const detailsData = await getDetails(id);
    context.showView(section);

    const user = JSON.parse(localStorage.getItem('user'));
    let isOwner = user && user._id == detailsData._ownerId;

    section.innerHTML = createDetails(detailsData, isOwner)
    if (isOwner) {

        section.querySelector('#deleteBtn').addEventListener('click', async (event) => {
            event.preventDefault();

            const choise = confirm('Are you sure you want to delete your idea?');

            if (choise) {
                await deleteIdea(id);
                context.goto('/catalog')
            }
        })

    }

}

function createDetails(data, isOwner) {

    let html = `
    <img class="det-img" src="${data.img}" />
    <div class="desc">
        <h2 class="display-5">${data.title}</h2>
        <p class="infoType">Description:</p>
        <p class="idea-description">${data.description}</p>
    </div>
   `;

    if (isOwner) {
        html += ` <div class="text-center">
        <a id="deleteBtn" class="btn detb" href="">Delete</a>
                  </div>`
    }
    return html;

}
