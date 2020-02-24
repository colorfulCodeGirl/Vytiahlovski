import 'core-js/stable';
import 'regenerator-runtime/runtime';

import initSlideshow, { lazyLoadSlides } from './SlideShow/SlideShow';
import TextSection from './TextSection';
import openFullImage from './FullImage/FullImage';
import '../../css/main.css';

const getInitMenu = () => import('../commonComponents/Menu');
const getSimpleScrollbar = () => import('simple-scrollbar');
const getChangeSlideMobile = () => import('./SlideShow/SlideShowMobile');
const getChangeSlideDesktop = () => import('./SlideShow/SlideShowDesktop');
const getInitAutoPlay = () => import('./SlideShow/SlideShowAuto');
const getEmailForm = () => import('../commonComponents/EmailForm');

initSlideshow();

// load Menu.js on click
const menuToggler = document.querySelector('.menu-toggler');
menuToggler.addEventListener(
  'click',
  () => {
    getInitMenu().then((module) => {
      module.default(); /* init menu */
      menuToggler.click();
    });
  },
  { once: true },
);

// init text sections
const biography = new TextSection('.section--biography');
biography.init();
const achievements = new TextSection('.section--achievements');
achievements.init();

// lazy load rest of the code
const lazyLoadScrollBar = () => {
  import('simple-scrollbar/simple-scrollbar.css');
  const scrollbarContainer = document.querySelector('.l-content');
  getSimpleScrollbar().then((scrollBar) => scrollBar.default.initEl(scrollbarContainer));
};

window.onload = () => {
  const isDesktop = window.matchMedia('(pointer: fine)').matches;
  const userClickedAt = { time: 0 };

  lazyLoadSlides();
  lazyLoadScrollBar();

  if (isDesktop) {
    // lazy load code and set event Listeners for desktop slideshow and autoplay
    getChangeSlideDesktop().then((changeSlideDesktop) => {
      const desktopNav = document.querySelectorAll('.slideshow-nav-desktop__link');

      desktopNav.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          userClickedAt.time = new Date().getTime();
          changeSlideDesktop.default(e);
        });
      });

      getInitAutoPlay().then((initAutoPlayModule) => {
        initAutoPlayModule.default(changeSlideDesktop.default, userClickedAt);
      });
    });
  } else {
    // lazy load code and set event Listeners for mobile slideshow and autoplay
    getChangeSlideMobile().then((changeSlideMobile) => {
      const slides = document.querySelector('.slideshow');

      slides.addEventListener('touchstart', (e) => {
        const { className } = e.target;
        const isSideArrow = className && className.includes('arrow');
        const isSlide = className && (className.includes('nav') || className.includes('_slide'));
        // const isSvgPart = e.target.ownerSVGElement;
        // const isDownArrow = isSvgPart || (className && className.includes('down-arrow'));

        if (isSideArrow) {
          // user interacts with left/right arrow block
          userClickedAt.time = new Date().getTime();
          changeSlideMobile.default(e);
        } else if (isSlide) {
          // user interacts with slides
          userClickedAt.time = new Date().getTime();
          const { screenX: startX, screenY: startY } = e.touches[0];
          slides.addEventListener(
            'touchend',
            (ev) => {
              const { screenX: endX, screenY: endY } = ev.changedTouches[0];
              const differenceX = startX - endX;
              const differenceY = startY - endY;
              if (Math.abs(differenceX) > Math.abs(differenceY)) {
                changeSlideMobile.default(null, differenceX);
              }
            },
            { once: true },
          );
        }
        // else if (isDownArrow) {
        //   // user interacts with down arrow
        //   const arrow = document.querySelector('.slideshow__down-arrow');
        //   const event = document.createEvent('SVGEvents');
        //   event.initEvent('click', true, true);
        //   arrow.dispatchEvent(event);
        // }
      });

      getInitAutoPlay().then((initAutoPlayModule) => {
        initAutoPlayModule.default(changeSlideMobile.default, userClickedAt);
      });
    });
  }

  // load email logic needed only for small device
  if (window.innerWidth <= 600) {
    getEmailForm().then((module) => {
      const EmailConstructor = module.default;
      const emailForm = new EmailConstructor('.section--contact');
      emailForm.init();
    });
  }
};

const workSectionPhotos = document.querySelectorAll('.works__person');

workSectionPhotos.forEach((section) => section.addEventListener('click', openFullImage));
