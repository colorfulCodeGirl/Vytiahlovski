import SimpleScrollbar from 'simple-scrollbar';
import Menu from './Menu';
import SlideShow from './SlideShow';
import TextSection from './TextSection';
import EmailForm from './EmailForm';
import '../css/main.css';
import 'simple-scrollbar/simple-scrollbar.css';

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

const scrollbarContainer = document.querySelector('.l-content');
SimpleScrollbar.initEl(scrollbarContainer);