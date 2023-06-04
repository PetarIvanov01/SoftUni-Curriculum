function toggle() {
    
    let type = document.querySelector('span').textContent;
    
    if (type === `More`) {
        document.querySelector('span').textContent = 'Less';
        document.getElementById('extra').style.display = 'block';
    }
    else if (type === 'Less') {

        document.querySelector('span').textContent = 'More';
        document.getElementById('extra').style.display = 'none';

    }
}