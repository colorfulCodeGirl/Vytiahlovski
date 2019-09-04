/*
hiding hamburger menu from keybord users when menu is open.
*/

const hamburgerMenu = document.querySelector('.hamburger-menu');
hamburgerMenu.addEventListener('click', () => hamburgerMenu.setAttribute('tabindex', -1));