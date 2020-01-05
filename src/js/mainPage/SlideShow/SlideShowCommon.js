const biggestIndex = 6;

export const chooseNextIndex = (direction, previousIndex) => {
  // indexes are from 0 to n, so if we are on nth (last) slide and moving right,
  // we need to loop to the first one with index 0.
  // The same for left move and being at first slide
  let nextIndex;
  if (direction === 'right') {
    nextIndex = previousIndex !== biggestIndex ? previousIndex + 1 : 0;
  } else {
    nextIndex = previousIndex !== 0 ? previousIndex - 1 : biggestIndex;
  }
  return nextIndex;
};

export const moveSlide = (newSlide, direction, previousSlide) => {
  if (direction === 'right') {
    // by default slides are positioned right, to create animation effect
    // we need to move them to the screen (active class) and then off the screen (position left).
    previousSlide.classList.add('js-position-left');
    previousSlide.classList.remove('slideshow__slide--active');
    newSlide.classList.add('slideshow__slide--active');
  } else {
    previousSlide.classList.remove('slideshow__slide--active');
    newSlide.classList.add('slideshow__slide--active');
    newSlide.classList.remove('js-position-left');
  }
};
