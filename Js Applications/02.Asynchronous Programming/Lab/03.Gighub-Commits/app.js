function loadCommits() {

    const ul = document.getElementById('commits');

    const username = document.getElementById('username').value;
    const repository = document.getElementById('repo').value;

    let url = `https://api.github.com/repos/${username}/${repository}/commits`;

    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json()
        })
        .then((data) => {
            data.forEach(e => {
                let li = document.createElement('li');
                li.textContent = `${e.commit.author.name}: ${e.commit.message}`
                ul.appendChild(li)
            });
        })
        .catch((error) => {
            let li = document.createElement('li');
            li.textContent = `${error} (Not Found)`;
            ul.appendChild(li)
        })
}