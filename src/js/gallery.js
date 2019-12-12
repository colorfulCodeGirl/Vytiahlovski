import Macy from 'macy';
import '../css/gallery.css';
import cloudinary from 'cloudinary-core';

class Gallery {
  constructor(triggerSelector) {
    this.trigger = document.querySelector(triggerSelector);
    this.person = this.trigger.dataset.name;
    this.homePage = document.querySelector('.home-page');
    this.gallery = document.querySelector('.gallery');
    this.claud = new cloudinary.Cloudinary({ cloud_name: 'vanilna', secure: true });
    this.imageCount = 1;
  }

  populateWithImg() {
    const imgTagList = [];
    for (let i = this.imageCount; i < this.imageCount + 10; i++) {
      const img = this.claud.imageTag(`${this.person}/${i}`, { crop: 'scale', width: 400 });
      const htmlTag = img.toHtml();
      imgTagList.push(htmlTag);
    }
    this.gallery.innerHTML = imgTagList.join('');
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

  createGallery() {
    this.populateWithImg();
    this.createMasonryLayout();
  }

  initGallery(e) {
    e.preventDefault();
    this.createGallery();
    const scrollTarget = this.gallery;
    setTimeout(() => {
      scrollTarget.scrollIntoView({
        behavior: 'smooth',
      });
    }, 500);

    setTimeout(() => {
      this.homePage.style.display = 'none';
    }, 2700);
  }

  init() {
    this.trigger.addEventListener('click', this.initGallery.bind(this));
  }
}

export default Gallery;
