/* eslint-disable space-before-function-paren */
/* eslint-disable semi */
function showWholeContent() {
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

function addContent() {
  if (window.innerWidth < 400) return;

  const shortText = document.querySelectorAll('.short-text');
  const fullText = document.querySelectorAll('.full-text');
  const buttons = document.querySelectorAll('.short-text .button');

  const appendP = () => {
    let parentPrev;
    let parentNew;
    for (let i = 0; i < shortText.length; i++) {
      if (i >= 2) {
        parentPrev = fullText[i].children[0];
        const children = Array.from(parentPrev.children).slice(0, 3);
        parentNew = shortText[i].children[1];
        children.forEach(child => parentNew.appendChild(child));
      } else {
        parentPrev = fullText[i];
        const child = Array.from(parentPrev.children).shift();
        parentNew = shortText[i];
        const place = buttons[i];
        parentNew.insertBefore(child, place);
      }
    }
  }
  if (window.innerWidth > 400) {
    appendP();
  }
  if (window.innerWidth > 650) {
    appendP();
  }
};

export function bioAndAchievement () {
  showWholeContent();
  addContent();
}