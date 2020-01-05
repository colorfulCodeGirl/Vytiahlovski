const getInitMenu = () => import('../commonComponents/Menu');
const SimpleScrollbar = () => import('simple-scrollbar');
const getChangeSlideMobile = () => import('./SlideShow/SlideShowMobile');
const getChangeSlideDesktop = () => import('./SlideShow/SlideShowDesktop');
const getInitAutoPlay = () => import('./SlideShow/SlideShowAuto');
const getEmailForm = () => import('../commonComponents/EmailForm');
import initSlideshow, { getSlideDimensions } from './SlideShow/SlideShow';
import fetchFullImage from '../UI/fetchFullImage';
import TextSection from './TextSection';
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

const biography = new TextSection('.section--biography');
biography.init();

const achievements = new TextSection('.section--achievements');
achievements.init();

window.onload = () => {
  const isDesktop = window.matchMedia('(pointer: fine)').matches;
  let userClickedAt = 0;
  const { width, height } = getSlideDimensions();

  for (let i = 1; i < 7; i++) {
    fetchFullImage({
      placeholderSelector: `.slideshow__slide.download[data-index="${i}"]`,
      width,
      height,
    });
  }

  if (isDesktop) {
    import('simple-scrollbar/simple-scrollbar.css');
    const scrollbarContainer = document.querySelector('.l-content');
    SimpleScrollbar().then((scrollBar) => {
      scrollBar.default.initEl(scrollbarContainer);
    });

    getChangeSlideDesktop().then((changeSlideDesktop) => {
      const desktopNav = document.querySelectorAll('.slideshow-nav-desktop__link');
      desktopNav.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          userClickedAt = new Date().getTime();
          changeSlideDesktop.default(e);
        });
      });
      getInitAutoPlay().then((initAutoPlayModule) =>
        initAutoPlayModule.default(changeSlideDesktop.default, userClickedAt),
      );
    });
  } else {
    getChangeSlideMobile().then((changeSlideMobile) => {
      const mobileNav = document.querySelectorAll('.slideshow-nav-mobile__arrow-block');
      mobileNav.forEach((arrow) => {
        arrow.addEventListener('click', (e) => {
          userClickedAt = new Date().getTime();
          changeSlideMobile.default(e);
        });
      });
      getInitAutoPlay().then((initAutoPlayModule) =>
        initAutoPlayModule.default(changeSlideMobile.default, userClickedAt),
      );
    });
  }
  if (window.innerWidth <= 600) {
    getEmailForm().then((module) => {
      const emailForm = new module.default('.section--contact');
      emailForm.init();
    });
  }
};
