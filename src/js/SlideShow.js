import cloudinary from 'cloudinary-core';

class SlideShow {
  constructor(slideShowSelector, mobileNavSelector, desktopNavSelector) {
    this.slideShow = document.querySelector(slideShowSelector);
    this.mobileNav = document.querySelectorAll(mobileNavSelector);
    this.desktopNav = document.querySelectorAll(desktopNavSelector);
    this.slides = this.slideShow.querySelectorAll(`${slideShowSelector}__slide`);
    this.previousSlide = this.slideShow.querySelector(`${slideShowSelector}__slide--active`);
    this.previousIndex = parseFloat(this.previousSlide.dataset.index);
    this.biggestIndex = this.slides.length - 1;
    this.isDesktop = window.matchMedia('(min-width: 825px) and (pointer: fine)').matches;
    this.userClickedAt = 0;
    this.claud = new cloudinary.Cloudinary({ cloud_name: 'vanilna', secure: true });
  }

  prepareSlidesMobile(nextIndex) {
    const nextRightIndex = nextIndex + 1 > this.biggestIndex ? 0 : nextIndex + 1;
    const nextLeftIndex = nextIndex - 1 < 0 ? this.biggestIndex : nextIndex - 1;
    const nextRight = this.slides[nextRightIndex];
    const nextLeft = this.slides[nextLeftIndex];

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
  }

  // eslint-disable-next-line class-methods-use-this
  prepareSlidesDesktop(slide) {
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
  }

  animateDesktopNav(nextIndex) {
    this.desktopNav[this.previousIndex].classList.remove('slideshow-nav-desktop__link--active');
    this.desktopNav[nextIndex].classList.add('slideshow-nav-desktop__link--active');
  }

  chooseNextIndex(direction) {
    // indexes are from 0 to n, so if we are on nth (last) slide and moving right,
    // we need to loop to the first one with index 0.
    // The same for left move and being at first slide
    let nextIndex;
    if (direction === 'right') {
      nextIndex = this.previousIndex !== this.biggestIndex ? this.previousIndex + 1 : 0;
    } else {
      nextIndex = this.previousIndex !== 0 ? this.previousIndex - 1 : 6;
    }
    return nextIndex;
  }

  moveSlide(newSlide, direction) {
    if (direction === 'right') {
      // by default slides are positioned right, to create animation effect
      // we need to move them to the screen (active class) and then off the screen (position left).
      this.previousSlide.classList.add('js-position-left');
      this.previousSlide.classList.remove('slideshow__slide--active');
      newSlide.classList.add('slideshow__slide--active');
    } else {
      this.previousSlide.classList.remove('slideshow__slide--active');
      newSlide.classList.add('slideshow__slide--active');
      newSlide.classList.remove('js-position-left');
    }
  }

  // CLICK HANDLERS
  changeSlideMobile(e) {
    // if function was triggered automatically
    // use 'right' as a direction
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
    // if function was triggered automatically
    // find out the index of the next slide from the right
    // we can't just add 1 to current index
    // because we need to loop from the last one to the first one
    const nextIndex = e ? parseFloat(e.target.dataset.index) : this.chooseNextIndex('right');
    const nextSlide = this.slides[nextIndex];
    this.animateDesktopNav(nextIndex);
    this.moveSlide(nextSlide, 'right');
    setTimeout(this.prepareSlidesDesktop.bind(this, this.previousSlide), 2000);
    this.previousIndex = nextIndex;
    this.previousSlide = nextSlide;
    this.userClickedAt = e ? new Date().getTime() : 0;
  }

  // SLIDE ANIMATION
  // when page is idle (user didn't click)
  autoChangeSlide() {
    const currentTime = new Date().getTime();
    const timePassed = currentTime - this.userClickedAt;
    if (timePassed >= 4000) {
      if (!this.isDesktop) {
        this.changeSlideMobile();
      } else {
        this.changeSlideDesktop();
      }
    }
  }

  initAutoPlay() {
    // check if slideshow is visible (IntersectionObserver)
    // and init animation if so
    const target = this.slideShow;
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
        currentAnimation = setInterval(this.autoChangeSlide.bind(this), 4000);
      }
      isAnimating = !isAnimating;
    };
    const observer = new IntersectionObserver(toggleSlideAnimation, intersectOptions);
    observer.observe(target);
  }

  prepareImage(selector) {
    const slideFrame = this.slideShow.querySelector('.slideshow__frame');
    const image = this.slideShow.querySelector(selector);

    const fullImage = new Image();
    fullImage.src = this.claud.url('tetiana/53.jpg', {
      fetchFormat: 'auto',
      crop: 'scale',
      width: 1200,
      quality: 'auto:good',
      dpr: 'auto',
    });
    fullImage.classList.add('slideshow__slide', 'slideshow__slide--active');
    fullImage.setAttribute('alt', '');
    fullImage.setAttribute('data-index', '0');
    slideFrame.appendChild(fullImage);

    fullImage.addEventListener('load', () => {
      image.classList.add('slideshow__slide--placeholder-hidden');
      image.addEventListener(
        'transitionend',
        () => {
          slideFrame.removeChild(image);
        },
        { once: true },
      );
    });
  }

  init() {
    this.prepareImage('.slideshow__slide--placeholder');
    if (!this.isDesktop) {
      this.mobileNav.forEach((arrow) => {
        arrow.addEventListener('click', this.changeSlideMobile.bind(this));
      });
    } else {
      // remove class prepared in html for mobile slideshow
      const preparedSlide = this.slides[this.biggestIndex];
      this.prepareSlidesDesktop(preparedSlide);
      this.desktopNav.forEach((btn) => {
        btn.addEventListener('click', this.changeSlideDesktop.bind(this));
      });
    }
    // this.initAutoPlay();
  }
}

export default SlideShow;
