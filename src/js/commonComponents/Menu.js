const menu = document.querySelector('.menu');
const toggler = document.querySelector('.menu-toggler');
let canScrollToId = false;

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
  if (!canScrollToId) {
    e.preventDefault();
    toggler.classList.toggle('menu-toggler--close');
    menu.classList.toggle('menu--active');
    trapTabKey();
    const isNavElement = e.target.dataset.type === 'nav';
    if (isNavElement) {
      canScrollToId = true;
      menu.addEventListener(
        'transitionend',
        () => {
          e.target.click();
        },
        { once: true },
      );
    }
  } else {
    canScrollToId = false;
  }
};

export default function initMenu() {
  menu.addEventListener('click', toggleMenu.bind(this));
  toggler.addEventListener('click', toggleMenu.bind(this));
}
