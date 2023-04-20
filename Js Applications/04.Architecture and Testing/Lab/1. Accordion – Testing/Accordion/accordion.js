function solution() {

    async function bar() {

        const request = await fetch('http://localhost:3030/jsonstore/advanced/articles/list');
        const data = await request.json();
        const section = document.getElementById('main');

        for (const el of data) {
            const id = el._id;

            const moreContentReq = await fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${id}`)
            const moreContentData = await moreContentReq.json();
            const _title = moreContentData.title;
            const content = moreContentData.content;

            const title = el.title;
            const divParent = createEl('div', '', { 'class': 'accordion' });
            const divIn = createEl('div', '', { 'class': 'head' });
            const span = createEl('span', title);
            const btn = createEl('button', 'More', { 'class': 'button', 'id': id });
            const divMoreContent = createEl('div', '', { 'class': 'extra' });
            divMoreContent.style.display = 'none';
            const p = createEl('p', content);

            section.appendChild(divParent);
            divParent.appendChild(divIn);
            divIn.appendChild(span);
            divIn.appendChild(btn);
            divParent.appendChild(divMoreContent);
            divMoreContent.appendChild(p);

            btn.addEventListener('click', toggle.bind(null,divMoreContent));
        }

    }

    function toggle(div, event) {

        let btn = event.target;

        if (btn.textContent === 'More') {
            btn.textContent = 'Less';
            div.style.display = 'block';
        }
        else if (btn.textContent === 'Less') {
            btn.textContent = 'More'
            div.style.display = 'none';
        }

    }
    bar();

    function createEl(type, content, atr) {
        let el = document.createElement(type);
        if (content) {
            el.textContent = content;
        }
        for (let prop in atr) {

            if (prop === 'class') {
                el.classList.add(atr[prop]);
            }
            else {
                el[prop] = atr[prop];
            }
        }
        return el
    }
}
solution()
