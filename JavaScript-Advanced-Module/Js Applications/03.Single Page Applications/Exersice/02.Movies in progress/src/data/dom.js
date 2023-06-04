export function createMovie(movie) {
    let element = document.createElement('div')
    element.className = 'card mb-4';

    element.innerHTML = `
    <img class="card-img-top" src="${movie.img}"
            alt="Card image cap" width="400">
        <div class="card-body">
            <h4 class="card-title">${movie.title}</h4>
        </div>
        <div class="card-footer">
            <a href="#/details/6lOxMFSMkML09wux6sAF">
                <button type="button" id="${movie._id}" class="btn btn-info">Details</button>
            </a>
        </div>
    `
    return element
}