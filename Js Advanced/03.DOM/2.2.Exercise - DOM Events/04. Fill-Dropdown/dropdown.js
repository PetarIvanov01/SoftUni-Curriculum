function addItem() {

    let textInput = document.getElementById('newItemText').value;
    let valueInput = document.getElementById('newItemValue').value;
    let menu = document.getElementById('menu')

    let option = document.createElement('option');

    option.value = valueInput;
    option.text = textInput;

    menu.appendChild(option)
    
    document.getElementById('newItemText').value = ''
    document.getElementById('newItemValue').value = ''

}