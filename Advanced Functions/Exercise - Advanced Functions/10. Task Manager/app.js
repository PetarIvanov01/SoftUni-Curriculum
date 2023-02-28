function solve() {

    let input = {
        fieldOne: document.getElementById('task'),
        fieldTwo: document.getElementById('description'),
        fieldThr: document.getElementById('date'),
    }

    let [_,openSection,inProgressSec,completeSec] = Array.from(document.querySelectorAll('section')).map(el=>el.children[1]);
    document.getElementById('add').addEventListener('click', add)

    function add(event) {

        event.preventDefault()

        if (input.fieldOne.value == '' || input.fieldTwo.value == '' || input.fieldThr.value == '') {
            return;
        }
        const article = document.createElement('article');
        article.appendChild(createElements('h3',input.fieldOne.value));
        article.appendChild(createElements('p',`Description: ${input.fieldTwo.value}`));
        article.appendChild(createElements('p',`Due date: ${input.fieldThr.value}`));
        const div = createElements('div','','flex');
       
        const startBtn = createElements('button','Start','green');
        const deleteBtn = createElements('button','Delete','red');
        const finishBtn = createElements('button','Finish','orange')

        div.appendChild(startBtn);
        div.appendChild(deleteBtn);

        startBtn.addEventListener('click',start)
        deleteBtn.addEventListener('click',deleteD)
        finishBtn.addEventListener('click',finish)

        article.appendChild(div);

        openSection.appendChild(article);

        Object.values(input).forEach(i => i.value = '')

        function start() {

            inProgressSec.appendChild(article);
            startBtn.remove()
            div.appendChild(finishBtn);

        }
        function deleteD() {

            article.remove();
            
        }
        function finish() {

            completeSec.appendChild(article)
            finishBtn.remove()
            deleteBtn.remove()
            div.remove()
            
        }
    }  

    function createElements(type,content,className) {
        let element = document.createElement(`${type}`);
        element.textContent = content;
        if (className) {
            element.className = className;
        }
        return element
    }
}



        //let startBtn = document.createElement('button')
        // let deleteBtn = document.createElement('button')

        // let divF = sections[1].querySelectorAll('div')[1];
        // let article = document.createElement('article');
        // let newDiv = document.createElement('div')
        // newDiv.setAttribute('class', 'flex');

        // startBtn.textContent = 'Start';
        // startBtn.setAttribute('class', 'green')

        // deleteBtn.textContent = 'Delete';
        // deleteBtn.setAttribute('class', 'red');

        // newDiv.appendChild(startBtn)
        // newDiv.appendChild(deleteBtn)
       
        // article.appendChild(newDiv)
        // divF.appendChild(article);