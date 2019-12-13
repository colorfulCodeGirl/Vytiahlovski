import Macy from 'macy';
import cloudinary from 'cloudinary-core';
import SimpleScrollbar from 'simple-scrollbar';
import 'simple-scrollbar/simple-scrollbar.css';
import Swup from 'swup';
import Menu from './Menu';
import EmailForm from './EmailForm';
import '../css/main.css';
import '../css/gallery.css';

import data from '../assets/tapestry.json';

class Gallery {
  constructor(person) {
    this.person = person;
    this.gallery = document.querySelector('.gallery');
    this.claud = new cloudinary.Cloudinary({ cloud_name: 'vanilna', secure: true });
    this.imageCount = 1;
    this.data = null;
  }

  fetchData() {
    const myJSON = JSON.stringify(data);
    this.data = JSON.parse(myJSON);
  }

  populateWithImg() {
    const imgTagList = [];
    for (let i = this.imageCount; i < this.imageCount + 10; i++) {
      const img = this.claud.imageTag(`${this.person}/${i}`, {
        transformation: ['gallery_prevue_desktop'],
        fetchFormat: 'auto',
      });
      const htmlTag = img.toHtml();
      const htmlBlock = `
            <div class="image-block">
                ${htmlTag}
                <div class="image-block__popup">
                  <p class="image-block__text">${this.data[i].name}</p>
                </div>
            </div>
      `;
      imgTagList.push(htmlBlock);
    }
    this.gallery.innerHTML = imgTagList.join('');
    this.imageCount = this.imageCount + 20;
  }

  // eslint-disable-next-line class-methods-use-this
  createMasonryLayout() {
    // eslint-disable-next-line no-unused-vars
    const macyInstance = new Macy({
      container: '.gallery',
      trueOrder: true,
      waitForImages: false,
      margin: 7,
      columns: 4,
      breakAt: {
        1200: 4,
        940: 3,
        520: 2,
        400: 1,
      },
    });
  }

  init() {
    this.fetchData();
    this.populateWithImg();
    this.createMasonryLayout();
  }
}

const tetianaGallery = new Gallery('tetiana');
tetianaGallery.init();

const menu = new Menu('.menu', '.menu-toggler');
menu.init();

const emailForm = new EmailForm('.section--contact');
emailForm.init();

const scrollbarContainer = document.querySelector('.l-content');
SimpleScrollbar.initEl(scrollbarContainer);

const options = {
  linkSelector: `a[href^="${window.location.origin}"]:not([data-no-swup]), a[href^="./"]:not([data-no-swup]), a[href^="#"]:not([data-no-swup])`,
};

const swup = new Swup(options);
