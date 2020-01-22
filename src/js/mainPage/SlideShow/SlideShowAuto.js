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

  // check if document is visible - Page Visibility API
  // declare correct hidden property and the change event for different browsers
  let hidden;
  let visibilityChange;
  if (typeof document.hidden !== 'undefined') {
    // Opera 12.10 and Firefox 18 and later support
    hidden = 'hidden';
    visibilityChange = 'visibilitychange';
  } else if (typeof document.msHidden !== 'undefined') {
    hidden = 'msHidden';
    visibilityChange = 'msvisibilitychange';
  } else if (typeof document.webkitHidden !== 'undefined') {
    hidden = 'webkitHidden';
    visibilityChange = 'webkitvisibilitychange';
  }

  const handleVisibilityChange = () => {
    if (document[hidden]) {
      clearInterval(currentAnimation);
    } else {
      currentAnimation = setInterval(
        autoChangeSlide.bind(null, changeSlideHandler, userClickedAt),
        4000,
      );
    }
  };
  document.addEventListener(visibilityChange, handleVisibilityChange);

  // handle switching to other app via keybord (Page Visibiliti API doesn't help)
  window.onblur = () => {
    clearInterval(currentAnimation);
  };
  window.onfocus = () => {
    currentAnimation = setInterval(
      autoChangeSlide.bind(null, changeSlideHandler, userClickedAt),
      4000,
    );
  };
};

export default initAutoPlay;
