function extract(string) {

    let text = document.getElementById(string).textContent;
    let pattern = /\(([^)]+)\)/g
    let arr = []

    let command = pattern.exec(text)

    while (command) {
        arr.push(command[1])
        
        command = pattern.exec(text)
    }
    return arr.join('; ');

}
let text = extract("content");