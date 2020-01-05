import { chooseNextIndex, moveSlide } from './SlideShowCommon';

const slides = document.querySelectorAll('.slideshow__slide');
let previousSlide = document.querySelector('.slideshow__slide--active');
let previousIndex = parseFloat(previousSlide.dataset.index);

const prepareSlidesMobile = (nextIndex) => {
  //choose future next indexes, that will be used after user once again clicks on left or right button
  const nextRightIndex = chooseNextIndex('right', nextIndex);
  const nextLeftIndex = chooseNextIndex('left', nextIndex);
  const nextRight = slides[nextRightIndex];
  const nextLeft = slides[nextLeftIndex];

  // if next from right is positioned left - move it to the right
  // transition off is needed to prevent slides from sliding through the screen
  if (nextRight.className.includes('js-position-left')) {
    nextRight.classList.add('js-transition-off');
    nextRight.classList.remove('js-position-left');
  }
  // if next from left is positioned right - move it to the left
  if (!nextLeft.className.includes('js-position-left')) {
    nextLeft.classList.add('js-transition-off');
    nextLeft.classList.add('js-position-left');
  }

  // timer is needed to actually move them first without transition
  // and only after that add the transition back
  setTimeout(() => {
    nextRight.classList.remove('js-transition-off');
    nextLeft.classList.remove('js-transition-off');
  }, 100);
};

// CLICK HANDLER
const changeSlideMobile = (e) => {
  // if function was triggered automatically
  // use 'right' as a direction
  const direction = e ? e.target.dataset.direction : 'right';
  const nextIndex = chooseNextIndex(direction, previousIndex);
  const nextSlide = slides[nextIndex];
  moveSlide(nextSlide, direction, previousSlide);
  prepareSlidesMobile(nextIndex);
  previousIndex = parseFloat(nextSlide.dataset.index);
  previousSlide = nextSlide;
};

export default changeSlideMobile;
