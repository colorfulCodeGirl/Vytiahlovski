/* eslint-disable semi */
/* eslint-disable space-before-function-paren */
import prepareSlidesDesktop from './desktop/prepareSlidesDesktop';
import handleDesktopNav from './desktop/handleDesktopNav';
import prepareSlidesMobile from './mobile/prepareSlidesMobile';
import moveSlides from './moveSlides';

const autoPlay = (commonData) => {
  let { slides, userClickedAt, prevSlideInd, displayType } = commonData;
  const prevSlide = slides[prevSlideInd];
  const currentTime = new Date().getTime();
  const timePassed = currentTime - userClickedAt;
  if (timePassed >= 4000) {
    const newIndex = (prevSlideInd !== 6) ? (prevSlideInd + 1) : 0;
    const newSlide = slides[newIndex];
    if (newIndex === (slides.length - 2) && !displayType.matches) {
      prepareSlidesDesktop(slides[slides.length - 1]);
    }
    moveSlides(prevSlide, newSlide, 'right');
    // if we are on desktop handle navigation animation
    if (displayType.matches) {
      handleDesktopNav(newIndex);
      setTimeout(() => prepareSlidesDesktop(prevSlide), 2000);
    } else {
      prepareSlidesMobile(newIndex, slides);
    }
    prevSlideInd = newIndex;
  }
}

/* ------------------Stop offscreen animation-------------- */
export const initAutoPlay = () => {
  const intersectOptions = {
    root: document.querySelector('.ss-container'),
    threshold: 0.3
  };
  let autoChange;
  let isAnimating = false;

  function enableDisableSlideAnimation() {
    if (isAnimating) {
      clearInterval(autoChange);
    } else {
      autoChange = setInterval(autoPlay, 4000);
    }
    isAnimating = !isAnimating;
  }

  const observer = new IntersectionObserver(enableDisableSlideAnimation, intersectOptions);
  const target = document.querySelector('.first-screen-gallery');
  observer.observe(target);
};
