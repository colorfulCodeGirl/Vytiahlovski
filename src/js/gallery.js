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

  openGallery() {
    this.homePage.classList.add('js-hide');
    this.homePage.addEventListener(
      'transitionend',
      () => {
        this.homePage.classList.add('js-zero-height');
        this.populateWithImg();
      },
      { once: true },
    );
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

  init() {
    this.trigger.addEventListener('click', this.openGallery.bind(this));
  }
}

export default Gallery;
