class SlideShow {
  constructor(slideShowSelector, mobileNavSelector, desktopNavSelector) {
    this.slideShow = document.querySelector(slideShowSelector);
    this.mobileNav = document.querySelectorAll(mobileNavSelector);
    this.desktopNav = document.querySelectorAll(desktopNavSelector);
    this.slides = this.slideShow.querySelectorAll(
      `${slideShowSelector}__slide`,
    );
    this.previousSlide = this.slideShow.querySelector(
      `${slideShowSelector}__slide--active`,
    );
    this.previousIndex = parseFloat(this.previousSlide.dataset.index);
    this.biggestIndex = this.slides.length - 1;
    this.isDesktop = window.matchMedia(
      '(min-width: 825px) and (pointer: fine)',
    );
    this.userClickedAt = 0;
  }

  prepareSlidesMobile(nextIndex) {
    const nextFromRightIndex =
      nextIndex + 1 > this.biggestIndex ? 0 : nextIndex + 1;
    const nextFromLeftIndex =
      nextIndex - 1 < 0 ? this.biggestIndex : nextIndex - 1;
    const nextFromRight = this.slides[nextFromRightIndex];
    const nextFromLeft = this.slides[nextFromLeftIndex];

    // if next from right is positioned left - move it to the right
    if (nextFromRight.className.includes('js-position-left')) {
      nextFromRight.classList.add('js-transition-off');
      nextFromRight.classList.remove('js-position-left');
    }
    // if next from left is positioned right - move it to the left
    if (!nextFromLeft.className.includes('js-position-left')) {
      nextFromLeft.classList.add('js-transition-off');
      nextFromLeft.classList.add('js-position-left');
    }

    setTimeout(() => {
      nextFromRight.classList.remove('js-transition-off');
      nextFromLeft.classList.remove('js-transition-off');
    }, 1000);
  }

  prepareSlidesDesktop(slide) {
    if (!slide) {
      slide = this.previousSlide;
    }
    slide.classList.add('js-transition-off');
    slide.classList.remove('js-position-left');
    setTimeout(() => {
      slide.classList.remove('js-transition-off');
    }, 100);
  }

  animateDesktopNav(nextIndex) {
    this.desktopNav[this.previousIndex].classList.remove(
      'slideshow-nav-desktop__link--active',
    );
    this.desktopNav[nextIndex].classList.add(
      'slideshow-nav-desktop__link--active',
    );
  }

  chooseNextIndex(direction) {
    let nextIndex;
    if (direction === 'right') {
      nextIndex =
        this.previousIndex !== this.biggestIndex ? this.previousIndex + 1 : 0;
    } else {
      nextIndex = this.previousIndex !== 0 ? this.previousIndex - 1 : 6;
    }
    return nextIndex;
  }

  moveSlide(newSlide, direction) {
    if (direction === 'right') {
      this.previousSlide.classList.add('js-position-left');
      this.previousSlide.classList.remove('slideshow__slide--active');
      newSlide.classList.add('slideshow__slide--active');
    } else {
      this.previousSlide.classList.remove('slideshow__slide--active');
      newSlide.classList.add('slideshow__slide--active');
      newSlide.classList.remove('js-position-left');
    }
  }

  /* CLICK HANDLERS */
  changeSlideMobile(e) {
    const direction = e ? e.target.dataset.direction : 'right';
    const nextIndex = this.chooseNextIndex(direction);
    const nextSlide = this.slides[nextIndex];
    this.moveSlide(nextSlide, direction);
    this.prepareSlidesMobile(nextIndex);
    this.previousIndex = parseFloat(nextSlide.dataset.index);
    this.previousSlide = nextSlide;
    this.userClickedAt = e ? new Date().getTime() : 0;
  }

  changeSlideDesktop(e) {
    const nextIndex = e
      ? parseFloat(e.target.dataset.index)
      : this.chooseNextIndex('right');
    const nextSlide = this.slides[nextIndex];
    this.animateDesktopNav(nextIndex);
    this.moveSlide(nextSlide, 'right');
    setTimeout(this.prepareSlidesDesktop.bind(this, this.previousSlide), 2000);
    this.previousIndex = nextIndex;
    this.previousSlide = nextSlide;
    this.userClickedAt = e ? new Date().getTime() : 0;
  }

  /* SLIDE ANIMATION */
  /* when page is idle (user didn't click) */

  // autoChangeSlide() {
  //   const currentTime = new Date().getTime();
  //   const timePassed = currentTime - this.userClickedAt;
  //   if (timePassed >= 4000) {
  //     if (!this.isDesktop) {
  //       this.changeSlideMobile();
  //     } else {
  //       this.changeSlideDesktop();
  //     }
  //   }
  // }

  // initAutoPlay() {
  //   /* check if slideshow is visible (IntersectionObserver) and init animation if so */
  //   const target = this.slideShow;
  //   let currentAnimation;
  //   let isAnimating = false;
  //   const intersectOptions = {
  //     root: document.querySelector('.l-content'),
  //     threshold: 0.3,
  //   };
  //   const toggleSlideAnimation = () => {
  //     if (isAnimating) {
  //       clearInterval(currentAnimation);
  //     } else {
  //       currentAnimation = setInterval(this.autoChangeSlide, 4000);
  //     }
  //     isAnimating = !isAnimating;
  //   };
  //   const observer = new IntersectionObserver(
  //     toggleSlideAnimation,
  //     intersectOptions,
  //   );
  //   observer.observe(target);
  // }

  init() {
    if (!this.isDesktop) {
      this.mobileNav.forEach((arrow) =>
        arrow.addEventListener('click', this.changeSlideMobile.bind(this)),
      );
    } else {
      // remove class prepared in html for mobile slideshow
      const preparedSlide = this.slides[this.biggestIndex];
      this.prepareSlidesDesktop(preparedSlide);
      this.desktopNav.forEach((btn) =>
        btn.addEventListener('click', this.changeSlideDesktop.bind(this)),
      );
    }
    // this.initAutoPlay();
  }
}

export default SlideShow;
