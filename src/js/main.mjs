/* eslint-disable space-before-function-paren */
/* eslint-disable semi */

import Menu from './Menu.mjs';
import slideShow from './slideShow.mjs';
import bioAndAchievement from './bioAndAchievement.mjs';
import openMailFormMobile from './emailForm.mjs';
import initFullGallery from './gallery.mjs';
// import SimpleScrollbar from 'simple-scrollbar';

const menu = new Menu('.menu', '.menu-toggler');
menu.init();
slideShow(); //SlideShow
bioAndAchievement(); //TextSectionContent
openMailFormMobile(); //EmailForm
initFullGallery(); //FullGallery
// const scrollbarContainer = document.querySelector('.content');
// SimpleScrollbar.init(scrollbarContainer);
