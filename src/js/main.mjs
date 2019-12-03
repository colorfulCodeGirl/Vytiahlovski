import Menu from './Menu.mjs';
import slideShow from './slideShow.mjs';
import TextSection from './TextSection.mjs';
import openMailFormMobile from './emailForm.mjs';
import initFullGallery from './gallery.mjs';
// import SimpleScrollbar from 'simple-scrollbar';

const menu = new Menu('.menu', '.menu-toggler');
menu.init();

const biography = new TextSection('section.biography');
biography.init();

const achievements = new TextSection('section.achievements');
achievements.init();

openMailFormMobile();
initFullGallery();
// const scrollbarContainer = document.querySelector('.content');
// SimpleScrollbar.init(scrollbarContainer);
