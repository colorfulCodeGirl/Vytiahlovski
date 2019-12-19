import Macy from 'macy';
import cloudinary from 'cloudinary-core';
import Spinner from '../UI/Spinner/Spinner';
// eslint-disable-next-line import/extensions
import data from '../../assets/tapestry.json';

class Gallery {
  constructor(person) {
    this.person = person;
    this.gallery = document.querySelector('.gallery');
    this.cloud = new cloudinary.Cloudinary({ cloud_name: 'vanilna', secure: true });
    this.imageCount = 1;
    this.data = null;
    this.fullImageSection = document.querySelector('section.full-image');
    this.fullImageContainer = this.fullImageSection.querySelector('.full-image__container');
    this.fullImage = null;
    this.fullDescription = null;
    this.openImageIndex = null;
    this.spinner = Spinner('#353030');
  }

  convertData() {
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

  generatePrevue() {
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

  getFullDescription() {
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
    const close = this.fullImageSection.querySelector('.full-image__close');
    const arrows = this.fullImageSection.querySelectorAll('.full-image__arrow');
    const height = window.innerHeight;
    this.fullImageSection.style.display = 'grid';
    this.fullImageSection.style.height = `${height}px`;
    close.addEventListener('click', this.closeFullImage.bind(this), { once: true });
    arrows.forEach((arrow) => {
      arrow.addEventListener('click', this.openNextFullImage.bind(this), { once: true });
    });
  }

  openFullImage(e, nextIndex) {
    // check if user clicked on gaps between photos (target == gallery)
    // if e = null than function was called after click on arrow button (openNextFullImage)
    if (e && e.target == this.gallery) return;

    this.handleFullImageSection();

    this.fullImageContainer.prepend(this.spinner);

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

    this.fullDescription = this.getFullDescription();
    this.fullImageContainer.prepend(this.fullDescription);

    this.fullImage.addEventListener('load', this.loadHandler.bind(this), { once: true });
  }

  loadHandler() {
    if (this.spinner.parentNode === this.fullImageContainer) {
      this.fullImageContainer.appendChild(this.fullImage);
      this.fullImageContainer.removeChild(this.spinner);
    }
  }

  closeFullImage() {
    this.fullImageSection.style.display = 'none';
    this.fullImage.removeEventListener('load', this.loadHandler.bind(this), { once: true });
    if (this.fullImage.parentNode == this.fullImageContainer) {
      this.fullImageContainer.removeChild(this.fullImage);
    }
    if (this.fullDescription.parentNode == this.fullImageContainer) {
      this.fullImageContainer.removeChild(this.fullDescription);
    }
    if (this.spinner.parentNode === this.fullImageContainer) {
      this.fullImageContainer.removeChild(this.spinner);
    }
  }

  openNextFullImage(e) {
    this.closeFullImage();
    const { direction } = e.target.dataset;
    if (this.openImageIndex == 1 && direction === 'left') return;

    const nextIndex = direction === 'right' ? +this.openImageIndex + 1 : this.openImageIndex - 1;
    this.openFullImage(null, nextIndex);
  }

  init() {
    this.convertData();
    this.generatePrevue();
    this.createMasonryLayout();
    this.gallery.addEventListener('click', this.openFullImage.bind(this));
  }
}

export default Gallery;
