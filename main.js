// const Macy = require("macy");
/*
Trapping tabKey inside open menu
*/
const hamburgerMenu = document.querySelector('.hamburger-menu');
const menu = document.querySelector('nav');
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

const scrollToSection = (e) => {
    if (e.target.classList[1]) {
        const scrollTargetClass = `#${e.target.classList[1]}`;
        const scrollTarget = document.querySelector(scrollTargetClass);

        scrollTarget.scrollIntoView({
            block: 'center',
            behavior: 'smooth'
        });
    }
};

const openCloseMenu = (e) => {
    e.preventDefault();
    hamburgerMenu.classList.toggle('close');
    menu.classList.toggle('active');
    trapTabKey();
    scrollToSection(e);
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
