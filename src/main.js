// const Macy = require("macy");
/*
Trapping tabKey inside open menu
*/
const hamburgerMenu = document.querySelector('.hamburger-menu');
const menu = document.querySelector('.menu');
// const main = document.querySelector('main');

const trapTabKey = () => {
    const menuLinks = [...menu.querySelectorAll('a')];
    const hideWhenMenuOpen = [...document.querySelectorAll('main a, main button, footer a, footer button')];
    if (menu.getAttribute('aria-hidden') == 'true') {
        hideWhenMenuOpen.forEach(elem => elem.setAttribute('tabindex', -1));
        menu.setAttribute('aria-hidden', 'false');
        menuLinks.forEach(elem => elem.setAttribute('tabindex', 0));
    } else {
        hideWhenMenuOpen.forEach(elem => elem.setAttribute('tabindex', 0));
        menu.setAttribute('aria-hidden', 'true');
        menuLinks.forEach(elem => elem.setAttribute('tabindex', -1));
    }
};

const scrollToSection = (e, targetedSectionId) => {
    if (e.target.className === 'menu') {
        const scrollTarget = document.querySelector(`#${targetedSectionId}`);
        scrollTarget.scrollIntoView({
            // block: 'center',
            behavior: 'smooth'
        });
    }
};

const openCloseMenu = (e) => {
    e.preventDefault();
    hamburgerMenu.classList.toggle('close');
    menu.classList.toggle('active');
    trapTabKey();

    const targetedSectionId = e.target.classList[1];
    if (e.target.className.includes('nav-elem')) {
        menu.addEventListener('transitionend', (e) => {
            scrollToSection(e, targetedSectionId);
        });
    }
};

menu.addEventListener('click', openCloseMenu);
hamburgerMenu.addEventListener('click', openCloseMenu);

document.addEventListener('keyup', (e) => {
    console.log(e.target)});
