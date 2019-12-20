import SimpleScrollbar from 'simple-scrollbar';
import 'simple-scrollbar/simple-scrollbar.css';
// import Swup from 'swup';
import Menu from '../commonComponents/Menu';
import EmailForm from '../commonComponents/EmailForm';
import SlideShow from './SlideShow';
import TextSection from './TextSection';
import '../../css/main.css';

const menu = new Menu('.menu', '.menu-toggler');
menu.init();

const slideShow = new SlideShow(
  '.slideshow',
  '.slideshow-nav-mobile__arrow-block',
  '.slideshow-nav-desktop__link',
);

slideShow.init();

const biography = new TextSection('.section--biography');
biography.init();

const achievements = new TextSection('.section--achievements');
achievements.init();

const emailForm = new EmailForm('.section--contact');
emailForm.init();

const isDesktop = window.matchMedia('(min-width: 825px) and (pointer: fine)').matches;
if (isDesktop) {
  const scrollbarContainer = document.querySelector('.l-content');
  SimpleScrollbar.initEl(scrollbarContainer);
}

// const options = {
//   linkSelector: `a[href^="${window.location.origin}"]:not([data-no-swup]), a[href^="./"]:not([data-no-swup]), a[href^="#"]:not([data-no-swup])`,
// };

// // eslint-disable-next-line no-unused-vars
// const swup = new Swup(options);
