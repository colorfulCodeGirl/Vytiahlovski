/* eslint-disable semi */
/* eslint-disable space-before-function-paren */
import moveSlides from '../moveSlides';
import prepareSlidesDesktop from './prepareSlidesDesktop';
import handleDesktopNav from './handleDesktopNav';

export const changeSlideDesktop = (e, commonData) => {
  let { slides, prevSlideInd, desktopNav, userClickedAt } = commonData;
  const prevSlide = slides[prevSlideInd];
  const newIndex = parseInt(e.target.dataset.index);
  const newSlide = slides[newIndex];
  handleDesktopNav(newIndex, desktopNav, prevSlideInd);
  moveSlides(prevSlide, newSlide, 'right');
  setTimeout(() => prepareSlidesDesktop(prevSlide), 2000);
  prevSlideInd = newIndex;
  userClickedAt = new Date().getTime();
}