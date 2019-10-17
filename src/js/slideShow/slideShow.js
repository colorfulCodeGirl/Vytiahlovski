/* eslint-disable semi */
/* eslint-disable space-before-function-paren */
import changeSlideMobile from './mobile/mobile';
import changeSlideDesktop from './desktop/desktop';
import initAutoPlay from './autoPlay';
import prepareSlidesDesktop from './desktop/prepareSlidesDesktop';

export function slideShow() {
  const commonData = {
    mobileNav: document.querySelectorAll('.arrow-block'),
    desktopNav: document.querySelectorAll('.desktop.slideshow-button'),
    prevSlideInd: parseInt(document.querySelector('.slide-show .active').dataset.index),
    slides: document.querySelectorAll('.slide'),
    userClickedAt: 0,
    displayType: window.matchMedia('(min-width: 825px) and (pointer: fine)')
  }

  /* ----------------Setting EventListeners----------------- */
  if (!commonData.displayType.matches) {
    commonData.mobileNav.forEach(btn => btn.addEventListener('click', (e) =>
      changeSlideMobile(e, commonData)));
  } else {
    // remove class preparation for mobile slide show
    const prepSlide = commonData.slides[commonData.slides.length - 1];
    prepareSlidesDesktop(prepSlide);
    commonData.desktopNav.forEach(btn => btn.addEventListener('click', (e) =>
      changeSlideDesktop(e, commonData)));
  }

  /* ------------------Automated slideshow-------------- */
  initAutoPlay();
};
