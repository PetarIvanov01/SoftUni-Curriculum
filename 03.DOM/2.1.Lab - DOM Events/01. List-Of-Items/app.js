
let parent = document.getElementById('items');

function addItem() {
    
    let input = document.getElementById('newItemText');
    let value = input.value;

    let li = document.createElement('li');
    li.textContent = value;

    parent.appendChild(li);

    input.value = '';
}