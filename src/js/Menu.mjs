class Menu {
  constructor(menuSelector, togglerSelector) {
    this.menu = document.querySelector(menuSelector);
    this.toggler = document.querySelector(togglerSelector);
  }

  trapTabKey() {
    const menuLinks = this.menu.querySelectorAll('a');
    const bodyLinks = document.querySelectorAll(
      'main a, main button, footer a, footer button',
    );
    if (this.menu.getAttribute('aria-hidden') === 'true') {
      bodyLinks.forEach((elem) => elem.setAttribute('tabindex', -1));
      this.menu.setAttribute('aria-hidden', 'false');
      menuLinks.forEach((elem) => elem.setAttribute('tabindex', 0));
    } else {
      bodyLinks.forEach((elem) => elem.setAttribute('tabindex', 0));
      this.menu.setAttribute('aria-hidden', 'true');
      menuLinks.forEach((elem) => elem.setAttribute('tabindex', -1));
    }
  }

  scrollToSection(e, targetedSectionId) {
    if (e.target.className === this.menu.className) {
      const scrollTarget = document.querySelector(`#${targetedSectionId}`);
      scrollTarget.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }

  toggleMenu(e) {
    e.preventDefault();
    this.toggler.classList.toggle('close');
    this.menu.classList.toggle('active');
    this.trapTabKey();

    const targetedSectionId = e.target.classList[1];
    if (e.target.className.includes('nav-elem')) {
      this.menu.addEventListener('transitionend', (ev) => {
        this.scrollToSection(ev, targetedSectionId);
      });
    }
  }

  init() {
    this.menu.addEventListener('click', this.toggleMenu.bind(this));
    this.toggler.addEventListener('click', this.toggleMenu.bind(this));
  }
}

export default Menu;
