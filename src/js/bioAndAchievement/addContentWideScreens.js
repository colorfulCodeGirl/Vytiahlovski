/* eslint-disable space-before-function-paren */
/* eslint-disable semi */

export function addContentWideScreens() {
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
