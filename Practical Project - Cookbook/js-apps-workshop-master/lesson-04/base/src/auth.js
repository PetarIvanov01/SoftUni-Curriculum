export function checked() {

    const token = sessionStorage.getItem('accesToken');

    if (token != null) {
        document.getElementById('user').style.display = 'inline-block';
    }
    else {
        document.getElementById('guest').style.display = 'inline-block';
    }

}