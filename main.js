/*
Traping tabKey incide open menu
*/
const hamburgerMenu = document.querySelector('.hamburger-menu');
const closeMenu = document.querySelector('.close-menu');
const menuTogglingElements = [hamburgerMenu, closeMenu];

const trapTabKey = () => {
    const menu = document.querySelector('nav');
    const main = document.querySelector('main');
    const footer = document.querySelector('footer');
    const hideWhenMenuOpen = [main, footer];

    if (menu.hidden) {
        hideWhenMenuOpen.forEach((elem) => elem.hidden = true);
        hamburgerMenu.setAttribute('tabindex', -1);
        menu.hidden = false;
    } else {
        hideWhenMenuOpen.forEach((elem) => elem.hidden = false);
        hamburgerMenu.setAttribute('tabindex', 0);
        menu.hidden = true;
    }
};

menuTogglingElements.forEach((elem) => elem.addEventListener('click', trapTabKey));