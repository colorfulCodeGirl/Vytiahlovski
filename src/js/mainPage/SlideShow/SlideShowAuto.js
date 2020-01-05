// SLIDE ANIMATION
// when page is idle (user didn't click)
const slideShow = document.querySelector('.slideshow');

const autoChangeSlide = (changeSlideHandler, userClickedAt) => {
  const currentTime = new Date().getTime();
  const timePassed = currentTime - userClickedAt.time;
  if (timePassed >= 4000) {
    changeSlideHandler();
  }
};

const initAutoPlay = (changeSlideHandler, userClickedAt) => {
  // check if slideshow is visible (IntersectionObserver)
  // and init animation if so
  const target = slideShow;
  let currentAnimation;
  let isAnimating = false;
  const intersectOptions = {
    root: document.querySelector('.l-content'),
    threshold: 0.3,
  };
  const toggleSlideAnimation = () => {
    if (isAnimating) {
      clearInterval(currentAnimation);
    } else {
      currentAnimation = setInterval(
        autoChangeSlide.bind(null, changeSlideHandler, userClickedAt),
        4000,
      );
    }
    isAnimating = !isAnimating;
  };
  const observer = new IntersectionObserver(toggleSlideAnimation, intersectOptions);
  observer.observe(target);
};

export default initAutoPlay;
