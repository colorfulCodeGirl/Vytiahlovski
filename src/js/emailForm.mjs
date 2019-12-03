class EmailForm {
  constructor(selector) {
    this.section = document.querySelector(selector);
  }

  openMailForm() {
    const btn = this.section.querySelector('.email-form-toggler');
    const emailForm = this.section.querySelector('.email');
    const overlay = this.section.querySelector('.form-overlay');
    const header = document.querySelector('.menu-toggler');
    const closeBtn = emailForm.querySelector('.close');
    const submitBtn = emailForm.querySelector('.submit');

    const toggleForm = (e) => {
      const isMenu = e.target.className.includes('menu');

      /* don't open email form when clicking on menu toggler */
      if (isMenu && !emailForm.className.includes('active')) return;

      emailForm.classList.toggle('active');
      overlay.classList.toggle('active');
    };

    [btn, header, closeBtn, submitBtn].forEach((element) => {
      element.addEventListener('click', toggleForm);
    });
  }

  init() {
    if (document.body.clientWidth < 600) {
      this.openMailForm();
    }
  }
}

export default EmailForm;
