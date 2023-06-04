function loadRepos() {
	const username = document.getElementById('username').value;
	const repos = document.getElementById('repos');
	repos.textContent = ''

	fetch(`https://api.github.com/users/${username}/repos`)
		.then((response) => {
			if (!response.ok) {
				throw new Error(`Error: ${response.status} found!`)
			}
			return response.json()

		}
		).then((data) => {
			for (const repo of data) {

				const listItems = document.createElement('li');
				const link = document.createElement('a');

				link.href = repo.html_url;
				link.textContent = repo.full_name;

				listItems.appendChild(link);
				repos.appendChild(listItems)
			}
		}).catch((error) => {
			const listItem = document.createElement("li");
			listItem.textContent = error.message;
			repos.appendChild(listItem);
		})

}
