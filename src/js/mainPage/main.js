const getInitMenu = () => import('../commonComponents/Menu');
const getSimpleScrollbar = () => import('simple-scrollbar');
const getChangeSlideMobile = () => import('./SlideShow/SlideShowMobile');
const getChangeSlideDesktop = () => import('./SlideShow/SlideShowDesktop');
const getInitAutoPlay = () => import('./SlideShow/SlideShowAuto');
const getEmailForm = () => import('../commonComponents/EmailForm');
import initSlideshow, { lazyLoadSlides } from './SlideShow/SlideShow';
import fetchFullImage from '../UI/fetchFullImage';
import TextSection from './TextSection';
import '../../css/main.css';

initSlideshow();

//load Menu.js on click
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

//init text sections
const biography = new TextSection('.section--biography');
biography.init();
const achievements = new TextSection('.section--achievements');
achievements.init();

//lazy load rest of the code
const lazyLoadScrollBar = () => {
  import('simple-scrollbar/simple-scrollbar.css');
  const scrollbarContainer = document.querySelector('.l-content');
  getSimpleScrollbar().then((scrollBar) => scrollBar.default.initEl(scrollbarContainer));
};

window.onload = () => {
  const isDesktop = window.matchMedia('(pointer: fine)').matches;
  let userClickedAt = { time: 0 };

  lazyLoadSlides();

  if (isDesktop) {
    lazyLoadScrollBar();

    //lazy load code and set event Listeners for desktop slideshow and autoplay
    getChangeSlideDesktop().then((changeSlideDesktop) => {
      const desktopNav = document.querySelectorAll('.slideshow-nav-desktop__link');
      desktopNav.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          userClickedAt.time = new Date().getTime();
          changeSlideDesktop.default(e);
        });
      });
      getInitAutoPlay().then((initAutoPlayModule) =>
        initAutoPlayModule.default(changeSlideDesktop.default, userClickedAt),
      );
    });
  } else {
    //lazy load code and set event Listeners for mobile slideshow and autoplay
    getChangeSlideMobile().then((changeSlideMobile) => {
      const mobileNav = document.querySelectorAll('.slideshow-nav-mobile__arrow-block');
      mobileNav.forEach((arrow) => {
        arrow.addEventListener('click', (e) => {
          userClickedAt.time = new Date().getTime();
          changeSlideMobile.default(e);
        });
      });
      getInitAutoPlay().then((initAutoPlayModule) =>
        initAutoPlayModule.default(changeSlideMobile.default, userClickedAt),
      );
    });
  }
  //load email logic needed only for small device
  if (window.innerWidth <= 600) {
    getEmailForm().then((module) => {
      const emailForm = new module.default('.section--contact');
      emailForm.init();
    });
  }
};
