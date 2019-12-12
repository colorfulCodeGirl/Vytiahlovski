import Macy from 'macy';
import cloudinary from 'cloudinary-core';
import SimpleScrollbar from 'simple-scrollbar';
import 'simple-scrollbar/simple-scrollbar.css';
import Swup from 'swup';
import Menu from './Menu';
import EmailForm from './EmailForm';
import '../css/main.css';
import '../css/gallery.css';

class Gallery {
  constructor(person) {
    this.person = person;
    this.gallery = document.querySelector('.gallery');
    this.claud = new cloudinary.Cloudinary({ cloud_name: 'vanilna', secure: true });
    this.imageCount = 1;
  }

  populateWithImg() {
    const imgTagList = [];
    for (let i = this.imageCount; i < this.imageCount + 20; i++) {
      const img = this.claud.imageTag(`${this.person}/${i}`, {
        transformation: ['gallery_prevue_desktop'],
        fetchFormat: 'auto',
      });
      const htmlTag = img.toHtml();
      imgTagList.push(htmlTag);
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
      margin: 5,
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

const swup = new Swup();
