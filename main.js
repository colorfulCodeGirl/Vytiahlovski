/*
Traping tabKey incide open menu
*/
const hamburgerMenu = document.querySelector('.hamburger-menu');
const menu = document.querySelector('nav');
const main = document.querySelector('main');
const footer = document.querySelector('footer');
const hideWhenMenuOpen = [main, footer, hamburgerMenu];
let menuTogglingElements = menu.querySelectorAll('a');
menuTogglingElements = Array.prototype.slice.call(menuTogglingElements);
menuTogglingElements.push(hamburgerMenu);

const trapTabKey = () => {
    if (menu.getAttribute('aria-hidden') == 'true') {
        setTimeout(() => hideWhenMenuOpen.forEach(elem => elem.classList.add('hidden')), 1000);
        menu.setAttribute('aria-hidden', 'false');
    } else {
        hideWhenMenuOpen.forEach(elem => elem.classList.remove('hidden'));
        menu.setAttribute('aria-hidden', 'true');
    }
};

menuTogglingElements.forEach(elem => elem.addEventListener('click', trapTabKey));