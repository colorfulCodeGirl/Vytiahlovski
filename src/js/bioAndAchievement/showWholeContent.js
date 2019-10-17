/* eslint-disable space-before-function-paren */
/* eslint-disable semi */

export function showWholeContent() {
  const buttons = document.querySelectorAll('.biography button, .achievements .button');

  const showMore = (e) => {
    const section = e.target.classList[1];
    const person = e.target.classList[2];
    const fullText = document.querySelector(`.${section} .${person} .full-text`);
    const fullTextClasses = Array.from(fullText.classList);
    const currentButton = e.target;
    const isActive = fullTextClasses.find(el => el === 'active');
    if (isActive) {
      currentButton.innerHTML = 'more...';
      currentButton.setAttribute('aria-label', 'Whole Tetniana\'s biography');
    } else {
      currentButton.innerHTML = 'less...';
      currentButton.setAttribute('aria-label', 'Hide whole Tetniana\'s biography');
    }
    fullText.classList.toggle('active');
  }

  buttons.forEach(btn => btn.addEventListener('click', showMore));
};
