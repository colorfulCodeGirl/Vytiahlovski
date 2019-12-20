class Menu {
  constructor(menuSelector, togglerSelector) {
    this.menu = document.querySelector(menuSelector);
    this.toggler = document.querySelector(togglerSelector);
    this.canScrollToId = false;
  }

  trapTabKey() {
    const menuLinks = this.menu.querySelectorAll('a');
    const content = document.querySelector('.l-content');
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
    if (!this.canScrollToId) {
      e.preventDefault();
      this.toggler.classList.toggle('menu-toggler--close');
      this.menu.classList.toggle('menu--active');
      this.trapTabKey();
      const isNavElement = e.target.dataset.type === 'nav';
      if (isNavElement) {
        this.canScrollToId = true;
        this.menu.addEventListener(
          'transitionend',
          () => {
            e.target.click();
          },
          { once: true },
        );
      }
    } else {
      this.canScrollToId = false;
    }
  }

  init() {
    this.menu.addEventListener('click', this.toggleMenu.bind(this));
    this.toggler.addEventListener('click', this.toggleMenu.bind(this));
  }
}

export default Menu;
