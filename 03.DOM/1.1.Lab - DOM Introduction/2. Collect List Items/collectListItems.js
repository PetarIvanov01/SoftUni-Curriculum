function extractText() {

    let itemNodes = document.querySelectorAll("ul#items li");
    let textarea = document.querySelector("#result")

    for (let items of itemNodes) {

        textarea.value += items.textContent + "\n"
        
    } 
}




