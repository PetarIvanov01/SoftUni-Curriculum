function html(body, css, title) {

    return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        ${css}
        <title>${title}</title>
    </head>

    ${body}
    
    </html>`
};
const nav = ` <nav>
<ul class="navigation">
    <li><a href="/">Home Page</a></li>
    <li><a href="/cats/add-breed">Add Breed</a></li>
    <li><a href="/cats/add-cat">Add Cat</a></li>
</ul>
</nav>`


module.exports = { html, nav }