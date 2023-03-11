
function addItem() {
    
    let parent = document.getElementById('items');
    let input = document.getElementById('newItemText');
    let value = input.value;
    
    if (value.length === 0)  return;
        
    let li = document.createElement('li');
    li.textContent = value;
    parent.appendChild(li);

    input.value = '';

    let remove = document.createElement('a');
    let linkTExt = document.createTextNode('[Delete]');

    remove.appendChild(linkTExt);
    remove.href = '#';

    li.appendChild(remove);

    remove.addEventListener('click' ,function deleted() {

        li.remove()

    })
}