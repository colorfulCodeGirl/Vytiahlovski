import Macy from 'macy';
import cloudinary from 'cloudinary-core';
import Spinner from '../UI/Spinner/Spinner';

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
    this.observer = null;
    this.macy = null;
    this.imgQuantity = null;
    this.isFetching = false;
  }

  async convertData() {
    const data = await import(`../../assets/${this.person}.json`).then(
      (response) => response.default,
    );
    this.imgQuantity = Object.keys(data).length;
    return data;
  }

  createMasonryLayout() {
    this.macy = Macy({
      container: '.gallery',
      trueOrder: true,
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

  async generatePrevue() {
    const startIndex = this.imageCount;
    const isDesktop = window.matchMedia('(min-width: 825px) and (pointer: fine)').matches;
    let endIndex = isDesktop ? startIndex + 8 : startIndex + 6;
    if (endIndex > this.imgQuantity) {
      endIndex = this.imgQuantity + 1;
    }
    const prevueWidth = this.findPrevueImgWidth().toFixed(0);

    for (let i = startIndex; i < endIndex; i++) {
      const img = this.cloud.imageTag(`${this.person}/${i}`, {
        crop: 'scale',
        quality: 'auto:good',
        dpr: 'auto',
        width: prevueWidth,
        fetchFormat: 'auto',
        class: 'placeholder',
        'data-index': i,
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
      if (endIndex !== this.imgQuantity && i === endIndex - 1) {
        const target = document.querySelector(`img[data-index="${i}"]`);
        this.observer.observe(target);
        target.addEventListener(
          'load',
          () => {
            this.isFetching = false;
          },
          { once: true },
        );
      }
    }
    this.imageCount = endIndex;
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
    const overlay = this.fullImageSection.querySelector('.full-image__overlay');
    const height = window.innerHeight;
    this.fullImageSection.style.display = 'grid';
    this.fullImageSection.style.height = `${height}px`;
    close.addEventListener('click', this.closeFullImage.bind(this), { once: true });
    overlay.addEventListener('click', this.closeFullImage.bind(this), { once: true });
    arrows.forEach((arrow) => {
      arrow.addEventListener('click', this.openNextFullImage.bind(this), { once: true });
    });
  }

  openFullImage(e, nextIndex) {
    // check if user clicked on gaps between photos (target == gallery)
    // if e = null than function was called after click on arrow button (openNextFullImage)
    if (e && e.target === this.gallery) return;

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
    if (this.fullImage.parentNode === this.fullImageContainer) {
      this.fullImageContainer.removeChild(this.fullImage);
    }
    if (this.fullDescription.parentNode === this.fullImageContainer) {
      this.fullImageContainer.removeChild(this.fullDescription);
    }
    if (this.spinner.parentNode === this.fullImageContainer) {
      this.fullImageContainer.removeChild(this.spinner);
    }
  }

  openNextFullImage(e) {
    this.closeFullImage();
    const { direction } = e.target.dataset;
    if (this.openImageIndex === '1' && direction === 'left') return;

    const nextIndex = direction === 'right' ? +this.openImageIndex + 1 : this.openImageIndex - 1;
    this.openFullImage(null, nextIndex);
  }

  setIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.isFetching) {
          this.isFetching = true;
          this.generatePrevue();
          this.macy.recalculate(true);
          observer.unobserve(entry.target);
        }
      });
    });
    return observer;
  }

  async init() {
    this.data = await this.convertData();
    this.observer = this.setIntersectionObserver();
    this.generatePrevue();
    this.createMasonryLayout();
    this.gallery.addEventListener('click', this.openFullImage.bind(this));
  }
}

export default Gallery;
