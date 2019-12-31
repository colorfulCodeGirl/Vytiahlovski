const getInitMenu = () => import('../commonComponents/Menu');
const SimpleScrollbar = () => import('simple-scrollbar');
const getChangeSlideMobile = () => import('./SlideShow/SlideShowMobile');
const getChangeSlideDesktop = () => import('./SlideShow/SlideShowDesktop');
const getInitAutoPlay = () => import('./SlideShow/SlideShowAuto');
import initSlideshow from './SlideShow/SlideShow';
// import EmailForm from '../commonComponents/EmailForm';
// import TextSection from './TextSection';
import '../../css/main.css';

initSlideshow();

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

// const biography = new TextSection('.section--biography');
// biography.init();

// const achievements = new TextSection('.section--achievements');
// achievements.init();

// const emailForm = new EmailForm('.section--contact');
// emailForm.init();

window.onload = () => {
  const isDesktop = window.matchMedia('(pointer: fine)').matches;
  let userClickedAt = 0;
  if (isDesktop) {
    import('simple-scrollbar/simple-scrollbar.css');
    const scrollbarContainer = document.querySelector('.l-content');
    SimpleScrollbar().then((scrollBar) => {
      scrollBar.default.initEl(scrollbarContainer);
    });

    getChangeSlideDesktop().then((changeSlideDesktop) => {
      const desktopNav = document.querySelectorAll('.slideshow-nav-desktop__link');
      getInitAutoPlay().then((initAutoPlayModule) =>
        initAutoPlayModule.default(changeSlideDesktop.default, userClickedAt),
      );
      desktopNav.forEach((btn) => {
        btn.addEventListener('click', () => {
          userClickedAt = new Date().getTime();
          changeSlideDesktop.default();
        });
      });
    });
  } else {
    getChangeSlideMobile().then((changeSlideMobile) => {
      const mobileNav = document.querySelectorAll('.slideshow-nav-mobile__arrow-block');
      getInitAutoPlay().then((initAutoPlayModule) =>
        initAutoPlayModule.default(changeSlideMobile.default, userClickedAt),
      );
      mobileNav.forEach((arrow) => {
        arrow.addEventListener('click', () => {
          userClickedAt = new Date().getTime();
          changeSlideMobile.default();
        });
      });
    });
  }
};
