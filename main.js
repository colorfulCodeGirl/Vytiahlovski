/*
Traping tabKey incide open menu
*/
const hamburgerMenu = document.querySelector('.hamburger-menu');
const menu = document.querySelector('nav');
const hideWhenMenuOpen = [...document.querySelectorAll('main a, main button, footer a, footer button, .hamburgerMenu')];

const trapTabKey = () => {
    if (menu.getAttribute('aria-hidden') == 'true') {
        hideWhenMenuOpen.forEach(elem => elem.setAttribute('tabindex', -1));
        menu.setAttribute('aria-hidden', 'false');
    } else {
        hideWhenMenuOpen.forEach(elem => elem.setAttribute('tabindex', 0));
        menu.setAttribute('aria-hidden', 'true');
    }
};

const openCloseMenu = () => {
    hamburgerMenu.classList.toggle('close');
    menu.classList.toggle('active');
    trapTabKey();
}

menu.addEventListener('click', openCloseMenu);
hamburgerMenu.addEventListener('click', openCloseMenu);

