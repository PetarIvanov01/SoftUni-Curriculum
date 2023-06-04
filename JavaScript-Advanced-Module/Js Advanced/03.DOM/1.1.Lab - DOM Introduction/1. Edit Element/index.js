function edit(ref,match, rep) {

    debugger;
    const text = ref.textContent;
    const matcher = new RegExp(match,'g');
    let replacer = text.replace(matcher,rep);
    ref.textContent = replacer; 

}

let element = document.getElementById('change-me');
edit(element,'%[\\w\\W]+%', 'Peter')