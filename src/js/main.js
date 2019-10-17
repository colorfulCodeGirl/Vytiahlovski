/* eslint-disable space-before-function-paren */
/* eslint-disable semi */

import handleMenu from './handleMenu';
import slideShow from './slideShow/slideShow';
import bioAndAchievement from './bioAndAchievement/bioAndAchievement';
import openMailFormMobile from './emailForm';
import SimpleScrollbar from 'simple-scrollbar';

handleMenu();
slideShow();
bioAndAchievement();
openMailFormMobile();
const scrollbarContainer = document.querySelector('.ss-container');
SimpleScrollbar.init(scrollbarContainer);
