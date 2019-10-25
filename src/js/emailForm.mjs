/* eslint-disable semi */
/* eslint-disable space-before-function-paren */

export function openMailFormMobile() {
  if (window.innerWidth < 600) {
    const btn = document.querySelector('.button.email-mobile');
    const emailForm = document.querySelector('.email');
    const overlay = document.querySelector('.form-overlay');
    const header = document.querySelector('.hamburger-menu');
    const closeBtn = document.querySelector('.email .close');
    const submitBtn = document.querySelector('.email .submit');

    const openCloseForm = (e) => {
      const isHamburger = e.target.className.includes('hamburger');

      if (isHamburger &&
                emailForm.classList.length === 1) return;

      emailForm.classList.toggle('active');
      overlay.classList.toggle('active');
    }

    btn.addEventListener('click', openCloseForm);
    header.addEventListener('click', openCloseForm);
    closeBtn.addEventListener('click', openCloseForm);
    submitBtn.addEventListener('click', openCloseForm);
  }
};
