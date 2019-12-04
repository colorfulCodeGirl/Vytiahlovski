import Menu from './Menu.mjs';
// import slideShow from './slideShow.mjs';
import TextSection from './TextSection.mjs';
import EmailForm from './EmailForm.mjs';
// import SimpleScrollbar from 'simple-scrollbar';

const menu = new Menu('.menu', '.menu-toggler');
menu.init();

const biography = new TextSection('.section--biography');
biography.init();

const achievements = new TextSection('.section--achievements');
achievements.init();

const emailForm = new EmailForm('.section--contact');
emailForm.init();
// const scrollbarContainer = document.querySelector('.content');
// SimpleScrollbar.init(scrollbarContainer);
