// const Macy = require("macy");
/*
Trapping tabKey inside open menu
*/
const hamburgerMenu = document.querySelector('.hamburger-menu');
const menu = document.querySelector('.menu');
const main = document.querySelector('main');
const hideWhenMenuOpen = [...document.querySelectorAll('main a, main button, footer a, footer button')];

const trapTabKey = () => {
    if (menu.getAttribute('aria-hidden') == 'true') {
        hideWhenMenuOpen.forEach(elem => elem.setAttribute('tabindex', -1));
        menu.setAttribute('aria-hidden', 'false');
    } else {
        hideWhenMenuOpen.forEach(elem => elem.setAttribute('tabindex', 0));
        menu.setAttribute('aria-hidden', 'true');
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

/*
Macy - making collage in work section
// */
// const macyTetiana = Macy({
//     container: '#works-tetiana',
//     margin: 2,
//     columns: 3
// });
