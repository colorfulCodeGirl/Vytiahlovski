import SimpleScrollbar from 'simple-scrollbar';
import 'simple-scrollbar/simple-scrollbar.css';
// import Swup from 'swup';
import Gallery from './Gallery';
import Menu from '../commonComponents/Menu';
import EmailForm from '../commonComponents/EmailForm';
import '../../css/main.css';
import '../../css/gallery.css';

const tetianaGallery = new Gallery('tetiana');
tetianaGallery.init();

const menu = new Menu('.menu', '.menu-toggler');
menu.init();

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
