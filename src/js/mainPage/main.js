const getInitMenu = () => import('../commonComponents/Menu');
const SimpleScrollbar = () => import('simple-scrollbar');
import EmailForm from '../commonComponents/EmailForm';
import SlideShow from './SlideShow';
import TextSection from './TextSection';
import '../../css/main.css';

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

// const slideShow = new SlideShow(
//   '.slideshow',
//   '.slideshow-nav-mobile__arrow-block',
//   '.slideshow-nav-desktop__link',
// );

// slideShow.init();

// const biography = new TextSection('.section--biography');
// biography.init();

// const achievements = new TextSection('.section--achievements');
// achievements.init();

// const emailForm = new EmailForm('.section--contact');
// emailForm.init();

window.onload = () => {
  const isDesktop = window.matchMedia('(pointer: fine)').matches;
  if (isDesktop) {
    import('simple-scrollbar/simple-scrollbar.css');
    const scrollbarContainer = document.querySelector('.l-content');
    SimpleScrollbar().then((scrollBar) => {
      scrollBar.default.initEl(scrollbarContainer);
    });
  }
};
