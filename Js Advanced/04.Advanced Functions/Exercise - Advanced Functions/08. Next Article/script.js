function getArticleGenerator(articles) {
    
    let parent = document.getElementById('content');

    return function inner() {

        if (articles.length == 0) {
            return;
        }

        let firstArticle = articles.shift()

        let createArt = document.createElement('article');
        createArt.textContent = firstArticle
        parent.appendChild(createArt);
       
    }

}

