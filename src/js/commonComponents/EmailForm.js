class EmailForm {
  constructor(selector) {
    this.section = document.querySelector(selector);
  }

  openMailForm() {
    const btn = this.section.querySelector('.button--email-toggler');
    const emailForm = this.section.querySelector('.email-form');
    const overlay = this.section.querySelector('.overlay');
    const header = document.querySelector('.menu-toggler');
    const closeBtn = emailForm.querySelector('.button--close');
    const submitBtn = emailForm.querySelector('.button--submit');

    const toggleForm = (e) => {
      const isMenu = e.target.className.includes('menu');
      const isFormActive = emailForm.className.includes('active');

      /* don't open email form when clicking on menu toggler */
      if (isMenu && !isFormActive) return;

      emailForm.classList.toggle('email-form--active');
      overlay.classList.toggle('overlay--active');
    };

    [btn, header, closeBtn, submitBtn, overlay].forEach((element) => {
      element.addEventListener('click', toggleForm);
    });
  }

  init() {
    if (window.innerWidth > 600) return;
    this.openMailForm();
  }
}

export default EmailForm;
