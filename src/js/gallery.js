import Macy from 'macy';
import cloudinary from 'cloudinary-core';
import SimpleScrollbar from 'simple-scrollbar';
import 'simple-scrollbar/simple-scrollbar.css';
import Swup from 'swup';
import Menu from './Menu';
import EmailForm from './EmailForm';
import '../css/main.css';
import '../css/gallery.css';

// eslint-disable-next-line import/extensions
import data from '../assets/tapestry.json';

class Gallery {
  constructor(person) {
    this.person = person;
    this.gallery = document.querySelector('.gallery');
    this.cloud = new cloudinary.Cloudinary({ cloud_name: 'vanilna', secure: true });
    this.imageCount = 1;
    this.data = null;
    this.fullImageBlock = document.querySelector('.full-image');
    this.fullImage = null;
    this.openImageIndex = null;
  }

  fetchData() {
    const myJSON = JSON.stringify(data);
    this.data = JSON.parse(myJSON);
  }

  populateWithImg() {
    for (let i = this.imageCount; i < this.imageCount + 10; i++) {
      const img = this.cloud.imageTag(`${this.person}/${i}`, {
        transformation: ['gallery_prevue_desktop'],
        fetchFormat: 'auto',
      });

      const div = document.createElement('div');
      div.innerHTML = `
                ${img.toHtml()}
                <div class="image-block__popup" data-index=${i}>
                  <p class="image-block__text">${this.data[i].name}</p>
                </div>
      `;
      div.classList.add('image-block');
      div.setAttribute('data-index', i);
      this.gallery.appendChild(div);
    }
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

  openFullImage(e, nextIndex) {
    // check if user clicked on gaps between photos (target == gallery)
    // if e = null than function was called after click on arrow button (openNextFullImage)
    if (e && e.target == this.gallery) return;

    this.openImageIndex = !nextIndex ? e.target.parentElement.dataset.index : nextIndex;
    const overlay = this.fullImageBlock.querySelector('.overlay--active');
    const info = this.fullImageBlock.querySelector('.full-image__info');
    const controls = this.fullImageBlock.querySelector('.full-image__controls');

    const height = window.innerHeight;
    this.fullImageBlock.style.display = 'grid';
    this.fullImageBlock.style.height = `${height}px`;
    overlay.style.height = `${height}px`;
    controls.style.height = `${height}px`;

    this.fullImage = new Image();
    this.fullImage.src = this.cloud.url(`${this.person}/${this.openImageIndex}`, {
      height: height.toFixed(0),
      quality: 'auto:good',
      crop: 'scale',
      fetchFormat: 'auto',
    });

    this.fullImage.classList.add('full-image__image');
    this.fullImageBlock.insertBefore(this.fullImage, info);

    const text = `
    <p class='full-image__text'>${this.data[this.openImageIndex].name}</p>
    <p class='full-image__text'>${this.data[this.openImageIndex].material},</p>
    <p class='full-image__text'>${this.data[this.openImageIndex].size}cm, ${this.data[this.openImageIndex].year}</p>
    `;
    info.innerHTML = text;

    controls.addEventListener('click', this.handleControlsEvents.bind(this), { once: true });
    this.fullImage.addEventListener(
      'load',
      () => {
        info.style.height = `${this.fullImage.height}px`;
        info.style.width = `${this.fullImage.width + 250}px`;
      },
      { once: true },
    );
  }

  handleControlsEvents(e) {
    const targetType = e.target.dataset.type;
    this.closeFullImage();

    if (targetType === 'arrows') {
      const { direction } = e.target.dataset;
      if (this.openImageIndex == 1 && direction === 'left') return;
      this.openNextFullImage(direction);
    }
  }

  closeFullImage() {
    this.fullImageBlock.style.display = 'none';
    this.fullImageBlock.removeChild(this.fullImage);
  }

  openNextFullImage(direction) {
    const numberIndex = parseFloat(this.openImageIndex);
    const nextIndex = direction === 'right' ? numberIndex + 1 : numberIndex - 1;
    this.openFullImage(null, nextIndex);
  }

  init() {
    this.fetchData();
    this.populateWithImg();
    this.createMasonryLayout();
    this.gallery.addEventListener('click', this.openFullImage.bind(this));
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

// eslint-disable-next-line no-unused-vars
const swup = new Swup(options);
