/* eslint-disable semi */
/* eslint-disable space-before-function-paren */

const mobileNav = document.querySelectorAll('.arrow-block');
const desktopNav = document.querySelectorAll('.desktop.slideshow-button');
let prevSlideInd = parseInt(document.querySelector('.slide-show .active').dataset.index);
const displayType = window.matchMedia('(min-width: 825px) and (pointer: fine)');
const slides = document.querySelectorAll('.slide');
let userClickedAt = 0;

/* ----------Mobile version----------- */
const handleDirection = (e) => {
  if (e.target.classList[0] === 'mobile') {
    return e.target.classList[2];
  } else {
    return (e.target.dataset.index > prevSlideInd) ? 'right' : 'left';
  }
}

const chooseNewIndex = (direction) => {
  if (direction === 'right') {
    const newInd = (prevSlideInd !== 6) ? (prevSlideInd + 1) : 0;
    return newInd;
  } else {
    const newInd = (prevSlideInd !== 0) ? (prevSlideInd - 1) : 6;
    return newInd;
  }
}

const prepareSlides = (newSlideInd, slides) => {
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
}

/* ---------------Common for both ----------------- */
const moveSlides = (prevSlide, newSlide, direction) => {
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

/* ---------------Main Mobile function------------- */
const changeSlideMobile = (e) => {
  const prevSlide = slides[prevSlideInd];
  const direction = handleDirection(e);
  const newSlideInd = chooseNewIndex(direction);
  const newSlide = slides[newSlideInd];
  moveSlides(prevSlide, newSlide, direction);
  prepareSlides(newSlideInd, slides);
  prevSlideInd = parseInt(newSlide.dataset.index);
  userClickedAt = new Date().getTime();
}

/* ------------------Desktop version--------------------- */
const handleDesktopNav = (newIndex) => {
  desktopNav[prevSlideInd].classList.remove('active');
  desktopNav[newIndex].classList.add('active');
}

const prepareSlidesDesktop = (prevSlide) => {
  prevSlide.classList.add('transition-off');
  prevSlide.classList.remove('left-move');
  setTimeout(() => prevSlide.classList.remove('transition-off'), 100);
}

/* ------------------Main Desktop function--------------- */
const changeSlideDesktop = (e) => {
  const prevSlide = slides[prevSlideInd];
  const newIndex = parseInt(e.target.dataset.index);
  const newSlide = slides[newIndex];
  handleDesktopNav(newIndex);
  moveSlides(prevSlide, newSlide, 'right');
  setTimeout(() => prepareSlidesDesktop(prevSlide), 2000);
  prevSlideInd = newIndex;
  userClickedAt = new Date().getTime();
}

/* ------------------Automated slideshow main function-------------- */
const changeSlideAutomated = () => {
  
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
      prepareSlides(newIndex, slides);
    }
    prevSlideInd = newIndex;
  }
}


/* ------------------Init auto play and stop offscreen animation-------------- */
const initAutoPlay = () => {
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
      autoChange = setInterval(changeSlideAutomated, 4000);
    }
    isAnimating = !isAnimating;
  }

  const observer = new IntersectionObserver(enableDisableSlideAnimation, intersectOptions);
  const target = document.querySelector('.first-screen-gallery');
  observer.observe(target);
}

export function slideShow() {
  /* ----------------Setting EventListeners----------------- */
  if (!displayType.matches) {
    mobileNav.forEach(btn => btn.addEventListener('click', (e) =>
      changeSlideMobile(e)));
  } else {
    // remove class preparation for mobile slide show
    const prepSlide = slides[slides.length - 1];
    prepareSlidesDesktop(prepSlide);
    desktopNav.forEach(btn => btn.addEventListener('click', (e) =>
      changeSlideDesktop(e)));
  }

  /* ------------------Automated slideshow-------------- */
  initAutoPlay();
};
