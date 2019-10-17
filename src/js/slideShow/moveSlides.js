/* eslint-disable semi */
/* eslint-disable space-before-function-paren */
export const moveSlides = (prevSlide, newSlide, direction) => {
  if (direction === 'right') {
    prevSlide.classList.add('left-move');
    prevSlide.classList.remove('active');
    newSlide.classList.add('active');
  } else {
    prevSlide.classList.remove('active');
    newSlide.classList.add('active');
    newSlide.classList.remove('left-move');
  }
}
