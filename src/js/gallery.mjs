/* eslint-disable semi */
/* eslint-disable space-before-function-paren */
import handleMenu from './handleMenu';
import openMailFormMobile from './emailForm';
// import SimpleScrollbar from 'simple-scrollbar';

handleMenu();
openMailFormMobile();
// const scrollbarContainer = document.querySelector('.ss-container');
// SimpleScrollbar.init(scrollbarContainer);

const url = 'images/gallery-tetiana/';
const gallery = document.querySelector('.gallery-content');

for (let i = 1; i < 15; i++) {
  const image = new Image();
  image.onload = () => gallery.appendChild(image);
  image.src = `${url}${i}.jpg`;
  console.dir(image);
}
