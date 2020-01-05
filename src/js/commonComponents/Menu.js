const menu = document.querySelector('.menu');
const toggler = document.querySelector('.menu-toggler');
let navigateToSection = false;

// trap tab key inside menu when open or block it from going to menu items when closed
const trapTabKey = () => {
  const menuLinks = menu.querySelectorAll('a');
  const content = document.querySelector('.l-content');
  const bodyLinks = content.querySelectorAll('a, button, input');
  const isMenuHidden = menu.getAttribute('aria-hidden');

  const setTabindex = (list, value) => {
    list.forEach((elem) => {
      elem.setAttribute('tabindex', value);
    });
  };

  if (isMenuHidden === 'true') {
    setTabindex(bodyLinks, -1);
    menu.setAttribute('aria-hidden', 'false');
    setTabindex(menuLinks, 0);
  } else {
    setTabindex(bodyLinks, 0);
    menu.setAttribute('aria-hidden', 'true');
    setTabindex(menuLinks, -1);
  }
};

const toggleMenu = (e) => {
  // when menu toggler or background was clicked
  // prevent default behaviour and close/open menu
  // when nav element was clicked, also prevent default and close menu
  // and then generate click event and navigate to section by default
  if (!navigateToSection) {
    e.preventDefault();
    toggler.classList.toggle('menu-toggler--close');
    toggler.classList.toggle('menu-toggler--active');
    menu.classList.toggle('menu--active');
    trapTabKey();
    const isNavElement = e.target.dataset.type === 'nav';
    if (isNavElement) {
      navigateToSection = true;
      menu.addEventListener(
        'transitionend',
        () => {
          e.target.click();
        },
        { once: true },
      );
    }
  } else {
    navigateToSection = false;
  }
};

export default function initMenu() {
  menu.addEventListener('click', toggleMenu);
  toggler.addEventListener('click', toggleMenu);
}
