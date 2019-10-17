/* eslint-disable semi */
/* eslint-disable space-before-function-paren */

export const handleDesktopNav = (newIndex, desktopNav, prevSlideInd) => {
  desktopNav[prevSlideInd].classList.remove('active');
  desktopNav[newIndex].classList.add('active');
}