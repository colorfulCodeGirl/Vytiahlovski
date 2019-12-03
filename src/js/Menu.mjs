class Menu {
  constructor(menuSelector, togglerSelector) {
    this.menu = document.querySelector(menuSelector);
    this.toggler = document.querySelector(togglerSelector);
  }

  trapTabKey() {
    const menuLinks = this.menu.querySelectorAll('a');
    const content = document.querySelector('.content');
    const bodyLinks = content.querySelectorAll('a, button, input');
    const isMenuHidden = this.menu.getAttribute('aria-hidden');

    const setTabindex = (list, value) => {
      list.forEach((elem) => {
        elem.setAttribute('tabindex', value);
      });
    };

    if (isMenuHidden === 'true') {
      setTabindex(bodyLinks, -1);
      this.menu.setAttribute('aria-hidden', 'false');
      setTabindex(menuLinks, 0);
    } else {
      setTabindex(bodyLinks, 0);
      this.menu.setAttribute('aria-hidden', 'true');
      setTabindex(menuLinks, -1);
    }
  }

  toggleMenu(e) {
    e.preventDefault();
    this.toggler.classList.toggle('close');
    this.menu.classList.toggle('active');
    this.trapTabKey();

    const targetedSectionId = e.target.dataset.target;
    const isNavElement = e.target.dataset.type === 'nav';

    const scrollToSection = (id) => {
      const scrollTarget = document.querySelector(`#${id}`);
      scrollTarget.scrollIntoView({
        behavior: 'smooth',
      });
    };

    if (isNavElement) {
      this.menu.addEventListener('transitionend', () => {
        scrollToSection(targetedSectionId);
      });
    }
  }

  init() {
    this.menu.addEventListener('click', this.toggleMenu.bind(this));
    this.toggler.addEventListener('click', this.toggleMenu.bind(this));
  }
}

export default Menu;
