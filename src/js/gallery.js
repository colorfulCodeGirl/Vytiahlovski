import Macy from 'macy';
import cloudinary from 'cloudinary-core';
import SimpleScrollbar from 'simple-scrollbar';
import 'simple-scrollbar/simple-scrollbar.css';
import Swup from 'swup';
import Menu from './Menu';
import EmailForm from './EmailForm';
import Spinner from './UI/Spinner/Spinner';
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
    this.fullImageSection = document.querySelector('.full-image');
    this.fullImage = null;
    this.openImageIndex = null;
    this.fullImageBlock = this.fullImageSection.querySelector('.full-image__info');
    this.description = null;
  }

  fetchData() {
    const myJSON = JSON.stringify(data);
    this.data = JSON.parse(myJSON);
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
        1050: 3,
        600: 2,
      },
    });
  }

  // eslint-disable-next-line class-methods-use-this
  findPrevueImgWidth() {
    const windowWidth = window.innerWidth;
    let prevueWidth;
    if (windowWidth <= 600) {
      prevueWidth = windowWidth / 2;
    } else if (windowWidth > 600 && windowWidth <= 1050) {
      prevueWidth = windowWidth / 3;
    } else if (windowWidth > 1050 && windowWidth <= 1200) {
      prevueWidth = windowWidth / 4;
    } else {
      prevueWidth = 300;
    }
    return prevueWidth;
  }

  populateWithImages() {
    const startIndex = this.imageCount;
    const prevueWidth = this.findPrevueImgWidth().toFixed(0);
    for (let i = startIndex; i < startIndex + 12; i++) {
      const img = this.cloud.imageTag(`${this.person}/${i}`, {
        dpr: 'auto',
        quality: 'auto',
        width: prevueWidth,
        crop: 'scale',
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
    this.imageCount = this.imageCount + 12;
  }

  addImageDescription() {
    const text = `
    <p>${this.data[this.openImageIndex].name}</p>
    <p>${this.data[this.openImageIndex].material},</p>
    <p>${this.data[this.openImageIndex].size}cm, ${this.data[this.openImageIndex].year}</p>
    `;
    const div = document.createElement('div');
    div.classList.add('full-image__text');
    div.innerHTML = text;
    return div;
  }

  handleFullImageSection() {
    const controls = this.fullImageSection.querySelector('.full-image__controls');
    const height = window.innerHeight;
    this.fullImageSection.style.display = 'grid';
    this.fullImageSection.style.height = `${height}px`;
    controls.addEventListener('click', this.handleControlsEvents.bind(this), { once: true });
  }

  openFullImage(e, nextIndex) {
    // check if user clicked on gaps between photos (target == gallery)
    // if e = null than function was called after click on arrow button (openNextFullImage)
    if (e && e.target == this.gallery) return;

    this.handleFullImageSection();
    const spinner = Spinner('#353030');
    this.fullImageBlock.prepend(spinner);

    this.openImageIndex = !nextIndex ? e.target.parentElement.dataset.index : nextIndex;
    const imageHeight = (window.innerHeight * 0.95).toFixed(0);

    this.fullImage = new Image();
    this.fullImage.src = this.cloud.url(`${this.person}/${this.openImageIndex}`, {
      height: imageHeight,
      quality: 'auto',
      crop: 'scale',
      fetchFormat: 'auto',
    });

    this.fullImage.classList.add('full-image__image');
    this.fullImage.setAttribute('data-index', this.openImageIndex);
    this.fullImage.removeAttribute('height');

    this.fullImage.addEventListener(
      'load',
      () => {
        this.description = this.addImageDescription();
        this.fullImageBlock.prepend(this.description);
        this.fullImageBlock.appendChild(this.fullImage);
        this.fullImageBlock.removeChild(spinner);
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
    this.fullImageSection.style.display = 'none';
    this.fullImageBlock.removeChild(this.fullImage);
    this.fullImageBlock.removeChild(this.description);
  }

  openNextFullImage(direction) {
    const numberIndex = parseFloat(this.openImageIndex);
    const nextIndex = direction === 'right' ? numberIndex + 1 : numberIndex - 1;
    this.openFullImage(null, nextIndex);
  }

  init() {
    this.fetchData();
    this.populateWithImages();
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
