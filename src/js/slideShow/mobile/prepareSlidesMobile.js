/* eslint-disable semi */
/* eslint-disable space-before-function-paren */

export const prepareSlidesMobile = (newSlideInd, slides) => {
  const nextFromRightInd = (newSlideInd + 1) > 6 ? 0 : (newSlideInd + 1);
  const nextFromLeftInd = (newSlideInd - 1) < 0 ? 6 : (newSlideInd - 1);
  const nextFromRight = slides[nextFromRightInd];
  const nextFromLeft = slides[nextFromLeftInd];
  
  // if next right slide is from the left - move it to right
  if (nextFromRight.classList[1] === 'left-move') {
    nextFromRight.classList.add('transition-off');
    nextFromRight.classList.remove('left-move');
  }
  // if next left slide is from the right - move it to left
  if (nextFromLeft.classList[1] !== 'left-move') {
    nextFromLeft.classList.add('transition-off');
    nextFromLeft.classList.add('left-move');
  }
  
  setTimeout(() => {
    nextFromRight.classList.remove('transition-off');
    nextFromLeft.classList.remove('transition-off');
  }, 1000);
};
