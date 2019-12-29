import SimpleScrollbar from 'simple-scrollbar';
import 'simple-scrollbar/simple-scrollbar.css';
import Gallery from './Gallery';
import Menu from '../commonComponents/Menu';
import EmailForm from '../commonComponents/EmailForm';
import '../../css/main.css';
import '../../css/gallery.css';

const location = window.location.href;
const personStartIndex = location.indexOf('#') + 1;
const person = location.slice(personStartIndex);

const tetianaGallery = new Gallery(person);
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
