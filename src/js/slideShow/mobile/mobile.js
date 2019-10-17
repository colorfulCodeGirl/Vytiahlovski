/* eslint-disable semi */
/* eslint-disable space-before-function-paren */
import moveSlides from '../moveSlides';
import prepareSlidesMobile from './prepareSlidesMobile';

const handleDirection = (e, prevSlideInd) => {
  if (e.target.classList[0] === 'mobile') {
    return e.target.classList[2];
  } else {
    return (e.target.dataset.index > prevSlideInd) ? 'right' : 'left';
  }
}

const chooseNewIndex = (direction, prevSlideInd) => {
  if (direction === 'right') {
    const newInd = (prevSlideInd !== 6) ? (prevSlideInd + 1) : 0;
    return newInd;
  } else {
    const newInd = (prevSlideInd !== 0) ? (prevSlideInd - 1) : 6;
    return newInd;
  }
}

export const changeSlideMobile = (e, commonData) => {
  let { slides, prevSlideInd, userClickedAt } = commonData;
  const prevSlide = slides[prevSlideInd];
  const direction = handleDirection(e, prevSlideInd);
  const newSlideInd = chooseNewIndex(direction, prevSlideInd);
  const newSlide = slides[newSlideInd];
  moveSlides(prevSlide, newSlide, direction);
  prepareSlidesMobile(newSlideInd, slides);
  prevSlideInd = parseInt(newSlide.dataset.index);
  userClickedAt = new Date().getTime();
}
