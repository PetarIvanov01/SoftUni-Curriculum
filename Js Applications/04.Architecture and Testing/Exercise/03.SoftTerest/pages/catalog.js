import { getAllIdeas } from "../data/data.js"

const section = document.getElementById('dashboard-holder')

export async function showCatalog(context) {
    context.showView(section)
    const ideas = await getAllIdeas();
    if (ideas.length > 0) {
        section.replaceChildren(...ideas.map(createIdeas));
    }
    else {
        section.innerHTML = '<h1>No ideas yet! Be the first one :)</h1>'
    }
}
function createIdeas(idea) {

    const element = document.createElement('div');
    element.className = 'card overflow-hidden current-card details';
    element.style.width = '20rem';
    element.style.height = '18rem';

    element.innerHTML = `
    <div class="card-body">
               <p class="card-text">${idea.title}</p>
    </div>
             <img class="card-image" src="${idea.img}" alt="Card image cap">
             <a class="btn" data-id="${idea._id}" href="">Details</a>
    `
    return element
}
