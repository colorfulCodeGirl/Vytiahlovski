const getInitMenu = () => import('../commonComponents/Menu');
const SimpleScrollbar = () => import('simple-scrollbar');
const getEmailForm = () => import('../commonComponents/EmailForm');

import Gallery from './Gallery';
import '../../css/main.css';
import '../../css/gallery.css';

const location = window.location.href;
const personStartIndex = location.indexOf('#') + 1;
const person = location.slice(personStartIndex);

const personGallery = new Gallery(person);
personGallery.init();

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

const emailForm = new EmailForm('.section--contact');
emailForm.init();

window.onload = () => {
  const isDesktop = window.matchMedia('(pointer: fine)').matches;
  if (isDesktop) {
    import('simple-scrollbar/simple-scrollbar.css');
    const scrollbarContainer = document.querySelector('.l-content');
    SimpleScrollbar().then((scrollBar) => {
      scrollBar.default.initEl(scrollbarContainer);
    });
  }
  if (window.innerWidth <= 600) {
    getEmailForm().then((module) => {
      const emailForm = new module.default('.section--contact');
      emailForm.init();
    });
  }
};
