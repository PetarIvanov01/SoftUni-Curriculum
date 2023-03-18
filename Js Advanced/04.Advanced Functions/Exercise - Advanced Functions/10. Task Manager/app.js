function solve() {

    let input = {
        fieldOne: document.getElementById('task'),
        fieldTwo: document.getElementById('description'),
        fieldThr: document.getElementById('date'),
    }

    let [_, openSection, inProgressSec, completeSec] = Array.from(document.querySelectorAll('section')).map(el => el.children[1]);
    document.getElementById('add').addEventListener('click', add)

    function add(event) {

        event.preventDefault()

        if (!input.fieldOne.value || !input.fieldTwo.value || !input.fieldThr.value) {
            return;
        }
        const article = document.createElement('article');
        article.appendChild(createElements('h3', input.fieldOne.value));
        article.appendChild(createElements('p', `Description: ${input.fieldTwo.value}`));
        article.appendChild(createElements('p', `Due Date: ${input.fieldThr.value}`));
        const div = createElements('div', undefined, 'flex');

        const startBtn = createElements('button', 'Start', 'green');
        const deleteBtn = createElements('button', 'Delete', 'red');


        div.appendChild(startBtn);
        div.appendChild(deleteBtn);

        startBtn.addEventListener('click', start);
        deleteBtn.addEventListener('click', deleteD);

        article.appendChild(div);

        openSection.appendChild(article);

        Object.values(input).forEach(i => i.value = '')

        function deleteD() {
            article.remove();
        }

        function start() {

            inProgressSec.appendChild(article);
            const finishBtn = createElements('button', 'Finish', 'orange');
            startBtn.remove()
            div.appendChild(finishBtn);

            finishBtn.addEventListener('click', () => {

                completeSec.appendChild(article)
                finishBtn.remove()
                deleteBtn.remove()
                div.remove()

            })
        }
    }

    function createElements(type, content, className) {

        let element = document.createElement(type);

        element.textContent = content;

        if (className) {
            element.className = className;
        }
        return element
    }
}
