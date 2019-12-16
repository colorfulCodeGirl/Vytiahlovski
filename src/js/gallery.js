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
    this.claud = new cloudinary.Cloudinary({ cloud_name: 'vanilna', secure: true });
    this.imageCount = 1;
    this.data = null;
  }

  fetchData() {
    const myJSON = JSON.stringify(data);
    this.data = JSON.parse(myJSON);
  }

  populateWithImg() {
    for (let i = this.imageCount; i < this.imageCount + 10; i++) {
      const img = this.claud.imageTag(`${this.person}/${i}`, {
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
      // div.addEventListener('click', () => this.openFullImage.bind(this));
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

  openFullImage(e) {
    const { index } = e.target.parentElement.dataset;
    const fullImageBlock = document.querySelector('.full-image');
    const overlay = fullImageBlock.querySelector('.overlay');
    const info = fullImageBlock.querySelector('.full-image__info');
    const height = window.innerHeight;
    fullImageBlock.style.display = 'grid';
    fullImageBlock.style.height = `${height}px`;
    overlay.style.height = `${height}px`;

    const image = new Image();
    image.src = this.claud.url(`${this.person}/${index}`, {
      height: height.toFixed(0),
      quality: 'auto:good',
      crop: 'scale',
      fetchFormat: 'auto',
    });

    image.addEventListener('load', () => {
      info.style.height = `${image.height}px`;
      info.style.width = `${image.width + 250}px`;
    });
    overlay.classList.add('overlay--active');
    image.classList.add('full-image__image');
    fullImageBlock.insertBefore(image, info);

    const text = `
    <p class='full-image__text'>${this.data[index].name}</p>
    <p class='full-image__text'>${this.data[index].material},</p>
    <p class='full-image__text'>${this.data[index].size}, ${this.data[index].year}</p>
    `;
    info.innerHTML = text;
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
