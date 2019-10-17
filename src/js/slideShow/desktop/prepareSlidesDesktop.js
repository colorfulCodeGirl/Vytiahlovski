/* eslint-disable semi */
/* eslint-disable space-before-function-paren */
export const prepareSlidesDesktop = (prevSlide) => {
    prevSlide.classList.add('transition-off');
    prevSlide.classList.remove('left-move');
    setTimeout(() => prevSlide.classList.remove('transition-off'), 100);
  }