/* eslint-disable space-before-function-paren */
/* eslint-disable semi */

import { handleMenu } from './handleMenu.mjs';
import { slideShow } from './slideShow.mjs';
import { bioAndAchievement } from './bioAndAchievement.mjs';
import { openMailFormMobile } from './emailForm.mjs';
import initFullGallery from './gallery.mjs';
// import SimpleScrollbar from 'simple-scrollbar';

handleMenu();
slideShow();
bioAndAchievement();
openMailFormMobile();
initFullGallery();
// const scrollbarContainer = document.querySelector('.content');
// SimpleScrollbar.init(scrollbarContainer);
