import { chooseNextIndex, moveSlide } from './SlideShowCommon';

const slides = document.querySelectorAll('img.slideshow__slide');
let previousSlide = document.querySelector('.slideshow__slide--active');
let previousIndex = parseFloat(previousSlide.dataset.index);

const prepareSlidesDesktop = (slide) => {
  // transition off is needed to prevent slides from sliding through the screen
  slide.classList.add('js-transition-off');
  // position left is added to last slide in HTML, to prepare it for Mobile animation
  // for desktop we need to remove it
  slide.classList.remove('js-position-left');
  // timer is needed to actually move them first without transition
  // and only after that add the transition back
  setTimeout(() => {
    slide.classList.remove('js-transition-off');
  }, 100);
};

const animateDesktopNav = (nextIndex) => {
  const desktopNav = document.querySelectorAll('.slideshow-nav-desktop__link');
  desktopNav[previousIndex].classList.remove('slideshow-nav-desktop__link--active');
  desktopNav[nextIndex].classList.add('slideshow-nav-desktop__link--active');
};

// CLICK HANDLER
const changeSlideDesktop = (e) => {
  // if function was triggered automatically
  // find out the index of the next slide from the right
  // we can't just add 1 to current index
  // because we need to loop from the last one to the first one
  const nextIndex = e
    ? parseFloat(e.target.dataset.index)
    : chooseNextIndex('right', previousIndex);
  const nextSlide = slides[nextIndex];
  animateDesktopNav(nextIndex);
  moveSlide(nextSlide, 'right', previousSlide);
  setTimeout(prepareSlidesDesktop.bind(this, previousSlide), 2000);
  previousIndex = nextIndex;
  previousSlide = nextSlide;
};

export default changeSlideDesktop;
