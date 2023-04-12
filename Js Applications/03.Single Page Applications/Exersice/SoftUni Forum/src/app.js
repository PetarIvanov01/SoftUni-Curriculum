import { showHome } from './home.js'

const navigationForHome = document.querySelector('#homeLink');
navigationForHome.addEventListener('click',showHome)
//Start application
showHome()